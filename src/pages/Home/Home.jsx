import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Handshake, MessagesSquare } from "lucide-react";
import Hero from "../../components/home/Hero";
import FeaturedEvents from "../../components/home/FeaturedEvents";
import TracksShowcase from "../../components/home/TracksShowcase";
import Marquee from "../../components/common/Marquee/Marquee";
import Reveal from "../../components/common/Reveal/Reveal";
import SplitText from "../../components/common/SplitText/SplitText";
import ScrollText from "../../components/common/ScrollText/ScrollText";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import SectionDivider from "../../components/common/SectionDivider/SectionDivider";
import GlassCard from "../../components/common/GlassCard/GlassCard";
import TagChip from "../../components/common/TagChip/TagChip";
import CountUp from "../../components/common/CountUp/CountUp";
import Button from "../../components/common/Button/Button";
import { eventCategories, totalEvents } from "../../data/events";
import { SITE, TRACKS, IMPORTANT_DATES, PARTNERS, RESOURCES, TEMPLATES } from "../../utils/constants";
import "./Home.css";

const marqueeItems = [
  SITE.theme,
  SITE.tagline,
  ...TRACKS.map((track) => track.name),
  `${SITE.name} ${SITE.year}`,
];

/* Every figure comes from the data files, except the 16 hours, which is the Zero Day Challenge's length */
const stats = [
  { value: totalEvents, label: "Events", note: "across five categories" },
  { value: eventCategories.length, label: "Categories", note: "from workshops to school" },
  { value: TRACKS.length, label: "Research tracks", note: "one theme, four angles" },
  { value: 16, label: "Hours", note: "the Zero Day Challenge" },
];

const programme = [
  {
    icon: Handshake,
    title: "Networking",
    tag: "Expand your network",
    text: "Mixers and roundtables that connect collaborators, mentors and industry.",
  },
  {
    icon: MessagesSquare,
    title: "Panel Discussions",
    tag: "Interactive conversations",
    text: "Researchers, founders and policymakers debate the edges of the theme.",
  },
];

const partnerGroups = [
  { label: "In collaboration with", items: PARTNERS.inCollaborationWith },
  { label: "Strategic partner", items: [PARTNERS.strategicPartner].filter(Boolean) },
  { label: "Publication partners", items: PARTNERS.publicationPartners },
  { label: "Sponsors", items: PARTNERS.sponsors },
].filter((group) => group.items.length > 0);

const aboutText = `${SITE.name}’${SITE.year.slice(2)} brings together researchers, builders and industry under one theme: ${SITE.theme}. We treat the detour, the outlier and the half-finished equation as the raw material of the next paradigm.`;

/* Four figures in one glass strip */
function StatsStrip() {
  return (
    <section aria-label="RIC'27 at a glance" className="container-x py-16 sm:py-20">
      <Reveal>
        <div className="glass grid grid-cols-2 overflow-hidden rounded-3xl lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-6 sm:p-8 ${i % 2 === 1 ? "border-l border-chalk/10" : ""} ${
                i > 1 ? "border-t border-chalk/10 lg:border-t-0" : ""
              } ${i > 0 ? "lg:border-l lg:border-chalk/10" : ""}`}
            >
              <p className="font-display text-5xl font-bold tracking-tighter text-chalk sm:text-6xl">
                <CountUp to={stat.value} />
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-mint-light">
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-slate-400">{stat.note}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function ResourceList({ title, items }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-6 border-t border-chalk/10">
        {items.map((item) => (
          <li
            key={item.label}
            className="home-row flex items-center justify-between gap-4 border-b border-chalk/10 py-5"
          >
            <span className="font-sub text-lg text-chalk">{item.label}</span>
            {item.soon && <TagChip accent="#8CF0F2">Coming soon</TagChip>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Vertical timeline whose line draws as you scroll */
function Dates() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.65"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div ref={ref} className="relative mt-14">
      <div className="absolute bottom-3 left-[11px] top-3 w-px bg-chalk/10" />
      <motion.div
        style={{ scaleY }}
        className="absolute bottom-3 left-[11px] top-3 w-px origin-top bg-gradient-to-b from-mint to-prism-light"
      />
      <ol className="space-y-5">
        {IMPORTANT_DATES.map((item, i) => {
          const last = i === IMPORTANT_DATES.length - 1;
          const tba = /announced/i.test(item.date);
          return (
            <Reveal as="li" key={item.label} delay={(i % 3) * 0.05} className="relative pl-12">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1/2 grid h-[23px] w-[23px] -translate-y-1/2 place-items-center rounded-full border bg-ink ${
                  last ? "border-amber" : "border-mint"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${last ? "bg-amber" : "bg-mint"}`} />
              </span>
              <div
                className={`glass flex flex-col gap-3 rounded-2xl px-6 py-5 sm:flex-row sm:items-center sm:justify-between ${
                  last ? "border-amber/30" : ""
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm tabular-nums text-slate-400">0{i + 1}</span>
                  <span className="font-sub text-xl text-chalk sm:text-2xl">{item.label}</span>
                </div>
                <TagChip accent={tba ? undefined : "#FFC878"}>{item.date}</TagChip>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />

      <Marquee items={marqueeItems} />

      <StatsStrip />

      {/* About */}
      <section id="about" className="container-x scroll-mt-24 py-20 sm:py-32">
        <Reveal y={10}>
          <p className="eyebrow">About</p>
        </Reveal>
        <ScrollText
          text={aboutText}
          accent={["chasing", "tangents"]}
          className="mt-8 max-w-4xl font-display text-3xl font-medium leading-[1.2] tracking-tight text-chalk sm:text-5xl"
        />
        <Reveal delay={0.1} className="mt-10">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-mint-light transition-colors hover:text-amber"
          >
            Read the manifesto
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-20 grid gap-14 md:grid-cols-2 text-3xl sm:text-4xl">
          <Reveal>
            <ResourceList title="Resources" items={RESOURCES} />
          </Reveal>
          <Reveal delay={0.1}>
            <ResourceList title="Templates" items={TEMPLATES} />
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      <FeaturedEvents />

      <SectionDivider />

      {/* Tracks */}
      <section id="themes" className="container-x scroll-mt-24 py-20 sm:py-28">
        <SectionHeader eyebrow="Themes" title="Four tracks. Pick a tangent." accent={[4]}>
          One theme, approached from four directions. Each track follows its own line away from the curve.
        </SectionHeader>
        <TracksShowcase />
      </section>

      {/* Programme */}
      <section className="container-x pb-20 sm:pb-28">
        <div className="grid gap-5 md:grid-cols-2">
          {programme.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <GlassCard accent="#FF9096" className="h-full rounded-3xl p-8 sm:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-crimson-light/40 text-crimson-light">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <TagChip accent="#FF9096">{item.tag}</TagChip>
                  </div>
                  <h3 className="mt-10 font-sub text-3xl font-semibold tracking-tight text-chalk">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-sm leading-relaxed text-slate-400">{item.text}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <SectionDivider />

      {/* Important dates */}
      <section className="container-x py-20 sm:py-28">
        <SectionHeader eyebrow="Timeline" title="Important dates">
          Dates for each stage will be published here as soon as they are confirmed.
        </SectionHeader>
        <Dates />
      </section>

      {/* Partners */}
      <section className="container-x pb-20 sm:pb-28">
        <Reveal y={10}>
          <p className="eyebrow">Organised by</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-chalk sm:text-5xl">
            {PARTNERS.organizedBy}
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 grid gap-8 border-t border-chalk/10 pt-8 sm:grid-cols-2">
          {partnerGroups.length > 0 ? (
            partnerGroups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">{group.label}</p>
                <p className="mt-2 font-sub text-lg text-chalk">{group.items.join(" · ")}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">
              Collaborators, partners and sponsors will be announced soon.
            </p>
          )}
        </Reveal>
      </section>

      {/* CTA */}
      <section id="register" className="home-cta scroll-mt-24 py-24 sm:py-36">
        <div className="container-x">
          <Reveal>
            <div className="glass-strong relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-16 sm:py-24">
              <span aria-hidden="true" className="home-cta__beam" />
              <p className="eyebrow justify-center">Registration</p>
              <SplitText
                text="Take the detour."
                accent={[2]}
                className="mx-auto mt-7 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight text-chalk sm:text-8xl"
              />
              <p className="mx-auto mt-8 max-w-md text-lg text-slate-300">
                Registration and submissions open soon. Reach out to join the programme.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button to="/contact" arrow>
                  Contact Us
                </Button>
                <Button to="/events" variant="ghost">
                  View Events
                </Button>
              </div>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                <TagChip>{totalEvents} events</TagChip>
                <TagChip>{eventCategories.length} categories</TagChip>
                <TagChip>{TRACKS.length} tracks</TagChip>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
