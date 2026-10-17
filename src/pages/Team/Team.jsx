import { team } from "../../data/team";

const ringStyles = [
  "from-amber to-crimson",
  "from-crimson to-amber",
  "from-mint to-ink-soft",
  "from-ink-soft to-mint",
  "from-amber to-mint",
  "from-crimson to-ink-soft",
];

export default function Team() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">Team</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-chalk sm:text-5xl">
          The people off the straight line
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          The core team steering each track — keeping the detours deliberate and the horizons in
          sight.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, index) => (
          <article
            key={member.id}
            className="rounded-xl border border-mint/20 bg-ink-light/40 p-6 text-center transition hover:-translate-y-1 hover:border-amber/50"
          >
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold text-ink ${
                ringStyles[index % ringStyles.length]
              }`}
            >
              {member.initials}
            </div>
            <h2 className="mt-4 font-display text-lg font-semibold text-chalk">{member.name}</h2>
            <p className="text-sm font-medium text-amber">{member.role}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{member.bio}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
