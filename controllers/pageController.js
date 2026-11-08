const ProdukModel = require('../models/produkModel');
const LayananModel = require('../models/layananModel');
const PesananModel = require('../models/pesananModel');
const config = require('../config/config');
const { formatRupiah } = require('../utils/format');

const PageController = {
  async home(req, res) {
    res.render('index', {
      title: 'Beranda',
      halaman: 'beranda',
      app: config.app,
      produk: await ProdukModel.getAll(),
      layanan: LayananModel.getAll(),
      formatRupiah,
    });
  },

  async pesan(req, res) {
    const semua = await ProdukModel.getAll();
    res.render('pesan', {
      title: 'Buat Pesanan',
      halaman: 'pesan',
      app: config.app,
      produk: semua.filter((p) => p.tersedia),
      formatRupiah,
    });
  },

  async antrean(req, res) {
    res.render('pesanan', {
      title: 'Antrean Dapur',
      halaman: 'pesanan',
      app: config.app,
      pesanan: (await PesananModel.getAll()).reverse(),
      ringkasan: await PesananModel.ringkasanHariIni(),
      formatRupiah,
    });
  },

  async produk(req, res) {
    res.render('produk', {
      title: 'Kelola Produk',
      halaman: 'produk',
      app: config.app,
      produk: await ProdukModel.getAll(),
      formatRupiah,
    });
  },

  notFound(req, res) {
    res.status(404).render('404', { title: 'Halaman tidak ditemukan', halaman: '', app: config.app });
  },
};

module.exports = PageController;