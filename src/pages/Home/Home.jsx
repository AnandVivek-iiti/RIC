import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Plus } from "lucide-react";
import Hero from "../../components/home/Hero";
import Marquee from "../../components/common/Marquee/Marquee";
import Reveal from "../../components/common/Reveal/Reveal";
import SplitText from "../../components/common/SplitText/SplitText";
import ScrollText from "../../components/common/ScrollText/ScrollText";
import CountUp from "../../components/common/CountUp/CountUp";
import Button from "../../components/common/Button/Button";
import { eventCategories } from "../../data/events";
import { SITE, TRACKS, IMPORTANT_DATES, PARTNERS, RESOURCES, TEMPLATES } from "../../utils/constants";
import "./Home.css";

const EASE = [0.22, 1, 0.36, 1];

const marqueeItems = [
  SITE.theme,
  SITE.tagline,
  ...TRACKS.map((track) => track.name),
  `${SITE.name} ${SITE.year}`,
];

const totalEvents = eventCategories.reduce((sum, category) => sum + category.events.length, 0);

const stats = [
  { value: TRACKS.length, label: "Tracks" },
  { value: eventCategories.length, label: "Event categories" },
  { value: totalEvents, label: "Events" },
];

const programme = [
  {
    title: "Networking",
    tag: "Expand your network",
    text: "Mixers and roundtables that connect collaborators, mentors and industry.",
  },
  {
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

function SectionHead({ eyebrow, title, accent = [] }) {
  return (
    <div>
      <Reveal y={10}>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <SplitText
        text={title}
        accent={accent}
        className="mt-6 max-w-3xl text-4xl font-bold leading-[1] tracking-tight text-chalk sm:text-6xl"
      />
    </div>
  );
}

/* Four tracks as an expanding list */
function Tracks() {
  const [open, setOpen] = useState(0);

  return (
    <ul className="mt-14 divide-y divide-chalk/10 border-y border-chalk/10">
      {TRACKS.map((track, i) => {
        const active = open === i;
        return (
          <li key={track.name}>
            <button
              type="button"
              onClick={() => setOpen(active ? -1 : i)}
              aria-expanded={active}
              className="group flex w-full items-center gap-5 py-7 text-left sm:gap-10 sm:py-9"
            >
              <span className="font-display text-sm tabular-nums text-mint">0{i + 1}</span>
              <span
                className={`flex-1 font-display text-3xl font-semibold tracking-tight transition-all duration-500 ease-expo sm:text-5xl ${
                  active ? "translate-x-2 text-chalk" : "text-chalk/35 group-hover:text-chalk/70"
                }`}
              >
                {track.name}
              </span>
              <motion.span
                animate={{ rotate: active ? 45 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                  active ? "border-amber text-amber" : "border-chalk/20 text-chalk/60"
                }`}
              >
                <Plus className="h-4 w-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {active && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-6 pb-10 pl-9 sm:grid-cols-2 sm:pl-[4.25rem]">
                    <p className="max-w-sm leading-relaxed text-slate-400">{track.text}</p>
                    <ul className="flex flex-wrap content-start gap-2">
                      {track.topics.map((topic) => (
                        <li
                          key={topic}
                          className="rounded-full border border-amber/25 px-3 py-1 text-xs text-amber-light"
                        >
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

/* Vertical timeline whose line draws as you scroll */
function Dates() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.65"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div ref={ref} className="relative mt-14">
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-chalk/10" />
      <motion.div
        style={{ scaleY }}
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-amber to-mint"
      />
      <ul className="space-y-10">
        {IMPORTANT_DATES.map((item) => (
          <Reveal
            as="li"
            key={item.label}
            className="relative flex flex-col gap-1 pl-10 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <span className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border border-amber bg-ink" />
            <span className="font-display text-xl text-chalk sm:text-2xl">{item.label}</span>
            <span className="text-sm uppercase tracking-[0.18em] text-amber-light">{item.date}</span>
          </Reveal>
        ))}
      </ul>
    </div>
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
            <span className="font-display text-lg text-chalk">{item.label}</span>
            {item.soon && (
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-mint">
                Coming soon
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />

      <Marquee items={marqueeItems} />

      {/* About */}
      <section id="about" className="container-x scroll-mt-24 py-28 sm:py-40">
        <Reveal y={10}>
          <p className="eyebrow">About</p>
        </Reveal>
        <ScrollText
          text={aboutText}
          accent={["chasing", "tangents"]}
          className="mt-8 max-w-4xl font-display text-3xl font-medium leading-[1.2] tracking-tight text-chalk sm:text-5xl"
        />

        <div className="mt-24 grid gap-14 md:grid-cols-2">
          <Reveal>
            <ResourceList title="Resources" items={RESOURCES} />
          </Reveal>
          <Reveal delay={0.1}>
            <ResourceList title="Templates" items={TEMPLATES} />
          </Reveal>
        </div>
      </section>

      {/* Themes */}
      <section id="themes" className="container-x scroll-mt-24 py-20 sm:py-28">
        <SectionHead eyebrow="Themes" title="Four tracks. Pick a tangent." accent={[4]} />
        <Tracks />
      </section>

      {/* Numbers */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid grid-cols-1 divide-y divide-chalk/10 border-y border-chalk/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="px-0 py-10 sm:px-8 sm:first:pl-0">
              <p className="font-display text-7xl font-bold tracking-tighter text-chalk sm:text-8xl">
                <CountUp to={stat.value} />
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-400">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Programme */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-chalk/10 bg-chalk/10 md:grid-cols-2">
          {programme.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1} className="bg-ink p-8 sm:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-crimson-light">
                {item.tag}
              </p>
              <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight text-chalk">
                {item.title}
              </h3>
              <p className="mt-4 max-w-sm leading-relaxed text-slate-400">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Important dates */}
      <section className="container-x py-20 sm:py-28">
        <SectionHead eyebrow="Timeline" title="Important dates" />
        <Dates />
      </section>

      {/* Partners */}
      <section className="container-x py-20 sm:py-28">
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
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{group.label}</p>
                <p className="mt-2 font-display text-lg text-chalk">{group.items.join(" · ")}</p>
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
      <section id="register" className="home-cta scroll-mt-24 py-32 text-center sm:py-44">
        <div className="container-x">
          <SplitText
            text="Take the detour."
            accent={[2]}
            className="mx-auto max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight text-chalk sm:text-8xl"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-md text-lg text-slate-400">
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
          </Reveal>
        </div>
      </section>
    </div>
  );
}
