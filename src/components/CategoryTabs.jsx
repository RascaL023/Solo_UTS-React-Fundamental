export default function CategoryTabs({ tabs, activeCategory, onChange }) {
  return (
    <div
      role="group"
      aria-label="Filter kategori menu"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
    >
      {tabs.map(({ label, count }) => {
        const isActive = label === activeCategory;

        return (
          <button
            key={label}
            type="button"
            onClick={() => onChange(label)}
            aria-pressed={isActive}
            className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
              isActive
                ? "border-brand bg-brand text-white"
                : "border-line bg-surface-2 text-ink hover:border-brand hover:text-brand-strong"
            }`}
          >
            {label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[11px] ${
                isActive ? "bg-white/20 text-white" : "bg-surface-3 text-muted"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
