import Reveal from "../Reveal/Reveal";
import SplitText from "../SplitText/SplitText";

/* Eyebrow + headline (+ optional lead paragraph) used to open every page section. */
export default function SectionHeader({
  eyebrow,
  title,
  accent = [],
  children,
  align = "left",
  className = "",
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} ${className}`}>
      <Reveal y={10}>
        <p className={`eyebrow ${centered ? "justify-center" : ""}`}>{eyebrow}</p>
      </Reveal>
      <SplitText
        text={title}
        accent={accent}
        className={`mt-6 max-w-3xl text-4xl font-bold leading-[1] tracking-tight text-chalk sm:text-6xl ${
          centered ? "mx-auto" : ""
        }`}
      />
      {children && (
        <Reveal delay={0.15} className={`mt-6 max-w-xl text-lg leading-relaxed text-slate-400 ${centered ? "mx-auto" : ""}`}>
          {children}
        </Reveal>
      )}
    </div>
  );
}
