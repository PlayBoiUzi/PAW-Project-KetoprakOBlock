// Data produk statis (tanpa database) sesuai ketentuan tugas Week 7.
// Opsi kustomisasi mengacu ke US-03 pada PRD (tingkat pedas, tanpa bawang, jenis kerupuk).
const produk = [
  {
    id: 1,
    nama: 'Ketoprak Spesial',
    kategori: 'Makanan',
    harga: 18000,
    deskripsi: 'Lontong, tahu, bihun, tauge, telur, dan bumbu kacang kental.',
    kustomisasi: ['Level pedas 0-5', 'Tanpa bawang', 'Tanpa tauge'],
    tersedia: true,
  },
  {
    id: 2,
    nama: 'Ketoprak Biasa',
    kategori: 'Makanan',
    harga: 13000,
    deskripsi: 'Versi hemat: lontong, tahu, bihun, tauge, dan bumbu kacang.',
    kustomisasi: ['Level pedas 0-5', 'Tanpa bawang'],
    tersedia: true,
  },
  {
    id: 3,
    nama: 'Ketoprak Telur Dobel',
    kategori: 'Makanan',
    harga: 21000,
    deskripsi: 'Ketoprak dengan dua telur, buat yang lapar berat.',
    kustomisasi: ['Level pedas 0-5', 'Tanpa bawang'],
    tersedia: true,
  },
  {
    id: 4,
    nama: 'Kerupuk Aci',
    kategori: 'Tambahan',
    harga: 2000,
    deskripsi: 'Kerupuk pendamping, pilih kerupuk aci atau kerupuk udang.',
    kustomisasi: ['Jenis: aci / udang'],
    tersedia: true,
  },
  {
    id: 5,
    nama: 'Es Teh Manis',
    kategori: 'Minuman',
    harga: 5000,
    deskripsi: 'Teh dingin, manisnya bisa diatur.',
    kustomisasi: ['Gula normal / sedikit'],
    tersedia: true,
  },
  {
    id: 6,
    nama: 'Paket Rapat 10 Porsi',
    kategori: 'Pre-order',
    harga: 170000,
    deskripsi: 'Pre-order untuk konsumsi rapat atau syukuran, nota digital disertakan.',
    kustomisasi: ['Jadwal pengambilan'],
    tersedia: false,
  },
];

const ProdukModel = {
  getAll() {
    return produk;
  },
  getById(id) {
    return produk.find((p) => p.id === Number(id)) || null;
  },
};

module.exports = ProdukModel;
