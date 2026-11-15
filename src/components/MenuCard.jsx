import { Heart, Info, MessageCircle, Plus, Star } from "lucide-react";

const iconButtonClass =
  "grid size-8 place-items-center rounded-full border border-line bg-surface-2 text-muted transition hover:border-brand hover:text-brand-strong";

export default function MenuCard({
  menu,
  isFavorite,
  onToggleFavorite,
  onOpenInfo,
  onOpenComment,
  onAddToCart,
  cartQty,
  commentCount,
}) {
  const isLowStock = menu.stock <= 10;
  const isStockLimit = cartQty >= menu.stock;
  const favoriteLabel = isFavorite
    ? `Hapus ${menu.name} dari favorit`
    : `Tambahkan ${menu.name} ke favorit`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-3">
        <img
          src={menu.image}
          alt={menu.name}
          loading="lazy"
          width="800"
          height="600"
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => onToggleFavorite(menu.id)}
          aria-label={favoriteLabel}
          aria-pressed={isFavorite}
          title={favoriteLabel}
          className={`absolute right-3 top-3 grid size-9 place-items-center rounded-full border backdrop-blur transition ${
            isFavorite
              ? "border-red-200/80 bg-white text-red-500"
              : "border-white/40 bg-black/30 text-white hover:bg-black/50"
          }`}
        >
          <Heart
            size={17}
            aria-hidden="true"
            className={isFavorite ? "fill-red-500" : undefined}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
              {menu.category}
            </span>
            <h3 className="mt-1 text-base font-semibold leading-snug">{menu.name}</h3>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-surface-3 px-2 py-1 text-xs font-medium">
            <Star size={12} className="fill-brand text-brand" aria-hidden="true" />
            {menu.rating}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {menu.description}
        </p>

        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            <span className="block text-base font-semibold text-brand-strong">
              Rp{menu.price.toLocaleString("id-ID")}
            </span>
            <span
              className={`mt-1 block text-[11px] ${
                isLowStock ? "text-brand-strong" : "text-muted"
              }`}
            >
              Sisa {menu.stock}
              {cartQty > 0 ? ` · ${cartQty} di keranjang` : ""}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onOpenInfo(menu)}
              aria-label={`Lihat info ${menu.name}`}
              title="Info menu"
              className={iconButtonClass}
            >
              <Info size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onOpenComment(menu)}
              aria-label={`Buka komentar ${menu.name}`}
              title="Komentar"
              className={`relative ${iconButtonClass}`}
            >
              <MessageCircle size={16} aria-hidden="true" />
              {commentCount > 0 && (
                <span className="absolute -right-1 -top-1 grid min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">
                  {commentCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => onAddToCart(menu.id)}
              disabled={isStockLimit}
              aria-label={
                isStockLimit
                  ? `Stok ${menu.name} sudah maksimal di keranjang`
                  : `Tambah ${menu.name} ke keranjang`
              }
              title={isStockLimit ? "Stok maksimal tercapai" : "Tambah ke keranjang"}
              className="grid size-8 place-items-center rounded-full bg-brand text-white transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
