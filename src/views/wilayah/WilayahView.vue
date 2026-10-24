<script setup>
import { ref, computed } from "vue";
import cimenyanMap from "@/assets/images/cimenyan-map.png";

// View mode state for Visualization section
const viewMode = ref("map"); // 'map' | 'chart'

// Search and Filter State
const searchQuery = ref("");
const statusFilter = ref("all");
const currentPage = ref(1);
const itemsPerPage = 5;

// Selected Dusun for Detail Modal
const selectedDusun = ref(null);
const isDetailModalOpen = ref(false);

// Add Wilayah Modal State
const isAddModalOpen = ref(false);
const newWilayah = ref({
  nama: "",
  kode: "",
  kepalaDusun: "",
  telepon: "",
  jumlahRw: 1,
  jumlahRt: 1,
  populasi: 0,
});

// Toast notification state
const toastMessage = ref("");
const showToast = ref(false);
const triggerToast = (msg) => {
  toastMessage.value = msg;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// Hierarchy Overview Cards
const hierarchySummary = ref({
  totalPenduduk: "18.240",
  growth: "+2.4% tahun ini",
  dusunCount: 8,
  rwCount: 23,
  rtCount: 83,
});

// Complete Data List of 8 Dusun in Desa Cimenyan
const dusunList = ref([
  {
    id: 1,
    nama: "Dusun Cimenyan",
    kode: "32.04.14.2001.01",
    rw: 4,
    rt: 15,
    populasi: 3450,
    persentaseBar: 85,
    status: "Valid",
    akurasi: 98,
    statusType: "success",
    kepalaDusun: "Agus Setiawan, S.Sos",
    telepon: "0812-3456-7890",
    kk: 1042,
    pria: 1750,
    wanita: 1700,
    // coordinates for map marker pins (% relative to map canvas)
    pinX: 48,
    pinY: 42,
    rwList: [
      { nomor: "RW 01", ketua: "H. Sukarna", rtCount: 4, penduduk: 920 },
      { nomor: "RW 02", ketua: "Dadan Ramdani", rtCount: 4, penduduk: 880 },
      { nomor: "RW 03", ketua: "Asep Sunandar", rtCount: 4, penduduk: 850 },
      { nomor: "RW 04", ketua: "Yayat Ruhiyat", rtCount: 3, penduduk: 800 },
    ],
  },
  {
    id: 2,
    nama: "Dusun Padasuka",
    kode: "32.04.14.2001.02",
    rw: 3,
    rt: 12,
    populasi: 2890,
    persentaseBar: 70,
    status: "Valid",
    akurasi: 95,
    statusType: "success",
    kepalaDusun: "Dedi Supriadi",
    telepon: "0813-9876-5432",
    kk: 865,
    pria: 1460,
    wanita: 1430,
    pinX: 32,
    pinY: 60,
    rwList: [
      { nomor: "RW 05", ketua: "Ujang Koswara", rtCount: 4, penduduk: 980 },
      { nomor: "RW 06", ketua: "Rahmat Hidayat", rtCount: 4, penduduk: 960 },
      { nomor: "RW 07", ketua: "Cecep Sopandi", rtCount: 4, penduduk: 950 },
    ],
  },
  {
    id: 3,
    nama: "Dusun Ciburial",
    kode: "32.04.14.2001.03",
    rw: 3,
    rt: 10,
    populasi: 2100,
    persentaseBar: 55,
    status: "Revisi",
    akurasi: 82,
    statusType: "warning",
    kepalaDusun: "Hendra Gunawan",
    telepon: "0821-4567-8910",
    kk: 630,
    pria: 1060,
    wanita: 1040,
    pinX: 25,
    pinY: 30,
    rwList: [
      { nomor: "RW 08", ketua: "Tatang Sutisna", rtCount: 3, penduduk: 710 },
      { nomor: "RW 09", ketua: "Endang Sujana", rtCount: 4, penduduk: 740 },
      { nomor: "RW 10", ketua: "Wawan Kurnia", rtCount: 3, penduduk: 650 },
    ],
  },
  {
    id: 4,
    nama: "Dusun Cikadut",
    kode: "32.04.14.2001.04",
    rw: 3,
    rt: 11,
    populasi: 2650,
    persentaseBar: 65,
    status: "Valid",
    akurasi: 97,
    statusType: "success",
    kepalaDusun: "M. Ridwan Kurniawan",
    telepon: "0852-1122-3344",
    kk: 780,
    pria: 1340,
    wanita: 1310,
    pinX: 68,
    pinY: 35,
    rwList: [
      { nomor: "RW 11", ketua: "Ade Sobarna", rtCount: 4, penduduk: 900 },
      { nomor: "RW 12", ketua: "Kuswandi", rtCount: 4, penduduk: 890 },
      { nomor: "RW 13", ketua: "Bambang Irawan", rtCount: 3, penduduk: 860 },
    ],
  },
  {
    id: 5,
    nama: "Dusun Mandala Mekar",
    kode: "32.04.14.2001.05",
    rw: 3,
    rt: 10,
    populasi: 2340,
    persentaseBar: 58,
    status: "Valid",
    akurasi: 96,
    statusType: "success",
    kepalaDusun: "Tatang Suryana",
    telepon: "0877-6655-4433",
    kk: 710,
    pria: 1190,
    wanita: 1150,
    pinX: 72,
    pinY: 65,
    rwList: [
      { nomor: "RW 14", ketua: "Ahmad Junaedi", rtCount: 3, penduduk: 780 },
      { nomor: "RW 15", ketua: "Dudung Somantri", rtCount: 4, penduduk: 810 },
      { nomor: "RW 16", ketua: "Ilyas Bahar", rtCount: 3, penduduk: 750 },
    ],
  },
  {
    id: 6,
    nama: "Dusun Mekarsaluyu",
    kode: "32.04.14.2001.06",
    rw: 2,
    rt: 8,
    populasi: 1780,
    persentaseBar: 44,
    status: "Valid",
    akurasi: 94,
    statusType: "success",
    kepalaDusun: "Asep Wahyudi, S.Pd",
    telepon: "0819-8877-6655",
    kk: 520,
    pria: 900,
    wanita: 880,
    pinX: 52,
    pinY: 72,
    rwList: [
      { nomor: "RW 17", ketua: "Dadan Suhendar", rtCount: 4, penduduk: 910 },
      { nomor: "RW 18", ketua: "Kurnaedi", rtCount: 4, penduduk: 870 },
    ],
  },
  {
    id: 7,
    nama: "Dusun Sindanglaya",
    kode: "32.04.14.2001.07",
    rw: 3,
    rt: 9,
    populasi: 1950,
    persentaseBar: 48,
    status: "Valid",
    akurasi: 93,
    statusType: "success",
    kepalaDusun: "Yayan Sopyan",
    telepon: "0822-3344-5566",
    kk: 590,
    pria: 990,
    wanita: 960,
    pinX: 82,
    pinY: 48,
    rwList: [
      { nomor: "RW 19", ketua: "Entis Sutisna", rtCount: 3, penduduk: 650 },
      { nomor: "RW 20", ketua: "Mulyadi", rtCount: 3, penduduk: 660 },
      { nomor: "RW 21", ketua: "Samsul Hadi", rtCount: 3, penduduk: 640 },
    ],
  },
  {
    id: 8,
    nama: "Dusun Cibeunying",
    kode: "32.04.14.2001.08",
    rw: 2,
    rt: 8,
    populasi: 1080,
    persentaseBar: 32,
    status: "Revisi",
    akurasi: 86,
    statusType: "warning",
    kepalaDusun: "Iwan Hermawan",
    telepon: "0838-1234-5678",
    kk: 320,
    pria: 550,
    wanita: 530,
    pinX: 18,
    pinY: 52,
    rwList: [
      { nomor: "RW 22", ketua: "Nana Suryana", rtCount: 4, penduduk: 560 },
      { nomor: "RW 23", ketua: "Eman Suherman", rtCount: 4, penduduk: 520 },
    ],
  },
]);

// Filtered Dusun Records
const filteredDusunList = computed(() => {
  let list = dusunList.value;

  if (statusFilter.value !== "all") {
    list = list.filter((d) => d.status.toLowerCase() === statusFilter.value.toLowerCase());
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(
      (d) =>
        d.nama.toLowerCase().includes(q) ||
        d.kode.toLowerCase().includes(q) ||
        d.kepalaDusun.toLowerCase().includes(q)
    );
  }

  return list;
});

// Pagination
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredDusunList.value.length / itemsPerPage))
);

const paginatedDusunList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredDusunList.value.slice(start, start + itemsPerPage);
});

const setPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Open Detail Modal
const openDetail = (dusun) => {
  selectedDusun.value = dusun;
  isDetailModalOpen.value = true;
};

// Handle Add Wilayah
const handleAddWilayah = () => {
  if (!newWilayah.value.nama || !newWilayah.value.kode) {
    alert("Harap lengkapi nama dan kode dusun.");
    return;
  }

  const nextId = dusunList.value.length + 1;
  const createdDusun = {
    id: nextId,
    nama: newWilayah.value.nama,
    kode: newWilayah.value.kode,
    rw: Number(newWilayah.value.jumlahRw) || 1,
    rt: Number(newWilayah.value.jumlahRt) || 1,
    populasi: Number(newWilayah.value.populasi) || 0,
    persentaseBar: Math.min(100, Math.round(((Number(newWilayah.value.populasi) || 0) / 4000) * 100)),
    status: "Valid",
    akurasi: 100,
    statusType: "success",
    kepalaDusun: newWilayah.value.kepalaDusun || "Belum ditentukan",
    telepon: newWilayah.value.telepon || "-",
    kk: Math.round((Number(newWilayah.value.populasi) || 0) / 3.2),
    pria: Math.round((Number(newWilayah.value.populasi) || 0) * 0.51),
    wanita: Math.round((Number(newWilayah.value.populasi) || 0) * 0.49),
    pinX: Math.floor(Math.random() * 60) + 20,
    pinY: Math.floor(Math.random() * 60) + 20,
    rwList: [
      {
        nomor: `RW ${dusunList.value.reduce((acc, d) => acc + d.rw, 1)}`,
        ketua: "Ketua RW Terpilih",
        rtCount: Number(newWilayah.value.jumlahRt) || 1,
        penduduk: Number(newWilayah.value.populasi) || 0,
      },
    ],
  };

  dusunList.value.push(createdDusun);
  hierarchySummary.value.dusunCount += 1;
  hierarchySummary.value.rwCount += createdDusun.rw;
  hierarchySummary.value.rtCount += createdDusun.rt;

  isAddModalOpen.value = false;
  newWilayah.value = {
    nama: "",
    kode: "",
    kepalaDusun: "",
    telepon: "",
    jumlahRw: 1,
    jumlahRt: 1,
    populasi: 0,
  };

  triggerToast(`Wilayah "${createdDusun.nama}" berhasil ditambahkan.`);
};

// Export to CSV
const handleExport = () => {
  const headers = ["Nama Dusun", "Kode Wilayah", "Kepala Dusun", "Jumlah RW", "Jumlah RT", "Populasi", "Status Data", "Akurasi"];
  const rows = dusunList.value.map((d) => [
    `"${d.nama}"`,
    `"${d.kode}"`,
    `"${d.kepalaDusun}"`,
    d.rw,
    d.rt,
    d.populasi,
    `"${d.status}"`,
    `"${d.akurasi}%"`,
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `wilayah_desa_cimenyan_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  triggerToast("Data wilayah berhasil diekspor ke format CSV.");
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
        class="fixed top-20 right-6 z-50 flex items-center gap-3 bg-[#0b1c30] text-white px-4 py-3 rounded-xl shadow-xl border border-teal-500/30 text-sm font-medium"
      >
        <span class="material-symbols-outlined text-teal-400 text-lg">check_circle</span>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>

    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight mb-1">
          Hierarki Wilayah
        </h1>
        <p class="text-sm sm:text-base text-[#565e74]">
          Data struktur administratif Desa Cimenyan (Dusun, RW, dan RT).
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="handleExport"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#bcc9c6]/80 text-[#0b1c30] bg-white font-medium text-xs sm:text-sm hover:bg-[#eff4ff] hover:border-[#0d9488]/40 transition-all shadow-xs cursor-pointer active:scale-98"
        >
          <span class="material-symbols-outlined text-[18px] text-[#565e74]">download</span>
          <span>Ekspor</span>
        </button>

        <button
          type="button"
          @click="isAddModalOpen = true"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0d9488] text-white font-semibold text-xs sm:text-sm hover:bg-[#00685f] transition-all shadow-sm hover:shadow-[#0d9488]/20 cursor-pointer active:scale-98"
        >
          <span class="material-symbols-outlined text-[18px]">add</span>
          <span>Tambah Wilayah</span>
        </button>
      </div>
    </div>

    <!-- Summary Bento Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <!-- Total Penduduk Card -->
      <div
        class="bg-white border border-[#bcc9c6]/40 rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col justify-between"
      >
        <div class="absolute -right-6 -top-6 w-32 h-32 bg-[#0d9488]/10 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <div class="flex items-center gap-2 text-[#565e74] mb-2 font-medium text-xs sm:text-sm">
            <span class="material-symbols-outlined text-[#0d9488] text-[20px]">groups</span>
            <span>Total Penduduk</span>
          </div>
          <div class="text-3xl sm:text-4xl font-extrabold text-[#0d9488] tracking-tight">
            {{ hierarchySummary.totalPenduduk }}
          </div>
          <div class="text-xs text-[#565e74] mt-2 flex items-center gap-1 font-medium">
            <span class="material-symbols-outlined text-xs text-[#0d9488] font-bold">trending_up</span>
            <span>{{ hierarchySummary.growth }}</span>
          </div>
        </div>
      </div>

      <!-- Dusun Card -->
      <div
        class="bg-white border border-[#bcc9c6]/40 rounded-2xl p-6 shadow-xs flex flex-col justify-center items-center text-center hover:border-[#825100]/40 transition-colors"
      >
        <div class="w-12 h-12 rounded-xl bg-[#825100]/10 flex items-center justify-center text-[#825100] mb-3">
          <span class="material-symbols-outlined text-2xl">maps_home_work</span>
        </div>
        <div class="text-3xl font-extrabold text-[#0b1c30] tracking-tight">
          {{ hierarchySummary.dusunCount }}
        </div>
        <div class="text-xs sm:text-sm font-semibold text-[#565e74] mt-1">Dusun</div>
      </div>

      <!-- RW Card -->
      <div
        class="bg-white border border-[#bcc9c6]/40 rounded-2xl p-6 shadow-xs flex flex-col justify-center items-center text-center hover:border-[#0d9488]/40 transition-colors"
      >
        <div class="w-12 h-12 rounded-xl bg-[#0d9488]/10 flex items-center justify-center text-[#0d9488] mb-3">
          <span class="material-symbols-outlined text-2xl">location_city</span>
        </div>
        <div class="text-3xl font-extrabold text-[#0b1c30] tracking-tight">
          {{ hierarchySummary.rwCount }}
        </div>
        <div class="text-xs sm:text-sm font-semibold text-[#565e74] mt-1">Rukun Warga (RW)</div>
      </div>

      <!-- RT Card -->
      <div
        class="bg-white border border-[#bcc9c6]/40 rounded-2xl p-6 shadow-xs flex flex-col justify-center items-center text-center hover:border-[#565e74]/40 transition-colors"
      >
        <div class="w-12 h-12 rounded-xl bg-[#565e74]/10 flex items-center justify-center text-[#565e74] mb-3">
          <span class="material-symbols-outlined text-2xl">home</span>
        </div>
        <div class="text-3xl font-extrabold text-[#0b1c30] tracking-tight">
          {{ hierarchySummary.rtCount }}
        </div>
        <div class="text-xs sm:text-sm font-semibold text-[#565e74] mt-1">Rukun Tetangga (RT)</div>
      </div>
    </div>

    <!-- Visualization Section: Interactive Map / Chart -->
    <div class="bg-white border border-[#bcc9c6]/40 rounded-2xl shadow-xs overflow-hidden">
      <!-- Section Header -->
      <div class="p-5 sm:p-6 border-b border-[#bcc9c6]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-base sm:text-lg font-bold text-[#0b1c30]">
            Peta Distribusi Penduduk
          </h2>
          <p class="text-xs sm:text-sm text-[#565e74]">
            Sebaran populasi per dusun di wilayah Desa Cimenyan
          </p>
        </div>

        <!-- Mode Toggle (Map vs Chart) -->
        <div class="inline-flex p-1 bg-[#eff4ff] rounded-xl border border-[#bcc9c6]/30 self-start sm:self-auto">
          <button
            type="button"
            @click="viewMode = 'map'"
            :class="[
              'px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer',
              viewMode === 'map'
                ? 'bg-white text-[#0d9488] shadow-xs'
                : 'text-[#565e74] hover:text-[#0b1c30]'
            ]"
          >
            <span class="material-symbols-outlined text-[16px]">map</span>
            <span>Tampilan Peta</span>
          </button>
          <button
            type="button"
            @click="viewMode = 'chart'"
            :class="[
              'px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer',
              viewMode === 'chart'
                ? 'bg-white text-[#0d9488] shadow-xs'
                : 'text-[#565e74] hover:text-[#0b1c30]'
            ]"
          >
            <span class="material-symbols-outlined text-[16px]">bar_chart</span>
            <span>Grafik Sebaran</span>
          </button>
        </div>
      </div>

      <!-- MAP VIEW -->
      <div v-show="viewMode === 'map'" class="relative w-full h-[420px] sm:h-[480px] bg-[#f0fdfa]/40 overflow-hidden flex items-center justify-center">
        <!-- Background Map Image -->
        <img
          :src="cimenyanMap"
          alt="Peta Wilayah Desa Cimenyan"
          class="w-full h-full object-cover opacity-85 select-none"
        />

        <!-- Interactive Pins for Each Dusun -->
        <div
          v-for="d in dusunList"
          :key="d.id"
          :style="{ left: `${d.pinX}%`, top: `${d.pinY}%` }"
          class="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
          @click="openDetail(d)"
        >
          <!-- Pin Beacon Animation -->
          <span class="absolute inline-flex h-full w-full rounded-full bg-[#0d9488]/40 animate-ping"></span>
          <!-- Pin Icon Core -->
          <div
            class="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#0d9488] text-white shadow-md border-2 border-white group-hover:scale-115 transition-transform"
          >
            <span class="material-symbols-outlined text-sm">location_on</span>
          </div>

          <!-- Tooltip on hover -->
          <div
            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-20 whitespace-nowrap"
          >
            <div class="bg-[#0b1c30] text-white text-xs px-3 py-1.5 rounded-lg shadow-lg border border-teal-500/30">
              <div class="font-bold">{{ d.nama }}</div>
              <div class="text-[11px] text-teal-300">{{ d.populasi.toLocaleString("id-ID") }} jiwa • {{ d.rw }} RW / {{ d.rt }} RT</div>
            </div>
            <div class="w-2 h-2 bg-[#0b1c30] rotate-45 -mt-1"></div>
          </div>
        </div>

        <!-- Map Legend Badge -->
        <div
          class="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-[#bcc9c6]/40 shadow-sm"
        >
          <div class="text-xs font-semibold text-[#0b1c30] mb-1.5 flex items-center justify-between gap-4">
            <span>Kepadatan (Jiwa)</span>
            <span class="text-[10px] text-[#565e74]">Klik pin untuk detail</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[11px] text-[#565e74]">Rendah</span>
            <div class="w-28 sm:w-36 h-2 bg-gradient-to-r from-[#ccfbf1] via-[#0d9488] to-[#00685f] rounded-full"></div>
            <span class="text-[11px] font-semibold text-[#0d9488]">Tinggi</span>
          </div>
        </div>
      </div>

      <!-- CHART VIEW -->
      <div v-show="viewMode === 'chart'" class="p-6 bg-[#f8f9ff]">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-[#565e74] mb-4">
          Proporsi Jumlah Populasi per Dusun (Total 18.240 Jiwa)
        </h3>
        <div class="space-y-4">
          <div
            v-for="d in dusunList"
            :key="d.id"
            class="bg-white p-3.5 rounded-xl border border-[#bcc9c6]/30 shadow-2xs hover:border-[#0d9488]/40 transition-colors cursor-pointer"
            @click="openDetail(d)"
          >
            <div class="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm mb-1.5 gap-1">
              <div class="font-bold text-[#0b1c30] flex items-center gap-2">
                <span>{{ d.nama }}</span>
                <span class="text-[11px] font-normal text-[#565e74]">({{ d.kode }})</span>
              </div>
              <div class="text-[#0d9488] font-bold">
                {{ d.populasi.toLocaleString("id-ID") }} Jiwa
                <span class="text-[#565e74] font-normal text-xs">
                  ({{ ((d.populasi / 18240) * 100).toFixed(1) }}%)
                </span>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="w-full bg-[#e5eeff] h-2.5 rounded-full overflow-hidden">
              <div
                class="bg-[#0d9488] h-full rounded-full transition-all duration-500"
                :style="{ width: `${(d.populasi / 3450) * 100}%` }"
              ></div>
            </div>
            <div class="flex justify-between items-center text-[11px] text-[#565e74] mt-1.5">
              <span>{{ d.rw }} RW • {{ d.rt }} RT</span>
              <span class="font-medium text-[#0d9488] hover:underline">Lihat rincian &rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Table Section: Daftar Dusun -->
    <div class="bg-white border border-[#bcc9c6]/40 rounded-2xl shadow-xs overflow-hidden">
      <!-- Table Header & Controls -->
      <div
        class="p-5 sm:p-6 border-b border-[#bcc9c6]/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h2 class="text-base sm:text-lg font-bold text-[#0b1c30]">Daftar Dusun</h2>
          <p class="text-xs sm:text-sm text-[#565e74]">
            Kelola data dan status validasi tiap unit wilayah
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <!-- Status Filter Dropdown -->
          <select
            v-model="statusFilter"
            class="px-3 py-2 text-xs sm:text-sm border border-[#bcc9c6]/60 rounded-xl bg-white text-[#0b1c30] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
          >
            <option value="all">Semua Status</option>
            <option value="valid">Valid (SIAK)</option>
            <option value="revisi">Butuh Revisi</option>
          </select>

          <!-- Search Input -->
          <div class="relative w-full sm:w-64">
            <span
              class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#565e74] text-[18px]"
            >
              search
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari dusun atau kode..."
              class="w-full pl-9 pr-4 py-2 rounded-xl border border-[#bcc9c6]/60 bg-white text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] placeholder-[#565e74]"
            />
          </div>
        </div>
      </div>

      <!-- Table Elements -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr class="bg-[#eff4ff]/60 border-b border-[#bcc9c6]/30 text-xs font-semibold uppercase tracking-wider text-[#565e74]">
              <th class="py-3.5 px-6">Nama Dusun</th>
              <th class="py-3.5 px-4 text-center">Jumlah RW</th>
              <th class="py-3.5 px-4 text-center">Jumlah RT</th>
              <th class="py-3.5 px-6">Populasi</th>
              <th class="py-3.5 px-4">Status Data</th>
              <th class="py-3.5 px-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="text-xs sm:text-sm text-[#0b1c30] divide-y divide-[#bcc9c6]/20">
            <tr
              v-for="dusun in paginatedDusunList"
              :key="dusun.id"
              class="hover:bg-[#eff4ff]/40 transition-colors"
            >
              <!-- Nama Dusun & Kode -->
              <td class="py-4 px-6">
                <div class="font-bold text-[#0b1c30] text-sm sm:text-base">{{ dusun.nama }}</div>
                <div class="text-xs text-[#565e74] font-mono mt-0.5">Kode: {{ dusun.kode }}</div>
                <div class="text-xs text-[#3d4947] mt-0.5">Kepala: {{ dusun.kepalaDusun }}</div>
              </td>

              <!-- Jumlah RW -->
              <td class="py-4 px-4 text-center font-bold text-[#0b1c30]">
                {{ dusun.rw }}
              </td>

              <!-- Jumlah RT -->
              <td class="py-4 px-4 text-center font-bold text-[#0b1c30]">
                {{ dusun.rt }}
              </td>

              <!-- Populasi + Bar -->
              <td class="py-4 px-6">
                <div class="font-bold text-[#0b1c30]">
                  {{ dusun.populasi.toLocaleString("id-ID") }} Jiwa
                </div>
                <div class="w-28 sm:w-36 h-2 bg-[#d3e4fe] rounded-full mt-1.5 overflow-hidden">
                  <div
                    class="bg-[#0d9488] h-full rounded-full"
                    :style="{ width: `${dusun.persentaseBar}%` }"
                  ></div>
                </div>
              </td>

              <!-- Status Data -->
              <td class="py-4 px-4">
                <span
                  v-if="dusun.statusType === 'success'"
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ccfbf1] text-[#00685f] border border-[#0d9488]/20"
                >
                  <span class="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>{{ dusun.status }} ({{ dusun.akurasi }}%)</span>
                </span>
                <span
                  v-else
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ffddb8] text-[#825100] border border-[#a36700]/20"
                >
                  <span class="material-symbols-outlined text-[14px]">warning</span>
                  <span>{{ dusun.status }} ({{ dusun.akurasi }}%)</span>
                </span>
              </td>

              <!-- Aksi -->
              <td class="py-4 px-6 text-right">
                <button
                  type="button"
                  @click="openDetail(dusun)"
                  class="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0d9488] hover:text-[#00685f] px-3 py-1.5 rounded-lg border border-[#0d9488]/30 hover:bg-[#0d9488]/10 transition-colors cursor-pointer"
                >
                  <span>Lihat Detail</span>
                  <span class="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="filteredDusunList.length === 0">
              <td colspan="6" class="py-12 text-center text-[#565e74]">
                <span class="material-symbols-outlined text-4xl text-[#bcc9c6] mb-2 block">search_off</span>
                <p class="font-medium">Tidak ada dusun yang cocok dengan kriteria pencarian.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div
        class="p-4 sm:p-5 border-t border-[#bcc9c6]/30 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#f8f9ff]"
      >
        <span class="text-xs sm:text-sm text-[#565e74]">
          Menampilkan {{ paginatedDusunList.length }} dari {{ filteredDusunList.length }} Dusun
        </span>

        <div class="flex items-center gap-1.5">
          <button
            type="button"
            :disabled="currentPage === 1"
            @click="setPage(currentPage - 1)"
            :class="[
              'p-1.5 rounded-lg border border-[#bcc9c6]/50 flex items-center justify-center transition-colors',
              currentPage === 1
                ? 'opacity-40 cursor-not-allowed text-[#565e74]'
                : 'hover:bg-white text-[#0b1c30] cursor-pointer'
            ]"
          >
            <span class="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>

          <button
            v-for="p in totalPages"
            :key="p"
            type="button"
            @click="setPage(p)"
            :class="[
              'w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer',
              currentPage === p
                ? 'bg-[#0d9488] text-white shadow-xs'
                : 'bg-white border border-[#bcc9c6]/50 text-[#0b1c30] hover:bg-[#eff4ff]'
            ]"
          >
            {{ p }}
          </button>

          <button
            type="button"
            :disabled="currentPage === totalPages"
            @click="setPage(currentPage + 1)"
            :class="[
              'p-1.5 rounded-lg border border-[#bcc9c6]/50 flex items-center justify-center transition-colors',
              currentPage === totalPages
                ? 'opacity-40 cursor-not-allowed text-[#565e74]'
                : 'hover:bg-white text-[#0b1c30] cursor-pointer'
            ]"
          >
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

    <!-- DETAIL MODAL -->
    <div
      v-if="isDetailModalOpen && selectedDusun"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      @click.self="isDetailModalOpen = false"
    >
      <div
        class="bg-white rounded-2xl border border-[#bcc9c6]/40 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div class="p-6 border-b border-[#bcc9c6]/30 flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-xl font-bold text-[#0b1c30]">{{ selectedDusun.nama }}</h3>
              <span
                :class="[
                  'px-2.5 py-0.5 rounded-full text-xs font-semibold',
                  selectedDusun.statusType === 'success'
                    ? 'bg-[#ccfbf1] text-[#00685f]'
                    : 'bg-[#ffddb8] text-[#825100]'
                ]"
              >
                {{ selectedDusun.status }} ({{ selectedDusun.akurasi }}%)
              </span>
            </div>
            <p class="text-xs text-[#565e74] font-mono mt-0.5">Kode Wilayah: {{ selectedDusun.kode }}</p>
          </div>
          <button
            type="button"
            class="text-[#565e74] hover:text-[#0b1c30] p-1.5 rounded-lg hover:bg-[#eff4ff]"
            @click="isDetailModalOpen = false"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Overview Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-[#eff4ff] p-3 rounded-xl text-center">
              <span class="text-xs text-[#565e74] block">Populasi</span>
              <span class="text-base font-extrabold text-[#0d9488]">
                {{ selectedDusun.populasi.toLocaleString("id-ID") }}
              </span>
            </div>
            <div class="bg-[#eff4ff] p-3 rounded-xl text-center">
              <span class="text-xs text-[#565e74] block">Kepala Keluarga</span>
              <span class="text-base font-extrabold text-[#0b1c30]">
                {{ selectedDusun.kk.toLocaleString("id-ID") }}
              </span>
            </div>
            <div class="bg-[#eff4ff] p-3 rounded-xl text-center">
              <span class="text-xs text-[#565e74] block">Laki-laki</span>
              <span class="text-base font-extrabold text-[#565e74]">
                {{ selectedDusun.pria.toLocaleString("id-ID") }}
              </span>
            </div>
            <div class="bg-[#eff4ff] p-3 rounded-xl text-center">
              <span class="text-xs text-[#565e74] block">Perempuan</span>
              <span class="text-base font-extrabold text-[#565e74]">
                {{ selectedDusun.wanita.toLocaleString("id-ID") }}
              </span>
            </div>
          </div>

          <!-- Kepala Dusun Info -->
          <div class="bg-[#f8f9ff] p-4 rounded-xl border border-[#bcc9c6]/30 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#0d9488]/10 text-[#0d9488] flex items-center justify-center font-bold">
                <span class="material-symbols-outlined">person</span>
              </div>
              <div>
                <span class="text-xs text-[#565e74] block">Kepala Dusun</span>
                <span class="font-bold text-[#0b1c30]">{{ selectedDusun.kepalaDusun }}</span>
              </div>
            </div>
            <div class="text-right">
              <span class="text-xs text-[#565e74] block">Kontak / HP</span>
              <span class="font-mono text-xs font-semibold text-[#0d9488]">{{ selectedDusun.telepon }}</span>
            </div>
          </div>

          <!-- RW and RT Breakdown -->
          <div>
            <h4 class="text-sm font-bold text-[#0b1c30] mb-3 flex items-center justify-between">
              <span>Daftar Rukun Warga (RW) & Rukun Tetangga (RT)</span>
              <span class="text-xs font-normal text-[#565e74]">Total {{ selectedDusun.rw }} RW & {{ selectedDusun.rt }} RT</span>
            </h4>
            <div class="space-y-2.5">
              <div
                v-for="rw in selectedDusun.rwList"
                :key="rw.nomor"
                class="p-3 bg-white border border-[#bcc9c6]/30 rounded-xl flex items-center justify-between"
              >
                <div>
                  <div class="font-bold text-xs sm:text-sm text-[#0b1c30]">{{ rw.nomor }}</div>
                  <div class="text-[11px] text-[#565e74]">Ketua RW: {{ rw.ketua }}</div>
                </div>
                <div class="text-right">
                  <span class="text-xs font-semibold text-[#0d9488] block">{{ rw.rtCount }} RT</span>
                  <span class="text-[11px] text-[#565e74]">{{ rw.penduduk }} Jiwa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-4 sm:p-6 border-t border-[#bcc9c6]/30 flex justify-end gap-3 bg-[#f8f9ff]">
          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-[#bcc9c6]/60 text-[#0b1c30] hover:bg-white text-xs sm:text-sm font-medium"
            @click="isDetailModalOpen = false"
          >
            Tutup
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-xl bg-[#0d9488] text-white hover:bg-[#00685f] text-xs sm:text-sm font-semibold shadow-xs"
            @click="isDetailModalOpen = false; triggerToast(`Membuka berkas arsip ${selectedDusun.nama}`);"
          >
            Unduh Laporan Wilayah
          </button>
        </div>
      </div>
    </div>

    <!-- TAMBAH WILAYAH MODAL -->
    <div
      v-if="isAddModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      @click.self="isAddModalOpen = false"
    >
      <div
        class="bg-white rounded-2xl border border-[#bcc9c6]/40 shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <!-- Modal Header -->
        <div class="p-6 border-b border-[#bcc9c6]/30 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[#0d9488]">add_location</span>
            <h3 class="text-lg font-bold text-[#0b1c30]">Tambah Wilayah Administratif</h3>
          </div>
          <button
            type="button"
            class="text-[#565e74] hover:text-[#0b1c30] p-1.5 rounded-lg hover:bg-[#eff4ff]"
            @click="isAddModalOpen = false"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="handleAddWilayah" class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Nama Dusun / Wilayah *</label>
            <input
              v-model="newWilayah.nama"
              type="text"
              required
              placeholder="Contoh: Dusun Cimenyan Hilir"
              class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Kode Wilayah (Kemendagri) *</label>
            <input
              v-model="newWilayah.kode"
              type="text"
              required
              placeholder="Contoh: 32.04.14.2001.09"
              class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm font-mono focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Kepala Dusun</label>
              <input
                v-model="newWilayah.kepalaDusun"
                type="text"
                placeholder="Nama Kepala Dusun"
                class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Nomor Telepon</label>
              <input
                v-model="newWilayah.telepon"
                type="text"
                placeholder="0812-xxxx-xxxx"
                class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm font-mono focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
              />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Jumlah RW</label>
              <input
                v-model.number="newWilayah.jumlahRw"
                type="number"
                min="1"
                class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Jumlah RT</label>
              <input
                v-model.number="newWilayah.jumlahRt"
                type="number"
                min="1"
                class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Populasi Awal</label>
              <input
                v-model.number="newWilayah.populasi"
                type="number"
                min="0"
                class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
              />
            </div>
          </div>

          <!-- Form Buttons -->
          <div class="pt-4 flex justify-end gap-3 border-t border-[#bcc9c6]/30">
            <button
              type="button"
              class="px-4 py-2 rounded-xl border border-[#bcc9c6]/60 text-[#0b1c30] hover:bg-[#eff4ff] text-xs sm:text-sm font-medium"
              @click="isAddModalOpen = false"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded-xl bg-[#0d9488] text-white hover:bg-[#00685f] text-xs sm:text-sm font-semibold shadow-xs"
            >
              Simpan Wilayah
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
