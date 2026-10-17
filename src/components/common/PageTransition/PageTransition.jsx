import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

const page = {
  initial: {},
  enter: {},
  exit: { transition: { duration: 0.55 } },
};

/* Curtain wipes up over the old page, then retracts to reveal the new one */
const curtain = {
  initial: { scaleY: 1, originY: 0 },
  enter: {
    scaleY: 0,
    originY: 0,
    transition: { duration: 0.75, ease: EASE, delay: 0.05, originY: { duration: 0 } },
  },
  exit: {
    scaleY: 1,
    originY: 1,
    transition: { duration: 0.55, ease: EASE, originY: { duration: 0 } },
  },
};

export default function PageTransition({ routeKey, children }) {
  const reduce = useReducedMotion();

  if (reduce) return <div key={routeKey}>{children}</div>;

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}
    >
      <motion.div key={routeKey} variants={page} initial="initial" animate="enter" exit="exit">
        {children}
        <motion.div
          aria-hidden="true"
          variants={curtain}
          className="pointer-events-none fixed inset-0 z-[70] bg-ink-light"
        >
          <div className="absolute inset-x-0 bottom-0 h-px bg-amber/70" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
