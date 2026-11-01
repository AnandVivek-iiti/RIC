import Reveal from "../Reveal/Reveal";
import SplitText from "../SplitText/SplitText";

/* Shared opening block for inner pages. Delays leave room for the route curtain.
   `meta` is an optional list of { value, label } facts shown under the intro. */
export default function PageHeader({ eyebrow, title, accent = [], meta = [], children }) {
  return (
    <header className="page-header container-x relative pb-14 pt-36 sm:pb-20 sm:pt-44">
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
      {meta.length > 0 && (
        <Reveal delay={1.05} y={14} className="mt-10 flex flex-wrap gap-3">
          {meta.map((item) => (
            <div
              key={item.label}
              className="glass flex items-baseline gap-2.5 rounded-full px-5 py-2.5"
            >
              <span className="font-display text-2xl font-bold tabular-nums leading-none text-chalk">
                {item.value}
              </span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-slate-400">
                {item.label}
              </span>
            </div>
          ))}
        </Reveal>
      )}
      <span aria-hidden="true" className="beam-rule absolute inset-x-5 bottom-0 sm:inset-x-8" />
    </header>
  );
}
