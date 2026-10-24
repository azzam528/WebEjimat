<script setup>
import { ref, computed } from "vue";

// Filter & Search State
const searchQuery = ref("");
const selectedCategory = ref("all");
const selectedStatus = ref("all");
const currentPage = ref(1);
const itemsPerPage = 5;

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

// Summary Stats
const stats = ref({
  total: 142,
  growth: "+12% bulan ini",
  baru: 24,
  baruNote: "Perlu tindakan segera",
  diproses: 45,
  diprosesPercent: 45,
  selesai: 73,
  selesaiRate: "Tingkat penyelesaian 51%",
});

// Category Icons & Config
const categoryConfig = {
  infrastruktur: {
    label: "Infrastruktur",
    icon: "construction",
    bg: "bg-[#e5eeff] text-[#0b1c30] border-[#bcc9c6]/30",
  },
  kebersihan: {
    label: "Kebersihan",
    icon: "delete",
    bg: "bg-[#eff4ff] text-[#3d4947] border-[#bcc9c6]/30",
  },
  pelayanan: {
    label: "Pelayanan Publik",
    icon: "support_agent",
    bg: "bg-[#ccfbf1] text-[#00685f] border-[#0d9488]/30",
  },
  keamanan: {
    label: "Ketertiban & Keamanan",
    icon: "security",
    bg: "bg-[#ffddb8] text-[#825100] border-[#a36700]/30",
  },
  sosial: {
    label: "Sosial & Bantuan",
    icon: "volunteer_activism",
    bg: "bg-[#dae2fd] text-[#565e74] border-[#bcc9c6]/30",
  },
};

// Pengaduan Records
const complaints = ref([
  {
    id: "#PGD-2023-089",
    pelapor: "Budi Santoso",
    nik: "3204051203850006",
    tanggal: "12 Okt 2023, 08:30",
    kategori: "infrastruktur",
    judul: "Jalan berlubang di RW 03 membahayakan pengguna jalan",
    lokasi: "Jl. Kenangan RT 02/RW 03, Dusun Cimenyan",
    status: "Baru",
    statusBadge: "bg-[#ffdad6] text-[#93000a] border border-[#ffdad6]",
    deskripsi:
      "Terdapat beberapa lubang jalan sedalam 10-15 cm di sekitar tikungan dekat masjid. Sudah ada 2 pengendara motor yang hampir terjatuh pada malam hari karena minimnya penerangan.",
    tanggapan: "Laporan baru diterima. Belum ada tindak lanjut lapangan dari dinas/seksi pembangunan desa.",
  },
  {
    id: "#PGD-2023-088",
    pelapor: "Siti Aminah",
    nik: "3204051203850001",
    tanggal: "11 Okt 2023, 14:15",
    kategori: "kebersihan",
    judul: "Tumpukan sampah di pinggir sungai",
    lokasi: "Sungai Cimenyan, RT 01/RW 01, Dusun Padasuka",
    status: "Diproses",
    statusBadge: "bg-[#ffddb8] text-[#825100] border border-[#ffb95f]",
    deskripsi:
      "Warga membuang sampah liar di bibir bantaran sungai hingga menimbulkan bau menyengat dan berpotensi menyumbat aliran air saat hujan lebat.",
    tanggapan: "Tim Satgas Kebersihan Desa telah menjadwalkan pengangkutan bersama warga pada hari Sabtu.",
  },
  {
    id: "#PGD-2023-085",
    pelapor: "Ahmad Ridwan",
    nik: "3204051203850005",
    tanggal: "09 Okt 2023, 10:00",
    kategori: "pelayanan",
    judul: "Keterlambatan pembuatan KTP",
    lokasi: "Kantor Desa Cimenyan (Loket 2)",
    status: "Selesai",
    statusBadge: "bg-[#ccfbf1] text-[#00685f] border border-[#0d9488]/30",
    deskripsi:
      "Pengajuan pencetakan ulang KTP rusak sudah diajukan sejak 2 minggu lalu namun belum ada informasi kesiapan blanko dari Disdukcapil.",
    tanggapan: "Blanko KTP telah selesai dicetak dan sudah diserahkan langsung kepada pelapor di kantor desa.",
  },
  {
    id: "#PGD-2023-082",
    pelapor: "Dewi Lestari",
    nik: "3204051203850004",
    tanggal: "08 Okt 2023, 19:40",
    kategori: "keamanan",
    judul: "Lampu penerangan jalan umum mati di jalan tanjakan",
    lokasi: "Jl. Bukit Asri RT 04/RW 02, Dusun Ciburial",
    status: "Diproses",
    statusBadge: "bg-[#ffddb8] text-[#825100] border border-[#ffb95f]",
    deskripsi:
      "Dua unit PJU padam sejak 4 hari lalu membuat jalur tanjakan sangat gelap dan rawan tindak kejahatan malam hari.",
    tanggapan: "Surat koordinasi penggantian bohlam LED PJU telah diajukan ke Dishub Kabupaten Bandung.",
  },
  {
    id: "#PGD-2023-079",
    pelapor: "Hendra Gunawan",
    nik: "3204051203850009",
    tanggal: "06 Okt 2023, 11:20",
    kategori: "sosial",
    judul: "Data warga penerima bansos lansia belum terdaftar",
    lokasi: "RT 03/RW 05, Dusun Mandala Mekar",
    status: "Selesai",
    statusBadge: "bg-[#ccfbf1] text-[#00685f] border border-[#0d9488]/30",
    deskripsi:
      "Ada 2 lansia sebatang kara yang belum masuk ke dalam basis data DTSK padahal memenuhi kriteria prioritas.",
    tanggapan: "Puskesos telah melakukan verifikasi faktual lapangan dan memasukkan data ke usulan DTKS tahap 4.",
  },
  {
    id: "#PGD-2023-077",
    pelapor: "Asep Wahyudi",
    nik: "3204051203850010",
    tanggal: "04 Okt 2023, 16:05",
    kategori: "infrastruktur",
    judul: "Saluran irigasi tersumbat lumpur pasca longsor kecil",
    lokasi: "Blok Pasir Pogor RT 01/RW 04, Dusun Cikadut",
    status: "Baru",
    statusBadge: "bg-[#ffdad6] text-[#93000a] border border-[#ffdad6]",
    deskripsi:
      "Tebing tanah longsor menutup separuh drainase irigasi sawah warga, air meluap ke badan jalan desa saat hujan gerimis.",
    tanggapan: "Menunggu pengecekan awal oleh Kasi Kesejahteraan Rakyat.",
  },
]);

// Filtered Complaints
const filteredComplaints = computed(() => {
  let list = complaints.value;

  if (selectedCategory.value !== "all") {
    list = list.filter((c) => c.kategori === selectedCategory.value);
  }

  if (selectedStatus.value !== "all") {
    list = list.filter((c) => c.status.toLowerCase() === selectedStatus.value.toLowerCase());
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(
      (c) =>
        c.id.toLowerCase().includes(q) ||
        c.pelapor.toLowerCase().includes(q) ||
        c.judul.toLowerCase().includes(q) ||
        c.lokasi.toLowerCase().includes(q)
    );
  }

  return list;
});

// Pagination
const totalPages = computed(() => Math.max(1, Math.ceil(filteredComplaints.value.length / itemsPerPage)));

const paginatedComplaints = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredComplaints.value.slice(start, start + itemsPerPage);
});

const setPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Modal Detail & Update State
const selectedComplaint = ref(null);
const isDetailModalOpen = ref(false);
const responseText = ref("");

const openDetail = (item) => {
  selectedComplaint.value = { ...item };
  responseText.value = item.tanggapan;
  isDetailModalOpen.value = true;
};

// Update status function
const updateStatus = (newStatus) => {
  if (!selectedComplaint.value) return;

  const targetIndex = complaints.value.findIndex((c) => c.id === selectedComplaint.value.id);
  if (targetIndex !== -1) {
    let badgeClass = "bg-[#ffdad6] text-[#93000a] border border-[#ffdad6]";
    if (newStatus === "Diproses") {
      badgeClass = "bg-[#ffddb8] text-[#825100] border border-[#ffb95f]";
    } else if (newStatus === "Selesai") {
      badgeClass = "bg-[#ccfbf1] text-[#00685f] border border-[#0d9488]/30";
    }

    complaints.value[targetIndex].status = newStatus;
    complaints.value[targetIndex].statusBadge = badgeClass;
    if (responseText.value.trim()) {
      complaints.value[targetIndex].tanggapan = responseText.value.trim();
    }

    selectedComplaint.value.status = newStatus;
    selectedComplaint.value.statusBadge = badgeClass;
    selectedComplaint.value.tanggapan = complaints.value[targetIndex].tanggapan;

    // Recalculate stats counters
    stats.value.baru = complaints.value.filter((c) => c.status === "Baru").length;
    stats.value.diproses = complaints.value.filter((c) => c.status === "Diproses").length;
    stats.value.selesai = complaints.value.filter((c) => c.status === "Selesai").length;

    triggerToast(`Pengaduan ${selectedComplaint.value.id} berhasil diperbarui ke status "${newStatus}".`);
  }
};

// Modal Buat Pengaduan Baru
const isNewComplaintModalOpen = ref(false);
const newForm = ref({
  pelapor: "",
  nik: "",
  kategori: "infrastruktur",
  judul: "",
  lokasi: "",
  deskripsi: "",
});

const handleCreateComplaint = () => {
  if (!newForm.value.pelapor || !newForm.value.judul || !newForm.value.lokasi) {
    alert("Harap lengkapi nama pelapor, judul, dan lokasi pengaduan.");
    return;
  }

  const generatedId = `#PGD-2023-${String(complaints.value.length + 90).padStart(3, "0")}`;
  const now = new Date();
  const timestamp = `${now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}, ${now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`;

  const newEntry = {
    id: generatedId,
    pelapor: newForm.value.pelapor,
    nik: newForm.value.nik || "-",
    tanggal: timestamp,
    kategori: newForm.value.kategori,
    judul: newForm.value.judul,
    lokasi: newForm.value.lokasi,
    status: "Baru",
    statusBadge: "bg-[#ffdad6] text-[#93000a] border border-[#ffdad6]",
    deskripsi: newForm.value.deskripsi || "Tidak ada deskripsi tambahan.",
    tanggapan: "Pengaduan baru masuk. Menunggu verifikasi awal petugas desa.",
  };

  complaints.value.unshift(newEntry);
  stats.value.total += 1;
  stats.value.baru += 1;

  isNewComplaintModalOpen.value = false;
  newForm.value = {
    pelapor: "",
    nik: "",
    kategori: "infrastruktur",
    judul: "",
    lokasi: "",
    deskripsi: "",
  };

  triggerToast(`Pengaduan ${generatedId} berhasil diajukan.`);
};

// Unduh Laporan CSV
const handleDownloadReport = () => {
  const headers = ["ID Pengaduan", "Pelapor", "NIK", "Tanggal", "Kategori", "Judul", "Lokasi", "Status", "Tanggapan"];
  const rows = complaints.value.map((c) => [
    `"${c.id}"`,
    `"${c.pelapor}"`,
    `"${c.nik}"`,
    `"${c.tanggal}"`,
    `"${c.kategori}"`,
    `"${c.judul.replace(/"/g, '""')}"`,
    `"${c.lokasi.replace(/"/g, '""')}"`,
    `"${c.status}"`,
    `"${c.tanggapan.replace(/"/g, '""')}"`,
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `laporan_pengaduan_desa_cimenyan_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  triggerToast("Laporan pengaduan berhasil diekspor ke CSV.");
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

    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight mb-1">
          Pengaduan Masyarakat
        </h1>
        <p class="text-sm sm:text-base text-[#565e74]">
          Kelola dan pantau laporan pengaduan dari warga desa.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="handleDownloadReport"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#bcc9c6]/80 text-[#0b1c30] bg-white font-medium text-xs sm:text-sm hover:bg-[#eff4ff] hover:border-[#0d9488]/40 transition-all shadow-xs cursor-pointer active:scale-98"
        >
          <span class="material-symbols-outlined text-[18px] text-[#565e74]">download</span>
          <span>Unduh Laporan</span>
        </button>

        <button
          type="button"
          @click="isNewComplaintModalOpen = true"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0d9488] text-white font-semibold text-xs sm:text-sm hover:bg-[#00685f] transition-all shadow-sm hover:shadow-[#0d9488]/20 cursor-pointer active:scale-98"
        >
          <span class="material-symbols-outlined text-[18px]">add</span>
          <span>Buat Pengaduan</span>
        </button>
      </div>
    </div>

    <!-- Summary Bento Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <!-- Total Pengaduan -->
      <div
        class="bg-white border border-[#bcc9c6]/40 rounded-2xl p-6 shadow-xs relative overflow-hidden group hover:border-[#0d9488]/40 transition-colors"
      >
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-[#d3e4fe] rounded-full opacity-40 group-hover:scale-115 transition-transform pointer-events-none"></div>
        <div class="relative z-10 flex flex-col justify-between h-full gap-4">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-[#565e74] mb-1">
                Total Pengaduan
              </p>
              <h3 class="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
                {{ stats.total }}
              </h3>
            </div>
            <div class="w-12 h-12 rounded-xl bg-[#e5eeff] flex items-center justify-center text-[#0d9488]">
              <span class="material-symbols-outlined text-2xl">inbox</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5 text-xs text-[#565e74] font-medium">
            <span class="material-symbols-outlined text-[16px] text-[#0d9488] font-bold">trending_up</span>
            <span class="text-[#0d9488] font-bold">{{ stats.growth }}</span>
          </div>
        </div>
      </div>

      <!-- Baru -->
      <div
        class="bg-white border border-[#bcc9c6]/40 rounded-2xl p-6 shadow-xs relative overflow-hidden group hover:border-[#ba1a1a]/40 transition-colors"
      >
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-[#ffdad6] rounded-full opacity-40 group-hover:scale-115 transition-transform pointer-events-none"></div>
        <div class="relative z-10 flex flex-col justify-between h-full gap-4">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-[#565e74] mb-1">
                Baru
              </p>
              <h3 class="text-3xl sm:text-4xl font-extrabold text-[#ba1a1a] tracking-tight">
                {{ stats.baru }}
              </h3>
            </div>
            <div class="w-12 h-12 rounded-xl bg-[#ffdad6]/60 flex items-center justify-center text-[#ba1a1a]">
              <span class="material-symbols-outlined text-2xl">fiber_new</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5 text-xs text-[#ba1a1a] font-medium">
            <span class="material-symbols-outlined text-[16px]">priority_high</span>
            <span>{{ stats.baruNote }}</span>
          </div>
        </div>
      </div>

      <!-- Diproses -->
      <div
        class="bg-white border border-[#bcc9c6]/40 rounded-2xl p-6 shadow-xs relative overflow-hidden group hover:border-[#825100]/40 transition-colors"
      >
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-[#ffddb8] rounded-full opacity-40 group-hover:scale-115 transition-transform pointer-events-none"></div>
        <div class="relative z-10 flex flex-col justify-between h-full gap-4">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-[#565e74] mb-1">
                Diproses
              </p>
              <h3 class="text-3xl sm:text-4xl font-extrabold text-[#825100] tracking-tight">
                {{ stats.diproses }}
              </h3>
            </div>
            <div class="w-12 h-12 rounded-xl bg-[#ffddb8]/50 flex items-center justify-center text-[#825100]">
              <span class="material-symbols-outlined text-2xl">pending_actions</span>
            </div>
          </div>
          <div>
            <div class="w-full bg-[#e5eeff] rounded-full h-1.5">
              <div
                class="bg-[#825100] h-1.5 rounded-full transition-all duration-500"
                :style="{ width: `${stats.diprosesPercent}%` }"
              ></div>
            </div>
            <span class="text-[11px] text-[#565e74] mt-1 block">Dalam penanganan lapangan</span>
          </div>
        </div>
      </div>

      <!-- Selesai -->
      <div
        class="bg-white border border-[#bcc9c6]/40 rounded-2xl p-6 shadow-xs relative overflow-hidden group hover:border-[#0d9488]/40 transition-colors"
      >
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-[#ccfbf1] rounded-full opacity-40 group-hover:scale-115 transition-transform pointer-events-none"></div>
        <div class="relative z-10 flex flex-col justify-between h-full gap-4">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-[#565e74] mb-1">
                Selesai
              </p>
              <h3 class="text-3xl sm:text-4xl font-extrabold text-[#00685f] tracking-tight">
                {{ stats.selesai }}
              </h3>
            </div>
            <div class="w-12 h-12 rounded-xl bg-[#ccfbf1]/60 flex items-center justify-center text-[#00685f]">
              <span class="material-symbols-outlined text-2xl">task_alt</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5 text-xs text-[#00685f] font-medium">
            <span class="material-symbols-outlined text-[16px]">check_circle</span>
            <span>{{ stats.selesaiRate }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Table Section -->
    <div class="bg-white border border-[#bcc9c6]/40 rounded-2xl shadow-xs overflow-hidden flex flex-col">
      <!-- Table Controls -->
      <div
        class="p-5 sm:p-6 border-b border-[#bcc9c6]/30 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#f8f9ff]"
      >
        <div class="w-full lg:w-auto">
          <h2 class="text-base sm:text-lg font-bold text-[#0b1c30]">Daftar Pengaduan Masuk</h2>
          <p class="text-xs sm:text-sm text-[#565e74]">
            Daftar laporan, keluhan, dan aspirasi warga Desa Cimenyan
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
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
              placeholder="Cari ID, Pelapor, atau Judul..."
              class="w-full pl-9 pr-4 py-2 border border-[#bcc9c6]/60 rounded-xl text-xs sm:text-sm text-[#0b1c30] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] bg-white placeholder-[#565e74]"
            />
          </div>

          <!-- Kategori Filter -->
          <select
            v-model="selectedCategory"
            class="px-3 py-2 rounded-xl border border-[#bcc9c6]/60 bg-white text-xs sm:text-sm text-[#0b1c30] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
          >
            <option value="all">Semua Kategori</option>
            <option value="infrastruktur">Infrastruktur</option>
            <option value="kebersihan">Kebersihan</option>
            <option value="pelayanan">Pelayanan Publik</option>
            <option value="keamanan">Ketertiban & Keamanan</option>
            <option value="sosial">Sosial & Bantuan</option>
          </select>

          <!-- Status Filter -->
          <select
            v-model="selectedStatus"
            class="px-3 py-2 rounded-xl border border-[#bcc9c6]/60 bg-white text-xs sm:text-sm text-[#0b1c30] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
          >
            <option value="all">Semua Status</option>
            <option value="baru">Baru</option>
            <option value="diproses">Diproses</option>
            <option value="selesai">Selesai</option>
          </select>
        </div>
      </div>

      <!-- Table Component -->
      <div class="overflow-x-auto w-full">
        <table class="w-full text-left border-collapse min-w-[950px]">
          <thead class="bg-[#eff4ff]/60 border-b border-[#bcc9c6]/30">
            <tr class="text-xs font-semibold uppercase tracking-wider text-[#565e74]">
              <th class="py-3.5 px-4 sm:px-6">ID Pengaduan</th>
              <th class="py-3.5 px-4">Pelapor & Tanggal</th>
              <th class="py-3.5 px-4">Kategori</th>
              <th class="py-3.5 px-6">Judul & Lokasi</th>
              <th class="py-3.5 px-4">Status</th>
              <th class="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="text-xs sm:text-sm text-[#0b1c30] divide-y divide-[#bcc9c6]/20">
            <tr
              v-for="item in paginatedComplaints"
              :key="item.id"
              class="hover:bg-[#eff4ff]/40 transition-colors group"
            >
              <!-- ID -->
              <td class="py-4 px-4 sm:px-6 font-semibold font-mono text-[#0d9488] whitespace-nowrap">
                {{ item.id }}
              </td>

              <!-- Pelapor & Tanggal -->
              <td class="py-4 px-4">
                <div class="font-bold text-[#0b1c30]">{{ item.pelapor }}</div>
                <div class="text-xs text-[#565e74] mt-0.5">{{ item.tanggal }}</div>
              </td>

              <!-- Kategori -->
              <td class="py-4 px-4">
                <span
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border"
                  :class="categoryConfig[item.kategori]?.bg || 'bg-slate-100 text-slate-700'"
                >
                  <span class="material-symbols-outlined text-[14px]">
                    {{ categoryConfig[item.kategori]?.icon || "info" }}
                  </span>
                  <span>{{ categoryConfig[item.kategori]?.label || item.kategori }}</span>
                </span>
              </td>

              <!-- Judul & Lokasi -->
              <td class="py-4 px-6 max-w-sm">
                <div class="font-semibold text-[#0b1c30] line-clamp-1" :title="item.judul">
                  {{ item.judul }}
                </div>
                <div class="text-xs text-[#565e74] mt-0.5 flex items-center gap-1 line-clamp-1">
                  <span class="material-symbols-outlined text-[14px] text-[#0d9488]">location_on</span>
                  <span>{{ item.lokasi }}</span>
                </div>
              </td>

              <!-- Status -->
              <td class="py-4 px-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold"
                  :class="item.statusBadge"
                >
                  {{ item.status }}
                </span>
              </td>

              <!-- Aksi -->
              <td class="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                <div class="inline-flex items-center gap-1">
                  <button
                    type="button"
                    @click="openDetail(item)"
                    class="p-1.5 text-[#565e74] hover:text-[#0d9488] rounded-lg hover:bg-white border border-transparent hover:border-[#bcc9c6]/40 transition-colors cursor-pointer"
                    title="Update Status & Tanggapan"
                  >
                    <span class="material-symbols-outlined text-[18px]">edit_document</span>
                  </button>

                  <button
                    type="button"
                    @click="openDetail(item)"
                    class="p-1.5 text-[#0d9488] hover:text-[#00685f] rounded-lg hover:bg-[#0d9488]/10 transition-colors cursor-pointer"
                    title="Lihat Detail Lengkap"
                  >
                    <span class="material-symbols-outlined text-[18px]">visibility</span>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="filteredComplaints.length === 0">
              <td colspan="6" class="py-12 text-center text-[#565e74]">
                <span class="material-symbols-outlined text-4xl text-[#bcc9c6] mb-2 block">search_off</span>
                <p class="font-medium">Tidak ada pengaduan yang sesuai kriteria pencarian.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="p-4 sm:p-5 border-t border-[#bcc9c6]/30 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#f8f9ff]"
      >
        <span class="text-xs sm:text-sm text-[#565e74]">
          Menampilkan {{ paginatedComplaints.length }} dari {{ filteredComplaints.length }} pengaduan
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

    <!-- DETAIL & UPDATE STATUS MODAL -->
    <div
      v-if="isDetailModalOpen && selectedComplaint"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      @click.self="isDetailModalOpen = false"
    >
      <div
        class="bg-white rounded-2xl border border-[#bcc9c6]/40 shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div class="p-6 border-b border-[#bcc9c6]/30 flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-mono text-sm font-bold text-[#0d9488]">{{ selectedComplaint.id }}</span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold" :class="selectedComplaint.statusBadge">
                {{ selectedComplaint.status }}
              </span>
            </div>
            <h3 class="text-lg font-bold text-[#0b1c30] mt-1">{{ selectedComplaint.judul }}</h3>
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
        <div class="p-6 space-y-5">
          <!-- Pelapor & Lokasi -->
          <div class="bg-[#eff4ff] p-4 rounded-xl border border-[#bcc9c6]/30 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <span class="text-[#565e74] block">Nama Pelapor:</span>
              <span class="font-bold text-[#0b1c30]">{{ selectedComplaint.pelapor }}</span>
            </div>
            <div>
              <span class="text-[#565e74] block">Waktu Laporan:</span>
              <span class="font-medium text-[#0b1c30]">{{ selectedComplaint.tanggal }}</span>
            </div>
            <div class="sm:col-span-2">
              <span class="text-[#565e74] block">Lokasi Spesifik:</span>
              <span class="font-semibold text-[#0d9488] flex items-center gap-1 mt-0.5">
                <span class="material-symbols-outlined text-[16px]">location_on</span>
                {{ selectedComplaint.lokasi }}
              </span>
            </div>
          </div>

          <!-- Deskripsi Masalah -->
          <div>
            <span class="text-xs font-bold text-[#565e74] uppercase tracking-wider block mb-1">
              Rincian Pengaduan Warga
            </span>
            <p class="text-xs sm:text-sm text-[#0b1c30] bg-[#f8f9ff] p-3.5 rounded-xl border border-[#bcc9c6]/30 leading-relaxed">
              {{ selectedComplaint.deskripsi }}
            </p>
          </div>

          <!-- Tanggapan & Tindak Lanjut -->
          <div>
            <label class="block text-xs font-bold text-[#565e74] uppercase tracking-wider mb-1">
              Catatan / Tindak Lanjut Petugas Desa
            </label>
            <textarea
              v-model="responseText"
              rows="3"
              placeholder="Tuliskan catatan tindak lanjut atau tanggapan resmi kepada warga..."
              class="w-full px-3.5 py-2.5 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
            ></textarea>
          </div>

          <!-- Update Status Actions -->
          <div class="pt-3 border-t border-[#bcc9c6]/30">
            <span class="text-xs font-bold text-[#0b1c30] block mb-2">Perbarui Status Penanganan:</span>
            <div class="grid grid-cols-3 gap-2">
              <button
                type="button"
                @click="updateStatus('Baru')"
                :class="[
                  'py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                  selectedComplaint.status === 'Baru'
                    ? 'bg-[#ffdad6] border-[#ba1a1a] text-[#93000a]'
                    : 'border-[#bcc9c6]/50 text-[#565e74] hover:bg-[#eff4ff]'
                ]"
              >
                Baru
              </button>
              <button
                type="button"
                @click="updateStatus('Diproses')"
                :class="[
                  'py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                  selectedComplaint.status === 'Diproses'
                    ? 'bg-[#ffddb8] border-[#825100] text-[#825100]'
                    : 'border-[#bcc9c6]/50 text-[#565e74] hover:bg-[#eff4ff]'
                ]"
              >
                Diproses
              </button>
              <button
                type="button"
                @click="updateStatus('Selesai')"
                :class="[
                  'py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                  selectedComplaint.status === 'Selesai'
                    ? 'bg-[#ccfbf1] border-[#0d9488] text-[#00685f]'
                    : 'border-[#bcc9c6]/50 text-[#565e74] hover:bg-[#eff4ff]'
                ]"
              >
                Selesai
              </button>
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
        </div>
      </div>
    </div>

    <!-- BUAT PENGADUAN BARU MODAL -->
    <div
      v-if="isNewComplaintModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      @click.self="isNewComplaintModalOpen = false"
    >
      <div
        class="bg-white rounded-2xl border border-[#bcc9c6]/40 shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <!-- Modal Header -->
        <div class="p-6 border-b border-[#bcc9c6]/30 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[#0d9488]">campaign</span>
            <h3 class="text-lg font-bold text-[#0b1c30]">Buat Pengaduan Masyarakat</h3>
          </div>
          <button
            type="button"
            class="text-[#565e74] hover:text-[#0b1c30] p-1.5 rounded-lg hover:bg-[#eff4ff]"
            @click="isNewComplaintModalOpen = false"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="handleCreateComplaint" class="p-6 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Nama Pelapor *</label>
              <input
                v-model="newForm.pelapor"
                type="text"
                required
                placeholder="Nama pelapor"
                class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">NIK (Opsional)</label>
              <input
                v-model="newForm.nik"
                type="text"
                maxlength="16"
                placeholder="3204xxxxxxxxxxxx"
                class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm font-mono focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Kategori Masalah *</label>
            <select
              v-model="newForm.kategori"
              class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] bg-white"
            >
              <option value="infrastruktur">Infrastruktur (Jalan, Jembatan, Drainase)</option>
              <option value="kebersihan">Kebersihan & Lingkungan (Sampah, Limbah)</option>
              <option value="pelayanan">Pelayanan Publik (Kantor Desa, Administrasi)</option>
              <option value="keamanan">Ketertiban & Keamanan (PJU, Ronda, Kamtibmas)</option>
              <option value="sosial">Sosial & Bantuan (Bansos, Bencana, Lansia)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Judul Ringkas Pengaduan *</label>
            <input
              v-model="newForm.judul"
              type="text"
              required
              placeholder="Contoh: Jalan berlubang di RT 02/RW 03"
              class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Lokasi Kejadian / Alamat Spesifik *</label>
            <input
              v-model="newForm.lokasi"
              type="text"
              required
              placeholder="Contoh: Jl. Kenangan, dekat Posyandu RT 03"
              class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Deskripsi Lengkap Masalah</label>
            <textarea
              v-model="newForm.deskripsi"
              rows="3"
              placeholder="Jelaskan detail permasalahan, dampak terhadap warga, dan waktu kejadian..."
              class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
            ></textarea>
          </div>

          <!-- Form Buttons -->
          <div class="pt-4 flex justify-end gap-3 border-t border-[#bcc9c6]/30">
            <button
              type="button"
              class="px-4 py-2 rounded-xl border border-[#bcc9c6]/60 text-[#0b1c30] hover:bg-[#eff4ff] text-xs sm:text-sm font-medium"
              @click="isNewComplaintModalOpen = false"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded-xl bg-[#0d9488] text-white hover:bg-[#00685f] text-xs sm:text-sm font-semibold shadow-xs"
            >
              Simpan Pengaduan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
