import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useReducedMotion } from "framer-motion";
import { SITE } from "../../utils/constants";
import Button from "../common/Button/Button";
import SplitText from "../common/SplitText/SplitText";
import Logo from "../common/Logo/Logo";
import PrismBeam from "./PrismBeam";
import "./Hero.css";

const EASE = [0.22, 1, 0.36, 1];
const CURVE =
  "M -40 560 C 160 560 240 150 470 230 C 700 310 740 580 950 450 C 1100 357 1150 150 1260 110";

/* When the full-screen intro just played, its mark flies into this one (see
   Preloader). The hero mark fades in underneath as it lands, and the beam
   waits until the mark is in place. Without the intro, the mark assembles
   here and the beam follows the assembly. */
const HANDOFF_FADE_AT = 1.0;
const BEAM_DELAY_AFTER_INTRO = 1.4;
const BEAM_DELAY_AFTER_ASSEMBLY = 2.9;

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const lineRef = useRef(null);
  const dotRef = useRef(null);
  const haloRef = useRef(null);
  const totalRef = useRef(0);
  const [afterIntro] = useState(() => document.documentElement.dataset.introPlayed === "1");

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
      className="hero relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden text-center"
    >
      <div className="hero-glow" aria-hidden="true" />

      {/* the theme's curve and moving tangent — kept quiet behind the mark */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-40 sm:opacity-60"
        viewBox="0 0 1200 640"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <linearGradient id="hero-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" className="hero-stroke-a" stopOpacity="0" />
            <stop offset="0.35" className="hero-stroke-a" stopOpacity="0.45" />
            <stop offset="1" className="hero-stroke-b" stopOpacity="0.7" />
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

      {/* Centrepiece: the RIC mark with the beam that enters, bends and splits */}
      <div className="relative z-[1] mt-24 sm:mt-20">
        <motion.div
          data-ric-mark=""
          aria-hidden="true"
          className="relative w-[clamp(15rem,min(46vw,46svh),30rem)]"
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <Logo
            variant="hero"
            decorative
            float={false}
            assembled={afterIntro}
            revealDelay={HANDOFF_FADE_AT}
            className="w-full"
          />
          <PrismBeam delay={afterIntro ? BEAM_DELAY_AFTER_INTRO : BEAM_DELAY_AFTER_ASSEMBLY} />
        </motion.div>
      </div>

      <div className="container-x relative z-10 flex flex-col items-center pb-24 pt-10 sm:pt-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="eyebrow before:hidden sm:before:block"
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
          className="mt-6 text-[clamp(2.8rem,9vw,7rem)] font-bold leading-[0.95] tracking-tighter text-chalk"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
          className="mt-6 max-w-md font-sub text-lg text-amber-light sm:text-xl"
        >
          {SITE.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
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
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
          {SITE.dates} <span className="px-2 text-amber">/</span> {SITE.venue}
        </p>
        <span className="hero-cue" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
