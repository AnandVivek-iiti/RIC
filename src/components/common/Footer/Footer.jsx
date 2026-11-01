import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE } from "../../../utils/constants";
import { eventCategories } from "../../../data/events";
import Reveal from "../Reveal/Reveal";
import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 overflow-hidden">
      <div aria-hidden="true" className="section-divider" />

      <div className="container-x pt-20">
        <Reveal>
          <p
            aria-hidden="true"
            className="text-outline-soft select-none font-display text-[clamp(5rem,24vw,18rem)] font-bold leading-[0.8] tracking-tighter"
          >
            {SITE.name}’{SITE.year.slice(2)}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-8 w-[2.4rem]" />
              <p className="font-display text-lg font-semibold text-chalk">{SITE.fullName}</p>
            </div>
            <p className="mt-3 font-sub text-sm text-amber">{SITE.theme}</p>
            <p className="mt-1 text-sm text-slate-400">{SITE.tagline}</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-chalk/20 px-4 py-2 text-sm font-semibold text-chalk transition-colors hover:border-mint hover:text-mint"
            >
              Get in touch
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-block text-slate-300 transition-all duration-300 hover:translate-x-1 hover:text-amber"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Event categories">
            <p className="eyebrow">Events</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {eventCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/events?category=${category.id}`}
                    className="inline-flex items-center gap-2.5 text-slate-300 transition-all duration-300 hover:translate-x-1 hover:text-amber"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: category.accent }}
                    />
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-5 space-y-2.5 text-sm text-slate-300">
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-amber">
                  {SITE.email}
                </a>
              </li>
              {SITE.contacts.map((contact) => (
                <li key={contact.phone}>
                  <a href={`tel:${contact.phone}`} className="transition-colors hover:text-amber">
                    {contact.name} · {contact.phone}
                  </a>
                </li>
              ))}
              <li className="pt-1 text-slate-400">{SITE.address}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-x mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-chalk/10 py-6 font-mono text-xs text-slate-400">
        <span>
          © {new Date().getFullYear()} {SITE.name} · {SITE.fullName} {SITE.year}
        </span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 uppercase tracking-[0.18em] transition-colors hover:text-amber"
        >
          Back to top
          <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
}
