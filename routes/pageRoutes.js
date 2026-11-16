const express = require('express');
const PageController = require('../controllers/pageController');
const wrap = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', wrap(PageController.home));
router.get('/pesan', wrap(PageController.pesan));
router.get('/pesanan', wrap(PageController.antrean));
router.get('/produk', wrap(PageController.produk));
router.get('/chat', PageController.chat);

module.exports = router;