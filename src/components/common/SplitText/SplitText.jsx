import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/* Headline that rises word-by-word out of a mask */
export default function SplitText({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.07,
  accent = [],
  accentClass = "text-amber",
  inView = true,
  animateOnMount = false,
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const isAccent = (word, i) => accent.includes(i) || accent.includes(word);

  if (reduce) {
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <span key={i} className={isAccent(word, i) ? accentClass : undefined}>
            {word}{" "}
          </span>
        ))}
      </Tag>
    );
  }

  const trigger = inView && !animateOnMount
    ? { whileInView: { y: 0 }, viewport: { once: true, amount: 0.8 } }
    : { animate: { y: 0 } };

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className={`inline-block ${isAccent(word, i) ? accentClass : ""}`}
              initial={{ y: "112%" }}
              {...trigger}
              transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
