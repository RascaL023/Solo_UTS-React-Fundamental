import { SearchX } from "lucide-react";

export default function EmptyState({ title, message, actionLabel = "Reset filter", onReset }) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-line bg-surface-2 px-6 py-16 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand-strong">
        <SearchX size={20} aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-muted">{message}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-strong"
      >
        {actionLabel}
      </button>
    </div>
  );
}
