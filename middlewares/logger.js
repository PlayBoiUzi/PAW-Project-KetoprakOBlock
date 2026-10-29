const fs = require('fs');
const path = require('path');
const config = require('../config/config');

// Pastikan folder dan header file log ada.
fs.mkdirSync(path.dirname(config.logFile), { recursive: true });
if (!fs.existsSync(config.logFile)) {
  fs.writeFileSync(
    config.logFile,
    '# Request Log\n\n| Waktu | Method | Path | Status | Durasi |\n|---|---|---|---|---|\n'
  );
}

// Mencatat method, path, status response, dan timestamp tiap request.
// Dicatat saat response selesai ('finish') supaya status HTTP sudah final.
function logger(req, res, next) {
  const mulai = Date.now();

  res.on('finish', () => {
    const waktu = new Date().toISOString();
    const durasi = Date.now() - mulai;
    const { method, originalUrl } = req;
    const status = res.statusCode;

    console.log(`[${waktu}] ${method} ${originalUrl} ${status} ${durasi}ms`);
    fs.appendFile(
      config.logFile,
      `| ${waktu} | ${method} | ${originalUrl} | ${status} | ${durasi}ms |\n`,
      (err) => {
        if (err) console.error('Gagal menulis log:', err.message);
      }
    );
  });

  next();
}

module.exports = logger;
