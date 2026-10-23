<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// NLQ State
const nlqQuery = ref("Temukan warga perempuan berusia 25–35 tahun di Dusun 2");
const activeFilterNote = ref("Temukan warga perempuan berusia 25–35 tahun di Dusun 2");
const isSearching = ref(false);

const exampleQueries = [
  "Tampilkan lansia di atas 60 tahun",
  "Siapa yang belum rekam KTP?",
  "Warga penerima bansos Dusun 1",
];

// Resident Data
const residents = ref([
  {
    id: "3204051203850001",
    nik: "3204051203850001",
    name: "Siti Aminah",
    gender: "Perempuan",
    age: 28,
    address: "Dusun 2, RT 01/RW 03",
    dusun: "Dusun 2",
    ktpStatus: "Terekam",
    ktpBadgeClass: "bg-[#E6F4EA] text-[#137333]",
  },
  {
    id: "3204051203850002",
    nik: "3204051203850002",
    name: "Nurul Hidayati",
    gender: "Perempuan",
    age: 31,
    address: "Dusun 2, RT 02/RW 03",
    dusun: "Dusun 2",
    ktpStatus: "Terekam",
    ktpBadgeClass: "bg-[#E6F4EA] text-[#137333]",
  },
  {
    id: "3204051203850003",
    nik: "3204051203850003",
    name: "Rina Sari",
    gender: "Perempuan",
    age: 25,
    address: "Dusun 2, RT 01/RW 04",
    dusun: "Dusun 2",
    ktpStatus: "Belum Terekam",
    ktpBadgeClass: "bg-[#FEF7E0] text-[#B06000]",
  },
  {
    id: "3204051203850004",
    nik: "3204051203850004",
    name: "Dewi Lestari",
    gender: "Perempuan",
    age: 34,
    address: "Dusun 2, RT 03/RW 03",
    dusun: "Dusun 2",
    ktpStatus: "Terekam",
    ktpBadgeClass: "bg-[#E6F4EA] text-[#137333]",
  },
  {
    id: "3204051203850005",
    nik: "3204051203850005",
    name: "Ahmad Soleh",
    gender: "Laki-laki",
    age: 38,
    address: "Dusun 1, RT 02/RW 05",
    dusun: "Dusun 1",
    ktpStatus: "Terekam",
    ktpBadgeClass: "bg-[#E6F4EA] text-[#137333]",
  },
  {
    id: "3204051203850006",
    nik: "3204051203850006",
    name: "Budi Santoso",
    gender: "Laki-laki",
    age: 64,
    address: "Dusun 3, RT 01/RW 01",
    dusun: "Dusun 3",
    ktpStatus: "Terekam",
    ktpBadgeClass: "bg-[#E6F4EA] text-[#137333]",
  },
]);

// Filtered residents based on NLQ or simple query
const filteredResidents = computed(() => {
  const q = nlqQuery.value.toLowerCase().trim();
  if (!q) return residents.value;

  if (q.includes("perempuan") || q.includes("wanita")) {
    return residents.value.filter(
      (r) => r.gender === "Perempuan" && (q.includes("dusun 2") ? r.dusun === "Dusun 2" : true)
    );
  }

  if (q.includes("lansia") || q.includes("60")) {
    return residents.value.filter((r) => r.age >= 60);
  }

  if (q.includes("belum rekam") || q.includes("ktp")) {
    return residents.value.filter((r) => r.ktpStatus === "Belum Terekam");
  }

  return residents.value.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.nik.includes(q) ||
      r.address.toLowerCase().includes(q)
  );
});

const handleSearch = () => {
  isSearching.value = true;
  activeFilterNote.value = nlqQuery.value;
  setTimeout(() => {
    isSearching.value = false;
  }, 300);
};

const applyExample = (ex) => {
  nlqQuery.value = ex;
  handleSearch();
};

const resetFilter = () => {
  nlqQuery.value = "";
  activeFilterNote.value = "Semua Data";
};

const goToDetail = (id) => {
  router.push(`/penduduk/${id}`);
};
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-6 sm:space-y-8 pb-12">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight mb-1.5">
          Data Penduduk
        </h2>
        <p class="text-sm sm:text-base text-[#3d4947]">
          Kelola data warga desa dengan mudah menggunakan query natural.
        </p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <button
          type="button"
          class="flex-1 sm:flex-none bg-[#0d9488] hover:bg-[#0b766c] text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
        >
          <span class="material-symbols-outlined text-[20px]">add</span>
          <span>Tambah Penduduk</span>
        </button>
      </div>
    </div>

    <!-- NLQ & Data Quality Bento Grid -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <!-- NLQ Input Box (Spans 2 cols) -->
      <div class="col-span-1 md:col-span-2 bg-white rounded-2xl border border-[#bcc9c6]/40 p-6 shadow-xs relative overflow-hidden group hover:border-[#0d9488]/40 transition-all">
        <div class="absolute inset-0 bg-gradient-to-br from-[#0d9488]/5 to-transparent pointer-events-none"></div>

        <label class="block text-sm font-semibold text-[#0b1c30] mb-2 flex items-center gap-2" for="nlq-input">
          <span class="material-symbols-outlined text-[#0d9488] text-[20px] icon-filled">magic_button</span>
          <span>Tanya Data Penduduk (NLQ)</span>
        </label>

        <form class="relative" @submit.prevent="handleSearch">
          <input
            id="nlq-input"
            v-model="nlqQuery"
            type="text"
            placeholder="Ketik pertanyaan Anda tentang data penduduk..."
            class="w-full bg-[#f8f9ff] text-[#0b1c30] border border-[#bcc9c6] rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition-all placeholder:text-[#6d7a77]"
          />
          <button
            type="submit"
            title="Cari"
            class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-[#0d9488] hover:bg-[#0d9488]/10 transition-colors cursor-pointer"
          >
            <span class="material-symbols-outlined text-[22px]">search</span>
          </button>
        </form>

        <!-- Example Prompts -->
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <span class="text-xs text-[#565e74] font-medium">Contoh:</span>
          <button
            v-for="ex in exampleQueries"
            :key="ex"
            type="button"
            class="text-xs px-2.5 py-1 rounded-full bg-white border border-[#bcc9c6]/70 hover:bg-[#eff4ff] hover:border-[#0d9488]/40 text-[#3d4947] transition-colors cursor-pointer"
            @click="applyExample(ex)"
          >
            "{{ ex }}"
          </button>
        </div>
      </div>

      <!-- Data Quality Score Box -->
      <div class="col-span-1 bg-white rounded-2xl border border-[#bcc9c6]/40 p-6 shadow-xs flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-[#0d9488]/40 transition-all">
        <div class="w-14 h-14 rounded-2xl bg-[#dae2fd] flex items-center justify-center mb-3 text-[#131b2e] shadow-xs">
          <span class="material-symbols-outlined text-[30px] icon-filled">analytics</span>
        </div>
        <h3 class="text-sm font-semibold text-[#565e74]">Data Quality Score</h3>
        <p class="text-4xl font-extrabold text-[#0d9488] tracking-tight mt-1">94%</p>
        <span class="text-xs font-semibold text-[#115e59] mt-2 bg-[#ccfbf1]/60 py-1 px-3 rounded-full border border-[#0d9488]/20">
          Akurat &amp; Terverifikasi
        </span>
      </div>
    </section>

    <!-- Table Section -->
    <section class="bg-white rounded-2xl border border-[#bcc9c6]/40 shadow-xs overflow-hidden">
      <!-- Table Header & Controls -->
      <div class="p-5 sm:p-6 border-b border-[#bcc9c6]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#f8f9ff]/60">
        <div>
          <h3 class="text-base font-bold text-[#0b1c30]">Hasil Pencarian</h3>
          <p class="text-xs text-[#0d9488] font-semibold mt-1 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">filter_alt</span>
            <span>Filter dari Natural Language Query: "{{ activeFilterNote || 'Semua Data' }}"</span>
            <button
              v-if="nlqQuery"
              class="ml-2 text-xs text-[#565e74] hover:text-[#0b1c30] underline cursor-pointer"
              @click="resetFilter"
            >
              Reset
            </button>
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            title="Unduh Data"
            class="p-2 border border-[#bcc9c6] rounded-xl hover:bg-white text-[#3d4947] transition-colors cursor-pointer shadow-2xs"
          >
            <span class="material-symbols-outlined text-[20px]">download</span>
          </button>
          <button
            type="button"
            title="Cetak Data"
            class="p-2 border border-[#bcc9c6] rounded-xl hover:bg-white text-[#3d4947] transition-colors cursor-pointer shadow-2xs"
          >
            <span class="material-symbols-outlined text-[20px]">print</span>
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr class="bg-[#f8f9ff] border-b border-[#bcc9c6]/40 text-xs font-semibold uppercase tracking-wider text-[#565e74]">
              <th class="py-3.5 px-6">NIK / Nama</th>
              <th class="py-3.5 px-6">Jenis Kelamin</th>
              <th class="py-3.5 px-6">Usia</th>
              <th class="py-3.5 px-6">Alamat (Dusun)</th>
              <th class="py-3.5 px-6">Status KTP</th>
              <th class="py-3.5 px-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="text-xs sm:text-sm text-[#0b1c30] divide-y divide-[#bcc9c6]/20">
            <tr
              v-for="item in filteredResidents"
              :key="item.id"
              class="hover:bg-[#eff4ff]/60 transition-colors cursor-pointer group"
              @click="goToDetail(item.id)"
            >
              <td class="py-4 px-6">
                <div class="font-bold text-[#0b1c30] group-hover:text-[#0d9488] transition-colors flex items-center gap-2">
                  <span>{{ item.name }}</span>
                </div>
                <div class="text-[#565e74] text-xs font-mono mt-0.5">
                  {{ item.nik }}
                </div>
              </td>
              <td class="py-4 px-6 text-[#3d4947]">{{ item.gender }}</td>
              <td class="py-4 px-6 text-[#3d4947]">{{ item.age }} Tahun</td>
              <td class="py-4 px-6 text-[#3d4947]">{{ item.address }}</td>
              <td class="py-4 px-6">
                <span :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold', item.ktpBadgeClass]">
                  {{ item.ktpStatus }}
                </span>
              </td>
              <td class="py-4 px-6 text-right" @click.stop>
                <div class="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    class="px-2.5 py-1 text-xs font-semibold text-[#0d9488] hover:bg-[#0d9488]/10 rounded-lg transition-colors cursor-pointer"
                    @click="goToDetail(item.id)"
                  >
                    Detail
                  </button>
                  <button
                    type="button"
                    class="text-[#565e74] hover:text-[#0b1c30] p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    title="Menu Lainnya"
                  >
                    <span class="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredResidents.length === 0">
              <td colspan="6" class="py-12 text-center text-[#565e74]">
                <span class="material-symbols-outlined text-4xl text-[#bcc9c6] block mb-2">person_off</span>
                Tidak ada data warga yang cocok dengan query tersebut.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table Footer / Pagination -->
      <div class="p-4 border-t border-[#bcc9c6]/30 flex flex-col sm:flex-row justify-between items-center gap-3 bg-[#f8f9ff]/50">
        <span class="text-xs sm:text-sm text-[#565e74]">
          Menampilkan {{ filteredResidents.length }} dari {{ residents.length }} hasil untuk query tersebut
        </span>

        <div class="flex items-center gap-1">
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bcc9c6] text-[#565e74] disabled:opacity-40 cursor-pointer"
            disabled
          >
            <span class="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0d9488] text-white font-semibold text-xs shadow-xs"
          >
            1
          </button>
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bcc9c6] text-[#565e74] disabled:opacity-40 cursor-pointer"
            disabled
          >
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
