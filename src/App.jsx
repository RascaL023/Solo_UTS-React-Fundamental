import menus from "./data/menu.js";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { useTheme } from "./hooks/useTheme.js";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [favorites, setFavorites] = useLocalStorage("waras:favorites", {});

  const toggleFavorite = (menuId) => {
    setFavorites((current) => {
      const next = { ...current };

      if (next[menuId]) {
        delete next[menuId];
      } else {
        next[menuId] = Date.now();
      }

      return next;
    });
  };

  return (
    <div id="atas" className="flex min-h-dvh flex-col bg-surface text-ink">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <MainContent
        menus={menus}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
      <Footer />
    </div>
  );
}
