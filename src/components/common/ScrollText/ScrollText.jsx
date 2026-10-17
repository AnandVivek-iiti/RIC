import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function Word({ children, progress, range, accent }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="mr-[0.26em] inline-block">
      <motion.span style={{ opacity }} className={`inline-block ${accent ? "text-amber" : ""}`}>
        {children}
      </motion.span>
    </span>
  );
}

/* Paragraph whose words light up as you scroll through it */
export default function ScrollText({ text, className = "", accent = [] }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.5"] });
  const words = text.split(" ");

  if (reduce) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const clean = word.toLowerCase().replace(/[^a-z0-9']/g, "");
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} accent={accent.includes(clean)}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
