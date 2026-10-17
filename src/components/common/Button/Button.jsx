import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "../Magnetic/Magnetic";

const base =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

const variants = {
  primary: "bg-amber text-ink",
  ghost: "border border-chalk/25 text-chalk hover:border-mint hover:text-mint",
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  to,
  href,
  arrow = false,
  magnetic = true,
  ...props
}) {
  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  const inner = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-amber-light transition-transform duration-500 ease-expo group-hover:translate-x-0"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {arrow && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
      </span>
    </>
  );

  let element;
  if (to) {
    element = (
      <Link to={to} className={classes} {...props}>
        {inner}
      </Link>
    );
  } else if (href) {
    element = (
      <a href={href} className={classes} {...props}>
        {inner}
      </a>
    );
  } else {
    element = (
      <button className={classes} {...props}>
        {inner}
      </button>
    );
  }

  return magnetic ? <Magnetic>{element}</Magnetic> : element;
}
