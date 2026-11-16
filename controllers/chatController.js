const GeminiService = require('../services/geminiService');

const ChatController = {
  // POST /api/chat
  async kirim(req, res) {
    try {
      const hasil = await GeminiService.jawab(req.chatMessage);
      res.json({ success: true, data: { reply: hasil.reply, ditolak: hasil.ditolak } });
    } catch (err) {
      console.error('Gemini error:', err.message);

      let status = 502;
      let pesan = 'Layanan AI sedang tidak tersedia, coba lagi nanti.';

      if (err.status === 429) {
        status = 429;
        pesan = 'Kuota AI sedang penuh, coba lagi sebentar lagi.';
      } else if (err.status === 503) {
        status = 503;
        pesan = 'Server AI sedang ramai, coba kirim ulang beberapa saat lagi.';
      }

      res.status(status).json({ success: false, error: pesan });
    }
  },
};

module.exports = ChatController;