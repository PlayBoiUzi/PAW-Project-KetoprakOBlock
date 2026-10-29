const express = require('express');
const ApiController = require('../controllers/apiController');
const PesananController = require('../controllers/pesananController');

const router = express.Router();

router.get('/status', ApiController.status);
router.get('/produk', ApiController.produk);
router.get('/layanan', ApiController.layanan);

router.get('/pesanan', PesananController.list);
router.post('/pesanan', PesananController.create);
router.patch('/pesanan/:id/status', PesananController.updateStatus);

module.exports = router;
