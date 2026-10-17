/* Card whose glow follows the cursor.
   `as` may be a motion component; `color` is an "r,g,b" string for the glow. */
export default function SpotlightCard({
  as: Tag = "div",
  className = "",
  color,
  style,
  children,
  ...props
}) {
  function onMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <Tag
      onMouseMove={onMove}
      className={`spotlight group ${className}`}
      style={color ? { "--glow": color, ...style } : style}
      {...props}
    >
      {children}
    </Tag>
  );
}
