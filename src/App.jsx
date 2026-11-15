import menus from "./data/menu.js";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import { useTheme } from "./hooks/useTheme.js";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div id="atas" className="flex min-h-dvh flex-col bg-surface text-ink">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <MainContent menus={menus} />
      <Footer />
    </div>
  );
}
