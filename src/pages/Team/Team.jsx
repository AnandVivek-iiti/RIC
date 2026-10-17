import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Crown, Star, Users } from "lucide-react";
import { OVERALL_COORDINATORS, HEADS } from "../../data/team";

/* Brand icons (lucide v1 dropped brand logos) */
function LinkedinIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" />
    </svg>
  );
}

function InstagramIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const COORDINATOR_COLOR = "#f59e0b";
const HEAD_COLOR = "#dc2626";
const MEMBER_COLOR = "#2dd4bf";

const SIZES = {
  xl: "h-28 w-28 rounded-2xl text-3xl",
  lg: "h-20 w-20 rounded-xl text-xl",
  md: "h-16 w-16 rounded-xl text-base",
  sm: "h-12 w-12 rounded-xl text-sm",
};

function initialsOf(name = "") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "—"
  );
}

/* ── Avatar: photo with initials fallback ── */
function Avatar({ person, size = "md" }) {
  const [broken, setBroken] = useState(false);
  const cls = SIZES[size] ?? SIZES.md;

  if (person.photo && !broken) {
    return (
      <div className={`${cls} shrink-0 overflow-hidden`}>
        <img
          src={person.photo}
          alt={person.name}
          onError={() => setBroken(true)}
          className="h-full w-full object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      className={`${cls} flex shrink-0 items-center justify-center font-black text-ink`}
      style={{ background: "linear-gradient(135deg,#f59e0b,#dc2626)" }}
    >
      {initialsOf(person.name)}
    </div>
  );
}

/* ── Social links ── */
function Socials({ person, size = 14 }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {person.email && (
        <a
          href={`mailto:${person.email}`}
          aria-label={`Email ${person.name}`}
          className="rounded-lg p-2 transition-transform hover:-translate-y-0.5"
          style={{ background: "rgba(45,212,191,0.12)", color: MEMBER_COLOR }}
        >
          <Mail size={size} />
        </a>
      )}
      {person.linkedin && (
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${person.name} on LinkedIn`}
          className="rounded-lg p-2 transition-transform hover:-translate-y-0.5"
          style={{ background: "rgba(59,130,246,0.12)", color: "#60a5fa" }}
        >
          <LinkedinIcon size={size} />
        </a>
      )}
      {person.instagram && (
        <a
          href={person.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${person.name} on Instagram`}
          className="rounded-lg p-2 transition-transform hover:-translate-y-0.5"
          style={{ background: "rgba(236,72,153,0.12)", color: "#f472b6" }}
        >
          <InstagramIcon size={size} />
        </a>
      )}
    </div>
  );
}

/* ── Tier divider badge ── */
function TierBadge({ label, icon: Icon, color }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-3">
      <div
        className="h-px flex-1"
        style={{ background: `linear-gradient(to right, transparent, ${color}66)` }}
      />
      <div
        className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
        style={{ background: `${color}1a`, color, border: `1px solid ${color}55` }}
      >
        <Icon size={12} />
        {label}
      </div>
      <div
        className="h-px flex-1"
        style={{ background: `linear-gradient(to left, transparent, ${color}66)` }}
      />
    </div>
  );
}

/* ── Overall Coordinator card (top tier) ── */
function CoordinatorCard({ person, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="glass-strong relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl p-10 text-center"
    >
      <div className="relative mx-auto mb-5 inline-flex">
        <div
          className="rounded-2xl"
          style={{ boxShadow: `0 0 0 3px ${COORDINATOR_COLOR}, 0 0 0 6px rgba(245,158,11,0.2)` }}
        >
          <Avatar person={person} size="xl" />
        </div>
      </div>

      <div
        className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
        style={{
          background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(220,38,38,0.15))",
          color: COORDINATOR_COLOR,
          border: `1px solid ${COORDINATOR_COLOR}59`,
        }}
      >
        <Crown size={11} /> {person.title}
      </div>

      <h3 className="font-display text-2xl font-black text-chalk">{person.name}</h3>
      {person.phone && <p className="mt-1 text-xs text-slate-400">{person.phone}</p>}

      <div className="mt-4 flex justify-center">
        <Socials person={person} size={15} />
      </div>
    </motion.article>
  );
}

/* ── Head card (middle tier) ── */
function HeadCard({ person, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="glass-strong relative overflow-hidden rounded-2xl p-7 text-center"
    >
      <div className="mb-4 flex justify-center">
        <div
          className="rounded-xl"
          style={{ boxShadow: `0 0 0 2px ${HEAD_COLOR}, 0 0 0 4px rgba(220,38,38,0.18)` }}
        >
          <Avatar person={person} size="lg" />
        </div>
      </div>

      <h3 className="font-display text-lg font-black text-chalk">{person.name}</h3>

      <div className="mt-2 flex justify-center">
        <span
          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
          style={{
            background: "rgba(220,38,38,0.12)",
            color: "#f87171",
            border: `1px solid ${HEAD_COLOR}4d`,
          }}
        >
          <Star size={10} /> {person.role}
        </span>
      </div>

      {person.roll && <p className="mt-2 text-xs text-slate-400">{person.roll}</p>}

      <div className="mt-3 flex justify-center">
        <Socials person={person} size={13} />
      </div>
    </motion.article>
  );
}

/* ── Member card (bottom tier) ── */
function MemberCard({ person, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ scale: 1.04, y: -2 }}
      className="glass relative rounded-xl p-4 text-center"
    >
      <div className="mx-auto mb-3 w-fit">
        <Avatar person={person} size="sm" />
      </div>
      <p className="text-xs font-semibold text-chalk">{person.name}</p>
      {person.roll && <p className="mt-0.5 text-[10px] text-slate-500">{person.roll}</p>}
      {person.domains?.length > 0 && (
        <p className="mt-1 text-[9px] font-medium text-mint">{person.domains.join(" · ")}</p>
      )}
      <div className="mt-2 flex justify-center">
        <Socials person={person} size={12} />
      </div>
    </motion.article>
  );
}

export default function Team() {
  return (
    <div className="min-h-screen px-6 pb-24 pt-24">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber">
            The People
          </span>
          <h1 className="mb-4 mt-4 font-display text-5xl font-black text-chalk md:text-7xl">
            Our <span className="text-mint">Team</span>
          </h1>
          <p className="mx-auto max-w-lg leading-relaxed text-slate-400">
            Meet the people behind RIC 2027 — from the overall coordinators to every head and the
            teams working under them.
          </p>
        </motion.header>

        {/* Tier 1 — Overall Coordinators */}
        <TierBadge label="Overall Coordinators" icon={Crown} color={COORDINATOR_COLOR} />
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {OVERALL_COORDINATORS.map((person, i) => (
            <CoordinatorCard key={person.id} person={person} index={i} />
          ))}
        </div>

        {/* Tier 2 — Heads */}
        <TierBadge label="Heads" icon={Star} color={HEAD_COLOR} />
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HEADS.map((person, i) => (
            <HeadCard key={person.id} person={person} index={i} />
          ))}
        </div>

        {/* Tier 3 — Teams under each head */}
        <TierBadge label="Teams" icon={Users} color={MEMBER_COLOR} />
        <div className="space-y-10">
          {HEADS.map((head) => (
            <section key={head.id}>
              <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-display text-sm font-bold uppercase tracking-widest text-mint">
                  {head.domain}
                </span>
                   </div>

              {head.team.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {head.team.map((member, i) => (
                    <MemberCard key={`${head.id}-${member.name}-${i}`} person={member} index={i} />
                  ))}
                </div>
              ) : (
                <p className="text-sm italic text-slate-500">Team members to be added.</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
