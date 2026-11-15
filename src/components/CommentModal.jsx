import { useState } from "react";
import Modal from "./Modal.jsx";
import StarRating from "./StarRating.jsx";

export default function CommentModal({ open, menu, comments, onClose, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  if (!menu) return null;

  const canSubmit = text.trim().length >= 5;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    onSubmit(menu.id, { rating, text: text.trim() });
    setText("");
    setSaved(true);
  };

  return (
    <Modal open={open} title={`Komentar ${menu.name}`} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <span className="text-sm font-medium">Rating kamu</span>
        <div className="mt-2">
          <StarRating value={rating} onChange={setRating} size={26} />
        </div>

        <label htmlFor="comment-text" className="mt-4 block text-sm font-medium">
          Komentar
        </label>
        <textarea
          id="comment-text"
          rows={3}
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setSaved(false);
          }}
          placeholder="Bagikan pengalamanmu tentang menu ini…"
          className="mt-2 w-full resize-none rounded-xl border border-line bg-surface px-3 py-2 text-sm placeholder:text-muted focus:border-brand focus:outline-none"
        />
        <div className="mt-1 flex items-center justify-between gap-2 text-[11px] text-muted">
          <span>Minimal 5 karakter</span>
          <span>{text.trim().length} karakter</span>
        </div>

        {saved && (
          <p role="status" className="mt-2 text-xs text-leaf">
            Komentar tersimpan.
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-4 w-full rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-50"
        >
          Kirim komentar
        </button>
      </form>

      <div className="mt-5 border-t border-line pt-4">
        <h3 className="text-sm font-semibold">Komentar terbaru</h3>
        {comments.length === 0 ? (
          <p className="mt-2 text-sm text-muted">Belum ada komentar untuk menu ini.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {comments.map((comment) => (
              <li key={comment.id} className="rounded-xl bg-surface-3 p-3">
                <div className="flex items-center justify-between gap-2">
                  <StarRating value={comment.rating} readOnly size={12} />
                  <time className="text-[11px] text-muted" dateTime={comment.createdAt}>
                    {new Date(comment.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <p className="mt-2 text-sm leading-relaxed">{comment.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}
