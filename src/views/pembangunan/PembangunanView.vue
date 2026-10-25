<script setup>
import { ref, computed } from "vue";

// Filter & Search State
const searchQuery = ref("");
const selectedStatusFilter = ref("all"); // 'all', 'Berjalan', 'Hampir Selesai', 'Selesai', 'Perencanaan'
const selectedCategoryFilter = ref("all");
const currentPage = ref(1);
const itemsPerPage = 5;

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

// Category Configuration
const categoryConfig = {
  Infrastruktur: {
    icon: "add_road",
    badge: "bg-[#e5eeff] text-[#00685f] border-[#bcc9c6]/40",
  },
  "Fasilitas Kesehatan": {
    icon: "apartment",
    badge: "bg-[#dae2fd] text-[#565e74] border-[#bcc9c6]/40",
  },
  Pertanian: {
    icon: "water_drop",
    badge: "bg-[#ccfbf1] text-[#00685f] border-[#0d9488]/30",
  },
  Pendidikan: {
    icon: "school",
    badge: "bg-[#ffddb8] text-[#825100] border-[#a36700]/30",
  },
  "Sarana Umum": {
    icon: "lightbulb",
    badge: "bg-[#f1f5f9] text-[#334155] border-[#cbd5e1]",
  },
};

// Projects Dataset
const projects = ref([
  {
    id: "PRJ-2024-001",
    nama: "Perbaikan Jalan Desa",
    kategori: "Infrastruktur",
    lokasi: "Dusun Mawar, RT 02",
    dusun: "Dusun Mawar",
    anggaran: 150000000,
    terserap: 112500000,
    sumberDana: "Dana Desa (DDS)",
    progress: 75,
    status: "Berjalan",
    targetSelesai: "15 Nov 2024",
    tanggalMulai: "01 Sep 2024",
    penanggungJawab: "Suherman (TPK Infrastruktur)",
    kontak: "0812-3456-7890",
    deskripsi:
      "Pengaspalan hotmix jalan desa sepanjang 850 meter untuk memperlancar akses mobilitas warga dan distribusi hasil panen pertanian.",
    milestones: [
      { text: "Pembersihan & pemadatan pondasi jalan", done: true },
      { text: "Pemasangan gorong-gorong drainase kanan-kiri", done: true },
      { text: "Penghamparan lapisan aspal dasar (binder)", done: true },
      { text: "Finishing lapisan aus (wearing course) & marka", done: false },
    ],
  },
  {
    id: "PRJ-2024-002",
    nama: "Renovasi Posyandu",
    kategori: "Fasilitas Kesehatan",
    lokasi: "Dusun Melati, RT 05",
    dusun: "Dusun Melati",
    anggaran: 75000000,
    terserap: 22500000,
    sumberDana: "Alokasi Dana Desa (ADD)",
    progress: 30,
    status: "Berjalan",
    targetSelesai: "20 Des 2024",
    tanggalMulai: "10 Okt 2024",
    penanggungJawab: "Endang Sulastri (Kader Posyandu)",
    kontak: "0813-8821-4321",
    deskripsi:
      "Perluasan ruang timbang balita, perbaikan atap bocor, dan penambahan fasilitas toilet ramah lansia di Posyandu Melati Indah.",
    milestones: [
      { text: "Pembongkaran dinding sekat lama", done: true },
      { text: "Pengecoran tiang penyangga ruang tambahan", done: true },
      { text: "Pemasangan atap genteng & plafon gypsum", done: false },
      { text: "Pengecatan interior & instalasi sanitasi baru", done: false },
    ],
  },
  {
    id: "PRJ-2024-003",
    nama: "Saluran Irigasi Baru",
    kategori: "Pertanian",
    lokasi: "Blok Sawah Lor",
    dusun: "Dusun Cimenyan",
    anggaran: 200000000,
    terserap: 190000000,
    sumberDana: "Bantuan Provinsi (Banprov)",
    progress: 95,
    status: "Hampir Selesai",
    targetSelesai: "01 Nov 2024",
    tanggalMulai: "15 Jul 2024",
    penanggungJawab: "H. Kosasih (Ketua Gapoktan)",
    kontak: "0852-9011-2233",
    deskripsi:
      "Pembangunan plengsengan beton saluran irigasi teknis sepanjang 1.200 meter untuk mengairi 45 hektar sawah tadah hujan.",
    milestones: [
      { text: "Penggalian trasir saluran primer", done: true },
      { text: "Pemasangan batu kali & cor beton lantai saluran", done: true },
      { text: "Pemasangan pintu air pengatur debit", done: true },
      { text: "Pembersihan lumpur sisa material & uji coba aliran", done: false },
    ],
  },
  {
    id: "PRJ-2024-004",
    nama: "Pembangunan MCK & Sanitasi Warga",
    kategori: "Fasilitas Kesehatan",
    lokasi: "Dusun Cimenyan, RT 01",
    dusun: "Dusun Cimenyan",
    anggaran: 60000000,
    terserap: 60000000,
    sumberDana: "Dana Desa (DDS)",
    progress: 100,
    status: "Selesai",
    targetSelesai: "10 Okt 2024",
    tanggalMulai: "01 Agu 2024",
    penanggungJawab: "Yayan Rohyan",
    kontak: "0877-6543-2199",
    deskripsi:
      "Pembangunan fasilitas sanitasi komunal berupa 4 bilik toilet, tempat wudhu, dan bio-septic tank ramah lingkungan untuk mencegah BABS.",
    milestones: [
      { text: "Pondasi & pemasangan bio-septic tank", done: true },
      { text: "Struktur dinding & plester keramik", done: true },
      { text: "Instalasi torn penampung air 1000L & pompa", done: true },
      { text: "Serah terima kunci ke RT & pengurus warga", done: true },
    ],
  },
  {
    id: "PRJ-2024-005",
    nama: "Pengaspalan Jalan Lingkungan RW 04",
    kategori: "Infrastruktur",
    lokasi: "Dusun Padasuka, RW 04",
    dusun: "Dusun Padasuka",
    anggaran: 120000000,
    terserap: 60000000,
    sumberDana: "Dana Desa (DDS)",
    progress: 50,
    status: "Berjalan",
    targetSelesai: "30 Nov 2024",
    tanggalMulai: "01 Okt 2024",
    penanggungJawab: "Wawan Hermawan",
    kontak: "0819-3344-5566",
    deskripsi:
      "Perbaikan lapis penetrasi jalan gang lingkungan sepanjang 600m yang menghubungkan permukiman warga ke jalan kabupaten.",
    milestones: [
      { text: "Pembersihan rumput & parit kiri kanan", done: true },
      { text: "Gelar batu belah base-course", done: true },
      { text: "Penyiraman aspal emulsi lapis kedua", done: false },
      { text: "Pemadatan gilingan akhir baby roller", done: false },
    ],
  },
  {
    id: "PRJ-2024-006",
    nama: "Pemasangan Lampu Penerangan Jalan (PJU)",
    kategori: "Sarana Umum",
    lokasi: "Dusun Ciburial (Jalur Utama)",
    dusun: "Dusun Ciburial",
    anggaran: 45000000,
    terserap: 45000000,
    sumberDana: "Bagi Hasil Pajak (BHP)",
    progress: 100,
    status: "Selesai",
    targetSelesai: "05 Sep 2024",
    tanggalMulai: "10 Agu 2024",
    penanggungJawab: "Asep Sunandar",
    kontak: "0812-7788-9900",
    deskripsi:
      "Pemasangan 30 unit tiang lampu jalan tenaga surya (Solar Cell) di titik-titik rawan gelap jalan perbatasan desa.",
    milestones: [
      { text: "Survei titik lokasi rawan & pengukuran tiang", done: true },
      { text: "Pengecoran umpak angkur tiang", done: true },
      { text: "Ereksi tiang dan panel surya monocrystalline", done: true },
      { text: "Uji nyala otomatis sensor cahaya malam", done: true },
    ],
  },
  {
    id: "PRJ-2024-007",
    nama: "Rehabilitasi Gedung PAUD Kasih Ibu",
    kategori: "Pendidikan",
    lokasi: "Dusun Cikadut, RT 03",
    dusun: "Dusun Cikadut",
    anggaran: 85000000,
    terserap: 12750000,
    sumberDana: "Dana Desa (DDS)",
    progress: 15,
    status: "Berjalan",
    targetSelesai: "15 Jan 2025",
    tanggalMulai: "15 Okt 2024",
    penanggungJawab: "Ibu Nurjanah, S.Pd",
    kontak: "0857-1122-3344",
    deskripsi:
      "Penyediaan lantai bermain edukatif busa, perbaikan plafon atap, dan renovasi taman bermain luar (playground) anak usia dini.",
    milestones: [
      { text: "Pembongkaran plafon asbes lapuk", done: true },
      { text: "Perbaikan rangka atap baja ringan", done: false },
      { text: "Pemasangan keramik lantai antibakteri", done: false },
      { text: "Pengadaan ayunan & perosotan keselamatan", done: false },
    ],
  },
  {
    id: "PRJ-2024-008",
    nama: "Pembuatan Bak Penampungan Air Bersih",
    kategori: "Infrastruktur",
    lokasi: "Dusun Sukamaju, RW 02",
    dusun: "Dusun Sukamaju",
    anggaran: 110000000,
    terserap: 0,
    sumberDana: "Bantuan Keuangan Khusus (BKK)",
    progress: 0,
    status: "Perencanaan",
    targetSelesai: "28 Feb 2025",
    tanggalMulai: "01 Des 2024",
    penanggungJawab: "Dedi Supardi",
    kontak: "0821-4455-6677",
    deskripsi:
      "Pembangunan reservoir air bersih kapasitas 30.000 liter untuk mengatasi krisis air saat musim kemarau bagi 180 KK.",
    milestones: [
      { text: "Uji geolistrik sumber mata air pegunungan", done: false },
      { text: "Pembebasan hak guna tanah hibah warga", done: false },
      { text: "Pengecoran dinding kedap air reservoir", done: false },
      { text: "Pemasangan jaringan pipa distribusi HDPE", done: false },
    ],
  },
]);

// Summary Statistics Calculations
const totalProjectsCount = computed(() => projects.value.length);

const ongoingProjectsCount = computed(
  () =>
    projects.value.filter(
      (p) => p.status === "Berjalan" || p.status === "Hampir Selesai"
    ).length
);

const completedThisYearCount = computed(
  () => projects.value.filter((p) => p.status === "Selesai").length
);

const totalAnggaran = computed(() =>
  projects.value.reduce((sum, p) => sum + p.anggaran, 0)
);

const totalTerserap = computed(() =>
  projects.value.reduce((sum, p) => sum + (p.terserap || 0), 0)
);

const serapanPersentase = computed(() => {
  if (totalAnggaran.value === 0) return 0;
  return Math.round((totalTerserap.value / totalAnggaran.value) * 100);
});

// Format Rupiah Currency Helper
const formatRupiah = (val) => {
  if (val === undefined || val === null) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

// Format Compact Rupiah (e.g. 1.25 M)
const formatCompactRupiah = (val) => {
  if (!val) return "0";
  if (val >= 1000000000) {
    return (val / 1000000000).toFixed(2).replace(".", ",") + " M";
  }
  if (val >= 1000000) {
    return (val / 1000000).toFixed(0) + " Jt";
  }
  return val.toLocaleString("id-ID");
};

// Status Styling Helper
const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Berjalan":
      return "bg-[#ffddb8] text-[#825100]";
    case "Hampir Selesai":
      return "bg-[#ccfbf1] text-[#00685f]";
    case "Selesai":
      return "bg-[#d1fae5] text-[#065f46]";
    case "Perencanaan":
      return "bg-[#eff4ff] text-[#565e74]";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

// Filtered Projects
const filteredProjects = computed(() => {
  return projects.value.filter((p) => {
    // Search filter
    const matchesSearch =
      searchQuery.value.trim() === "" ||
      p.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.kategori.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.lokasi.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.value.toLowerCase());

    // Status filter
    const matchesStatus =
      selectedStatusFilter.value === "all" ||
      p.status === selectedStatusFilter.value;

    // Category filter
    const matchesCategory =
      selectedCategoryFilter.value === "all" ||
      p.kategori === selectedCategoryFilter.value;

    return matchesSearch && matchesStatus && matchesCategory;
  });
});

// Pagination Calculations
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredProjects.value.length / itemsPerPage))
);

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProjects.value.slice(start, start + itemsPerPage);
});

const setPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Detail Modal State
const selectedProject = ref(null);
const isDetailModalOpen = ref(false);

const openDetail = (project) => {
  selectedProject.value = JSON.parse(JSON.stringify(project));
  isDetailModalOpen.value = true;
};

const closeDetail = () => {
  isDetailModalOpen.value = false;
  selectedProject.value = null;
};

// Direct update project progress or status from modal
const saveProjectChanges = () => {
  if (!selectedProject.value) return;
  const index = projects.value.findIndex((p) => p.id === selectedProject.value.id);
  if (index !== -1) {
    // Auto status adjust if progress 100%
    if (selectedProject.value.progress >= 100) {
      selectedProject.value.status = "Selesai";
      selectedProject.value.progress = 100;
    } else if (selectedProject.value.progress >= 90) {
      selectedProject.value.status = "Hampir Selesai";
    } else if (selectedProject.value.progress > 0) {
      selectedProject.value.status = "Berjalan";
    } else {
      selectedProject.value.status = "Perencanaan";
    }

    projects.value[index] = { ...selectedProject.value };
    triggerToast(`Perubahan proyek "${selectedProject.value.nama}" berhasil disimpan.`);
    closeDetail();
  }
};

// Add New Project Modal State
const isAddModalOpen = ref(false);
const newProjectForm = ref({
  nama: "",
  kategori: "Infrastruktur",
  lokasi: "",
  dusun: "Dusun Cimenyan",
  anggaran: "",
  sumberDana: "Dana Desa (DDS)",
  targetSelesai: "",
  tanggalMulai: "",
  penanggungJawab: "",
  kontak: "",
  deskripsi: "",
});

const resetNewProjectForm = () => {
  newProjectForm.value = {
    nama: "",
    kategori: "Infrastruktur",
    lokasi: "",
    dusun: "Dusun Cimenyan",
    anggaran: "",
    sumberDana: "Dana Desa (DDS)",
    targetSelesai: "",
    tanggalMulai: "",
    penanggungJawab: "",
    kontak: "",
    deskripsi: "",
  };
};

const handleAddProject = () => {
  if (!newProjectForm.value.nama || !newProjectForm.value.anggaran) {
    alert("Harap isi Nama Proyek dan Jumlah Anggaran.");
    return;
  }

  const rawAnggaran = Number(newProjectForm.value.anggaran) || 0;
  const newId = `PRJ-2024-${String(projects.value.length + 1).padStart(3, "0")}`;

  const newProj = {
    id: newId,
    nama: newProjectForm.value.nama,
    kategori: newProjectForm.value.kategori,
    lokasi: newProjectForm.value.lokasi || "Desa Cimenyan",
    dusun: newProjectForm.value.dusun,
    anggaran: rawAnggaran,
    terserap: 0,
    sumberDana: newProjectForm.value.sumberDana,
    progress: 0,
    status: "Perencanaan",
    targetSelesai: newProjectForm.value.targetSelesai || "31 Des 2024",
    tanggalMulai: newProjectForm.value.tanggalMulai || "01 Nov 2024",
    penanggungJawab: newProjectForm.value.penanggungJawab || "TPK Desa",
    kontak: newProjectForm.value.kontak || "-",
    deskripsi:
      newProjectForm.value.deskripsi ||
      "Proyek pembangunan sarana dan prasarana desa untuk menunjang kesejahteraan warga.",
    milestones: [
      { text: "Perencanaan teknis & penyusunan RAB", done: true },
      { text: "Sosialisasi ke warga setempat & musyawarah", done: false },
      { text: "Pekerjaan fisik konstruksi utama", done: false },
      { text: "Pemeriksaan akhir & serah terima hasil kegiatan", done: false },
    ],
  };

  projects.value.unshift(newProj);
  isAddModalOpen.value = false;
  resetNewProjectForm();
  triggerToast(`Proyek baru "${newProj.nama}" berhasil ditambahkan.`);
};

// Export to CSV / JSON summary
const exportProjectSummary = () => {
  const header = "ID,Nama Proyek,Kategori,Lokasi,Anggaran,Terserap,Progress,Status,Target Selesai\n";
  const rows = projects.value
    .map(
      (p) =>
        `"${p.id}","${p.nama}","${p.kategori}","${p.lokasi}",${p.anggaran},${p.terserap || 0},${p.progress}%,"${p.status}","${p.targetSelesai}"`
    )
    .join("\n");
  
  const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `laporan-pembangunan-desa-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  triggerToast("Data rekapitulasi proyek berhasil diekspor ke format CSV.");
};
</script>

<template>
  <div class="space-y-6 md:space-y-8 animate-fadeIn">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
          Manajemen Proyek Pembangunan
        </h2>
        <p class="text-sm sm:text-base text-[#3d4947] mt-1">
          Pantau progress, anggaran, dan status pembangunan desa terpadu.
        </p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <button
          @click="exportProjectSummary"
          class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-white text-[#3d4947] border border-[#bcc9c6] px-4 py-2.5 rounded-lg text-sm font-semibold shadow-xs hover:bg-[#e5eeff] hover:text-[#0b1c30] transition-colors cursor-pointer"
          title="Ekspor Laporan CSV"
        >
          <span class="material-symbols-outlined text-[18px]">download</span>
          <span>Unduh Laporan</span>
        </button>

        <button
          @click="isAddModalOpen = true"
          class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#00685f] hover:bg-[#005049] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
        >
          <span class="material-symbols-outlined text-[20px]">add</span>
          <span>Tambah Proyek Baru</span>
        </button>
      </div>
    </div>

    <!-- Summary Bento Grid (4 Cards matching Stitch Design) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <!-- Card 1: Total Proyek -->
      <div
        class="bg-white/85 backdrop-blur-md rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36 relative overflow-hidden group"
      >
        <div
          class="absolute -right-4 -top-4 w-24 h-24 bg-[#e5eeff] rounded-full opacity-60 group-hover:scale-115 transition-transform duration-300"
        ></div>
        <div class="flex justify-between items-start z-10">
          <span class="text-xs font-semibold text-[#3d4947] uppercase tracking-wider">
            Total Proyek
          </span>
          <div class="w-9 h-9 rounded-xl bg-[#ccfbf1]/60 flex items-center justify-center text-[#00685f]">
            <span class="material-symbols-outlined text-[22px]">account_tree</span>
          </div>
        </div>
        <div class="z-10 mt-auto">
          <div class="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
            {{ totalProjectsCount }}
          </div>
          <p class="text-xs text-[#6d7a77] mt-1 flex items-center gap-1 font-medium">
            <span class="inline-block w-2 h-2 rounded-full bg-[#0d9488]"></span>
            Tercatat di APBDes 2024
          </p>
        </div>
      </div>

      <!-- Card 2: Sedang Berjalan -->
      <div
        class="bg-white/85 backdrop-blur-md rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36 relative overflow-hidden group"
      >
        <div
          class="absolute -right-4 -top-4 w-24 h-24 bg-[#ffddb8] rounded-full opacity-50 group-hover:scale-115 transition-transform duration-300"
        ></div>
        <div class="flex justify-between items-start z-10">
          <span class="text-xs font-semibold text-[#3d4947] uppercase tracking-wider">
            Sedang Berjalan
          </span>
          <div class="w-9 h-9 rounded-xl bg-[#ffddb8]/70 flex items-center justify-center text-[#825100]">
            <span class="material-symbols-outlined text-[22px]">sync</span>
          </div>
        </div>
        <div class="z-10 mt-auto">
          <div class="flex items-baseline gap-2.5">
            <span class="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
              {{ ongoingProjectsCount }}
            </span>
            <span class="text-xs font-semibold text-[#825100] bg-[#ffddb8] px-2.5 py-0.5 rounded-full">
              Aktif
            </span>
          </div>
          <p class="text-xs text-[#6d7a77] mt-1">Pengerjaan fisik di lapangan</p>
        </div>
      </div>

      <!-- Card 3: Selesai (Tahun Ini) -->
      <div
        class="bg-white/85 backdrop-blur-md rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36 relative overflow-hidden group"
      >
        <div
          class="absolute -right-4 -top-4 w-24 h-24 bg-[#ccfbf1] rounded-full opacity-60 group-hover:scale-115 transition-transform duration-300"
        ></div>
        <div class="flex justify-between items-start z-10">
          <span class="text-xs font-semibold text-[#3d4947] uppercase tracking-wider">
            Selesai (Tahun Ini)
          </span>
          <div class="w-9 h-9 rounded-xl bg-[#ccfbf1] flex items-center justify-center text-[#00685f]">
            <span class="material-symbols-outlined text-[22px]">check_circle</span>
          </div>
        </div>
        <div class="z-10 mt-auto">
          <div class="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
            {{ completedThisYearCount }}
          </div>
          <p class="text-xs text-[#00685f] mt-1 font-medium flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">verified</span>
            100% Selesai & Diresmikan
          </p>
        </div>
      </div>

      <!-- Card 4: Total Anggaran (Rp) -->
      <div
        class="bg-white/85 backdrop-blur-md rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36 relative overflow-hidden group"
      >
        <div
          class="absolute -right-4 -top-4 w-24 h-24 bg-[#d3e4fe] rounded-full opacity-60 group-hover:scale-115 transition-transform duration-300"
        ></div>
        <div class="flex justify-between items-start z-10">
          <span class="text-xs font-semibold text-[#3d4947] uppercase tracking-wider">
            Total Anggaran (Rp)
          </span>
          <div class="w-9 h-9 rounded-xl bg-[#e5eeff] flex items-center justify-center text-[#0b1c30]">
            <span class="material-symbols-outlined text-[22px]">account_balance_wallet</span>
          </div>
        </div>
        <div class="z-10 mt-auto">
          <div class="text-2xl sm:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
            {{ formatCompactRupiah(totalAnggaran) }}
          </div>
          <div class="mt-1 flex items-center justify-between text-xs text-[#3d4947]">
            <span class="font-medium">Terserap: {{ serapanPersentase }}%</span>
            <span class="text-[#6d7a77] text-[11px]">{{ formatCompactRupiah(totalTerserap) }}</span>
          </div>
          <div class="w-full bg-[#e5eeff] h-1.5 rounded-full overflow-hidden mt-1">
            <div
              class="bg-[#00685f] h-full rounded-full transition-all duration-500"
              :style="{ width: `${serapanPersentase}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Proyek List Section Card -->
    <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      <!-- Section Header with Search and Filter Toolbar -->
      <div
        class="px-5 py-4 border-b border-slate-200/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-slate-50/70"
      >
        <div class="flex items-center gap-3">
          <h3 class="text-lg font-bold text-[#0b1c30]">Daftar Proyek Desa</h3>
          <span
            class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#e5eeff] text-[#00685f]"
          >
            {{ filteredProjects.length }} Proyek
          </span>
        </div>

        <!-- Search & Filter Controls -->
        <div class="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <!-- Search Input -->
          <div class="relative flex-1 md:w-64">
            <span
              class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a77] text-[18px]"
            >
              search
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari proyek, lokasi, kategori..."
              class="w-full pl-9 pr-3 py-1.5 bg-white rounded-lg border border-[#bcc9c6]/70 text-xs sm:text-sm text-[#0b1c30] placeholder-[#6d7a77] focus:outline-none focus:ring-2 focus:ring-[#00685f] focus:border-transparent transition-all"
            />
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>

          <!-- Category Filter -->
          <select
            v-model="selectedCategoryFilter"
            class="px-3 py-1.5 bg-white rounded-lg border border-[#bcc9c6]/70 text-xs sm:text-sm text-[#3d4947] focus:outline-none focus:ring-2 focus:ring-[#00685f] cursor-pointer"
          >
            <option value="all">Semua Kategori</option>
            <option value="Infrastruktur">Infrastruktur</option>
            <option value="Fasilitas Kesehatan">Fasilitas Kesehatan</option>
            <option value="Pertanian">Pertanian</option>
            <option value="Pendidikan">Pendidikan</option>
            <option value="Sarana Umum">Sarana Umum</option>
          </select>

          <!-- Status Filter -->
          <select
            v-model="selectedStatusFilter"
            class="px-3 py-1.5 bg-white rounded-lg border border-[#bcc9c6]/70 text-xs sm:text-sm text-[#3d4947] focus:outline-none focus:ring-2 focus:ring-[#00685f] cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="Berjalan">Berjalan</option>
            <option value="Hampir Selesai">Hampir Selesai</option>
            <option value="Selesai">Selesai</option>
            <option value="Perencanaan">Perencanaan</option>
          </select>
        </div>
      </div>

      <!-- Quick Status Filter Pills -->
      <div class="px-5 py-2.5 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
        <span class="text-[#6d7a77] font-medium shrink-0">Filter Cepat:</span>
        <button
          @click="selectedStatusFilter = 'all'"
          :class="[
            'px-3 py-1 rounded-full font-medium transition-colors shrink-0 cursor-pointer',
            selectedStatusFilter === 'all'
              ? 'bg-[#00685f] text-white shadow-xs'
              : 'bg-slate-100 text-[#3d4947] hover:bg-slate-200'
          ]"
        >
          Semua ({{ projects.length }})
        </button>
        <button
          @click="selectedStatusFilter = 'Berjalan'"
          :class="[
            'px-3 py-1 rounded-full font-medium transition-colors shrink-0 cursor-pointer',
            selectedStatusFilter === 'Berjalan'
              ? 'bg-[#825100] text-white shadow-xs'
              : 'bg-[#ffddb8]/60 text-[#825100] hover:bg-[#ffddb8]'
          ]"
        >
          Berjalan ({{ projects.filter(p => p.status === 'Berjalan').length }})
        </button>
        <button
          @click="selectedStatusFilter = 'Hampir Selesai'"
          :class="[
            'px-3 py-1 rounded-full font-medium transition-colors shrink-0 cursor-pointer',
            selectedStatusFilter === 'Hampir Selesai'
              ? 'bg-[#00685f] text-white shadow-xs'
              : 'bg-[#ccfbf1] text-[#00685f] hover:bg-[#99f6e4]'
          ]"
        >
          Hampir Selesai ({{ projects.filter(p => p.status === 'Hampir Selesai').length }})
        </button>
        <button
          @click="selectedStatusFilter = 'Selesai'"
          :class="[
            'px-3 py-1 rounded-full font-medium transition-colors shrink-0 cursor-pointer',
            selectedStatusFilter === 'Selesai'
              ? 'bg-[#065f46] text-white shadow-xs'
              : 'bg-[#d1fae5] text-[#065f46] hover:bg-[#a7f3d0]'
          ]"
        >
          Selesai ({{ projects.filter(p => p.status === 'Selesai').length }})
        </button>
        <button
          @click="selectedStatusFilter = 'Perencanaan'"
          :class="[
            'px-3 py-1 rounded-full font-medium transition-colors shrink-0 cursor-pointer',
            selectedStatusFilter === 'Perencanaan'
              ? 'bg-[#565e74] text-white shadow-xs'
              : 'bg-[#eff4ff] text-[#565e74] hover:bg-[#dae2fd]'
          ]"
        >
          Perencanaan ({{ projects.filter(p => p.status === 'Perencanaan').length }})
        </button>
      </div>

      <!-- Projects Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr class="bg-[#eff4ff] border-b border-[#bcc9c6]/40 text-xs font-semibold text-[#3d4947] uppercase tracking-wider">
              <th class="py-3.5 px-6">Nama Proyek</th>
              <th class="py-3.5 px-6">Lokasi</th>
              <th class="py-3.5 px-6">Anggaran</th>
              <th class="py-3.5 px-6 min-w-[140px]">Progress</th>
              <th class="py-3.5 px-6">Status</th>
              <th class="py-3.5 px-6">Target Selesai</th>
              <th class="py-3.5 px-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-sm">
            <!-- Empty State -->
            <tr v-if="paginatedProjects.length === 0">
              <td colspan="7" class="py-12 text-center text-[#6d7a77]">
                <div class="flex flex-col items-center justify-center gap-2">
                  <span class="material-symbols-outlined text-[48px] text-slate-300">search_off</span>
                  <p class="font-semibold text-base text-[#0b1c30]">Tidak ada proyek yang sesuai</p>
                  <p class="text-xs">Coba sesuaikan kata kunci pencarian atau bersihkan filter.</p>
                  <button
                    @click="searchQuery = ''; selectedStatusFilter = 'all'; selectedCategoryFilter = 'all';"
                    class="mt-2 text-xs font-semibold text-[#00685f] hover:underline"
                  >
                    Reset Semua Filter
                  </button>
                </div>
              </td>
            </tr>

            <!-- Table Rows -->
            <tr
              v-for="project in paginatedProjects"
              :key="project.id"
              class="hover:bg-slate-50/80 transition-colors group"
            >
              <!-- Nama Proyek -->
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-xl bg-[#ccfbf1]/60 flex items-center justify-center text-[#00685f] shrink-0 group-hover:scale-105 transition-transform"
                  >
                    <span class="material-symbols-outlined text-[20px]">
                      {{ categoryConfig[project.kategori]?.icon || 'construction' }}
                    </span>
                  </div>
                  <div>
                    <p class="font-semibold text-[#0b1c30] group-hover:text-[#00685f] transition-colors leading-tight">
                      {{ project.nama }}
                    </p>
                    <div class="flex items-center gap-1.5 mt-0.5">
                      <span class="text-xs text-[#6d7a77]">{{ project.kategori }}</span>
                      <span class="text-[#bcc9c6]">•</span>
                      <span class="text-[11px] text-[#6d7a77]">{{ project.sumberDana }}</span>
                    </div>
                  </div>
                </div>
              </td>

              <!-- Lokasi -->
              <td class="py-4 px-6 text-[#3d4947]">
                <div class="flex items-center gap-1.5 text-xs sm:text-sm">
                  <span class="material-symbols-outlined text-[16px] text-[#6d7a77]">location_on</span>
                  <span>{{ project.lokasi }}</span>
                </div>
              </td>

              <!-- Anggaran -->
              <td class="py-4 px-6">
                <p class="font-bold text-[#0b1c30] text-sm">
                  {{ formatRupiah(project.anggaran) }}
                </p>
                <p class="text-[11px] text-[#6d7a77]">
                  Terserap: {{ formatRupiah(project.terserap || 0) }}
                </p>
              </td>

              <!-- Progress Bar -->
              <td class="py-4 px-6">
                <div class="flex items-center gap-2.5">
                  <div class="w-full bg-[#eff4ff] rounded-full h-2.5 overflow-hidden">
                    <div
                      class="h-2.5 rounded-full transition-all duration-300"
                      :class="[
                        project.progress >= 90
                          ? 'bg-[#00685f]'
                          : project.progress >= 40
                          ? 'bg-[#0d9488]'
                          : 'bg-[#825100]'
                      ]"
                      :style="{ width: `${project.progress}%` }"
                    ></div>
                  </div>
                  <span class="text-xs font-bold text-[#0b1c30] w-9 text-right shrink-0">
                    {{ project.progress }}%
                  </span>
                </div>
              </td>

              <!-- Status -->
              <td class="py-4 px-6">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
                    getStatusBadgeClass(project.status)
                  ]"
                >
                  {{ project.status }}
                </span>
              </td>

              <!-- Target Selesai -->
              <td class="py-4 px-6 text-xs sm:text-sm text-[#3d4947]">
                <div class="flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-[16px] text-[#6d7a77]">event</span>
                  <span>{{ project.targetSelesai }}</span>
                </div>
              </td>

              <!-- Aksi -->
              <td class="py-4 px-6 text-right">
                <button
                  @click="openDetail(project)"
                  class="text-xs font-bold text-[#00685f] hover:text-[#005049] hover:underline px-3 py-1.5 rounded-lg hover:bg-[#ccfbf1]/40 transition-all cursor-pointer"
                >
                  Detail Proyek
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer matching Stitch design -->
      <div
        class="px-6 py-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/60"
      >
        <span class="text-xs sm:text-sm text-[#6d7a77]">
          Menampilkan
          <span class="font-semibold text-[#0b1c30]">
            {{ filteredProjects.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredProjects.length) }}
          </span>
          dari
          <span class="font-semibold text-[#0b1c30]">{{ filteredProjects.length }}</span>
          proyek
        </span>

        <div class="flex items-center gap-1.5">
          <button
            @click="setPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1.5 border border-[#bcc9c6]/70 rounded-lg hover:bg-slate-100 text-[#3d4947] text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Sebelumnya
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="setPage(page)"
            :class="[
              'px-3 py-1.5 border rounded-lg text-xs font-semibold transition-colors cursor-pointer',
              currentPage === page
                ? 'bg-[#00685f] text-white border-[#00685f] shadow-xs'
                : 'border-[#bcc9c6]/70 hover:bg-slate-100 text-[#3d4947]'
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="setPage(currentPage + 1)"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="px-3 py-1.5 border border-[#bcc9c6]/70 rounded-lg hover:bg-slate-100 text-[#3d4947] text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL: Detail Proyek -->
    <div
      v-if="isDetailModalOpen && selectedProject"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
      @click.self="closeDetail"
    >
      <div
        class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
      >
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/70 sticky top-0 z-10 backdrop-blur-md">
          <div class="flex items-center gap-3">
            <div
              class="w-11 h-11 rounded-xl bg-[#ccfbf1] text-[#00685f] flex items-center justify-center shrink-0 shadow-xs"
            >
              <span class="material-symbols-outlined text-[24px]">
                {{ categoryConfig[selectedProject.kategori]?.icon || 'construction' }}
              </span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-[#6d7a77] uppercase tracking-wider">
                  {{ selectedProject.id }}
                </span>
                <span
                  :class="[
                    'px-2 py-0.5 rounded-full text-[11px] font-semibold',
                    getStatusBadgeClass(selectedProject.status)
                  ]"
                >
                  {{ selectedProject.status }}
                </span>
              </div>
              <h3 class="text-lg font-bold text-[#0b1c30] leading-snug">
                {{ selectedProject.nama }}
              </h3>
            </div>
          </div>
          <button
            @click="closeDetail"
            class="text-[#6d7a77] hover:text-[#0b1c30] p-1.5 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Progress Slider / Editor -->
          <div class="bg-[#eff4ff] p-4 rounded-xl border border-[#bcc9c6]/40">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold uppercase tracking-wider text-[#3d4947]">
                Progress Pelaksanaan Fisik
              </span>
              <span class="text-sm font-extrabold text-[#00685f]">
                {{ selectedProject.progress }}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              v-model.number="selectedProject.progress"
              class="w-full accent-[#00685f] cursor-pointer"
            />
            <div class="flex justify-between text-[11px] text-[#6d7a77] mt-1">
              <span>0% (Rencana)</span>
              <span>50% (Sedang)</span>
              <span>100% (Selesai)</span>
            </div>
          </div>

          <!-- Quick Status Selector -->
          <div>
            <label class="block text-xs font-semibold text-[#3d4947] mb-1.5">
              Status Pengerjaan
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                v-for="st in ['Perencanaan', 'Berjalan', 'Hampir Selesai', 'Selesai']"
                :key="st"
                type="button"
                @click="selectedProject.status = st"
                :class="[
                  'py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer',
                  selectedProject.status === st
                    ? 'border-[#00685f] bg-[#ccfbf1] text-[#00685f] font-bold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                ]"
              >
                {{ st }}
              </button>
            </div>
          </div>

          <!-- Information Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-xs text-[#6d7a77] block">Total Anggaran (RAB)</span>
              <span class="text-base font-bold text-[#0b1c30]">
                {{ formatRupiah(selectedProject.anggaran) }}
              </span>
              <span class="text-xs text-[#00685f] block mt-0.5">
                Sumber: {{ selectedProject.sumberDana }}
              </span>
            </div>

            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-xs text-[#6d7a77] block">Realisasi / Anggaran Terserap</span>
              <span class="text-base font-bold text-[#825100]">
                {{ formatRupiah(selectedProject.terserap || 0) }}
              </span>
              <span class="text-xs text-[#6d7a77] block mt-0.5">
                Sisa: {{ formatRupiah(selectedProject.anggaran - (selectedProject.terserap || 0)) }}
              </span>
            </div>

            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-xs text-[#6d7a77] block">Lokasi Pengerjaan</span>
              <span class="text-sm font-semibold text-[#0b1c30]">
                {{ selectedProject.lokasi }}
              </span>
              <span class="text-xs text-[#6d7a77] block mt-0.5">{{ selectedProject.dusun }}</span>
            </div>

            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-xs text-[#6d7a77] block">Target Waktu Penyelesaian</span>
              <span class="text-sm font-semibold text-[#0b1c30]">
                {{ selectedProject.targetSelesai }}
              </span>
              <span class="text-xs text-[#6d7a77] block mt-0.5">Mulai: {{ selectedProject.tanggalMulai }}</span>
            </div>
          </div>

          <!-- Penanggung Jawab Section -->
          <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#dae2fd] text-[#565e74] flex items-center justify-center font-bold text-sm">
                TPK
              </div>
              <div>
                <p class="text-xs text-[#6d7a77]">Tim Pelaksana Kegiatan (TPK)</p>
                <p class="text-sm font-bold text-[#0b1c30]">{{ selectedProject.penanggungJawab }}</p>
              </div>
            </div>
            <a
              :href="'tel:' + selectedProject.kontak"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#bcc9c6] text-xs font-semibold text-[#00685f] hover:bg-[#ccfbf1]"
            >
              <span class="material-symbols-outlined text-[16px]">call</span>
              <span>Hubungi</span>
            </a>
          </div>

          <!-- Deskripsi -->
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-[#3d4947] block mb-1">
              Deskripsi & Sasaran Manfaat
            </span>
            <p class="text-sm text-[#3d4947] leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {{ selectedProject.deskripsi }}
            </p>
          </div>

          <!-- Milestones Checklist -->
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-[#3d4947] block mb-2">
              Tahapan & Milestone Lapangan
            </span>
            <div class="space-y-2">
              <label
                v-for="(milestone, idx) in selectedProject.milestones"
                :key="idx"
                class="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100/60 cursor-pointer text-xs sm:text-sm text-[#3d4947]"
              >
                <input
                  type="checkbox"
                  v-model="milestone.done"
                  class="rounded text-[#00685f] focus:ring-[#00685f] w-4 h-4 cursor-pointer"
                />
                <span :class="milestone.done ? 'line-through text-slate-400' : 'text-[#0b1c30] font-medium'">
                  {{ milestone.text }}
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0">
          <button
            @click="closeDetail"
            class="px-4 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            Tutup
          </button>
          <button
            @click="saveProjectChanges"
            class="px-5 py-2 bg-[#00685f] hover:bg-[#005049] text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL: Tambah Proyek Baru -->
    <div
      v-if="isAddModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
      @click.self="isAddModalOpen = false"
    >
      <div
        class="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
      >
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 sticky top-0 z-10 backdrop-blur-md">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#ccfbf1] text-[#00685f] flex items-center justify-center">
              <span class="material-symbols-outlined text-[22px]">add_circle</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-[#0b1c30]">Tambah Proyek Baru</h3>
              <p class="text-xs text-[#6d7a77]">Entri data rencana pembangunan desa</p>
            </div>
          </div>
          <button
            @click="isAddModalOpen = false"
            class="text-[#6d7a77] hover:text-[#0b1c30] p-1.5 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleAddProject" class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-semibold text-[#3d4947] mb-1">
              Nama Proyek Pembangunan <span class="text-red-500">*</span>
            </label>
            <input
              v-model="newProjectForm.nama"
              type="text"
              required
              placeholder="Contoh: Pengaspalan Jalan Gang RW 02"
              class="w-full px-3.5 py-2 bg-white rounded-lg border border-[#bcc9c6] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f] focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#3d4947] mb-1">
                Kategori Proyek
              </label>
              <select
                v-model="newProjectForm.kategori"
                class="w-full px-3.5 py-2 bg-white rounded-lg border border-[#bcc9c6] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f] focus:outline-none"
              >
                <option value="Infrastruktur">Infrastruktur</option>
                <option value="Fasilitas Kesehatan">Fasilitas Kesehatan</option>
                <option value="Pertanian">Pertanian</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Sarana Umum">Sarana Umum</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#3d4947] mb-1">
                Sumber Dana
              </label>
              <select
                v-model="newProjectForm.sumberDana"
                class="w-full px-3.5 py-2 bg-white rounded-lg border border-[#bcc9c6] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f] focus:outline-none"
              >
                <option value="Dana Desa (DDS)">Dana Desa (DDS)</option>
                <option value="Alokasi Dana Desa (ADD)">Alokasi Dana Desa (ADD)</option>
                <option value="Bantuan Provinsi (Banprov)">Bantuan Provinsi (Banprov)</option>
                <option value="Bagi Hasil Pajak (BHP)">Bagi Hasil Pajak (BHP)</option>
                <option value="Swadaya Masyarakat">Swadaya Masyarakat</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#3d4947] mb-1">
                Total Anggaran (Rp) <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newProjectForm.anggaran"
                type="number"
                required
                placeholder="Contoh: 150000000"
                class="w-full px-3.5 py-2 bg-white rounded-lg border border-[#bcc9c6] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f] focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#3d4947] mb-1">
                Dusun / Wilayah
              </label>
              <select
                v-model="newProjectForm.dusun"
                class="w-full px-3.5 py-2 bg-white rounded-lg border border-[#bcc9c6] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f] focus:outline-none"
              >
                <option value="Dusun Cimenyan">Dusun Cimenyan</option>
                <option value="Dusun Padasuka">Dusun Padasuka</option>
                <option value="Dusun Ciburial">Dusun Ciburial</option>
                <option value="Dusun Cikadut">Dusun Cikadut</option>
                <option value="Dusun Mawar">Dusun Mawar</option>
                <option value="Dusun Melati">Dusun Melati</option>
                <option value="Dusun Sukamaju">Dusun Sukamaju</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#3d4947] mb-1">
              Detail Titik Lokasi
            </label>
            <input
              v-model="newProjectForm.lokasi"
              type="text"
              placeholder="Contoh: RT 03/RW 02 dekat Lapangan Voli"
              class="w-full px-3.5 py-2 bg-white rounded-lg border border-[#bcc9c6] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f] focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#3d4947] mb-1">
                Tanggal Mulai
              </label>
              <input
                v-model="newProjectForm.tanggalMulai"
                type="date"
                class="w-full px-3.5 py-2 bg-white rounded-lg border border-[#bcc9c6] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f] focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#3d4947] mb-1">
                Target Selesai
              </label>
              <input
                v-model="newProjectForm.targetSelesai"
                type="date"
                class="w-full px-3.5 py-2 bg-white rounded-lg border border-[#bcc9c6] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f] focus:outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#3d4947] mb-1">
                Ketua Pelaksana / TPK
              </label>
              <input
                v-model="newProjectForm.penanggungJawab"
                type="text"
                placeholder="Nama Penanggung Jawab"
                class="w-full px-3.5 py-2 bg-white rounded-lg border border-[#bcc9c6] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f] focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#3d4947] mb-1">
                Nomor Kontak / WhatsApp
              </label>
              <input
                v-model="newProjectForm.kontak"
                type="text"
                placeholder="08xxxxxxxxxx"
                class="w-full px-3.5 py-2 bg-white rounded-lg border border-[#bcc9c6] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#3d4947] mb-1">
              Deskripsi Proyek
            </label>
            <textarea
              v-model="newProjectForm.deskripsi"
              rows="3"
              placeholder="Jelaskan spesifikasi teknis dan dampak pembangunan..."
              class="w-full px-3.5 py-2 bg-white rounded-lg border border-[#bcc9c6] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f] focus:outline-none"
            ></textarea>
          </div>

          <!-- Form Actions -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              @click="isAddModalOpen = false"
              class="px-4 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-5 py-2 bg-[#00685f] hover:bg-[#005049] text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              Simpan Proyek
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Floating Toast Notification -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0b1c30] text-white px-5 py-3.5 rounded-xl shadow-xl border border-slate-700/50"
      >
        <span class="material-symbols-outlined text-[#2dd4bf] text-[20px]">
          check_circle
        </span>
        <span class="text-xs sm:text-sm font-medium">{{ toastMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
