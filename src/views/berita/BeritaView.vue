<script setup>
import { ref, computed } from "vue";

// Active Tab: 'berita' | 'pengumuman'
const activeTab = ref("berita");

// Search & Filter State
const searchQuery = ref("");
const selectedCategory = ref("all");
const selectedStatus = ref("all");
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
  Sosial: {
    badge: "bg-[#dae2fd] text-[#3b435b] border border-[#bcc6e0]/40",
    icon: "volunteer_activism",
  },
  Pembangunan: {
    badge: "bg-[#e5eeff] text-[#00685f] border border-[#bcc9c6]/40",
    icon: "construction",
  },
  Ekonomi: {
    badge: "bg-[#ffddb8] text-[#825100] border border-[#ffb95f]/40",
    icon: "payments",
  },
  Kesehatan: {
    badge: "bg-[#ccfbf1] text-[#00685f] border border-[#0d9488]/30",
    icon: "medical_services",
  },
  Pendidikan: {
    badge: "bg-[#fef3c7] text-[#92400e] border border-[#f59e0b]/30",
    icon: "school",
  },
  Pemerintahan: {
    badge: "bg-[#eff4ff] text-[#1e40af] border border-[#93c5fd]/40",
    icon: "account_balance",
  },
};

// Urgency badge config for announcements
const urgencyConfig = {
  Biasa: "bg-[#eff4ff] text-[#3d4947] border border-[#bcc9c6]/30",
  Penting: "bg-[#ffddb8] text-[#825100] border border-[#ffb95f]/40",
  Mendesak: "bg-[#ffdad6] text-[#93000a] border border-[#ffdad6]",
};

// ==========================================
// DATASET: BERITA DESA
// ==========================================
const newsList = ref([
  {
    id: "BRT-2023-001",
    judul: "Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa Tahap 3",
    kategori: "Sosial",
    penulis: "Budi Santoso",
    tanggal: "12 Okt 2023",
    status: "Publish",
    views: 428,
    ringkasan:
      "Pemerintah Desa Cimenyan kembali merealisasikan penyaluran BLT Dana Desa Tahap ke-3 kepada 120 KPM penerima manfaat.",
    konten:
      "Kegiatan penyaluran Bantuan Langsung Tunai (BLT) Dana Desa Triwulan III dilaksanakan di Aula Kantor Desa Cimenyan. Penyaluran dihadiri langsung oleh Kepala Desa, Bhabinkamtibmas, Babinsa, dan Badan Permusyawaratan Desa (BPD). Sebanyak 120 Keluarga Penerima Manfaat (KPM) masing-masing menerima bantuan uang tunai sebesar Rp 900.000 untuk alokasi tiga bulan.",
  },
  {
    id: "BRT-2023-002",
    judul: "Rapat Koordinasi Perencanaan Pembangunan Jalan Dusun 2",
    kategori: "Pembangunan",
    penulis: "Admin Desa",
    tanggal: "10 Okt 2023",
    status: "Draft",
    views: 0,
    ringkasan:
      "Musyawarah rencana pembetonan dan pengaspalan jalan desa poros penghubung Dusun 2 dan Dusun 3 jelang penetapan APBDes.",
    konten:
      "Rapat koordinasi dipimpin oleh Seksi Pembangunan bersama para ketua RW, RT, serta tokoh masyarakat Dusun 2. Pembahasan difokuskan pada pemetaan teknis gorong-gorong drainase serta jadwal gotong royong pembersihan bahu jalan sebelum material cor beton dikirim.",
  },
  {
    id: "BRT-2023-003",
    judul: "Pelatihan Pembuatan Kerajinan Tangan untuk Ibu PKK",
    kategori: "Ekonomi",
    penulis: "Siti Rahma",
    tanggal: "05 Okt 2023",
    status: "Publish",
    views: 315,
    ringkasan:
      "Pemberdayaan ekonomi kreatif ibu-ibu rumah tangga melalui pelatihan kerajinan anyaman bambu dan limbah kain perca.",
    konten:
      "Program peningkatan kapasitas usaha mikro perempuan Desa Cimenyan menghadirkan instruktur dari Dewan Kerajinan Nasional Daerah (Dekranasda). Puluhan anggota TP-PKK antusias mempraktikkan desain tas dan wadah anyaman modern yang memiliki nilai jual ekspor.",
  },
  {
    id: "BRT-2023-004",
    judul: "Pemeriksaan Kesehatan Gratis dan Skrining PTM Lansia",
    kategori: "Kesehatan",
    penulis: "dr. Linda Marlina",
    tanggal: "28 Sep 2023",
    status: "Publish",
    views: 512,
    ringkasan:
      "Layanan cek gula darah, tensi, kolesterol, dan konsultasi gizi terpadu di Posbindu Mawar Dusun Sukamaju.",
    konten:
      "Bekerja sama dengan Puskesmas Cimenyan, posbindu lansia sukses melayani lebih dari 150 warga pra-lansia dan lansia. Warga dengan riwayat hipertensi dan diabetes langsung mendapatkan resep obat rutin serta paket nutrisi beras merah.",
  },
  {
    id: "BRT-2023-005",
    judul: "Sosialisasi Digitalisasi Dokumen Kependudukan IKD",
    kategori: "Pemerintahan",
    penulis: "Admin Desa",
    tanggal: "20 Sep 2023",
    status: "Publish",
    views: 290,
    ringkasan:
      "Aparatur desa mendampingi warga melakukan aktivasi Identitas Kependudukan Digital (IKD) melalui smartphone.",
    konten:
      "Menindaklanjuti instruksi Ditjen Dukcapil Kemendagri, layanan jemput bola aktivasi aplikasi IKD dibuka setiap hari kerja di loket PATEN Desa Cimenyan untuk mempermudah verifikasi identitas secara terpadu.",
  },
  {
    id: "BRT-2023-006",
    judul: "Penyusunan Rencana Kerja Pemerintah Desa (RKPDes) 2024",
    kategori: "Pemerintahan",
    penulis: "Sekretaris Desa",
    tanggal: "15 Sep 2023",
    status: "Publish",
    views: 185,
    ringkasan:
      "Sidang pleno penetapan arah kebijakan prioritas program tahun anggaran 2024 bersama BPD.",
    konten:
      "BPD bersama Pemerintah Desa Cimenyan menyepakati fokus anggaran 2024 pada program penanganan stunting terintegrasi, revitalisasi jalan poros produksi pertanian, dan digitalisasi layanan persuratan.",
  },
]);

// ==========================================
// DATASET: PENGUMUMAN RESMI
// ==========================================
const announcementList = ref([
  {
    id: "PGM-2023-001",
    judul: "Jadwal Pemadaman Listrik Sementara PLN ULP Bandung Timur",
    sasaran: "Dusun 1 & Dusun 2 (RW 01 s/d RW 04)",
    urgensi: "Penting",
    tanggalMulai: "28 Okt 2023",
    tanggalSelesai: "28 Okt 2023",
    waktu: "09.00 - 15.00 WIB",
    status: "Aktif",
    isi: "Sehubungan dengan adanya pemeliharaan jaringan kabel Saluran Udara Tegangan Menengah (SUTM) 20 kV, PLN memberitahukan pemadaman aliran listrik sementara. Warga dihimbau mematikan alat elektronik sensitif.",
  },
  {
    id: "PGM-2023-002",
    judul: "Pelaksanaan Sub-PIN Polio Tambahan Serentak",
    sasaran: "Balita Usia 0 - 59 Bulan",
    urgensi: "Penting",
    tanggalMulai: "02 Nov 2023",
    tanggalSelesai: "04 Nov 2023",
    waktu: "08.30 - 12.00 WIB",
    status: "Aktif",
    isi: "Wajib membawa buku KIA ke posyandu dusun masing-masing. Vaksin tetes polio manis diberikan gratis tanpa dipungut biaya apapun.",
  },
  {
    id: "PGM-2023-003",
    judul: "Kerja Bakti Massal Pencegahan Banjir & Saluran Tersumbat",
    sasaran: "Seluruh Warga RW 01 s/d RW 08",
    urgensi: "Biasa",
    tanggalMulai: "05 Nov 2023",
    tanggalSelesai: "05 Nov 2023",
    waktu: "07.00 WIB - Selesai",
    status: "Aktif",
    isi: "Menghadapi awal musim penghujan, diharapkan setiap KK mengirimkan minimal satu orang perwakilan untuk membersihkan selokan dan sampah liar di lingkungan RT masing-masing.",
  },
  {
    id: "PGM-2023-004",
    judul: "Batas Akhir Pemutakhiran Data Kartu Keluarga (KK Barcode)",
    sasaran: "Warga yang masih ber-KK Model Lama",
    urgensi: "Mendesak",
    tanggalMulai: "10 Okt 2023",
    tanggalSelesai: "15 Nov 2023",
    waktu: "Jam Kerja Kantor Desa",
    status: "Aktif",
    isi: "Bagi warga yang KK-nya belum bertanda tangan elektronik (barcode TTE), dimohon segera menyerahkan berkas ke Seksi Pelayanan Desa Cimenyan sebelum penonaktifan NIK sistemik.",
  },
  {
    id: "PGM-2023-005",
    judul: "Pendaftaran Seleksi Bantuan Modal Usaha Bumdes Berkah",
    sasaran: "Pelaku UMKM Warga Desa Cimenyan",
    urgensi: "Biasa",
    tanggalMulai: "15 Nov 2023",
    tanggalSelesai: "30 Nov 2023",
    waktu: "08.00 - 14.00 WIB",
    status: "Draft",
    isi: "BUMDes Cimenyan membuka gelombang pendaftaran kemitraan pinjaman modal bergulir tanpa bunga untuk kelompok pedagang kecil dan peternak lokal.",
  },
]);

// Summary Statistics
const stats = computed(() => {
  const totalNews = newsList.value.length;
  const publishedNews = newsList.value.filter((n) => n.status === "Publish").length;
  const draftNews = newsList.value.filter((n) => n.status === "Draft").length;
  const activeAnnouncements = announcementList.value.filter(
    (a) => a.status === "Aktif"
  ).length;

  return {
    totalNews,
    publishedNews,
    draftNews,
    activeAnnouncements,
  };
});

// Category list for filter
const availableCategories = computed(() => {
  if (activeTab.value === "berita") {
    return ["Semua Kategori", "Sosial", "Pembangunan", "Ekonomi", "Kesehatan", "Pemerintahan"];
  }
  return ["Semua Tingkat Urgensi", "Biasa", "Penting", "Mendesak"];
});

// Filtered News Items
const filteredNews = computed(() => {
  let list = newsList.value;

  if (selectedCategory.value !== "all") {
    list = list.filter((n) => n.kategori === selectedCategory.value);
  }

  if (selectedStatus.value !== "all") {
    list = list.filter((n) => n.status.toLowerCase() === selectedStatus.value.toLowerCase());
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(
      (n) =>
        n.judul.toLowerCase().includes(q) ||
        n.penulis.toLowerCase().includes(q) ||
        n.kategori.toLowerCase().includes(q) ||
        n.ringkasan.toLowerCase().includes(q)
    );
  }

  return list;
});

// Filtered Announcements
const filteredAnnouncements = computed(() => {
  let list = announcementList.value;

  if (selectedCategory.value !== "all") {
    list = list.filter((a) => a.urgensi === selectedCategory.value);
  }

  if (selectedStatus.value !== "all") {
    list = list.filter((a) => a.status.toLowerCase() === selectedStatus.value.toLowerCase());
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(
      (a) =>
        a.judul.toLowerCase().includes(q) ||
        a.sasaran.toLowerCase().includes(q) ||
        a.isi.toLowerCase().includes(q)
    );
  }

  return list;
});

// Active display items based on current tab
const currentDataset = computed(() => {
  return activeTab.value === "berita" ? filteredNews.value : filteredAnnouncements.value;
});

// Total pages for current tab
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(currentDataset.value.length / itemsPerPage));
});

// Paginated items
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return currentDataset.value.slice(start, start + itemsPerPage);
});

// Change Tab Handler
const switchTab = (tab) => {
  activeTab.value = tab;
  currentPage.value = 1;
  selectedCategory.value = "all";
  selectedStatus.value = "all";
  searchQuery.value = "";
};

// ==========================================
// MODAL STATE & ACTIONS
// ==========================================
const isNewsModalOpen = ref(false);
const isEditingNews = ref(false);
const editingNewsId = ref(null);
const newsForm = ref({
  judul: "",
  kategori: "Sosial",
  penulis: "Admin Desa",
  tanggal: new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
  status: "Publish",
  ringkasan: "",
  konten: "",
});

const openCreateNewsModal = () => {
  isEditingNews.value = false;
  editingNewsId.value = null;
  newsForm.value = {
    judul: "",
    kategori: "Sosial",
    penulis: "Admin Desa",
    tanggal: new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    status: "Publish",
    ringkasan: "",
    konten: "",
  };
  isNewsModalOpen.value = true;
};

const openEditNewsModal = (item) => {
  isEditingNews.value = true;
  editingNewsId.value = item.id;
  newsForm.value = { ...item };
  isNewsModalOpen.value = true;
};

const saveNews = () => {
  if (!newsForm.value.judul.trim()) {
    alert("Judul berita wajib diisi.");
    return;
  }

  if (isEditingNews.value) {
    const idx = newsList.value.findIndex((n) => n.id === editingNewsId.value);
    if (idx !== -1) {
      newsList.value[idx] = { ...newsForm.value, id: editingNewsId.value };
      triggerToast(`Berita "${newsForm.value.judul}" berhasil diperbarui.`);
    }
  } else {
    const newId = `BRT-2023-00${newsList.value.length + 1}`;
    newsList.value.unshift({
      ...newsForm.value,
      id: newId,
      views: 0,
      ringkasan: newsForm.value.ringkasan || newsForm.value.konten.slice(0, 120) + "...",
    });
    triggerToast(`Berita "${newsForm.value.judul}" berhasil dibuat.`);
  }

  isNewsModalOpen.value = false;
};

// Announcement Modal
const isAnnouncementModalOpen = ref(false);
const isEditingAnnouncement = ref(false);
const editingAnnouncementId = ref(null);
const announcementForm = ref({
  judul: "",
  sasaran: "Seluruh Warga Desa",
  urgensi: "Penting",
  tanggalMulai: new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
  tanggalSelesai: new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
  waktu: "08.00 - Selesai",
  status: "Aktif",
  isi: "",
});

const openCreateAnnouncementModal = () => {
  isEditingAnnouncement.value = false;
  editingAnnouncementId.value = null;
  announcementForm.value = {
    judul: "",
    sasaran: "Seluruh Warga Desa",
    urgensi: "Penting",
    tanggalMulai: new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    tanggalSelesai: new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    waktu: "08.00 - Selesai",
    status: "Aktif",
    isi: "",
  };
  isAnnouncementModalOpen.value = true;
};

const openEditAnnouncementModal = (item) => {
  isEditingAnnouncement.value = true;
  editingAnnouncementId.value = item.id;
  announcementForm.value = { ...item };
  isAnnouncementModalOpen.value = true;
};

const saveAnnouncement = () => {
  if (!announcementForm.value.judul.trim()) {
    alert("Judul pengumuman wajib diisi.");
    return;
  }

  if (isEditingAnnouncement.value) {
    const idx = announcementList.value.findIndex((a) => a.id === editingAnnouncementId.value);
    if (idx !== -1) {
      announcementList.value[idx] = {
        ...announcementForm.value,
        id: editingAnnouncementId.value,
      };
      triggerToast(`Pengumuman "${announcementForm.value.judul}" berhasil diperbarui.`);
    }
  } else {
    const newId = `PGM-2023-00${announcementList.value.length + 1}`;
    announcementList.value.unshift({
      ...announcementForm.value,
      id: newId,
    });
    triggerToast(`Pengumuman "${announcementForm.value.judul}" berhasil dipublikasikan.`);
  }

  isAnnouncementModalOpen.value = false;
};

// Detail / Pratinjau Modal
const isDetailModalOpen = ref(false);
const detailItem = ref(null);
const detailType = ref("berita");

const openDetailModal = (item, type) => {
  detailItem.value = item;
  detailType.value = type;
  isDetailModalOpen.value = true;
};

// Delete Confirmation
const isDeleteModalOpen = ref(false);
const itemToDelete = ref(null);
const deleteType = ref("berita");

const confirmDelete = (item, type) => {
  itemToDelete.value = item;
  deleteType.value = type;
  isDeleteModalOpen.value = true;
};

const executeDelete = () => {
  if (!itemToDelete.value) return;

  if (deleteType.value === "berita") {
    newsList.value = newsList.value.filter((n) => n.id !== itemToDelete.value.id);
    triggerToast(`Berita "${itemToDelete.value.judul}" telah dihapus.`);
  } else {
    announcementList.value = announcementList.value.filter(
      (a) => a.id !== itemToDelete.value.id
    );
    triggerToast(`Pengumuman "${itemToDelete.value.judul}" telah dihapus.`);
  }

  isDeleteModalOpen.value = false;
  itemToDelete.value = null;
};

// Quick Toggle Status
const toggleNewsStatus = (item) => {
  item.status = item.status === "Publish" ? "Draft" : "Publish";
  triggerToast(`Status berita diubah menjadi ${item.status}.`);
};

// Export to CSV
const exportData = () => {
  let headers, rows, filename;

  if (activeTab.value === "berita") {
    headers = ["ID", "Judul Berita", "Kategori", "Penulis", "Tanggal", "Status", "Pembaca"];
    rows = filteredNews.value.map((n) => [
      `"${n.id}"`,
      `"${n.judul.replace(/"/g, '""')}"`,
      `"${n.kategori}"`,
      `"${n.penulis}"`,
      `"${n.tanggal}"`,
      `"${n.status}"`,
      `"${n.views}"`,
    ]);
    filename = `berita_desa_cimenyan_${new Date().toISOString().slice(0, 10)}.csv`;
  } else {
    headers = ["ID", "Judul Pengumuman", "Sasaran", "Urgensi", "Tanggal Mulai", "Tanggal Selesai", "Status"];
    rows = filteredAnnouncements.value.map((a) => [
      `"${a.id}"`,
      `"${a.judul.replace(/"/g, '""')}"`,
      `"${a.sasaran.replace(/"/g, '""')}"`,
      `"${a.urgensi}"`,
      `"${a.tanggalMulai}"`,
      `"${a.tanggalSelesai}"`,
      `"${a.status}"`,
    ]);
    filename = `pengumuman_desa_cimenyan_${new Date().toISOString().slice(0, 10)}.csv`;
  }

  const csvContent =
    "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  triggerToast(`Data ${activeTab.value === "berita" ? "Berita" : "Pengumuman"} berhasil diunduh.`);
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

    <!-- Header Section (Matches Stitch) -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight mb-1">
          Manajemen Konten
        </h1>
        <p class="text-sm sm:text-base text-[#565e74]">
          Kelola publikasi berita desa dan pengumuman resmi.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center gap-3">
        <button
          @click="exportData"
          class="hidden sm:inline-flex items-center gap-2 bg-white border border-[#bcc9c6] text-[#3d4947] hover:bg-[#eff4ff] text-sm font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm"
          title="Ekspor CSV"
        >
          <span class="material-symbols-outlined text-[18px]">download</span>
          Ekspor CSV
        </button>

        <button
          @click="openCreateAnnouncementModal"
          class="flex items-center gap-2 bg-white border border-[#00685f] text-[#00685f] hover:bg-[#eff4ff] text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <span class="material-symbols-outlined text-[18px]">add</span>
          Buat Pengumuman
        </button>

        <button
          @click="openCreateNewsModal"
          class="flex items-center gap-2 bg-[#00685f] hover:bg-[#005049] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <span class="material-symbols-outlined text-[18px]">add</span>
          Buat Berita
        </button>
      </div>
    </div>

    <!-- Quick Stats Cards (Village Dashboard KPI) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Total Berita -->
      <div class="bg-white rounded-xl p-4 sm:p-5 border border-[#bcc9c6]/30 shadow-xs flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-[#565e74] uppercase tracking-wider">Total Berita</p>
          <p class="text-2xl font-bold text-[#0b1c30] mt-1">{{ stats.totalNews }}</p>
          <span class="text-xs text-[#00685f] font-medium flex items-center gap-1 mt-0.5">
            <span class="material-symbols-outlined text-[14px]">auto_stories</span>
            Artikel Terdata
          </span>
        </div>
        <div class="w-11 h-11 rounded-lg bg-[#eff4ff] text-[#00685f] flex items-center justify-center">
          <span class="material-symbols-outlined text-[22px]">newspaper</span>
        </div>
      </div>

      <!-- Berita Publish -->
      <div class="bg-white rounded-xl p-4 sm:p-5 border border-[#bcc9c6]/30 shadow-xs flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-[#565e74] uppercase tracking-wider">Berita Terbit</p>
          <p class="text-2xl font-bold text-[#00685f] mt-1">{{ stats.publishedNews }}</p>
          <span class="text-xs text-[#00685f] font-medium flex items-center gap-1 mt-0.5">
            <span class="material-symbols-outlined text-[14px]">public</span>
            Tampil di Portal
          </span>
        </div>
        <div class="w-11 h-11 rounded-lg bg-[#ccfbf1] text-[#00685f] flex items-center justify-center">
          <span class="material-symbols-outlined text-[22px]">check_circle</span>
        </div>
      </div>

      <!-- Draft Berita -->
      <div class="bg-white rounded-xl p-4 sm:p-5 border border-[#bcc9c6]/30 shadow-xs flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-[#565e74] uppercase tracking-wider">Draft Berita</p>
          <p class="text-2xl font-bold text-[#825100] mt-1">{{ stats.draftNews }}</p>
          <span class="text-xs text-[#825100] font-medium flex items-center gap-1 mt-0.5">
            <span class="material-symbols-outlined text-[14px]">edit_note</span>
            Perlu Review
          </span>
        </div>
        <div class="w-11 h-11 rounded-lg bg-[#ffddb8]/50 text-[#825100] flex items-center justify-center">
          <span class="material-symbols-outlined text-[22px]">draft</span>
        </div>
      </div>

      <!-- Pengumuman Aktif -->
      <div class="bg-white rounded-xl p-4 sm:p-5 border border-[#bcc9c6]/30 shadow-xs flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-[#565e74] uppercase tracking-wider">Pengumuman Aktif</p>
          <p class="text-2xl font-bold text-[#1e40af] mt-1">{{ stats.activeAnnouncements }}</p>
          <span class="text-xs text-[#1e40af] font-medium flex items-center gap-1 mt-0.5">
            <span class="material-symbols-outlined text-[14px]">campaign</span>
            Informasi Warga
          </span>
        </div>
        <div class="w-11 h-11 rounded-lg bg-[#dae2fd] text-[#1e40af] flex items-center justify-center">
          <span class="material-symbols-outlined text-[22px]">campaign</span>
        </div>
      </div>
    </div>

    <!-- Main Content Box (Tabs & Table - Exact Stitch match) -->
    <div class="bg-white rounded-xl border border-[#bcc9c6]/40 shadow-xs overflow-hidden flex flex-col min-h-[560px]">
      
      <!-- Tabs (Berita Desa vs Pengumuman) -->
      <div class="flex border-b border-[#bcc9c6]/30 px-6 pt-2 bg-[#f8f9ff]">
        <button
          @click="switchTab('berita')"
          :class="[
            'px-6 py-3.5 text-sm font-semibold transition-all relative cursor-pointer',
            activeTab === 'berita'
              ? 'text-[#00685f] border-b-2 border-[#00685f]'
              : 'text-[#565e74] hover:text-[#00685f] border-b-2 border-transparent'
          ]"
        >
          <span class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">newspaper</span>
            Berita Desa
            <span
              :class="[
                'text-xs px-2 py-0.5 rounded-full font-bold',
                activeTab === 'berita'
                  ? 'bg-[#ccfbf1] text-[#00685f]'
                  : 'bg-[#eff4ff] text-[#565e74]'
              ]"
            >
              {{ newsList.length }}
            </span>
          </span>
        </button>

        <button
          @click="switchTab('pengumuman')"
          :class="[
            'px-6 py-3.5 text-sm font-semibold transition-all relative cursor-pointer',
            activeTab === 'pengumuman'
              ? 'text-[#00685f] border-b-2 border-[#00685f]'
              : 'text-[#565e74] hover:text-[#00685f] border-b-2 border-transparent'
          ]"
        >
          <span class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">campaign</span>
            Pengumuman
            <span
              :class="[
                'text-xs px-2 py-0.5 rounded-full font-bold',
                activeTab === 'pengumuman'
                  ? 'bg-[#ccfbf1] text-[#00685f]'
                  : 'bg-[#eff4ff] text-[#565e74]'
              ]"
            >
              {{ announcementList.length }}
            </span>
          </span>
        </button>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="p-4 sm:p-5 border-b border-[#bcc9c6]/20 flex flex-col sm:flex-row justify-between items-center gap-3 bg-white">
        <!-- Select Filters -->
        <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <!-- Kategori / Urgensi Dropdown -->
          <div class="relative min-w-[170px] flex-1 sm:flex-initial">
            <select
              v-model="selectedCategory"
              @change="currentPage = 1"
              class="w-full appearance-none bg-white border border-[#bcc9c6] rounded-lg pl-3 pr-8 py-2 text-sm text-[#0b1c30] focus:ring-1 focus:ring-[#00685f] focus:border-[#00685f] outline-none cursor-pointer"
            >
              <option value="all">
                {{ activeTab === 'berita' ? 'Semua Kategori' : 'Semua Urgensi' }}
              </option>
              <template v-if="activeTab === 'berita'">
                <option value="Sosial">Sosial</option>
                <option value="Pembangunan">Pembangunan</option>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Pemerintahan">Pemerintahan</option>
              </template>
              <template v-else>
                <option value="Biasa">Biasa</option>
                <option value="Penting">Penting</option>
                <option value="Mendesak">Mendesak</option>
              </template>
            </select>
            <span class="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#565e74] text-[18px] pointer-events-none">
              expand_more
            </span>
          </div>

          <!-- Status Dropdown -->
          <div class="relative min-w-[140px] flex-1 sm:flex-initial">
            <select
              v-model="selectedStatus"
              @change="currentPage = 1"
              class="w-full appearance-none bg-white border border-[#bcc9c6] rounded-lg pl-3 pr-8 py-2 text-sm text-[#0b1c30] focus:ring-1 focus:ring-[#00685f] focus:border-[#00685f] outline-none cursor-pointer"
            >
              <option value="all">Semua Status</option>
              <template v-if="activeTab === 'berita'">
                <option value="publish">Publish</option>
                <option value="draft">Draft</option>
              </template>
              <template v-else>
                <option value="aktif">Aktif</option>
                <option value="draft">Draft</option>
              </template>
            </select>
            <span class="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#565e74] text-[18px] pointer-events-none">
              expand_more
            </span>
          </div>

          <!-- Reset Filter Button (if filtered) -->
          <button
            v-if="selectedCategory !== 'all' || selectedStatus !== 'all' || searchQuery"
            @click="selectedCategory = 'all'; selectedStatus = 'all'; searchQuery = ''; currentPage = 1;"
            class="text-xs text-[#00685f] hover:underline flex items-center gap-1 px-2 py-1"
          >
            <span class="material-symbols-outlined text-[14px]">refresh</span>
            Reset Filter
          </button>
        </div>

        <!-- Search Bar -->
        <div class="relative w-full sm:w-72">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#565e74] text-[18px]">
            search
          </span>
          <input
            v-model="searchQuery"
            @input="currentPage = 1"
            type="text"
            :placeholder="activeTab === 'berita' ? 'Cari judul berita...' : 'Cari pengumuman...'"
            class="w-full bg-white border border-[#bcc9c6] rounded-lg pl-9 pr-8 py-2 text-sm text-[#0b1c30] placeholder:text-[#565e74]/60 focus:ring-1 focus:ring-[#00685f] focus:border-[#00685f] outline-none"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''; currentPage = 1"
            class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#565e74] hover:text-[#0b1c30]"
          >
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- TAB 1: DATA TABLE BERITA                   -->
      <!-- ========================================== -->
      <div v-if="activeTab === 'berita'" class="overflow-x-auto flex-1">
        <table class="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr class="bg-[#f8f9ff] border-b border-[#bcc9c6]/40">
              <th class="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#565e74] w-5/12">
                Judul Berita
              </th>
              <th class="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#565e74]">
                Kategori
              </th>
              <th class="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#565e74]">
                Penulis
              </th>
              <th class="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#565e74]">
                Tanggal
              </th>
              <th class="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#565e74]">
                Status
              </th>
              <th class="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#565e74] text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#bcc9c6]/20">
            <!-- Empty State -->
            <tr v-if="paginatedItems.length === 0">
              <td colspan="6" class="text-center py-12 text-[#565e74]">
                <div class="flex flex-col items-center justify-center">
                  <span class="material-symbols-outlined text-4xl text-[#bcc9c6] mb-2">newspaper</span>
                  <p class="font-medium text-sm">Tidak ada berita yang cocok dengan filter.</p>
                  <button
                    @click="selectedCategory = 'all'; selectedStatus = 'all'; searchQuery = ''"
                    class="mt-2 text-xs text-[#00685f] hover:underline"
                  >
                    Hapus Filter
                  </button>
                </div>
              </td>
            </tr>

            <!-- Table Rows -->
            <tr
              v-for="item in paginatedItems"
              :key="item.id"
              class="hover:bg-[#eff4ff]/60 transition-colors group cursor-pointer"
              @click="openDetailModal(item, 'berita')"
            >
              <!-- Judul Berita -->
              <td class="py-4 px-6">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#00685f] flex items-center justify-center shrink-0 mt-0.5">
                    <span class="material-symbols-outlined text-[18px]">
                      {{ categoryConfig[item.kategori]?.icon || 'article' }}
                    </span>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-[#0b1c30] group-hover:text-[#00685f] transition-colors line-clamp-1">
                      {{ item.judul }}
                    </p>
                    <p class="text-xs text-[#565e74] line-clamp-1 mt-0.5">
                      {{ item.ringkasan }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Kategori -->
              <td class="py-4 px-6">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    categoryConfig[item.kategori]?.badge || 'bg-[#eff4ff] text-[#565e74]'
                  ]"
                >
                  {{ item.kategori }}
                </span>
              </td>

              <!-- Penulis -->
              <td class="py-4 px-6">
                <p class="text-sm text-[#0b1c30]">{{ item.penulis }}</p>
              </td>

              <!-- Tanggal -->
              <td class="py-4 px-6">
                <p class="text-sm text-[#565e74]">{{ item.tanggal }}</p>
              </td>

              <!-- Status -->
              <td class="py-4 px-6" @click.stop>
                <button
                  @click="toggleNewsStatus(item)"
                  :title="item.status === 'Publish' ? 'Klik untuk ubah ke Draft' : 'Klik untuk Publikasikan'"
                  :class="[
                    'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition-all cursor-pointer',
                    item.status === 'Publish'
                      ? 'bg-[#ccfbf1] text-[#00685f] hover:bg-[#99f6e4]'
                      : 'bg-[#eff4ff] text-[#565e74] hover:bg-[#dce9ff]'
                  ]"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="item.status === 'Publish' ? 'bg-[#00685f]' : 'bg-[#565e74]'"></span>
                  {{ item.status }}
                </button>
              </td>

              <!-- Aksi -->
              <td class="py-4 px-6 text-right" @click.stop>
                <div class="flex items-center justify-end gap-1">
                  <!-- Pratinjau -->
                  <button
                    @click="openDetailModal(item, 'berita')"
                    class="p-1.5 text-[#565e74] hover:text-[#00685f] hover:bg-[#e5eeff] rounded-md transition-colors"
                    title="Lihat Detail"
                  >
                    <span class="material-symbols-outlined text-[18px]">visibility</span>
                  </button>

                  <!-- Edit -->
                  <button
                    @click="openEditNewsModal(item)"
                    class="p-1.5 text-[#565e74] hover:text-[#00685f] hover:bg-[#e5eeff] rounded-md transition-colors"
                    title="Edit Berita"
                  >
                    <span class="material-symbols-outlined text-[18px]">edit</span>
                  </button>

                  <!-- Hapus -->
                  <button
                    @click="confirmDelete(item, 'berita')"
                    class="p-1.5 text-[#565e74] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/60 rounded-md transition-colors"
                    title="Hapus Berita"
                  >
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ========================================== -->
      <!-- TAB 2: DATA TABLE PENGUMUMAN               -->
      <!-- ========================================== -->
      <div v-else class="overflow-x-auto flex-1">
        <table class="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr class="bg-[#f8f9ff] border-b border-[#bcc9c6]/40">
              <th class="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#565e74] w-5/12">
                Judul Pengumuman
              </th>
              <th class="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#565e74]">
                Sasaran Warga
              </th>
              <th class="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#565e74]">
                Urgensi
              </th>
              <th class="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#565e74]">
                Masa Berlaku
              </th>
              <th class="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#565e74]">
                Status
              </th>
              <th class="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#565e74] text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#bcc9c6]/20">
            <!-- Empty State -->
            <tr v-if="paginatedItems.length === 0">
              <td colspan="6" class="text-center py-12 text-[#565e74]">
                <div class="flex flex-col items-center justify-center">
                  <span class="material-symbols-outlined text-4xl text-[#bcc9c6] mb-2">campaign</span>
                  <p class="font-medium text-sm">Tidak ada pengumuman yang cocok dengan filter.</p>
                  <button
                    @click="selectedCategory = 'all'; selectedStatus = 'all'; searchQuery = ''"
                    class="mt-2 text-xs text-[#00685f] hover:underline"
                  >
                    Hapus Filter
                  </button>
                </div>
              </td>
            </tr>

            <!-- Announcement Rows -->
            <tr
              v-for="item in paginatedItems"
              :key="item.id"
              class="hover:bg-[#eff4ff]/60 transition-colors group cursor-pointer"
              @click="openDetailModal(item, 'pengumuman')"
            >
              <!-- Judul -->
              <td class="py-4 px-6">
                <div class="flex items-start gap-3">
                  <div
                    class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    :class="[
                      item.urgensi === 'Mendesak'
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : item.urgensi === 'Penting'
                        ? 'bg-[#ffddb8] text-[#825100]'
                        : 'bg-[#eff4ff] text-[#00685f]'
                    ]"
                  >
                    <span class="material-symbols-outlined text-[18px]">
                      {{ item.urgensi === 'Mendesak' ? 'priority_high' : item.urgensi === 'Penting' ? 'warning' : 'info' }}
                    </span>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-[#0b1c30] group-hover:text-[#00685f] transition-colors line-clamp-1">
                      {{ item.judul }}
                    </p>
                    <p class="text-xs text-[#565e74] line-clamp-1 mt-0.5">
                      {{ item.isi }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Sasaran -->
              <td class="py-4 px-6">
                <p class="text-sm text-[#0b1c30] font-medium">{{ item.sasaran }}</p>
              </td>

              <!-- Urgensi -->
              <td class="py-4 px-6">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
                    urgencyConfig[item.urgensi] || 'bg-[#eff4ff] text-[#565e74]'
                  ]"
                >
                  {{ item.urgensi }}
                </span>
              </td>

              <!-- Masa Berlaku -->
              <td class="py-4 px-6">
                <p class="text-sm text-[#0b1c30]">{{ item.tanggalMulai }}</p>
                <p class="text-xs text-[#565e74]">s/d {{ item.tanggalSelesai }}</p>
              </td>

              <!-- Status -->
              <td class="py-4 px-6" @click.stop>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    item.status === 'Aktif'
                      ? 'bg-[#ccfbf1] text-[#00685f]'
                      : 'bg-[#eff4ff] text-[#565e74]'
                  ]"
                >
                  {{ item.status }}
                </span>
              </td>

              <!-- Aksi -->
              <td class="py-4 px-6 text-right" @click.stop>
                <div class="flex items-center justify-end gap-1">
                  <!-- Preview -->
                  <button
                    @click="openDetailModal(item, 'pengumuman')"
                    class="p-1.5 text-[#565e74] hover:text-[#00685f] hover:bg-[#e5eeff] rounded-md transition-colors"
                    title="Lihat Detail"
                  >
                    <span class="material-symbols-outlined text-[18px]">visibility</span>
                  </button>

                  <!-- Edit -->
                  <button
                    @click="openEditAnnouncementModal(item)"
                    class="p-1.5 text-[#565e74] hover:text-[#00685f] hover:bg-[#e5eeff] rounded-md transition-colors"
                    title="Edit Pengumuman"
                  >
                    <span class="material-symbols-outlined text-[18px]">edit</span>
                  </button>

                  <!-- Hapus -->
                  <button
                    @click="confirmDelete(item, 'pengumuman')"
                    class="p-1.5 text-[#565e74] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/60 rounded-md transition-colors"
                    title="Hapus Pengumuman"
                  >
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination (Matching Stitch design exactly) -->
      <div class="p-4 border-t border-[#bcc9c6]/40 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#f8f9ff]">
        <span class="text-xs sm:text-sm text-[#565e74]">
          Menampilkan
          <span class="font-semibold text-[#0b1c30]">
            {{ currentDataset.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1 }}
          </span>
          -
          <span class="font-semibold text-[#0b1c30]">
            {{ Math.min(currentPage * itemsPerPage, currentDataset.length) }}
          </span>
          dari
          <span class="font-semibold text-[#0b1c30]">{{ currentDataset.length }}</span> data
        </span>

        <div class="flex items-center gap-1.5">
          <!-- Prev Button -->
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="p-1.5 rounded-lg text-[#565e74] hover:bg-[#eff4ff] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Halaman Sebelumnya"
          >
            <span class="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>

          <!-- Page numbers -->
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all',
              currentPage === page
                ? 'bg-[#00685f] text-white shadow-xs'
                : 'text-[#0b1c30] hover:bg-[#eff4ff]'
            ]"
          >
            {{ page }}
          </button>

          <!-- Next Button -->
          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="p-1.5 rounded-lg text-[#565e74] hover:bg-[#eff4ff] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Halaman Berikutnya"
          >
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL: BUAT / EDIT BERITA                  -->
    <!-- ========================================== -->
    <div
      v-if="isNewsModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto"
      @click.self="isNewsModalOpen = false"
    >
      <div class="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-[#bcc9c6]/40 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        <!-- Modal Header -->
        <div class="px-6 py-4 bg-[#f8f9ff] border-b border-[#bcc9c6]/30 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[#00685f] text-2xl">
              {{ isEditingNews ? 'edit_note' : 'post_add' }}
            </span>
            <h3 class="text-lg font-bold text-[#0b1c30]">
              {{ isEditingNews ? 'Edit Berita Desa' : 'Buat Berita Desa Baru' }}
            </h3>
          </div>
          <button
            @click="isNewsModalOpen = false"
            class="text-[#565e74] hover:text-[#0b1c30] p-1 rounded-lg hover:bg-black/5 transition-colors"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Modal Body Form -->
        <form @submit.prevent="saveNews" class="p-6 space-y-4">
          <!-- Judul Berita -->
          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] uppercase tracking-wider mb-1">
              Judul Berita <span class="text-red-500">*</span>
            </label>
            <input
              v-model="newsForm.judul"
              type="text"
              required
              placeholder="Contoh: Musyawarah Desa Pembahasan Anggaran 2024..."
              class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] outline-none"
            />
          </div>

          <!-- Kategori & Penulis (Grid) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] uppercase tracking-wider mb-1">
                Kategori
              </label>
              <select
                v-model="newsForm.kategori"
                class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] outline-none"
              >
                <option value="Sosial">Sosial</option>
                <option value="Pembangunan">Pembangunan</option>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Pemerintahan">Pemerintahan</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] uppercase tracking-wider mb-1">
                Penulis / Kontributor
              </label>
              <input
                v-model="newsForm.penulis"
                type="text"
                placeholder="Nama penulis..."
                class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] outline-none"
              />
            </div>
          </div>

          <!-- Status & Tanggal -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] uppercase tracking-wider mb-1">
                Status Publikasi
              </label>
              <select
                v-model="newsForm.status"
                class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] outline-none"
              >
                <option value="Publish">Publish (Terbit Langsung)</option>
                <option value="Draft">Draft (Simpan Sementara)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] uppercase tracking-wider mb-1">
                Tanggal Tayang
              </label>
              <input
                v-model="newsForm.tanggal"
                type="text"
                class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] outline-none"
              />
            </div>
          </div>

          <!-- Ringkasan Singkat -->
          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] uppercase tracking-wider mb-1">
              Ringkasan Singkat (Lead Paragraph)
            </label>
            <input
              v-model="newsForm.ringkasan"
              type="text"
              placeholder="Rangkuman 1-2 kalimat untuk pratinjau berita..."
              class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] outline-none"
            />
          </div>

          <!-- Isi Berita Lengkap -->
          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] uppercase tracking-wider mb-1">
              Isi Konten Lengkap
            </label>
            <textarea
              v-model="newsForm.konten"
              rows="5"
              placeholder="Tuliskan berita lengkap di sini..."
              class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] outline-none"
            ></textarea>
          </div>

          <!-- Footer Actions -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#bcc9c6]/30">
            <button
              type="button"
              @click="isNewsModalOpen = false"
              class="px-5 py-2 text-sm font-medium text-[#565e74] hover:bg-[#eff4ff] rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-5 py-2 text-sm font-semibold bg-[#00685f] hover:bg-[#005049] text-white rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span class="material-symbols-outlined text-[18px]">save</span>
              {{ isEditingNews ? 'Perbarui Berita' : 'Simpan Berita' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL: BUAT / EDIT PENGUMUMAN              -->
    <!-- ========================================== -->
    <div
      v-if="isAnnouncementModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto"
      @click.self="isAnnouncementModalOpen = false"
    >
      <div class="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-[#bcc9c6]/40 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        <!-- Modal Header -->
        <div class="px-6 py-4 bg-[#f8f9ff] border-b border-[#bcc9c6]/30 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[#00685f] text-2xl">
              campaign
            </span>
            <h3 class="text-lg font-bold text-[#0b1c30]">
              {{ isEditingAnnouncement ? 'Edit Pengumuman Resmi' : 'Buat Pengumuman Baru' }}
            </h3>
          </div>
          <button
            @click="isAnnouncementModalOpen = false"
            class="text-[#565e74] hover:text-[#0b1c30] p-1 rounded-lg hover:bg-black/5 transition-colors"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Modal Body Form -->
        <form @submit.prevent="saveAnnouncement" class="p-6 space-y-4">
          <!-- Judul Pengumuman -->
          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] uppercase tracking-wider mb-1">
              Judul Pengumuman <span class="text-red-500">*</span>
            </label>
            <input
              v-model="announcementForm.judul"
              type="text"
              required
              placeholder="Contoh: Jadwal Pemadaman Listrik Sementara PLN..."
              class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] outline-none"
            />
          </div>

          <!-- Sasaran & Urgensi -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] uppercase tracking-wider mb-1">
                Sasaran Warga
              </label>
              <input
                v-model="announcementForm.sasaran"
                type="text"
                placeholder="Contoh: Seluruh Warga RW 01 - RW 05..."
                class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] outline-none"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] uppercase tracking-wider mb-1">
                Tingkat Urgensi
              </label>
              <select
                v-model="announcementForm.urgensi"
                class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] outline-none"
              >
                <option value="Biasa">Biasa (Informasi Umum)</option>
                <option value="Penting">Penting (Wajib Diperhatikan)</option>
                <option value="Mendesak">Mendesak (Tindakan Segera)</option>
              </select>
            </div>
          </div>

          <!-- Masa Berlaku (Mulai - Selesai) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] uppercase tracking-wider mb-1">
                Tanggal Mulai
              </label>
              <input
                v-model="announcementForm.tanggalMulai"
                type="text"
                placeholder="01 Nov 2023"
                class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] outline-none"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] uppercase tracking-wider mb-1">
                Tanggal Berakhir
              </label>
              <input
                v-model="announcementForm.tanggalSelesai"
                type="text"
                placeholder="05 Nov 2023"
                class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] outline-none"
              />
            </div>
          </div>

          <!-- Waktu & Status -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] uppercase tracking-wider mb-1">
                Waktu / Jam Pelaksanaan
              </label>
              <input
                v-model="announcementForm.waktu"
                type="text"
                placeholder="08.00 WIB - Selesai"
                class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] outline-none"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                v-model="announcementForm.status"
                class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] outline-none"
              >
                <option value="Aktif">Aktif (Disiarkan)</option>
                <option value="Draft">Draft (Arsip Internal)</option>
              </select>
            </div>
          </div>

          <!-- Isi Pengumuman -->
          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] uppercase tracking-wider mb-1">
              Rincian Isi Pengumuman
            </label>
            <textarea
              v-model="announcementForm.isi"
              rows="4"
              placeholder="Tuliskan petunjuk teknis atau isi pengumuman lengkap..."
              class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] outline-none"
            ></textarea>
          </div>

          <!-- Footer Actions -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#bcc9c6]/30">
            <button
              type="button"
              @click="isAnnouncementModalOpen = false"
              class="px-5 py-2 text-sm font-medium text-[#565e74] hover:bg-[#eff4ff] rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-5 py-2 text-sm font-semibold bg-[#00685f] hover:bg-[#005049] text-white rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span class="material-symbols-outlined text-[18px]">publish</span>
              {{ isEditingAnnouncement ? 'Perbarui Pengumuman' : 'Siarkan Pengumuman' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL: DETAIL / PRATINJAU                  -->
    <!-- ========================================== -->
    <div
      v-if="isDetailModalOpen && detailItem"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto"
      @click.self="isDetailModalOpen = false"
    >
      <div class="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-[#bcc9c6]/40 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        <!-- Header -->
        <div class="px-6 py-4 bg-[#f8f9ff] border-b border-[#bcc9c6]/30 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[#00685f] text-2xl">
              {{ detailType === 'berita' ? 'article' : 'campaign' }}
            </span>
            <span class="text-xs uppercase font-bold tracking-wider text-[#565e74]">
              Pratinjau {{ detailType === 'berita' ? 'Berita Desa' : 'Pengumuman Resmi' }}
            </span>
          </div>
          <button
            @click="isDetailModalOpen = false"
            class="text-[#565e74] hover:text-[#0b1c30] p-1 rounded-lg hover:bg-black/5 transition-colors"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Body Detail Berita -->
        <div v-if="detailType === 'berita'" class="p-6 space-y-4">
          <!-- Meta Tags -->
          <div class="flex flex-wrap items-center gap-2">
            <span
              :class="[
                'px-2.5 py-0.5 rounded-full text-xs font-semibold',
                categoryConfig[detailItem.kategori]?.badge || 'bg-[#eff4ff] text-[#565e74]'
              ]"
            >
              {{ detailItem.kategori }}
            </span>
            <span
              :class="[
                'px-2.5 py-0.5 rounded-full text-xs font-semibold',
                detailItem.status === 'Publish' ? 'bg-[#ccfbf1] text-[#00685f]' : 'bg-[#eff4ff] text-[#565e74]'
              ]"
            >
              {{ detailItem.status }}
            </span>
            <span class="text-xs text-[#565e74] ml-auto flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]">visibility</span>
              {{ detailItem.views }} dibaca
            </span>
          </div>

          <!-- Title -->
          <h2 class="text-xl font-bold text-[#0b1c30] leading-snug">
            {{ detailItem.judul }}
          </h2>

          <!-- Author & Date -->
          <div class="flex items-center gap-4 text-xs text-[#565e74] pb-3 border-b border-[#bcc9c6]/30">
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]">person</span>
              {{ detailItem.penulis }}
            </span>
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]">calendar_today</span>
              {{ detailItem.tanggal }}
            </span>
          </div>

          <!-- Ringkasan -->
          <div class="p-4 bg-[#eff4ff] rounded-xl border border-[#bcc9c6]/30 text-sm text-[#00685f] font-medium italic">
            "{{ detailItem.ringkasan }}"
          </div>

          <!-- Full Content -->
          <div class="text-sm text-[#0b1c30] leading-relaxed space-y-3">
            <p>{{ detailItem.konten }}</p>
          </div>
        </div>

        <!-- Body Detail Pengumuman -->
        <div v-else class="p-6 space-y-4">
          <div class="flex flex-wrap items-center gap-2">
            <span
              :class="[
                'px-2.5 py-0.5 rounded-full text-xs font-semibold',
                urgencyConfig[detailItem.urgensi]
              ]"
            >
              Urgensi: {{ detailItem.urgensi }}
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ccfbf1] text-[#00685f]">
              {{ detailItem.status }}
            </span>
          </div>

          <h2 class="text-xl font-bold text-[#0b1c30] leading-snug">
            {{ detailItem.judul }}
          </h2>

          <div class="grid grid-cols-2 gap-3 p-4 bg-[#f8f9ff] rounded-xl border border-[#bcc9c6]/30 text-xs">
            <div>
              <span class="text-[#565e74] block">Sasaran Penerima:</span>
              <span class="font-semibold text-[#0b1c30]">{{ detailItem.sasaran }}</span>
            </div>
            <div>
              <span class="text-[#565e74] block">Waktu Pelaksanaan:</span>
              <span class="font-semibold text-[#0b1c30]">{{ detailItem.waktu || 'Sesuai Jadwal' }}</span>
            </div>
            <div>
              <span class="text-[#565e74] block">Tanggal Mulai:</span>
              <span class="font-semibold text-[#0b1c30]">{{ detailItem.tanggalMulai }}</span>
            </div>
            <div>
              <span class="text-[#565e74] block">Tanggal Berakhir:</span>
              <span class="font-semibold text-[#0b1c30]">{{ detailItem.tanggalSelesai }}</span>
            </div>
          </div>

          <div class="text-sm text-[#0b1c30] leading-relaxed">
            <p class="font-semibold text-xs text-[#565e74] uppercase tracking-wider mb-1">Isi Pengumuman:</p>
            <p class="p-3 bg-white border border-[#bcc9c6]/40 rounded-lg">{{ detailItem.isi }}</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-3 bg-[#f8f9ff] border-t border-[#bcc9c6]/30 flex justify-end">
          <button
            @click="isDetailModalOpen = false"
            class="px-5 py-2 text-sm font-semibold bg-[#00685f] hover:bg-[#005049] text-white rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL: KONFIRMASI HAPUS                    -->
    <!-- ========================================== -->
    <div
      v-if="isDeleteModalOpen && itemToDelete"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
      @click.self="isDeleteModalOpen = false"
    >
      <div class="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#bcc9c6]/40 p-6 animate-in fade-in zoom-in-95 duration-150">
        <div class="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-4">
          <span class="material-symbols-outlined text-2xl">delete</span>
        </div>
        <h3 class="text-lg font-bold text-[#0b1c30] mb-1">
          Hapus {{ deleteType === 'berita' ? 'Berita' : 'Pengumuman' }}?
        </h3>
        <p class="text-sm text-[#565e74] mb-4">
          Apakah Anda yakin ingin menghapus 
          <span class="font-semibold text-[#0b1c30]">"{{ itemToDelete.judul }}"</span>? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div class="flex items-center justify-end gap-3">
          <button
            @click="isDeleteModalOpen = false"
            class="px-4 py-2 text-sm font-medium text-[#565e74] hover:bg-[#eff4ff] rounded-lg transition-colors"
          >
            Batal
          </button>
          <button
            @click="executeDelete"
            class="px-4 py-2 text-sm font-semibold bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-lg transition-colors shadow-sm"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
