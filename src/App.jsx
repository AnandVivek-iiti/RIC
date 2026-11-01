import { useState } from "react";
import Navbar from "./components/common/Navbar/Navbar";
import FontSwitcher from "./components/common/FontSwitcher/FontSwitcher";
import Footer from "./components/common/Footer/Footer";
import CustomCursor from "./components/common/CustomCursor/CustomCursor";
import ScrollProgress from "./components/common/ScrollProgress/ScrollProgress";
import Preloader, { shouldPlayIntro } from "./components/common/Preloader/Preloader";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  // The intro plays once per session; the site mounts when its exit begins.
  const [playIntro] = useState(shouldPlayIntro);
  const [siteReady, setSiteReady] = useState(!playIntro);
  const [introDone, setIntroDone] = useState(!playIntro);

  return (
    <>
      {!introDone && <Preloader onReveal={() => setSiteReady(true)} onDone={() => setIntroDone(true)} />}

      {siteReady && (
        <div className="bg-blueprint relative flex min-h-screen flex-col bg-ink text-slate-300">
          <div className="ambient" aria-hidden="true" />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          {/* Font test: fixed pill, kept outside the navbar (see data/fontSets.js) */}
          <div className="fixed bottom-3 left-3 z-[45] sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2">
            <FontSwitcher variant="float" />
          </div>
          <main className="relative z-10 flex-1">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
