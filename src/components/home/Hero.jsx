import { useEffect, useRef } from "react";
import { motion, useAnimationFrame, useReducedMotion } from "framer-motion";
import { SITE } from "../../utils/constants";
import Button from "../common/Button/Button";
import SplitText from "../common/SplitText/SplitText";
import "./Hero.css";

const EASE = [0.22, 1, 0.36, 1];
const CURVE =
  "M -40 560 C 160 560 240 150 470 230 C 700 310 740 580 950 450 C 1100 357 1150 150 1260 110";

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const lineRef = useRef(null);
  const dotRef = useRef(null);
  const haloRef = useRef(null);
  const totalRef = useRef(0);

  /* Place the dot on the curve and draw its tangent line */
  function place(u) {
    const path = pathRef.current;
    const line = lineRef.current;
    const dot = dotRef.current;
    const halo = haloRef.current;
    if (!path || !line || !dot || !halo) return;

    if (!totalRef.current) totalRef.current = path.getTotalLength();
    const total = totalRef.current;
    const at = total * (0.06 + 0.88 * u);

    const p = path.getPointAtLength(at);
    const a = path.getPointAtLength(Math.max(at - 1, 0));
    const b = path.getPointAtLength(Math.min(at + 1, total));
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const m = Math.hypot(dx, dy) || 1;
    const ux = dx / m;
    const uy = dy / m;
    const reach = 190;

    line.setAttribute("x1", p.x - ux * reach);
    line.setAttribute("y1", p.y - uy * reach);
    line.setAttribute("x2", p.x + ux * reach);
    line.setAttribute("y2", p.y + uy * reach);
    dot.setAttribute("cx", p.x);
    dot.setAttribute("cy", p.y);
    halo.setAttribute("cx", p.x);
    halo.setAttribute("cy", p.y);
  }

  useAnimationFrame((t) => {
    if (reduce) return;
    // Smooth back-and-forth along the curve
    const u = 0.5 - 0.5 * Math.cos(((t / 1000) * Math.PI * 2) / 16);
    place(u);
  });

  useEffect(() => {
    place(0.42);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  function onMove(event) {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${event.clientY - rect.top}px`);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      className="hero relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      <div className="hero-glow" aria-hidden="true" />

      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-70 sm:opacity-100"
        viewBox="0 0 1200 640"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <linearGradient id="hero-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2dd4bf" stopOpacity="0" />
            <stop offset="0.35" stopColor="#2dd4bf" stopOpacity="0.55" />
            <stop offset="1" stopColor="#f59e0b" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <motion.path
          ref={pathRef}
          d={CURVE}
          className="hero-curve"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.7, ease: EASE }}
        />
        <line ref={lineRef} className="hero-tangent-line" />
        <circle ref={haloRef} r="14" className="hero-halo" />
        <circle ref={dotRef} r="5" className="hero-dot" />
      </svg>

      <div className="container-x relative z-10 pb-28 pt-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="eyebrow"
        >
          {SITE.fullName} {SITE.year}
        </motion.p>

        <SplitText
          as="h1"
          text={SITE.theme}
          accent={[1]}
          accentClass="hero-tangent shimmer"
          inView={false}
          delay={0.6}
          stagger={0.12}
          className="mt-8 text-[clamp(3.4rem,12vw,9.5rem)] font-bold leading-[0.9] tracking-tighter text-chalk"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
          className="mt-8 max-w-md font-display text-lg text-amber-light sm:text-xl"
        >
          {SITE.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="#register" arrow>
            Register Now
          </Button>
          <Button href="#themes" variant="ghost">
            Explore Themes
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="container-x absolute inset-x-0 bottom-8 z-10 flex items-end justify-between"
      >
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-slate-400">
          {SITE.dates} <span className="px-2 text-amber">/</span> {SITE.venue}
        </p>
        <span className="hero-cue" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
