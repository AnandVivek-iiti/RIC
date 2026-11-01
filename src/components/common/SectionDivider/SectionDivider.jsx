/* Hairline between page sections. Light enters from the left (pearl) and splits
   only at the far right end, matching the rest of the site. */
export default function SectionDivider({ className = "" }) {
  return (
    <div aria-hidden="true" className={`container-x ${className}`}>
      <div className="section-divider" />
    </div>
  );
}
