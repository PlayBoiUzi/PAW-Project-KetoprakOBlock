const express = require('express');
const path = require('path');

const config = require('./config/config');
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

// Parser body JSON dan form (untuk POST/PATCH)
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

app.listen(config.port, () => {
  console.log(`${config.app.name} berjalan di http://localhost:${config.port}`);
});
