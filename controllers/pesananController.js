const ProdukModel = require('../models/produkModel');
const PesananModel = require('../models/pesananModel');

const TIPE = ['makan_di_tempat', 'bawa_pulang'];

const PesananController = {
  // GET /api/pesanan
  list(req, res) {
    res.json(PesananModel.getAll());
  },

  // POST /api/pesanan
  create(req, res) {
    const { nama, meja, tipe, items } = req.body || {};
    const errors = [];

    if (!nama || !String(nama).trim()) errors.push('Nama pelanggan wajib diisi.');
    if (tipe && !TIPE.includes(tipe)) errors.push('Tipe pesanan tidak valid.');
    if (!Array.isArray(items) || items.length === 0) errors.push('Pilih minimal satu menu.');

    const baris = [];
    if (Array.isArray(items)) {
      items.forEach((item) => {
        const produk = ProdukModel.getById(item.produkId);
        const qty = Number(item.qty);
        if (!produk) return errors.push(`Menu dengan id ${item.produkId} tidak ditemukan.`);
        if (!produk.tersedia) return errors.push(`${produk.nama} belum tersedia.`);
        if (!Number.isInteger(qty) || qty < 1 || qty > 20) {
          return errors.push(`Jumlah ${produk.nama} harus 1 sampai 20.`);
        }
        const pedas = produk.kategori === 'Makanan' ? Number(item.pedas || 0) : 0;
        if (!Number.isInteger(pedas) || pedas < 0 || pedas > 5) {
          return errors.push(`Level pedas ${produk.nama} harus 0 sampai 5.`);
        }
        baris.push({
          produkId: produk.id,
          nama: produk.nama,
          harga: produk.harga,
          qty,
          pedas,
          tanpaBawang: produk.kategori === 'Makanan' && Boolean(item.tanpaBawang),
          subtotal: produk.harga * qty,
        });
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({ status: 'error', pesan: errors });
    }

    const pesanan = PesananModel.create({
      nama: String(nama).trim(),
      meja: meja ? String(meja).trim() : '',
      tipe: tipe || 'makan_di_tempat',
      items: baris,
    });
    res.status(201).json({ status: 'ok', data: pesanan });
  },

  // PATCH /api/pesanan/:id/status
  updateStatus(req, res) {
    const { status } = req.body || {};
    if (!PesananModel.STATUS.includes(status)) {
      return res.status(400).json({
        status: 'error',
        pesan: ['Status harus salah satu dari: ' + PesananModel.STATUS.join(', ')],
      });
    }
    const pesanan = PesananModel.updateStatus(req.params.id, status);
    if (!pesanan) {
      return res.status(404).json({ status: 'error', pesan: ['Pesanan tidak ditemukan.'] });
    }
    res.json({ status: 'ok', data: pesanan });
  },
};

module.exports = PesananController;
