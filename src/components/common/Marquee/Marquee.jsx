import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const wrap = (min, max, value) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

/* Scroll-velocity marquee: drifts on its own, speeds up and reverses with scrolling. */
export default function Marquee({ items = [], speed = -2.2 }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(1);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (value) => `${wrap(-25, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * speed * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  if (items.length === 0) return null;
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-white/10 py-6"
      style={{ WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)" }}
    >
      <motion.div className="flex w-max whitespace-nowrap" style={{ x }}>
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-8 pr-8 font-display text-4xl font-bold uppercase tracking-tight sm:text-6xl"
            style={{
              WebkitTextStroke: "1px rgba(237, 233, 254, 0.35)",
              color: index % 2 === 0 ? "transparent" : "rgba(237, 233, 254, 0.9)",
            }}
          >
            {item}
            <span className="text-2xl text-amber" style={{ WebkitTextStroke: "0" }}>
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
