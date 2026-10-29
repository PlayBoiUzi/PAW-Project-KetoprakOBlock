const ProdukModel = require('../models/produkModel');
const LayananModel = require('../models/layananModel');
const PesananModel = require('../models/pesananModel');
const config = require('../config/config');

const ApiController = {
  // GET /api/status
  status(req, res) {
    res.json({
      status: 'ok',
      aplikasi: config.app.name,
      versi: config.app.version,
      uptime_detik: Math.round(process.uptime()),
      waktu_server: new Date().toISOString(),
      node_version: process.version,
      memori_mb: Math.round(process.memoryUsage().rss / 1024 / 1024),
      total_produk: ProdukModel.getAll().length,
      total_layanan: LayananModel.getAll().length,
      total_pesanan: PesananModel.getAll().length,
    });
  },

  // GET /api/produk
  produk(req, res) {
    res.json(ProdukModel.getAll());
  },

  // GET /api/layanan
  layanan(req, res) {
    res.json(LayananModel.getAll());
  },
};

module.exports = ApiController;
