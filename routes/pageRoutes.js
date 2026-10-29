const express = require('express');
const PageController = require('../controllers/pageController');

const router = express.Router();

router.get('/', PageController.home);
router.get('/pesan', PageController.pesan);
router.get('/pesanan', PageController.antrean);

module.exports = router;
