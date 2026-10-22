<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

defineEmits(["toggle-mobile-menu"]);

const route = useRoute();

const currentTitle = computed(() => {
  const name = route.name;
  if (!name || name === "Dashboard") return "Dashboard";
  if (name === "Penduduk") return "Data Penduduk";
  if (name === "Keluarga") return "Data Keluarga";
  if (name === "Wilayah") return "Wilayah Desa";
  if (name === "Layanan") return "Pelayanan";
  if (name === "Pengaduan") return "Pengaduan";
  if (name === "AuditLog") return "Data Kualitas";
  if (name === "Pembangunan") return "Pembangunan";
  if (name === "Berita") return "Berita & Pengumuman";
  return name;
});
</script>

<template>
  <header class="bg-white border-b border-[#bcc9c6]/40 flex justify-between items-center w-full h-16 px-4 md:px-8 z-20 shrink-0 sticky top-0 shadow-xs">
    <!-- Left: Breadcrumb / Mobile Toggle -->
    <div class="flex items-center gap-3">
      <!-- Hamburger Menu for Mobile -->
      <button
        class="md:hidden text-[#3d4947] hover:bg-[#e5eeff] p-2 rounded-lg transition-colors cursor-pointer active:scale-95"
        title="Buka Menu"
        @click="$emit('toggle-mobile-menu')"
      >
        <span class="material-symbols-outlined text-[24px]">menu</span>
      </button>

      <!-- Brand on Mobile -->
      <div class="font-bold text-lg text-[#0b1c30] md:hidden">
        EJIMAT
      </div>

      <!-- Breadcrumbs on Desktop -->
      <nav class="hidden md:flex items-center gap-2 text-sm text-[#3d4947]">
        <span class="text-[#6d7a77] hover:text-[#0b1c30] transition-colors">Beranda</span>
        <span class="material-symbols-outlined text-[16px] text-[#bcc9c6]">chevron_right</span>
        <span class="text-[#0d9488] font-semibold border-b-2 border-[#0d9488] pb-0.5">
          {{ currentTitle }}
        </span>
      </nav>
    </div>

    <!-- Right: Notifications & Profile -->
    <div class="flex items-center gap-2">
      <!-- Notifications -->
      <button
        class="text-[#3d4947] hover:bg-[#e5eeff] p-2 rounded-full transition-colors cursor-pointer relative active:scale-95"
        title="Notifikasi"
      >
        <span class="material-symbols-outlined text-[22px]">notifications</span>
        <span class="absolute top-2 right-2 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full border-2 border-white ring-1 ring-red-400/20"></span>
      </button>

      <!-- User Profile -->
      <button
        class="flex items-center gap-2 text-[#3d4947] hover:bg-[#e5eeff] p-1.5 sm:px-3 sm:py-1.5 rounded-full transition-colors cursor-pointer active:scale-95"
        title="Profil Pengguna"
      >
        <span class="material-symbols-outlined text-[26px] text-[#0d9488]">account_circle</span>
        <span class="hidden sm:inline-block text-xs font-semibold text-[#0b1c30]">Admin Desa</span>
      </button>
    </div>
  </header>
</template>
