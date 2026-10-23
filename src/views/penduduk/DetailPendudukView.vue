<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Resident Information
const resident = ref({
  id: route.params.id || "3204051203850001",
  nik: "3204051203850001",
  kkNumber: "3204051001120003",
  name: "Ahmad Soleh",
  birthPlaceDate: "Bandung, 12 Maret 1985",
  gender: "Laki-laki",
  religion: "Islam",
  education: "SLTA / Sederajat",
  occupation: "Wiraswasta",
  maritalStatus: "Kawin",
  fullAddress: "Kp. Cimenyan RT 02 / RW 05, Desa Cimenyan, Kec. Cimenyan, Kab. Bandung, Jawa Barat 40197",
});

// Data Quality Metrics
const qualityMetrics = ref({
  status: "Valid",
  completeness: 100,
  validity: 100,
  uniqueness: 96,
  duplicationNote: "Potensi duplikasi nama di RT lain (Ahmad Soleh).",
});

// Family Members
const familyMembers = ref([
  { initial: "S", name: "Siti Aminah", relation: "Istri" },
  { initial: "B", name: "Budi Santoso", relation: "Anak" },
]);

// Change History
const changeHistories = ref([
  {
    datetime: "15 Okt 2023, 14:30",
    actor: "Admin Kependudukan",
    actorIcon: "account_circle",
    column: "Pekerjaan",
    oldValue: "Karyawan Swasta",
    newValue: "Wiraswasta",
  },
  {
    datetime: "02 Mar 2021, 09:15",
    actor: "Operator Desa",
    actorIcon: "account_circle",
    column: "Pendidikan",
    oldValue: "SLTP / Sederajat",
    newValue: "SLTA / Sederajat",
  },
  {
    datetime: "10 Jan 2019, 11:00",
    actor: "Migrasi Sistem (SIAK)",
    actorIcon: "api",
    column: "Status Perkawinan",
    oldValue: "Belum Kawin",
    newValue: "Kawin",
  },
]);

const goBack = () => {
  router.push("/penduduk");
};
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-6 sm:space-y-8 pb-12">
    <!-- Back Button & Breadcrumbs Navigation -->
    <div class="flex items-center gap-3">
      <button
        type="button"
        class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0d9488] hover:text-[#0b766c] px-3 py-1.5 rounded-lg hover:bg-[#0d9488]/10 transition-colors cursor-pointer"
        @click="goBack"
      >
        <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        <span>Kembali ke Data Penduduk</span>
      </button>
    </div>

    <!-- Header Actions -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-[#bcc9c6]/40 shadow-xs">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <h1 class="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
            {{ resident.name }}
          </h1>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]">
            Aktif
          </span>
        </div>
        <p class="text-sm sm:text-base text-[#565e74] flex items-center gap-2 font-mono">
          <span class="material-symbols-outlined text-[#0d9488] text-[18px]">badge</span>
          <span>NIK: {{ resident.nik }}</span>
        </p>
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto">
        <button
          type="button"
          class="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-[#bcc9c6] rounded-xl text-[#0b1c30] hover:bg-[#f8f9ff] text-sm font-medium transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px] text-[#565e74]">edit</span>
          <span>Ubah Data</span>
        </button>
        <button
          type="button"
          class="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0d9488] hover:bg-[#0b766c] text-white rounded-xl text-sm font-medium transition-all shadow-xs active:scale-98 cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px]">print</span>
          <span>Cetak Surat</span>
        </button>
      </div>
    </div>

    <!-- Bento Grid Layout for Detail -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Main Detail Card (Spans 8 cols) -->
      <div class="col-span-1 lg:col-span-8 bg-white rounded-2xl border border-[#bcc9c6]/40 shadow-xs p-6 sm:p-8 relative overflow-hidden">
        <!-- Accent Line -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0d9488] to-[#89f5e7]"></div>

        <h2 class="text-lg font-bold text-[#0b1c30] mb-6 flex items-center gap-2.5 border-b border-[#bcc9c6]/30 pb-4">
          <span class="material-symbols-outlined text-[#0d9488] text-[22px] icon-filled">person_search</span>
          <span>Informasi Pribadi</span>
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
          <div>
            <div class="text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1">
              Nomor Kartu Keluarga (KK)
            </div>
            <div class="text-sm sm:text-base text-[#0b1c30] font-semibold font-mono">
              {{ resident.kkNumber }}
            </div>
          </div>

          <div>
            <div class="text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1">
              Nama Lengkap
            </div>
            <div class="text-sm sm:text-base text-[#0b1c30] font-semibold">
              {{ resident.name }}
            </div>
          </div>

          <div>
            <div class="text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1">
              Tempat, Tanggal Lahir
            </div>
            <div class="text-sm sm:text-base text-[#0b1c30] font-medium">
              {{ resident.birthPlaceDate }}
            </div>
          </div>

          <div>
            <div class="text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1">
              Jenis Kelamin
            </div>
            <div class="text-sm sm:text-base text-[#0b1c30] font-medium">
              {{ resident.gender }}
            </div>
          </div>

          <div>
            <div class="text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1">
              Agama
            </div>
            <div class="text-sm sm:text-base text-[#0b1c30] font-medium">
              {{ resident.religion }}
            </div>
          </div>

          <div>
            <div class="text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1">
              Pendidikan
            </div>
            <div class="text-sm sm:text-base text-[#0b1c30] font-medium">
              {{ resident.education }}
            </div>
          </div>

          <div>
            <div class="text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1">
              Pekerjaan
            </div>
            <div class="text-sm sm:text-base text-[#0b1c30] font-medium">
              {{ resident.occupation }}
            </div>
          </div>

          <div>
            <div class="text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1">
              Status Perkawinan
            </div>
            <div class="text-sm sm:text-base text-[#0b1c30] font-medium">
              {{ resident.maritalStatus }}
            </div>
          </div>

          <!-- Full Address Box -->
          <div class="sm:col-span-2 p-4 bg-[#f8f9ff] rounded-xl border border-[#bcc9c6]/40">
            <div class="text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px] text-[#0d9488]">location_on</span>
              <span>Alamat Lengkap</span>
            </div>
            <div class="text-sm text-[#0b1c30] leading-relaxed">
              {{ resident.fullAddress }}
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Data Quality & Family (Spans 4 cols) -->
      <div class="col-span-1 lg:col-span-4 flex flex-col gap-6">
        <!-- Data Quality Widget -->
        <div class="bg-gradient-to-br from-[#f8f9ff] to-white rounded-2xl border border-[#bcc9c6]/40 shadow-xs p-6 relative overflow-hidden">
          <div class="absolute -right-8 -top-8 w-32 h-32 bg-[#0d9488]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div class="flex items-center justify-between mb-5 relative z-10">
            <h2 class="text-base font-bold text-[#0b1c30] flex items-center gap-2">
              <span class="material-symbols-outlined text-[#0d9488] text-[20px] icon-filled">verified_user</span>
              <span>Data Quality</span>
            </h2>
            <div class="px-2.5 py-0.5 bg-[#E6F4EA] text-[#137333] rounded-full text-xs font-semibold flex items-center gap-1 border border-[#CEEAD6]">
              <span class="material-symbols-outlined text-[14px]">check_circle</span>
              <span>{{ qualityMetrics.status }}</span>
            </div>
          </div>

          <div class="space-y-4 relative z-10">
            <!-- Metric 1: Kelengkapan -->
            <div>
              <div class="flex justify-between items-end mb-1 text-xs">
                <span class="text-[#565e74] font-medium">Kelengkapan</span>
                <span class="text-[#0b1c30] font-bold">{{ qualityMetrics.completeness }}%</span>
              </div>
              <div class="w-full h-2 bg-[#d3e4fe]/50 rounded-full overflow-hidden">
                <div class="h-full bg-[#0d9488] rounded-full" :style="{ width: `${qualityMetrics.completeness}%` }"></div>
              </div>
            </div>

            <!-- Metric 2: Validitas -->
            <div>
              <div class="flex justify-between items-end mb-1 text-xs">
                <span class="text-[#565e74] font-medium">Keabsahan (Validitas)</span>
                <span class="text-[#0b1c30] font-bold">{{ qualityMetrics.validity }}%</span>
              </div>
              <div class="w-full h-2 bg-[#d3e4fe]/50 rounded-full overflow-hidden">
                <div class="h-full bg-[#0d9488] rounded-full" :style="{ width: `${qualityMetrics.validity}%` }"></div>
              </div>
            </div>

            <!-- Metric 3: Keunikan -->
            <div>
              <div class="flex justify-between items-end mb-1 text-xs">
                <span class="text-[#565e74] font-medium">Keunikan (Uniqueness)</span>
                <span class="text-[#0b1c30] font-bold">{{ qualityMetrics.uniqueness }}%</span>
              </div>
              <div class="w-full h-2 bg-[#d3e4fe]/50 rounded-full overflow-hidden flex">
                <div class="h-full bg-[#0d9488] rounded-l-full" :style="{ width: `${qualityMetrics.uniqueness}%` }"></div>
                <div class="h-full bg-[#ba1a1a] rounded-r-full" :style="{ width: `${100 - qualityMetrics.uniqueness}%` }"></div>
              </div>
              <p class="text-[11px] text-[#ba1a1a] mt-1.5 flex items-start gap-1 font-medium leading-tight">
                <span class="material-symbols-outlined text-[14px] shrink-0 mt-0.5">info</span>
                <span>{{ qualityMetrics.duplicationNote }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Family Members Quick List -->
        <div class="bg-white rounded-2xl border border-[#bcc9c6]/40 shadow-xs p-6">
          <h2 class="text-base font-bold text-[#0b1c30] mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-[#565e74] text-[20px] icon-filled">diversity_3</span>
            <span>Anggota Keluarga</span>
          </h2>

          <ul class="space-y-2.5">
            <li
              v-for="member in familyMembers"
              :key="member.name"
              class="flex items-center justify-between p-2.5 hover:bg-[#f8f9ff] rounded-xl transition-colors cursor-pointer group"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#0d9488]/10 flex items-center justify-center text-[#0d9488] font-bold text-xs">
                  {{ member.initial }}
                </div>
                <div>
                  <div class="text-xs sm:text-sm font-semibold text-[#0b1c30] group-hover:text-[#0d9488] transition-colors">
                    {{ member.name }}
                  </div>
                  <div class="text-xs text-[#565e74]">{{ member.relation }}</div>
                </div>
              </div>
              <span class="material-symbols-outlined text-[#bcc9c6] text-[18px] group-hover:text-[#0d9488] transition-colors">
                chevron_right
              </span>
            </li>
          </ul>

          <RouterLink
            to="/keluarga"
            class="mt-4 block text-center text-xs font-semibold text-[#0d9488] hover:underline pt-2 border-t border-[#bcc9c6]/30"
          >
            Lihat Detail Kartu Keluarga
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- History Table Section -->
    <div class="bg-white rounded-2xl border border-[#bcc9c6]/40 shadow-xs overflow-hidden">
      <div class="p-5 sm:p-6 border-b border-[#bcc9c6]/30 flex justify-between items-center bg-[#f8f9ff]/60">
        <h2 class="text-base font-bold text-[#0b1c30] flex items-center gap-2">
          <span class="material-symbols-outlined text-[#565e74] text-[20px]">history</span>
          <span>Riwayat Perubahan Data</span>
        </h2>
        <button
          type="button"
          class="text-[#0d9488] hover:bg-[#0d9488]/10 p-2 rounded-xl transition-colors cursor-pointer"
          title="Filter Riwayat"
        >
          <span class="material-symbols-outlined text-[20px]">filter_list</span>
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr class="bg-[#f8f9ff] border-b border-[#bcc9c6]/40 text-xs font-semibold uppercase tracking-wider text-[#565e74]">
              <th class="py-3 px-6">Tanggal &amp; Waktu</th>
              <th class="py-3 px-6">Petugas (Aktor)</th>
              <th class="py-3 px-6">Kolom Diubah</th>
              <th class="py-3 px-6">Nilai Lama</th>
              <th class="py-3 px-6">Nilai Baru</th>
            </tr>
          </thead>
          <tbody class="text-xs sm:text-sm text-[#0b1c30] divide-y divide-[#bcc9c6]/20">
            <tr
              v-for="h in changeHistories"
              :key="h.datetime + h.column"
              class="hover:bg-[#eff4ff]/60 transition-colors"
            >
              <td class="py-4 px-6 text-[#565e74] whitespace-nowrap">{{ h.datetime }}</td>
              <td class="py-4 px-6 font-medium flex items-center gap-2">
                <span class="material-symbols-outlined text-[#565e74] text-[18px]">{{ h.actorIcon }}</span>
                <span>{{ h.actor }}</span>
              </td>
              <td class="py-4 px-6">
                <span class="px-2.5 py-1 bg-[#d3e4fe]/50 rounded-lg text-xs font-semibold text-[#0b1c30]">
                  {{ h.column }}
                </span>
              </td>
              <td class="py-4 px-6 text-[#6d7a77] line-through">{{ h.oldValue }}</td>
              <td class="py-4 px-6 text-[#0d9488] font-bold">{{ h.newValue }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- History Pagination -->
      <div class="p-4 border-t border-[#bcc9c6]/30 flex justify-between items-center text-xs text-[#565e74] bg-[#f8f9ff]/40">
        <span>Menampilkan 1-{{ changeHistories.length }} dari {{ changeHistories.length }} riwayat</span>
        <div class="flex items-center gap-1">
          <button
            type="button"
            class="p-1 rounded-lg border border-[#bcc9c6] text-[#565e74] disabled:opacity-40"
            disabled
          >
            <span class="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>
          <button
            type="button"
            class="p-1 rounded-lg border border-[#bcc9c6] text-[#565e74] disabled:opacity-40"
            disabled
          >
            <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
