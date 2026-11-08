const express = require('express');
const ApiController = require('../controllers/apiController');
const ProdukController = require('../controllers/produkController');
const PesananController = require('../controllers/pesananController');
const wrap = require('../utils/asyncHandler');

const router = express.Router();

router.get('/status', wrap(ApiController.status));
router.get('/layanan', ApiController.layanan);

router.get('/produk', wrap(ProdukController.list));
router.get('/produk/:id', wrap(ProdukController.detail));
router.post('/produk', wrap(ProdukController.create));
router.put('/produk/:id', wrap(ProdukController.update));
router.delete('/produk/:id', wrap(ProdukController.remove));

router.get('/pesanan', wrap(PesananController.list));
router.post('/pesanan', wrap(PesananController.create));
router.patch('/pesanan/:id/status', wrap(PesananController.updateStatus));

module.exports = router;