import { Link } from "react-router-dom";
import { NAV_LINKS, SITE } from "../../../utils/constants";
import Reveal from "../Reveal/Reveal";
import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 overflow-hidden border-t border-chalk/10">
      <div className="container-x pt-20">
        <Reveal>
          <p
            aria-hidden="true"
            className="text-outline-soft select-none font-display text-[clamp(5rem,24vw,18rem)] font-bold leading-[0.8] tracking-tighter"
          >
            {SITE.name}’{SITE.year.slice(2)}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-7 w-7" />
              <p className="font-display text-lg font-semibold text-chalk">{SITE.fullName}</p>
            </div>
            <p className="mt-3 text-sm text-amber">{SITE.theme}</p>
            <p className="mt-1 text-sm text-slate-500">{SITE.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-block text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-amber"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-5 space-y-2.5 text-sm text-slate-400">
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
              <li className="pt-1 text-slate-500">{SITE.address}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-x mt-16 border-t border-chalk/10 py-6 text-xs text-slate-500">
        © {new Date().getFullYear()} {SITE.name} · {SITE.fullName} {SITE.year}
      </div>
    </footer>
  );
}
