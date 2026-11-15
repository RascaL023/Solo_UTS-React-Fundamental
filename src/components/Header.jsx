import { Bell, Coffee, ReceiptText, ShoppingCart } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Header({
  theme,
  onToggleTheme,
  cartCount,
  onOpenCart,
  historyCount,
  onOpenHistory,
  unreadCount,
  onOpenNotifications,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        <a href="#atas" className="flex items-center gap-2 sm:gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-brand-soft text-brand-strong">
            <Coffee size={20} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-bold leading-none tracking-tight sm:text-lg">
              WarAs
            </span>
            <span className="mt-1 hidden text-[11px] uppercase tracking-[0.18em] text-muted sm:block">
              Warkop Aswan
            </span>
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={onOpenNotifications}
            aria-label={`Buka notifikasi, ${unreadCount} belum dibaca`}
            title="Notifikasi"
            className="relative grid size-10 place-items-center rounded-full border border-line bg-surface-2 text-ink transition hover:border-brand hover:text-brand-strong"
          >
            <Bell size={18} aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenHistory}
            aria-label={`Buka riwayat transaksi, ${historyCount} transaksi`}
            title="Riwayat transaksi"
            className="relative grid size-10 place-items-center rounded-full border border-line bg-surface-2 text-ink transition hover:border-brand hover:text-brand-strong"
          >
            <ReceiptText size={18} aria-hidden="true" />
            {historyCount > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-leaf px-1 text-[10px] font-semibold text-white">
                {historyCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Buka keranjang, ${cartCount} item`}
            title="Keranjang"
            className="relative grid size-10 place-items-center rounded-full border border-line bg-surface-2 text-ink transition hover:border-brand hover:text-brand-strong"
          >
            <ShoppingCart size={18} aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
