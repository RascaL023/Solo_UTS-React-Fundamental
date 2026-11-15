import Modal from "./Modal.jsx";
import { formatRupiah } from "../utils/pricing.js";

export default function ReceiptModal({ transaction, onClose }) {
  return (
    <Modal open title="Struk pesanan" onClose={onClose}>
      <div className="text-sm">
        <div className="flex justify-between gap-3 text-muted">
          <span>{transaction.id}</span>
          <time dateTime={transaction.createdAt}>
            {new Date(transaction.createdAt).toLocaleString("id-ID", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </time>
        </div>

        <ul className="mt-4 space-y-2 border-y border-line py-3">
          {transaction.items.map((item) => (
            <li key={item.name} className="flex justify-between gap-3">
              <span>
                {item.name} <span className="text-muted">×{item.qty}</span>
              </span>
              <span>{formatRupiah(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-3 space-y-1.5">
          <div className="flex justify-between text-muted">
            <dt>Subtotal</dt>
            <dd>{formatRupiah(transaction.subtotal)}</dd>
          </div>
          {transaction.discount > 0 && (
            <div className="flex justify-between text-leaf">
              <dt>Diskon {transaction.promoCode}</dt>
              <dd>-{formatRupiah(transaction.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between text-muted">
            <dt>Pajak 10%</dt>
            <dd>{formatRupiah(transaction.tax)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-2 text-base font-bold">
            <dt>Total</dt>
            <dd>{formatRupiah(transaction.total)}</dd>
          </div>
        </dl>

        <div className="mt-3 space-y-1 rounded-2xl bg-surface-3 p-3 text-xs text-muted">
          <p>Metode: {transaction.method}</p>
          {transaction.method === "Tunai" && (
            <>
              <p>Diterima: {formatRupiah(transaction.cash)}</p>
              <p>Kembalian: {formatRupiah(transaction.change)}</p>
            </>
          )}
          <p className="pt-1 text-ink">Terima kasih sudah mampir ke WarAs.</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-strong"
        >
          Tutup struk
        </button>
      </div>
    </Modal>
  );
}
