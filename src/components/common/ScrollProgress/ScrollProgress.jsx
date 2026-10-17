import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[90] h-0.5 w-full origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #f59e0b, #dc2626 55%, #2dd4bf)",
      }}
    />
  );
}
