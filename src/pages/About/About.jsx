import { motion } from "framer-motion";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import Reveal from "../../components/common/Reveal/Reveal";
import ScrollText from "../../components/common/ScrollText/ScrollText";
import SpotlightCard from "../../components/common/SpotlightCard/SpotlightCard";
import { SITE } from "../../utils/constants";

const EASE = [0.22, 1, 0.36, 1];

const values = [
  {
    title: "Anomalies over errors",
    text: "A wrong answer is a signal, not a failure. We follow the stray reading to see where it leads.",
  },
  {
    title: "Detours by design",
    text: "We plan for the unexpected, leaving room in every system for the accidental discovery.",
  },
  {
    title: "Lateral by default",
    text: "We connect distant disciplines so a tangent in one becomes a breakthrough in another.",
  },
];

const milestones = [
  { year: "Linear", text: "Centuries of straight-line progress built the world we know." },
  { year: "Fracture", text: "Rigid methodologies began to crack under complexity they could not model." },
  { year: "Tangent", text: "The detour becomes the method, chasing anomalies toward new paradigms." },
  { year: "Horizon", text: "From broken logic to brilliant horizons: an era of lateral transformation." },
];

const manifesto =
  "Humanity has spent centuries following linear equations and rigid methodologies to build its world. The next era demands we embrace the unexpected.";

export default function About() {
  return (
    <div>
      <PageHeader eyebrow="About Us" title={`The ${SITE.theme} manifesto`} accent={[1, 2]} />

      <section className="container-x pb-24 sm:pb-32">
        <ScrollText
          text={manifesto}
          className="max-w-4xl font-display text-2xl font-medium leading-[1.2] tracking-tight text-chalk sm:text-3xl"
        />
      </section>

      <section className="container-x py-16 sm:py-24">
        <Reveal y={10}>
          <p className="eyebrow">What we stand for</p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.1}>
              <SpotlightCard className="h-full p-8">
                <span className="font-display text-sm tabular-nums text-mint">0{i + 1}</span>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-chalk">
                  {value.title}
                </h3>
                <p className="mt-4 leading-relaxed text-slate-400">{value.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-16 sm:py-24">
        <Reveal y={10}>
          <p className="eyebrow">From logic to horizon</p>
        </Reveal>
        <ol className="mt-12 grid gap-12 md:grid-cols-4 md:gap-8">
          {milestones.map((item, i) => (
            <motion.li
              key={item.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              className="relative pt-6"
            >
              <span className="absolute left-0 top-0 h-px w-full bg-chalk/10" />
              <motion.span
                className="absolute left-0 top-0 h-px w-full origin-left bg-amber"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: EASE }}
              />
              <p className="font-display text-sm tabular-nums text-mint">0{i + 1}</p>
              <p className="mt-3 font-display text-2xl font-semibold text-chalk">{item.year}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.text}</p>
            </motion.li>
          ))}
        </ol>
      </section>
    </div>
  );
}
