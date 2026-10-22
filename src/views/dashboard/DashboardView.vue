<script setup>
import { ref } from "vue";

// NLQ State
const searchQuery = ref("");
const searchAnswer = ref(null);
const isSearching = ref(false);

const suggestions = [
  { label: "Tren kelahiran tahun ini", icon: "trending_up" },
  { label: "Demografi berdasarkan usia", icon: "group" },
  { label: "Distribusi bansos per RW", icon: "map" },
];

const setQuery = (text) => {
  searchQuery.value = text;
};

const handleSearch = () => {
  if (!searchQuery.value.trim()) return;
  isSearching.value = true;
  searchAnswer.value = null;

  setTimeout(() => {
    isSearching.value = false;
    searchAnswer.value = `Hasil pencarian untuk "${searchQuery.value}": Total data relevan ditemukan sebanyak 42 entri dari 3 dusun di Desa Cimenyan.`;
  }, 500);
};

// Summary Stats
const stats = ref([
  {
    title: "Total Penduduk",
    value: "18.240",
    icon: "groups",
    info: "+1.2% dari bulan lalu",
    infoIcon: "arrow_upward",
    type: "positive",
    iconBg: "bg-[#0d9488]/10 text-[#0d9488]",
    watermarkBg: "bg-[#0d9488]/5",
  },
  {
    title: "Kartu Keluarga",
    value: "5.421",
    icon: "folder_shared",
    info: "Stabil",
    infoIcon: "horizontal_rule",
    type: "neutral",
    iconBg: "bg-[#825100]/10 text-[#825100]",
    watermarkBg: "bg-[#825100]/5",
  },
  {
    title: "Pengajuan Layanan",
    value: "248",
    icon: "description",
    info: "12 butuh tindak lanjut",
    infoIcon: "pending_actions",
    type: "danger",
    iconBg: "bg-[#0d9488]/10 text-[#0d9488]",
    watermarkBg: "bg-[#0d9488]/10",
  },
  {
    title: "Skor Kualitas Data",
    value: "87.4",
    maxValue: "/ 100",
    icon: "warning",
    badge: "Perlu Perbaikan",
    type: "alert",
    iconBg: "bg-[#ba1a1a]/10 text-[#ba1a1a]",
    watermarkBg: "bg-[#ba1a1a]/5",
  },
]);

// Quality Metrics
const qualityMetrics = ref([
  { label: "Kelengkapan", value: 93, color: "bg-[#0d9488]", textColor: "text-[#0d9488]" },
  { label: "Validitas", value: 91, color: "bg-[#0d9488]", textColor: "text-[#0d9488]" },
  { label: "Uniqueness", value: 78, color: "bg-[#a36700]", textColor: "text-[#a36700]" },
  { label: "Konsistensi", value: 87, color: "bg-[#f59e0b]", textColor: "text-[#f59e0b]" },
]);

// Data Issues
const issues = ref([
  {
    title: "124 Data Ganda",
    desc: "Ditemukan NIK ganda pada dataset Kependudukan RT 03/RW 05.",
    priority: "Prioritas Tinggi",
    priorityClass: "text-[#ba1a1a] bg-[#ba1a1a]/10",
    bgClass: "bg-red-50/50 border-red-200/60 hover:bg-red-50",
    icon: "content_copy",
    iconBg: "bg-[#ba1a1a]/10 text-[#ba1a1a]",
  },
  {
    title: "217 Data Tidak Lengkap",
    desc: "Kolom 'Pekerjaan' kosong pada dataset Kepala Keluarga.",
    priority: "Prioritas Sedang",
    priorityClass: "text-[#E65100] bg-[#FFF3E0]",
    bgClass: "bg-[#FFF8ED] border-[#FDE6C8] hover:bg-[#FFF3E0]",
    icon: "edit_note",
    iconBg: "bg-[#FFE0B2] text-[#E65100]",
  },
  {
    title: "45 Format Tidak Sesuai",
    desc: "Format tanggal lahir tidak konsisten (DD/MM/YYYY vs YYYY-MM-DD).",
    priority: null,
    priorityClass: "",
    bgClass: "bg-white border-[#bcc9c6]/30 hover:bg-[#eff4ff]",
    icon: "rule",
    iconBg: "bg-[#e5eeff] text-[#565e74]",
  },
]);

// Activities
const activities = ref([
  {
    title: "Budi Santoso",
    action: "memperbarui data kependudukan RT 01.",
    time: "Hari ini, 10:23 AM",
    dotClass: "bg-[#0d9488] ring-4 ring-white",
  },
  {
    title: "Sistem mendeteksi",
    action: "15 anomali data baru pada sinkronisasi bulanan.",
    time: "Kemarin, 23:00 PM",
    dotClass: "bg-[#bec6e0] ring-4 ring-white border-2 border-white",
  },
  {
    title: "Siti Aminah",
    action: "menyelesaikan verifikasi pengajuan SKTM (Nomor: #4421).",
    time: "Kemarin, 14:45 PM",
    dotClass: "bg-[#bec6e0] ring-4 ring-white border-2 border-white",
  },
]);

// Services
const services = ref([
  {
    applicant: "Ahmad Rifai",
    service: "Pembuatan KK Baru",
    date: "12 Okt 2023",
    status: "Menunggu Verifikasi",
    statusBadge: "bg-[#FFF3E0] text-[#E65100]",
    dotColor: "bg-[#E65100]",
  },
  {
    applicant: "Nurul Huda",
    service: "Surat Keterangan Usaha",
    date: "11 Okt 2023",
    status: "Selesai",
    statusBadge: "bg-[#0d9488]/10 text-[#0d9488]",
    dotColor: "bg-[#0d9488]",
  },
  {
    applicant: "Keluarga Bapak Yanto",
    service: "Surat Pengantar Pindah",
    date: "10 Okt 2023",
    status: "Sedang Diproses",
    statusBadge: "bg-[#E0F2FE] text-[#0284C7]",
    dotColor: "bg-[#0284C7]",
  },
]);

// Complaints
const complaints = ref([
  {
    id: "#PGD-092",
    title: "Lampu Jalan Mati di RT 04",
    category: "Infrastruktur",
    date: "12 Okt 2023",
    status: "Baru",
    statusBadge: "bg-[#FFF3E0] text-[#E65100]",
    dotColor: "bg-[#E65100]",
  },
  {
    id: "#PGD-091",
    title: "Tumpukan Sampah Dekat Balai",
    category: "Kebersihan",
    date: "10 Okt 2023",
    status: "Ditangani",
    statusBadge: "bg-[#E0F2FE] text-[#0284C7]",
    dotColor: "bg-[#0284C7]",
  },
]);
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-6 sm:space-y-8 pb-12">
    <!-- Page Header -->
    <div>
      <h2 class="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight mb-1.5">
        Selamat datang, Admin Desa
      </h2>
      <p class="text-sm sm:text-base text-[#3d4947]">
        Pantau data dan pelayanan Desa Cimenyan dalam satu dashboard.
      </p>
    </div>

    <!-- NLQ Section (Natural Language Query) -->
    <div class="bg-white rounded-2xl p-6 sm:p-7 border border-[#0d9488]/20 shadow-xs relative overflow-hidden bg-gradient-to-br from-white to-[#0d9488]/5">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2.5">
          <span class="material-symbols-outlined text-[#0d9488] icon-filled text-[24px]">smart_toy</span>
          <h3 class="text-lg font-bold text-[#0b1c30]">Tanya Data Desa</h3>
        </div>

        <!-- Search Bar -->
        <form class="flex flex-col sm:flex-row gap-3" @submit.prevent="handleSearch">
          <div class="relative flex-1">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#6d7a77] text-[20px]">
              search
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Contoh: Berapa jumlah penduduk setiap dusun?"
              class="w-full pl-11 pr-4 py-3 rounded-xl border border-[#bcc9c6] bg-white focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20 transition-all text-sm text-[#0b1c30] placeholder:text-[#6d7a77]"
            />
          </div>
          <button
            type="submit"
            :disabled="isSearching"
            class="bg-[#0d9488] hover:bg-[#0b766c] text-white px-6 py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-xs active:scale-98 cursor-pointer disabled:opacity-70"
          >
            <span>Tanyakan</span>
            <span class="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>

        <!-- Search Result Alert -->
        <div v-if="searchAnswer" class="p-3.5 rounded-xl bg-[#ccfbf1]/50 border border-[#0d9488]/20 text-[#115e59] text-xs sm:text-sm flex items-start gap-2 animate-fade-in">
          <span class="material-symbols-outlined text-[18px] text-[#0d9488] shrink-0 mt-0.5">info</span>
          <span>{{ searchAnswer }}</span>
        </div>

        <!-- Suggestion Chips -->
        <div class="flex flex-wrap gap-2 pt-1">
          <button
            v-for="chip in suggestions"
            :key="chip.label"
            type="button"
            class="text-xs px-3 py-1.5 rounded-full bg-white border border-[#bcc9c6]/80 hover:bg-[#eff4ff] hover:border-[#0d9488]/50 transition-colors text-[#3d4947] flex items-center gap-1.5 cursor-pointer shadow-2xs"
            @click="setQuery(chip.label)"
          >
            <span class="material-symbols-outlined text-[14px] text-[#0d9488]">{{ chip.icon }}</span>
            <span>{{ chip.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Summary Cards Bento Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <!-- Card 1: Total Penduduk -->
      <div class="bg-white rounded-2xl p-6 border border-[#bcc9c6]/30 shadow-xs relative overflow-hidden group hover:border-[#0d9488]/40 transition-all">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-[#0d9488]/5 rounded-full transition-transform group-hover:scale-125"></div>
        <div class="flex justify-between items-start mb-4 relative z-10">
          <h3 class="text-sm font-semibold text-[#565e74]">{{ stats[0].title }}</h3>
          <span class="material-symbols-outlined p-2 rounded-xl text-[22px] bg-[#0d9488]/10 text-[#0d9488] icon-filled">
            {{ stats[0].icon }}
          </span>
        </div>
        <div class="relative z-10">
          <p class="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] tracking-tight">{{ stats[0].value }}</p>
          <p class="text-xs text-[#0d9488] font-semibold mt-1.5 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">arrow_upward</span>
            {{ stats[0].info }}
          </p>
        </div>
      </div>

      <!-- Card 2: Kartu Keluarga -->
      <div class="bg-white rounded-2xl p-6 border border-[#bcc9c6]/30 shadow-xs relative overflow-hidden group hover:border-[#825100]/40 transition-all">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-[#825100]/5 rounded-full transition-transform group-hover:scale-125"></div>
        <div class="flex justify-between items-start mb-4 relative z-10">
          <h3 class="text-sm font-semibold text-[#565e74]">{{ stats[1].title }}</h3>
          <span class="material-symbols-outlined p-2 rounded-xl text-[22px] bg-[#825100]/10 text-[#825100] icon-filled">
            {{ stats[1].icon }}
          </span>
        </div>
        <div class="relative z-10">
          <p class="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] tracking-tight">{{ stats[1].value }}</p>
          <p class="text-xs text-[#6d7a77] font-medium mt-1.5 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">horizontal_rule</span>
            {{ stats[1].info }}
          </p>
        </div>
      </div>

      <!-- Card 3: Pengajuan Layanan -->
      <div class="bg-white rounded-2xl p-6 border border-[#bcc9c6]/30 shadow-xs relative overflow-hidden group hover:border-red-300 transition-all">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-red-500/5 rounded-full transition-transform group-hover:scale-125"></div>
        <div class="flex justify-between items-start mb-4 relative z-10">
          <h3 class="text-sm font-semibold text-[#565e74]">{{ stats[2].title }}</h3>
          <span class="material-symbols-outlined p-2 rounded-xl text-[22px] bg-[#0d9488]/10 text-[#0d9488] icon-filled">
            {{ stats[2].icon }}
          </span>
        </div>
        <div class="relative z-10">
          <p class="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] tracking-tight">{{ stats[2].value }}</p>
          <p class="text-xs text-[#ba1a1a] font-semibold mt-1.5 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">pending_actions</span>
            {{ stats[2].info }}
          </p>
        </div>
      </div>

      <!-- Card 4: Skor Kualitas Data (Alert Style) -->
      <div class="bg-[#FFF8F6] rounded-2xl p-6 border border-[#FADCD5] shadow-xs relative overflow-hidden group hover:border-red-400/50 transition-all">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-[#ba1a1a]/5 rounded-full transition-transform group-hover:scale-125"></div>
        <div class="flex justify-between items-start mb-4 relative z-10">
          <h3 class="text-sm font-semibold text-[#93000a]">{{ stats[3].title }}</h3>
          <span class="material-symbols-outlined p-2 rounded-xl text-[22px] bg-[#ba1a1a]/10 text-[#ba1a1a] icon-filled">
            {{ stats[3].icon }}
          </span>
        </div>
        <div class="relative z-10 flex items-end justify-between">
          <div>
            <p class="text-3xl sm:text-4xl font-extrabold text-[#93000a] tracking-tight">{{ stats[3].value }}</p>
            <div class="inline-flex items-center gap-1 bg-[#ba1a1a]/10 text-[#ba1a1a] px-2.5 py-0.5 rounded-full mt-1.5">
              <span class="material-symbols-outlined text-[12px]">error</span>
              <span class="text-[10px] font-bold uppercase tracking-wider">{{ stats[3].badge }}</span>
            </div>
          </div>
          <div class="text-[#93000a] font-bold text-sm">{{ stats[3].maxValue }}</div>
        </div>
      </div>
    </div>

    <!-- Main Data Quality & Issues Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column: Circular Score & Progress Bars -->
      <div class="bg-white rounded-2xl border border-[#bcc9c6]/30 shadow-xs p-6 lg:col-span-1 flex flex-col justify-between">
        <div class="flex justify-between items-center mb-5">
          <h3 class="text-base font-bold text-[#0b1c30]">Kualitas Data</h3>
          <button class="text-[#0d9488] hover:bg-[#0d9488]/5 p-1 rounded-lg transition-colors cursor-pointer">
            <span class="material-symbols-outlined text-[20px]">more_vert</span>
          </button>
        </div>

        <!-- Circular Chart -->
        <div class="flex justify-center items-center py-4 mb-6">
          <div class="relative w-40 h-40">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="none" r="45" stroke="#f1f5f9" stroke-width="8"></circle>
              <circle
                cx="50"
                cy="50"
                fill="none"
                r="45"
                stroke="#ba1a1a"
                stroke-dasharray="282.7"
                stroke-dashoffset="35.6"
                stroke-linecap="round"
                stroke-width="8"
              ></circle>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-3xl font-extrabold text-[#0b1c30] tracking-tight">87.4</span>
              <span class="text-xs text-[#565e74] font-medium mt-0.5">Skor Keseluruhan</span>
            </div>
          </div>
        </div>

        <!-- Progress Bars -->
        <div class="space-y-4">
          <div v-for="metric in qualityMetrics" :key="metric.label">
            <div class="flex justify-between text-xs sm:text-sm mb-1.5 font-medium">
              <span class="text-[#0b1c30]">{{ metric.label }}</span>
              <span :class="[metric.textColor, 'font-bold']">{{ metric.value }}%</span>
            </div>
            <div class="h-2 w-full bg-[#d3e4fe]/50 rounded-full overflow-hidden">
              <div
                :class="['h-full rounded-full transition-all duration-700', metric.color]"
                :style="{ width: `${metric.value}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Data Issues List -->
      <div class="lg:col-span-2 bg-white rounded-2xl border border-[#bcc9c6]/30 shadow-xs p-6 flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-center mb-5">
            <div>
              <h3 class="text-base font-bold text-[#0b1c30]">Masalah Data</h3>
              <p class="text-xs sm:text-sm text-[#565e74]">Tindakan diperlukan untuk meningkatkan kualitas data.</p>
            </div>
            <button class="text-xs sm:text-sm font-semibold text-[#0d9488] hover:underline px-3 py-1.5 rounded-lg hover:bg-[#0d9488]/5 transition-colors cursor-pointer">
              Lihat Semua
            </button>
          </div>

          <!-- Issues -->
          <div class="space-y-3">
            <div
              v-for="issue in issues"
              :key="issue.title"
              :class="[
                'flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer group',
                issue.bgClass
              ]"
            >
              <div
                :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-105',
                  issue.iconBg
                ]"
              >
                <span class="material-symbols-outlined text-[20px] icon-filled">{{ issue.icon }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start gap-2">
                  <h4 class="text-sm font-bold text-[#0b1c30]">{{ issue.title }}</h4>
                  <span
                    v-if="issue.priority"
                    :class="['text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0', issue.priorityClass]"
                  >
                    {{ issue.priority }}
                  </span>
                </div>
                <p class="text-xs sm:text-sm text-[#3d4947] mt-1 leading-relaxed">{{ issue.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Action Banner -->
        <div class="mt-5 p-4 rounded-xl bg-[#ccfbf1]/40 border border-[#0d9488]/20 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-[#0d9488] text-[20px]">auto_fix_high</span>
            <span class="text-xs sm:text-sm font-medium text-[#115e59]">Pembersihan data otomatis tersedia</span>
          </div>
          <button class="text-xs font-bold text-white bg-[#0d9488] hover:bg-[#0b766c] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer">
            Jalankan
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Sections Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Recent Activities Timeline -->
      <div class="bg-white rounded-2xl border border-[#bcc9c6]/30 shadow-xs p-6 lg:col-span-1">
        <h3 class="text-base font-bold text-[#0b1c30] mb-5">Aktivitas Terakhir</h3>
        <div class="relative border-l-2 border-[#d3e4fe] ml-3 space-y-6 pb-2">
          <div v-for="act in activities" :key="act.time" class="relative pl-6">
            <div :class="['absolute -left-[9px] top-1 w-4 h-4 rounded-full', act.dotClass]"></div>
            <p class="text-xs sm:text-sm text-[#0b1c30] leading-snug">
              <strong>{{ act.title }}</strong> {{ act.action }}
            </p>
            <span class="text-[11px] text-[#565e74] mt-1.5 block font-medium">{{ act.time }}</span>
          </div>
        </div>
      </div>

      <!-- Right: Tables Section -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Pengajuan Layanan Terbaru -->
        <div class="bg-white rounded-2xl border border-[#bcc9c6]/30 shadow-xs p-6 overflow-hidden">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-base font-bold text-[#0b1c30]">Pengajuan Layanan Terbaru</h3>
            <button class="text-xs sm:text-sm font-semibold text-[#0d9488] hover:underline cursor-pointer">
              Lihat Semua
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr class="border-b border-[#bcc9c6]/40 text-xs font-semibold uppercase tracking-wider text-[#565e74]">
                  <th class="pb-3">Pemohon</th>
                  <th class="pb-3">Jenis Layanan</th>
                  <th class="pb-3">Tanggal</th>
                  <th class="pb-3">Status</th>
                </tr>
              </thead>
              <tbody class="text-xs sm:text-sm text-[#0b1c30] divide-y divide-[#bcc9c6]/20">
                <tr
                  v-for="s in services"
                  :key="s.applicant"
                  class="hover:bg-[#eff4ff]/60 transition-colors"
                >
                  <td class="py-3.5 font-semibold text-[#0b1c30]">{{ s.applicant }}</td>
                  <td class="py-3.5 text-[#3d4947]">{{ s.service }}</td>
                  <td class="py-3.5 text-[#565e74]">{{ s.date }}</td>
                  <td class="py-3.5">
                    <span :class="['inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium', s.statusBadge]">
                      <span :class="['w-1.5 h-1.5 rounded-full', s.dotColor]"></span>
                      {{ s.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pengaduan Terbaru -->
        <div class="bg-white rounded-2xl border border-[#bcc9c6]/30 shadow-xs p-6 overflow-hidden">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-base font-bold text-[#0b1c30]">Pengaduan Terbaru</h3>
            <button class="text-xs sm:text-sm font-semibold text-[#0d9488] hover:underline cursor-pointer">
              Lihat Semua
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr class="border-b border-[#bcc9c6]/40 text-xs font-semibold uppercase tracking-wider text-[#565e74]">
                  <th class="pb-3">ID</th>
                  <th class="pb-3">Judul</th>
                  <th class="pb-3">Kategori</th>
                  <th class="pb-3">Tanggal</th>
                  <th class="pb-3">Status</th>
                </tr>
              </thead>
              <tbody class="text-xs sm:text-sm text-[#0b1c30] divide-y divide-[#bcc9c6]/20">
                <tr
                  v-for="c in complaints"
                  :key="c.id"
                  class="hover:bg-[#eff4ff]/60 transition-colors"
                >
                  <td class="py-3.5 font-medium text-[#565e74]">{{ c.id }}</td>
                  <td class="py-3.5 font-semibold text-[#0b1c30]">{{ c.title }}</td>
                  <td class="py-3.5 text-[#3d4947]">{{ c.category }}</td>
                  <td class="py-3.5 text-[#565e74]">{{ c.date }}</td>
                  <td class="py-3.5">
                    <span :class="['inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium', c.statusBadge]">
                      <span :class="['w-1.5 h-1.5 rounded-full', c.dotColor]"></span>
                      {{ c.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
