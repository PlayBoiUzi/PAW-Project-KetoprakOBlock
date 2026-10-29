// Daftar layanan Ketoprak O-block (data statis), mengacu ke fitur F-01 s/d F-03 pada PRD.
const layanan = [
  {
    id: 1,
    nama: 'Pemesanan Digital',
    deskripsi: 'Catat pesanan pelanggan lewat form, total harga terhitung otomatis.',
    tautan: '/pesan',
    tersedia: true,
  },
  {
    id: 2,
    nama: 'Antrean Dapur',
    deskripsi: 'Dapur melihat pesanan yang masuk dan mengubah statusnya sampai siap diambil.',
    tautan: '/pesanan',
    tersedia: true,
  },
  {
    id: 3,
    nama: 'Laporan Omzet Harian',
    deskripsi: 'Total penjualan dan jumlah porsi terjual hari ini, tanpa hitung manual.',
    tautan: '/pesanan',
    tersedia: true,
  },
  {
    id: 4,
    nama: 'Kustomisasi Menu',
    deskripsi: 'Pilih level pedas dan tanpa bawang langsung saat memesan.',
    tautan: '/pesan',
    tersedia: true,
  },
  {
    id: 5,
    nama: 'Pre-order Rapat dan Syukuran',
    deskripsi: 'Pesan porsi banyak untuk acara kantor, lengkap dengan nota digital.',
    tautan: null,
    tersedia: false,
  },
];

module.exports = {
  getAll() {
    return layanan;
  },
};
