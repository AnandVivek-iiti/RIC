import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <span className="hero-badge">Genre — Abstract</span>
          <h1 className="hero-title">
            Chasing <span className="hero-tangent">Tangents</span>
          </h1>
          <p className="hero-tagline">From broken logic to brilliant horizons</p>
          <p className="hero-subtitle">
            Humanity followed straight lines for centuries. The next era asks us to embrace the
            detour — to treat anomalies not as errors to erase, but as doorways to new paradigms.
          </p>
          <div className="hero-actions">
            <Link to="/events" className="hero-btn hero-btn-primary">
              Explore the Program
            </Link>
            <Link to="/about" className="hero-btn hero-btn-ghost">
              Read the Manifesto
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-prism" />
          <div className="hero-prism hero-prism-2" />
          <div className="hero-equation">
            <span className="hero-eqn">f(x) = ?</span>
            <span className="hero-eqn hero-eqn-branch">↳ ...but what if?</span>
          </div>
          <svg className="hero-path" viewBox="0 0 220 160" preserveAspectRatio="none">
            <path d="M6 150 C 60 150 60 62 110 62 S 160 12 214 22" />
            <circle cx="110" cy="62" r="4" />
            <circle cx="214" cy="22" r="4" />
          </svg>
        </div>
      </div>
    </section>
  );
}
