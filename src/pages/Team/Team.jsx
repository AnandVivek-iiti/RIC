import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Reveal from "../../components/common/Reveal/Reveal";
import SplitText from "../../components/common/SplitText/SplitText";
import SpotlightCard from "../../components/common/SpotlightCard/SpotlightCard";
import { OVERALL_COORDINATORS, HEADS } from "../../data/team";

const EASE = [0.22, 1, 0.36, 1];

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
  sm: "h-12 w-12 rounded-xl text-sm",
  xl: "h-24 w-24 rounded-2xl text-2xl",
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
      className={`${cls} flex shrink-0 items-center justify-center font-display font-bold text-ink`}
      style={{ background: "linear-gradient(135deg,#f59e0b,#dc2626)" }}
    >
      {initialsOf(person.name)}
    </div>
  );
}

function Socials({ person }) {
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
    <div className="mt-5 flex items-center justify-center gap-2">
      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          aria-label={link.label}
          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="rounded-full border border-white/10 p-2 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/50 hover:text-amber"
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
        <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
      </div>
    </Reveal>
  );
}

export default function Team() {
  return (
    <div className="container-x pb-32 pt-32 sm:pt-44">
      <header className="max-w-3xl">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
        >
          The People
        </motion.p>
        <SplitText
          as="h1"
          className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight text-chalk sm:text-7xl"
          text="Our Team"
          accent={["Team"]}
          animateOnMount
          delay={0.55}
        />
        <motion.p
          className="mt-8 max-w-xl text-lg leading-relaxed text-slate-400"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
        >
          The people behind RIC 2027.
        </motion.p>
      </header>

      {/* Overall Coordinators */}
      <section className="mt-24">
        <TierLabel>Overall Coordinators</TierLabel>
        <div className="grid gap-5 sm:grid-cols-2">
          {OVERALL_COORDINATORS.map((person, index) => (
            <Reveal key={person.id} delay={index * 0.08}>
              <SpotlightCard className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center transition-colors duration-500 hover:border-amber/40">
                <div className="mx-auto mb-6 w-fit">
                  <Avatar person={person} size="xl" />
                </div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-amber">
                  {person.title}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-chalk">{person.name}</h3>
                {person.phone && (
                  <a
                    href={`tel:${person.phone}`}
                    className="mt-2 inline-block text-sm text-slate-400 transition-colors hover:text-amber"
                  >
                    {person.phone}
                  </a>
                )}
                <Socials person={person} />
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Heads */}
      <section className="mt-24">
        <TierLabel>Heads</TierLabel>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HEADS.map((person, index) => (
            <Reveal key={person.id} delay={(index % 3) * 0.07}>
              <SpotlightCard
                color="45,212,191"
                className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-500 hover:border-mint/40"
              >
                <div className="flex items-center gap-4">
                  <Avatar person={person} size="lg" />
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold leading-snug text-chalk">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-sm text-mint">{person.role}</p>
                    {person.roll && <p className="mt-1 text-xs text-slate-500">{person.roll}</p>}
                  </div>
                </div>
                <Socials person={person} />
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Teams */}
      <section className="mt-24">
        <TierLabel>Teams</TierLabel>
        <div className="space-y-12">
          {HEADS.map((head) => (
            <div key={head.id}>
              <Reveal>
                <h3 className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.18em] text-amber">
                  {head.domain}
                </h3>
              </Reveal>

              {head.team.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {head.team.map((member, i) => (
                    <Reveal key={`${head.id}-${member.name}-${i}`} delay={(i % 6) * 0.05} y={16}>
                      <SpotlightCard
                        color="45,212,191"
                        className="h-full rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center transition-colors duration-500 hover:border-mint/40"
                      >
                        <div className="mx-auto mb-3 w-fit">
                          <Avatar person={member} size="sm" />
                        </div>
                        <p className="text-sm font-medium leading-snug text-chalk">{member.name}</p>
                      </SpotlightCard>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <p className="text-sm italic text-slate-500">Team members to be added.</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
