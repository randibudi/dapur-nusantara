# Dapur Nusantara

Website pemesanan paket makan restoran fiktif "Dapur Nusantara" — dibuat sebagai SPA (Single Page Application) full client-side tanpa backend.

---

## Tentang Proyek

Restoran Dapur Nusantara menawarkan dua model pemesanan:

- **Makan Sepuasnya** — prasmanan per orang, langsung booking via modal (pilih jumlah tamu, tanggal, waktu)
- **Paket Rame & Tambahan** — set menu untuk keluarga/acara, bisa campur-pilih lewat keranjang

Kedua alur berakhir dengan konfirmasi pesanan yang bisa disimpan langsung ke WhatsApp.

---

## Fitur

- Dua alur pemesanan yang terpisah dan jelas
- Kalkulasi harga real-time: subtotal + PPN 11% + biaya layanan 5%
- Filter slot waktu yang sudah lewat (berbasis waktu lokal / WIB-safe)
- Keranjang persisten via `localStorage` — tidak hilang saat refresh
- Validasi form: nomor HP Indonesia, field wajib
- Konfirmasi pesanan + simpan ringkasan ke WhatsApp
- Toast notifikasi saat item ditambahkan ke keranjang
- Tampilan "Sudah Penuh" untuk paket yang tidak tersedia
- Social proof: jumlah pemesanan per paket
- Responsif mobile-first

---

## Tech Stack

| Kategori     | Library                        |
| ------------ | ------------------------------ |
| UI Framework | React 19 + TypeScript          |
| Build Tool   | Vite 8                         |
| Styling      | Tailwind CSS v4 + shadcn/ui    |
| State        | useReducer + Context API       |
| Toast        | Sonner                         |
| Icons        | Lucide React                   |
| Testing      | Vitest + React Testing Library |

---

## Prasyarat

Gunakan Node.js **v24** (lihat `.nvmrc`).

```bash
# Jika menggunakan nvm
nvm use
```

---

## Setup & Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser.

---

## Scripts

| Command            | Keterangan                  |
| ------------------ | --------------------------- |
| `npm run dev`      | Development server          |
| `npm run build`    | Build untuk production      |
| `npm run lint`     | Cek kode dengan ESLint      |
| `npm run format`   | Format kode dengan Prettier |
| `npm run test:run` | Jalankan semua unit test    |

---

## Struktur Proyek

```
src/
├── components/       # Semua komponen UI
├── context/          # CartContext — state keranjang global
├── data/             # Data paket, tambahan, dan ulasan (hardcode)
├── test/             # Unit test
├── types/            # TypeScript interfaces
└── utils/            # Helper: format harga, kalkulasi, waktu, WhatsApp
```

---

## Catatan Teknis

- **Tidak ada backend** — semua client-side. Konfirmasi pesanan dikirim via WhatsApp (`wa.me`).
- **Order ID** dibuat random di sisi klien (`#AYCE-xxxxx` / `#PKT-xxxxx`) sebagai referensi user.
- **Alur WhatsApp**: nomor HP dikonversi ke format internasional (`08xx` → `628xx`), lalu dibuka via `window.open`.
