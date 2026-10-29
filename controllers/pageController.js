const ProdukModel = require('../models/produkModel');
const LayananModel = require('../models/layananModel');
const PesananModel = require('../models/pesananModel');
const config = require('../config/config');
const { formatRupiah } = require('../utils/format');

const PageController = {
  home(req, res) {
    res.render('index', {
      title: 'Beranda',
      halaman: 'beranda',
      app: config.app,
      produk: ProdukModel.getAll(),
      layanan: LayananModel.getAll(),
      formatRupiah,
    });
  },

  pesan(req, res) {
    res.render('pesan', {
      title: 'Buat Pesanan',
      halaman: 'pesan',
      app: config.app,
      produk: ProdukModel.getAll().filter((p) => p.tersedia),
      formatRupiah,
    });
  },

  antrean(req, res) {
    res.render('pesanan', {
      title: 'Antrean Dapur',
      halaman: 'pesanan',
      app: config.app,
      pesanan: PesananModel.getAll().slice().reverse(),
      ringkasan: PesananModel.ringkasanHariIni(),
      formatRupiah,
    });
  },

  notFound(req, res) {
    res.status(404).render('404', { title: 'Halaman tidak ditemukan', halaman: '', app: config.app });
  },
};

module.exports = PageController;
