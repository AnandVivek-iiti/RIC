import { Compass, Cpu, Layers, Telescope } from "lucide-react";
import GlassCard from "../common/GlassCard/GlassCard";
import Reveal from "../common/Reveal/Reveal";
import TagChip from "../common/TagChip/TagChip";
import { TRACKS } from "../../utils/constants";

/* One accent per track, taken from the palette; the motif is a curve and its tangent
   drawn at a different angle for each track. */
const LOOKS = [
  { icon: Telescope, accent: "#36E5E8", angle: -18 },
  { icon: Cpu, accent: "#FFC878", angle: -6 },
  { icon: Layers, accent: "#ECEAF6", angle: 8 },
  { icon: Compass, accent: "#36E5E8", angle: 20 },
];

function TangentMotif({ accent, angle }) {
  return (
    <svg
      viewBox="0 0 160 110"
      aria-hidden="true"
      className="pointer-events-none absolute -right-2 -top-2 h-28 w-40 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
    >
      <circle cx="58" cy="62" r="34" fill="none" stroke={accent} strokeOpacity="0.28" strokeWidth="1" />
      <g transform={`rotate(${angle} 58 62)`}>
        <line x1="-10" y1="28" x2="150" y2="28" stroke={accent} strokeOpacity="0.75" strokeWidth="1" />
        <circle cx="58" cy="28" r="3" fill={accent} />
      </g>
    </svg>
  );
}

export default function TracksShowcase() {
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-2">
      {TRACKS.map((track, i) => {
        const look = LOOKS[i % LOOKS.length];
        const Icon = look.icon;
        return (
          <Reveal key={track.name} delay={(i % 2) * 0.1}>
            <GlassCard accent={look.accent} className="h-full rounded-3xl p-8 sm:p-9">
              <TangentMotif accent={look.accent} angle={look.angle} />
              <div className="relative flex items-center gap-4">
                <span
                  className="grid h-11 w-11 place-items-center rounded-2xl border"
                  style={{ borderColor: `${look.accent}55`, color: look.accent }}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="numeral text-4xl" style={{ "--ol": look.accent }} aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <h3 className="relative mt-10 font-sub text-2xl font-semibold tracking-tight text-chalk sm:text-3xl">
                {track.name}
              </h3>
              <p className="relative mt-3 max-w-sm leading-relaxed text-slate-400">{track.text}</p>
              <ul className="relative mt-7 flex flex-wrap gap-2">
                {track.topics.map((topic) => (
                  <li key={topic}>
                    <TagChip accent={look.accent} className="normal-case tracking-normal">
                      {topic}
                    </TagChip>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        );
      })}
    </div>
  );
}
