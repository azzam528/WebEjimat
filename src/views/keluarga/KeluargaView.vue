<script setup>
import { ref, computed } from "vue";

// ==========================================
// TOAST NOTIFICATION STATE
// ==========================================
const toastMessage = ref("");
const showToast = ref(false);
const triggerToast = (msg) => {
  toastMessage.value = msg;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// ==========================================
// FILTER & SEARCH STATE
// ==========================================
const searchQuery = ref("");
const selectedDusun = ref("");
const selectedRW = ref("");
const selectedStatus = ref("");

// Advanced Filter State
const isAdvancedFilterOpen = ref(false);
const selectedRT = ref("");
const minMembers = ref("");
const maxMembers = ref("");
const selectedBansos = ref("");

const resetFilters = () => {
  searchQuery.value = "";
  selectedDusun.value = "";
  selectedRW.value = "";
  selectedStatus.value = "";
  selectedRT.value = "";
  minMembers.value = "";
  maxMembers.value = "";
  selectedBansos.value = "";
  currentPage.value = 1;
  triggerToast("Filter berhasil direset.");
};

// ==========================================
// DATASET: KELUARGA (KARTU KELUARGA)
// ==========================================
const families = ref([
  {
    id: "KK-001",
    nomorKk: "3204051234567890",
    kepalaKeluarga: "Ahmad Hidayat",
    nikKepala: "3204051203850001",
    jumlahAnggota: 4,
    dusun: "Cimenyan Kidul",
    rw: "01",
    rt: "02",
    status: "Aktif",
    alamat: "Jl. Kidul Raya No. 14, RT 02/RW 01, Dusun Cimenyan Kidul",
    bansos: "PKH",
    terdaftarSejak: "14 Feb 2018",
    anggota: [
      {
        nik: "3204051203850001",
        nama: "Ahmad Hidayat",
        hubungan: "Kepala Keluarga",
        jk: "Laki-laki",
        tglLahir: "12 Mar 1985 (39 th)",
        pekerjaan: "Wiraswasta",
        pendidikan: "SMA / Sederajat",
      },
      {
        nik: "3204055406870002",
        nama: "Ratna Sari",
        hubungan: "Istri",
        jk: "Perempuan",
        tglLahir: "14 Jun 1987 (37 th)",
        pekerjaan: "Mengurus Rumah Tangga",
        pendidikan: "SMA / Sederajat",
      },
      {
        nik: "3204051809120003",
        nama: "Fajar Hidayat",
        hubungan: "Anak",
        jk: "Laki-laki",
        tglLahir: "18 Sep 2012 (12 th)",
        pekerjaan: "Pelajar",
        pendidikan: "SD / Sederajat",
      },
      {
        nik: "3204056201160004",
        nama: "Nabila Hidayat",
        hubungan: "Anak",
        jk: "Perempuan",
        tglLahir: "22 Jan 2016 (8 th)",
        pekerjaan: "Belum/Tidak Bekerja",
        pendidikan: "Belum Sekolah",
      },
    ],
  },
  {
    id: "KK-002",
    nomorKk: "3204050987654321",
    kepalaKeluarga: "Siti Aminah",
    nikKepala: "3204054807900001",
    jumlahAnggota: 2,
    dusun: "Bojong Kunci",
    rw: "03",
    rt: "01",
    status: "Aktif",
    alamat: "Kp. Bojong No. 27, RT 01/RW 03, Dusun Bojong Kunci",
    bansos: "BPNT",
    terdaftarSejak: "20 Mei 2020",
    anggota: [
      {
        nik: "3204054807900001",
        nama: "Siti Aminah",
        hubungan: "Kepala Keluarga",
        jk: "Perempuan",
        tglLahir: "08 Jul 1990 (34 th)",
        pekerjaan: "Pedagang",
        pendidikan: "SMP / Sederajat",
      },
      {
        nik: "3204052304140002",
        nama: "Rizky Ramadhan",
        hubungan: "Anak",
        jk: "Laki-laki",
        tglLahir: "23 Apr 2014 (10 th)",
        pekerjaan: "Pelajar",
        pendidikan: "SD / Sederajat",
      },
    ],
  },
  {
    id: "KK-003",
    nomorKk: "3204054443332221",
    kepalaKeluarga: "Budi Santoso",
    nikKepala: "3204051010800001",
    jumlahAnggota: 5,
    dusun: "Cimenyan Kidul",
    rw: "02",
    rt: "04",
    status: "Pindah",
    alamat: "Jl. Mekar No. 05, RT 04/RW 02, Dusun Cimenyan Kidul",
    bansos: "Non-Bansos",
    terdaftarSejak: "09 Jan 2015",
    anggota: [
      {
        nik: "3204051010800001",
        nama: "Budi Santoso",
        hubungan: "Kepala Keluarga",
        jk: "Laki-laki",
        tglLahir: "10 Okt 1980 (44 th)",
        pekerjaan: "Karyawan Swasta",
        pendidikan: "S1 / Diploma",
      },
      {
        nik: "3204055208830002",
        nama: "Endang Supriyati",
        hubungan: "Istri",
        jk: "Perempuan",
        tglLahir: "12 Agu 1983 (41 th)",
        pekerjaan: "Guru",
        pendidikan: "S1 / Diploma",
      },
      {
        nik: "3204051505080003",
        nama: "Dimas Santoso",
        hubungan: "Anak",
        jk: "Laki-laki",
        tglLahir: "15 Mei 2008 (16 th)",
        pekerjaan: "Pelajar",
        pendidikan: "SMA / Sederajat",
      },
      {
        nik: "3204055909110004",
        nama: "Anisa Santoso",
        hubungan: "Anak",
        jk: "Perempuan",
        tglLahir: "19 Sep 2011 (13 th)",
        pekerjaan: "Pelajar",
        pendidikan: "SMP / Sederajat",
      },
      {
        nik: "3204050201480005",
        nama: "Marta Santoso",
        hubungan: "Orang Tua",
        jk: "Laki-laki",
        tglLahir: "02 Jan 1948 (76 th)",
        pekerjaan: "Pensiunan",
        pendidikan: "SMA / Sederajat",
      },
    ],
  },
  {
    id: "KK-004",
    nomorKk: "3204051112223334",
    kepalaKeluarga: "Dewi Lestari",
    nikKepala: "3204056511920001",
    jumlahAnggota: 3,
    dusun: "Mekarwangi",
    rw: "05",
    rt: "02",
    status: "Aktif",
    alamat: "Jl. Cimenyan Wangi No. 88, RT 02/RW 05, Dusun Mekarwangi",
    bansos: "Non-Bansos",
    terdaftarSejak: "18 Nov 2019",
    anggota: [
      {
        nik: "3204056511920001",
        nama: "Dewi Lestari",
        hubungan: "Kepala Keluarga",
        jk: "Perempuan",
        tglLahir: "25 Nov 1992 (32 th)",
        pekerjaan: "PNS / Guru",
        pendidikan: "S1 / Diploma",
      },
      {
        nik: "3204051603890002",
        nama: "Hendra Gunawan",
        hubungan: "Suami",
        jk: "Laki-laki",
        tglLahir: "16 Mar 1989 (35 th)",
        pekerjaan: "Karyawan BUMN",
        pendidikan: "S1 / Diploma",
      },
      {
        nik: "3204056708210003",
        nama: "Alya Zahra",
        hubungan: "Anak",
        jk: "Perempuan",
        tglLahir: "27 Agu 2021 (3 th)",
        pekerjaan: "Belum/Tidak Bekerja",
        pendidikan: "Belum Sekolah",
      },
    ],
  },
  {
    id: "KK-005",
    nomorKk: "3204057788990011",
    kepalaKeluarga: "Dadang Suherman",
    nikKepala: "3204051508750001",
    jumlahAnggota: 4,
    dusun: "Dusun 1",
    rw: "01",
    rt: "01",
    status: "Aktif",
    alamat: "Kp. Krajan Tengah No. 03, RT 01/RW 01, Dusun 1",
    bansos: "BLT DD",
    terdaftarSejak: "02 Mar 2012",
    anggota: [
      {
        nik: "3204051508750001",
        nama: "Dadang Suherman",
        hubungan: "Kepala Keluarga",
        jk: "Laki-laki",
        tglLahir: "15 Agu 1975 (49 th)",
        pekerjaan: "Petani / Pekebun",
        pendidikan: "SD / Sederajat",
      },
      {
        nik: "3204055509780002",
        nama: "Iis Aisyah",
        hubungan: "Istri",
        jk: "Perempuan",
        tglLahir: "15 Sep 1978 (46 th)",
        pekerjaan: "Petani / Pekebun",
        pendidikan: "SD / Sederajat",
      },
      {
        nik: "3204051104030003",
        nama: "Asep Suherman",
        hubungan: "Anak",
        jk: "Laki-laki",
        tglLahir: "11 Apr 2003 (21 th)",
        pekerjaan: "Buruh Harian Lepas",
        pendidikan: "SMA / Sederajat",
      },
      {
        nik: "3204055606070004",
        nama: "Lilis Suherman",
        hubungan: "Anak",
        jk: "Perempuan",
        tglLahir: "16 Jun 2007 (17 th)",
        pekerjaan: "Pelajar",
        pendidikan: "SMA / Sederajat",
      },
    ],
  },
  {
    id: "KK-006",
    nomorKk: "3204056655443322",
    kepalaKeluarga: "Wawan Kurniawan",
    nikKepala: "3204052204820001",
    jumlahAnggota: 3,
    dusun: "Dusun 2",
    rw: "02",
    rt: "03",
    status: "Aktif",
    alamat: "Jl. Sukamaju No. 18, RT 03/RW 02, Dusun 2",
    bansos: "Non-Bansos",
    terdaftarSejak: "11 Jul 2016",
    anggota: [
      {
        nik: "3204052204820001",
        nama: "Wawan Kurniawan",
        hubungan: "Kepala Keluarga",
        jk: "Laki-laki",
        tglLahir: "22 Apr 1982 (42 th)",
        pekerjaan: "Montir / Teknisi",
        pendidikan: "SMK / Sederajat",
      },
      {
        nik: "3204056105860002",
        nama: "Yanti Maryanti",
        hubungan: "Istri",
        jk: "Perempuan",
        tglLahir: "21 Mei 1986 (38 th)",
        pekerjaan: "Mengurus Rumah Tangga",
        pendidikan: "SMA / Sederajat",
      },
      {
        nik: "3204051911150003",
        nama: "Aldi Kurniawan",
        hubungan: "Anak",
        jk: "Laki-laki",
        tglLahir: "19 Nov 2015 (9 th)",
        pekerjaan: "Pelajar",
        pendidikan: "SD / Sederajat",
      },
    ],
  },
  {
    id: "KK-007",
    nomorKk: "3204059988776655",
    kepalaKeluarga: "Encep Supriatna",
    nikKepala: "3204050505680001",
    jumlahAnggota: 2,
    dusun: "Bojong Kunci",
    rw: "03",
    rt: "02",
    status: "Pindah",
    alamat: "Kp. Bojong Kidul No. 12, RT 02/RW 03, Dusun Bojong Kunci",
    bansos: "Non-Bansos",
    terdaftarSejak: "25 Apr 2010",
    anggota: [
      {
        nik: "3204050505680001",
        nama: "Encep Supriatna",
        hubungan: "Kepala Keluarga",
        jk: "Laki-laki",
        tglLahir: "05 Mei 1968 (56 th)",
        pekerjaan: "Pedagang Keliling",
        pendidikan: "SMP / Sederajat",
      },
      {
        nik: "3204054507720002",
        nama: "Cicih Sukarsih",
        hubungan: "Istri",
        jk: "Perempuan",
        tglLahir: "05 Jul 1972 (52 th)",
        pekerjaan: "Mengurus Rumah Tangga",
        pendidikan: "SD / Sederajat",
      },
    ],
  },
  {
    id: "KK-008",
    nomorKk: "3204053322114455",
    kepalaKeluarga: "Cecep Komarudin",
    nikKepala: "3204051402880001",
    jumlahAnggota: 4,
    dusun: "Mekarwangi",
    rw: "05",
    rt: "01",
    status: "Aktif",
    alamat: "Jl. Pinus No. 22, RT 01/RW 05, Dusun Mekarwangi",
    bansos: "PKH",
    terdaftarSejak: "30 Okt 2017",
    anggota: [
      {
        nik: "3204051402880001",
        nama: "Cecep Komarudin",
        hubungan: "Kepala Keluarga",
        jk: "Laki-laki",
        tglLahir: "14 Feb 1988 (36 th)",
        pekerjaan: "Buruh Bangunan",
        pendidikan: "SMP / Sederajat",
      },
      {
        nik: "3204055209900002",
        nama: "Teti Rosita",
        hubungan: "Istri",
        jk: "Perempuan",
        tglLahir: "12 Sep 1990 (34 th)",
        pekerjaan: "Kader Posyandu",
        pendidikan: "SMA / Sederajat",
      },
      {
        nik: "3204051806130003",
        nama: "Rian Komarudin",
        hubungan: "Anak",
        jk: "Laki-laki",
        tglLahir: "18 Jun 2013 (11 th)",
        pekerjaan: "Pelajar",
        pendidikan: "SD / Sederajat",
      },
      {
        nik: "3204055810180004",
        nama: "Siti Komarudin",
        hubungan: "Anak",
        jk: "Perempuan",
        tglLahir: "18 Okt 2018 (6 th)",
        pekerjaan: "Pelajar",
        pendidikan: "TK / PAUD",
      },
    ],
  },
]);

// ==========================================
// COMPUTED: FILTERED FAMILIES & PAGINATION
// ==========================================
const filteredFamilies = computed(() => {
  return families.value.filter((item) => {
    // Search filter: No KK or Nama Kepala Keluarga
    const q = searchQuery.value.trim().toLowerCase();
    if (q) {
      const matchKk = item.nomorKk.toLowerCase().includes(q);
      const matchNama = item.kepalaKeluarga.toLowerCase().includes(q);
      const matchNik = item.nikKepala.toLowerCase().includes(q);
      if (!matchKk && !matchNama && !matchNik) return false;
    }

    // Dusun filter
    if (selectedDusun.value && item.dusun !== selectedDusun.value) {
      return false;
    }

    // RW filter
    if (selectedRW.value && item.rw !== selectedRW.value) {
      return false;
    }

    // Status filter
    if (selectedStatus.value) {
      if (selectedStatus.value.toLowerCase() !== item.status.toLowerCase()) {
        return false;
      }
    }

    // Advanced filters
    if (selectedRT.value && item.rt !== selectedRT.value) {
      return false;
    }

    if (minMembers.value && item.jumlahAnggota < parseInt(minMembers.value, 10)) {
      return false;
    }

    if (maxMembers.value && item.jumlahAnggota > parseInt(maxMembers.value, 10)) {
      return false;
    }

    if (selectedBansos.value && item.bansos !== selectedBansos.value) {
      return false;
    }

    return true;
  });
});

// Pagination State
const currentPage = ref(1);
const itemsPerPage = 4; // Matching Stitch view (4 items visible per page)

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredFamilies.value.length / itemsPerPage));
});

const paginatedFamilies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredFamilies.value.slice(start, start + itemsPerPage);
});

const paginationStart = computed(() => {
  if (filteredFamilies.value.length === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage + 1;
});

const paginationEnd = computed(() => {
  return Math.min(
    currentPage.value * itemsPerPage,
    filteredFamilies.value.length
  );
});

const setPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// ==========================================
// MODAL: DETAIL KARTU KELUARGA
// ==========================================
const isDetailModalOpen = ref(false);
const selectedFamily = ref(null);

const openDetailModal = (family) => {
  selectedFamily.value = family;
  isDetailModalOpen.value = true;
};

const closeDetailModal = () => {
  isDetailModalOpen.value = false;
  selectedFamily.value = null;
};

// ==========================================
// MODAL: TAMBAH KARTU KELUARGA
// ==========================================
const isAddModalOpen = ref(false);
const newFamilyForm = ref({
  nomorKk: "",
  kepalaKeluarga: "",
  nikKepala: "",
  dusun: "Cimenyan Kidul",
  rw: "01",
  rt: "01",
  status: "Aktif",
  bansos: "Non-Bansos",
  alamat: "",
  pekerjaan: "Wiraswasta",
});

const openAddModal = () => {
  newFamilyForm.value = {
    nomorKk: "",
    kepalaKeluarga: "",
    nikKepala: "",
    dusun: "Cimenyan Kidul",
    rw: "01",
    rt: "01",
    status: "Aktif",
    bansos: "Non-Bansos",
    alamat: "",
    pekerjaan: "Wiraswasta",
  };
  isAddModalOpen.value = true;
};

const submitAddFamily = () => {
  if (!newFamilyForm.value.nomorKk || !newFamilyForm.value.kepalaKeluarga) {
    alert("Harap lengkapi Nomor KK dan Nama Kepala Keluarga.");
    return;
  }

  if (newFamilyForm.value.nomorKk.length !== 16) {
    alert("Nomor KK harus 16 digit angka.");
    return;
  }

  const newEntry = {
    id: `KK-${Date.now().toString().slice(-3)}`,
    nomorKk: newFamilyForm.value.nomorKk,
    kepalaKeluarga: newFamilyForm.value.kepalaKeluarga,
    nikKepala: newFamilyForm.value.nikKepala || "320405" + Math.floor(1000000000 + Math.random() * 9000000000),
    jumlahAnggota: 1,
    dusun: newFamilyForm.value.dusun,
    rw: newFamilyForm.value.rw,
    rt: newFamilyForm.value.rt,
    status: newFamilyForm.value.status,
    alamat: newFamilyForm.value.alamat || `RT ${newFamilyForm.value.rt}/RW ${newFamilyForm.value.rw}, Dusun ${newFamilyForm.value.dusun}`,
    bansos: newFamilyForm.value.bansos,
    terdaftarSejak: "Hari ini",
    anggota: [
      {
        nik: newFamilyForm.value.nikKepala || "320405" + Math.floor(1000000000 + Math.random() * 9000000000),
        nama: newFamilyForm.value.kepalaKeluarga,
        hubungan: "Kepala Keluarga",
        jk: "Laki-laki",
        tglLahir: "01 Jan 1990 (34 th)",
        pekerjaan: newFamilyForm.value.pekerjaan,
        pendidikan: "SMA / Sederajat",
      },
    ],
  };

  families.value.unshift(newEntry);
  isAddModalOpen.value = false;
  currentPage.value = 1;
  triggerToast(`Kartu Keluarga No. ${newEntry.nomorKk} berhasil ditambahkan.`);
};

// ==========================================
// EXPORT TO CSV
// ==========================================
const exportToCsv = () => {
  const headers = [
    "Nomor KK",
    "Kepala Keluarga",
    "NIK Kepala",
    "Jumlah Anggota",
    "Dusun",
    "RW",
    "RT",
    "Status",
    "Bansos",
    "Alamat",
  ];

  const rows = filteredFamilies.value.map((f) => [
    `"${f.nomorKk}"`,
    `"${f.kepalaKeluarga.replace(/"/g, '""')}"`,
    `"${f.nikKepala}"`,
    f.jumlahAnggota,
    `"${f.dusun}"`,
    `"${f.rw}"`,
    `"${f.rt}"`,
    `"${f.status}"`,
    `"${f.bansos}"`,
    `"${f.alamat.replace(/"/g, '""')}"`,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `data_keluarga_desa_cimenyan_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  triggerToast("Data Kartu Keluarga berhasil diekspor ke CSV.");
};
</script>

<template>
  <div class="space-y-6">
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

    <!-- Header & Actions -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-2xl font-bold text-[#0b1c30] tracking-tight">Daftar Kartu Keluarga</h2>
        <p class="text-sm text-[#3d4947] mt-1">Kelola data seluruh keluarga di Desa Cimenyan.</p>
      </div>
      <div class="flex gap-2.5">
        <button
          @click="exportToCsv"
          class="flex items-center gap-2 px-4 py-2 bg-white border border-[#bcc9c6] rounded-lg text-[#00685f] hover:bg-[#eff4ff] text-sm font-medium transition-colors shadow-xs cursor-pointer active:scale-95"
          title="Ekspor data ke file CSV"
        >
          <span class="material-symbols-outlined text-[18px]">download</span>
          Ekspor
        </button>
        <button
          @click="openAddModal"
          class="flex items-center gap-2 px-4 py-2 bg-[#00685f] text-white rounded-lg hover:bg-[#005049] text-sm font-medium transition-colors shadow-xs cursor-pointer active:scale-95"
          title="Tambah data Kartu Keluarga baru"
        >
          <span class="material-symbols-outlined text-[18px]">add</span>
          Tambah KK
        </button>
      </div>
    </div>

    <!-- Filters Area -->
    <div class="bg-white p-4 rounded-xl shadow-xs border border-[#E2E8F0] flex flex-wrap gap-3 items-center">
      <!-- Search Input -->
      <div class="relative flex-1 min-w-[240px]">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#3d4947] text-[18px]">search</span>
        <input
          v-model="searchQuery"
          class="w-full pl-10 pr-4 py-2 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] placeholder-[#6d7a77] focus:outline-none focus:border-[#00685f] focus:ring-1 focus:ring-[#00685f] transition-all"
          placeholder="Cari No. KK atau Nama Kepala Keluarga..."
          type="text"
        />
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-[#6d7a77] hover:text-[#0b1c30]"
        >
          <span class="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>

      <!-- Dusun Select -->
      <select
        v-model="selectedDusun"
        class="px-3.5 py-2 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] focus:outline-none focus:border-[#00685f] min-w-[130px] cursor-pointer"
      >
        <option value="">Semua Dusun</option>
        <option value="Cimenyan Kidul">Cimenyan Kidul</option>
        <option value="Bojong Kunci">Bojong Kunci</option>
        <option value="Mekarwangi">Mekarwangi</option>
        <option value="Dusun 1">Dusun 1</option>
        <option value="Dusun 2">Dusun 2</option>
      </select>

      <!-- RW Select -->
      <select
        v-model="selectedRW"
        class="px-3.5 py-2 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] focus:outline-none focus:border-[#00685f] min-w-[110px] cursor-pointer"
      >
        <option value="">Semua RW</option>
        <option value="01">RW 01</option>
        <option value="02">RW 02</option>
        <option value="03">RW 03</option>
        <option value="04">RW 04</option>
        <option value="05">RW 05</option>
      </select>

      <!-- Status Select -->
      <select
        v-model="selectedStatus"
        class="px-3.5 py-2 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] focus:outline-none focus:border-[#00685f] min-w-[120px] cursor-pointer"
      >
        <option value="">Semua Status</option>
        <option value="Aktif">Aktif</option>
        <option value="Pindah">Pindah</option>
      </select>

      <!-- Filter Lanjut Button -->
      <button
        @click="isAdvancedFilterOpen = !isAdvancedFilterOpen"
        :class="[
          'px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 cursor-pointer border',
          isAdvancedFilterOpen || selectedRT || minMembers || maxMembers || selectedBansos
            ? 'bg-[#00685f] text-white border-[#00685f]'
            : 'bg-[#e5eeff] text-[#0b1c30] border-[#bcc9c6] hover:bg-[#dce9ff]'
        ]"
      >
        <span class="material-symbols-outlined text-[18px]">filter_list</span>
        Filter Lanjut
        <span
          v-if="selectedRT || minMembers || maxMembers || selectedBansos"
          class="w-2 h-2 rounded-full bg-white"
        ></span>
      </button>

      <!-- Reset Filter button when active -->
      <button
        v-if="searchQuery || selectedDusun || selectedRW || selectedStatus || selectedRT || minMembers || maxMembers || selectedBansos"
        @click="resetFilters"
        class="text-xs text-[#00685f] hover:underline px-2 py-1 font-medium cursor-pointer"
      >
        Reset Filter
      </button>
    </div>

    <!-- Collapsible Advanced Filter Panel -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div
        v-if="isAdvancedFilterOpen"
        class="bg-white p-4 rounded-xl border border-[#bcc9c6]/60 shadow-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div>
          <label class="block text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1">
            Wilayah RT
          </label>
          <select
            v-model="selectedRT"
            class="w-full px-3 py-1.5 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] focus:outline-none focus:border-[#00685f]"
          >
            <option value="">Semua RT</option>
            <option value="01">RT 01</option>
            <option value="02">RT 02</option>
            <option value="03">RT 03</option>
            <option value="04">RT 04</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1">
            Min. Anggota
          </label>
          <input
            v-model="minMembers"
            type="number"
            min="1"
            placeholder="Contoh: 2"
            class="w-full px-3 py-1.5 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] focus:outline-none focus:border-[#00685f]"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1">
            Maks. Anggota
          </label>
          <input
            v-model="maxMembers"
            type="number"
            min="1"
            placeholder="Contoh: 6"
            class="w-full px-3 py-1.5 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] focus:outline-none focus:border-[#00685f]"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1">
            Bantuan Sosial (DTKS)
          </label>
          <select
            v-model="selectedBansos"
            class="w-full px-3 py-1.5 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] focus:outline-none focus:border-[#00685f]"
          >
            <option value="">Semua Bantuan</option>
            <option value="PKH">PKH</option>
            <option value="BPNT">BPNT</option>
            <option value="BLT DD">BLT DD</option>
            <option value="Non-Bansos">Non-Bansos</option>
          </select>
        </div>
      </div>
    </transition>

    <!-- Data Table Card -->
    <div class="bg-white rounded-xl shadow-xs border border-[#E2E8F0] overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#F9FAFB] border-b border-[#E2E8F0]">
              <th class="py-4 px-6 text-xs font-semibold text-[#3d4947] uppercase tracking-wider whitespace-nowrap">
                Nomor KK
              </th>
              <th class="py-4 px-6 text-xs font-semibold text-[#3d4947] uppercase tracking-wider whitespace-nowrap">
                Kepala Keluarga
              </th>
              <th class="py-4 px-6 text-xs font-semibold text-[#3d4947] uppercase tracking-wider whitespace-nowrap text-center">
                Jml. Anggota
              </th>
              <th class="py-4 px-6 text-xs font-semibold text-[#3d4947] uppercase tracking-wider whitespace-nowrap">
                Dusun
              </th>
              <th class="py-4 px-6 text-xs font-semibold text-[#3d4947] uppercase tracking-wider whitespace-nowrap text-center">
                RW / RT
              </th>
              <th class="py-4 px-6 text-xs font-semibold text-[#3d4947] uppercase tracking-wider whitespace-nowrap text-center">
                Status
              </th>
              <th class="py-4 px-6 text-xs font-semibold text-[#3d4947] uppercase tracking-wider whitespace-nowrap text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#E2E8F0]">
            <tr
              v-for="(family, idx) in paginatedFamilies"
              :key="family.id"
              :class="[
                'hover:bg-[#f8f9ff] transition-colors group cursor-pointer',
                idx % 2 === 1 ? 'bg-[#F9FAFB]' : 'bg-white'
              ]"
              @click="openDetailModal(family)"
            >
              <!-- Nomor KK -->
              <td class="py-4 px-6 text-sm text-[#0b1c30] font-mono whitespace-nowrap font-medium">
                {{ family.nomorKk }}
              </td>

              <!-- Kepala Keluarga -->
              <td class="py-4 px-6 text-sm font-semibold text-[#0b1c30]">
                {{ family.kepalaKeluarga }}
              </td>

              <!-- Jml. Anggota -->
              <td class="py-4 px-6 text-sm text-[#0b1c30] text-center font-medium">
                {{ family.jumlahAnggota }}
              </td>

              <!-- Dusun -->
              <td class="py-4 px-6 text-sm text-[#0b1c30]">
                {{ family.dusun }}
              </td>

              <!-- RW / RT -->
              <td class="py-4 px-6 text-sm text-[#0b1c30] text-center font-mono">
                {{ family.rw }} / {{ family.rt }}
              </td>

              <!-- Status Badge -->
              <td class="py-4 px-6 text-center">
                <span
                  v-if="family.status === 'Aktif'"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DCFCE7] text-[#166534]"
                >
                  Aktif
                </span>
                <span
                  v-else
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#4B5563]"
                >
                  Pindah
                </span>
              </td>

              <!-- Aksi -->
              <td class="py-4 px-6 text-right">
                <button
                  type="button"
                  @click.stop="openDetailModal(family)"
                  class="text-[#00685f] hover:text-[#005049] text-xs font-semibold inline-flex items-center justify-end gap-1 w-full opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  Lihat Detail
                  <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="paginatedFamilies.length === 0">
              <td colspan="7" class="py-12 text-center text-[#565e74]">
                <span class="material-symbols-outlined text-4xl text-[#bcc9c6] mb-2">family_restroom</span>
                <p class="font-medium text-base text-[#0b1c30]">Tidak ada data Kartu Keluarga</p>
                <p class="text-sm text-[#6d7a77] mt-1">Coba sesuaikan kata kunci pencarian atau reset filter.</p>
                <button
                  @click="resetFilters"
                  class="mt-4 px-4 py-2 bg-[#00685f] text-white text-xs font-medium rounded-lg hover:bg-[#005049] transition-colors"
                >
                  Reset Semua Filter
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-[#E2E8F0] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-sm text-[#3d4947]">
          Menampilkan
          <span class="font-medium text-[#0b1c30]">{{ paginationStart }}</span>
          sampai
          <span class="font-medium text-[#0b1c30]">{{ paginationEnd }}</span>
          dari
          <span class="font-medium text-[#0b1c30]">{{ filteredFamilies.length }}</span>
          keluarga
        </p>

        <div class="flex items-center gap-1">
          <!-- Previous Button -->
          <button
            @click="setPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 border border-[#bcc9c6] rounded-md text-sm text-[#3d4947] hover:bg-[#eff4ff] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Sebelumnya
          </button>

          <!-- Page Numbers -->
          <button
            v-for="p in totalPages"
            :key="p"
            @click="setPage(p)"
            :class="[
              'px-3 py-1 rounded-md text-sm font-medium transition-colors border',
              currentPage === p
                ? 'border-[#00685f] bg-[#00685f]/10 text-[#00685f]'
                : 'border-[#bcc9c6] text-[#3d4947] hover:bg-[#eff4ff]'
            ]"
          >
            {{ p }}
          </button>

          <!-- Next Button -->
          <button
            @click="setPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-[#bcc9c6] rounded-md text-sm text-[#3d4947] hover:bg-[#eff4ff] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL: DETAIL KARTU KELUARGA              -->
    <!-- ========================================== -->
    <div
      v-if="isDetailModalOpen && selectedFamily"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      @click.self="closeDetailModal"
    >
      <div class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-[#E2E8F0]">
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#f8f9ff]">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#00685f]/10 text-[#00685f] flex items-center justify-center">
              <span class="material-symbols-outlined text-2xl">family_restroom</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-[#0b1c30]">
                Kartu Keluarga: {{ selectedFamily.nomorKk }}
              </h3>
              <p class="text-xs text-[#565e74]">
                Kepala Keluarga: <span class="font-semibold text-[#0b1c30]">{{ selectedFamily.kepalaKeluarga }}</span>
              </p>
            </div>
          </div>
          <button
            @click="closeDetailModal"
            class="text-[#565e74] hover:text-[#0b1c30] p-1.5 rounded-lg hover:bg-[#e5eeff] transition-colors"
          >
            <span class="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="p-6 overflow-y-auto space-y-6">
          <!-- Summary Info Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-[#f8f9ff] p-3 rounded-xl border border-[#E2E8F0]">
              <span class="text-xs text-[#565e74] block">Status KK</span>
              <span
                :class="[
                  'inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold',
                  selectedFamily.status === 'Aktif'
                    ? 'bg-[#DCFCE7] text-[#166534]'
                    : 'bg-[#F3F4F6] text-[#4B5563]'
                ]"
              >
                {{ selectedFamily.status }}
              </span>
            </div>

            <div class="bg-[#f8f9ff] p-3 rounded-xl border border-[#E2E8F0]">
              <span class="text-xs text-[#565e74] block">Jumlah Anggota</span>
              <span class="text-base font-bold text-[#0b1c30] mt-0.5 block">
                {{ selectedFamily.jumlahAnggota }} Orang
              </span>
            </div>

            <div class="bg-[#f8f9ff] p-3 rounded-xl border border-[#E2E8F0]">
              <span class="text-xs text-[#565e74] block">Wilayah</span>
              <span class="text-xs font-semibold text-[#0b1c30] mt-0.5 block">
                {{ selectedFamily.dusun }} (RW {{ selectedFamily.rw }}/RT {{ selectedFamily.rt }})
              </span>
            </div>

            <div class="bg-[#f8f9ff] p-3 rounded-xl border border-[#E2E8F0]">
              <span class="text-xs text-[#565e74] block">Bantuan Sosial</span>
              <span class="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#e5eeff] text-[#00685f]">
                {{ selectedFamily.bansos }}
              </span>
            </div>
          </div>

          <!-- Alamat Lengkap -->
          <div class="bg-[#f8f9ff] p-3.5 rounded-xl border border-[#E2E8F0] flex items-start gap-2.5">
            <span class="material-symbols-outlined text-[#00685f] text-lg shrink-0 mt-0.5">location_on</span>
            <div class="text-xs">
              <span class="text-[#565e74] block">Alamat Domisili Terdaftar:</span>
              <span class="font-medium text-[#0b1c30]">{{ selectedFamily.alamat }}</span>
            </div>
          </div>

          <!-- Anggota Keluarga Table -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-bold text-[#0b1c30] flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base text-[#00685f]">group</span>
                Daftar Anggota Keluarga ({{ selectedFamily.anggota?.length || selectedFamily.jumlahAnggota }})
              </h4>
              <span class="text-xs text-[#565e74]">
                Terdaftar sejak: {{ selectedFamily.terdaftarSejak }}
              </span>
            </div>

            <div class="border border-[#E2E8F0] rounded-xl overflow-hidden">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-[#F9FAFB] border-b border-[#E2E8F0] text-[#565e74]">
                    <th class="py-2.5 px-3 font-semibold">NIK</th>
                    <th class="py-2.5 px-3 font-semibold">Nama Lengkap</th>
                    <th class="py-2.5 px-3 font-semibold">Hubungan</th>
                    <th class="py-2.5 px-3 font-semibold">JK</th>
                    <th class="py-2.5 px-3 font-semibold">Tgl Lahir / Usia</th>
                    <th class="py-2.5 px-3 font-semibold">Pekerjaan</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#E2E8F0]">
                  <tr
                    v-for="member in selectedFamily.anggota"
                    :key="member.nik"
                    class="hover:bg-[#f8f9ff]"
                  >
                    <td class="py-2.5 px-3 font-mono font-medium text-[#0b1c30]">{{ member.nik }}</td>
                    <td class="py-2.5 px-3 font-semibold text-[#0b1c30]">{{ member.nama }}</td>
                    <td class="py-2.5 px-3">
                      <span
                        :class="[
                          'px-2 py-0.5 rounded-md text-[11px] font-medium',
                          member.hubungan === 'Kepala Keluarga'
                            ? 'bg-[#00685f]/10 text-[#00685f] font-bold'
                            : 'bg-slate-100 text-slate-700'
                        ]"
                      >
                        {{ member.hubungan }}
                      </span>
                    </td>
                    <td class="py-2.5 px-3 text-[#565e74]">{{ member.jk }}</td>
                    <td class="py-2.5 px-3 text-[#565e74]">{{ member.tglLahir }}</td>
                    <td class="py-2.5 px-3 text-[#565e74]">{{ member.pekerjaan }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-[#E2E8F0] bg-[#f8f9ff] flex items-center justify-between">
          <button
            @click="triggerToast(`Salinan KK No. ${selectedFamily.nomorKk} siap dicetak.`)"
            class="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#bcc9c6] rounded-lg text-xs font-medium text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
          >
            <span class="material-symbols-outlined text-[16px]">print</span>
            Cetak Salinan KK
          </button>
          <button
            @click="closeDetailModal"
            class="px-4 py-2 bg-[#00685f] hover:bg-[#005049] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL: TAMBAH KARTU KELUARGA              -->
    <!-- ========================================== -->
    <div
      v-if="isAddModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      @click.self="isAddModalOpen = false"
    >
      <div class="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-[#E2E8F0]">
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#f8f9ff]">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-[#00685f] text-white flex items-center justify-center">
              <span class="material-symbols-outlined text-xl">add</span>
            </div>
            <div>
              <h3 class="text-base font-bold text-[#0b1c30]">Tambah Kartu Keluarga Baru</h3>
              <p class="text-xs text-[#565e74]">Entri data registrasi Kartu Keluarga Desa Cimenyan</p>
            </div>
          </div>
          <button
            @click="isAddModalOpen = false"
            class="text-[#565e74] hover:text-[#0b1c30] p-1.5 rounded-lg hover:bg-[#e5eeff] transition-colors"
          >
            <span class="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <!-- Modal Form Body -->
        <form @submit.prevent="submitAddFamily" class="p-6 overflow-y-auto space-y-4">
          <!-- Nomor KK & NIK Kepala -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">
                Nomor Kartu Keluarga (16 Digit) <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newFamilyForm.nomorKk"
                type="text"
                maxlength="16"
                required
                placeholder="320405xxxxxxxxxx"
                class="w-full px-3 py-2 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] font-mono focus:outline-none focus:border-[#00685f]"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">
                Nama Kepala Keluarga <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newFamilyForm.kepalaKeluarga"
                type="text"
                required
                placeholder="Nama lengkap kepala keluarga"
                class="w-full px-3 py-2 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] focus:outline-none focus:border-[#00685f]"
              />
            </div>
          </div>

          <!-- NIK & Pekerjaan Kepala Keluarga -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">
                NIK Kepala Keluarga
              </label>
              <input
                v-model="newFamilyForm.nikKepala"
                type="text"
                maxlength="16"
                placeholder="320405xxxxxxxxxx"
                class="w-full px-3 py-2 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] font-mono focus:outline-none focus:border-[#00685f]"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">
                Pekerjaan Kepala Keluarga
              </label>
              <input
                v-model="newFamilyForm.pekerjaan"
                type="text"
                placeholder="Contoh: Wiraswasta, Petani, dll"
                class="w-full px-3 py-2 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] focus:outline-none focus:border-[#00685f]"
              />
            </div>
          </div>

          <!-- Dusun, RW, RT -->
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Dusun</label>
              <select
                v-model="newFamilyForm.dusun"
                class="w-full px-3 py-2 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] focus:outline-none focus:border-[#00685f]"
              >
                <option value="Cimenyan Kidul">Cimenyan Kidul</option>
                <option value="Bojong Kunci">Bojong Kunci</option>
                <option value="Mekarwangi">Mekarwangi</option>
                <option value="Dusun 1">Dusun 1</option>
                <option value="Dusun 2">Dusun 2</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">RW</label>
              <select
                v-model="newFamilyForm.rw"
                class="w-full px-3 py-2 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] focus:outline-none focus:border-[#00685f]"
              >
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">RT</label>
              <select
                v-model="newFamilyForm.rt"
                class="w-full px-3 py-2 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] focus:outline-none focus:border-[#00685f]"
              >
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
              </select>
            </div>
          </div>

          <!-- Status & Bansos -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Status Kependudukan</label>
              <select
                v-model="newFamilyForm.status"
                class="w-full px-3 py-2 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] focus:outline-none focus:border-[#00685f]"
              >
                <option value="Aktif">Aktif</option>
                <option value="Pindah">Pindah</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Status Bansos / DTKS</label>
              <select
                v-model="newFamilyForm.bansos"
                class="w-full px-3 py-2 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] focus:outline-none focus:border-[#00685f]"
              >
                <option value="Non-Bansos">Non-Bansos</option>
                <option value="PKH">PKH</option>
                <option value="BPNT">BPNT</option>
                <option value="BLT DD">BLT DD</option>
              </select>
            </div>
          </div>

          <!-- Alamat Lengkap -->
          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Alamat Lengkap</label>
            <textarea
              v-model="newFamilyForm.alamat"
              rows="2"
              placeholder="Jalan, nomor rumah, patokan, dll..."
              class="w-full px-3 py-2 bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-sm text-[#0b1c30] focus:outline-none focus:border-[#00685f]"
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="pt-4 border-t border-[#E2E8F0] flex justify-end gap-2.5">
            <button
              type="button"
              @click="isAddModalOpen = false"
              class="px-4 py-2 bg-white border border-[#bcc9c6] rounded-lg text-xs font-medium text-[#565e74] hover:bg-[#eff4ff] transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-5 py-2 bg-[#00685f] hover:bg-[#005049] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            >
              Simpan Data KK
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
