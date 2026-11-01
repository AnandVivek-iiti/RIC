import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Calculator,
  Cpu,
  Globe,
  GraduationCap,
  Lightbulb,
  Mic,
  Microscope,
  PenLine,
  PenTool,
  Presentation,
  School,
  Scale,
  Sparkles,
  Timer,
  Users,
  X,
} from "lucide-react";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import GlassCard from "../../components/common/GlassCard/GlassCard";
import TagChip from "../../components/common/TagChip/TagChip";
import { allEvents, eventCategories, getEvent, totalEvents } from "../../data/events";

const ICONS = {
  Calculator,
  Cpu,
  Globe,
  GraduationCap,
  Lightbulb,
  Mic,
  Microscope,
  PenLine,
  PenTool,
  Presentation,
  School,
  Scale,
  Timer,
  Users,
};
const EASE = [0.22, 1, 0.36, 1];
const ALL_ACCENT = "#ECEAF6";
const pad = (n) => String(n).padStart(2, "0");

/* Number each event once, across the whole list, so a card keeps its number when filtered */
const NUMBERED = allEvents.map((event, i) => ({ ...event, number: pad(i + 1) }));

/* ── Category filter: one glass pill that glides between the options ── */
function Filter({ value, onChange, reduce }) {
  const options = [
    { id: "all", label: "All", count: totalEvents, accent: ALL_ACCENT },
    ...eventCategories.map((c) => ({ id: c.id, label: c.short, count: c.events.length, accent: c.accent })),
  ];

  return (
    <div
      role="group"
      aria-label="Filter events by category"
      className="glass -mx-1 flex gap-1 overflow-x-auto rounded-full p-1.5 [scrollbar-width:none] sm:mx-0 sm:w-fit [&::-webkit-scrollbar]:hidden"
    >
      <LayoutGroup id="event-filter">
        {options.map((option) => {
          const active = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              aria-pressed={active}
              className={`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                active ? "text-ink" : "text-slate-300 hover:text-chalk"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="pill"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: option.accent }}
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{option.label}</span>
              <span
                className={`relative z-10 font-mono text-[0.68rem] tabular-nums ${
                  active ? "text-ink/70" : "text-slate-400"
                }`}
              >
                {pad(option.count)}
              </span>
            </button>
          );
        })}
      </LayoutGroup>
    </div>
  );
}

/* ── One event card (a button: it opens the spotlight) ── */
function EventCard({ event, onOpen, reduce }) {
  const Icon = ICONS[event.icon] ?? Sparkles;

  return (
    <motion.li
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
    >
      <GlassCard
        as="button"
        type="button"
        accent={event.accent}
        onClick={(e) => onOpen(event.id, e.currentTarget)}
        className="flex h-full w-full flex-col rounded-3xl p-7 text-left"
      >
        <span className="flex items-start justify-between gap-4">
          <span className="numeral text-5xl" style={{ "--ol": event.accent }} aria-hidden="true">
            {event.number}
          </span>
          <span
            className="grid h-11 w-11 place-items-center rounded-2xl border"
            style={{ borderColor: `${event.accent}55`, color: event.accent }}
          >
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
        </span>

        <span className="mt-8 block">
          <TagChip accent={event.accent}>{event.tag}</TagChip>
        </span>
        <span className="mt-5 block font-sub text-xl font-semibold leading-snug text-chalk">{event.name}</span>
        <span className="mt-3 block flex-1 text-sm leading-relaxed text-slate-400">{event.summary}</span>

        <span className="mt-6 flex items-center justify-between border-t border-chalk/10 pt-4">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slate-400">
            {event.categoryTitle}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: event.accent }}>
            Details
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </span>
      </GlassCard>
    </motion.li>
  );
}

/* ── Spotlight: the full text of one event over a dimmed page ── */
function Spotlight({ event, onClose, reduce }) {
  const dialogRef = useRef(null);
  const Icon = ICONS[event.icon] ?? Sparkles;

  // Move focus in, lock page scroll, close on Escape, keep Tab inside the dialog
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector("[data-close]")?.focus();

    function onKey(e) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll("a[href], button:not([disabled])");
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center p-3 sm:items-center sm:p-6"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close event details"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink-deep/80 backdrop-blur-sm"
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-spotlight-title"
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
        className="glass-strong relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-ink/90 p-7 sm:p-12"
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{ backgroundImage: `linear-gradient(90deg, transparent, ${event.accent}, transparent)` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: event.accent }}
        />

        <button
          type="button"
          data-close
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-chalk/20 text-slate-300 transition-colors hover:border-amber hover:text-amber"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>

        <div className="relative flex items-center gap-5">
          <span className="numeral text-7xl" style={{ "--ol": event.accent }} aria-hidden="true">
            {event.number}
          </span>
          <span
            className="grid h-14 w-14 place-items-center rounded-2xl border"
            style={{ borderColor: `${event.accent}66`, color: event.accent }}
          >
            <Icon aria-hidden="true" className="h-6 w-6" />
          </span>
        </div>

        <div className="relative mt-8 flex flex-wrap gap-2">
          <TagChip accent={event.accent}>{event.tag}</TagChip>
          <TagChip>{event.categoryTitle}</TagChip>
        </div>

        <h2
          id="event-spotlight-title"
          className="relative mt-6 text-3xl font-bold leading-tight tracking-tight text-chalk sm:text-4xl"
        >
          {event.name}
        </h2>
        <p className="relative mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">{event.desc}</p>

        <div className="relative mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-amber-light"
          >
            Ask about this event
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-chalk/25 px-6 py-3 text-sm font-semibold text-chalk transition-colors hover:border-mint hover:text-mint"
          >
            Back to events
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function Events() {
  const reduce = useReducedMotion();
  const [params, setParams] = useSearchParams();
  const lastTrigger = useRef(null);

  // Filter and open event live in the URL, so a category or an event can be linked to
  const requested = params.get("category");
  const filter = eventCategories.some((c) => c.id === requested) ? requested : "all";
  const openEvent = NUMBERED.find((e) => e.id === params.get("event")) ?? null;

  const visible = filter === "all" ? NUMBERED : NUMBERED.filter((e) => e.categoryId === filter);
  const activeCategory = eventCategories.find((c) => c.id === filter);

  const update = useCallback(
    (changes) => {
      const next = new URLSearchParams(params);
      Object.entries(changes).forEach(([key, val]) => (val ? next.set(key, val) : next.delete(key)));
      setParams(next, { replace: true });
    },
    [params, setParams]
  );

  const open = (id, trigger) => {
    lastTrigger.current = trigger;
    update({ event: id });
  };

  const close = useCallback(() => {
    update({ event: "" });
    // hand focus back to the card that opened the spotlight
    requestAnimationFrame(() => lastTrigger.current?.focus?.());
  }, [update]);

  // The event named in the URL must exist, otherwise ignore it
  useEffect(() => {
    if (params.get("event") && !getEvent(params.get("event"))) update({ event: "" });
  }, [params, update]);

  return (
    <div>
      <PageHeader
        eyebrow="Programme"
        title="Our Events"
        accent={["Events"]}
        meta={[
          { value: pad(totalEvents), label: "Events" },
          { value: pad(eventCategories.length), label: "Categories" },
        ]}
      >
        Workshops, research presentations, innovation challenges, humanities and school competitions, all
        under one theme.
      </PageHeader>

      <section className="container-x pb-32">
        <Filter value={filter} onChange={(id) => update({ category: id === "all" ? "" : id })} reduce={reduce} />

        <p aria-live="polite" className="mt-8 flex flex-wrap items-center gap-x-3 text-sm text-slate-400">
          <span className="font-mono tabular-nums text-chalk">{pad(visible.length)}</span>
          <span>
            {visible.length === 1 ? "event" : "events"}
            {activeCategory ? ` in ${activeCategory.title}` : " in total"}
          </span>
          {activeCategory && <span className="hidden text-slate-400 sm:inline">· {activeCategory.subtitle}</span>}
        </p>

        <ul className="mt-8 grid min-h-[30rem] content-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((event) => (
              <EventCard key={event.id} event={event} onOpen={open} reduce={reduce} />
            ))}
          </AnimatePresence>
        </ul>
      </section>

      <AnimatePresence>
        {openEvent && <Spotlight key={openEvent.id} event={openEvent} onClose={close} reduce={reduce} />}
      </AnimatePresence>
    </div>
  );
}
