const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config.db);
pool.on('error', (err) => console.error('Error koneksi database:', err.message));

module.exports = pool;