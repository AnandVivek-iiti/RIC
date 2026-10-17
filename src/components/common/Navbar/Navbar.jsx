import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV_LINKS, SITE } from "../../../utils/constants";
import Logo from "../Logo/Logo";

const EASE = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { pathname } = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  // Close the menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1, maxWidth: scrolled ? 780 : 1152 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        className={`relative z-50 flex h-14 w-full items-center justify-between rounded-full border px-3 pl-5 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? "border-chalk/10 bg-ink-deep/70 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <NavLink to="/" className="flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
          <Logo className="h-7 w-7" />
          <span className="font-display text-lg font-bold tracking-tight text-chalk">
            {SITE.name}
            <span className="text-amber">.</span>
          </span>
        </NavLink>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className="relative block rounded-full px-4 py-2 text-sm font-medium"
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-amber"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-300 ${
                        isActive ? "text-ink" : "text-slate-300 hover:text-chalk"
                      }`}
                    >
                      {link.label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span
            className={`absolute h-px w-5 bg-chalk transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-px w-5 bg-chalk transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-px w-5 bg-chalk transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink-deep px-8 md:hidden"
          >
            <ul className="space-y-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.07, ease: EASE }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `block font-display text-5xl font-semibold tracking-tight ${
                        isActive ? "text-amber" : "text-chalk"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <p className="mt-12 text-xs uppercase tracking-[0.25em] text-slate-500">
              {SITE.fullName} {SITE.year}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
