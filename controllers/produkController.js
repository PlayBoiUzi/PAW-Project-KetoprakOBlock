const ProdukModel = require('../models/produkModel');

const KATEGORI = ['Makanan', 'Tambahan', 'Minuman', 'Pre-order'];

// Validasi body, kembalikan { errors, data }
function validasi(body = {}) {
  const errors = [];
  const nama = String(body.nama || '').trim();
  const kategori = String(body.kategori || '').trim();
  const harga = Number(body.harga);

  let kustomisasi = body.kustomisasi || [];
  if (typeof kustomisasi === 'string') kustomisasi = kustomisasi.split(',');
  kustomisasi = Array.isArray(kustomisasi)
    ? kustomisasi.map((k) => String(k).trim()).filter(Boolean)
    : [];

  if (!nama) errors.push('Nama produk wajib diisi.');
  if (!KATEGORI.includes(kategori)) errors.push('Kategori harus salah satu dari: ' + KATEGORI.join(', '));
  if (!Number.isInteger(harga) || harga < 0) errors.push('Harga harus bilangan bulat >= 0.');

  return {
    errors,
    data: {
      nama, kategori, harga,
      deskripsi: String(body.deskripsi || '').trim(),
      kustomisasi,
      tersedia: body.tersedia === undefined ? true : Boolean(body.tersedia),
    },
  };
}

const ProdukController = {
  // GET /api/produk
  async list(req, res) {
    res.json(await ProdukModel.getAll());
  },

  // GET /api/produk/:id
  async detail(req, res) {
    const produk = await ProdukModel.getById(req.params.id);
    if (!produk) return res.status(404).json({ status: 'error', pesan: ['Produk tidak ditemukan.'] });
    res.json(produk);
  },

  // POST /api/produk
  async create(req, res) {
    const { errors, data } = validasi(req.body);
    if (errors.length) return res.status(400).json({ status: 'error', pesan: errors });
    const baru = await ProdukModel.create(data);
    res.status(201).json({ status: 'ok', data: baru });
  },

  // PUT /api/produk/:id
  async update(req, res) {
    const { errors, data } = validasi(req.body);
    if (errors.length) return res.status(400).json({ status: 'error', pesan: errors });
    const produk = await ProdukModel.update(req.params.id, data);
    if (!produk) return res.status(404).json({ status: 'error', pesan: ['Produk tidak ditemukan.'] });
    res.json({ status: 'ok', data: produk });
  },

  // DELETE /api/produk/:id
  async remove(req, res) {
    const ok = await ProdukModel.remove(req.params.id);
    if (!ok) return res.status(404).json({ status: 'error', pesan: ['Produk tidak ditemukan.'] });
    res.json({ status: 'ok', pesan: 'Produk berhasil dihapus.' });
  },
};

module.exports = ProdukController;