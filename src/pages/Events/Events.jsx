import { events } from "../../data/events";

const tagStyles = {
  "Core Research": "border-amber/40 bg-amber/10 text-amber",
  "Digital Exploration": "border-mint/40 bg-mint/10 text-mint",
  "Systemic Design": "border-crimson/40 bg-crimson/10 text-crimson-light",
  "Speculative Thinking": "border-indigo-400/40 bg-indigo-400/10 text-indigo-300",
};

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Events() {
  const upcoming = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">Events</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-chalk sm:text-5xl">
          Where the tangents happen
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          Workshops, hackathons and speculative labs — one for every track. Come with a hypothesis;
          leave with a detour.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {upcoming.map((event) => (
          <article
            key={event.id}
            className="flex flex-col rounded-xl border border-mint/20 bg-ink-light/40 p-6 transition hover:-translate-y-1 hover:border-amber/50"
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  tagStyles[event.tag] ?? "border-mint/40 bg-mint/10 text-mint"
                }`}
              >
                {event.tag}
              </span>
              <span className="text-sm font-medium text-slate-400">{formatDate(event.date)}</span>
            </div>

            <h2 className="mt-4 font-display text-xl font-semibold text-chalk">{event.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
              {event.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-400">
              <span>🕒 {event.time}</span>
              <span>📍 {event.location}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
