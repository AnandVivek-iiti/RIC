import { useState } from "react";
import { SITE } from "../../../utils/constants";

/* Logo image that quietly disappears if /logo.png is missing */
export default function Logo({ className = "h-8 w-8" }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;

  return (
    <img
      src="/logo.png"
      alt={`${SITE.name} logo`}
      onError={() => setOk(false)}
      className={`object-contain ${className}`}
    />
  );
}
