import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const W = 800;
const H = 520;
const EASE = [0.22, 1, 0.36, 1];

const f = (x) => 270 + 105 * Math.sin(x / 92) + 44 * Math.sin(x / 36 + 1.3);
const slope = (x) => (105 / 92) * Math.cos(x / 92) + (44 / 36) * Math.cos(x / 36 + 1.3);

function tangentAt(x, length) {
  const y = f(x);
  const m = slope(x);
  const d = length / Math.sqrt(1 + m * m);
  return { x1: x - d, y1: y - m * d, x2: x + d, y2: y + m * d };
}

const CURVE = (() => {
  let d = "";
  for (let x = 0; x <= W; x += 4) d += `${x === 0 ? "M" : "L"}${x} ${f(x).toFixed(1)} `;
  return d.trim();
})();

const FAN = [80, 190, 300, 410, 520, 630, 730];
const START_X = W * 0.2;

/*
 * The theme, drawn: a point travels along a curve while its tangent line rotates with the slope.
 * It drifts on its own and follows the pointer while the mouse is moving.
 */
export default function TangentCurve({ className = "" }) {
  const wrapRef = useRef(null);
  const lineRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const line = lineRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!wrap || !line || !dot || !ring) return undefined;

    const draw = (x) => {
      const y = f(x);
      const t = tangentAt(x, 150);
      line.setAttribute("x1", t.x1.toFixed(1));
      line.setAttribute("y1", t.y1.toFixed(1));
      line.setAttribute("x2", t.x2.toFixed(1));
      line.setAttribute("y2", t.y2.toFixed(1));
      dot.setAttribute("cx", x.toFixed(1));
      dot.setAttribute("cy", y.toFixed(1));
      ring.setAttribute("cx", x.toFixed(1));
      ring.setAttribute("cy", y.toFixed(1));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(W * 0.55);
      return undefined;
    }

    let raf = 0;
    let visible = true;
    let current = START_X;
    let pointerX = START_X;
    let lastMove = -Infinity;
    const start = performance.now();

    const onMove = (event) => {
      if (event.pointerType !== "mouse") return;
      const ratio = Math.min(1, Math.max(0, event.clientX / window.innerWidth));
      pointerX = 30 + ratio * (W - 60);
      lastMove = performance.now();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(wrap);
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = (now) => {
      if (visible) {
        const idle = now - lastMove > 2500;
        const auto = W * (0.5 + 0.38 * Math.sin((now - start) / 2600 - 1.2));
        current += ((idle ? auto : pointerX) - current) * 0.07;
        draw(current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const first = tangentAt(START_X, 150);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="tangent-curve-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="55%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>

        {FAN.map((x, index) => {
          const t = tangentAt(x, 64);
          return (
            <motion.line
              key={x}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke="#5eead4"
              strokeOpacity="0.3"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 + index * 0.1, ease: EASE }}
            />
          );
        })}

        <motion.path
          d={CURVE}
          fill="none"
          stroke="url(#tangent-curve-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        />

        <line
          ref={lineRef}
          x1={first.x1}
          y1={first.y1}
          x2={first.x2}
          y2={first.y2}
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle ref={ringRef} cx={START_X} cy={f(START_X)} r="15" fill="none" stroke="#2dd4bf" strokeOpacity="0.55" />
        <circle
          ref={dotRef}
          cx={START_X}
          cy={f(START_X)}
          r="5"
          fill="#f59e0b"
          style={{ filter: "drop-shadow(0 0 8px rgba(245, 158, 11, 0.9))" }}
        />
      </svg>
    </div>
  );
}
