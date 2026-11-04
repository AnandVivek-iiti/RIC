import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import Reveal from "../../components/common/Reveal/Reveal";
import GlassCard from "../../components/common/GlassCard/GlassCard";
import TagChip from "../../components/common/TagChip/TagChip";
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

/* Two letters stand in for a missing photo: first letters of the first two words,
   or the first two letters of a single name ("Fiya" -> "FI"). */
function initialsOf(name = "") {
  const words = name.split(" ").filter(Boolean);
  if (words.length === 0) return "—";
  return (words.length === 1 ? words[0].slice(0, 2) : words[0][0] + words[1][0]).toUpperCase();
}

/* A link only counts as a profile when it points past the platform homepage. */
function isProfileLink(url) {
  if (!url) return false;
  try {
    return new URL(url).pathname.replace(/\/+$/, "") !== "";
  } catch {
    return false;
  }
}

/* Card photo: fills the card edge to edge, square, with an initials fallback */
function CardPhoto({ person }) {
  const [broken, setBroken] = useState(false);

  return (
    <div className="aspect-square w-full overflow-hidden">
      {person.photo && !broken ? (
        <img
          src={person.photo}
          alt={person.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setBroken(true)}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-expo group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-light via-amber to-amber-dark font-display text-7xl font-bold text-ink">
          {initialsOf(person.name)}
        </div>
      )}
    </div>
  );
}

function Socials({ person, align = "start" }) {
  const links = [
    person.email && {
      key: "mail",
      href: `mailto:${person.email}`,
      label: `Email ${person.name}`,
      icon: <Mail size={14} />,
    },
    isProfileLink(person.linkedin) && {
      key: "linkedin",
      href: person.linkedin,
      label: `${person.name} on LinkedIn`,
      icon: <LinkedinIcon size={14} />,
      external: true,
    },
    isProfileLink(person.instagram) && {
      key: "instagram",
      href: person.instagram,
      label: `${person.name} on Instagram`,
      icon: <InstagramIcon size={14} />,
      external: true,
    },
  ].filter(Boolean);

  if (links.length === 0) return null;

  return (
    <div className={`mt-5 flex items-center gap-2 ${align === "center" ? "justify-center" : ""}`}>
      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          aria-label={link.label}
          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="rounded-full border border-chalk/15 p-2 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/50 hover:text-amber"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}

function TierLabel({ children }) {
  return (
    <Reveal>
      <div className="mb-8 flex items-center gap-5">
        <h2 className="eyebrow whitespace-nowrap">{children}</h2>
        <span className="h-px flex-1 bg-gradient-to-r from-chalk/15 to-transparent" />
      </div>
    </Reveal>
  );
}

/* One card for everybody: full-width photo, badge, name, role line, optional contacts, icons */
function PersonCard({ person, accent, badge, subtitle, contacts = false }) {
  return (
    <GlassCard accent={accent} className="flex h-full flex-col rounded-2xl">
      <CardPhoto person={person} />
      <div className="flex flex-1 flex-col items-center px-5 pb-6 pt-5 text-center">
        <TagChip accent={accent}>{badge}</TagChip>
        <h3 className="mt-3 font-sub text-lg font-semibold leading-snug text-chalk">{person.name}</h3>
        {subtitle && (
          <p className="mt-1 text-sm" style={{ color: accent }}>
            {subtitle}
          </p>
        )}
        {person.roll && <p className="mt-1 font-mono text-xs text-slate-400">{person.roll}</p>}
        {contacts && (person.phone || person.email) && (
          <ul className="mt-3 space-y-1 text-xs text-slate-300">
            {person.phone && (
              <li>
                <a
                  href={`tel:${person.phone}`}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-amber"
                >
                  <Phone aria-hidden="true" className="h-3 w-3 text-slate-400" />
                  {person.phone}
                </a>
              </li>
            )}
            {person.email && (
              <li>
                <a
                  href={`mailto:${person.email}`}
                  className="inline-flex items-center gap-1.5 break-all transition-colors hover:text-amber"
                >
                  <Mail aria-hidden="true" className="h-3 w-3 shrink-0 text-slate-400" />
                  {person.email}
                </a>
              </li>
            )}
          </ul>
        )}
        <div className="mt-auto w-full">
          <Socials person={contacts ? { ...person, email: "" } : person} align="center" />
        </div>
      </div>
    </GlassCard>
  );
}

const CARD_GRID = "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export default function Team() {
  const membersByDomain = HEADS.filter((head) => head.team.length > 0);

  return (
    <div>
      <PageHeader
        eyebrow="The People"
        title="Our Team"
        accent={["Team"]}
      >
        The people behind RIC 2027.
      </PageHeader>

      <div className="container-x pb-32">
        {/* Tier 1: Overall Coordinators */}
        <section>
          <TierLabel>Overall Coordinators</TierLabel>
          <div className={CARD_GRID}>
            {OVERALL_COORDINATORS.map((person, index) => {
              const [badge, group] = person.title.split(" — ");
              return (
                <Reveal key={person.id} delay={index * 0.07}>
                  <PersonCard person={person} accent="#FFC878" badge={badge} subtitle={group} contacts />
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Tier 2: Heads */}
        <section className="mt-24">
          <TierLabel>Heads</TierLabel>
          <div className={CARD_GRID}>
            {HEADS.map((person, index) => (
              <Reveal key={person.id} delay={(index % 4) * 0.07}>
                <PersonCard person={person} accent="#36E5E8" badge="Head" subtitle={person.domain} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tier 3: Members, grouped by domain */}
        <section className="mt-24">
          <TierLabel>Members</TierLabel>
          <div className="space-y-14">
            {membersByDomain.map((head) => (
              <div key={head.id}>
                <Reveal>
                  <h3 className="mb-5 font-mono text-sm font-semibold uppercase tracking-[0.16em] text-amber">
                    {head.domain}
                  </h3>
                </Reveal>
                <ul className={CARD_GRID}>
                  {head.team.map((member, i) => (
                    <Reveal as="li" key={`${head.id}-${member.name}-${i}`} delay={(i % 4) * 0.05} y={14}>
                      <PersonCard person={member} accent="#ECEAF6" badge="Member" subtitle={head.domain} />
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}