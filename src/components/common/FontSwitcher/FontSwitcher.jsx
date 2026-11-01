import { useEffect, useRef, useState } from "react";
import {
  FONT_SETS,
  applyFontSet,
  headingName,
  loadFontSet,
  readStoredFontSet,
  storeFontSet,
} from "../../../data/fontSets";
import { hexToChannels } from "../../../utils/color";

/*
 * "Font test" — a pill of round swatches, one per type set. Swaps the whole type
 * set live and remembers the choice. Each swatch shows "Aa" in that set's heading
 * face; the set number and face name are the tooltip / accessible name.
 *  variant="nav"  — compact pill for the Navbar
 *  variant="menu" — larger version for the mobile menu
 * The faces are fetched first (loadFontSet) so the swap happens without layout shift.
 */
const SWATCH_COLORS = [
  "#36E5E8",
  "#FFC878",
  "#FF6A72",
  "#D9D2F0",
  "#8CAAFF",
  "#8CF0F2",
  "#FFE0AE",
  "#ECEAF6",
];

export default function FontSwitcher({ variant = "nav" }) {
  const [current, setCurrent] = useState(readStoredFontSet);
  const [open, setOpen] = useState(false); // float variant on phones: collapsed to one swatch
  const groupRef = useRef(null);

  // Keep several switchers (navbar + mobile menu) in step
  useEffect(() => {
    const onChange = (event) => setCurrent(event.detail);
    window.addEventListener("ric:font-set", onChange);
    return () => window.removeEventListener("ric:font-set", onChange);
  }, []);

  async function select(id) {
    setOpen(false);
    if (id === current) return;
    setCurrent(id);
    await loadFontSet(id);
    applyFontSet(id);
    storeFontSet(id);
    window.dispatchEvent(new CustomEvent("ric:font-set", { detail: id }));
  }

  // Arrow keys move between swatches (radio-group pattern)
  function onKeyDown(event) {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const step = keys[event.key];
    if (!step) return;
    event.preventDefault();
    const index = FONT_SETS.findIndex((set) => set.id === current);
    const next = FONT_SETS[(index + step + FONT_SETS.length) % FONT_SETS.length];
    select(next.id);
    groupRef.current?.querySelector(`[data-set="${next.id}"]`)?.focus();
  }

  const isFloat = variant === "float";
  const currentIndex = Math.max(0, FONT_SETS.findIndex((set) => set.id === current));
  const currentSet = FONT_SETS[currentIndex];

  const group = (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label="Font test"
      onKeyDown={onKeyDown}
      className={`font-swatches ${variant === "menu" || variant === "float" ? `font-swatches--${variant}` : ""}`}
    >
      {FONT_SETS.map((set, i) => {
        const active = set.id === current;
        const label = `Font set ${set.id}: ${headingName(set)}`;
        return (
          <button
            key={set.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            data-set={set.id}
            tabIndex={active ? 0 : -1}
            onClick={() => select(set.id)}
            className={`font-swatch ${active ? "is-active" : ""}`}
            style={{ "--sw": hexToChannels(SWATCH_COLORS[i % SWATCH_COLORS.length]) }}
          >
            <span className="font-swatch__face" style={{ fontFamily: set.display }}>
              Aa
            </span>
          </button>
        );
      })}
    </div>
  );

  if (!isFloat) return group;

  // Float variant: full pill from 640px up; on phones one swatch that opens the pill
  const toggleLabel = `Font test: ${headingName(currentSet)} (tap to change)`;
  return (
    <div className="flex items-center gap-2 max-sm:flex-col-reverse max-sm:items-start">
      <button
        type="button"
        aria-expanded={open}
        aria-label={toggleLabel}
        title={toggleLabel}
        onClick={() => setOpen((value) => !value)}
        className="font-swatch is-active sm:hidden"
        style={{
          "--sw": hexToChannels(SWATCH_COLORS[currentIndex % SWATCH_COLORS.length]),
          "--size": "2.25rem",
        }}
      >
        <span className="font-swatch__face" style={{ fontFamily: currentSet.display }}>
          Aa
        </span>
      </button>
      <div className={open ? "" : "max-sm:hidden"}>{group}</div>
    </div>
  );
}
