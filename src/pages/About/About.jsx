import { SITE, TRACKS } from "../../utils/constants";

const values = [
  {
    title: "Anomalies over errors",
    text: "A wrong answer is a signal, not a failure. We follow the stray reading to see where it leads.",
  },
  {
    title: "Detours by design",
    text: "We plan for the unexpected — leaving room in every system for the accidental discovery.",
  },
  {
    title: "Lateral by default",
    text: "We connect distant disciplines so that a tangent in one becomes a breakthrough in another.",
  },
];

const milestones = [
  { year: "Linear", text: "Centuries of straight-line progress built the world we know." },
  { year: "Fracture", text: "Rigid methodologies began to crack under complexity they could not model." },
  { year: "Tangent", text: "The detour becomes the method — chasing anomalies toward new paradigms." },
  { year: "Horizon", text: "From broken logic to brilliant horizons: an era of lateral transformation." },
];

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">About Us</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-chalk sm:text-5xl">
          The {SITE.theme} manifesto
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          Humanity has spent centuries following linear equations and rigid methodologies to build
          its world; the next era demands we embrace the chaos of the unexpected.
        </p>
      </header>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold text-chalk">What we stand for</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-xl border border-mint/20 bg-ink-light/40 p-6 transition hover:-translate-y-1 hover:border-amber/50"
            >
              <h3 className="font-display text-lg font-semibold text-amber">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold text-chalk">A single engine of transformation</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-slate-400">
          {SITE.theme} treats anomalies not as errors to erase, but as gateways to new paradigms. It
          unites four streams into one engine of lateral transformation.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {TRACKS.map((track, index) => (
            <div
              key={track.name}
              className="flex gap-4 rounded-xl border border-mint/20 bg-ink-light/30 p-5"
            >
              <span className="font-display text-lg font-bold text-mint">0{index + 1}</span>
              <div>
                <h3 className="font-display font-semibold text-chalk">{track.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{track.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold text-chalk">From logic to horizon</h2>
        <ol className="mt-6 space-y-6 border-l border-mint/20 pl-6">
          {milestones.map((item) => (
            <li key={item.year} className="relative">
              <span className="absolute -left-[1.95rem] top-1 h-3 w-3 rounded-full bg-amber ring-4 ring-amber/15" />
              <p className="font-display font-semibold text-amber">{item.year}</p>
              <p className="text-slate-400">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
