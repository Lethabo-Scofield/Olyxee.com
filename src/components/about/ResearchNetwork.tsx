"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Atom, BrainCircuit, CircuitBoard, Cog, Sigma, type LucideIcon } from "lucide-react";

// Olyxee's long-term research interests, drawn as a connected network around one idea.
// They are interests and open questions, not results.
type Interest = {
  title: string;
  question: string;
  x: number;
  y: number;
  icon: LucideIcon;
  // Tailwind classes are written out in full so they are picked up at build time.
  line: string;
  lineOn: string;
  tile: string;
  ringOn: string;
  glow: string;
  dot: string;
};

const INTERESTS: Interest[] = [
  {
    title: "Mathematical foundations of intelligence",
    question: "What mathematical structure underlies intelligence?",
    x: 50, y: 11, icon: Sigma,
    line: "stroke-blue-300", lineOn: "stroke-blue-600", tile: "bg-blue-50 text-blue-600", ringOn: "ring-blue-500", glow: "shadow-blue-500/20", dot: "bg-blue-500",
  },
  {
    title: "Learning and adaptive computation",
    question: "How do systems learn and adapt as conditions change?",
    x: 87, y: 38, icon: BrainCircuit,
    line: "stroke-orange-300", lineOn: "stroke-orange-500", tile: "bg-orange-50 text-orange-600", ringOn: "ring-orange-500", glow: "shadow-orange-500/20", dot: "bg-orange-500",
  },
  {
    title: "Novel computational architectures",
    question: "What could computing look like beyond today’s architectures?",
    x: 73, y: 85, icon: CircuitBoard,
    line: "stroke-emerald-300", lineOn: "stroke-emerald-600", tile: "bg-emerald-50 text-emerald-600", ringOn: "ring-emerald-500", glow: "shadow-emerald-500/20", dot: "bg-emerald-500",
  },
  {
    title: "Information theory and physical principles of computation",
    question: "What do information and physics say about computation?",
    x: 27, y: 85, icon: Atom,
    line: "stroke-violet-300", lineOn: "stroke-violet-600", tile: "bg-violet-50 text-violet-600", ringOn: "ring-violet-500", glow: "shadow-violet-500/20", dot: "bg-violet-500",
  },
  {
    title: "New mechanisms for intelligent systems",
    question: "Which new mechanisms could give machines intelligence?",
    x: 13, y: 38, icon: Cog,
    line: "stroke-pink-300", lineOn: "stroke-pink-500", tile: "bg-pink-50 text-pink-600", ringOn: "ring-pink-500", glow: "shadow-pink-500/20", dot: "bg-pink-500",
  },
];

const CENTER = { x: 50, y: 49 };

export default function ResearchNetwork() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 1, delay, ease: "easeOut" as const },
        };

  return (
    <>
      {/* Large screens: a network around one idea */}
      <div className="relative hidden lg:block h-[620px] w-full" role="list" aria-label="Research interests">
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          {/* faint ring joining neighbouring interests */}
          {INTERESTS.map((from, i) => {
            const to = INTERESTS[(i + 1) % INTERESTS.length];
            return (
              <motion.line
                key={`ring-${i}`}
                x1={`${from.x}%`} y1={`${from.y}%`} x2={`${to.x}%`} y2={`${to.y}%`}
                className="stroke-neutral-200" strokeWidth={1} strokeDasharray="3 5"
                {...draw(0.1 * i)}
              />
            );
          })}
          {/* spokes to the centre, each in its interest's colour */}
          {INTERESTS.map((node, i) => (
            <motion.line
              key={`spoke-${i}`}
              x1={`${CENTER.x}%`} y1={`${CENTER.y}%`} x2={`${node.x}%`} y2={`${node.y}%`}
              className={active === i ? node.lineOn : node.line}
              strokeWidth={active === i ? 2.5 : 1.75}
              strokeLinecap="round"
              style={{ transition: "stroke 200ms, stroke-width 200ms" }}
              {...draw(0.3 + 0.1 * i)}
            />
          ))}
        </svg>

        {/* centre */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}>
          {!reduce && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-pink-500/30"
              animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-neutral-950 px-6 text-center ring-8 ring-neutral-100">
            <span className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-600/25 via-transparent to-pink-500/25" aria-hidden />
            <span className="relative font-serif text-lg leading-tight tracking-tight text-white">Intelligent computing</span>
          </div>
        </div>

        {INTERESTS.map((node, i) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.title}
              role="listitem"
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.5 + 0.1 * i }}
              className={`absolute w-[15.5rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-5 py-4 outline-none ring-1 transition-all duration-200 ${
                active === i ? `${node.ringOn} shadow-xl ${node.glow} -translate-y-[calc(50%+2px)]` : "ring-neutral-200"
              } focus-visible:ring-2 ${node.ringOn}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className="flex items-start gap-3.5">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${node.tile}`} aria-hidden>
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-serif text-[1.0625rem] leading-snug tracking-tight text-neutral-900">{node.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-snug text-neutral-500">{node.question}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Smaller screens: the same network as a connected vertical chain */}
      <div className="lg:hidden" role="list" aria-label="Research interests">
        <div className="relative pl-10">
          <span aria-hidden className="absolute left-[13px] top-3 bottom-3 w-0.5 rounded-full bg-gradient-to-b from-blue-400 via-emerald-400 to-pink-400" />
          <div role="listitem" className="relative mb-5 inline-flex rounded-full bg-neutral-950 px-5 py-2.5 font-serif text-base tracking-tight text-white">
            <span aria-hidden className="absolute -left-10 top-1/2 h-[27px] w-[27px] -translate-y-1/2 rounded-full bg-neutral-950 ring-4 ring-white" />
            Intelligent computing
          </div>
          <ul className="list-none space-y-4 p-0">
            {INTERESTS.map((node) => {
              const Icon = node.icon;
              return (
                <li key={node.title} role="listitem" className="relative rounded-2xl bg-white px-4 py-4 ring-1 ring-neutral-200">
                  <span aria-hidden className={`absolute -left-[33px] top-7 h-3.5 w-3.5 rounded-full ring-4 ring-white ${node.dot}`} />
                  <div className="flex items-start gap-3.5">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${node.tile}`} aria-hidden>
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-serif text-lg leading-snug tracking-tight text-neutral-900">{node.title}</h3>
                      <p className="mt-1.5 text-sm leading-snug text-neutral-500">{node.question}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
