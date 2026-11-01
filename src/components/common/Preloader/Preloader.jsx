import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import Logo from "../Logo/Logo";

/*
 * Full-screen intro: a Midnight Teal stage, the RIC mark assembling in the
 * middle (outline draw, then fill) and a thin progress line.
 *
 * It stays at least MIN_MS, and longer while fonts and page assets are still
 * loading (capped by LOAD_CAP_MS so a slow network cannot trap the visitor).
 * It then exits like light through glass: a beam crosses the stage, the stage
 * splits along it and parts like a curtain, and the mark flies into the Home
 * hero where it continues as the centrepiece.
 *
 * The site is mounted only when the exit starts (onReveal), so its entrance
 * animations play in view. Shown once per session; skipped under
 * prefers-reduced-motion (see shouldPlayIntro).
 */

const MIN_MS = 2600; // ≈ 2.5 s minimum (the mark needs ~2.1 s to assemble)
const LOAD_CAP_MS = 6000;
const SEEN_KEY = "ric:intro-seen";
const EASE = [0.22, 1, 0.36, 1];
const EASE_IO = [0.76, 0, 0.24, 1];

/* Timeline of the exit, in seconds after it starts. Hero.jsx fades its own
   mark in around FLY_END so the hand-off is seamless — keep the two in step. */
const SEAM_DRAW = 0.5;
const MOUNT_AT = 0.35; // site mounts under the closed panels
const PANEL_DURATION = 0.9;
const FLY_DURATION = 1.0;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const nextFrames = (count) =>
  new Promise((resolve) => {
    const step = (left) => (left <= 0 ? resolve() : requestAnimationFrame(() => step(left - 1)));
    step(count);
  });
const withCap = (promise, ms) => Promise.race([promise.catch(() => undefined), sleep(ms)]);

export function shouldPlayIntro() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (window.sessionStorage.getItem(SEEN_KEY)) return false;
  } catch {
    /* storage blocked: the intro then plays once per page load */
  }
  return true;
}

/* Fetch the faces the site is about to use, so nothing swaps (and shifts) after the reveal */
function loadActiveFonts() {
  if (!document.fonts?.load) return Promise.resolve();
  const css = getComputedStyle(document.documentElement);
  const jobs = [document.fonts.ready];
  for (const name of ["--font-display", "--font-sub", "--font-body", "--font-mono"]) {
    const family = css.getPropertyValue(name).trim();
    if (!family) continue;
    for (const face of ["400", "700", "italic 400"]) {
      jobs.push(document.fonts.load(`${face} 1em ${family}`).catch(() => []));
    }
  }
  return Promise.all(jobs);
}

const pageLoaded = () =>
  new Promise((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", resolve, { once: true });
  });

const stagePanel = (anchor) => ({
  background: `radial-gradient(70vmax 50vmax at 50% ${anchor}, rgb(var(--c-ink-light)), rgb(var(--c-ink)) 70%)`,
});

export default function Preloader({ onReveal, onDone }) {
  const progress = useMotionValue(0);
  const markRef = useRef(null);
  const markLayerRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const seamRef = useRef(null);
  const chromeRef = useRef(null);
  const callbacks = useRef({ onReveal, onDone });
  callbacks.current = { onReveal, onDone };

  useEffect(() => {
    let cancelled = false;
    let raf = 0;
    const start = performance.now();
    let assetsReady = false;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    Promise.all([withCap(loadActiveFonts(), LOAD_CAP_MS), withCap(pageLoaded(), LOAD_CAP_MS)]).then(() => {
      assetsReady = true;
    });

    async function exit() {
      root.dataset.introPlayed = "1";
      try {
        window.sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }

      try {
        const seam = animate(seamRef.current, { scaleX: [0, 1] }, { duration: SEAM_DRAW, ease: EASE_IO });
        animate(chromeRef.current, { opacity: 0 }, { duration: 0.3 });

        await sleep(MOUNT_AT * 1000);
        if (cancelled) return;
        callbacks.current.onReveal();
        await nextFrames(3); // let the Home hero lay out so we can measure where the mark lands
        const source = markRef.current.getBoundingClientRect();
        const targetEl = document.querySelector("[data-ric-mark]");
        const target = targetEl ? targetEl.getBoundingClientRect() : null;
        await seam;
        if (cancelled) return;

        const fly = target
          ? {
              x: target.left + target.width / 2 - (source.left + source.width / 2),
              y: target.top + target.height / 2 - (source.top + source.height / 2),
              scale: target.width / source.width,
            }
          : { x: 0, y: 0, scale: 1.12 };

        animate(topRef.current, { y: "-100%" }, { duration: PANEL_DURATION, ease: EASE_IO });
        animate(bottomRef.current, { y: "100%" }, { duration: PANEL_DURATION, ease: EASE_IO });
        animate(seamRef.current, { opacity: 0 }, { duration: 0.5, delay: 0.1 });
        const flight = animate(markRef.current, fly, { duration: FLY_DURATION, ease: EASE });
        await flight;
        if (cancelled) return;
        // the hero mark is now fading in underneath; let this one go
        await animate(markLayerRef.current, { opacity: 0 }, { duration: 0.3, ease: "easeOut" });
      } catch {
        /* if anything in the exit fails, fall through and simply remove the intro */
      }

      if (cancelled) return;
      callbacks.current.onReveal();
      root.style.overflow = previousOverflow;
      callbacks.current.onDone();
    }

    const tick = (now) => {
      if (cancelled) return;
      const elapsed = now - start;
      const byTime = Math.min(elapsed / MIN_MS, 1);
      // while assets are still loading the line eases toward 96 % and waits
      const waiting = 0.9 + 0.06 * (1 - Math.exp(-Math.max(elapsed - MIN_MS, 0) / 4000));
      const value = Math.min(byTime, assetsReady ? 1 : waiting);
      progress.set(value);
      if (value >= 1) {
        exit();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      root.style.overflow = previousOverflow;
    };
  }, [progress]);

  return (
    <div role="status" aria-live="polite" aria-label="Loading RIC 2027" className="fixed inset-0 z-[200]">
      {/* the stage, in two halves that part along the beam */}
      <div ref={topRef} className="absolute inset-x-0 top-0 h-1/2 will-change-transform" style={stagePanel("100%")} />
      <div ref={bottomRef} className="absolute inset-x-0 bottom-0 h-1/2 will-change-transform" style={stagePanel("0%")} />

      {/* the beam that opens the stage */}
      <div
        ref={seamRef}
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 z-[5] h-px origin-left"
        style={{
          transform: "scaleX(0)",
          background: "linear-gradient(90deg, transparent, rgb(255 255 255) 14%, rgb(255 255 255) 86%, transparent)",
          boxShadow: "0 0 10px rgb(255 255 255 / 0.3)",
        }}
      />

      {/* the mark, same size as the hero's so the hand-off is a short flight */}
      <div ref={markLayerRef} className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div ref={markRef} className="w-[clamp(15rem,min(46vw,46svh),30rem)]">
          <Logo variant="preload" decorative className="w-full" />
        </div>
      </div>

      {/* progress */}
      <div
        ref={chromeRef}
        className="absolute inset-x-0 bottom-[9vh] z-10 flex flex-col items-center gap-4 px-6"
      >
        <div className="h-px w-52 overflow-hidden bg-chalk/15">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-prism via-mint to-chalk"
            style={{ scaleX: progress }}
          />
        </div>
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.3em] text-slate-400">
          Chasing Tangents <span className="px-1 text-amber">/</span> RIC 2027
        </p>
      </div>
    </div>
  );
}
