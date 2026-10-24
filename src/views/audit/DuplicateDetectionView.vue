<script setup>
import { ref, computed } from "vue";

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

// Rescan State
const isScanning = ref(false);
const handleRescan = () => {
  isScanning.value = true;
  triggerToast("Sedang memindai ulang seluruh basis data kependudukan (SIAK)...");
  setTimeout(() => {
    isScanning.value = false;
    triggerToast("Pemindaian selesai. 42 pasang potensi duplikasi terverifikasi.");
  }, 2000);
};

// Summary Stats
const stats = ref({
  totalDuplicates: 42,
  reviewed: 128,
  accuracy: 94,
});

// Search & Filter
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 4;

// Duplicate Queue Data
const duplicatePairs = ref([
  {
    id: 1,
    namaA: "Ahmad Ridwan",
    namaB: "Achmad Ridwan",
    nikA: "3204051102900001",
    nikB: "3204051102900002",
    nikMismatch: true,
    tglA: "11 Feb 1990",
    tglB: "11 Feb 1990",
    tglMismatch: false,
    tempatA: "Bandung",
    tempatB: "Bandung",
    alamatA: "Kp. Ciburial RT 01/02, Desa Cimenyan",
    alamatB: "Kp. Ciburial RT 01/02, Ds Cimenyan",
    similarity: 98,
    similarityColor: "text-[#ba1a1a]",
    similarityBarColor: "bg-[#ba1a1a]",
    status: "Sangat Mirip",
    statusBadge: "bg-[#ffdad6] text-[#93000a]",
  },
  {
    id: 2,
    namaA: "Siti Aminah",
    namaB: "Siti Aminah Binti",
    nikA: "3204055506850004",
    nikB: "3204055506850004",
    nikMismatch: false,
    tglA: "15 Jun 1985",
    tglB: "15 Jul 1985",
    tglMismatch: true,
    tempatA: "Bandung",
    tempatB: "Bandung",
    alamatA: "Dusun Cimenyan RT 02/03",
    alamatB: "Dusun Cimenyan RT 02/03",
    similarity: 85,
    similarityColor: "text-[#825100]",
    similarityBarColor: "bg-[#825100]",
    status: "Perlu Dicek",
    statusBadge: "bg-[#ffddb8] text-[#825100]",
  },
  {
    id: 3,
    namaA: "Budi Santoso",
    namaB: "Budi Santoso Nugroho",
    nikA: "3204051203850006",
    nikB: "3204051203850099",
    nikMismatch: true,
    tglA: "20 Des 1964",
    tglB: "20 Des 1964",
    tglMismatch: false,
    tempatA: "Garut",
    tempatB: "Garut",
    alamatA: "Dusun Padasuka RT 01/RW 01",
    alamatB: "Dusun Padasuka RT 01/RW 01",
    similarity: 92,
    similarityColor: "text-[#ba1a1a]",
    similarityBarColor: "bg-[#ba1a1a]",
    status: "Sangat Mirip",
    statusBadge: "bg-[#ffdad6] text-[#93000a]",
  },
  {
    id: 4,
    namaA: "Dewi Lestari",
    namaB: "Dewi Lestari N.",
    nikA: "3204051203850004",
    nikB: "3204051203850004",
    nikMismatch: false,
    tglA: "14 Ags 1992",
    tglB: "14 Ags 1992",
    tglMismatch: false,
    tempatA: "Bandung",
    tempatB: "Cimahi",
    alamatA: "Dusun Cikadut RT 03/RW 03",
    alamatB: "Dusun Cikadut RT 03/RW 03",
    similarity: 89,
    similarityColor: "text-[#825100]",
    similarityBarColor: "bg-[#825100]",
    status: "Perlu Dicek",
    statusBadge: "bg-[#ffddb8] text-[#825100]",
  },
]);

// Filtered Duplicate Pairs
const filteredPairs = computed(() => {
  let list = duplicatePairs.value;
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.namaA.toLowerCase().includes(q) ||
        p.namaB.toLowerCase().includes(q) ||
        p.nikA.toLowerCase().includes(q) ||
        p.nikB.toLowerCase().includes(q)
    );
  }
  return list;
});

// Pagination
const totalPages = computed(() => Math.max(1, Math.ceil(filteredPairs.value.length / itemsPerPage)));
const paginatedPairs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredPairs.value.slice(start, start + itemsPerPage);
});

// Active Comparison Workbench State
const activeComparison = ref(duplicatePairs.value[0]);
const keepRecord = ref("A"); // 'A' | 'B'

const selectForComparison = (pair) => {
  activeComparison.value = pair;
  keepRecord.value = "A";
  // smooth scroll to workbench if needed
};

const closeComparison = () => {
  activeComparison.value = null;
};

// Resolve Actions
const handleMarkNotDuplicate = () => {
  if (!activeComparison.value) return;
  const id = activeComparison.value.id;
  duplicatePairs.value = duplicatePairs.value.filter((p) => p.id !== id);
  stats.value.totalDuplicates = Math.max(0, stats.value.totalDuplicates - 1);
  stats.value.reviewed += 1;
  triggerToast(`Pasangan #${id} ditandai sebagai 'Bukan Duplikat'.`);
  activeComparison.value = duplicatePairs.value[0] || null;
};

const handleMergeRecords = () => {
  if (!activeComparison.value) return;
  const id = activeComparison.value.id;
  const primaryName = keepRecord.value === "A" ? activeComparison.value.namaA : activeComparison.value.namaB;
  duplicatePairs.value = duplicatePairs.value.filter((p) => p.id !== id);
  stats.value.totalDuplicates = Math.max(0, stats.value.totalDuplicates - 1);
  stats.value.reviewed += 1;
  triggerToast(`Data berhasil digabungkan dengan entri utama: "${primaryName}".`);
  activeComparison.value = duplicatePairs.value[0] || null;
};
</script>

<template>
  <div class="space-y-6 sm:space-y-8">
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
        class="fixed top-20 right-6 z-50 flex items-center gap-3 bg-[#0b1c30] text-white px-4 py-3 rounded-xl shadow-xl border border-teal-500/30 text-sm font-medium"
      >
        <span class="material-symbols-outlined text-teal-400 text-lg">check_circle</span>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>

    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight mb-1">
          Deteksi Data Duplikat
        </h1>
        <p class="text-sm sm:text-base text-[#565e74]">
          Review dan kelola potensi data ganda dalam basis data penduduk desa.
        </p>
      </div>

      <div>
        <button
          type="button"
          :disabled="isScanning"
          @click="handleRescan"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0d9488] text-white font-semibold text-xs sm:text-sm hover:bg-[#00685f] transition-all shadow-sm hover:shadow-[#0d9488]/20 cursor-pointer active:scale-98 disabled:opacity-50"
        >
          <span :class="['material-symbols-outlined text-[18px]', isScanning ? 'animate-spin' : '']">
            refresh
          </span>
          <span>{{ isScanning ? "Sedang Memindai..." : "Pindai Ulang" }}</span>
        </button>
      </div>
    </div>

    <!-- Dashboard Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      <!-- Total Potensi Duplikat -->
      <div
        class="bg-white p-6 rounded-2xl border border-[#bcc9c6]/40 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-[#ba1a1a]/40 transition-colors"
      >
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-[#ffdad6] rounded-full blur-xl pointer-events-none"></div>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">warning</span>
          </div>
          <h3 class="text-xs sm:text-sm font-semibold text-[#565e74]">Total Potensi Duplikat</h3>
        </div>
        <div>
          <span class="text-3xl sm:text-4xl font-extrabold text-[#ba1a1a] tracking-tight">
            {{ stats.totalDuplicates }}
          </span>
          <span class="text-xs sm:text-sm text-[#565e74] font-medium ml-2">pasang data anomali</span>
        </div>
      </div>

      <!-- Telah Direview -->
      <div
        class="bg-white p-6 rounded-2xl border border-[#bcc9c6]/40 shadow-xs flex flex-col justify-between group hover:border-[#0d9488]/40 transition-colors"
      >
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-[#ccfbf1] text-[#00685f] flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <h3 class="text-xs sm:text-sm font-semibold text-[#565e74]">Telah Direview</h3>
        </div>
        <div>
          <span class="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
            {{ stats.reviewed }}
          </span>
          <span class="text-xs sm:text-sm text-[#565e74] font-medium ml-2">pasang diselesaikan</span>
        </div>
      </div>

      <!-- Akurasi Sistem -->
      <div
        class="bg-white p-6 rounded-2xl border border-[#bcc9c6]/40 shadow-xs flex flex-col justify-between"
      >
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-xs sm:text-sm font-semibold text-[#565e74]">Akurasi Sistem</h3>
          <span class="material-symbols-outlined text-[#bcc9c6] text-[20px]">info</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative w-16 h-16 shrink-0">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                class="text-[#e5eeff]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
              ></path>
              <path
                class="text-[#0d9488]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                stroke-dasharray="94, 100"
                stroke-width="3"
              ></path>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-xs font-bold text-[#0d9488]">94%</span>
            </div>
          </div>
          <p class="text-xs text-[#565e74] leading-relaxed">
            Kepercayaan rata-rata pada deteksi algoritma pencocokan kemiripan identitas saat ini.
          </p>
        </div>
      </div>
    </div>

    <!-- Antrean Review Duplikat Table -->
    <div class="bg-white rounded-2xl border border-[#bcc9c6]/40 shadow-xs overflow-hidden flex flex-col">
      <!-- Toolbar -->
      <div
        class="p-5 sm:p-6 border-b border-[#bcc9c6]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#f8f9ff]"
      >
        <h2 class="text-base sm:text-lg font-bold text-[#0b1c30]">Antrean Review Duplikat</h2>

        <div class="flex items-center gap-3 w-full sm:w-auto">
          <div class="relative w-full sm:w-64">
            <span
              class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#565e74] text-[18px]"
            >
              search
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari NIK / Nama..."
              class="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] text-[#0b1c30] placeholder-[#565e74]"
            />
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[850px]">
          <thead>
            <tr class="bg-[#eff4ff]/60 border-b border-[#bcc9c6]/30 text-xs font-semibold uppercase tracking-wider text-[#565e74]">
              <th class="p-4 w-12 text-center">No</th>
              <th class="p-4">Nama (Pasangan Potensial)</th>
              <th class="p-4">NIK</th>
              <th class="p-4">Tanggal Lahir</th>
              <th class="p-4">Skor Kemiripan</th>
              <th class="p-4">Status</th>
              <th class="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="text-xs sm:text-sm text-[#0b1c30] divide-y divide-[#bcc9c6]/20">
            <tr
              v-for="(pair, index) in paginatedPairs"
              :key="pair.id"
              :class="[
                'hover:bg-[#eff4ff]/40 transition-colors',
                activeComparison?.id === pair.id ? 'bg-[#f0fdfa]' : ''
              ]"
            >
              <td class="p-4 text-center font-medium text-[#565e74]">{{ index + 1 }}</td>

              <!-- Nama Pair -->
              <td class="p-4">
                <div class="flex flex-col gap-0.5">
                  <span class="font-bold text-[#0d9488]">{{ pair.namaA }}</span>
                  <span class="text-[#565e74]">{{ pair.namaB }}</span>
                </div>
              </td>

              <!-- NIK Pair -->
              <td class="p-4 font-mono">
                <div class="flex flex-col gap-0.5">
                  <span class="font-medium text-[#0b1c30]">{{ pair.nikA }}</span>
                  <span :class="pair.nikMismatch ? 'text-[#ba1a1a] font-semibold' : 'text-[#0b1c30]'">
                    {{ pair.nikB }}
                  </span>
                </div>
              </td>

              <!-- Tanggal Lahir -->
              <td class="p-4 text-[#565e74]">
                <div class="flex flex-col gap-0.5">
                  <span>{{ pair.tglA }}</span>
                  <span :class="pair.tglMismatch ? 'text-[#ba1a1a] font-semibold' : ''">{{ pair.tglB }}</span>
                </div>
              </td>

              <!-- Skor Kemiripan -->
              <td class="p-4">
                <div class="flex items-center gap-2">
                  <span :class="['font-bold text-xs sm:text-sm', pair.similarityColor]">
                    {{ pair.similarity }}%
                  </span>
                  <div class="w-16 h-2 bg-[#e5eeff] rounded-full overflow-hidden">
                    <div
                      :class="['h-full rounded-full', pair.similarityBarColor]"
                      :style="{ width: `${pair.similarity}%` }"
                    ></div>
                  </div>
                </div>
              </td>

              <!-- Status -->
              <td class="p-4">
                <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold', pair.statusBadge]">
                  {{ pair.status }}
                </span>
              </td>

              <!-- Aksi -->
              <td class="p-4 text-right">
                <button
                  type="button"
                  @click="selectForComparison(pair)"
                  class="px-3.5 py-1.5 bg-[#0d9488] text-white rounded-lg text-xs font-semibold hover:bg-[#00685f] transition-all shadow-2xs cursor-pointer active:scale-98"
                >
                  Review
                </button>
              </td>
            </tr>

            <tr v-if="filteredPairs.length === 0">
              <td colspan="7" class="py-12 text-center text-[#565e74]">
                <span class="material-symbols-outlined text-4xl text-[#bcc9c6] mb-2 block">task_alt</span>
                <p class="font-medium">Tidak ada antrean duplikasi yang cocok dengan pencarian.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="p-4 sm:p-5 border-t border-[#bcc9c6]/30 flex justify-between items-center text-xs sm:text-sm text-[#565e74] bg-[#f8f9ff]"
      >
        <span>Menampilkan {{ paginatedPairs.length }} dari {{ filteredPairs.length }} data</span>
        <div class="flex gap-1">
          <button
            type="button"
            :disabled="currentPage === 1"
            @click="currentPage = Math.max(1, currentPage - 1)"
            class="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bcc9c6]/60 hover:bg-white disabled:opacity-40"
          >
            <span class="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button
            v-for="p in totalPages"
            :key="p"
            type="button"
            @click="currentPage = p"
            :class="[
              'w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold',
              currentPage === p ? 'bg-[#0d9488] text-white' : 'border border-[#bcc9c6]/60 hover:bg-white text-[#0b1c30]'
            ]"
          >
            {{ p }}
          </button>
          <button
            type="button"
            :disabled="currentPage === totalPages"
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            class="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bcc9c6]/60 hover:bg-white disabled:opacity-40"
          >
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

    <!-- COMPARISON WORKBENCH (Active State) -->
    <div
      v-if="activeComparison"
      class="bg-white rounded-2xl border-2 border-[#0d9488] shadow-xl overflow-hidden relative"
    >
      <div class="h-1.5 bg-[#0d9488] w-full"></div>
      <!-- Workbench Header -->
      <div class="p-5 sm:p-6 border-b border-[#bcc9c6]/30 flex justify-between items-center bg-[#f0fdfa]/60">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-[#0d9488]/10 text-[#0d9488] flex items-center justify-center">
            <span class="material-symbols-outlined text-[24px]">compare_arrows</span>
          </div>
          <div>
            <h2 class="text-base sm:text-lg font-bold text-[#0b1c30]">Mode Komparasi Aktif</h2>
            <p class="text-xs sm:text-sm text-[#565e74]">
              Bandingkan atribut secara berdampingan untuk mengambil keputusan validasi data.
            </p>
          </div>
        </div>
        <button
          type="button"
          @click="closeComparison"
          class="text-[#565e74] hover:text-[#ba1a1a] p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
          title="Tutup Mode Komparasi"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Side-by-Side Comparison Cards -->
      <div class="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Record A -->
        <div
          :class="[
            'border-2 rounded-2xl p-6 relative transition-all',
            keepRecord === 'A' ? 'border-[#0d9488] bg-[#f0fdfa]/30' : 'border-[#bcc9c6]/50 bg-white'
          ]"
        >
          <div
            class="absolute -top-3 left-4 bg-white px-2.5 py-0.5 rounded-md border border-[#bcc9c6]/40 text-[11px] font-bold uppercase tracking-wider text-[#0d9488]"
          >
            Data A (Utama)
          </div>

          <div class="space-y-3.5 mt-2">
            <div class="grid grid-cols-3 gap-2 border-b border-[#bcc9c6]/20 pb-2.5">
              <span class="text-xs font-semibold text-[#565e74]">NAMA LENGKAP</span>
              <span class="text-xs sm:text-sm font-bold text-[#0b1c30] col-span-2">
                {{ activeComparison.namaA }}
              </span>
            </div>

            <div
              :class="[
                'grid grid-cols-3 gap-2 border-b border-[#bcc9c6]/20 pb-2.5 pt-1 rounded px-2 -mx-2',
                activeComparison.nikMismatch ? 'bg-[#ffdad6]/20' : ''
              ]"
            >
              <span class="text-xs font-semibold text-[#565e74]">NIK</span>
              <span class="text-xs sm:text-sm font-mono font-bold text-[#0b1c30] col-span-2">
                {{ activeComparison.nikA }}
              </span>
            </div>

            <div class="grid grid-cols-3 gap-2 border-b border-[#bcc9c6]/20 pb-2.5">
              <span class="text-xs font-semibold text-[#565e74]">TEMPAT LHR</span>
              <span class="text-xs sm:text-sm text-[#0b1c30] col-span-2">{{ activeComparison.tempatA }}</span>
            </div>

            <div class="grid grid-cols-3 gap-2 border-b border-[#bcc9c6]/20 pb-2.5">
              <span class="text-xs font-semibold text-[#565e74]">TANGGAL LHR</span>
              <span class="text-xs sm:text-sm text-[#0b1c30] col-span-2">{{ activeComparison.tglA }}</span>
            </div>

            <div class="grid grid-cols-3 gap-2">
              <span class="text-xs font-semibold text-[#565e74]">ALAMAT</span>
              <span class="text-xs sm:text-sm text-[#0b1c30] col-span-2 leading-relaxed">
                {{ activeComparison.alamatA }}
              </span>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-[#bcc9c6]/30 flex justify-center">
            <label class="flex items-center gap-2 cursor-pointer font-semibold text-xs sm:text-sm text-[#0b1c30]">
              <input
                type="radio"
                value="A"
                v-model="keepRecord"
                class="text-[#0d9488] focus:ring-[#0d9488] h-4 w-4"
              />
              <span>Jadikan Data Utama</span>
            </label>
          </div>
        </div>

        <!-- Record B -->
        <div
          :class="[
            'border-2 rounded-2xl p-6 relative transition-all',
            keepRecord === 'B' ? 'border-[#0d9488] bg-[#f0fdfa]/30' : 'border-[#bcc9c6]/50 bg-white'
          ]"
        >
          <div
            class="absolute -top-3 left-4 bg-white px-2.5 py-0.5 rounded-md border border-[#bcc9c6]/40 text-[11px] font-bold uppercase tracking-wider text-[#825100]"
          >
            Data B (Potensi Duplikat)
          </div>

          <div class="space-y-3.5 mt-2">
            <div class="grid grid-cols-3 gap-2 border-b border-[#bcc9c6]/20 pb-2.5">
              <span class="text-xs font-semibold text-[#565e74]">NAMA LENGKAP</span>
              <span class="text-xs sm:text-sm font-bold text-[#0b1c30] col-span-2">
                {{ activeComparison.namaB }}
              </span>
            </div>

            <div
              :class="[
                'grid grid-cols-3 gap-2 border-b border-[#bcc9c6]/20 pb-2.5 pt-1 rounded px-2 -mx-2 relative',
                activeComparison.nikMismatch ? 'bg-[#ffdad6]/40' : ''
              ]"
            >
              <span class="text-xs font-semibold text-[#565e74]">NIK</span>
              <div class="col-span-2 flex items-center justify-between">
                <span
                  :class="[
                    'text-xs sm:text-sm font-mono font-bold',
                    activeComparison.nikMismatch ? 'text-[#ba1a1a]' : 'text-[#0b1c30]'
                  ]"
                >
                  {{ activeComparison.nikB }}
                </span>
                <span v-if="activeComparison.nikMismatch" class="material-symbols-outlined text-[#ba1a1a] text-[18px]">
                  error
                </span>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-2 border-b border-[#bcc9c6]/20 pb-2.5">
              <span class="text-xs font-semibold text-[#565e74]">TEMPAT LHR</span>
              <span class="text-xs sm:text-sm text-[#0b1c30] col-span-2">{{ activeComparison.tempatB }}</span>
            </div>

            <div
              :class="[
                'grid grid-cols-3 gap-2 border-b border-[#bcc9c6]/20 pb-2.5 pt-1 rounded px-2 -mx-2',
                activeComparison.tglMismatch ? 'bg-[#ffdad6]/40 text-[#ba1a1a] font-semibold' : ''
              ]"
            >
              <span class="text-xs font-semibold text-[#565e74]">TANGGAL LHR</span>
              <span class="text-xs sm:text-sm col-span-2">{{ activeComparison.tglB }}</span>
            </div>

            <div class="grid grid-cols-3 gap-2">
              <span class="text-xs font-semibold text-[#565e74]">ALAMAT</span>
              <span class="text-xs sm:text-sm text-[#0b1c30] col-span-2 leading-relaxed">
                {{ activeComparison.alamatB }}
              </span>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-[#bcc9c6]/30 flex justify-center">
            <label class="flex items-center gap-2 cursor-pointer font-semibold text-xs sm:text-sm text-[#0b1c30]">
              <input
                type="radio"
                value="B"
                v-model="keepRecord"
                class="text-[#0d9488] focus:ring-[#0d9488] h-4 w-4"
              />
              <span>Jadikan Data Utama</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="p-6 bg-[#f8f9ff] border-t border-[#bcc9c6]/40 flex flex-wrap justify-between items-center gap-4">
        <div class="flex items-center gap-4">
          <div class="text-center">
            <div class="text-3xl font-extrabold text-[#ba1a1a] leading-none">
              {{ activeComparison.similarity }}%
            </div>
            <div class="text-[11px] font-bold text-[#565e74] uppercase tracking-wider mt-1">
              SKOR KEMIRIPAN
            </div>
          </div>
          <div class="h-10 w-px bg-[#bcc9c6]/40 hidden sm:block"></div>
          <p class="text-xs text-[#565e74] max-w-sm hidden sm:block">
            Sistem mendeteksi tingkat kemiripan sangat tinggi berdasarkan kecocokan NIK, Nama, dan Tanggal Lahir.
          </p>
        </div>

        <div class="flex gap-3 w-full sm:w-auto">
          <button
            type="button"
            @click="handleMarkNotDuplicate"
            class="flex-1 sm:flex-none px-5 py-2.5 border border-[#bcc9c6] text-[#0b1c30] rounded-xl text-xs sm:text-sm font-semibold hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span class="material-symbols-outlined text-[18px]">verified</span>
            <span>Tandai Bukan Duplikat</span>
          </button>

          <button
            type="button"
            @click="handleMergeRecords"
            class="flex-1 sm:flex-none px-5 py-2.5 bg-[#0d9488] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#00685f] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span class="material-symbols-outlined text-[18px]">call_merge</span>
            <span>Gabungkan Data</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
