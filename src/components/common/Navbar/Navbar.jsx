import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NAV_LINKS, SITE } from "../../../utils/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium tracking-wide transition-colors ${
      isActive ? "text-amber" : "text-slate-300 hover:text-mint"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-mint/15 bg-ink/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-chalk"
          onClick={() => setOpen(false)}
        >
          <img src="/logo.png" alt={`${SITE.name} logo`} className="h-8 w-8 object-contain" />
          <span className="font-display">
            {SITE.name}
            <span className="text-mint">.</span>
            <span className="ml-2 hidden align-middle text-[0.7rem] font-medium uppercase tracking-[0.2em] text-amber sm:inline">
              {SITE.theme}
            </span>
          </span>
        </NavLink>

        <button
          type="button"
          className="flex flex-col gap-1 p-2 text-slate-300 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <ul className="flex flex-col gap-3 border-t border-mint/15 bg-ink px-4 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
