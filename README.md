# Ketoprak O-block (PAW Week 7)

Frontend, REST API, dan Middleware Logger menggunakan Express.js, EJS, Tailwind CSS (CDN), dengan pola MVC.
Data produk masih statis (tanpa database).

## Menjalankan

```bash
npm install
npm start        # atau: npm run dev (auto-reload, Node 18+)
```

Buka http://localhost:3000

## Halaman

| URL         | Keterangan                                              |
|-------------|---------------------------------------------------------|
| `/`         | Beranda: layanan, menu, dan status server (EJS)         |
| `/pesan`    | Form pemesanan                                          |
| `/pesanan`  | Antrean dapur dan omzet harian                          |

## Endpoint API

| Method | URL                         | Keterangan                          |
|--------|-----------------------------|-------------------------------------|
| GET    | `/api/status`               | Status server (JSON)                |
| GET    | `/api/produk`               | Daftar produk (array JSON)          |
| GET    | `/api/layanan`              | Daftar layanan (array JSON)         |
| GET    | `/api/pesanan`              | Daftar pesanan (array JSON)         |
| POST   | `/api/pesanan`              | Buat pesanan baru                   |
| PATCH  | `/api/pesanan/:id/status`   | Ubah status: baru, diproses, siap, selesai |

Contoh body `POST /api/pesanan`:

```json
{
  "nama": "Rafi",
  "meja": "4",
  "tipe": "makan_di_tempat",
  "items": [{ "produkId": 1, "qty": 2, "pedas": 3, "tanpaBawang": true }]
}
```

Setiap request dicatat di terminal dan di `logs/logger.md` (method, path, status, timestamp).
Pesanan disimpan di memori (array), jadi hilang saat server dimatikan.

## Struktur

```
config/        konfigurasi aplikasi (port, nama, lokasi log)
models/        data produk (array statis)
middlewares/   logger request
controllers/   logika halaman dan API
routes/        pemetaan URL ke controller
views/         template EJS + partials
utils/         fungsi bantu (format Rupiah)
app.js         entry point
package.json   dependencies dan script
```

## Commit

```
Week7(feat): add status and product API endpoints
Week7(feat): add services, order flow, and server status page
```
