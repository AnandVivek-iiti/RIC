import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Events from "../pages/Events/Events";
import Team from "../pages/Team/Team";
import Contact from "../pages/Contact/Contact";
import PageTransition from "../components/common/PageTransition/PageTransition";

export default function AppRoutes() {
  const location = useLocation();

  return (
    <PageTransition routeKey={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </PageTransition>
  );
}
