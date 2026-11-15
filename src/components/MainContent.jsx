import { ArrowRight, Sparkles, Star } from "lucide-react";
import MenuCard from "./MenuCard.jsx";

export default function MainContent({ menus }) {
  const averageRating =
    menus.reduce((total, menu) => total + menu.rating, 0) / menus.length;
  const categoryCount = new Set(menus.map((menu) => menu.category)).size;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
      <section className="relative mt-6 overflow-hidden rounded-3xl border border-line bg-surface-2 px-6 py-12 sm:px-10 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand-soft blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-leaf-soft blur-3xl"
        />

        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
            <Sparkles size={14} className="text-brand" aria-hidden="true" />
            Warkop Aswan · Yogyakarta
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Ngopi santai,
            <span className="block text-brand-strong">harga bersahabat.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Kopi seduhan harian, minuman non-kopi, dan camilan hangat untuk menemani obrolan
            sore di warkop.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-strong"
            >
              Lihat menu
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <span className="text-xs text-muted">
              {menus.length} menu · {categoryCount} kategori
            </span>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">Menu</dt>
              <dd className="mt-1 text-lg font-semibold">{menus.length}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">Kategori</dt>
              <dd className="mt-1 text-lg font-semibold">{categoryCount}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">Rating</dt>
              <dd className="mt-1 inline-flex items-center gap-1 text-lg font-semibold">
                <Star size={14} className="fill-brand text-brand" aria-hidden="true" />
                {averageRating.toFixed(1)}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="menu" className="scroll-mt-24 pt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Menu hari ini</h2>
            <p className="mt-1 text-sm text-muted">
              Pilihan kopi, non-kopi, makanan, dan camilan dari dapur WarAs.
            </p>
          </div>
          <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
            {menus.length} menu
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {menus.map((menu) => (
            <MenuCard key={menu.id} menu={menu} />
          ))}
        </div>
      </section>
    </main>
  );
}
