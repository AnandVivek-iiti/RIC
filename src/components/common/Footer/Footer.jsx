import { Link } from "react-router-dom";
import { NAV_LINKS, SITE } from "../../../utils/constants";

export default function Footer() {
  return (
    <footer className="border-t border-mint/15 bg-ink-light/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-chalk">
            <img src="/logo.png" alt={`${SITE.name} logo`} className="h-7 w-7 object-contain" />
            {SITE.name}
          </h3>
          <p className="mt-3 text-sm font-medium text-amber">{SITE.theme}</p>
          <p className="mt-1 text-sm text-slate-400">{SITE.tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-mint">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-slate-400 transition-colors hover:text-amber">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-mint">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>{SITE.email}</li>
            <li>{SITE.phone}</li>
            <li>{SITE.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-mint/10 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {SITE.name} — {SITE.tagline}
      </div>
    </footer>
  );
}
