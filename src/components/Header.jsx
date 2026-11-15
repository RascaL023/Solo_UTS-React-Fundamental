import { Clock, Coffee } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <a href="#atas" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-brand-soft text-brand-strong">
            <Coffee size={20} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-bold leading-none tracking-tight sm:text-lg">
              WarAs
            </span>
            <span className="mt-1 block text-[11px] uppercase tracking-[0.18em] text-muted">
              Warkop Aswan
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-line px-3 py-2 text-xs text-muted sm:inline-flex">
            <Clock size={14} className="text-brand" aria-hidden="true" />
            08.00–22.00
          </span>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
