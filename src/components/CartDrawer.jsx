import { useState } from "react";
import { createPortal } from "react-dom";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useLockedOverlay } from "../hooks/useLockedOverlay.js";
import { formatRupiah } from "../utils/pricing.js";

export default function CartDrawer({
  onClose,
  items,
  totals,
  promoCode,
  onApplyPromo,
  onClearPromo,
  onChangeQty,
  onRemoveItem,
  onCheckout,
}) {
  const panelRef = useLockedOverlay(true, onClose);

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Keranjang belanja"
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-line bg-surface-2 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line p-4">
          <h2 className="inline-flex items-center gap-2 text-lg font-bold tracking-tight">
            <ShoppingBag size={18} className="text-brand" aria-hidden="true" />
            Keranjang
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup keranjang"
            className="grid size-8 place-items-center rounded-full border border-line text-muted transition hover:border-brand hover:text-brand-strong"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
            <ShoppingBag size={28} className="text-muted" aria-hidden="true" />
            <p className="text-sm text-muted">Keranjang masih kosong.</p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-strong"
            >
              Pilih menu
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{item.name}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {formatRupiah(item.price)} · sisa {item.stock}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-line px-1.5 py-1">
                      <button
                        type="button"
                        onClick={() => onChangeQty(item.id, item.qty - 1)}
                        aria-label={`Kurangi ${item.name}`}
                        className="grid size-6 place-items-center rounded-full text-muted transition hover:bg-surface-3 hover:text-ink"
                      >
                        <Minus size={12} aria-hidden="true" />
                      </button>
                      <span className="min-w-4 text-center text-xs font-semibold">{item.qty}</span>
                      <button
                        type="button"
                        disabled={item.qty >= item.stock}
                        onClick={() => onChangeQty(item.id, item.qty + 1)}
                        aria-label={`Tambah ${item.name}`}
                        className="grid size-6 place-items-center rounded-full text-muted transition hover:bg-surface-3 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Plus size={12} aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className="text-sm font-semibold">
                      {formatRupiah(item.price * item.qty)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label={`Hapus ${item.name} dari keranjang`}
                      className="text-muted transition hover:text-red-500"
                    >
                      <Trash2 size={15} aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <PromoAndCheckout
              totals={totals}
              promoCode={promoCode}
              onApplyPromo={onApplyPromo}
              onClearPromo={onClearPromo}
              onCheckout={onCheckout}
            />
          </>
        )}
      </aside>
    </div>,
    document.body,
  );
}

function PromoAndCheckout({ totals, promoCode, onApplyPromo, onClearPromo, onCheckout }) {
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [method, setMethod] = useState("Tunai");
  const [cash, setCash] = useState("");
  const [checkoutError, setCheckoutError] = useState("");

  const cashValue = Number(cash) || 0;
  const change = cashValue - totals.total;
  const isCashInsufficient = method === "Tunai" && cashValue < totals.total;

  const handlePromo = (event) => {
    event.preventDefault();
    const result = onApplyPromo(promoInput);

    if (result.error) {
      setPromoError(result.error);
      return;
    }

    setPromoError("");
    setPromoInput("");
  };

  const handleCheckout = () => {
    const result = onCheckout({ method, cash: method === "Tunai" ? cashValue : null });

    if (result.error) setCheckoutError(result.error);
  };

  return (
    <div className="border-t border-line p-4">
      <form onSubmit={handlePromo} className="flex gap-2">
        {promoCode ? (
          <div className="flex flex-1 items-center justify-between gap-2 rounded-xl border border-line bg-surface px-3 py-2">
            <span className="text-xs font-semibold text-leaf">{promoCode}</span>
            <button
              type="button"
              onClick={() => {
                onClearPromo();
                setPromoError("");
              }}
              className="text-xs text-muted underline-offset-2 hover:text-ink hover:underline"
            >
              Hapus
            </button>
          </div>
        ) : (
          <>
            <label htmlFor="promo-code" className="sr-only">
              Kode promo
            </label>
            <input
              id="promo-code"
              value={promoInput}
              onChange={(event) => setPromoInput(event.target.value)}
              placeholder="Kode promo"
              className="min-w-0 flex-1 rounded-xl border border-line bg-surface px-3 py-2 text-sm uppercase placeholder:normal-case placeholder:text-muted focus:border-brand focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl border border-line px-3 py-2 text-xs font-semibold text-ink transition hover:border-brand hover:text-brand-strong"
            >
              Pakai
            </button>
          </>
        )}
      </form>
      {promoError && (
        <p role="alert" className="mt-2 text-xs text-red-600 dark:text-red-400">
          {promoError}
        </p>
      )}

      <dl className="mt-3 space-y-1.5 text-sm">
        <div className="flex justify-between text-muted">
          <dt>Subtotal</dt>
          <dd>{formatRupiah(totals.subtotal)}</dd>
        </div>
        {totals.discount > 0 && (
          <div className="flex justify-between text-leaf">
            <dt>Diskon</dt>
            <dd>-{formatRupiah(totals.discount)}</dd>
          </div>
        )}
        <div className="flex justify-between text-muted">
          <dt>Pajak 10%</dt>
          <dd>{formatRupiah(totals.tax)}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-2 text-base font-bold">
          <dt>Total</dt>
          <dd>{formatRupiah(totals.total)}</dd>
        </div>
      </dl>

      <fieldset className="mt-3">
        <legend className="sr-only">Metode pembayaran</legend>
        <div className="grid grid-cols-2 gap-2">
          {["Tunai", "QRIS"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMethod(option)}
              aria-pressed={method === option}
              className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                method === option
                  ? "border-brand bg-brand-soft text-brand-strong"
                  : "border-line text-muted hover:border-brand"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      {method === "Tunai" && (
        <div className="mt-3">
          <label htmlFor="cash" className="text-xs text-muted">
            Uang diterima
          </label>
          <input
            id="cash"
            type="number"
            min="0"
            inputMode="numeric"
            value={cash}
            onChange={(event) => {
              setCash(event.target.value);
              setCheckoutError("");
            }}
            placeholder={String(totals.total)}
            className="mt-1 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
          {cash !== "" && change >= 0 && (
            <p className="mt-1 text-xs text-muted">
              Kembalian <span className="font-semibold text-ink">{formatRupiah(change)}</span>
            </p>
          )}
        </div>
      )}

      {checkoutError && (
        <p role="alert" className="mt-2 text-xs text-red-600 dark:text-red-400">
          {checkoutError}
        </p>
      )}

      <button
        type="button"
        onClick={handleCheckout}
        disabled={totals.total === 0 || isCashInsufficient}
        className="mt-4 w-full rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-50"
      >
        Bayar {formatRupiah(totals.total)}
      </button>
    </div>
  );
}
