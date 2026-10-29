const path = require('path');

module.exports = {
  app: {
    name: 'Ketoprak O-block',
    tagline: 'Ketoprak langganan anak kos, sekarang pesan tanpa antre.',
    version: 'v1.0',
    author: 'M Dzaky Rafi Al Aziz',
    nim: '20240140185',
  },
  port: process.env.PORT || 3000,
  logFile: path.join(__dirname, '..', 'logs', 'logger.md'),
};
