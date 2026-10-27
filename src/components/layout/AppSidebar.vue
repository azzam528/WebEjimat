<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  mobileOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const route = useRoute();
const router = useRouter();

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
  { name: "Data Penduduk", path: "/penduduk", icon: "groups" },
  { name: "Data Keluarga", path: "/keluarga", icon: "family_restroom" },
  { name: "Wilayah Desa", path: "/wilayah", icon: "map" },
  { name: "Pelayanan", path: "/layanan", icon: "conveyor_belt" },
  { name: "Pengaduan", path: "/pengaduan", icon: "campaign" },
  { name: "Data Kualitas", path: "/audit", icon: "analytics" },
  { name: "Pembangunan", path: "/pembangunan", icon: "construction" },
  { name: "Berita & Pengumuman", path: "/berita", icon: "newspaper" },
  { name: "Laporan", path: "/laporan", icon: "description" },
  { name: "Pengaturan", path: "/pengaturan", icon: "settings" },
];

const isActive = (path) => {
  if (path === "/dashboard") {
    return route.path === "/dashboard" || route.path === "/";
  }
  return route.path.startsWith(path);
};

const handleLogout = () => {
  localStorage.removeItem("ejimat_user");
  router.push("/login");
};
</script>

<template>
  <div>
    <!-- Mobile Backdrop -->
    <div
      v-if="mobileOpen"
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-30 md:hidden"
      @click="emit('close')"
    ></div>

    <!-- SideNavBar -->
    <aside
      :class="[
        'w-[280px] h-full fixed left-0 top-0 bg-[#0F172A] text-[#bec6e0] flex flex-col py-6 px-4 z-40 transition-transform duration-300 ease-in-out shadow-xl md:shadow-none md:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <!-- Logo Header -->
      <div class="flex items-center justify-between mb-8 px-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-[#0d9488] flex items-center justify-center shrink-0 shadow-sm shadow-[#0d9488]/40">
            <span class="material-symbols-outlined text-white icon-filled text-[22px]">home</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white tracking-tight leading-none">EJIMAT</h1>
            <p class="text-xs text-[#bec6e0] font-medium mt-1">Desa Cimenyan</p>
          </div>
        </div>
        <!-- Close button for mobile -->
        <button
          class="md:hidden text-[#bec6e0] hover:text-white p-1 rounded-lg"
          @click="emit('close')"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Role Badge -->
      <div class="px-3 mb-5">
        <span class="text-[11px] text-[#8e99b7] uppercase tracking-wider font-semibold">
          Admin Desa
        </span>
      </div>

      <!-- Navigation Links -->
      <ul class="flex flex-col gap-1 flex-1 overflow-y-auto overflow-x-hidden pr-1">
        <li v-for="item in menuItems" :key="item.path">
          <RouterLink
            :to="item.path"
            @click="emit('close')"
            :class="[
              'flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all group',
              isActive(item.path)
                ? 'border-l-4 border-[#0d9488] bg-[#0d9488]/15 text-[#2dd4bf] font-semibold'
                : 'text-[#bec6e0] hover:text-white hover:bg-white/5 border-l-4 border-transparent'
            ]"
          >
            <span
              :class="[
                'material-symbols-outlined text-[20px] transition-colors',
                isActive(item.path) ? 'text-[#2dd4bf] icon-filled' : 'text-[#8e99b7] group-hover:text-white'
              ]"
            >
              {{ item.icon }}
            </span>
            <span class="truncate">{{ item.name }}</span>
          </RouterLink>
        </li>
      </ul>

      <!-- Logout / Footer Area -->
      <div class="mt-auto pt-4 border-t border-white/10">
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#bec6e0] hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer group"
        >
          <span class="material-symbols-outlined text-[20px] text-[#8e99b7] group-hover:text-red-400">
            logout
          </span>
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  </div>
</template>
