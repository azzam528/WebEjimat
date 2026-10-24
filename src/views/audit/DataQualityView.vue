<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["goToDuplicate"]);

// Filters State
const selectedDusun = ref("Semua Dusun");
const selectedRw = ref("Semua RW");
const selectedStatus = ref("Semua Status");
const selectedPeriod = ref("2023-09");

// Dusun Options
const dusunOptions = [
  "Semua Dusun",
  "Dusun Cimenyan",
  "Dusun Padasuka",
  "Dusun Ciburial",
  "Dusun Cikadut",
  "Dusun Mandala Mekar",
  "Dusun Mekarsaluyu",
  "Dusun Sindanglaya",
  "Dusun Cibeunying",
];

// Summary Statistics
const stats = ref({
  score: 87.4,
  scoreGrowth: "+6.4% dari April",
  duplicateCount: 142,
  duplicatePercent: 15,
  incompleteCount: 358,
  incompletePercent: 35,
  invalidCount: 89,
  invalidPercent: 8,
});

// Issues Breakdown
const issues = ref([
  { label: "Data Hilang (NIK / Alamat)", count: 358, percent: 75, color: "bg-[#825100]" },
  { label: "Data Ganda (Potensi Duplikat)", count: 142, percent: 45, color: "bg-[#ba1a1a]" },
  { label: "Format Tidak Valid (Tanggal / No. KK)", count: 64, percent: 20, color: "bg-[#565e74]" },
  { label: "Data Tidak Konsisten (RT / Dusun)", count: 25, percent: 10, color: "bg-[#0d9488]" },
]);

// Trend Data for 6 Months
const trendMonths = [
  { month: "Apr", score: 72, x: 0, y: 70 },
  { month: "Mei", score: 75, x: 20, y: 65 },
  { month: "Jun", score: 78, x: 40, y: 55 },
  { month: "Jul", score: 82, x: 60, y: 40 },
  { month: "Agu", score: 85, x: 80, y: 30 },
  { month: "Sep", score: 87.4, x: 100, y: 20 },
];

const hoveredMonth = ref(trendMonths[5]);

// Apply Filter Toast
const isFiltered = ref(false);
const handleApplyFilter = () => {
  isFiltered.value = true;
  setTimeout(() => {
    isFiltered.value = false;
  }, 2500);
};
</script>

<template>
  <div class="space-y-6 sm:space-y-8">
    <!-- Filter Bar -->
    <div
      class="bg-white rounded-2xl p-4 sm:p-5 border border-[#bcc9c6]/40 shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-end justify-between"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-1">
        <!-- Dusun Filter -->
        <div>
          <label class="block text-xs font-semibold text-[#565e74] mb-1">Dusun</label>
          <div class="relative">
            <select
              v-model="selectedDusun"
              class="w-full appearance-none bg-white border border-[#bcc9c6]/60 rounded-xl px-3.5 py-2 pr-9 text-xs sm:text-sm text-[#0b1c30] focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] outline-none"
            >
              <option v-for="d in dusunOptions" :key="d" :value="d">{{ d }}</option>
            </select>
            <span
              class="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#565e74] pointer-events-none text-[20px]"
            >
              arrow_drop_down
            </span>
          </div>
        </div>

        <!-- RW Filter -->
        <div>
          <label class="block text-xs font-semibold text-[#565e74] mb-1">Rukun Warga (RW)</label>
          <div class="relative">
            <select
              v-model="selectedRw"
              class="w-full appearance-none bg-white border border-[#bcc9c6]/60 rounded-xl px-3.5 py-2 pr-9 text-xs sm:text-sm text-[#0b1c30] focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] outline-none"
            >
              <option value="Semua RW">Semua RW</option>
              <option v-for="n in 23" :key="n" :value="`RW ${String(n).padStart(2, '0')}`">
                RW {{ String(n).padStart(2, '0') }}
              </option>
            </select>
            <span
              class="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#565e74] pointer-events-none text-[20px]"
            >
              arrow_drop_down
            </span>
          </div>
        </div>

        <!-- Status Filter -->
        <div>
          <label class="block text-xs font-semibold text-[#565e74] mb-1">Status Validasi</label>
          <div class="relative">
            <select
              v-model="selectedStatus"
              class="w-full appearance-none bg-white border border-[#bcc9c6]/60 rounded-xl px-3.5 py-2 pr-9 text-xs sm:text-sm text-[#0b1c30] focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] outline-none"
            >
              <option value="Semua Status">Semua Status</option>
              <option value="Valid">Valid (SIAK)</option>
              <option value="Invalid">Belum Valid / Anomali</option>
            </select>
            <span
              class="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#565e74] pointer-events-none text-[20px]"
            >
              arrow_drop_down
            </span>
          </div>
        </div>

        <!-- Date Filter -->
        <div>
          <label class="block text-xs font-semibold text-[#565e74] mb-1">Periode Evaluasi</label>
          <input
            v-model="selectedPeriod"
            type="month"
            class="w-full bg-white border border-[#bcc9c6]/60 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#0b1c30] focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] outline-none"
          />
        </div>
      </div>

      <button
        type="button"
        @click="handleApplyFilter"
        class="w-full md:w-auto px-5 py-2.5 bg-[#0d9488] text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#00685f] transition-all shadow-sm active:scale-98 cursor-pointer shrink-0"
      >
        <span class="material-symbols-outlined text-[18px]">filter_list</span>
        <span>Terapkan Filter</span>
      </button>
    </div>

    <!-- Filter confirmation banner -->
    <div
      v-if="isFiltered"
      class="p-3 bg-[#ccfbf1] text-[#00685f] rounded-xl text-xs font-semibold flex items-center gap-2 border border-[#0d9488]/30"
    >
      <span class="material-symbols-outlined text-[18px]">check_circle</span>
      <span>Menampilkan parameter data kualitas untuk {{ selectedDusun }}, {{ selectedRw }}, Periode {{ selectedPeriod }}.</span>
    </div>

    <!-- Bento Grid Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <!-- Quality Score Card -->
      <div
        class="bg-white rounded-2xl p-6 border border-[#bcc9c6]/40 shadow-xs relative overflow-hidden flex flex-col justify-between h-[170px] group hover:border-[#0d9488]/40 transition-colors"
      >
        <div class="absolute -right-6 -top-6 w-32 h-32 bg-[#0d9488]/10 rounded-full group-hover:scale-115 transition-transform duration-500 pointer-events-none"></div>
        <div class="relative z-10 flex justify-between items-start">
          <div>
            <h3 class="text-xs sm:text-sm font-semibold text-[#565e74]">Skor Kualitas</h3>
            <div class="mt-2 flex items-baseline gap-1">
              <span class="text-3xl sm:text-4xl font-extrabold text-[#0d9488] tracking-tight">
                {{ stats.score }}
              </span>
              <span class="text-xl font-bold text-[#0d9488]">%</span>
            </div>
          </div>
          <div class="w-10 h-10 rounded-xl bg-[#ccfbf1] text-[#00685f] flex items-center justify-center">
            <span class="material-symbols-outlined text-[22px]">verified</span>
          </div>
        </div>
        <div class="relative z-10 flex items-center gap-1.5 text-[#00685f] bg-[#ccfbf1] w-fit px-2.5 py-1 rounded-lg text-xs font-semibold mt-auto">
          <span class="material-symbols-outlined text-[14px]">trending_up</span>
          <span>{{ stats.scoreGrowth }}</span>
        </div>
      </div>

      <!-- Duplicate Records Card (Clickable to jump to Duplicate Detection) -->
      <div
        class="bg-white rounded-2xl p-6 border border-[#bcc9c6]/40 shadow-xs flex flex-col justify-between h-[170px] hover:border-[#ba1a1a]/40 transition-all cursor-pointer group"
        @click="emit('goToDuplicate')"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-xs sm:text-sm font-semibold text-[#565e74]">Data Ganda</h3>
            <div class="mt-2">
              <span class="text-3xl sm:text-4xl font-extrabold text-[#ba1a1a] tracking-tight">
                {{ stats.duplicateCount }}
              </span>
            </div>
          </div>
          <div class="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
            <span class="material-symbols-outlined text-[22px]">file_copy</span>
          </div>
        </div>
        <div>
          <div class="w-full bg-[#e5eeff] rounded-full h-2 overflow-hidden">
            <div class="bg-[#ba1a1a] h-2 rounded-full" :style="{ width: `${stats.duplicatePercent}%` }"></div>
          </div>
          <span class="text-[11px] font-semibold text-[#ba1a1a] mt-1.5 flex items-center justify-between">
            <span>Klik untuk review duplikat</span>
            <span class="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </span>
        </div>
      </div>

      <!-- Incomplete Records Card -->
      <div
        class="bg-white rounded-2xl p-6 border border-[#bcc9c6]/40 shadow-xs flex flex-col justify-between h-[170px] hover:border-[#825100]/40 transition-colors"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-xs sm:text-sm font-semibold text-[#565e74]">Data Tidak Lengkap</h3>
            <div class="mt-2">
              <span class="text-3xl sm:text-4xl font-extrabold text-[#825100] tracking-tight">
                {{ stats.incompleteCount }}
              </span>
            </div>
          </div>
          <div class="w-10 h-10 rounded-xl bg-[#ffddb8]/50 text-[#825100] flex items-center justify-center">
            <span class="material-symbols-outlined text-[22px]">rule_folder</span>
          </div>
        </div>
        <div>
          <div class="w-full bg-[#e5eeff] rounded-full h-2 overflow-hidden">
            <div class="bg-[#825100] h-2 rounded-full" :style="{ width: `${stats.incompletePercent}%` }"></div>
          </div>
          <span class="text-[11px] text-[#565e74] mt-1.5 block">Kolom NIK/Ibu kandung kosong</span>
        </div>
      </div>

      <!-- Invalid Records Card -->
      <div
        class="bg-white rounded-2xl p-6 border border-[#bcc9c6]/40 shadow-xs flex flex-col justify-between h-[170px] hover:border-[#565e74]/40 transition-colors"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-xs sm:text-sm font-semibold text-[#565e74]">Data Tidak Valid</h3>
            <div class="mt-2">
              <span class="text-3xl sm:text-4xl font-extrabold text-[#565e74] tracking-tight">
                {{ stats.invalidCount }}
              </span>
            </div>
          </div>
          <div class="w-10 h-10 rounded-xl bg-[#dae2fd]/60 text-[#565e74] flex items-center justify-center">
            <span class="material-symbols-outlined text-[22px]">block</span>
          </div>
        </div>
        <div>
          <div class="w-full bg-[#e5eeff] rounded-full h-2 overflow-hidden">
            <div class="bg-[#565e74] h-2 rounded-full" :style="{ width: `${stats.invalidPercent}%` }"></div>
          </div>
          <span class="text-[11px] text-[#565e74] mt-1.5 block">Panjang digit NIK/KK tidak standar</span>
        </div>
      </div>
    </div>

    <!-- Charts Section: Line Trend & Issues Bar -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Line Chart: Trend over 6 months -->
      <div
        class="lg:col-span-2 bg-white rounded-2xl border border-[#bcc9c6]/40 shadow-xs p-6 flex flex-col h-[400px]"
      >
        <div class="flex justify-between items-center mb-4">
          <div>
            <h3 class="text-base sm:text-lg font-bold text-[#0b1c30]">Tren Skor Kualitas</h3>
            <p class="text-xs sm:text-sm text-[#565e74]">April - September 2023</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-[#0d9488]"></span>
            <span class="text-xs font-semibold text-[#0b1c30]">Skor Validitas</span>
          </div>
        </div>

        <!-- SVG Line Chart Area -->
        <div class="flex-1 w-full relative pt-4 pb-2">
          <!-- Y-Axis Labels -->
          <div class="absolute left-0 top-0 bottom-8 w-10 flex flex-col justify-between text-right pr-2 text-xs font-semibold text-[#565e74]/70">
            <span>100%</span>
            <span>90%</span>
            <span>80%</span>
            <span>70%</span>
          </div>

          <!-- Graph Canvas -->
          <div class="absolute left-12 right-2 top-2 bottom-8 border-l border-b border-[#bcc9c6]/30 relative">
            <!-- Grid Lines -->
            <div class="absolute w-full top-0 border-t border-[#bcc9c6]/20 border-dashed"></div>
            <div class="absolute w-full top-1/3 border-t border-[#bcc9c6]/20 border-dashed"></div>
            <div class="absolute w-full top-2/3 border-t border-[#bcc9c6]/20 border-dashed"></div>

            <!-- SVG Vector Area & Path -->
            <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="qualityGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stop-color="#0d9488" stop-opacity="0.25"></stop>
                  <stop offset="100%" stop-color="#0d9488" stop-opacity="0.0"></stop>
                </linearGradient>
              </defs>

              <!-- Filled Area -->
              <path
                d="M0,70 L20,65 L40,55 L60,40 L80,30 L100,20 L100,100 L0,100 Z"
                fill="url(#qualityGradient)"
              ></path>

              <!-- Line -->
              <path
                d="M0,70 L20,65 L40,55 L60,40 L80,30 L100,20"
                fill="none"
                stroke="#0d9488"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
              ></path>

              <!-- Data Points -->
              <circle
                v-for="(p, i) in trendMonths"
                :key="p.month"
                :cx="p.x"
                :cy="p.y"
                :r="i === 5 ? 3 : 2"
                :fill="i === 5 ? '#0d9488' : '#ffffff'"
                stroke="#0d9488"
                :stroke-width="i === 5 ? 2 : 1.5"
                class="cursor-pointer hover:r-4 transition-all"
                @mouseenter="hoveredMonth = p"
              ></circle>
            </svg>

            <!-- Active Point Tooltip -->
            <div
              v-if="hoveredMonth"
              class="absolute z-20 -translate-x-1/2 -translate-y-[130%] bg-[#0b1c30] text-white px-2.5 py-1 rounded-lg shadow-md text-xs font-bold pointer-events-none transition-all duration-200"
              :style="{ left: `${hoveredMonth.x}%`, top: `${hoveredMonth.y}%` }"
            >
              {{ hoveredMonth.month }}: {{ hoveredMonth.score }}%
              <div
                class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-[4px] border-transparent border-t-[#0b1c30]"
              ></div>
            </div>
          </div>

          <!-- X-Axis Labels -->
          <div class="absolute left-12 right-2 bottom-0 h-6 flex justify-between items-end text-xs font-semibold text-[#565e74]">
            <span v-for="m in trendMonths" :key="m.month">{{ m.month }}</span>
          </div>
        </div>
      </div>

      <!-- Bar Chart: Issues by Category -->
      <div
        class="bg-white rounded-2xl border border-[#bcc9c6]/40 shadow-xs p-6 flex flex-col justify-between h-[400px]"
      >
        <div>
          <h3 class="text-base sm:text-lg font-bold text-[#0b1c30] mb-1">Masalah Kualitas</h3>
          <p class="text-xs sm:text-sm text-[#565e74] mb-6">Distribusi jenis anomali data warga</p>

          <div class="space-y-5">
            <div v-for="iss in issues" :key="iss.label">
              <div class="flex justify-between text-xs font-semibold mb-1.5">
                <span class="text-[#0b1c30]">{{ iss.label }}</span>
                <span class="text-[#565e74] font-bold">{{ iss.count }} entri</span>
              </div>
              <div class="w-full bg-[#e5eeff] rounded-full h-2.5 overflow-hidden">
                <div
                  :class="[iss.color, 'h-2.5 rounded-full transition-all duration-500']"
                  :style="{ width: `${iss.percent}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-[#bcc9c6]/30">
          <button
            type="button"
            @click="emit('goToDuplicate')"
            class="w-full py-2.5 px-4 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0d9488] font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span class="material-symbols-outlined text-[18px]">manage_search</span>
            <span>Buka Modul Deteksi Data Duplikat &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
