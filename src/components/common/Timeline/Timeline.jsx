import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

function TimelineItem({ item }) {
  return (
    <motion.li
      className="relative grid gap-1 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
      initial={{ opacity: 0.3, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ margin: "-30% 0px -30% 0px" }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <span
        aria-hidden="true"
        className="absolute -left-10 top-[0.6rem] h-[13px] w-[13px] rounded-full border border-amber bg-ink"
      />
      <div>
        <p className="font-display text-xl font-semibold text-chalk sm:text-2xl">{item.title}</p>
        {item.text && <p className="mt-1 max-w-xl text-slate-400">{item.text}</p>}
      </div>
      {item.aside && <p className="font-display text-sm font-semibold text-amber">{item.aside}</p>}
    </motion.li>
  );
}

/* Vertical timeline whose rail fills as you scroll; the focused item brightens. */
export default function Timeline({ items = [] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  return (
    <div ref={ref} className="relative pl-10">
      <span aria-hidden="true" className="absolute bottom-2 left-[6px] top-2 w-px bg-white/10" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-2 left-[6px] top-2 w-px origin-top bg-gradient-to-b from-amber via-crimson to-mint"
        style={{ scaleY }}
      />
      <ol className="space-y-12">
        {items.map((item) => (
          <TimelineItem key={item.title} item={item} />
        ))}
      </ol>
    </div>
  );
}
