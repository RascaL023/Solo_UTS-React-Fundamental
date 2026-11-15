import { useMemo, useState } from "react";
import menuData from "./data/menu.js";
import CartDrawer from "./components/CartDrawer.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import HistoryModal from "./components/HistoryModal.jsx";
import MainContent from "./components/MainContent.jsx";
import ReceiptModal from "./components/ReceiptModal.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { useTheme } from "./hooks/useTheme.js";
import { calculateTotals, validatePromo } from "./utils/pricing.js";

const initialStock = Object.fromEntries(menuData.map((menu) => [menu.id, menu.stock]));

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [favorites, setFavorites] = useLocalStorage("waras:favorites", {});
  const [comments, setComments] = useLocalStorage("waras:comments", {});
  const [stock, setStock] = useLocalStorage("waras:stock", initialStock);
  const [cart, setCart] = useLocalStorage("waras:cart", []);
  const [history, setHistory] = useLocalStorage("waras:history", []);
  const [promoCode, setPromoCode] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const menus = useMemo(
    () => menuData.map((menu) => ({ ...menu, stock: stock[menu.id] ?? menu.stock })),
    [stock],
  );

  const cartItems = cart.flatMap(({ menuId, qty }) => {
    const menu = menus.find((item) => item.id === menuId);
    return menu ? [{ ...menu, qty }] : [];
  });

  const totals = calculateTotals(cartItems, promoCode);
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

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

  const addToCart = (menuId) => {
    const menu = menus.find((item) => item.id === menuId);
    if (!menu) return;

    setCart((current) => {
      const existing = current.find((item) => item.menuId === menuId);
      const nextQty = Math.min((existing?.qty ?? 0) + 1, menu.stock);

      if (existing) {
        return current.map((item) =>
          item.menuId === menuId ? { ...item, qty: nextQty } : item,
        );
      }

      return nextQty > 0 ? [...current, { menuId, qty: nextQty }] : current;
    });
  };

  const changeQty = (menuId, quantity) => {
    const menu = menus.find((item) => item.id === menuId);
    if (!menu) return;

    const nextQty = Math.max(0, Math.min(quantity, menu.stock));

    setCart((current) =>
      nextQty === 0
        ? current.filter((item) => item.menuId !== menuId)
        : current.map((item) =>
            item.menuId === menuId ? { ...item, qty: nextQty } : item,
          ),
    );
  };

  const removeItem = (menuId) => {
    setCart((current) => current.filter((item) => item.menuId !== menuId));
  };

  const applyPromo = (code) => {
    const result = validatePromo(code, cartItems);
    if (result.error) return result;

    setPromoCode(result.code);
    return result;
  };

  const checkout = ({ method, cash }) => {
    if (cartItems.length === 0) {
      return { error: "Keranjang masih kosong." };
    }

    const currentTotals = calculateTotals(cartItems, promoCode);

    if (method === "Tunai" && cash < currentTotals.total) {
      return { error: "Uang tunai kurang dari total pembayaran." };
    }

    const transaction = {
      id: `WRS-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      items: cartItems.map(({ name, price, qty }) => ({ name, price, qty })),
      subtotal: currentTotals.subtotal,
      discount: currentTotals.discount,
      promoCode: currentTotals.discount > 0 ? promoCode : null,
      tax: currentTotals.tax,
      total: currentTotals.total,
      method,
      cash: method === "Tunai" ? cash : null,
      change: method === "Tunai" ? cash - currentTotals.total : 0,
    };

    setStock((current) => {
      const next = { ...current };

      for (const item of cartItems) {
        next[item.id] = Math.max(0, (next[item.id] ?? item.stock) - item.qty);
      }

      return next;
    });
    setCart([]);
    setPromoCode("");
    setCartOpen(false);
    setHistory((current) => [transaction, ...current]);
    setReceipt(transaction);

    return { transaction };
  };

  const resetTransactions = () => {
    setStock({ ...initialStock });
    setHistory([]);
    setCart([]);
    setPromoCode("");
  };

  return (
    <div id="atas" className="flex min-h-dvh flex-col bg-surface text-ink">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        historyCount={history.length}
        onOpenHistory={() => setHistoryOpen(true)}
      />
      <MainContent
        menus={menus}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        comments={comments}
        onAddComment={addComment}
        cart={cart}
        onAddToCart={addToCart}
      />
      <Footer />

      {cartOpen && (
        <CartDrawer
          onClose={() => setCartOpen(false)}
          items={cartItems}
          totals={totals}
          promoCode={promoCode}
          onApplyPromo={applyPromo}
          onClearPromo={() => setPromoCode("")}
          onChangeQty={changeQty}
          onRemoveItem={removeItem}
          onCheckout={checkout}
        />
      )}

      {receipt && <ReceiptModal transaction={receipt} onClose={() => setReceipt(null)} />}

      {historyOpen && (
        <HistoryModal
          transactions={history}
          onClose={() => setHistoryOpen(false)}
          onReset={resetTransactions}
        />
      )}
    </div>
  );
}
