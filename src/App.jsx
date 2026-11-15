import { useCallback, useMemo, useState } from "react";
import menuData from "./data/menu.js";
import CartDrawer from "./components/CartDrawer.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import HistoryModal from "./components/HistoryModal.jsx";
import MainContent from "./components/MainContent.jsx";
import NotificationModal from "./components/NotificationModal.jsx";
import ReceiptModal from "./components/ReceiptModal.jsx";
import ToastStack from "./components/ToastStack.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { useNotifications } from "./hooks/useNotifications.js";
import { useTheme } from "./hooks/useTheme.js";
import { calculateTotals, formatRupiah, validatePromo } from "./utils/pricing.js";

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
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [toasts, setToasts] = useState([]);
  const { notifications, unreadCount, addNotification, markAllRead } = useNotifications();

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

  const pushToast = (message, tone = "success") => {
    setToasts((current) =>
      [
        ...current,
        { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, message, tone },
      ].slice(-3),
    );
  };

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toggleFavorite = (menuId) => {
    const menu = menus.find((item) => item.id === menuId);
    if (!menu) return;

    const wasFavorite = Boolean(favorites[menuId]);

    setFavorites((current) => {
      const next = { ...current };

      if (next[menuId]) {
        delete next[menuId];
      } else {
        next[menuId] = Date.now();
      }

      return next;
    });

    const message = wasFavorite
      ? `${menu.name} dihapus dari favorit.`
      : `${menu.name} ditambahkan ke favorit.`;

    pushToast(message);
    addNotification({
      type: "favorite",
      title: wasFavorite ? "Favorit dihapus" : "Favorit ditambahkan",
      message,
    });
  };

  const addComment = (menuId, { rating, text }) => {
    const menu = menus.find((item) => item.id === menuId);
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

    pushToast("Komentar kamu sudah tersimpan.");
    addNotification({
      type: "comment",
      title: "Komentar terkirim",
      message: `${menu?.name ?? "Menu"} · ${rating} bintang`,
    });
  };

  const addToCart = (menuId) => {
    const menu = menus.find((item) => item.id === menuId);
    if (!menu) return;

    const existingQty = cart.find((item) => item.menuId === menuId)?.qty ?? 0;

    if (existingQty >= menu.stock) {
      pushToast(`Stok ${menu.name} sudah maksimal di keranjang.`, "info");
      return;
    }

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

    pushToast(`${menu.name} masuk keranjang.`);
    addNotification({
      type: "cart",
      title: "Ditambahkan ke keranjang",
      message: `${menu.name} · ${formatRupiah(menu.price)}`,
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
    pushToast(`Promo ${result.code} aktif.`);
    addNotification({
      type: "promo",
      title: "Promo diterapkan",
      message: `${result.code} · hemat ${formatRupiah(result.discount)}`,
    });
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

    pushToast("Pembayaran berhasil. Struk sudah dibuat.");
    addNotification({
      type: "order",
      title: "Pembayaran berhasil",
      message: `${transaction.id} · ${formatRupiah(transaction.total)} via ${method}`,
    });

    return { transaction };
  };

  const resetTransactions = () => {
    setStock({ ...initialStock });
    setHistory([]);
    setCart([]);
    setPromoCode("");

    pushToast("Riwayat dan stok sudah direset.");
    addNotification({
      type: "reset",
      title: "Riwayat direset",
      message: "Stok kembali ke nilai awal, riwayat dan keranjang dikosongkan.",
    });
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
        unreadCount={unreadCount}
        onOpenNotifications={() => {
          markAllRead();
          setNotificationsOpen(true);
        }}
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

      {notificationsOpen && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setNotificationsOpen(false)}
        />
      )}

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
