import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Microscope, Scale, School, Sparkles, Wrench } from "lucide-react";
import SplitText from "../../components/common/SplitText/SplitText";
import SpotlightCard from "../../components/common/SpotlightCard/SpotlightCard";
import { eventCategories } from "../../data/events";

const ICONS = { GraduationCap, Microscope, School, Scale, Wrench };
const EASE = [0.22, 1, 0.36, 1];

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(",");
};

export default function Events() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  // Hold the first set of cards back until the route curtain has lifted
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  const category = eventCategories[categoryIndex];
  const Icon = ICONS[category.icon] ?? Sparkles;
  const totalEvents = eventCategories.reduce((sum, c) => sum + c.events.length, 0);

  return (
    <div className="container-x pb-32 pt-32 sm:pt-44">
      <header className="max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          className="eyebrow"
        >
          Programme
        </motion.p>
        <SplitText
          as="h1"
          className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight text-chalk sm:text-7xl"
          text="Our Events"
          accent={["Events"]}
          animateOnMount
          delay={0.55}
        />
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-slate-400"
        >
          Engineering, research, humanities, schools and professional workshops —{" "}
          {eventCategories.length} categories, {totalEvents} events.
        </motion.p>
      </header>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.05, ease: EASE }}
        className="mt-14 flex gap-2 overflow-x-auto pb-2"
      >
        {eventCategories.map((cat, i) => {
          const isActive = i === categoryIndex;
          const CatIcon = ICONS[cat.icon] ?? Sparkles;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryIndex(i)}
              className={`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isActive ? "text-ink" : "text-slate-400 hover:text-chalk"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: cat.accent }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <CatIcon className="relative z-10 h-4 w-4" />
              <span className="relative z-10 whitespace-nowrap">
                {cat.title.replace("CATEGORY ", "")}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Event cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={category.id}
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <p
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: category.accent }}
          >
            <Icon className="h-4 w-4" />
            {category.subtitle}
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.events.map((event, i) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (intro ? 1.1 : 0) + i * 0.06, ease: EASE }}
                whileHover={{ y: -6 }}
              >
                <SpotlightCard
                  color={hexToRgb(category.accent)}
                  className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-500 hover:border-white/25"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                    style={{ backgroundColor: category.accent }}
                  />
                  <span
                    className="font-display text-sm font-bold tracking-[0.2em]"
                    style={{ color: category.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-chalk">{event.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{event.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
