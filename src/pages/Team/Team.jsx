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

const SIZES = {
  sm: "h-9 w-9 rounded-lg text-xs",
  xl: "h-28 w-28 rounded-[1.4rem] text-3xl",
  lg: "h-16 w-16 rounded-xl text-lg",
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

/* A link only counts as a profile when it points past the platform homepage. */
function isProfileLink(url) {
  if (!url) return false;
  try {
    return new URL(url).pathname.replace(/\/+$/, "") !== "";
  } catch {
    return false;
  }
}

/* Avatar: photo with initials fallback */
function Avatar({ person, size = "lg" }) {
  const [broken, setBroken] = useState(false);
  const cls = SIZES[size] ?? SIZES.lg;

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
      className={`${cls} flex shrink-0 items-center justify-center bg-gradient-to-br from-amber-light via-amber to-amber-dark font-display font-bold text-ink`}
    >
      {initialsOf(person.name)}
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
        {/* Tier 1: Overall Coordinators, large cards */}
        <section>
          <TierLabel>Overall Coordinators</TierLabel>
          <div className="grid gap-5 md:grid-cols-2">
            {OVERALL_COORDINATORS.map((person, index) => (
              <Reveal key={person.id} delay={index * 0.08}>
                <GlassCard accent="#FFC878" className="h-full rounded-[2rem] p-8 sm:p-10">
                  <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
                    <div className="rounded-3xl bg-gradient-to-br from-amber/50 via-transparent to-mint/40 p-[2px]">
                      <Avatar person={person} size="xl" />
                    </div>
                    <div className="min-w-0">
                      <TagChip accent="#FFC878">{person.title}</TagChip>
                      <h3 className="mt-4 font-sub text-3xl font-bold leading-tight tracking-tight text-chalk">
                        {person.name}
                      </h3>
                      <ul className="mt-4 space-y-1.5 text-sm text-slate-300">
                        {person.phone && (
                          <li>
                            <a
                              href={`tel:${person.phone}`}
                              className="inline-flex items-center gap-2 transition-colors hover:text-amber"
                            >
                              <Phone aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />
                              {person.phone}
                            </a>
                          </li>
                        )}
                        {person.email && (
                          <li>
                            <a
                              href={`mailto:${person.email}`}
                              className="inline-flex items-center gap-2 transition-colors hover:text-amber"
                            >
                              <Mail aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />
                              {person.email}
                            </a>
                          </li>
                        )}
                      </ul>
                      <Socials person={{ ...person, email: "" }} />
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tier 2: Heads, compact cards */}
        <section className="mt-24">
          <TierLabel>Heads</TierLabel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HEADS.map((person, index) => (
              <Reveal key={person.id} delay={(index % 3) * 0.07}>
                <GlassCard accent="#36E5E8" className="h-full rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <Avatar person={person} size="lg" />
                    <div className="min-w-0">
                      <h3 className="font-sub text-lg font-semibold leading-snug text-chalk">{person.name}</h3>
                      <p className="mt-1 text-sm text-mint-light">{person.role}</p>
                      {person.roll && (
                        <p className="mt-1 font-mono text-xs text-slate-400">{person.roll}</p>
                      )}
                    </div>
                  </div>
                  <Socials person={person} />
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tier 3: Members, grouped by domain in a plain grid */}
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
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {head.team.map((member, i) => (
                    <Reveal as="li" key={`${head.id}-${member.name}-${i}`} delay={(i % 4) * 0.05} y={14}>
                      <div className="glass flex items-center gap-3 rounded-xl px-3 py-2.5">
                        <Avatar person={member} size="md" />
                        <span className="min-w-0 text-md font-medium leading-snug text-chalk">{member.name}</span>
                      </div>
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
