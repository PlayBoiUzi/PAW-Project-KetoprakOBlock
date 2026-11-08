const pool = require('../config/db');

const idValid = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

const ProdukModel = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM produk ORDER BY id');
    return rows;
  },

  async getById(id) {
    if (!idValid(id)) return null;
    const { rows } = await pool.query('SELECT * FROM produk WHERE id = $1', [id]);
    return rows[0] || null;
  },

  async count() {
    const { rows } = await pool.query('SELECT COUNT(*)::int AS n FROM produk');
    return rows[0].n;
  },

  async create({ nama, kategori, harga, deskripsi, kustomisasi, tersedia }) {
    const { rows } = await pool.query(
      `INSERT INTO produk (nama, kategori, harga, deskripsi, kustomisasi, tersedia)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nama, kategori, harga, deskripsi, kustomisasi, tersedia]
    );
    return rows[0];
  },

  async update(id, { nama, kategori, harga, deskripsi, kustomisasi, tersedia }) {
    if (!idValid(id)) return null;
    const { rows } = await pool.query(
      `UPDATE produk SET nama=$1, kategori=$2, harga=$3, deskripsi=$4, kustomisasi=$5, tersedia=$6
       WHERE id=$7 RETURNING *`,
      [nama, kategori, harga, deskripsi, kustomisasi, tersedia, id]
    );
    return rows[0] || null;
  },

  async remove(id) {
    if (!idValid(id)) return false;
    const { rowCount } = await pool.query('DELETE FROM produk WHERE id = $1', [id]);
    return rowCount > 0;
  },
};

module.exports = ProdukModel;