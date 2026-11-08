const pool = require('../config/db');

const STATUS = ['baru', 'diproses', 'siap', 'selesai'];
const idValid = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

const SELECT_PESANAN = `
  SELECT p.*,
    COALESCE(json_agg(json_build_object(
      'produkId', i.produk_id, 'nama', i.nama, 'harga', i.harga, 'qty', i.qty,
      'pedas', i.pedas, 'tanpaBawang', i.tanpa_bawang, 'subtotal', i.subtotal
    ) ORDER BY i.id) FILTER (WHERE i.id IS NOT NULL), '[]') AS items
  FROM pesanan p
  LEFT JOIN pesanan_item i ON i.pesanan_id = p.id`;

function bentuk(r) {
  return {
    id: r.id,
    kode: 'KOB-' + String(r.id).padStart(3, '0'),
    nama: r.nama,
    meja: r.meja,
    tipe: r.tipe,
    items: r.items,
    total: r.total,
    status: r.status,
    dibuat: new Date(r.dibuat).toISOString(),
  };
}

const PesananModel = {
  STATUS,

  async getAll() {
    const { rows } = await pool.query(`${SELECT_PESANAN} GROUP BY p.id ORDER BY p.id`);
    return rows.map(bentuk);
  },

  async getById(id) {
    if (!idValid(id)) return null;
    const { rows } = await pool.query(`${SELECT_PESANAN} WHERE p.id = $1 GROUP BY p.id`, [id]);
    return rows[0] ? bentuk(rows[0]) : null;
  },

  async count() {
    const { rows } = await pool.query('SELECT COUNT(*)::int AS n FROM pesanan');
    return rows[0].n;
  },

  async create({ nama, meja, tipe, items }) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const total = items.reduce((n, i) => n + i.subtotal, 0);
      const { rows } = await client.query(
        'INSERT INTO pesanan (nama, meja, tipe, total) VALUES ($1,$2,$3,$4) RETURNING id',
        [nama, meja, tipe, total]
      );
      const id = rows[0].id;
      for (const i of items) {
        await client.query(
          `INSERT INTO pesanan_item (pesanan_id, produk_id, nama, harga, qty, pedas, tanpa_bawang, subtotal)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
          [id, i.produkId, i.nama, i.harga, i.qty, i.pedas, i.tanpaBawang, i.subtotal]
        );
      }
      await client.query('COMMIT');
      return this.getById(id);
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  async updateStatus(id, status) {
    if (!idValid(id)) return null;
    const { rowCount } = await pool.query('UPDATE pesanan SET status=$1 WHERE id=$2', [status, id]);
    return rowCount ? this.getById(id) : null;
  },

  async ringkasanHariIni() {
    const [a, b] = await Promise.all([
      pool.query(`
        SELECT COUNT(*)::int AS total_pesanan,
               COALESCE(SUM(total),0)::int AS omzet,
               COUNT(*) FILTER (WHERE status='baru')::int AS baru,
               COUNT(*) FILTER (WHERE status='diproses')::int AS diproses,
               COUNT(*) FILTER (WHERE status='siap')::int AS siap,
               COUNT(*) FILTER (WHERE status='selesai')::int AS selesai
        FROM pesanan WHERE dibuat::date = CURRENT_DATE`),
      pool.query(`
        SELECT COALESCE(SUM(i.qty),0)::int AS total_porsi
        FROM pesanan_item i JOIN pesanan p ON p.id = i.pesanan_id
        WHERE p.dibuat::date = CURRENT_DATE`),
    ]);
    const r = a.rows[0];
    return {
      total_pesanan: r.total_pesanan,
      total_porsi: b.rows[0].total_porsi,
      omzet: r.omzet,
      per_status: { baru: r.baru, diproses: r.diproses, siap: r.siap, selesai: r.selesai },
    };
  },
};

module.exports = PesananModel;