// A small agent-based simulation of local interaction rules. It is illustrative and Lenia-inspired
// (soft organisms, ring-shaped attraction, self-organising groups); it is NOT an implementation of
// Lenia's equations and not evidence of any kind of intelligence.
//
// Every agent only ever reacts to neighbours inside a short radius. There is no global target, no
// scripted sequence and no central point. Groups form, link, merge, split and reorganise because of
// these rules alone:
//   - short-range repulsion        (agents do not overlap)
//   - ring-shaped attraction       (similar agents settle at a comfortable distance, like Lenia's kernel)
//   - mild repulsion between dissimilar agents
//   - velocity alignment           (neighbours drift in a shared direction)
//   - crowding limit               (a group that grows too dense pushes outwards, so many groups coexist)
//   - trait drift                  (traits blend slowly between neighbours, so groups merge and separate)
//   - temporary links              (form between close, similar agents, grow and fade smoothly)

export interface Agent {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;        // body radius in px
  angle: number;    // sprite rotation
  spin: number;     // radians per second
  trait: number;    // 0..1 on a circle; similar traits cohere
  variant: number;  // sprite variation 0..2
  phase: number;    // personal wander phase
  agit: number;     // 0..1 local agitation after a disturbance
}

export interface Link {
  a: number;
  b: number;
  s: number;        // link strength 0..1 (drives opacity)
}

export interface Pointer {
  x: number;
  y: number;
  active: boolean;
}

const TAU = Math.PI * 2;
/** Traits settle around a few families (the colours in the picture). Cohesion only works inside a family, which bounds how large one community can become. */
export const FAMILIES = 5;

// small deterministic generator so the layout is stable between renders of the same seed
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const circDist = (a: number, b: number) => {
  const d = Math.abs(a - b) % 1;
  return d > 0.5 ? 1 - d : d;
};

export class Swarm {
  width: number;
  height: number;
  agents: Agent[] = [];
  links = new Map<number, Link>();

  private rand: () => number;
  private time = 0;
  private scale = 1;
  private radius = 64;          // interaction radius
  private cols = 3;
  private rows = 3;
  private head = new Int32Array(0);
  private next = new Int32Array(0);
  private degree = new Int16Array(0);
  private seen = new Set<number>();
  private disturbances: { x: number; y: number; power: number }[] = [];

  constructor(width: number, height: number, count: number, seed = 7) {
    this.width = width;
    this.height = height;
    this.rand = mulberry32(seed);
    this.configure();
    this.setCount(count);
  }

  private configure() {
    this.scale = Math.min(1.25, Math.max(0.72, Math.min(this.width, this.height) / 380));
    this.radius = 62 * this.scale;
    this.cols = Math.max(3, Math.floor(this.width / this.radius));
    this.rows = Math.max(3, Math.floor(this.height / this.radius));
    this.head = new Int32Array(this.cols * this.rows);
  }

  resize(width: number, height: number) {
    if (width <= 0 || height <= 0) return;
    const sx = width / this.width;
    const sy = height / this.height;
    this.width = width;
    this.height = height;
    for (const agent of this.agents) {
      agent.x *= sx;
      agent.y *= sy;
    }
    this.configure();
  }

  setCount(count: number) {
    while (this.agents.length < count) this.agents.push(this.spawn());
    if (this.agents.length > count) {
      this.agents.length = count;
      this.links.clear();
    }
    this.next = new Int32Array(this.agents.length);
    this.degree = new Int16Array(this.agents.length);
  }

  private centres: { x: number; y: number; fam: number }[] = [];
  /** 0 = agents drift freely, 1 = they converge into one swarm at (gatherX, gatherY) as fractions of the canvas. */
  gather = 0;
  gatherX = 0.5;
  gatherY = 0.5;

  private spawn(): Agent {
    const rnd = this.rand;
    const speed = (6 + rnd() * 10) * this.scale;
    const heading = rnd() * TAU;
    // agents start in small groups of similar kind, so separate pieces are visible
    // coming together rather than an even scatter
    const GROUP = 7;
    const g = Math.floor(this.agents.length / GROUP);
    while (this.centres.length <= g) {
      this.centres.push({ x: rnd() * this.width, y: rnd() * this.height, fam: Math.floor(rnd() * FAMILIES) });
    }
    const c = this.centres[g];
    return {
      x: rnd() * this.width,
      y: rnd() * this.height,
      vx: Math.cos(heading) * speed,
      vy: Math.sin(heading) * speed,
      r: (4.6 + rnd() * 3.6) * this.scale,
      angle: rnd() * TAU,
      spin: (rnd() - 0.5) * 0.7,
      trait: (c.fam + 0.5 + (rnd() - 0.5) * 0.35) / FAMILIES,
      variant: Math.floor(rnd() * 3),
      phase: rnd() * TAU,
      agit: 0,
    };
  }

  /** A click or tap: nearby agents are pushed out and briefly stop cohering, then reform on their own. */
  disturb(x: number, y: number, power = 1) {
    this.disturbances.push({ x, y, power });
  }

  private wrapDelta(d: number, size: number) {
    if (d > size / 2) return d - size;
    if (d < -size / 2) return d + size;
    return d;
  }

  step(dtRaw: number, pointer?: Pointer) {
    const dt = Math.min(dtRaw, 1 / 20);
    if (dt <= 0) return;
    this.time += dt;
    const { agents, width, height, radius: R, scale } = this;
    const n = agents.length;
    const cellW = width / this.cols;
    const cellH = height / this.rows;

    // click disturbances act once, as a short outward kick
    if (this.disturbances.length) {
      const reach = 170 * scale;
      for (const d of this.disturbances) {
        for (const a of agents) {
          const dx = this.wrapDelta(a.x - d.x, width);
          const dy = this.wrapDelta(a.y - d.y, height);
          const dist = Math.hypot(dx, dy);
          if (dist > reach) continue;
          const f = (1 - dist / reach) ** 1.5;
          const ux = dist > 0.001 ? dx / dist : Math.cos(a.phase);
          const uy = dist > 0.001 ? dy / dist : Math.sin(a.phase);
          a.vx += ux * 210 * scale * f * d.power;
          a.vy += uy * 210 * scale * f * d.power;
          a.agit = Math.max(a.agit, f);
        }
      }
      this.disturbances.length = 0;
    }

    // uniform grid for neighbour search
    this.head.fill(-1);
    for (let i = 0; i < n; i++) {
      const a = agents[i];
      a.x = ((a.x % width) + width) % width;
      a.y = ((a.y % height) + height) % height;
      const cx = Math.min(this.cols - 1, Math.floor(a.x / cellW));
      const cy = Math.min(this.rows - 1, Math.floor(a.y / cellH));
      const cell = cy * this.cols + cx;
      this.next[i] = this.head[cell];
      this.head[cell] = i;
    }

    // current link degree (so no agent collects an unbounded number of links)
    this.degree.fill(0);
    for (const link of this.links.values()) {
      this.degree[link.a]++;
      this.degree[link.b]++;
    }
    this.seen.clear();

    const maxLinks = 4 + Math.round(5 * this.gather);
    const linkReach = R * (0.8 + 0.19 * this.gather);
    const rep0 = 1.55;                    // repulsion distance in body radii
    const traitSin = new Float32Array(n);
    const traitCos = new Float32Array(n);
    const traitWeight = new Float32Array(n);
    const crowd = new Float32Array(n);
    const ax = new Float32Array(n);
    const ay = new Float32Array(n);

    for (let i = 0; i < n; i++) {
      const a = agents[i];
      let fx = 0, fy = 0;
      let avx = 0, avy = 0, wsum = 0;
      let cxs = 0, cys = 0, similar = 0;
      let ts = 0, tc = 0, tw = 0;

      const cx = Math.min(this.cols - 1, Math.floor(a.x / cellW));
      const cy = Math.min(this.rows - 1, Math.floor(a.y / cellH));
      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          const gx = (cx + ox + this.cols) % this.cols;
          const gy = (cy + oy + this.rows) % this.rows;
          for (let j = this.head[gy * this.cols + gx]; j !== -1; j = this.next[j]) {
            if (j === i) continue;
            const b = agents[j];
            const dx = this.wrapDelta(b.x - a.x, width);
            const dy = this.wrapDelta(b.y - a.y, height);
            const d2 = dx * dx + dy * dy;
            if (d2 > R * R || d2 < 1e-6) continue;
            const d = Math.sqrt(d2);
            const ux = dx / d, uy = dy / d;
            const sim = 1 - circDist(a.trait, b.trait) * 2;          // 1 = same, 0 = opposite
            const like = sim > 0.72 ? (sim - 0.72) / 0.28 : 0;        // only close traits cohere
            const rep = (a.r + b.r) * rep0;

            // short-range repulsion
            if (d < rep) {
              const k = (1 - d / rep);
              fx -= ux * k * 150 * scale;
              fy -= uy * k * 150 * scale;
            } else {
              // ring-shaped attraction: strongest at mid range, zero at both ends (Lenia-like kernel)
              const bump = Math.sin(Math.PI * (d - rep) / (R - rep));
              const cohere = (1 - a.agit * 0.9) * 26 * scale;
              fx += ux * bump * like * cohere;
              fy += uy * bump * like * cohere;
              // dissimilar neighbours keep a polite distance
              if (sim < 0.6) {
                const push = (0.6 - sim) / 0.6;
                fx -= ux * bump * push * 22 * (1 - this.gather) * scale;
                fy -= uy * bump * push * 22 * (1 - this.gather) * scale;
              }
            }

            if (like > 0 && d < R * 0.85) {
              avx += b.vx * like; avy += b.vy * like; wsum += like;
              cxs += dx * like; cys += dy * like; similar += like;
              // trait blending, weighted by closeness
              ts += Math.sin(b.trait * TAU) * like; tc += Math.cos(b.trait * TAU) * like; tw += like;
            }

            // temporary connections between close, similar agents
            if (i < j && sim > 0.62 - 0.9 * this.gather) {
              const key = i * 65536 + j;
              if (d < linkReach) {
                const existing = this.links.get(key);
                if (existing) {
                  if (a.agit < 0.4 && b.agit < 0.4) { existing.s = Math.min(1, existing.s + dt * 1.6); this.seen.add(key); }
                } else if (this.degree[i] < maxLinks && this.degree[j] < maxLinks && a.agit < 0.4 && b.agit < 0.4 && d < linkReach * 0.95) {
                  this.links.set(key, { a: i, b: j, s: 0.02 });
                  this.degree[i]++; this.degree[j]++;
                  this.seen.add(key);
                }
              }
            }
          }
        }
      }

      // alignment with similar neighbours
      if (wsum > 0) {
        fx += (avx / wsum - a.vx) * 1.6;
        fy += (avy / wsum - a.vy) * 1.6;
      }
      // crowding: groups that become too dense push outwards from their own centre
      const cap = 6;
      crowd[i] = Math.max(0, similar / cap - 1);
      if (similar > cap) {
        const over = Math.min(1.5, (similar - cap) / cap);
        const len = Math.hypot(cxs, cys) || 1;
        fx -= (cxs / len) * over * 48 * (1 - 0.75 * this.gather) * scale;
        fy -= (cys / len) * over * 48 * (1 - 0.75 * this.gather) * scale;
      }
      // smooth personal wander, so nothing is ever perfectly still
      const heading = a.phase + this.time * (0.25 + 0.15 * Math.sin(a.phase * 3)) + Math.sin(this.time * 0.37 + a.phase * 5) * 0.8;
      const wander = (10 + a.agit * 30) * scale;
      fx += Math.cos(heading) * wander;
      fy += Math.sin(heading) * wander;

      // scroll-driven gathering: agents stream towards one point and settle into a single swarm
      if (this.gather > 0.001) {
        const dxc = this.wrapDelta(this.gatherX * width - a.x, width);
        const dyc = this.wrapDelta(this.gatherY * height - a.y, height);
        const dc = Math.hypot(dxc, dyc) || 1;
        // pull only agents that are outside the swarm's body, so it stays large instead of collapsing to a point
        const body = Math.min(width, height) * 0.36;
        const soft = Math.min(1, Math.max(0, (dc - body) / (body * 0.6)));
        fx += (dxc / dc) * soft * 150 * this.gather * scale;
        fy += (dyc / dc) * soft * 150 * this.gather * scale;
        // inside the body a gentle spring keeps every agent tied to the swarm, so it stays one connected network
        const hold = Math.min(1, Math.max(0, (dc - body * 0.55) / (body * 0.45))) * 48 * this.gather * scale;
        fx += (dxc / dc) * hold;
        fy += (dyc / dc) * hold;
      }

      // cursor: a gentle push and swirl
      if (pointer?.active) {
        const dx = this.wrapDelta(a.x - pointer.x, width);
        const dy = this.wrapDelta(a.y - pointer.y, height);
        const reach = 105 * scale;
        const d = Math.hypot(dx, dy);
        if (d < reach && d > 0.001) {
          const f = (1 - d / reach) ** 2;
          fx += (dx / d) * f * 70 * scale + (-dy / d) * f * 24 * scale;
          fy += (dy / d) * f * 70 * scale + (dx / d) * f * 24 * scale;
        }
      }

      ax[i] = fx;
      ay[i] = fy;
      traitSin[i] = ts; traitCos[i] = tc; traitWeight[i] = tw;
    }

    // integrate
    const vmax = 44 * scale * (1 + 4 * this.gather);
    const vmin = 9 * scale;
    const damp = Math.exp(-1.4 * dt);
    for (let i = 0; i < n; i++) {
      const a = agents[i];
      a.vx = (a.vx + ax[i] * dt) * damp;
      a.vy = (a.vy + ay[i] * dt) * damp;
      let speed = Math.hypot(a.vx, a.vy);
      if (speed > vmax) { a.vx *= vmax / speed; a.vy *= vmax / speed; speed = vmax; }
      else if (speed < vmin) {
        const heading = speed > 1e-3 ? Math.atan2(a.vy, a.vx) : a.phase;
        a.vx = Math.cos(heading) * vmin; a.vy = Math.sin(heading) * vmin;
      }
      a.x += a.vx * dt;
      a.y += a.vy * dt;
      a.angle += a.spin * dt;
      a.agit = Math.max(0, a.agit - dt * 0.45);

      // traits drift towards close, similar neighbours, plus a little noise, so groups merge and split over time
      if (traitWeight[i] > 0) {
        const mean = (Math.atan2(traitSin[i], traitCos[i]) / TAU + 1) % 1;
        let delta = mean - a.trait;
        if (delta > 0.5) delta -= 1; else if (delta < -0.5) delta += 1;
        a.trait += delta * Math.min(1, 0.22 * dt * Math.min(3, traitWeight[i]));
      }
      a.trait = ((a.trait + (this.rand() - 0.5) * 0.09 * (1 + 2 * Math.min(2, crowd[i])) * Math.sqrt(dt)) % 1 + 1) % 1;
      // now and then an agent's trait shifts noticeably, which can pull it out of one group and into another
      if (this.rand() < dt * 0.012 * (1 + 3 * Math.min(2, crowd[i]))) {
        const jump = (0.9 + this.rand() * 1.4) / FAMILIES * (this.rand() < 0.5 ? -1 : 1);
        a.trait = ((a.trait + jump) % 1 + 1) % 1;
      }
      // settle gently back towards the nearest family, so colours stay distinct and communities stay bounded
      const nearest = (Math.round(a.trait * FAMILIES - 0.5) + 0.5) / FAMILIES;
      let pull = nearest - a.trait;
      if (pull > 0.5) pull -= 1; else if (pull < -0.5) pull += 1;
      a.trait = ((a.trait + pull * Math.min(1, 0.9 * dt)) % 1 + 1) % 1;
    }

    // links that were not renewed this frame fade away; far-apart or agitated pairs fade faster
    for (const [key, link] of this.links) {
      if (!this.seen.has(key)) {
        const a = agents[link.a], b = agents[link.b];
        const stretched = Math.hypot(this.wrapDelta(b.x - a.x, width), this.wrapDelta(b.y - a.y, height)) > linkReach * 1.3;
        link.s -= dt * (stretched || a.agit > 0.45 || b.agit > 0.45 ? 2.2 : 0.55);
        if (link.s <= 0) this.links.delete(key);
      }
    }
  }

  /** Number of connected groups (for tests and tuning). */
  communityCount() {
    const parent = Array.from({ length: this.agents.length }, (_, i) => i);
    const find = (x: number): number => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    for (const link of this.links.values()) if (link.s > 0.3) parent[find(link.a)] = find(link.b);
    const sizes = new Map<number, number>();
    for (let i = 0; i < parent.length; i++) sizes.set(find(i), (sizes.get(find(i)) || 0) + 1);
    return [...sizes.values()].filter((size) => size >= 3).length;
  }
}
