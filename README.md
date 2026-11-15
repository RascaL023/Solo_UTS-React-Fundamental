# WarAs — Warkop Aswan

Aplikasi katalog menu dan transaksi untuk Warkop Aswan. Dibuat sebagai proyek tugas (UTS) dengan React 19, Vite 8, Tailwind CSS v4, dan Lucide React.

> Menu, harga, jam buka, dan foto adalah data contoh untuk tugas—bukan informasi resmi Warkop Aswan.

## Fitur

- **Katalog 15 menu** — 6 Kopi, 3 Non-Kopi, 4 Makanan, dan 2 Snack, lengkap dengan harga, stok, rating, deskripsi, dan foto lokal.
- **Pencarian dan filter** — cari nama/deskripsi, tab Semua/Kopi/Non-Kopi/Makanan/Snack/Favorit dengan jumlah item yang ikut berubah saat mencari, reset filter, dan empty state.
- **Favorit** — simpan atau batalkan lewat ikon hati; tab Favorit punya sortir terbaru dan terlama berdasarkan waktu favorit ditambahkan, serta sortir harga, rating, dan nama.
- **Info dan komentar** — popup info berisi detail menu dan rata-rata ulasan; popup komentar mendukung rating 1–5, komentar minimal 5 karakter, dan daftar komentar terbaru di posisi paling atas.
- **Keranjang dan checkout** — tambah/kurangi/hapus item dengan batas stok, kode promo, pajak 10%, pembayaran Tunai (dengan kembalian) atau QRIS simulasi, lalu struk pesanan.
- **Riwayat dan reset** — riwayat transaksi yang sudah dibayar, total belanja, serta reset in-app yang mengembalikan stok awal dan mengosongkan riwayat/keranjang.
- **Notifikasi dan toast** — lonceng dengan badge jumlah belum dibaca, daftar notifikasi untuk aksi favorit/komentar/keranjang/promo/pesanan/reset, dan toast yang muncul otomatis lalu bisa ditutup. Membuka lonceng menandai semua notifikasi sudah dibaca.
- **Tema terang/gelap** — mengikuti preferensi sistem, bisa diubah manual, dan tetap tersimpan setelah reload.
- **UI responsif** — grid menu 1–4 kolom, tab kategori bisa digeser horizontal, dan dialog/drawer memiliki focus trap, dukungan Escape, serta pengembalian fokus.

Sisa pekerjaan: audit responsif/aksesibilitas dan verifikasi alur akhir.

## Teknologi

- React 19 + React DOM 19
- Vite 8 + `@vitejs/plugin-react`
- Tailwind CSS v4 melalui `@tailwindcss/vite`
- `lucide-react` untuk seluruh ikon
- Maple Mono self-hosted untuk teks
- pnpm sebagai package manager

## Menjalankan

Prasyarat: Node.js 20.19.x atau 22.13+ dan pnpm.

```bash
pnpm install
pnpm dev
```

Vite akan menampilkan alamat lokal, biasanya `http://localhost:5173`.

## Perintah

| Perintah | Fungsi |
| --- | --- |
| `pnpm dev` | Menjalankan dev server dengan HMR |
| `pnpm build` | Membuat build produksi di `dist/` |
| `pnpm preview` | Menjalankan hasil build secara lokal |
| `pnpm lint` | Menjalankan ESLint |

Belum ada script `test` atau `typecheck`. Verifikasi perubahan dengan `pnpm lint && pnpm build`, lalu cek tampilan melalui `pnpm dev`.

## Struktur

```text
public/
├── fonts/maple-mono/     # font self-hosted + lisensi
└── images/               # foto menu + CREDITS.md
src/
├── components/           # header, footer, katalog, kartu, modal, drawer
├── data/menu.js          # 15 menu dengan 8 properti
├── hooks/                # useLocalStorage, useTheme, useNotifications, useLockedOverlay
├── utils/pricing.js      # promo, pajak, format Rupiah
├── App.jsx               # state utama dan komposisi halaman
├── index.css             # Tailwind, token tema, font
└── main.jsx              # entrypoint React
```

## Arsitektur singkat

- `App.jsx` mengoordinasikan state aplikasi (tema, favorit, komentar, stok, keranjang, riwayat) serta notifikasi/toast, lalu meneruskan data dan aksi lewat props.
- `MainContent.jsx` menangani pencarian, filter, sortir, serta modal info dan komentar.
- `src/utils/pricing.js` memusatkan perhitungan subtotal, diskon, pajak, total, dan format Rupiah.
- `useLocalStorage` menangani penyimpanan; data rusak atau storage yang diblokir tidak boleh menghentikan render.

## Data dan aturan transaksi

Setiap menu memiliki properti `id`, `name`, `category`, `price`, `stock`, `image`, `description`, dan `rating`. Data menu statis di `src/data/menu.js`—tidak ada API menu eksternal saat runtime. Semua transaksi disimulasikan di browser; tidak ada backend.

Kode promo yang tersedia:

| Kode | Aturan |
| --- | --- |
| `HEMAT10` | Diskon 10% tanpa minimum |
| `KOPI15` | Diskon 15% untuk item kategori Kopi |
| `UTS25` | Diskon 25%, maksimal Rp25.000, minimum belanja Rp75.000 |

Promo tidak peka huruf besar/kecil, hanya satu kode aktif per transaksi, dan pajak 10% dihitung dari subtotal setelah diskon. Stok berkurang saat pembayaran; jumlah item di keranjang tidak bisa melebihi stok.

Reset transaksi mengembalikan stok ke nilai awal, mengosongkan riwayat dan keranjang, tetapi mempertahankan favorit dan komentar.

## Catatan teknis

- Tailwind v4 tidak memakai `tailwind.config.js`; token warna, font, dan variabel tema dideklarasikan di `src/index.css`.
- State persisten memakai kunci `waras:theme`, `waras:favorites`, `waras:comments`, `waras:stock`, `waras:cart`, `waras:history`, dan `waras:notifications`.
- Ikon wajib dari `lucide-react`; tidak ada Bootstrap/framework CSS lain atau CSS remote.
- Interaksi memakai popup, drawer, toast, atau pesan status inline—bukan `alert`, `prompt`, atau `confirm` bawaan browser.

## Kredit

- Foto menu: [public/images/CREDITS.md](public/images/CREDITS.md). Lisensi mengikuti sumber asli (CC0, CC BY, atau CC BY-SA); foto berlisensi CC BY/CC BY-SA wajib mencantumkan atribusi.
- Font Maple Mono: [public/fonts/maple-mono/LICENSE.txt](public/fonts/maple-mono/LICENSE.txt).
