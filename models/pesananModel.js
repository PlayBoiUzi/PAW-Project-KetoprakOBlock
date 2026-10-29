// Penyimpanan pesanan di memori (array statis, tanpa database).
// Data hilang saat server dimatikan, sesuai ketentuan tugas Week 7.
const pesanan = [];
let counter = 0;

const STATUS = ['baru', 'diproses', 'siap', 'selesai'];

const PesananModel = {
  STATUS,

  getAll() {
    return pesanan;
  },

  getById(id) {
    return pesanan.find((p) => p.id === Number(id)) || null;
  },

  create({ nama, meja, tipe, items }) {
    counter += 1;
    const total = items.reduce((jumlah, i) => jumlah + i.subtotal, 0);
    const baru = {
      id: counter,
      kode: 'KOB-' + String(counter).padStart(3, '0'),
      nama,
      meja,
      tipe,
      items,
      total,
      status: 'baru',
      dibuat: new Date().toISOString(),
    };
    pesanan.push(baru);
    return baru;
  },

  updateStatus(id, status) {
    const p = this.getById(id);
    if (!p) return null;
    p.status = status;
    return p;
  },

  // Ringkasan pesanan hari ini: jumlah pesanan, porsi terjual, omzet.
  ringkasanHariIni() {
    const hariIni = new Date().toDateString();
    const list = pesanan.filter((p) => new Date(p.dibuat).toDateString() === hariIni);
    return {
      total_pesanan: list.length,
      total_porsi: list.reduce((n, p) => n + p.items.reduce((m, i) => m + i.qty, 0), 0),
      omzet: list.reduce((n, p) => n + p.total, 0),
      per_status: STATUS.reduce((o, s) => {
        o[s] = list.filter((p) => p.status === s).length;
        return o;
      }, {}),
    };
  },
};

module.exports = PesananModel;
