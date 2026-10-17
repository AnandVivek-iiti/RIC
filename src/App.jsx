import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import useScrollTop from "./hooks/useScrollTop";

export default function App() {
  useScrollTop();

  return (
    <div className="bg-blueprint flex min-h-screen flex-col bg-ink text-slate-200">
      <Navbar />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
