/* "#FFC878" -> "255,200,120" (the form SpotlightCard's `color` prop expects) */
export const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(",");
};

/* "#FFC878" -> "255 200 120" (space-separated channels, for rgb(var(--x) / a)) */
export const hexToChannels = (hex) => hexToRgb(hex).replace(/,/g, " ");
