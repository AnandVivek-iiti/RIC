import { Compass, Layers, Waypoints } from "lucide-react";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import Reveal from "../../components/common/Reveal/Reveal";
import ScrollText from "../../components/common/ScrollText/ScrollText";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import SectionDivider from "../../components/common/SectionDivider/SectionDivider";
import GlassCard from "../../components/common/GlassCard/GlassCard";
import Button from "../../components/common/Button/Button";
import TangentPath from "../../components/about/TangentPath";
import { SITE } from "../../utils/constants";

const values = [
  {
    icon: Compass,
    accent: "#36E5E8",
    title: "Anomalies over errors",
    text: "A wrong answer is a signal, not a failure. We follow the stray reading to see where it leads.",
  },
  {
    icon: Waypoints,
    accent: "#FFC878",
    title: "Detours by design",
    text: "We plan for the unexpected, leaving room in every system for the accidental discovery.",
  },
  {
    icon: Layers,
    accent: "#ECEAF6",
    title: "Lateral by default",
    text: "We connect distant disciplines so a tangent in one becomes a breakthrough in another.",
  },
];

const stages = [
  { name: "Linear", text: "Centuries of straight-line progress built the world we know." },
  { name: "Fracture", text: "Rigid methodologies began to crack under complexity they could not model." },
  { name: "Tangent", text: "The detour becomes the method, chasing anomalies toward new paradigms." },
  { name: "Horizon", text: "From broken logic to brilliant horizons: an era of lateral transformation." },
];

const manifesto =
  "Humanity has spent centuries following linear equations and rigid methodologies to build its world. The next era demands we embrace the unexpected.";

export default function About() {
  return (
    <div>
      <PageHeader eyebrow="About Us" title={`The ${SITE.theme} manifesto`} accent={[1, 2]}>
        {SITE.tagline}.
      </PageHeader>

      {/* Manifesto as an oversized pull quote */}
      <section className="container-x relative py-16 sm:py-24">
        <span
          aria-hidden="true"
          className="numeral pointer-events-none absolute -top-2 left-3 select-none text-[9rem] leading-none sm:left-6 sm:text-[16rem]"
          style={{ "--ol": "rgb(var(--c-amber) / 0.45)" }}
        >
          “
        </span>
        <figure className="relative pl-0 pt-16 sm:pl-24 sm:pt-24">
          <blockquote>
            <ScrollText
              text={manifesto}
              accent={["unexpected"]}
              className="max-w-5xl font-display text-3xl font-medium leading-[1.15] tracking-tight text-chalk sm:text-5xl lg:text-6xl"
            />
          </blockquote>
          <Reveal delay={0.1}>
            <figcaption className="mt-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.22em] text-mint-light">
              <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
              {SITE.name}’{SITE.year.slice(2)} · {SITE.theme}
            </figcaption>
          </Reveal>
        </figure>
      </section>

      <SectionDivider />

      {/* linear → fracture → tangent → horizon */}
      <section className="container-x py-20 sm:py-28">
        <SectionHeader eyebrow="From logic to horizon" title="Where the straight line breaks" accent={[3, 4]} />
        <div className="glass mt-14 rounded-3xl p-6 sm:p-10">
          <TangentPath stages={stages} />
        </div>
      </section>

      <SectionDivider />

      {/* Values */}
      <section className="container-x py-20 sm:py-28">
        <SectionHeader eyebrow="What we stand for" title="Three habits of mind" accent={[2]} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <Reveal key={value.title} delay={i * 0.1}>
                <GlassCard accent={value.accent} className="h-full rounded-3xl p-8">
                  <div className="flex items-center justify-between">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-2xl border"
                      style={{ borderColor: `${value.accent}55`, color: value.accent }}
                    >
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="numeral text-3xl" style={{ "--ol": value.accent }} aria-hidden="true">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-10 font-sub text-2xl font-semibold tracking-tight text-chalk">
                    {value.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-slate-400">{value.text}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-x pb-10 pt-6 sm:pb-16">
        <Reveal>
          <div className="glass-strong flex flex-col items-start justify-between gap-8 rounded-3xl p-8 sm:flex-row sm:items-center sm:p-12">
            <div>
              <p className="font-display text-3xl font-semibold tracking-tight text-chalk sm:text-4xl">
                See what the theme looks like in practice.
              </p>
            </div>
            <Button to="/events" arrow>
              Explore events
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
