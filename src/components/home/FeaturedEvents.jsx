import { Link } from "react-router-dom";
import { ArrowUpRight, Cpu, Lightbulb, Timer } from "lucide-react";
import GlassCard from "../common/GlassCard/GlassCard";
import Reveal from "../common/Reveal/Reveal";
import SectionHeader from "../common/SectionHeader/SectionHeader";
import TagChip from "../common/TagChip/TagChip";
import { getEvent } from "../../data/events";

/* Bento of the three flagship events. The big figure on each card comes from the
   event text itself (one month of prep, sixteen hours, open to visitors). */
const FEATURED = [
  { id: "ideaforge", icon: Lightbulb, figure: "1", unit: "month of preparation", size: "lg" },
  { id: "zero-day-challenge", icon: Timer, figure: "16", unit: "hours, on the spot", size: "sm" },
  { id: "tech-expo", icon: Cpu, figure: "Open", unit: "to visitors", size: "sm" },
];

function FeaturedCard({ item, index }) {
  const event = getEvent(item.id);
  if (!event) return null;
  const big = item.size === "lg";
  const Icon = item.icon;

  return (
    <Reveal
      delay={index * 0.1}
      className={big ? "md:col-span-3 md:row-span-2" : "md:col-span-2"}
    >
      <GlassCard
        as={Link}
        to={`/events?event=${event.id}`}
        accent={event.accent}
        aria-label={`${event.name}: view details`}
        className={`flex h-full flex-col justify-between rounded-3xl ${big ? "p-8 sm:p-10" : "p-7"}`}
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className="grid h-12 w-12 place-items-center rounded-2xl border"
            style={{ borderColor: `${event.accent}55`, color: event.accent }}
          >
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
          <TagChip accent={event.accent}>{event.tag}</TagChip>
        </div>

        <div className={big ? "mt-16 sm:mt-24" : "mt-10"}>
          <p
            className="numeral"
            style={{ "--ol": event.accent, fontSize: big ? "clamp(5rem, 11vw, 8.5rem)" : "4rem" }}
            aria-hidden="true"
          >
            {item.figure}
          </p>
          <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
            {item.unit}
          </p>
        </div>

        <div className="mt-8">
          <h3 className={`font-sub font-semibold tracking-tight text-chalk ${big ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
            {event.name}
          </h3>
          <p className={`mt-3 max-w-md leading-relaxed text-slate-400 ${big ? "" : "text-sm"}`}>
            {event.summary}
          </p>
          <span
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: event.accent }}
          >
            Details
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </GlassCard>
    </Reveal>
  );
}

export default function FeaturedEvents() {
  return (
    <section id="featured" className="container-x scroll-mt-24 py-20 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader eyebrow="Flagship events" title="Build something real." accent={[2]} />
        <Reveal delay={0.2}>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-mint-light transition-colors hover:text-amber"
          >
            All events
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-5 md:grid-rows-2">
        {FEATURED.map((item, i) => (
          <FeaturedCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
