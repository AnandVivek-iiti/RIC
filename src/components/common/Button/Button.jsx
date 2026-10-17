export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-amber-light focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 focus:ring-offset-ink ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
