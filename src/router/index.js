import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/LoginView.vue'),
  },
  {
    path: '/',
    component: AppLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/DashboardView.vue')
      },
      {
        path: 'penduduk',
        name: 'Penduduk',
        component: () => import('../views/penduduk/PendudukView.vue')
      },
      {
        path: 'penduduk/:id',
        name: 'DetailPenduduk',
        component: () => import('../views/penduduk/DetailPendudukView.vue')
      },
      {
        path: 'keluarga',
        name: 'Keluarga',
        component: () => import('../views/keluarga/KeluargaView.vue')
      },
      {
        path: 'wilayah',
        name: 'Wilayah',
        component: () => import('../views/wilayah/WilayahView.vue')
      },
      {
        path: 'layanan',
        name: 'Layanan',
        component: () => import('../views/layanan/LayananView.vue')
      },
      {
        path: 'pengaduan',
        name: 'Pengaduan',
        component: () => import('../views/pengaduan/PengaduanView.vue')
      },
      {
        path: 'pembangunan',
        name: 'Pembangunan',
        component: () => import('../views/pembangunan/PembangunanView.vue')
      },
      {
        path: 'berita',
        name: 'Berita',
        component: () => import('../views/berita/BeritaView.vue')
      },
      {
        path: 'laporan',
        name: 'Laporan',
        component: () => import('../views/laporan/LaporanView.vue')
      },
      {
        path: 'audit',
        name: 'AuditLog',
        component: () => import('../views/audit/AuditLogView.vue')
      },
      {
        path: 'audit/duplikat',
        name: 'DuplicateDetection',
        component: () => import('../views/audit/DuplicateDetectionView.vue')
      },
      {
        path: 'audit/kualitas',
        name: 'DataQuality',
        component: () => import('../views/audit/DataQualityView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
