<script setup>
import { ref, computed } from "vue";

// ==========================================
// STATE: REPORT CATEGORY & FILTERS
// ==========================================
const selectedCategory = ref("penduduk"); // 'penduduk' | 'keluarga' | 'pelayanan' | 'kualitas' | 'pengaduan' | 'pembangunan'

const selectedYear = ref("2024");
const selectedPeriod = ref("Semua Bulan");
const selectedDusun = ref("all");
const selectedRW = ref("all");
const selectedRT = ref("all");

// Toast Notification
const toastMessage = ref("");
const showToast = ref(false);
const triggerToast = (msg) => {
  toastMessage.value = msg;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// Filter Apply Animation / State
const isApplyingFilter = ref(false);
const applyFilter = () => {
  isApplyingFilter.value = true;
  setTimeout(() => {
    isApplyingFilter.value = false;
    triggerToast(`Filter ${selectedCategoryData.value.title} tahun ${selectedYear.value} berhasil diterapkan.`);
  }, 350);
};

// ==========================================
// CATEGORIES CONFIGURATION (Bento Grid)
// ==========================================
const categories = [
  { id: "penduduk", label: "Penduduk", icon: "groups" },
  { id: "keluarga", label: "Keluarga", icon: "family_restroom" },
  { id: "pelayanan", label: "Pelayanan", icon: "receipt_long" },
  { id: "kualitas", label: "Data Kualitas", icon: "verified" },
  { id: "pengaduan", label: "Pengaduan", icon: "report_problem" },
  { id: "pembangunan", label: "Pembangunan", icon: "construction" },
];

// ==========================================
// REPORT DATASETS (BY CATEGORY)
// ==========================================
const reportDatasets = {
  penduduk: {
    title: "Laporan Demografi Penduduk",
    shortTitle: "Penduduk",
    subtitle: "Pemerintah Desa Cimenyan - Rekapitulasi Kependudukan",
    stats: [
      { label: "Total Penduduk", value: "12,450", change: "+2.4%", trendIcon: "trending_up", highlight: true },
      { label: "Laki-laki", value: "6,210", change: "49.8%", trendIcon: null, highlight: false },
      { label: "Perempuan", value: "6,240", change: "50.2%", trendIcon: null, highlight: false },
      { label: "Kepadatan", value: "450", change: "jiwa/km²", trendIcon: null, highlight: false },
    ],
    chartTitle: "Distribusi Usia Penduduk",
    chartYMax: "3k",
    chartData: [
      { label: "0-14", value: 600, height: "20%", display: "600" },
      { label: "15-24", value: 1350, height: "45%", display: "1,350" },
      { label: "25-34", value: 2400, height: "80%", display: "2,400" },
      { label: "35-44", value: 2850, height: "95%", display: "2,850" },
      { label: "45-54", value: 1800, height: "60%", display: "1,800" },
      { label: "55+", value: 900, height: "30%", display: "900" },
    ],
    tableHeaders: ["Dusun", "Laki-laki", "Perempuan", "Total KK", "Total Jiwa"],
    rows: [
      { col1: "Dusun I Sukamaju", col2: "2,100", col3: "2,150", col4: "1,200", total: "4,250" },
      { col1: "Dusun II Cibodas", col2: "1,850", col3: "1,820", col4: "950", total: "3,670" },
      { col1: "Dusun III Puncak", col2: "2,260", col3: "2,270", col4: "1,400", total: "4,530" },
    ],
    summaryTotal: { col1: "Total Keseluruhan", col2: "6,210", col3: "6,240", col4: "3,550", total: "12,450" }
  },
  keluarga: {
    title: "Laporan Profil Kartu Keluarga",
    shortTitle: "Keluarga",
    subtitle: "Pemerintah Desa Cimenyan - Rekapitulasi Kepala Keluarga & Status Kesejahteraan",
    stats: [
      { label: "Total Kepala Keluarga", value: "3,550", change: "+1.8%", trendIcon: "trending_up", highlight: true },
      { label: "KK Laki-laki", value: "3,015", change: "84.9%", trendIcon: null, highlight: false },
      { label: "KK Perempuan (KWT)", value: "535", change: "15.1%", trendIcon: null, highlight: false },
      { label: "Rata-rata Jiwa/KK", value: "3.5", change: "jiwa", trendIcon: null, highlight: false },
    ],
    chartTitle: "Kategori Kesejahteraan Keluarga (DTKS)",
    chartYMax: "1.5k",
    chartData: [
      { label: "Desil 1 (Sgt Miskin)", value: 240, height: "25%", display: "240" },
      { label: "Desil 2 (Miskin)", value: 480, height: "45%", display: "480" },
      { label: "Desil 3 (Hampir Miskin)", value: 710, height: "65%", display: "710" },
      { label: "Desil 4 (Rentan)", value: 920, height: "82%", display: "920" },
      { label: "Non DTKS (Mampu)", value: 1200, height: "98%", display: "1,200" },
    ],
    tableHeaders: ["Dusun", "KK Pra-Sejahtera", "KK Sejahtera", "Penerima Bansos", "Total KK"],
    rows: [
      { col1: "Dusun I Sukamaju", col2: "280", col3: "920", col4: "310", total: "1,200" },
      { col1: "Dusun II Cibodas", col2: "220", col3: "730", col4: "245", total: "950" },
      { col1: "Dusun III Puncak", col2: "310", col3: "1,090", col4: "340", total: "1,400" },
    ],
    summaryTotal: { col1: "Total Keseluruhan", col2: "810", col3: "2,740", col4: "895", total: "3,550" }
  },
  pelayanan: {
    title: "Laporan Pelayanan Surat & Administrasi",
    shortTitle: "Pelayanan",
    subtitle: "Pemerintah Desa Cimenyan - Rekapitulasi Penerbitan Dokumen Surat Pengantar",
    stats: [
      { label: "Total Berkas Dilayani", value: "1,842", change: "+14.2%", trendIcon: "trending_up", highlight: true },
      { label: "Surat Selesai", value: "1,810", change: "98.3%", trendIcon: null, highlight: false },
      { label: "Menunggu TTE", value: "24", change: "1.3%", trendIcon: null, highlight: false },
      { label: "Rata-rata Waktu", value: "12", change: "menit/surat", trendIcon: null, highlight: false },
    ],
    chartTitle: "Volume Surat Terbit per Bulan (Semester Berjalan)",
    chartYMax: "400",
    chartData: [
      { label: "Jan", value: 260, height: "55%", display: "260" },
      { label: "Feb", value: 290, height: "62%", display: "290" },
      { label: "Mar", value: 340, height: "78%", display: "340" },
      { label: "Apr", value: 310, height: "70%", display: "310" },
      { label: "Mei", value: 380, height: "90%", display: "380" },
      { label: "Jun", value: 262, height: "58%", display: "262" },
    ],
    tableHeaders: ["Jenis Layanan Surat", "Diajukan", "Disetujui", "Ditolak", "Total"],
    rows: [
      { col1: "Surat Keterangan Usaha (SKU)", col2: "510", col3: "498", col4: "12", total: "510" },
      { col1: "Surat Keterangan Domisili", col2: "440", col3: "435", col4: "5", total: "440" },
      { col1: "Surat Keterangan Tidak Mampu (SKTM)", col2: "392", col3: "388", col4: "4", total: "392" },
      { col1: "Pengantar Nikah / Kematian / Kelahiran", col2: "500", col3: "489", col4: "11", total: "500" },
    ],
    summaryTotal: { col1: "Total Keseluruhan", col2: "1,842", col3: "1,810", col4: "32", total: "1,842" }
  },
  kualitas: {
    title: "Laporan Kualitas & Integritas Data",
    shortTitle: "Data Kualitas",
    subtitle: "Pemerintah Desa Cimenyan - Audit Kelengkapan NIK, KK & Validasi Sipenduk",
    stats: [
      { label: "Tingkat Akurasi Data", value: "97.8%", change: "+3.1%", trendIcon: "trending_up", highlight: true },
      { label: "Data Valid Lengkap", value: "12,180", change: "97.8%", trendIcon: null, highlight: false },
      { label: "Anomali / Perlu Cek", value: "270", change: "2.2%", trendIcon: null, highlight: false },
      { label: "Skor Kualitas Desa", value: "A+", change: "Sangat Baik", trendIcon: null, highlight: false },
    ],
    chartTitle: "Tingkat Integritas Data per Indikator",
    chartYMax: "100%",
    chartData: [
      { label: "Validasi NIK", value: 99, height: "99%", display: "99.2%" },
      { label: "Format No KK", value: 98, height: "98%", display: "98.5%" },
      { label: "Geotag Rumah", value: 88, height: "88%", display: "88.4%" },
      { label: "Status Kawin", value: 96, height: "96%", display: "96.1%" },
      { label: "Pendidikan & Pekerjaan", value: 92, height: "92%", display: "92.0%" },
    ],
    tableHeaders: ["Dusun", "Jumlah Penduduk", "Data Valid", "Data Duplikat/Anomali", "Skor Kepatuhan"],
    rows: [
      { col1: "Dusun I Sukamaju", col2: "4,250", col3: "4,180", col4: "70", total: "98.3%" },
      { col1: "Dusun II Cibodas", col2: "3,670", col3: "3,595", col4: "75", total: "97.9%" },
      { col1: "Dusun III Puncak", col2: "4,530", col3: "4,405", col4: "125", total: "97.2%" },
    ],
    summaryTotal: { col1: "Rata-rata Desa", col2: "12,450", col3: "12,180", col4: "270", total: "97.8%" }
  },
  pengaduan: {
    title: "Laporan Aspirasi & Pengaduan Warga",
    shortTitle: "Pengaduan",
    subtitle: "Pemerintah Desa Cimenyan - Rekapitulasi Tindak Lanjut Pengaduan Masyarakat",
    stats: [
      { label: "Total Laporan Masuk", value: "142", change: "+12% tren", trendIcon: "trending_up", highlight: true },
      { label: "Selesai Ditangani", value: "118", change: "83.1%", trendIcon: null, highlight: false },
      { label: "Sedang Diproses", value: "19", change: "13.4%", trendIcon: null, highlight: false },
      { label: "Laporan Baru", value: "5", change: "3.5%", trendIcon: null, highlight: false },
    ],
    chartTitle: "Distribusi Kategori Pengaduan",
    chartYMax: "60",
    chartData: [
      { label: "Infrastruktur", value: 58, height: "95%", display: "58" },
      { label: "Kebersihan", value: 34, height: "60%", display: "34" },
      { label: "Pelayanan", value: 24, height: "42%", display: "24" },
      { label: "Bansos/Sosial", value: 16, height: "28%", display: "16" },
      { label: "Keamanan", value: 10, height: "18%", display: "10" },
    ],
    tableHeaders: ["Kategori Masalah", "Diterima", "Diproses", "Selesai", "Tingkat Penyelesaian"],
    rows: [
      { col1: "Infrastruktur & Jalan", col2: "58", col3: "8", col4: "50", total: "86.2%" },
      { col1: "Kebersihan & Sampah", col2: "34", col3: "4", col4: "30", total: "88.2%" },
      { col1: "Layanan Loket Desa", col2: "24", col3: "3", col4: "21", total: "87.5%" },
      { col1: "Sosial & Bantuan Kesejahteraan", col2: "26", col3: "4", col4: "17", total: "65.3%" },
    ],
    summaryTotal: { col1: "Total Keseluruhan", col2: "142", col3: "19", col4: "118", total: "83.1%" }
  },
  pembangunan: {
    title: "Laporan Progres Pembangunan Desa",
    shortTitle: "Pembangunan",
    subtitle: "Pemerintah Desa Cimenyan - Realisasi Kegiatan APBDes Fisik & Non-Fisik",
    stats: [
      { label: "Total Proyek APBDes", value: "16", change: "Kegiatan", trendIcon: null, highlight: true },
      { label: "Proyek Selesai", value: "9", change: "56.2%", trendIcon: null, highlight: false },
      { label: "Sedang Berjalan", value: "6", change: "37.5%", trendIcon: null, highlight: false },
      { label: "Penyerapan Anggaran", value: "78.4%", change: "Rp 1.42 M", trendIcon: "trending_up", highlight: false },
    ],
    chartTitle: "Alokasi Anggaran Fisik per Bidang (Juta Rupiah)",
    chartYMax: "600jt",
    chartData: [
      { label: "Jalan Desa", value: 550, height: "92%", display: "Rp 550M" },
      { label: "Irigasi Tani", value: 380, height: "64%", display: "Rp 380M" },
      { label: "Posyandu/Puskesdes", value: 220, height: "38%", display: "Rp 220M" },
      { label: "Air Bersih", value: 180, height: "30%", display: "Rp 180M" },
      { label: "Penerangan Jalan", value: 90, height: "18%", display: "Rp 90M" },
    ],
    tableHeaders: ["Nama Kegiatan / Proyek", "Lokasi", "Anggaran", "Progres Fisik", "Status"],
    rows: [
      { col1: "Pengaspalan Hotmix Jalan Dusun 2", col2: "Dusun II Cibodas", col3: "Rp 150.000.000", col4: "75%", total: "Berjalan" },
      { col1: "Renovasi Gedung Posyandu Melati", col2: "Dusun I Sukamaju", col3: "Rp 75.000.000", col4: "100%", total: "Selesai" },
      { col1: "Pembangunan Bak Reservoir Air Bersih", col2: "Dusun III Puncak", col3: "Rp 110.000.000", col4: "30%", total: "Berjalan" },
      { col1: "Pemasangan 30 Titik PJU Solar Cell", col2: "Jalan Poros Desa", col3: "Rp 90.000.000", col4: "100%", total: "Selesai" },
    ],
    summaryTotal: { col1: "Total Pagu Realisasi", col2: "Seluruh Wilayah", col3: "Rp 425.000.000", col4: "76.2%", total: "Sesuai Target" }
  }
};

// Current active report data
const selectedCategoryData = computed(() => {
  return reportDatasets[selectedCategory.value] || reportDatasets.penduduk;
});

// Current filter description text
const filterDescription = computed(() => {
  const dusunText = selectedDusun.value === "all" ? "Semua Wilayah" : selectedDusun.value;
  return `Data Tahun ${selectedYear.value} • ${selectedPeriod.value} • ${dusunText}`;
});

// ==========================================
// EXPORT HANDLERS
// ==========================================
// 1. Export Excel / CSV
const exportExcel = () => {
  const data = selectedCategoryData.value;
  const headers = data.tableHeaders;
  const rows = data.rows.map((r) => [
    `"${r.col1}"`,
    `"${r.col2}"`,
    `"${r.col3}"`,
    `"${r.col4}"`,
    `"${r.total}"`,
  ]);

  if (data.summaryTotal) {
    rows.push([
      `"${data.summaryTotal.col1}"`,
      `"${data.summaryTotal.col2}"`,
      `"${data.summaryTotal.col3}"`,
      `"${data.summaryTotal.col4}"`,
      `"${data.summaryTotal.total}"`,
    ]);
  }

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `laporan_${selectedCategory.value}_desa_cimenyan_${selectedYear.value}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  triggerToast(`Laporan ${data.shortTitle} berhasil diunduh ke Excel/CSV.`);
};

// 2. Export PDF / Print
const exportPDF = () => {
  triggerToast("Menyiapkan dokumen pratinjau cetak PDF...");
  setTimeout(() => {
    window.print();
  }, 400);
};
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-6 sm:space-y-8 pb-12">
    <!-- Toast Notification -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showToast"
        class="fixed top-20 right-6 z-50 flex items-center gap-3 bg-[#0b1c30] text-white px-4 py-3 rounded-xl shadow-xl border border-[#00685f]/40 text-sm font-medium"
      >
        <span class="material-symbols-outlined text-[#6bd8cb] text-lg">check_circle</span>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>

    <!-- Page Header (Matches Stitch layout) -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <div class="flex items-center text-xs font-semibold uppercase tracking-wider text-[#565e74] mb-1.5">
          <span>Beranda</span>
          <span class="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
          <span class="text-[#00685f] font-bold">Laporan</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
          Dashboard Laporan
        </h1>
        <p class="text-sm sm:text-base text-[#565e74] mt-1 max-w-2xl">
          Buat, pratinjau, dan unduh laporan rekapitulasi data desa berdasarkan berbagai parameter dan filter khusus.
        </p>
      </div>
    </div>

    <!-- Main Layout Grid (Left: Controls, Right: Document Preview) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- ========================================== -->
      <!-- LEFT COLUMN: CONTROLS & CATEGORIES (lg:col-4) -->
      <!-- ========================================== -->
      <div class="lg:col-span-4 flex flex-col gap-6">
        
        <!-- Report Type Selector (Bento Grid Style) -->
        <div class="bg-white border border-[#bcc9c6]/40 rounded-xl p-5 shadow-xs">
          <h3 class="text-base font-bold text-[#0b1c30] mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-[#00685f] text-[20px]">category</span>
            Kategori Laporan
          </h3>

          <div class="grid grid-cols-2 gap-2.5">
            <button
              v-for="cat in categories"
              :key="cat.id"
              @click="selectedCategory = cat.id"
              :class="[
                'flex flex-col items-center justify-center p-3 rounded-xl transition-all text-center h-24 border cursor-pointer group',
                selectedCategory === cat.id
                  ? 'bg-[#00685f] text-white border-[#00685f] shadow-md shadow-[#00685f]/20 font-semibold'
                  : 'bg-[#f8f9ff] hover:bg-[#eff4ff] text-[#0b1c30] border-[#bcc9c6]/30 font-medium'
              ]"
            >
              <span
                :class="[
                  'material-symbols-outlined text-2xl mb-1.5 transition-transform group-hover:scale-110',
                  selectedCategory === cat.id ? 'text-white' : 'text-[#00685f]'
                ]"
              >
                {{ cat.icon }}
              </span>
              <span class="text-xs">{{ cat.label }}</span>
            </button>
          </div>
        </div>

        <!-- Parameter Filters Card -->
        <div class="bg-white border border-[#bcc9c6]/40 rounded-xl p-5 shadow-xs">
          <h3 class="text-base font-bold text-[#0b1c30] mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-[#00685f] text-[20px]">filter_list</span>
            Parameter Filter
          </h3>

          <div class="space-y-4">
            <!-- Periode Laporan -->
            <div>
              <label class="block text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1.5">
                Periode Laporan
              </label>
              <div class="grid grid-cols-2 gap-2">
                <select
                  v-model="selectedYear"
                  class="bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#0b1c30] focus:ring-1 focus:ring-[#00685f] focus:border-[#00685f] outline-none cursor-pointer"
                >
                  <option value="2024">Tahun 2024</option>
                  <option value="2023">Tahun 2023</option>
                  <option value="2022">Tahun 2022</option>
                </select>

                <select
                  v-model="selectedPeriod"
                  class="bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#0b1c30] focus:ring-1 focus:ring-[#00685f] focus:border-[#00685f] outline-none cursor-pointer"
                >
                  <option value="Semua Bulan">Semua Bulan</option>
                  <option value="Januari - Juni (Sem 1)">Januari - Juni</option>
                  <option value="Juli - Desember (Sem 2)">Juli - Desember</option>
                  <option value="Triwulan I">Triwulan I</option>
                  <option value="Triwulan II">Triwulan II</option>
                  <option value="Triwulan III">Triwulan III</option>
                  <option value="Triwulan IV">Triwulan IV</option>
                </select>
              </div>
            </div>

            <!-- Wilayah Administrasi -->
            <div>
              <label class="block text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1.5">
                Wilayah Administrasi
              </label>
              <div class="space-y-2">
                <select
                  v-model="selectedDusun"
                  class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#0b1c30] focus:ring-1 focus:ring-[#00685f] focus:border-[#00685f] outline-none cursor-pointer"
                >
                  <option value="all">Semua Dusun</option>
                  <option value="Dusun I Sukamaju">Dusun I Sukamaju</option>
                  <option value="Dusun II Cibodas">Dusun II Cibodas</option>
                  <option value="Dusun III Puncak">Dusun III Puncak</option>
                </select>

                <div class="grid grid-cols-2 gap-2">
                  <select
                    v-model="selectedRW"
                    class="bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#0b1c30] focus:ring-1 focus:ring-[#00685f] focus:border-[#00685f] outline-none cursor-pointer"
                  >
                    <option value="all">Semua RW</option>
                    <option value="RW 01">RW 01</option>
                    <option value="RW 02">RW 02</option>
                    <option value="RW 03">RW 03</option>
                    <option value="RW 04">RW 04</option>
                    <option value="RW 05">RW 05</option>
                  </select>

                  <select
                    v-model="selectedRT"
                    class="bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#0b1c30] focus:ring-1 focus:ring-[#00685f] focus:border-[#00685f] outline-none cursor-pointer"
                  >
                    <option value="all">Semua RT</option>
                    <option value="RT 01">RT 01</option>
                    <option value="RT 02">RT 02</option>
                    <option value="RT 03">RT 03</option>
                    <option value="RT 04">RT 04</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Terapkan Filter Button -->
            <button
              @click="applyFilter"
              :disabled="isApplyingFilter"
              class="w-full py-2.5 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#bcc9c6] cursor-pointer mt-2"
            >
              <span
                class="material-symbols-outlined text-[18px]"
                :class="{ 'animate-spin': isApplyingFilter }"
              >
                refresh
              </span>
              {{ isApplyingFilter ? 'Menerapkan...' : 'Terapkan Filter' }}
            </button>
          </div>
        </div>

        <!-- Quick Info Tip -->
        <div class="p-4 bg-[#eff4ff]/60 border border-[#bcc9c6]/40 rounded-xl text-xs text-[#565e74] flex items-start gap-3">
          <span class="material-symbols-outlined text-[#00685f] text-lg shrink-0 mt-0.5">info</span>
          <div>
            <p class="font-semibold text-[#0b1c30]">Format Dokumen Resmi</p>
            <p class="mt-0.5 leading-relaxed">
              Laporan yang dicetak telah memenuhi standar format regulasi Kementerian Dalam Negeri dan Kemendesa PDTT.
            </p>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- RIGHT COLUMN: DOCUMENT PREVIEW AREA (lg:col-8) -->
      <!-- ========================================== -->
      <div class="lg:col-span-8 flex flex-col gap-5">
        
        <!-- Preview Header & Export Action Bar -->
        <div class="bg-white border border-[#bcc9c6]/40 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 class="text-base sm:text-lg font-bold text-[#0b1c30]">
              Pratinjau Laporan: {{ selectedCategoryData.shortTitle }}
            </h3>
            <p class="text-xs sm:text-sm text-[#565e74] mt-0.5">
              {{ filterDescription }}
            </p>
          </div>

          <!-- Action Buttons (Export Excel & PDF) -->
          <div class="flex items-center gap-2.5 w-full sm:w-auto">
            <!-- Export Excel Button -->
            <button
              @click="exportExcel"
              class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-[#bcc9c6] hover:bg-[#eff4ff] text-[#0b1c30] text-xs sm:text-sm font-semibold py-2 px-4 rounded-lg transition-colors shadow-xs cursor-pointer"
              title="Unduh format spreadsheet CSV/Excel"
            >
              <span class="material-symbols-outlined text-[#1D6F42] text-[18px]">table_view</span>
              Export Excel
            </button>

            <!-- Export PDF / Cetak Button -->
            <button
              @click="exportPDF"
              class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#00685f] hover:bg-[#005049] text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors cursor-pointer"
              title="Cetak atau unduh dokumen PDF"
            >
              <span class="material-symbols-outlined text-[18px]">picture_as_pdf</span>
              Export PDF
            </button>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- DOCUMENT CANVAS (PRINTABLE FORMAL PAPER)   -->
        <!-- ========================================== -->
        <div
          id="printable-report-canvas"
          class="bg-white border border-[#bcc9c6]/50 rounded-xl p-6 sm:p-8 md:p-10 shadow-sm min-h-[680px] flex flex-col gap-8 relative overflow-hidden print:p-0 print:border-none print:shadow-none"
        >
          <!-- Subtle document watermark dot grid -->
          <div
            class="absolute inset-0 opacity-[0.03] pointer-events-none print:hidden"
            style="background-image: radial-gradient(circle at 2px 2px, black 1px, transparent 0); background-size: 24px 24px;"
          ></div>

          <!-- Official Document Header (Kop Dokumen Resmi) -->
          <div class="text-center border-b-2 border-[#bcc9c6]/60 pb-5 relative z-10">
            <div class="flex items-center justify-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-full bg-[#00685f] text-white flex items-center justify-center font-bold text-lg shadow-xs">
                <span class="material-symbols-outlined text-2xl">home</span>
              </div>
              <div class="text-left">
                <p class="text-xs font-bold uppercase tracking-wider text-[#00685f] leading-none">
                  Pemerintah Kabupaten Bandung • Kecamatan Cimenyan
                </p>
                <p class="text-base font-bold text-[#0b1c30] leading-tight">
                  Pemerintah Desa Cimenyan
                </p>
              </div>
            </div>
            <h1 class="text-xl sm:text-2xl font-extrabold text-[#0b1c30] uppercase tracking-wide mt-3">
              {{ selectedCategoryData.title }}
            </h1>
            <p class="text-xs sm:text-sm text-[#565e74] mt-1 font-medium">
              {{ selectedCategoryData.subtitle }} - Tahun Anggaran {{ selectedYear }}
            </p>
          </div>

          <!-- Summary KPI Stat Cards (4 Cards Grid) -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative z-10">
            <div
              v-for="(st, idx) in selectedCategoryData.stats"
              :key="idx"
              class="bg-[#f8f9ff] p-4 rounded-xl border border-[#bcc9c6]/40 shadow-xs flex flex-col justify-between"
            >
              <p class="text-[11px] font-semibold text-[#565e74] uppercase tracking-wider mb-1">
                {{ st.label }}
              </p>
              <p
                class="text-xl sm:text-2xl font-bold tracking-tight"
                :class="st.highlight ? 'text-[#00685f]' : 'text-[#0b1c30]'"
              >
                {{ st.value }}
              </p>
              <p
                class="text-xs font-medium mt-1 flex items-center gap-1"
                :class="st.highlight ? 'text-[#00685f]' : 'text-[#565e74]'"
              >
                <span v-if="st.trendIcon" class="material-symbols-outlined text-[14px]">
                  {{ st.trendIcon }}
                </span>
                {{ st.change }}
              </p>
            </div>
          </div>

          <!-- Visualized Interactive Bar Chart -->
          <div class="relative z-10 bg-[#f8f9ff] border border-[#bcc9c6]/50 rounded-xl p-5 shadow-xs">
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-sm font-bold text-[#0b1c30]">
                {{ selectedCategoryData.chartTitle }}
              </h4>
              <span class="text-xs text-[#565e74] bg-white px-2.5 py-1 rounded-md border border-[#bcc9c6]/30 font-medium">
                Visualisasi Grafik
              </span>
            </div>

            <!-- Bar Chart Component -->
            <div class="h-60 w-full flex items-end justify-between px-6 pb-4 border-b border-l border-[#bcc9c6] relative pt-6">
              <!-- Y-Axis Mock Values -->
              <div class="absolute -left-9 top-0 bottom-0 flex flex-col justify-between text-[10px] font-medium text-[#565e74] py-3 text-right w-7">
                <span>{{ selectedCategoryData.chartYMax }}</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0</span>
              </div>

              <!-- Bar Items -->
              <div class="w-full flex justify-around items-end h-full">
                <div
                  v-for="(bar, bIdx) in selectedCategoryData.chartData"
                  :key="bIdx"
                  class="w-1/12 bg-[#00685f] hover:bg-[#008378] transition-all rounded-t-md group relative cursor-pointer"
                  :style="{ height: bar.height }"
                >
                  <!-- Tooltip Hover Popover -->
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0b1c30] text-white text-[10px] py-1 px-2 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 font-semibold">
                    {{ bar.display }}
                  </div>
                </div>
              </div>
            </div>

            <!-- X-Axis Labels -->
            <div class="w-full flex justify-around mt-2.5 text-[11px] font-semibold text-[#565e74] px-6">
              <span v-for="(bar, bIdx) in selectedCategoryData.chartData" :key="'label-' + bIdx">
                {{ bar.label }}
              </span>
            </div>
          </div>

          <!-- Data Table Rekapitulasi -->
          <div class="relative z-10 w-full overflow-x-auto border border-[#bcc9c6]/50 rounded-xl shadow-xs">
            <table class="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr class="bg-[#eff4ff] border-b border-[#bcc9c6]/60">
                  <th
                    v-for="(hdr, hIdx) in selectedCategoryData.tableHeaders"
                    :key="hIdx"
                    class="p-3.5 text-xs font-bold text-[#0b1c30] uppercase tracking-wider"
                    :class="{ 'text-right': hIdx > 0 }"
                  >
                    {{ hdr }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#bcc9c6]/20 text-xs sm:text-sm">
                <!-- Data Rows -->
                <tr
                  v-for="(r, rIdx) in selectedCategoryData.rows"
                  :key="rIdx"
                  class="hover:bg-[#f8f9ff] transition-colors"
                  :class="{ 'bg-[#f8f9ff]/40': rIdx % 2 === 1 }"
                >
                  <td class="p-3.5 text-[#0b1c30] font-semibold">{{ r.col1 }}</td>
                  <td class="p-3.5 text-[#565e74] text-right">{{ r.col2 }}</td>
                  <td class="p-3.5 text-[#565e74] text-right">{{ r.col3 }}</td>
                  <td class="p-3.5 text-[#565e74] text-right">{{ r.col4 }}</td>
                  <td class="p-3.5 text-[#00685f] font-bold text-right">{{ r.total }}</td>
                </tr>

                <!-- Summary Total Row -->
                <tr v-if="selectedCategoryData.summaryTotal" class="bg-[#eff4ff]/80 font-bold border-t-2 border-[#bcc9c6]/60">
                  <td class="p-3.5 text-[#0b1c30]">{{ selectedCategoryData.summaryTotal.col1 }}</td>
                  <td class="p-3.5 text-[#0b1c30] text-right">{{ selectedCategoryData.summaryTotal.col2 }}</td>
                  <td class="p-3.5 text-[#0b1c30] text-right">{{ selectedCategoryData.summaryTotal.col3 }}</td>
                  <td class="p-3.5 text-[#0b1c30] text-right">{{ selectedCategoryData.summaryTotal.col4 }}</td>
                  <td class="p-3.5 text-[#00685f] text-right text-sm">{{ selectedCategoryData.summaryTotal.total }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Document Watermark & Official Signature Footer -->
          <div class="mt-auto pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-t border-[#bcc9c6]/50 relative z-10">
            <!-- Left: Legal Auto Generation Note -->
            <div class="text-xs text-[#565e74] space-y-1">
              <p class="font-semibold text-[#0b1c30] flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[16px] text-[#00685f]">verified</span>
                Dokumen Resmi EJIMAT Desa Cimenyan
              </p>
              <p>Dihasilkan secara otomatis oleh sistem Satu Data Desa Cimenyan.</p>
              <p class="text-[11px] text-[#565e74]/80">
                Waktu Cetak: {{ new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }} • Kode Verifikasi: #EJM-{{ selectedYear }}-{{ selectedCategory.toUpperCase().slice(0,3) }}
              </p>
            </div>

            <!-- Right: QR Code Verification Badge -->
            <div class="flex items-center gap-4 bg-[#f8f9ff] p-3 rounded-xl border border-[#bcc9c6]/40 shrink-0">
              <div class="text-right">
                <p class="text-[10px] font-bold uppercase tracking-wider text-[#565e74]">Validasi Dokumen</p>
                <p class="text-xs font-bold text-[#00685f]">Scan untuk Cek Asli</p>
              </div>
              <div class="w-14 h-14 bg-white border border-[#bcc9c6] rounded-lg p-1 flex items-center justify-center shadow-xs">
                <span class="material-symbols-outlined text-3xl text-[#0b1c30]">qr_code_2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media print {
  body {
    background: white !important;
  }
  aside, header, button {
    display: none !important;
  }
  #printable-report-canvas {
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
}
</style>
