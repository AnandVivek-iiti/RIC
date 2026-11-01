import { hexToRgb } from "../../../utils/color";

/* Small pill label. With `accent` (hex) it is tinted in that palette colour. */
export default function TagChip({ children, accent, icon: Icon, className = "" }) {
  const style = accent
    ? {
        color: accent,
        borderColor: `rgba(${hexToRgb(accent)}, 0.35)`,
        backgroundColor: `rgba(${hexToRgb(accent)}, 0.09)`,
      }
    : undefined;

  return (
    <span
      style={style}
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${
        accent ? "" : "border-chalk/15 bg-chalk/5 text-slate-300"
      } ${className}`}
    >
      {Icon && <Icon aria-hidden="true" className="h-3 w-3" />}
      {children}
    </span>
  );
}
