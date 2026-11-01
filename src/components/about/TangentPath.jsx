import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/* The four stages drawn as one path: a straight line, a fracture, a curve whose
   tangent leaves it, and the horizon. The drawing sequences the stages; the labels
   underneath are ordinary text, so the diagram is decoration for screen readers. */
const SEGMENTS = [
  { d: "M 30 230 L 250 230", color: "rgb(var(--c-pearl) / 0.7)", start: 0, dur: 0.8 },
  {
    d: "M 250 230 L 285 185 L 315 248 L 345 170 L 375 240 L 405 198 L 440 232",
    color: "rgb(var(--c-coral-light))",
    start: 0.8,
    dur: 1,
  },
  { d: "M 440 232 C 520 232 580 222 625 165", color: "rgb(var(--c-cyan))", start: 1.8, dur: 1 },
  { d: "M 625 165 L 700 70", color: "rgb(var(--c-cyan-light))", start: 2.8, dur: 0.5, thin: true },
  { d: "M 700 70 L 990 70", color: "rgb(var(--c-amber))", start: 3.3, dur: 0.8 },
];

const NODES = [
  { x: 125, y: 230, at: 0.5, color: "rgb(var(--c-pearl))" },
  { x: 375, y: 240, at: 1.6, color: "rgb(var(--c-coral-light))" },
  { x: 625, y: 165, at: 2.7, color: "rgb(var(--c-cyan))" },
  { x: 875, y: 70, at: 3.8, color: "rgb(var(--c-amber))" },
];

export default function TangentPath({ stages = [] }) {
  const reduce = useReducedMotion();
  const view = { once: true, amount: 0.35 };

  return (
    <div>
      <svg viewBox="0 0 1000 290" aria-hidden="true" className="h-auto w-full overflow-visible">
        {/* faint construction lines */}
        <line x1="0" y1="70" x2="1000" y2="70" stroke="rgb(var(--c-pearl) / 0.06)" strokeDasharray="2 8" />
        <line x1="0" y1="230" x2="1000" y2="230" stroke="rgb(var(--c-pearl) / 0.05)" strokeDasharray="2 8" />

        {/* the rising sun on the horizon */}
        <motion.path
          d="M 827 70 A 48 48 0 0 1 923 70"
          fill="rgb(var(--c-amber) / 0.1)"
          stroke="rgb(var(--c-amber) / 0.55)"
          strokeWidth="1"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={view}
          transition={{ duration: 0.9, delay: 3.6, ease: EASE }}
        />

        {SEGMENTS.map((seg) => (
          <motion.path
            key={seg.d}
            d={seg.d}
            fill="none"
            stroke={seg.color}
            strokeWidth={seg.thin ? 1.5 : 2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={seg.thin ? "5 6" : undefined}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={view}
            transition={{ duration: seg.dur, delay: seg.start, ease: "easeInOut" }}
          />
        ))}

        {NODES.map((node) => (
          <motion.g
            key={node.x}
            initial={reduce ? false : { opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={view}
            transition={{ duration: 0.5, delay: node.at, ease: EASE }}
            style={{ transformOrigin: `${node.x}px ${node.y}px`, transformBox: "view-box" }}
          >
            <circle cx={node.x} cy={node.y} r="11" fill="rgb(var(--c-ink))" stroke={node.color} strokeOpacity="0.5" />
            <circle cx={node.x} cy={node.y} r="4.5" fill={node.color} />
          </motion.g>
        ))}
      </svg>

      <ol className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {stages.map((stage, i) => (
          <motion.li
            key={stage.name}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: reduce ? 0 : NODES[i].at, ease: EASE }}
            className="relative"
          >
            <p className="font-mono text-sm tabular-nums" style={{ color: NODES[i].color }}>
              0{i + 1}
            </p>
            <p className="mt-2 font-sub text-2xl font-semibold text-chalk">{stage.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{stage.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
