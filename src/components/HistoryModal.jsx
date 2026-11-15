import { useState } from "react";
import { ReceiptText, RotateCcw } from "lucide-react";
import Modal from "./Modal.jsx";
import { formatRupiah } from "../utils/pricing.js";

export default function HistoryModal({ transactions, onClose, onReset }) {
  const [confirming, setConfirming] = useState(false);
  const totalSpent = transactions.reduce((total, transaction) => total + transaction.total, 0);

  return (
    <Modal open title="Riwayat transaksi" onClose={onClose}>
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <ReceiptText size={28} className="text-muted" aria-hidden="true" />
          <p className="text-sm text-muted">Belum ada transaksi dibayar.</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-muted">
            {transactions.length} transaksi · total {formatRupiah(totalSpent)}
          </p>
          <ul className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
            {transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="rounded-2xl border border-line bg-surface p-3 text-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{transaction.id}</p>
                    <time
                      dateTime={transaction.createdAt}
                      className="mt-0.5 block text-xs text-muted"
                    >
                      {new Date(transaction.createdAt).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </time>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatRupiah(transaction.total)}</p>
                    <span className="mt-0.5 inline-block rounded-full bg-surface-3 px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted">
                      {transaction.method}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted">
                  {transaction.items
                    .map((item) => `${item.name} ×${item.qty}`)
                    .join(", ")}
                </p>
                {transaction.discount > 0 && (
                  <p className="mt-1 text-xs text-leaf">
                    {transaction.promoCode} · hemat {formatRupiah(transaction.discount)}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {confirming ? (
        <div
          role="alertdialog"
          aria-label="Konfirmasi reset transaksi"
          className="mt-4 rounded-2xl border border-line bg-surface p-3"
        >
          <p className="text-sm font-semibold">Reset riwayat dan stok?</p>
          <p className="mt-1 text-xs text-muted">
            Stok semua menu kembali ke nilai awal, riwayat dan keranjang dikosongkan. Favorit dan
            komentar tetap tersimpan.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="flex-1 rounded-full border border-line px-3 py-2.5 text-sm font-semibold transition hover:border-brand"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => {
                onReset();
                setConfirming(false);
              }}
              className="flex-1 rounded-full bg-red-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Ya, reset
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={transactions.length === 0}
          onClick={() => setConfirming(true)}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-muted transition hover:border-red-400 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RotateCcw size={15} aria-hidden="true" />
          Reset riwayat & stok
        </button>
      )}
    </Modal>
  );
}
