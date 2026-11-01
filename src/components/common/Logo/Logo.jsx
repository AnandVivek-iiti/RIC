import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SITE } from "../../../utils/constants";
import { LOGO_SHARDS } from "./logoShards";

const EASE = [0.22, 1, 0.36, 1];
const VIEW_BOX = "0 0 675.04566 563.20918";
/* The facets are authored in the original artwork's coordinates */
const ARTWORK_SHIFT = "translate(-1174.8137,-867.69841)";

/* Cool the dark slate facets toward Prismatic Blue so the mark sits in the
   glass palette. 0 keeps the original artwork colours. */
const COOL_TINT = 0.28;
const PRISM_BLUE = [36, 92, 255];

function tintFill(hex) {
  if (!COOL_TINT) return hex;
  const n = parseInt(hex.slice(1), 16);
  const rgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const luma = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  if (luma > 0.45) return hex; // amber and cream facets keep their warm light
  const mixed = rgb.map((v, i) => Math.round(v * (1 - COOL_TINT) + PRISM_BLUE[i] * COOL_TINT));
  return `#${mixed.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

const SHARDS = LOGO_SHARDS.map(([d, fill]) => [d, tintFill(fill)]);

/* Each facet starts at a fixed, slightly irregular offset: it is drawn as a
   cool outline while sliding home, then fills in. Deterministic on purpose. */
const SCATTER = SHARDS.map((_, i) => {
  const angle = ((i * 137.508) % 360) * (Math.PI / 180);
  const dist = 26 + ((i * 47) % 58);
  return { x: Math.round(Math.cos(angle) * dist), y: Math.round(Math.sin(angle) * dist) };
});

/* hero:    the slow assembly on the Home page
   preload: a quicker assembly (~2.1 s) for the full-screen intro */
const TIMING = {
  hero: { stagger: 0.016, delay: 0.3, move: 1.3, draw: 1.5 },
  preload: { stagger: 0.011, delay: 0.12, move: 1.0, draw: 1.2 },
};

function makeVariants({ stagger, delay, move, draw }) {
  const keyframes = { duration: draw, times: [0, 0.55, 1], ease: "easeOut" };
  return {
    assemble: {
      hidden: {},
      show: { transition: { staggerChildren: stagger, delayChildren: delay } },
    },
    shard: {
      hidden: (offset) => ({
        x: offset.x,
        y: offset.y,
        pathLength: 0,
        fillOpacity: 0,
        strokeOpacity: 1,
        strokeWidth: 2.5,
      }),
      show: {
        x: 0,
        y: 0,
        pathLength: [0, 1, 1],
        fillOpacity: [0, 0, 1],
        // the outline settles into a faint contour (see .ric-facet) instead of vanishing
        strokeOpacity: [1, 1, 0.26],
        strokeWidth: [2.5, 2.5, 0.6],
        transition: {
          default: { duration: move, ease: EASE },
          pathLength: keyframes,
          fillOpacity: keyframes,
          strokeOpacity: keyframes,
          strokeWidth: keyframes,
        },
      },
    },
  };
}

const VARIANTS = { hero: makeVariants(TIMING.hero), preload: makeVariants(TIMING.preload) };

/*
 * RIC mark as inline SVG.
 *  variant="hero"    — outline draw + assembly, halo and a looping light sweep.
 *                      Pass `assembled` to skip the assembly (the intro already played it)
 *                      and `float={false}` when a parent moves the mark itself.
 *  variant="preload" — the same assembly, faster, for the full-screen intro
 *  variant="nav"     — quiet fade-in; hover tilts the mark and sends one light sweep across it
 * `decorative` hides it from assistive tech. Motion is dropped under prefers-reduced-motion.
 */
export default function Logo({
  className = "h-8 w-8",
  variant = "nav",
  decorative = false,
  assembled = false,
  float = true,
  revealDelay = 0,
}) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const clipId = `ric-clip-${uid}`;
  const sheenId = `ric-sheen-${uid}`;

  const a11y = decorative
    ? { "aria-hidden": true, focusable: "false" }
    : { role: "img", "aria-label": `${SITE.name} logo` };

  const defs = (
    <defs>
      <clipPath id={clipId}>
        {SHARDS.map(([d], i) => (
          <path key={i} d={d} />
        ))}
      </clipPath>
      <linearGradient id={sheenId} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" style={{ stopColor: "rgb(var(--c-pearl))", stopOpacity: 0 }} />
        <stop offset="0.5" style={{ stopColor: "rgb(var(--c-pearl))", stopOpacity: 0.55 }} />
        <stop offset="1" style={{ stopColor: "rgb(var(--c-pearl))", stopOpacity: 0 }} />
      </linearGradient>
    </defs>
  );

  const sheen = reduce ? null : (
    <g transform={ARTWORK_SHIFT}>
      <g clipPath={`url(#${clipId})`} pointerEvents="none">
        <g transform="rotate(20 1512 1150)">
          <rect className="ric-sheen" x="1452" y="700" width="120" height="900" fill={`url(#${sheenId})`} />
        </g>
      </g>
    </g>
  );

  const staticShards = SHARDS.map(([d, fill], i) => <path key={i} d={d} fill={fill} className="ric-facet" />);

  if (variant === "hero" || variant === "preload") {
    const isPreload = variant === "preload";
    const { assemble, shard } = VARIANTS[variant];
    const floatMotion =
      reduce || isPreload || !float
        ? {}
        : {
            animate: { y: [0, -10, 0] },
            transition: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.4 },
          };

    let artwork;
    if (reduce) {
      artwork = staticShards;
    } else if (assembled) {
      // Already assembled by the intro: just fade in where the preloader's mark lands
      artwork = (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: revealDelay, ease: "easeOut" }}
        >
          {staticShards}
        </motion.g>
      );
    } else {
      artwork = (
        <motion.g variants={assemble} initial="hidden" animate="show">
          {SHARDS.map(([d, fill], i) => (
            <motion.path
              key={i}
              d={d}
              fill={fill}
              className="ric-outline"
              variants={shard}
              custom={SCATTER[i]}
            />
          ))}
        </motion.g>
      );
    }

    return (
      <div className={`ric-logo ric-logo--${variant} relative ${className}`}>
        {!reduce && !isPreload && <span className="ric-halo" aria-hidden="true" />}
        <motion.div {...floatMotion}>
          <svg viewBox={VIEW_BOX} className="block h-auto w-full" {...a11y}>
            {defs}
            <g transform={ARTWORK_SHIFT}>{artwork}</g>
            {isPreload ? null : sheen}
          </svg>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.svg
      viewBox={VIEW_BOX}
      className={`ric-logo ric-logo--nav ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
      whileHover={
        reduce ? undefined : { scale: 1.12, rotate: -4, transition: { type: "spring", stiffness: 300, damping: 18 } }
      }
      {...a11y}
    >
      {defs}
      <g transform={ARTWORK_SHIFT}>{staticShards}</g>
      {sheen}
    </motion.svg>
  );
}
