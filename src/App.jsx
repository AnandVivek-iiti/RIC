import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";
import CustomCursor from "./components/common/CustomCursor/CustomCursor";
import ScrollProgress from "./components/common/ScrollProgress/ScrollProgress";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="bg-blueprint relative flex min-h-screen flex-col bg-ink text-slate-300">
      <div className="ambient" aria-hidden="true" />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="relative z-10 flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
