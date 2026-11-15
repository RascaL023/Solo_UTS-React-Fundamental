import Modal from "./Modal.jsx";
import StarRating from "./StarRating.jsx";

export default function MenuInfoModal({ open, menu, comments, onClose }) {
  if (!menu) return null;

  const reviewAverage =
    comments.length === 0
      ? 0
      : comments.reduce((total, comment) => total + comment.rating, 0) / comments.length;

  return (
    <Modal open={open} title={menu.name} onClose={onClose}>
      <img
        src={menu.image}
        alt={menu.name}
        width="800"
        height="600"
        className="aspect-[4/3] w-full rounded-2xl object-cover"
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-surface-3 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">
          {menu.category}
        </span>
        <span className="text-lg font-semibold text-brand-strong">
          Rp{menu.price.toLocaleString("id-ID")}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">{menu.description}</p>

      <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4 text-sm">
        <div>
          <dt className="text-xs text-muted">Rating menu</dt>
          <dd className="mt-1 font-medium">{menu.rating} / 5</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Stok</dt>
          <dd className="mt-1 font-medium">{menu.stock} tersisa</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">ID menu</dt>
          <dd className="mt-1 font-medium">#{menu.id}</dd>
        </div>
      </dl>

      <div className="mt-4 rounded-2xl bg-surface-3 p-3 text-sm">
        <p className="font-medium">Ulasan pengunjung</p>
        {comments.length > 0 ? (
          <div className="mt-1 flex flex-wrap items-center gap-2 text-muted">
            <StarRating value={reviewAverage} readOnly size={14} />
            <span>
              {reviewAverage.toFixed(1)} dari 5 · {comments.length} komentar
            </span>
          </div>
        ) : (
          <p className="mt-1 text-muted">Belum ada komentar. Jadilah yang pertama.</p>
        )}
      </div>
    </Modal>
  );
}
