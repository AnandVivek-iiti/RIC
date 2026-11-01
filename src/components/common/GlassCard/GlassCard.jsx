import SpotlightCard from "../SpotlightCard/SpotlightCard";
import { hexToRgb } from "../../../utils/color";

/* Glass surface used across the site. With `accent` (hex) the cursor glow takes that
   colour and a hairline of it grows along the top (lit) edge on hover. */
export default function GlassCard({ accent, className = "", children, ...props }) {
  return (
    <SpotlightCard color={accent ? hexToRgb(accent) : undefined} className={className} {...props}>
      {accent && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px origin-left scale-x-[0.35] opacity-70 transition-all duration-500 ease-expo group-hover:scale-x-100 group-hover:opacity-100"
          style={{ backgroundImage: `linear-gradient(90deg, ${accent}, transparent)` }}
        />
      )}
      {children}
    </SpotlightCard>
  );
}
