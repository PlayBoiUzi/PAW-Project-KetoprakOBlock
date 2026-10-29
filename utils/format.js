// Format angka ke Rupiah, contoh: 18000 -> "Rp 18.000"
function formatRupiah(angka) {
  return 'Rp ' + Number(angka).toLocaleString('id-ID');
}

module.exports = { formatRupiah };
