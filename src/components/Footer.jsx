import { Clock, Coffee, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface-2">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <Coffee size={18} className="text-brand" aria-hidden="true" />
            WarAs
          </div>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            Warkop Aswan: tempat singgah untuk kopi, camilan, dan cerita.
          </p>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Kunjungi
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
              <span>Salatiga, Indonesia</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
              <span>Setiap hari, 08.00–22.00</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Catatan
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Menu, harga, dan jam buka adalah data contoh untuk tugas, bukan informasi resmi.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-muted sm:px-6 lg:px-8">
          © {new Date().getFullYear()} WarAs · Warkop Aswan
        </p>
      </div>
    </footer>
  );
}
