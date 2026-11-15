import { useMemo, useState } from "react";
import { ArrowRight, Search, Sparkles, Star, X } from "lucide-react";
import CategoryTabs from "./CategoryTabs.jsx";
import EmptyState from "./EmptyState.jsx";
import MenuCard from "./MenuCard.jsx";

const ALL_CATEGORY = "Semua";
const CATEGORIES = ["Kopi", "Non-Kopi", "Makanan", "Snack"];

function matchesQuery(menu, searchTerm) {
  if (!searchTerm) return true;

  return (
    menu.name.toLowerCase().includes(searchTerm) ||
    menu.description.toLowerCase().includes(searchTerm)
  );
}

export default function MainContent({ menus }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const searchTerm = query.trim().toLowerCase();

  const averageRating =
    menus.reduce((total, menu) => total + menu.rating, 0) / menus.length;
  const categoryCount = new Set(menus.map((menu) => menu.category)).size;

  const filteredMenus = useMemo(
    () =>
      menus.filter(
        (menu) =>
          (activeCategory === ALL_CATEGORY || menu.category === activeCategory) &&
          matchesQuery(menu, searchTerm),
      ),
    [menus, activeCategory, searchTerm],
  );

  const tabs = useMemo(() => {
    const searchedMenus = menus.filter((menu) => matchesQuery(menu, searchTerm));

    return [
      { label: ALL_CATEGORY, count: searchedMenus.length },
      ...CATEGORIES.map((category) => ({
        label: category,
        count: searchedMenus.filter((menu) => menu.category === category).length,
      })),
    ];
  }, [menus, searchTerm]);

  const hasActiveFilter = activeCategory !== ALL_CATEGORY || searchTerm !== "";

  const resetFilters = () => {
    setQuery("");
    setActiveCategory(ALL_CATEGORY);
  };

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

        <div className="mt-6 rounded-2xl border border-line bg-surface-2 p-3 sm:p-4">
          <label htmlFor="menu-search" className="sr-only">
            Cari menu
          </label>
          <div className="relative">
            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") setQuery("");
              }}
              placeholder="Cari kopi, makanan, atau camilan…"
              className="w-full rounded-xl border border-line bg-surface py-3 pl-10 pr-11 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query !== "" && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Hapus pencarian"
                className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted transition hover:bg-surface-3 hover:text-ink"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="mt-3">
            <CategoryTabs
              tabs={tabs}
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p role="status" aria-live="polite" className="text-sm text-muted">
            Menampilkan <span className="font-semibold text-ink">{filteredMenus.length}</span>{" "}
            dari {menus.length} menu
            {activeCategory !== ALL_CATEGORY ? ` · ${activeCategory}` : ""}
            {searchTerm !== "" ? ` · “${query.trim()}”` : ""}
          </p>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition hover:border-brand hover:text-brand-strong"
            >
              Reset filter
            </button>
          )}
        </div>

        {filteredMenus.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMenus.map((menu) => (
              <MenuCard key={menu.id} menu={menu} />
            ))}
          </div>
        ) : (
          <EmptyState query={query.trim()} onReset={resetFilters} />
        )}
      </section>
    </main>
  );
}
