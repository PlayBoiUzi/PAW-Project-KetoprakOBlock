const express = require('express');
const path = require('path');

const config = require('./config/config');
const pool = require('./config/db');
const logger = require('./middlewares/logger');
const pageRoutes = require('./routes/pageRoutes');
const apiRoutes = require('./routes/apiRoutes');
const PageController = require('./controllers/pageController');

const app = express();

// View engine: EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware logger dipasang paling awal supaya semua request tercatat.
app.use(logger);

// Parser body JSON dan form (untuk POST/PUT/PATCH)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', pageRoutes);
app.use('/api', apiRoutes);

// 404 untuk path yang tidak dikenal
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ status: 'error', pesan: 'Endpoint tidak ditemukan' });
  }
  PageController.notFound(req, res);
});

// Error handler (menangkap error dari database dan async controller)
app.use((err, req, res, next) => {
  console.error(err);
  if (req.originalUrl.startsWith('/api')) {
    return res.status(500).json({ status: 'error', pesan: ['Terjadi kesalahan pada server.'] });
  }
  res.status(500).send('Terjadi kesalahan pada server.');
});

app.listen(config.port, async () => {
  console.log(`${config.app.name} berjalan di http://localhost:${config.port}`);
  try {
    await pool.query('SELECT 1');
    console.log('Database PostgreSQL terhubung.');
  } catch (err) {
    console.error('Database GAGAL terhubung:', err.message);
  }
});