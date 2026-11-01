import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

/*
 * The hero's single beam of light, drawn in the logo's own coordinate space
 * (viewBox 675 × 563) so it stays locked to the mark at any size.
 *
 *   1. a straight white beam arrives from the left and enters the left leg (E)
 *   2. inside the glass it bends slightly downward (E → M → X)
 *   3. at the right edge (X) it leaves at a steeper angle and splits —
 *      thin spectral streaks (amber · white · cyan) exist only here
 *   4. a faint caustic patch lands on the floor beneath the mark
 *
 * Light always travels left → right and dips downward: the same direction as
 * every glass highlight on the site.
 */

const EASE = [0.22, 1, 0.36, 1];

const E = { x: 139, y: 330 }; // entry on the left outer edge
const M = { x: 338, y: 351 }; // bend point on the centre axis
const X = { x: 563, y: 375 }; // exit on the right outer edge

/* The warm ray bends least, the cool one most. Lengths stay short so colour reads as an edge effect. */
const RAYS = [
  { id: "coral", angle: 9.5, length: 330, color: "var(--c-amber-dark)", width: 1.9 },
  { id: "amber", angle: 11.5, length: 360, color: "var(--c-amber)", width: 1.9 },
  { id: "core", angle: 13.5, length: 470, color: "255 255 255", width: 2.6 },
  { id: "cyan", angle: 15.5, length: 350, color: "var(--c-cyan)", width: 1.9 },
  { id: "blue", angle: 17.5, length: 310, color: "var(--c-cyan-dark)", width: 2.2 },
];

const rad = (deg) => (deg * Math.PI) / 180;
const rgb = (channels, alpha = 1) => `rgb(${channels} / ${alpha})`;

export default function PrismBeam({ delay = 0 }) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const gid = (name) => `beam-${name}-${uid}`;

  // Draw-in: each stage waits for the one before it
  const at = (offset) => delay + offset;
  const draw = (offset, duration) =>
    reduce
      ? { initial: false }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration, delay: at(offset), ease: EASE },
        };
  const fade = (offset, duration) =>
    reduce
      ? { initial: false }
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration, delay: at(offset), ease: "easeOut" },
        };

  return (
    <svg
      viewBox="0 0 675.04566 563.20918"
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-visible"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* incoming beam: fades in from the far left */}
        <linearGradient id={gid("in")} gradientUnits="userSpaceOnUse" x1="-900" y1={E.y} x2={E.x} y2={E.y}>
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.95" />
        </linearGradient>

        {/* beam inside the glass */}
        <linearGradient id={gid("inside")} gradientUnits="userSpaceOnUse" x1={E.x} y1="0" x2={X.x} y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.85" />
        </linearGradient>

        {/* each exit ray fades along its length */}
        {RAYS.map((ray) => (
          <linearGradient
            key={ray.id}
            id={gid(ray.id)}
            gradientUnits="userSpaceOnUse"
            x1={X.x}
            y1={X.y}
            x2={X.x + Math.cos(rad(ray.angle)) * ray.length}
            y2={X.y + Math.sin(rad(ray.angle)) * ray.length}
          >
            <stop offset="0" style={{ stopColor: rgb(ray.color), stopOpacity: ray.id === "core" ? 0.95 : 0.8 }} />
            <stop offset="1" style={{ stopColor: rgb(ray.color), stopOpacity: 0 }} />
          </linearGradient>
        ))}

        {/* caustic floor patch: soft, but only just */}
        <filter id={gid("blur")} x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <linearGradient id={gid("floor")} gradientUnits="userSpaceOnUse" x1="360" y1="0" x2="720" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* caustics on the floor beneath the mark */}
      <motion.g {...fade(1.7, 1.4)}>
        <g filter={`url(#${gid("blur")})`} transform="rotate(-2 520 612)" style={{ mixBlendMode: "screen" }}>
          <ellipse cx="420" cy="606" rx="120" ry="7" style={{ fill: rgb("var(--c-cyan-dark)", 0.3) }} />
          <ellipse cx="495" cy="612" rx="100" ry="6" style={{ fill: rgb("var(--c-cyan)", 0.24) }} />
          <ellipse cx="570" cy="618" rx="80" ry="5" style={{ fill: rgb("var(--c-amber)", 0.24) }} />
          <ellipse cx="640" cy="622" rx="52" ry="4" style={{ fill: rgb("var(--c-amber-dark)", 0.24) }} />
        </g>
        <line x1="360" y1="599" x2="720" y2="607" stroke={`url(#${gid("floor")})`} strokeWidth="1.1" />
      </motion.g>

      {/* 1 · incoming beam */}
      <motion.line
        x1="-900"
        y1={E.y}
        x2={E.x}
        y2={E.y}
        stroke={`url(#${gid("in")})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        {...draw(0, 1.1)}
      />

      {/* 2 · bend inside the glass */}
      <motion.path
        d={`M${E.x} ${E.y} L${M.x} ${M.y} L${X.x} ${X.y}`}
        fill="none"
        stroke={`url(#${gid("inside")})`}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ mixBlendMode: "screen" }}
        {...draw(0.95, 0.55)}
      />

      {/* 3 · exit and dispersion — spectral colour lives here only */}
      <g className="prism-streaks">
        {RAYS.map((ray, i) => (
          <motion.line
            key={ray.id}
            x1={X.x}
            y1={X.y}
            x2={X.x + Math.cos(rad(ray.angle)) * ray.length}
            y2={X.y + Math.sin(rad(ray.angle)) * ray.length}
            stroke={`url(#${gid(ray.id)})`}
            strokeWidth={ray.width}
            strokeLinecap="round"
            style={{ mixBlendMode: "screen" }}
            {...draw(1.4 + i * 0.07, 0.9)}
          />
        ))}
      </g>

      {/* crisp glints where the beam meets the glass */}
      <motion.g {...fade(1.0, 0.5)}>
        <circle cx={E.x} cy={E.y} r="2.2" fill="#fff" fillOpacity="0.9" />
      </motion.g>
      <motion.g {...fade(1.4, 0.5)} style={{ transformOrigin: `${X.x}px ${X.y}px` }}>
        <circle cx={X.x} cy={X.y} r="2.6" fill="#fff" />
        <path
          d={`M${X.x - 15} ${X.y} H${X.x + 15} M${X.x} ${X.y - 15} V${X.y + 15}`}
          stroke="#fff"
          strokeOpacity="0.7"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </motion.g>
    </svg>
  );
}
