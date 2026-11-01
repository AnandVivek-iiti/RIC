/*
 * "Font test" — 8 heading / subheading / body / mono sets for comparing type.
 * Removing the switcher later: delete this file and
 * components/common/FontSwitcher, then drop the two FontSwitcher lines in
 * Navbar.jsx and the initFontSet() lines in main.jsx. The :root defaults in
 * index.css (Set 1) keep the site styled.
 *
 * All families come from ONE Google Fonts request in index.html (display=swap).
 * Each set is applied through four CSS variables that Tailwind maps to
 * font-display / font-sub / font-body / font-mono.
 */

export const STORAGE_KEY = "ric:font-set";
export const DEFAULT_SET = 1;

const SERIF = 'Georgia, "Times New Roman", serif';
const SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const MONO = 'ui-monospace, "Courier New", monospace';

const stack = (family, fallback) => `"${family}", ${fallback}`;

export const FONT_SETS = [
  {
    id: 1,
    display: stack("DM Serif Display", SERIF),
    sub: stack("Montserrat", SANS),
    body: stack("DM Sans", SANS),
    mono: stack("Courier Prime", MONO),
  },
  {
    id: 2,
    display: stack("League Spartan", SANS),
    sub: stack("Poppins", SANS),
    body: stack("Open Sans", SANS),
    mono: stack("Roboto Mono", MONO),
  },
  {
    id: 3,
    display: stack("Playfair Display", SERIF),
    sub: stack("Lora", SERIF), // italic face is loaded
    body: stack("Source Sans 3", SANS),
    mono: stack("Special Elite", MONO),
    subStyle: "italic",
  },
  {
    id: 4,
    display: stack("Anton", SANS),
    sub: stack("Montserrat", SANS),
    body: stack("Roboto", SANS),
    mono: stack("Roboto Mono", MONO),
    subWeight: 600,
  },
  {
    id: 5,
    display: stack("Cormorant Garamond", SERIF),
    sub: stack("Josefin Sans", SANS),
    body: stack("Lato", SANS),
    mono: stack("Libre Baskerville", SERIF),
  },
  {
    id: 6,
    display: stack("Archivo Black", SANS),
    sub: stack("Work Sans", SANS),
    body: stack("Nunito Sans", SANS),
    mono: stack("Space Mono", MONO),
  },
  {
    id: 7,
    display: stack("Fraunces", SERIF),
    sub: stack("Quicksand", SANS),
    body: stack("Karla", SANS),
    mono: stack("IBM Plex Mono", MONO),
  },
  {
    id: 8,
    display: stack("Libre Baskerville", SERIF),
    sub: stack("Raleway", SANS),
    body: stack("Montserrat", SANS),
    mono: stack("Courier Prime", MONO),
  },
];

export const getFontSet = (id) => FONT_SETS.find((set) => set.id === Number(id)) ?? FONT_SETS[0];

/* First family of a stack, for display in the dropdown: '"DM Serif Display", Georgia' -> DM Serif Display */
export const headingName = (set) => set.display.split('"')[1];

export function readStoredFontSet() {
  try {
    const stored = Number(window.localStorage.getItem(STORAGE_KEY));
    return FONT_SETS.some((set) => set.id === stored) ? stored : DEFAULT_SET;
  } catch {
    return DEFAULT_SET;
  }
}

/* Write the four variables (plus the sub weight/style) onto <html> */
export function applyFontSet(id) {
  const set = getFontSet(id);
  const root = document.documentElement;
  root.style.setProperty("--font-display", set.display);
  root.style.setProperty("--font-sub", set.sub);
  root.style.setProperty("--font-body", set.body);
  root.style.setProperty("--font-mono", set.mono);
  root.style.setProperty("--font-sub-style", set.subStyle ?? "normal");
  root.style.setProperty("--font-sub-weight", String(set.subWeight ?? 500));
  root.dataset.fontSet = String(set.id);
}

/* Run once before React renders so a returning visitor never sees Set 1 first */
export function initFontSet() {
  const id = readStoredFontSet();
  if (id !== DEFAULT_SET) applyFontSet(id);
}

/* Ask the browser to fetch a set's faces first, so the swap does not shift layout.
   Never rejects, and gives up after `timeoutMs` so a slow network cannot block the UI. */
export function loadFontSet(id, timeoutMs = 1500) {
  if (typeof document === "undefined" || !document.fonts?.load) return Promise.resolve();
  const set = getFontSet(id);
  const jobs = [];
  for (const family of [set.display, set.sub, set.body, set.mono]) {
    for (const face of ["400", "700", "italic 400"]) {
      jobs.push(document.fonts.load(`${face} 1em ${family}`).catch(() => []));
    }
  }
  const timeout = new Promise((resolve) => setTimeout(resolve, timeoutMs));
  return Promise.race([Promise.all(jobs), timeout]);
}

export function storeFontSet(id) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(id));
  } catch {
    /* storage may be blocked; the choice then lasts for this visit only */
  }
}
