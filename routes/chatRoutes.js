const express = require('express');
const ChatController = require('../controllers/chatController');
const validateChatInput = require('../middlewares/validateChatInput');

const router = express.Router();

router.post('/', validateChatInput, ChatController.kirim);

module.exports = router;