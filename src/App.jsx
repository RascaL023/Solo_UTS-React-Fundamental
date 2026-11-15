import menus from "./data/menu.js";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { useTheme } from "./hooks/useTheme.js";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [favorites, setFavorites] = useLocalStorage("waras:favorites", {});
  const [comments, setComments] = useLocalStorage("waras:comments", {});

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

  const addComment = (menuId, { rating, text }) => {
    const comment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      rating,
      text,
      createdAt: new Date().toISOString(),
    };

    setComments((current) => ({
      ...current,
      [menuId]: [comment, ...(current[menuId] ?? [])],
    }));
  };

  return (
    <div id="atas" className="flex min-h-dvh flex-col bg-surface text-ink">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <MainContent
        menus={menus}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        comments={comments}
        onAddComment={addComment}
      />
      <Footer />
    </div>
  );
}
