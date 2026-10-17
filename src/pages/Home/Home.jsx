import { Link } from "react-router-dom";
import Hero from "../../components/home/Hero";
import { SITE, TRACKS } from "../../utils/constants";
import "./Home.css";

const fragments = [
  "Scattered blueprints",
  "Fractured light prisms",
  "Chalkboard equations with sudden branches",
  "Circuit paths curving unpredictably",
  "Macroscopic crystallization",
  "Multi-layered overlay diagrams",
];

const stats = [
  { value: "04", label: "Tracks" },
  { value: "48h", label: "To ship" },
  { value: "∞", label: "Detours" },
  { value: "01", label: "Anomaly" },
];

export default function Home() {
  return (
    <div className="home">
      <Hero />

      <section className="home-section">
        <h2 className="home-heading">Four ways to wander</h2>
        <p className="home-lead">
          {SITE.theme} unites core research, digital exploration, systemic design and speculative
          thinking into a single engine of lateral transformation.
        </p>
        <div className="home-tracks">
          {TRACKS.map((track, index) => (
            <article className="home-track" key={track.name}>
              <span className="home-track-index">0{index + 1}</span>
              <h3>{track.name}</h3>
              <p>{track.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-heading">The vision board</h2>
        <p className="home-lead">Fragments of the world we are building.</p>
        <ul className="home-fragments">
          {fragments.map((fragment) => (
            <li className="home-fragment" key={fragment}>
              {fragment}
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section">
        <div className="home-stats">
          {stats.map((stat) => (
            <div className="home-stat" key={stat.label}>
              <span className="home-stat-value">{stat.value}</span>
              <span className="home-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section home-cta">
        <h2 className="home-heading">Take the detour</h2>
        <p className="home-lead">
          Explore the program or reach out — anomalies welcome, straight lines optional.
        </p>
        <div className="home-cta-actions">
          <Link to="/events" className="home-btn home-btn-primary">
            View Events
          </Link>
          <Link to="/contact" className="home-btn home-btn-ghost">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
