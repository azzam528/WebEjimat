<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const menuItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Data Penduduk', path: '/penduduk' },
  { name: 'Kartu Keluarga', path: '/keluarga' },
  { name: 'Wilayah', path: '/wilayah' },
  { name: 'Layanan Desa', path: '/layanan' },
  { name: 'Pengaduan', path: '/pengaduan' },
  { name: 'Pembangunan', path: '/pembangunan' },
  { name: 'Berita', path: '/berita' },
  { name: 'Audit Log', path: '/audit' },
]

const isActive = (path) => {
  return router.currentRoute.value.path.startsWith(path)
}
</script>
<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h1>EJIMAT Core</h1>
    </div>
    <nav class="sidebar-nav">
      <RouterLink 
        v-for="item in menuItems" 
        :key="item.path" 
        :to="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
      >
        {{ item.name }}
      </RouterLink>
    </nav>
  </aside>
</template>
