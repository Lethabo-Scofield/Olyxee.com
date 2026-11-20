"use client";

import { useEffect, useRef } from "react";
import { FAMILIES, Swarm, type Pointer } from "../lib/swarm-simulation";

// Illustrative, Lenia-inspired agent-based simulation: a few hundred small organisms follow local
// interaction rules (see lib/swarm-simulation.ts), forming, connecting, merging and splitting into many
// separate communities. It is not Lenia's mathematical model and not evidence of intelligence; it
// shows how organised behaviour can arise from simple local rules.

const PALETTE = ["#12d6e8", "#2f6bff", "#e0309a", "#2fd38a", "#8a5cf0"]; // cyan, blue, magenta, green, purple
const LINK_RGB = "47, 107, 255";                                         // electric blue
const VARIANTS = 3;

function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(Math.min(255, Math.max(0, c + (amount >= 0 ? (255 - c) : c) * amount)));
  return `rgb(${mix((n >> 16) & 255)}, ${mix((n >> 8) & 255)}, ${mix(n & 255)})`;
}

// One small organic body: a lobed membrane, soft multicoloured regions inside it, a nucleus and speckles.
function makeSprite(family: number, variant: number, size: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const c = size / 2;
  const base = size * 0.4;
  const main = PALETTE[family];
  const second = PALETTE[(family + 1 + variant) % PALETTE.length];
  const third = PALETTE[(family + 2 + variant * 2) % PALETTE.length];
  const p1 = (family * 1.7 + variant * 2.3) % 6.28;
  const p2 = (family * 0.9 + variant * 1.1 + 1) % 6.28;
  const lobes = 3 + ((family + variant) % 3);

  const body = new Path2D();
  for (let i = 0; i <= 72; i++) {
    const t = (i / 72) * Math.PI * 2;
    const r = base * (1 + 0.11 * Math.sin(lobes * t + p1) + 0.06 * Math.sin((lobes + 2) * t + p2));
    const x = c + Math.cos(t) * r;
    const y = c + Math.sin(t) * r;
    if (i === 0) body.moveTo(x, y); else body.lineTo(x, y);
  }
  body.closePath();

  ctx.save();
  ctx.clip(body);
  const fill = ctx.createRadialGradient(c - base * 0.25, c - base * 0.3, base * 0.1, c, c, base * 1.15);
  fill.addColorStop(0, shade(main, 0.55));
  fill.addColorStop(0.55, main);
  fill.addColorStop(1, shade(main, -0.12));
  ctx.fillStyle = fill;
  ctx.fillRect(0, 0, size, size);

  // soft regions of other hues inside the body
  const regions: [string, number, number, number][] = [
    [second, 0.55, p1, 0.62],
    [third, 0.5, p2 + 2, 0.55],
    [shade(second, 0.25), 0.35, p1 + 4, 0.4],
  ];
  for (const [color, dist, angle, radius] of regions) {
    const rx = c + Math.cos(angle) * base * dist * 0.7;
    const ry = c + Math.sin(angle) * base * dist * 0.7;
    const g = ctx.createRadialGradient(rx, ry, 0, rx, ry, base * radius);
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  ctx.globalAlpha = 1;

  // inner ring and nucleus, which give the body a cell-like internal pattern
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = Math.max(1, size * 0.012);
  ctx.beginPath();
  ctx.arc(c + Math.cos(p2) * base * 0.12, c + Math.sin(p2) * base * 0.12, base * 0.6, 0, Math.PI * 2);
  ctx.stroke();
  const nuc = ctx.createRadialGradient(c + Math.cos(p1) * base * 0.2, c + Math.sin(p1) * base * 0.2, 0, c + Math.cos(p1) * base * 0.2, c + Math.sin(p1) * base * 0.2, base * 0.3);
  nuc.addColorStop(0, "rgba(255,255,255,0.95)");
  nuc.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = nuc;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  for (let i = 0; i < 6; i++) {
    const a = p1 + i * 1.7;
    const d = base * (0.25 + ((i * 37) % 10) / 22);
    ctx.beginPath();
    ctx.arc(c + Math.cos(a) * d, c + Math.sin(a) * d, size * 0.012 + (i % 3) * size * 0.006, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // membrane
  ctx.strokeStyle = shade(main, -0.25);
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = Math.max(1, size * 0.022);
  ctx.stroke(body);
  ctx.globalAlpha = 1;
  return canvas;
}

interface Props {
  className?: string;
  /** Element that receives pointer interaction. Defaults to the closest ancestor marked data-sim-host, then the parent. */
  hostSelector?: string;
  /** Optional 0..1 value (e.g. scroll progress) that makes the agents converge into one swarm. */
  gatherRef?: { current: number };
}

export default function FutureComputingSimulation({ className = "", hostSelector = "[data-sim-host]", gatherRef }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const host = (wrap.closest(hostSelector) as HTMLElement | null) ?? wrap.parentElement ?? wrap;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dpr = 1;
    let width = 0;
    let height = 0;
    let swarm: Swarm | null = null;
    let sprites: HTMLCanvasElement[][] = [];
    let spritePx = 0;
    let raf = 0;
    let running = false;
    let visible = false;
    let last = 0;
    let frameTimes: number[] = [];
    const pointer: Pointer = { x: 0, y: 0, active: false };

    const targetCount = (w: number, h: number) => {
      const coarse = window.matchMedia("(pointer: coarse)").matches || w < 480;
      const count = Math.round((w * h) / 2200) * (coarse ? 0.75 : 1);
      return Math.max(70, Math.min(150, Math.round(count)));
    };

    const buildSprites = () => {
      spritePx = Math.max(32, Math.round(40 * dpr * 1.6));
      sprites = Array.from({ length: FAMILIES }, (_, f) => Array.from({ length: VARIANTS }, (_, v) => makeSprite(f, v, spritePx)));
    };

    const draw = () => {
      if (!swarm) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // connections: thin electric-blue lines that fade in and out as relationships change
      ctx.lineCap = "round";
      for (const link of swarm.links.values()) {
        const a = swarm.agents[link.a];
        const b = swarm.agents[link.b];
        if (!a || !b) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        if (Math.abs(dx) > width / 2 || Math.abs(dy) > height / 2) continue; // do not draw across the wrap-around seam
        const dist = Math.hypot(dx, dy);
        if (dist < 1) continue;
        const ease = link.s * link.s * (3 - 2 * link.s);
        ctx.strokeStyle = `rgba(${LINK_RGB}, ${(0.8 * ease).toFixed(3)})`;
        ctx.lineWidth = 0.7 + 0.9 * ease;
        ctx.beginPath();
        ctx.moveTo(a.x + (dx / dist) * a.r * 0.6, a.y + (dy / dist) * a.r * 0.6);
        ctx.lineTo(b.x - (dx / dist) * b.r * 0.6, b.y - (dy / dist) * b.r * 0.6);
        ctx.stroke();
      }

      // entities: colour follows the agent's trait, cross-fading between neighbouring families
      for (const agent of swarm.agents) {
        const f = agent.trait * FAMILIES - 0.5;
        const i0 = ((Math.floor(f) % FAMILIES) + FAMILIES) % FAMILIES;
        const i1 = (i0 + 1) % FAMILIES;
        const frac = f - Math.floor(f);
        const size = agent.r * 2.5;
        ctx.save();
        ctx.translate(agent.x, agent.y);
        ctx.rotate(agent.angle);
        ctx.globalAlpha = 1 - frac * 0.9;
        ctx.drawImage(sprites[i0][agent.variant], -size / 2, -size / 2, size, size);
        if (frac > 0.05) {
          ctx.globalAlpha = frac;
          ctx.drawImage(sprites[i1][agent.variant], -size / 2, -size / 2, size, size);
        }
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (!swarm) return;
      const dt = last ? (now - last) / 1000 : 1 / 60;
      last = now;
      if (gatherRef) swarm.gather = gatherRef.current;
      swarm.step(dt, pointer);
      draw();

      // gracefully reduce the number of entities on slower devices
      frameTimes.push(dt);
      if (frameTimes.length >= 90) {
        const avg = frameTimes.reduce((t, v) => t + v, 0) / frameTimes.length;
        frameTimes = [];
        // never drop agents while the swarm is forming: removing them (and their links) made it look broken
        if (!gatherRef && avg > 1 / 38 && swarm.agents.length > 110) swarm.setCount(Math.round(swarm.agents.length * 0.82));
      }
    };

    const start = () => {
      if (running || reduced.matches || !visible || document.hidden) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      if (w === width && h === height && swarm) return;
      const nextDpr = Math.min(2, window.devicePixelRatio || 1);
      if (nextDpr !== dpr || !sprites.length) { dpr = nextDpr; buildSprites(); }
      width = w; height = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      if (!swarm) {
        swarm = new Swarm(w, h, targetCount(w, h), 21);        // reduced motion shows a settled, meaningful state instead of animating
        const warmup = reduced.matches ? 900 : 120;
        for (let i = 0; i < warmup; i++) swarm.step(1 / 30);
      } else {
        swarm.resize(w, h);
        swarm.setCount(gatherRef ? Math.max(swarm.agents.length, targetCount(w, h)) : targetCount(w, h));
      }
      draw();
    };

    // pointer interaction: gentle response to the cursor, and a click or tap that disturbs nearby entities
    const local = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onMove = (event: PointerEvent) => {
      if (reduced.matches) return;
      const p = local(event);
      pointer.x = p.x; pointer.y = p.y; pointer.active = true;
    };
    const onLeave = () => { pointer.active = false; };
    const onDown = (event: PointerEvent) => {
      if (reduced.matches || !swarm) return;
      const p = local(event);
      swarm.disturb(p.x, p.y);
      if (event.pointerType !== "mouse") pointer.active = false;
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });
    host.addEventListener("pointerdown", onDown, { passive: true });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else stop();
    }, { threshold: 0.01 });
    intersection.observe(wrap);
    const onVisibility = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener("visibilitychange", onVisibility);
    const onMotionChange = () => { stop(); if (swarm && reduced.matches) { for (let i = 0; i < 600; i++) swarm.step(1 / 30); draw(); } else start(); };
    reduced.addEventListener("change", onMotionChange);

    resize();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onMotionChange);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
    };
  }, [hostSelector]);

  return (
    <div
      ref={wrapRef}
      className={className}
      role="img"
      aria-label="Illustrative simulation: many small organisms follow simple local rules and form, connect, merge and separate into groups."
    >
      <canvas ref={canvasRef} className="block h-full w-full" style={{ touchAction: "pan-y" }} />
    </div>
  );
}
