import Reveal from "../Reveal/Reveal";
import SplitText from "../SplitText/SplitText";

/* Shared opening block for inner pages. Delays leave room for the route curtain. */
export default function PageHeader({ eyebrow, title, accent = [], children }) {
  return (
    <header className="container-x pb-14 pt-36 sm:pb-20 sm:pt-44">
      <Reveal y={10} delay={0.45}>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <SplitText
        as="h1"
        text={title}
        accent={accent}
        inView={false}
        delay={0.55}
        className="mt-7 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight text-chalk sm:text-7xl"
      />
      {children && (
        <Reveal delay={0.9} className="mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
          {children}
        </Reveal>
      )}
    </header>
  );
}
