<script setup>
import { ref, computed } from "vue";

// Filter and Search State
const searchQuery = ref("");
const selectedStatusFilter = ref("all");
const currentPage = ref(1);
const itemsPerPage = 6;

// Toast Notification State
const toastMessage = ref("");
const showToast = ref(false);
const triggerToast = (msg) => {
  toastMessage.value = msg;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// Summary Statistics
const stats = ref({
  total: 248,
  totalGrowth: "+12 bulan ini",
  menunggu: 32,
  menungguNote: "Perlu tindakan segera",
  diproses: 18,
  diprosesNote: "Dalam pengerjaan petugas",
  selesaiHariIni: 15,
  selesaiNote: "Siap diambil pemohon",
});

// Jenis Layanan Options
const serviceTypes = [
  "Surat Keterangan Domisili",
  "Surat Pengantar SKCK",
  "Keterangan Usaha (SKU)",
  "Surat Keterangan Tidak Mampu (SKTM)",
  "Surat Pengantar Nikah (N1-N4)",
  "Surat Keterangan Kematian",
  "Surat Keterangan Kelahiran",
  "Surat Keterangan Pindah Datang",
  "Surat Keterangan Belum Menikah",
];

// Initial Layanan Request Dataset
const requests = ref([
  {
    id: "LAY-202310-045",
    namaPemohon: "Budi Santoso",
    nik: "3204051203850006",
    dusun: "Dusun Cimenyan (RT 01/RW 01)",
    layanan: "Surat Keterangan Domisili",
    tanggal: "24 Okt 2023, 08:30",
    status: "Menunggu",
    statusBadge: "bg-[#ffddb8] text-[#825100]",
    dotColor: "bg-[#825100]",
    petugas: null,
    petugasInitial: null,
    keperluan: "Persyaratan pembukaan rekening bank baru dan pengajuan modal usaha",
    catatan: "Menunggu verifikasi pengantar dari Ketua RT 01",
  },
  {
    id: "LAY-202310-044",
    namaPemohon: "Siti Aminah",
    nik: "3204051203850001",
    dusun: "Dusun Padasuka (RT 02/RW 03)",
    layanan: "Surat Pengantar SKCK",
    tanggal: "23 Okt 2023, 14:15",
    status: "Diproses",
    statusBadge: "bg-[#dae2fd] text-[#5c647a]",
    dotColor: "bg-[#565e74]",
    petugas: "Admin",
    petugasInitial: "A",
    keperluan: "Pendaftaran rekrutmen pegawai BUMN",
    catatan: "Dokumen KTP dan KK sudah diverifikasi, sedang mencetak blanko pengantar",
  },
  {
    id: "LAY-202310-043",
    namaPemohon: "Ahmad Fauzi",
    nik: "3204051203850005",
    dusun: "Dusun Ciburial (RT 02/RW 05)",
    layanan: "Keterangan Usaha (SKU)",
    tanggal: "23 Okt 2023, 10:00",
    status: "Selesai",
    statusBadge: "bg-[#ccfbf1] text-[#00685f]",
    dotColor: "bg-[#0d9488]",
    petugas: "Rina",
    petugasInitial: "R",
    keperluan: "Pengajuan pinjaman KUR BRI unit Cimenyan",
    catatan: "Surat telah ditandatangani oleh Sekretaris Desa dan distempel basah",
  },
  {
    id: "LAY-202310-042",
    namaPemohon: "Dewi Lestari",
    nik: "3204051203850004",
    dusun: "Dusun Cikadut (RT 03/RW 03)",
    layanan: "Surat Keterangan Tidak Mampu (SKTM)",
    tanggal: "22 Okt 2023, 09:45",
    status: "Selesai",
    statusBadge: "bg-[#ccfbf1] text-[#00685f]",
    dotColor: "bg-[#0d9488]",
    petugas: "Admin",
    petugasInitial: "A",
    keperluan: "Permohonan beasiswa Kartu Indonesia Pintar (KIP) Kuliah",
    catatan: "Terverifikasi masuk dalam DTKS desil 2",
  },
  {
    id: "LAY-202310-041",
    namaPemohon: "Nurul Hidayati",
    nik: "3204051203850002",
    dusun: "Dusun Mandala Mekar (RT 01/RW 04)",
    layanan: "Surat Pengantar Nikah (N1-N4)",
    tanggal: "21 Okt 2023, 11:20",
    status: "Diproses",
    statusBadge: "bg-[#dae2fd] text-[#5c647a]",
    dotColor: "bg-[#565e74]",
    petugas: "Rina",
    petugasInitial: "R",
    keperluan: "Pendaftaran pernikahan di KUA Kecamatan Cimenyan",
    catatan: "Menunggu fotokopi KTP saksi nikah",
  },
  {
    id: "LAY-202310-040",
    namaPemohon: "Rina Sari",
    nik: "3204051203850003",
    dusun: "Dusun Mekarsaluyu (RT 02/RW 02)",
    layanan: "Surat Keterangan Kelahiran",
    tanggal: "21 Okt 2023, 08:50",
    status: "Selesai",
    statusBadge: "bg-[#ccfbf1] text-[#00685f]",
    dotColor: "bg-[#0d9488]",
    petugas: "Admin",
    petugasInitial: "A",
    keperluan: "Penerbitan akta kelahiran dan penambahan anak di Kartu Keluarga",
    catatan: "Selesai. Nomor surat terdaftar di buku register No. 474.1/108/2023",
  },
  {
    id: "LAY-202310-039",
    namaPemohon: "Cecep Sopandi",
    nik: "3204051203850007",
    dusun: "Dusun Sindanglaya (RT 03/RW 06)",
    layanan: "Surat Keterangan Pindah Datang",
    tanggal: "20 Okt 2023, 15:30",
    status: "Menunggu",
    statusBadge: "bg-[#ffddb8] text-[#825100]",
    dotColor: "bg-[#825100]",
    petugas: null,
    petugasInitial: null,
    keperluan: "Pindah domisili dari Kota Bandung ke Desa Cimenyan",
    catatan: "Menunggu SKPWNI dari Disdukcapil asal",
  },
  {
    id: "LAY-202310-038",
    namaPemohon: "Yayan Sopyan",
    nik: "3204051203850008",
    dusun: "Dusun Cibeunying (RT 01/RW 08)",
    layanan: "Keterangan Usaha (SKU)",
    tanggal: "20 Okt 2023, 13:10",
    status: "Selesai",
    statusBadge: "bg-[#ccfbf1] text-[#00685f]",
    dotColor: "bg-[#0d9488]",
    petugas: "Admin",
    petugasInitial: "A",
    keperluan: "Kelengkapan izin usaha mikro dan pendaftaran NIB",
    catatan: "Surat sudah diambil oleh pemohon",
  },
]);

// Filtered requests computation
const filteredRequests = computed(() => {
  let list = requests.value;

  if (selectedStatusFilter.value !== "all") {
    list = list.filter((r) => r.status.toLowerCase() === selectedStatusFilter.value.toLowerCase());
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.namaPemohon.toLowerCase().includes(q) ||
        r.nik.toLowerCase().includes(q) ||
        r.layanan.toLowerCase().includes(q) ||
        r.dusun.toLowerCase().includes(q)
    );
  }

  return list;
});

// Pagination calculation
const totalPages = computed(() => Math.max(1, Math.ceil(filteredRequests.value.length / itemsPerPage)));

const paginatedRequests = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredRequests.value.slice(start, start + itemsPerPage);
});

const setPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Detail & Action Modal State
const selectedRequest = ref(null);
const isDetailModalOpen = ref(false);

const openDetail = (request) => {
  selectedRequest.value = { ...request };
  isDetailModalOpen.value = true;
};

// Process status transition
const updateStatus = (newStatus) => {
  if (!selectedRequest.value) return;

  const reqIndex = requests.value.findIndex((r) => r.id === selectedRequest.value.id);
  if (reqIndex !== -1) {
    let badge = "bg-[#ffddb8] text-[#825100]";
    let dot = "bg-[#825100]";
    let petugas = requests.value[reqIndex].petugas || "Admin";
    let petugasInitial = requests.value[reqIndex].petugasInitial || "A";

    if (newStatus === "Diproses") {
      badge = "bg-[#dae2fd] text-[#5c647a]";
      dot = "bg-[#565e74]";
    } else if (newStatus === "Selesai") {
      badge = "bg-[#ccfbf1] text-[#00685f]";
      dot = "bg-[#0d9488]";
    }

    requests.value[reqIndex].status = newStatus;
    requests.value[reqIndex].statusBadge = badge;
    requests.value[reqIndex].dotColor = dot;
    requests.value[reqIndex].petugas = petugas;
    requests.value[reqIndex].petugasInitial = petugasInitial;
    selectedRequest.value.status = newStatus;
    selectedRequest.value.statusBadge = badge;
    selectedRequest.value.dotColor = dot;
    selectedRequest.value.petugas = petugas;
    selectedRequest.value.petugasInitial = petugasInitial;

    // Update stats counters
    updateStatsCounters();
    triggerToast(`Pengajuan ${selectedRequest.value.id} berhasil diubah ke status "${newStatus}".`);
  }
};

const updateStatsCounters = () => {
  stats.value.menunggu = requests.value.filter((r) => r.status === "Menunggu").length;
  stats.value.diproses = requests.value.filter((r) => r.status === "Diproses").length;
  stats.value.selesaiHariIni = requests.value.filter((r) => r.status === "Selesai").length;
};

// Modal Tambah Pengajuan Baru
const isNewRequestModalOpen = ref(false);
const newForm = ref({
  namaPemohon: "",
  nik: "",
  dusun: "Dusun Cimenyan",
  layanan: "Surat Keterangan Domisili",
  keperluan: "",
  catatan: "",
});

const handleCreateRequest = () => {
  if (!newForm.value.namaPemohon || !newForm.value.nik) {
    alert("Harap lengkapi nama pemohon dan NIK.");
    return;
  }

  const generatedId = `LAY-${new Date().toISOString().slice(0, 7).replace("-", "")}-${String(
    requests.value.length + 46
  ).padStart(3, "0")}`;

  const newEntry = {
    id: generatedId,
    namaPemohon: newForm.value.namaPemohon,
    nik: newForm.value.nik,
    dusun: newForm.value.dusun,
    layanan: newForm.value.layanan,
    tanggal: `${new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}, ${new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`,
    status: "Menunggu",
    statusBadge: "bg-[#ffddb8] text-[#825100]",
    dotColor: "bg-[#825100]",
    petugas: null,
    petugasInitial: null,
    keperluan: newForm.value.keperluan || "Pelayanan administrasi kependudukan",
    catatan: newForm.value.catatan || "Baru diajukan oleh pemohon",
  };

  requests.value.unshift(newEntry);
  stats.value.total += 1;
  stats.value.menunggu += 1;

  isNewRequestModalOpen.value = false;
  newForm.value = {
    namaPemohon: "",
    nik: "",
    dusun: "Dusun Cimenyan",
    layanan: "Surat Keterangan Domisili",
    keperluan: "",
    catatan: "",
  };

  triggerToast(`Pengajuan baru (${generatedId}) berhasil dibuat.`);
};

// Cetak Surat Mock
const handlePrint = (request) => {
  triggerToast(`Mencetak dokumen resmi untuk ${request.id} (${request.layanan})...`);
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
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
          Pelayanan Administrasi
        </h1>
        <p class="text-sm sm:text-base text-[#565e74] mt-1">
          Kelola dan pantau pengajuan layanan administrasi masyarakat desa.
        </p>
      </div>

      <button
        type="button"
        @click="isNewRequestModalOpen = true"
        class="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#00685f] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-[#0d9488]/20 cursor-pointer active:scale-98 self-start sm:self-auto"
      >
        <span class="material-symbols-outlined text-[20px]">add</span>
        <span>Buat Pengajuan Baru</span>
      </button>
    </div>

    <!-- Dashboard Summary Cards (Bento Style Grid) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <!-- Card 1: Total Pengajuan -->
      <div
        class="bg-white rounded-2xl p-6 border border-[#bcc9c6]/40 shadow-xs relative overflow-hidden group hover:border-[#0d9488]/40 transition-colors"
      >
        <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <span class="material-symbols-outlined text-[80px]">description</span>
        </div>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-[#e5eeff] flex items-center justify-center text-[#0b1c30]">
            <span class="material-symbols-outlined text-[22px]">receipt_long</span>
          </div>
          <span class="text-xs sm:text-sm font-semibold text-[#565e74]">Total Pengajuan</span>
        </div>
        <div class="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
          {{ stats.total }}
        </div>
        <div class="mt-2 text-xs font-semibold text-[#0d9488] flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">trending_up</span>
          <span>{{ stats.totalGrowth }}</span>
        </div>
      </div>

      <!-- Card 2: Menunggu Verifikasi -->
      <div
        class="bg-white rounded-2xl p-6 border border-[#bcc9c6]/40 shadow-xs relative overflow-hidden group hover:border-[#825100]/40 transition-colors"
      >
        <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <span class="material-symbols-outlined text-[80px]">pending_actions</span>
        </div>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-[#ffddb8]/40 flex items-center justify-center text-[#825100]">
            <span class="material-symbols-outlined text-[22px]">pending_actions</span>
          </div>
          <span class="text-xs sm:text-sm font-semibold text-[#565e74]">Menunggu Verifikasi</span>
        </div>
        <div class="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
          {{ stats.menunggu }}
        </div>
        <div class="mt-2 text-xs font-semibold text-[#825100] flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">schedule</span>
          <span>{{ stats.menungguNote }}</span>
        </div>
      </div>

      <!-- Card 3: Sedang Diproses -->
      <div
        class="bg-white rounded-2xl p-6 border border-[#bcc9c6]/40 shadow-xs relative overflow-hidden group hover:border-[#565e74]/40 transition-colors"
      >
        <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <span class="material-symbols-outlined text-[80px]">sync</span>
        </div>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-[#dae2fd]/50 flex items-center justify-center text-[#565e74]">
            <span class="material-symbols-outlined text-[22px]">sync</span>
          </div>
          <span class="text-xs sm:text-sm font-semibold text-[#565e74]">Sedang Diproses</span>
        </div>
        <div class="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
          {{ stats.diproses }}
        </div>
        <div class="mt-2 text-xs font-semibold text-[#565e74] flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">engineering</span>
          <span>{{ stats.diprosesNote }}</span>
        </div>
      </div>

      <!-- Card 4: Selesai (Hari ini) -->
      <div
        class="bg-white rounded-2xl p-6 border border-[#bcc9c6]/40 shadow-xs relative overflow-hidden group hover:border-[#0d9488]/40 transition-colors"
      >
        <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <span class="material-symbols-outlined text-[80px]">check_circle</span>
        </div>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-[#ccfbf1]/60 flex items-center justify-center text-[#0d9488]">
            <span class="material-symbols-outlined text-[22px]">check_circle</span>
          </div>
          <span class="text-xs sm:text-sm font-semibold text-[#565e74]">Selesai (Hari ini)</span>
        </div>
        <div class="text-3xl sm:text-4xl font-extrabold text-[#0d9488] tracking-tight">
          {{ stats.selesaiHariIni }}
        </div>
        <div class="mt-2 text-xs font-semibold text-[#0d9488] flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">check</span>
          <span>{{ stats.selesaiNote }}</span>
        </div>
      </div>
    </div>

    <!-- Data Table Section -->
    <div class="bg-white border border-[#bcc9c6]/40 shadow-xs rounded-2xl overflow-hidden flex flex-col">
      <!-- Table Toolbar -->
      <div
        class="p-5 sm:p-6 border-b border-[#bcc9c6]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#f8f9ff]"
      >
        <div>
          <h2 class="text-base sm:text-lg font-bold text-[#0b1c30]">Daftar Permintaan Layanan</h2>
          <p class="text-xs sm:text-sm text-[#565e74]">
            Data permohonan surat keterangan dan dokumen warga desa
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <!-- Filter Tabs / Select -->
          <select
            v-model="selectedStatusFilter"
            class="px-3 py-2 text-xs sm:text-sm border border-[#bcc9c6]/60 rounded-xl bg-white text-[#0b1c30] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
          >
            <option value="all">Semua Status</option>
            <option value="menunggu">Menunggu</option>
            <option value="diproses">Diproses</option>
            <option value="selesai">Selesai</option>
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
              placeholder="Cari nomor atau nama..."
              class="w-full pl-9 pr-4 py-2 border border-[#bcc9c6]/60 rounded-xl text-xs sm:text-sm text-[#0b1c30] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] bg-white placeholder-[#565e74]"
            />
          </div>
        </div>
      </div>

      <!-- Table Wrapper -->
      <div class="overflow-x-auto w-full">
        <table class="w-full text-left border-collapse min-w-[900px]">
          <thead class="bg-[#eff4ff]/60 border-b border-[#bcc9c6]/30">
            <tr class="text-xs font-semibold uppercase tracking-wider text-[#565e74]">
              <th class="py-3.5 px-4 sm:px-6">No. Pengajuan</th>
              <th class="py-3.5 px-4">Nama Pemohon</th>
              <th class="py-3.5 px-4">Jenis Layanan</th>
              <th class="py-3.5 px-4">Tanggal</th>
              <th class="py-3.5 px-4">Status</th>
              <th class="py-3.5 px-4">Petugas</th>
              <th class="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="text-xs sm:text-sm text-[#0b1c30] divide-y divide-[#bcc9c6]/20">
            <tr
              v-for="item in paginatedRequests"
              :key="item.id"
              class="hover:bg-[#eff4ff]/40 transition-colors"
            >
              <!-- No. Pengajuan -->
              <td class="py-4 px-4 sm:px-6 font-semibold font-mono text-[#0b1c30]">
                {{ item.id }}
              </td>

              <!-- Nama Pemohon -->
              <td class="py-4 px-4">
                <div class="font-bold text-[#0b1c30]">{{ item.namaPemohon }}</div>
                <div class="text-xs text-[#565e74] font-mono mt-0.5">NIK: {{ item.nik }}</div>
                <div class="text-[11px] text-[#3d4947]">{{ item.dusun }}</div>
              </td>

              <!-- Jenis Layanan -->
              <td class="py-4 px-4">
                <span class="font-medium text-[#0b1c30]">{{ item.layanan }}</span>
              </td>

              <!-- Tanggal -->
              <td class="py-4 px-4 text-[#565e74] whitespace-nowrap">
                {{ item.tanggal }}
              </td>

              <!-- Status -->
              <td class="py-4 px-4">
                <span
                  :class="[
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
                    item.statusBadge
                  ]"
                >
                  <span
                    v-if="item.status === 'Diproses'"
                    class="material-symbols-outlined text-[14px] animate-spin"
                  >
                    sync
                  </span>
                  <span
                    v-else-if="item.status === 'Selesai'"
                    class="material-symbols-outlined text-[14px]"
                  >
                    check
                  </span>
                  <span v-else class="w-1.5 h-1.5 rounded-full" :class="item.dotColor"></span>
                  <span>{{ item.status }}</span>
                </span>
              </td>

              <!-- Petugas -->
              <td class="py-4 px-4">
                <div v-if="item.petugas" class="flex items-center gap-2">
                  <div
                    class="w-6 h-6 rounded-full bg-[#dae2fd] text-[#0b1c30] flex items-center justify-center text-[11px] font-bold"
                  >
                    {{ item.petugasInitial }}
                  </div>
                  <span class="text-xs font-medium text-[#565e74]">{{ item.petugas }}</span>
                </div>
                <span v-else class="text-[#565e74]">-</span>
              </td>

              <!-- Aksi -->
              <td class="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                <div class="inline-flex items-center gap-2">
                  <button
                    type="button"
                    v-if="item.status === 'Menunggu'"
                    @click="openDetail(item)"
                    class="text-[#0d9488] hover:text-[#00685f] font-semibold text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-[#0d9488]/30 hover:bg-[#0d9488]/10 transition-colors cursor-pointer"
                  >
                    Proses
                  </button>

                  <button
                    type="button"
                    v-else
                    @click="openDetail(item)"
                    class="text-[#0d9488] hover:text-[#00685f] font-semibold text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-[#0d9488]/30 hover:bg-[#0d9488]/10 transition-colors cursor-pointer"
                  >
                    Detail
                  </button>

                  <button
                    type="button"
                    v-if="item.status === 'Selesai'"
                    @click="handlePrint(item)"
                    class="p-1.5 rounded-lg text-[#565e74] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors cursor-pointer"
                    title="Cetak/Unduh Dokumen"
                  >
                    <span class="material-symbols-outlined text-[18px]">print</span>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="filteredRequests.length === 0">
              <td colspan="7" class="py-12 text-center text-[#565e74]">
                <span class="material-symbols-outlined text-4xl text-[#bcc9c6] mb-2 block">inbox</span>
                <p class="font-medium">Tidak ada permohonan layanan yang sesuai kriteria pencarian.</p>
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
          Menampilkan {{ paginatedRequests.length }} dari {{ filteredRequests.length }} data
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

    <!-- DETAIL & PROSES MODAL -->
    <div
      v-if="isDetailModalOpen && selectedRequest"
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
              <h3 class="text-xl font-bold text-[#0b1c30]">Rincian Pengajuan Layanan</h3>
              <span
                :class="[
                  'px-2.5 py-0.5 rounded-full text-xs font-semibold',
                  selectedRequest.statusBadge
                ]"
              >
                {{ selectedRequest.status }}
              </span>
            </div>
            <p class="text-xs text-[#565e74] font-mono mt-0.5">{{ selectedRequest.id }}</p>
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
          <!-- Profile & Identitas -->
          <div class="bg-[#eff4ff] p-4 rounded-xl border border-[#bcc9c6]/30">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div>
                <span class="text-[#565e74] block">Nama Pemohon:</span>
                <span class="font-bold text-[#0b1c30]">{{ selectedRequest.namaPemohon }}</span>
              </div>
              <div>
                <span class="text-[#565e74] block">NIK:</span>
                <span class="font-mono font-bold text-[#0b1c30]">{{ selectedRequest.nik }}</span>
              </div>
              <div>
                <span class="text-[#565e74] block">Wilayah Domisili:</span>
                <span class="font-medium text-[#0b1c30]">{{ selectedRequest.dusun }}</span>
              </div>
              <div>
                <span class="text-[#565e74] block">Waktu Pengajuan:</span>
                <span class="font-medium text-[#0b1c30]">{{ selectedRequest.tanggal }}</span>
              </div>
            </div>
          </div>

          <!-- Rincian Layanan -->
          <div class="space-y-3">
            <div>
              <span class="text-xs font-semibold text-[#565e74] uppercase tracking-wider block">
                Jenis Dokumen yang Diajukan
              </span>
              <p class="text-base font-bold text-[#0d9488] mt-0.5">{{ selectedRequest.layanan }}</p>
            </div>

            <div>
              <span class="text-xs font-semibold text-[#565e74] uppercase tracking-wider block">
                Keperluan Pemohon
              </span>
              <p class="text-xs sm:text-sm text-[#0b1c30] bg-[#f8f9ff] p-3 rounded-lg border border-[#bcc9c6]/30 mt-1">
                {{ selectedRequest.keperluan }}
              </p>
            </div>

            <div>
              <span class="text-xs font-semibold text-[#565e74] uppercase tracking-wider block">
                Catatan Petugas / Status Terakhir
              </span>
              <p class="text-xs sm:text-sm text-[#0b1c30] bg-[#f8f9ff] p-3 rounded-lg border border-[#bcc9c6]/30 mt-1">
                {{ selectedRequest.catatan }}
              </p>
            </div>
          </div>

          <!-- Update Status Controls -->
          <div class="pt-3 border-t border-[#bcc9c6]/30">
            <span class="text-xs font-bold text-[#0b1c30] block mb-2">Ubah Status Pengajuan:</span>
            <div class="grid grid-cols-3 gap-2">
              <button
                type="button"
                @click="updateStatus('Menunggu')"
                :class="[
                  'py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                  selectedRequest.status === 'Menunggu'
                    ? 'bg-[#ffddb8] border-[#a36700] text-[#825100]'
                    : 'border-[#bcc9c6]/50 text-[#565e74] hover:bg-[#eff4ff]'
                ]"
              >
                Menunggu
              </button>
              <button
                type="button"
                @click="updateStatus('Diproses')"
                :class="[
                  'py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                  selectedRequest.status === 'Diproses'
                    ? 'bg-[#dae2fd] border-[#565e74] text-[#0b1c30]'
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
                  selectedRequest.status === 'Selesai'
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
        <div class="p-4 sm:p-6 border-t border-[#bcc9c6]/30 flex items-center justify-between bg-[#f8f9ff]">
          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-[#bcc9c6]/60 text-[#0b1c30] hover:bg-white text-xs sm:text-sm font-medium"
            @click="isDetailModalOpen = false"
          >
            Tutup
          </button>

          <button
            type="button"
            @click="handlePrint(selectedRequest)"
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0d9488] text-white hover:bg-[#00685f] text-xs sm:text-sm font-semibold shadow-xs"
          >
            <span class="material-symbols-outlined text-[18px]">print</span>
            <span>Cetak Dokumen</span>
          </button>
        </div>
      </div>
    </div>

    <!-- TAMBAH PENGAJUAN BARU MODAL -->
    <div
      v-if="isNewRequestModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      @click.self="isNewRequestModalOpen = false"
    >
      <div
        class="bg-white rounded-2xl border border-[#bcc9c6]/40 shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <!-- Modal Header -->
        <div class="p-6 border-b border-[#bcc9c6]/30 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[#0d9488]">post_add</span>
            <h3 class="text-lg font-bold text-[#0b1c30]">Buat Permintaan Layanan Baru</h3>
          </div>
          <button
            type="button"
            class="text-[#565e74] hover:text-[#0b1c30] p-1.5 rounded-lg hover:bg-[#eff4ff]"
            @click="isNewRequestModalOpen = false"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="handleCreateRequest" class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Nama Pemohon *</label>
            <input
              v-model="newForm.namaPemohon"
              type="text"
              required
              placeholder="Nama lengkap sesuai KTP"
              class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">NIK (16 Digit) *</label>
              <input
                v-model="newForm.nik"
                type="text"
                required
                maxlength="16"
                placeholder="3204xxxxxxxxxxxx"
                class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm font-mono focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Wilayah Dusun</label>
              <select
                v-model="newForm.dusun"
                class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] bg-white"
              >
                <option value="Dusun Cimenyan">Dusun Cimenyan</option>
                <option value="Dusun Padasuka">Dusun Padasuka</option>
                <option value="Dusun Ciburial">Dusun Ciburial</option>
                <option value="Dusun Cikadut">Dusun Cikadut</option>
                <option value="Dusun Mandala Mekar">Dusun Mandala Mekar</option>
                <option value="Dusun Mekarsaluyu">Dusun Mekarsaluyu</option>
                <option value="Dusun Sindanglaya">Dusun Sindanglaya</option>
                <option value="Dusun Cibeunying">Dusun Cibeunying</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Jenis Layanan / Surat *</label>
            <select
              v-model="newForm.layanan"
              class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] bg-white"
            >
              <option v-for="t in serviceTypes" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Keperluan</label>
            <textarea
              v-model="newForm.keperluan"
              rows="2"
              placeholder="Contoh: Persyaratan melamar pekerjaan / pengajuan bank"
              class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
            ></textarea>
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Catatan Tambahan</label>
            <input
              v-model="newForm.catatan"
              type="text"
              placeholder="Catatan verifikasi atau nomor kontak pemohon"
              class="w-full px-3.5 py-2 rounded-xl border border-[#bcc9c6]/60 text-xs sm:text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
            />
          </div>

          <!-- Form Buttons -->
          <div class="pt-4 flex justify-end gap-3 border-t border-[#bcc9c6]/30">
            <button
              type="button"
              class="px-4 py-2 rounded-xl border border-[#bcc9c6]/60 text-[#0b1c30] hover:bg-[#eff4ff] text-xs sm:text-sm font-medium"
              @click="isNewRequestModalOpen = false"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded-xl bg-[#0d9488] text-white hover:bg-[#00685f] text-xs sm:text-sm font-semibold shadow-xs"
            >
              Simpan Pengajuan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
