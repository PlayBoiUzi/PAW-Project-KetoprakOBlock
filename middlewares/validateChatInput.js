const MAKS_PANJANG = 500;

module.exports = (req, res, next) => {
  const { message } = req.body || {};

  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ success: false, error: 'Pesan tidak boleh kosong.' });
  }
  if (message.trim().length > MAKS_PANJANG) {
    return res.status(400).json({ success: false, error: `Pesan maksimal ${MAKS_PANJANG} karakter.` });
  }

  req.chatMessage = message.trim();
  next();
};