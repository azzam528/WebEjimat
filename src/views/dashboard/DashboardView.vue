<script setup>
import { ref } from "vue";

const sidebarOpen = ref(false);
const query = ref("");

const stats = ref([
  {
    title: "Total Penduduk",
    value: "18.240",
    icon: "groups",
    info: "+1.2% dari bulan lalu",
    infoIcon: "arrow_upward",
    color: "primary",
  },
  {
    title: "Kartu Keluarga",
    value: "5.421",
    icon: "folder_shared",
    info: "Stabil",
    infoIcon: "horizontal_rule",
    color: "tertiary",
  },
  {
    title: "Pengajuan Layanan",
    value: "248",
    icon: "description",
    info: "12 butuh tindak lanjut",
    infoIcon: "pending_actions",
    color: "primary",
    danger: true,
  },
]);

const dataQuality = ref([
  {
    label: "Kelengkapan",
    value: 93,
    color: "bg-primary",
    textColor: "text-primary",
  },
  {
    label: "Validitas",
    value: 91,
    color: "bg-primary",
    textColor: "text-primary",
  },
  {
    label: "Uniqueness",
    value: 78,
    color: "bg-[#a36700]",
    textColor: "text-[#a36700]",
  },
  {
    label: "Konsistensi",
    value: 87,
    color: "bg-[#f59e0b]",
    textColor: "text-[#f59e0b]",
  },
]);

const issues = ref([
  {
    title: "124 Data Ganda",
    description: "Ditemukan NIK ganda pada dataset Kependudukan RT 03/RW 05.",
    icon: "content_copy",
    priority: "Prioritas Tinggi",
    type: "high",
  },
  {
    title: "217 Data Tidak Lengkap",
    description: "Kolom 'Pekerjaan' kosong pada dataset Kepala Keluarga.",
    icon: "edit_note",
    priority: "Prioritas Sedang",
    type: "medium",
  },
  {
    title: "45 Format Tidak Sesuai",
    description:
      "Format tanggal lahir tidak konsisten (DD/MM/YYYY vs YYYY-MM-DD).",
    icon: "rule",
    priority: "",
    type: "normal",
  },
]);

const activities = ref([
  {
    text: "Budi Santoso memperbarui data kependudukan RT 01.",
    time: "Hari ini, 10:23",
    primary: true,
  },
  {
    text: "Sistem mendeteksi 15 anomali data baru pada sinkronisasi bulanan.",
    time: "Kemarin, 23:00",
    primary: false,
  },
  {
    text: "Siti Aminah menyelesaikan verifikasi pengajuan SKTM (Nomor: #4421).",
    time: "Kemarin, 14:45",
    primary: false,
  },
]);

const services = ref([
  {
    applicant: "Ahmad Rifai",
    service: "Pembuatan KK Baru",
    date: "12 Okt 2023",
    status: "Menunggu Verifikasi",
    type: "warning",
  },
  {
    applicant: "Nurul Huda",
    service: "Surat Keterangan Usaha",
    date: "11 Okt 2023",
    status: "Selesai",
    type: "success",
  },
  {
    applicant: "Keluarga Bapak Yanto",
    service: "Surat Pengantar Pindah",
    date: "10 Okt 2023",
    status: "Sedang Diproses",
    type: "process",
  },
]);

const complaints = ref([
  {
    id: "#PGD-092",
    title: "Lampu Jalan Mati di RT 04",
    category: "Infrastruktur",
    date: "12 Okt 2023",
    status: "Baru",
    type: "warning",
  },
  {
    id: "#PGD-091",
    title: "Tumpukan Sampah Dekat Balai",
    category: "Kebersihan",
    date: "10 Okt 2023",
    status: "Ditangani",
    type: "process",
  },
]);

const askData = () => {
  if (!query.value.trim()) {
    alert("Silakan masukkan pertanyaan terlebih dahulu");
    return;
  }

  console.log("Pertanyaan:", query.value);

  // TODO:
  // Hubungkan ke API NLQ / AI EJIMAT
};

const setQuery = (text) => {
  query.value = text;
};
</script>

<template>
  <div class="bg-[#F9FAFB] text-[#0b1c30] min-h-screen flex">
    <!-- ================= SIDEBAR ================= -->

    <aside
      :class="[
        'w-[280px] h-screen fixed left-0 top-0 bg-[#0F172A] shadow-sm flex flex-col py-6 px-4 z-30 transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <!-- LOGO -->

      <div class="flex items-center gap-3 mb-8 px-4">
        <div
          class="w-10 h-10 rounded-full bg-[#0d9488] flex items-center justify-center shrink-0"
        >
          <span class="material-symbols-outlined text-white"> home </span>
        </div>

        <div>
          <h1 class="text-2xl font-bold text-white">EJIMAT</h1>

          <p class="text-[#bec6e0] text-xs">Desa Cimenyan</p>
        </div>
      </div>

      <!-- ROLE -->

      <div class="px-4 mb-6">
        <span
          class="text-xs text-[#bec6e0] uppercase tracking-wider font-semibold"
        >
          Admin Desa
        </span>
      </div>

      <!-- MENU -->

      <nav class="flex flex-col gap-1 flex-1">
        <a
          href="#"
          class="flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 border-[#0d9488] bg-[#0d9488]/10 text-[#0d9488] font-bold"
        >
          <span class="material-symbols-outlined"> dashboard </span>

          Dashboard
        </a>

        <a href="#" class="sidebar-menu">
          <span class="material-symbols-outlined"> groups </span>

          Data Penduduk
        </a>

        <a href="#" class="sidebar-menu">
          <span class="material-symbols-outlined"> family_restroom </span>

          Data Keluarga
        </a>

        <a href="#" class="sidebar-menu">
          <span class="material-symbols-outlined"> map </span>

          Wilayah Desa
        </a>

        <a href="#" class="sidebar-menu">
          <span class="material-symbols-outlined"> conveyor_belt </span>

          Pelayanan
        </a>

        <a href="#" class="sidebar-menu">
          <span class="material-symbols-outlined"> campaign </span>

          Pengaduan
        </a>

        <a href="#" class="sidebar-menu">
          <span class="material-symbols-outlined"> analytics </span>

          Data Kualitas
        </a>

        <a href="#" class="sidebar-menu">
          <span class="material-symbols-outlined"> construction </span>

          Pembangunan
        </a>

        <a href="#" class="sidebar-menu">
          <span class="material-symbols-outlined"> newspaper </span>

          Berita & Pengumuman
        </a>

        <a href="#" class="sidebar-menu">
          <span class="material-symbols-outlined"> description </span>

          Laporan
        </a>

        <a href="#" class="sidebar-menu">
          <span class="material-symbols-outlined"> settings </span>

          Pengaturan
        </a>
      </nav>

      <!-- LOGOUT -->

      <div class="pt-4 border-t border-white/10">
        <button
          class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#bec6e0] hover:text-white hover:bg-white/5 transition"
        >
          <span class="material-symbols-outlined"> logout </span>

          Keluar
        </button>
      </div>
    </aside>

    <!-- ================= MAIN ================= -->

    <div class="flex-1 flex flex-col md:ml-[280px] min-w-0">
      <!-- ================= TOPBAR ================= -->

      <header
        class="bg-white border-b border-[#bcc9c6] flex justify-between items-center h-16 px-4 md:px-8 sticky top-0 z-20"
      >
        <div class="flex items-center gap-4">
          <button
            class="md:hidden p-2 rounded-lg hover:bg-gray-100"
            @click="sidebarOpen = !sidebarOpen"
          >
            <span class="material-symbols-outlined"> menu </span>
          </button>

          <div class="hidden md:flex items-center gap-2 text-sm">
            <span class="text-[#3d4947]"> Beranda </span>

            <span class="material-symbols-outlined text-[16px]">
              chevron_right
            </span>

            <span class="text-[#0d9488] font-medium"> Dashboard </span>
          </div>
        </div>

        <!-- ACTIONS -->

        <div class="flex items-center gap-2">
          <button class="relative p-2 rounded-full hover:bg-gray-100">
            <span class="material-symbols-outlined"> notifications </span>

            <span
              class="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"
            ></span>
          </button>

          <button class="p-2 rounded-full hover:bg-gray-100">
            <span class="material-symbols-outlined"> account_circle </span>
          </button>
        </div>
      </header>

      <!-- ================= CONTENT ================= -->

      <main class="flex-1 p-4 md:p-8 bg-[#F9FAFB]">
        <div class="max-w-7xl mx-auto space-y-8 pb-12">
          <!-- HEADER -->

          <section>
            <h2 class="text-3xl font-bold mb-2">Selamat datang, Admin Desa</h2>

            <p class="text-lg text-[#3d4947]">
              Pantau data dan pelayanan Desa Cimenyan dalam satu dashboard.
            </p>
          </section>

          <!-- ================= TANYA DATA ================= -->

          <section
            class="bg-gradient-to-br from-white to-[#0d9488]/5 rounded-xl p-6 border border-[#0d9488]/20 shadow-sm"
          >
            <div class="flex items-center gap-2 mb-4">
              <span class="material-symbols-outlined text-[#0d9488]">
                smart_toy
              </span>

              <h3 class="text-xl font-bold">Tanya Data Desa</h3>
            </div>

            <div class="flex flex-col md:flex-row gap-3">
              <div class="relative flex-1">
                <span
                  class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  search
                </span>

                <input
                  v-model="query"
                  type="text"
                  placeholder="Contoh: Berapa jumlah penduduk setiap dusun?"
                  class="w-full pl-12 pr-4 py-3 rounded-lg border border-[#bcc9c6] bg-white focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488]"
                  @keyup.enter="askData"
                />
              </div>

              <button
                class="bg-[#0d9488] hover:bg-[#115e59] text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                @click="askData"
              >
                Tanyakan

                <span class="material-symbols-outlined"> send </span>
              </button>
            </div>

            <!-- SUGGESTION -->

            <div class="flex flex-wrap gap-2 mt-4">
              <button
                class="suggestion-button"
                @click="setQuery('Tren kelahiran tahun ini')"
              >
                <span class="material-symbols-outlined text-[14px]">
                  trending_up
                </span>

                Tren kelahiran tahun ini
              </button>

              <button
                class="suggestion-button"
                @click="setQuery('Demografi berdasarkan usia')"
              >
                <span class="material-symbols-outlined text-[14px]">
                  group
                </span>

                Demografi berdasarkan usia
              </button>

              <button
                class="suggestion-button"
                @click="setQuery('Distribusi bansos per RW')"
              >
                <span class="material-symbols-outlined text-[14px]"> map </span>

                Distribusi bansos per RW
              </button>
            </div>
          </section>

          <!-- ================= STATS ================= -->

          <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- LOOP CARD -->

            <div
              v-for="stat in stats"
              :key="stat.title"
              class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
            >
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-sm font-medium text-[#565e74]">
                  {{ stat.title }}
                </h3>

                <span
                  class="material-symbols-outlined text-[#0d9488] bg-[#0d9488]/10 p-2 rounded-lg"
                >
                  {{ stat.icon }}
                </span>
              </div>

              <p class="text-4xl font-bold">
                {{ stat.value }}
              </p>

              <p
                :class="[
                  'text-xs font-medium mt-2 flex items-center gap-1',
                  stat.danger ? 'text-red-600' : 'text-[#0d9488]',
                ]"
              >
                <span class="material-symbols-outlined text-[14px]">
                  {{ stat.infoIcon }}
                </span>

                {{ stat.info }}
              </p>
            </div>

            <!-- QUALITY CARD -->

            <div
              class="bg-[#FFF8F6] rounded-xl p-6 border border-[#FADCD5] shadow-sm"
            >
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-sm font-medium text-red-800">
                  Skor Kualitas Data
                </h3>

                <span
                  class="material-symbols-outlined text-red-600 bg-red-100 p-2 rounded-lg"
                >
                  warning
                </span>
              </div>

              <div class="flex justify-between items-end">
                <div>
                  <p class="text-4xl font-bold text-red-800">87.4</p>

                  <span
                    class="inline-flex mt-2 text-[10px] font-bold uppercase bg-red-100 text-red-600 px-2 py-1 rounded-full"
                  >
                    Perlu Perbaikan
                  </span>
                </div>

                <span class="font-bold"> / 100 </span>
              </div>
            </div>
          </section>

          <!-- ================= QUALITY ================= -->

          <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- SCORE -->

            <div
              class="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
            >
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold">Kualitas Data</h3>

                <button>
                  <span class="material-symbols-outlined"> more_vert </span>
                </button>
              </div>

              <!-- CIRCLE -->

              <div class="flex justify-center py-4">
                <div class="relative w-40 h-40">
                  <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#f1f5f9"
                      stroke-width="8"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#ba1a1a"
                      stroke-width="8"
                      stroke-dasharray="282.7"
                      stroke-dashoffset="35.6"
                      stroke-linecap="round"
                    />
                  </svg>

                  <div
                    class="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <span class="text-4xl font-bold"> 87.4 </span>

                    <span class="text-xs text-gray-500">
                      Skor Keseluruhan
                    </span>
                  </div>
                </div>
              </div>

              <!-- PROGRESS -->

              <div class="space-y-4 mt-6">
                <div v-for="item in dataQuality" :key="item.label">
                  <div class="flex justify-between text-sm mb-1">
                    <span class="font-medium">
                      {{ item.label }}
                    </span>

                    <span :class="['font-bold', item.textColor]">
                      {{ item.value }}%
                    </span>
                  </div>

                  <div
                    class="h-2 w-full bg-gray-100 rounded-full overflow-hidden"
                  >
                    <div
                      :class="['h-full rounded-full', item.color]"
                      :style="{ width: item.value + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ================= ISSUES ================= -->

            <div class="lg:col-span-2">
              <div
                class="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
              >
                <div class="flex justify-between items-center mb-4">
                  <div>
                    <h3 class="text-xl font-bold">Masalah Data</h3>

                    <p class="text-sm text-gray-500">
                      Tindakan diperlukan untuk meningkatkan kualitas data.
                    </p>
                  </div>

                  <button class="text-sm font-medium text-[#0d9488]">
                    Lihat Semua
                  </button>
                </div>

                <div class="space-y-3">
                  <div
                    v-for="issue in issues"
                    :key="issue.title"
                    class="flex items-start gap-4 p-4 rounded-lg border hover:bg-gray-50 transition cursor-pointer"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <span class="material-symbols-outlined text-[#0d9488]">
                        {{ issue.icon }}
                      </span>
                    </div>

                    <div class="flex-1">
                      <div class="flex justify-between items-start">
                        <h4 class="font-semibold">
                          {{ issue.title }}
                        </h4>

                        <span
                          v-if="issue.priority"
                          class="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600"
                        >
                          {{ issue.priority }}
                        </span>
                      </div>

                      <p class="text-sm text-gray-500 mt-1">
                        {{ issue.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- ================= BOTTOM ================= -->

          <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- ACTIVITY -->

            <div
              class="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
            >
              <h3 class="text-xl font-bold mb-6">Aktivitas Terakhir</h3>

              <div class="border-l-2 border-gray-200 ml-3 space-y-6">
                <div
                  v-for="activity in activities"
                  :key="activity.time"
                  class="relative pl-6"
                >
                  <div
                    :class="[
                      'absolute -left-[9px] top-1 w-4 h-4 rounded-full ring-4 ring-white',
                      activity.primary ? 'bg-[#0d9488]' : 'bg-gray-300',
                    ]"
                  ></div>

                  <p class="text-sm">
                    {{ activity.text }}
                  </p>

                  <span class="text-xs text-gray-500 block mt-1">
                    {{ activity.time }}
                  </span>
                </div>
              </div>
            </div>

            <!-- TABLES -->

            <div class="lg:col-span-2 space-y-6">
              <!-- SERVICE -->

              <div
                class="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
              >
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-xl font-bold">Pengajuan Layanan Terbaru</h3>

                  <button class="text-[#0d9488]">Lihat Semua</button>
                </div>

                <div class="overflow-x-auto">
                  <table class="w-full text-left">
                    <thead>
                      <tr class="border-b text-sm text-gray-500">
                        <th class="pb-3">Pemohon</th>

                        <th class="pb-3">Jenis Layanan</th>

                        <th class="pb-3">Tanggal</th>

                        <th class="pb-3">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        v-for="service in services"
                        :key="service.applicant"
                        class="border-b hover:bg-gray-50"
                      >
                        <td class="py-3 font-medium">
                          {{ service.applicant }}
                        </td>

                        <td class="py-3">
                          {{ service.service }}
                        </td>

                        <td class="py-3 text-gray-500">
                          {{ service.date }}
                        </td>

                        <td class="py-3">
                          <span
                            :class="[
                              'px-3 py-1 rounded-full text-xs font-medium',
                              {
                                'bg-orange-100 text-orange-700':
                                  service.type === 'warning',

                                'bg-teal-100 text-teal-700':
                                  service.type === 'success',

                                'bg-blue-100 text-blue-700':
                                  service.type === 'process',
                              },
                            ]"
                          >
                            {{ service.status }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- COMPLAINT -->

              <div
                class="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
              >
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-xl font-bold">Pengaduan Terbaru</h3>

                  <button class="text-[#0d9488]">Lihat Semua</button>
                </div>

                <div class="overflow-x-auto">
                  <table class="w-full text-left">
                    <thead>
                      <tr class="border-b text-sm text-gray-500">
                        <th class="pb-3">ID</th>
                        <th class="pb-3">Judul</th>
                        <th class="pb-3">Kategori</th>
                        <th class="pb-3">Tanggal</th>
                        <th class="pb-3">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        v-for="complaint in complaints"
                        :key="complaint.id"
                        class="border-b hover:bg-gray-50"
                      >
                        <td class="py-3 text-gray-500">
                          {{ complaint.id }}
                        </td>

                        <td class="py-3 font-medium">
                          {{ complaint.title }}
                        </td>

                        <td class="py-3">
                          {{ complaint.category }}
                        </td>

                        <td class="py-3 text-gray-500">
                          {{ complaint.date }}
                        </td>

                        <td class="py-3">
                          <span
                            :class="[
                              'px-3 py-1 rounded-full text-xs font-medium',
                              {
                                'bg-orange-100 text-orange-700':
                                  complaint.type === 'warning',

                                'bg-blue-100 text-blue-700':
                                  complaint.type === 'process',
                              },
                            ]"
                          >
                            {{ complaint.status }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.sidebar-menu {
  @apply flex items-center gap-3 px-4 py-3 rounded-lg text-[#bec6e0] hover:text-white hover:bg-white/5 transition-colors;
}

.suggestion-button {
  @apply text-xs px-3 py-1.5 rounded-full bg-white border border-[#bcc9c6] hover:bg-[#eff4ff] hover:border-[#0d9488]/50 transition-colors text-[#3d4947] flex items-center gap-1;
}
</style>
