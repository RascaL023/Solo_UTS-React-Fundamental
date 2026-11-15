import { Star } from "lucide-react";

export default function MenuCard({ menu }) {
  const isLowStock = menu.stock <= 10;

  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden bg-surface-3">
        <img
          src={menu.image}
          alt={menu.name}
          loading="lazy"
          width="800"
          height="600"
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
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

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-base font-semibold text-brand-strong">
            Rp{menu.price.toLocaleString("id-ID")}
          </span>
          <span
            className={`rounded-full px-2 py-1 text-[11px] font-medium ${
              isLowStock ? "bg-brand-soft text-brand-strong" : "bg-leaf-soft text-leaf"
            }`}
          >
            Sisa {menu.stock}
          </span>
        </div>
      </div>
    </article>
  );
}
