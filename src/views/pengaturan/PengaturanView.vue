<script setup>
import { ref, computed } from "vue";

// Assets
import adminAvatarImg from "./admin-avatar.png";
import userAvatarImg from "./user-avatar.png";

// ==========================================
// ACTIVE TAB STATE
// ==========================================
const activeTab = ref("profil"); // 'profil' | 'pengguna' | 'roles' | 'umum' | 'notifikasi' | 'audit'

// Toast Notification
const toastMessage = ref("");
const showToast = ref(false);
const toastType = ref("success"); // 'success' | 'info' | 'error'

const triggerToast = (msg, type = "success") => {
  toastMessage.value = msg;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3500);
};

// Global Saving State
const isSaving = ref(false);
const handleSaveAll = () => {
  isSaving.value = true;
  setTimeout(() => {
    isSaving.value = false;
    triggerToast("Perubahan pengaturan berhasil disimpan ke server!");
  }, 600);
};

// ==========================================
// TAB 1: PROFIL ADMINISTRATOR STATE
// ==========================================
const adminProfile = ref({
  fullName: "Ahmad Sudirman, S.Kom",
  email: "admin@cimenyan.desa.id",
  nip: "198507232010011015",
  phone: "0812-3456-7890",
  position: "Kepala Seksi Pelayanan & Administrator Data",
  bio: "Bertanggung jawab atas administrasi sistem Satu Data Desa EJIMAT Desa Cimenyan.",
  avatarUrl: adminAvatarImg,
  twoFactorEnabled: true,
  lastPasswordChange: "3 bulan yang lalu (15 Juli 2024)",
});

// Avatar Change Handler
const fileInputRef = ref(null);
const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    triggerToast("Ukuran foto maksimal 2MB!", "error");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    adminProfile.value.avatarUrl = e.target.result;
    triggerToast("Foto profil berhasil diperbarui!");
  };
  reader.readAsDataURL(file);
};

// Change Password Modal
const showPasswordModal = ref(false);
const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const handlePasswordSubmit = () => {
  if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword) {
    triggerToast("Harap isi semua kolom kata sandi!", "error");
    return;
  }
  if (passwordForm.value.newPassword.length < 8) {
    triggerToast("Kata sandi baru minimal 8 karakter!", "error");
    return;
  }
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    triggerToast("Konfirmasi kata sandi baru tidak cocok!", "error");
    return;
  }
  showPasswordModal.value = false;
  passwordForm.value = { currentPassword: "", newPassword: "", confirmPassword: "" };
  adminProfile.value.lastPasswordChange = "Baru saja";
  triggerToast("Kata sandi akun administrator berhasil diubah!");
};

// ==========================================
// TAB 2: MANAJEMEN PENGGUNA STATE
// ==========================================
const userSearch = ref("");
const userRoleFilter = ref("all");

const usersList = ref([
  {
    id: "USR-001",
    name: "Ahmad Sudirman, S.Kom",
    email: "admin@cimenyan.desa.id",
    nip: "198507232010011015",
    role: "Super Admin",
    roleBadge: "bg-[#dae2fd] text-[#131b2e] border-[#bcc9c6]",
    wilayah: "Seluruh Desa",
    status: "Aktif",
    lastLogin: "Hari ini, 09:15 WIB",
    avatar: adminAvatarImg,
  },
  {
    id: "USR-002",
    name: "Siti Rahmawati, S.AP",
    email: "pelayanan@cimenyan.desa.id",
    nip: "198811122014022003",
    role: "Kasi Pelayanan",
    roleBadge: "bg-[#ccfbf1] text-[#00685f] border-[#0d9488]/30",
    wilayah: "Kantor Desa",
    status: "Aktif",
    lastLogin: "Kemarin, 14:30 WIB",
    avatar: userAvatarImg,
  },
  {
    id: "USR-003",
    name: "Budi Santoso",
    email: "kadus1@cimenyan.desa.id",
    nip: "197904052008011009",
    role: "Kepala Dusun I",
    roleBadge: "bg-[#ffddb8] text-[#825100] border-[#a36700]/30",
    wilayah: "Dusun Sukamaju",
    status: "Aktif",
    lastLogin: "2 hari lalu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "USR-004",
    name: "Hendra Wijaya",
    email: "kadus2@cimenyan.desa.id",
    nip: "198203172011011012",
    role: "Kepala Dusun II",
    roleBadge: "bg-[#ffddb8] text-[#825100] border-[#a36700]/30",
    wilayah: "Dusun Cibodas",
    status: "Aktif",
    lastLogin: "3 hari lalu",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "USR-005",
    name: "Dewi Lestari",
    email: "operator.rt@cimenyan.desa.id",
    nip: "-",
    role: "Operator RT/RW",
    roleBadge: "bg-[#e5eeff] text-[#00685f] border-[#bcc9c6]",
    wilayah: "RW 03 Padasuka",
    status: "Aktif",
    lastLogin: "Hari ini, 08:00 WIB",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "USR-006",
    name: "Rian Pratama",
    email: "rian.magang@cimenyan.desa.id",
    nip: "-",
    role: "Staf Magang",
    roleBadge: "bg-slate-100 text-slate-600 border-slate-300",
    wilayah: "Kantor Desa",
    status: "Non-aktif",
    lastLogin: "2 minggu lalu",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
  },
]);

const filteredUsers = computed(() => {
  return usersList.value.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(userSearch.value.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.value.toLowerCase()) ||
      user.nip.includes(userSearch.value);
    const matchesRole =
      userRoleFilter.value === "all" || user.role.toLowerCase().includes(userRoleFilter.value.toLowerCase());
    return matchesSearch && matchesRole;
  });
});

const toggleUserStatus = (user) => {
  user.status = user.status === "Aktif" ? "Non-aktif" : "Aktif";
  triggerToast(`Status pengguna ${user.name} diubah menjadi ${user.status}`);
};

// Add User Modal
const showAddUserModal = ref(false);
const newUserForm = ref({
  name: "",
  email: "",
  nip: "",
  role: "Operator RT/RW",
  wilayah: "Kantor Desa",
  phone: "",
});

const handleAddUser = () => {
  if (!newUserForm.value.name || !newUserForm.value.email) {
    triggerToast("Harap lengkapi nama dan email pengguna!", "error");
    return;
  }
  usersList.value.unshift({
    id: `USR-00${usersList.value.length + 1}`,
    name: newUserForm.value.name,
    email: newUserForm.value.email,
    nip: newUserForm.value.nip || "-",
    role: newUserForm.value.role,
    roleBadge: "bg-[#e5eeff] text-[#00685f] border-[#bcc9c6]",
    wilayah: newUserForm.value.wilayah,
    status: "Aktif",
    lastLogin: "Belum pernah",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  });
  showAddUserModal.value = false;
  newUserForm.value = { name: "", email: "", nip: "", role: "Operator RT/RW", wilayah: "Kantor Desa", phone: "" };
  triggerToast("Pengguna baru berhasil ditambahkan!");
};

// ==========================================
// TAB 3: ROLES & IZIN AKSES STATE
// ==========================================
const selectedRoleId = ref("admin"); // 'admin' | 'pelayanan' | 'kadus' | 'operator' | 'warga'

const rolesList = [
  { id: "admin", name: "Super Admin Desa", desc: "Akses mutlak ke seluruh modul data, audit, dan konfigurasi sistem." },
  { id: "pelayanan", name: "Kasi Pelayanan", desc: "Verifikasi permohonan surat warga, pengaduan, dan data kependudukan." },
  { id: "kadus", name: "Kepala Dusun", desc: "Akses wilayah dusun masing-masing, pemantauan bansos, dan proyek pembangunan." },
  { id: "operator", name: "Operator RT / RW", desc: "Entri dan pemutakhiran data warga lingkup RT/RW setempat." },
  { id: "warga", name: "Warga Desa (Publik)", desc: "Akses pengaduan mandiri, status surat, dan portal transparansi desa." },
];

const permissionsMatrix = ref({
  admin: [
    { module: "Data Penduduk", read: true, create: true, update: true, delete: true, export: true },
    { module: "Data Keluarga (KK)", read: true, create: true, update: true, delete: true, export: true },
    { module: "Wilayah Desa", read: true, create: true, update: true, delete: true, export: true },
    { module: "Pelayanan Surat", read: true, create: true, update: true, delete: true, export: true },
    { module: "Pengaduan Warga", read: true, create: true, update: true, delete: true, export: true },
    { module: "Data Kualitas (Audit)", read: true, create: true, update: true, delete: true, export: true },
    { module: "Pembangunan Desa", read: true, create: true, update: true, delete: true, export: true },
    { module: "Berita & Pengumuman", read: true, create: true, update: true, delete: true, export: true },
    { module: "Laporan & Statistik", read: true, create: true, update: true, delete: true, export: true },
    { module: "Pengaturan Sistem", read: true, create: true, update: true, delete: true, export: true },
  ],
  pelayanan: [
    { module: "Data Penduduk", read: true, create: false, update: true, delete: false, export: true },
    { module: "Data Keluarga (KK)", read: true, create: false, update: true, delete: false, export: true },
    { module: "Wilayah Desa", read: true, create: false, update: false, delete: false, export: false },
    { module: "Pelayanan Surat", read: true, create: true, update: true, delete: false, export: true },
    { module: "Pengaduan Warga", read: true, create: false, update: true, delete: false, export: true },
    { module: "Data Kualitas (Audit)", read: true, create: false, update: false, delete: false, export: false },
    { module: "Pembangunan Desa", read: true, create: false, update: false, delete: false, export: false },
    { module: "Berita & Pengumuman", read: true, create: true, update: true, delete: false, export: false },
    { module: "Laporan & Statistik", read: true, create: false, update: false, delete: false, export: true },
    { module: "Pengaturan Sistem", read: false, create: false, update: false, delete: false, export: false },
  ],
  kadus: [
    { module: "Data Penduduk", read: true, create: false, update: false, delete: false, export: true },
    { module: "Data Keluarga (KK)", read: true, create: false, update: false, delete: false, export: true },
    { module: "Wilayah Desa", read: true, create: false, update: false, delete: false, export: false },
    { module: "Pelayanan Surat", read: true, create: false, update: false, delete: false, export: false },
    { module: "Pengaduan Warga", read: true, create: true, update: true, delete: false, export: true },
    { module: "Data Kualitas (Audit)", read: false, create: false, update: false, delete: false, export: false },
    { module: "Pembangunan Desa", read: true, create: true, update: true, delete: false, export: true },
    { module: "Berita & Pengumuman", read: true, create: false, update: false, delete: false, export: false },
    { module: "Laporan & Statistik", read: true, create: false, update: false, delete: false, export: true },
    { module: "Pengaturan Sistem", read: false, create: false, update: false, delete: false, export: false },
  ],
  operator: [
    { module: "Data Penduduk", read: true, create: true, update: true, delete: false, export: false },
    { module: "Data Keluarga (KK)", read: true, create: true, update: true, delete: false, export: false },
    { module: "Wilayah Desa", read: true, create: false, update: false, delete: false, export: false },
    { module: "Pelayanan Surat", read: false, create: false, update: false, delete: false, export: false },
    { module: "Pengaduan Warga", read: true, create: true, update: false, delete: false, export: false },
    { module: "Data Kualitas (Audit)", read: false, create: false, update: false, delete: false, export: false },
    { module: "Pembangunan Desa", read: true, create: false, update: false, delete: false, export: false },
    { module: "Berita & Pengumuman", read: true, create: false, update: false, delete: false, export: false },
    { module: "Laporan & Statistik", read: false, create: false, update: false, delete: false, export: false },
    { module: "Pengaturan Sistem", read: false, create: false, update: false, delete: false, export: false },
  ],
  warga: [
    { module: "Data Penduduk", read: false, create: false, update: false, delete: false, export: false },
    { module: "Data Keluarga (KK)", read: false, create: false, update: false, delete: false, export: false },
    { module: "Wilayah Desa", read: true, create: false, update: false, delete: false, export: false },
    { module: "Pelayanan Surat", read: true, create: true, update: false, delete: false, export: false },
    { module: "Pengaduan Warga", read: true, create: true, update: false, delete: false, export: false },
    { module: "Data Kualitas (Audit)", read: false, create: false, update: false, delete: false, export: false },
    { module: "Pembangunan Desa", read: true, create: false, update: false, delete: false, export: false },
    { module: "Berita & Pengumuman", read: true, create: false, update: false, delete: false, export: false },
    { module: "Laporan & Statistik", read: true, create: false, update: false, delete: false, export: false },
    { module: "Pengaturan Sistem", read: false, create: false, update: false, delete: false, export: false },
  ],
});

// ==========================================
// TAB 4: PENGATURAN UMUM DESA
// ==========================================
const generalSettings = ref({
  desaName: "Desa Cimenyan",
  villageCode: "32.04.12.2001",
  district: "Kecamatan Cimenyan",
  regency: "Kabupaten Bandung",
  province: "Jawa Barat",
  postalCode: "40197",
  officeAddress: "Jl. Terusan Padasuka No. 120, Cimenyan",
  officialEmail: "pemdes@cimenyan.desa.id",
  officialPhone: "(022) 8779-1234",
  callCenterWa: "0811-2233-4455",
  websiteUrl: "https://cimenyan.desa.id",
  suratNumberFormat: "{KODE}/{NOMOR}/DS-CMY/{BULAN}/{TAHUN}",
  fiscalYear: "2024",
  workingHours: "Senin - Jumat (08:00 - 15:30 WIB)",
  maintenanceMode: false,
});

// ==========================================
// TAB 5: PREFERENSI NOTIFIKASI
// ==========================================
const notificationSettings = ref({
  channels: {
    email: true,
    whatsapp: true,
    webPush: true,
  },
  events: [
    { id: "pengaduan", label: "Pengaduan Baru dari Warga", email: true, whatsapp: true, push: true },
    { id: "pelayanan", label: "Pengajuan Surat Pelayanan Baru", email: true, whatsapp: true, push: true },
    { id: "kualitas", label: "Peringatan Anomali Data Penduduk (Audit)", email: true, whatsapp: false, push: true },
    { id: "pembangunan", label: "Pembaruan Progres Proyek Pembangunan", email: false, whatsapp: true, push: false },
    { id: "rekap_mingguan", label: "Kirim Ringkasan Mingguan ke WA Kades", email: true, whatsapp: true, push: false },
  ],
});

// ==========================================
// TAB 6: AUDIT LOG PENGATURAN
// ==========================================
const auditLogs = ref([
  {
    id: "LOG-9042",
    timestamp: "28 Okt 2024, 00:35 WIB",
    user: "Ahmad Sudirman (Admin)",
    action: "Perubahan Pengaturan Notifikasi",
    ip: "182.253.112.44",
    status: "Sukses",
  },
  {
    id: "LOG-9041",
    timestamp: "27 Okt 2024, 16:20 WIB",
    user: "Ahmad Sudirman (Admin)",
    action: "Menambah Pengguna Baru: Dewi Lestari",
    ip: "182.253.112.44",
    status: "Sukses",
  },
  {
    id: "LOG-9040",
    timestamp: "27 Okt 2024, 11:15 WIB",
    user: "Siti Rahmawati (Kasi)",
    action: "Login ke Panel Pelayanan",
    ip: "103.144.20.12",
    status: "Sukses",
  },
  {
    id: "LOG-9039",
    timestamp: "26 Okt 2024, 19:42 WIB",
    user: "Sistem Otomatis",
    action: "Backup Database Harian (EJIMAT Cloud)",
    ip: "127.0.0.1",
    status: "Sukses",
  },
  {
    id: "LOG-9038",
    timestamp: "26 Okt 2024, 08:30 WIB",
    user: "Rian Pratama",
    action: "Gagal Login (Sandi Salah 3x)",
    ip: "36.72.102.8",
    status: "Gagal",
  },
]);
</script>

<template>
  <div class="space-y-6">
    <!-- ========================================== -->
    <!-- HEADER BAR: TITLE + SAVE BUTTON -->
    <!-- ========================================== -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#bcc9c6]/30">
      <div>
        <div class="flex items-center gap-2 text-xs font-semibold text-[#0d9488] uppercase tracking-wider mb-1">
          <span class="material-symbols-outlined text-[16px]">settings</span>
          Konfigurasi Platform
        </div>
        <h1 class="text-2xl md:text-3xl font-bold text-[#0b1c30] tracking-tight">
          Pengaturan Sistem
        </h1>
        <p class="text-sm text-[#3d4947] mt-1 max-w-2xl">
          Kelola konfigurasi platform EJIMAT, profil administrator, dan manajemen akses untuk seluruh pengguna di Desa Cimenyan.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="handleSaveAll"
          :disabled="isSaving"
          class="bg-[#0d9488] hover:bg-[#00685f] active:scale-98 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm shadow-[#0d9488]/30 cursor-pointer disabled:opacity-60 whitespace-nowrap"
        >
          <span
            :class="[
              'material-symbols-outlined text-[18px]',
              isSaving ? 'animate-spin' : ''
            ]"
          >
            {{ isSaving ? 'sync' : 'save' }}
          </span>
          {{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}
        </button>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MAIN LAYOUT: SIDEBAR TABS + TAB CONTENT -->
    <!-- ========================================== -->
    <div class="flex flex-col lg:flex-row gap-6 items-start">
      <!-- Inner Settings Navigation Sidebar -->
      <aside class="w-full lg:w-64 shrink-0 bg-white rounded-xl border border-[#bcc9c6]/40 shadow-xs overflow-hidden sticky top-20">
        <nav aria-label="Settings Navigation" class="flex flex-col">
          <!-- Group 1: Akun & Akses -->
          <div class="px-4 py-2.5 bg-[#eff4ff] border-b border-[#bcc9c6]/30">
            <span class="text-[11px] font-bold text-[#3d4947] uppercase tracking-wider">
              Akun &amp; Akses
            </span>
          </div>

          <!-- Tab 1: Profil Admin -->
          <button
            @click="activeTab = 'profil'"
            :class="[
              'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left border-l-4 cursor-pointer',
              activeTab === 'profil'
                ? 'bg-[#ccfbf1]/40 border-[#0d9488] text-[#00685f] font-semibold'
                : 'border-transparent text-[#3d4947] hover:bg-[#f8f9ff] hover:text-[#0b1c30]'
            ]"
          >
            <span :class="['material-symbols-outlined text-[20px]', activeTab === 'profil' ? 'icon-filled text-[#0d9488]' : 'text-[#6d7a77]']">
              person
            </span>
            <span>Profil Admin</span>
          </button>

          <!-- Tab 2: Manajemen Pengguna -->
          <button
            @click="activeTab = 'pengguna'"
            :class="[
              'flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors text-left border-l-4 border-t border-[#bcc9c6]/20 cursor-pointer',
              activeTab === 'pengguna'
                ? 'bg-[#ccfbf1]/40 border-[#0d9488] text-[#00685f] font-semibold'
                : 'border-transparent text-[#3d4947] hover:bg-[#f8f9ff] hover:text-[#0b1c30]'
            ]"
          >
            <div class="flex items-center gap-3">
              <span :class="['material-symbols-outlined text-[20px]', activeTab === 'pengguna' ? 'icon-filled text-[#0d9488]' : 'text-[#6d7a77]']">
                manage_accounts
              </span>
              <span>Pengguna</span>
            </div>
            <span class="text-[11px] px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#00685f] font-bold">
              {{ usersList.length }}
            </span>
          </button>

          <!-- Tab 3: Roles & Izin Akses -->
          <button
            @click="activeTab = 'roles'"
            :class="[
              'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left border-l-4 border-t border-[#bcc9c6]/20 cursor-pointer',
              activeTab === 'roles'
                ? 'bg-[#ccfbf1]/40 border-[#0d9488] text-[#00685f] font-semibold'
                : 'border-transparent text-[#3d4947] hover:bg-[#f8f9ff] hover:text-[#0b1c30]'
            ]"
          >
            <span :class="['material-symbols-outlined text-[20px]', activeTab === 'roles' ? 'icon-filled text-[#0d9488]' : 'text-[#6d7a77]']">
              admin_panel_settings
            </span>
            <span>Roles &amp; Izin Akses</span>
          </button>

          <!-- Group 2: Sistem -->
          <div class="px-4 py-2.5 bg-[#eff4ff] border-y border-[#bcc9c6]/30 mt-1">
            <span class="text-[11px] font-bold text-[#3d4947] uppercase tracking-wider">
              Sistem
            </span>
          </div>

          <!-- Tab 4: Pengaturan Umum -->
          <button
            @click="activeTab = 'umum'"
            :class="[
              'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left border-l-4 cursor-pointer',
              activeTab === 'umum'
                ? 'bg-[#ccfbf1]/40 border-[#0d9488] text-[#00685f] font-semibold'
                : 'border-transparent text-[#3d4947] hover:bg-[#f8f9ff] hover:text-[#0b1c30]'
            ]"
          >
            <span :class="['material-symbols-outlined text-[20px]', activeTab === 'umum' ? 'icon-filled text-[#0d9488]' : 'text-[#6d7a77]']">
              tune
            </span>
            <span>Pengaturan Umum</span>
          </button>

          <!-- Tab 5: Notifikasi -->
          <button
            @click="activeTab = 'notifikasi'"
            :class="[
              'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left border-l-4 border-t border-[#bcc9c6]/20 cursor-pointer',
              activeTab === 'notifikasi'
                ? 'bg-[#ccfbf1]/40 border-[#0d9488] text-[#00685f] font-semibold'
                : 'border-transparent text-[#3d4947] hover:bg-[#f8f9ff] hover:text-[#0b1c30]'
            ]"
          >
            <span :class="['material-symbols-outlined text-[20px]', activeTab === 'notifikasi' ? 'icon-filled text-[#0d9488]' : 'text-[#6d7a77]']">
              notifications_active
            </span>
            <span>Notifikasi</span>
          </button>

          <!-- Tab 6: Audit Log -->
          <button
            @click="activeTab = 'audit'"
            :class="[
              'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left border-l-4 border-t border-[#bcc9c6]/20 cursor-pointer',
              activeTab === 'audit'
                ? 'bg-[#ccfbf1]/40 border-[#0d9488] text-[#00685f] font-semibold'
                : 'border-transparent text-[#3d4947] hover:bg-[#f8f9ff] hover:text-[#0b1c30]'
            ]"
          >
            <span :class="['material-symbols-outlined text-[20px]', activeTab === 'audit' ? 'icon-filled text-[#0d9488]' : 'text-[#6d7a77]']">
              history
            </span>
            <span>Audit Log Sistem</span>
          </button>
        </nav>
      </aside>

      <!-- Content Canvas -->
      <main class="flex-1 w-full min-w-0">
        <!-- ========================================== -->
        <!-- TAB 1: PROFIL ADMINISTRATOR -->
        <!-- ========================================== -->
        <section
          v-if="activeTab === 'profil'"
          class="bg-white rounded-xl border border-[#bcc9c6]/40 shadow-xs overflow-hidden"
        >
          <div class="px-6 py-4 border-b border-[#bcc9c6]/30 bg-[#f8f9ff] flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-[#0b1c30]">Profil Administrator</h2>
              <p class="text-xs text-[#3d4947] mt-0.5">
                Perbarui informasi dasar, foto identitas, dan kredensial akun Anda.
              </p>
            </div>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#ccfbf1] text-[#00685f]">
              <span class="w-2 h-2 rounded-full bg-[#0d9488]"></span>
              Super Admin
            </span>
          </div>

          <div class="p-6 space-y-8">
            <div class="flex flex-col sm:flex-row gap-8 items-start">
              <!-- Avatar Upload with Hidden Input -->
              <div class="flex flex-col items-center gap-3 mx-auto sm:mx-0">
                <input
                  ref="fileInputRef"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  class="hidden"
                  @change="handleAvatarUpload"
                />
                <div class="relative group cursor-pointer" @click="fileInputRef?.click()">
                  <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-[#e5eeff] bg-[#d3e4fe] shadow-sm">
                    <img
                      :src="adminProfile.avatarUrl"
                      alt="Admin Avatar"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <button
                    type="button"
                    class="absolute bottom-1 right-1 w-9 h-9 bg-[#0d9488] hover:bg-[#00685f] text-white rounded-full flex items-center justify-center shadow-md transition-colors border-2 border-white cursor-pointer"
                    title="Ganti Foto"
                  >
                    <span class="material-symbols-outlined text-[18px]">photo_camera</span>
                  </button>
                </div>
                <div class="text-center">
                  <p class="text-xs text-[#6d7a77] max-w-[150px]">
                    Format JPG, PNG max 2MB.
                  </p>
                  <button
                    type="button"
                    @click="fileInputRef?.click()"
                    class="text-xs text-[#0d9488] hover:underline font-semibold mt-1 inline-block"
                  >
                    Unggah Foto Baru
                  </button>
                </div>
              </div>

              <!-- Profile Fields -->
              <div class="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                <div class="col-span-1 md:col-span-2">
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1.5">
                    Nama Lengkap beserta Gelar
                  </label>
                  <input
                    v-model="adminProfile.fullName"
                    type="text"
                    class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2 text-sm text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-[#0d9488] transition-all"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1.5">
                    Email Penugasan Desa
                  </label>
                  <input
                    v-model="adminProfile.email"
                    type="email"
                    class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2 text-sm text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-[#0d9488] transition-all"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1.5">
                    Nomor Induk Pegawai (NIP)
                  </label>
                  <input
                    :value="adminProfile.nip"
                    disabled
                    type="text"
                    title="NIP resmi terdaftar dan dikunci oleh BKPSDM"
                    class="w-full bg-[#eff4ff] border border-[#bcc9c6]/60 rounded-lg px-3.5 py-2 text-sm text-[#6d7a77] cursor-not-allowed font-mono"
                  />
                  <span class="text-[10px] text-[#6d7a77] mt-1 block">Terkunci &amp; terverifikasi SIASN</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1.5">
                    Nomor WhatsApp / Kontak
                  </label>
                  <input
                    v-model="adminProfile.phone"
                    type="text"
                    class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2 text-sm text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-[#0d9488] transition-all"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1.5">
                    Jabatan Struktural
                  </label>
                  <input
                    v-model="adminProfile.position"
                    type="text"
                    class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2 text-sm text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-[#0d9488] transition-all"
                  />
                </div>

                <div class="col-span-1 md:col-span-2">
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1.5">
                    Deskripsi Peran &amp; Tanggung Jawab
                  </label>
                  <textarea
                    v-model="adminProfile.bio"
                    rows="2"
                    class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3.5 py-2 text-sm text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-[#0d9488] transition-all"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Keamanan Akun Sub-section -->
            <div class="pt-6 border-t border-[#bcc9c6]/40">
              <h3 class="text-sm font-bold text-[#0b1c30] mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-[20px] text-[#565e74]">lock</span>
                Keamanan &amp; Autentikasi Akun
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Password Card -->
                <div class="p-4 rounded-xl border border-[#bcc9c6]/50 bg-[#f8f9ff] flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-[16px] text-[#0d9488]">password</span>
                        Kata Sandi
                      </span>
                      <span class="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                        Kuat
                      </span>
                    </div>
                    <p class="text-xs text-[#6d7a77] mt-1.5">
                      Terakhir diubah: {{ adminProfile.lastPasswordChange }}
                    </p>
                  </div>
                  <div class="mt-4 pt-3 border-t border-[#bcc9c6]/30 flex justify-end">
                    <button
                      type="button"
                      @click="showPasswordModal = true"
                      class="px-3.5 py-1.5 border border-[#bcc9c6] hover:bg-white text-xs font-semibold text-[#0b1c30] rounded-lg transition-colors cursor-pointer shadow-2xs"
                    >
                      Ubah Kata Sandi
                    </button>
                  </div>
                </div>

                <!-- 2FA Card -->
                <div class="p-4 rounded-xl border border-[#bcc9c6]/50 bg-[#f8f9ff] flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-[16px] text-[#0d9488]">security</span>
                        Autentikasi Dua Faktor (2FA)
                      </span>
                      <span
                        :class="[
                          'text-[10px] px-2 py-0.5 rounded font-semibold border',
                          adminProfile.twoFactorEnabled
                            ? 'bg-[#ccfbf1] text-[#00685f] border-[#0d9488]/30'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        ]"
                      >
                        {{ adminProfile.twoFactorEnabled ? 'Aktif' : 'Non-aktif' }}
                      </span>
                    </div>
                    <p class="text-xs text-[#6d7a77] mt-1.5">
                      Amankan login dengan verifikasi kode OTP Google Authenticator saat masuk.
                    </p>
                  </div>
                  <div class="mt-4 pt-3 border-t border-[#bcc9c6]/30 flex items-center justify-between">
                    <span class="text-xs text-[#3d4947]">Status Verifikasi</span>
                    <button
                      type="button"
                      @click="adminProfile.twoFactorEnabled = !adminProfile.twoFactorEnabled; triggerToast(adminProfile.twoFactorEnabled ? '2FA telah diaktifkan' : '2FA telah dinonaktifkan')"
                      :class="[
                        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                        adminProfile.twoFactorEnabled ? 'bg-[#0d9488]' : 'bg-slate-300'
                      ]"
                    >
                      <span
                        :class="[
                          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                          adminProfile.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                        ]"
                      ></span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Sesi Login Card -->
              <div class="mt-4 p-4 rounded-xl border border-[#bcc9c6]/40 bg-[#f8f9ff]">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-[#dae2fd] text-[#131b2e] flex items-center justify-center shrink-0">
                      <span class="material-symbols-outlined text-[20px]">devices</span>
                    </div>
                    <div>
                      <p class="text-xs font-bold text-[#0b1c30]">
                        Windows 11 PC - Google Chrome
                        <span class="ml-2 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                          Sesi Ini
                        </span>
                      </p>
                      <p class="text-[11px] text-[#6d7a77]">
                        IP: 182.253.112.44 • Bandung, Jawa Barat • Aktif sejak 08:30 WIB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    @click="triggerToast('Semua sesi di perangkat lain telah ditutup.')"
                    class="text-xs text-[#ba1a1a] hover:underline font-semibold cursor-pointer whitespace-nowrap"
                  >
                    Keluar dari Sesi Lain
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ========================================== -->
        <!-- TAB 2: MANAJEMEN PENGGUNA -->
        <!-- ========================================== -->
        <section
          v-if="activeTab === 'pengguna'"
          class="bg-white rounded-xl border border-[#bcc9c6]/40 shadow-xs overflow-hidden"
        >
          <div class="p-5 border-b border-[#bcc9c6]/30 bg-[#f8f9ff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-bold text-[#0b1c30]">Manajemen Pengguna Sistem</h2>
              <p class="text-xs text-[#3d4947] mt-0.5">
                Kelola hak akses akun staf perangkat desa, operator RT/RW, dan kepala dusun.
              </p>
            </div>
            <button
              @click="showAddUserModal = true"
              class="bg-[#0d9488] hover:bg-[#00685f] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
            >
              <span class="material-symbols-outlined text-[18px]">person_add</span>
              Tambah Pengguna
            </button>
          </div>

          <!-- Filter & Search Bar -->
          <div class="p-4 border-b border-[#bcc9c6]/30 bg-white flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
              <span class="material-symbols-outlined absolute left-3 top-2.5 text-[#6d7a77] text-[18px]">
                search
              </span>
              <input
                v-model="userSearch"
                type="text"
                placeholder="Cari nama, email, atau NIP..."
                class="w-full pl-9 pr-3 py-2 text-xs bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
              />
            </div>
            <select
              v-model="userRoleFilter"
              class="px-3 py-2 text-xs bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
            >
              <option value="all">Semua Peran (Role)</option>
              <option value="Admin">Super Admin</option>
              <option value="Pelayanan">Kasi Pelayanan</option>
              <option value="Dusun">Kepala Dusun</option>
              <option value="Operator">Operator RT/RW</option>
            </select>
          </div>

          <!-- Users Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0b1c30]">
              <thead class="bg-[#eff4ff] text-[#3d4947] font-semibold border-b border-[#bcc9c6]/40 uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="py-3 px-4">Pengguna</th>
                  <th class="py-3 px-4">Role / Jabatan</th>
                  <th class="py-3 px-4">Wilayah Tugas</th>
                  <th class="py-3 px-4">Login Terakhir</th>
                  <th class="py-3 px-4 text-center">Status</th>
                  <th class="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#bcc9c6]/30">
                <tr
                  v-for="user in filteredUsers"
                  :key="user.id"
                  class="hover:bg-[#f8f9ff] transition-colors"
                >
                  <td class="py-3 px-4">
                    <div class="flex items-center gap-3">
                      <img
                        :src="user.avatar"
                        :alt="user.name"
                        class="w-9 h-9 rounded-full object-cover border border-[#bcc9c6]/50 bg-slate-100 shrink-0"
                      />
                      <div>
                        <p class="font-bold text-[#0b1c30]">{{ user.name }}</p>
                        <p class="text-[11px] text-[#6d7a77]">{{ user.email }} • NIP: {{ user.nip }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="py-3 px-4">
                    <span
                      :class="[
                        'inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border',
                        user.roleBadge
                      ]"
                    >
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="py-3 px-4 font-medium text-[#3d4947]">
                    {{ user.wilayah }}
                  </td>
                  <td class="py-3 px-4 text-[#6d7a77]">
                    {{ user.lastLogin }}
                  </td>
                  <td class="py-3 px-4 text-center">
                    <button
                      @click="toggleUserStatus(user)"
                      :class="[
                        'px-2.5 py-0.5 rounded-full text-[11px] font-semibold cursor-pointer border transition-colors',
                        user.status === 'Aktif'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-slate-100 text-slate-600 border-slate-300'
                      ]"
                    >
                      {{ user.status }}
                    </button>
                  </td>
                  <td class="py-3 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button
                        @click="triggerToast(`Reset link dikirim ke ${user.email}`)"
                        class="p-1.5 text-[#6d7a77] hover:text-[#0d9488] hover:bg-[#e5eeff] rounded cursor-pointer"
                        title="Reset Sandi"
                      >
                        <span class="material-symbols-outlined text-[18px]">lock_reset</span>
                      </button>
                      <button
                        @click="triggerToast(`Edit ${user.name}`)"
                        class="p-1.5 text-[#6d7a77] hover:text-[#0d9488] hover:bg-[#e5eeff] rounded cursor-pointer"
                        title="Edit Profil"
                      >
                        <span class="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredUsers.length === 0">
                  <td colspan="6" class="py-8 text-center text-[#6d7a77]">
                    Tidak ada pengguna yang cocok dengan pencarian.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ========================================== -->
        <!-- TAB 3: ROLES & IZIN AKSES -->
        <!-- ========================================== -->
        <section
          v-if="activeTab === 'roles'"
          class="bg-white rounded-xl border border-[#bcc9c6]/40 shadow-xs overflow-hidden"
        >
          <div class="p-5 border-b border-[#bcc9c6]/30 bg-[#f8f9ff]">
            <h2 class="text-lg font-bold text-[#0b1c30]">Roles &amp; Matriks Izin Akses</h2>
            <p class="text-xs text-[#3d4947] mt-0.5">
              Atur hak kontrol granular untuk masing-masing peran pengguna di seluruh modul sistem.
            </p>
          </div>

          <!-- Role Selector Pills -->
          <div class="p-4 border-b border-[#bcc9c6]/30 bg-white flex flex-wrap gap-2">
            <button
              v-for="role in rolesList"
              :key="role.id"
              @click="selectedRoleId = role.id"
              :class="[
                'px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border',
                selectedRoleId === role.id
                  ? 'bg-[#0d9488] text-white border-[#0d9488] shadow-xs'
                  : 'bg-[#f8f9ff] text-[#3d4947] border-[#bcc9c6]/50 hover:bg-[#e5eeff]'
              ]"
            >
              {{ role.name }}
            </button>
          </div>

          <!-- Role Description Banner -->
          <div class="px-5 py-3 bg-[#e5eeff] border-b border-[#bcc9c6]/30 flex items-center justify-between text-xs text-[#00685f]">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]">info</span>
              <span>
                {{ rolesList.find(r => r.id === selectedRoleId)?.desc }}
              </span>
            </div>
            <span class="font-bold uppercase tracking-wider text-[10px]">
              {{ selectedRoleId === 'admin' ? 'Akses Penuh' : 'Akses Terbatas' }}
            </span>
          </div>

          <!-- Permissions Matrix Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0b1c30]">
              <thead class="bg-[#eff4ff] text-[#3d4947] font-semibold border-b border-[#bcc9c6]/40 uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="py-3 px-5">Modul Sistem</th>
                  <th class="py-3 px-4 text-center">Lihat (Read)</th>
                  <th class="py-3 px-4 text-center">Tambah (Create)</th>
                  <th class="py-3 px-4 text-center">Ubah (Update)</th>
                  <th class="py-3 px-4 text-center">Hapus (Delete)</th>
                  <th class="py-3 px-4 text-center">Ekspor Data</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#bcc9c6]/30">
                <tr
                  v-for="(perm, idx) in permissionsMatrix[selectedRoleId]"
                  :key="idx"
                  class="hover:bg-[#f8f9ff] transition-colors"
                >
                  <td class="py-3 px-5 font-semibold text-[#0b1c30] flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-[#0d9488]"></span>
                    {{ perm.module }}
                  </td>
                  <td class="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      v-model="perm.read"
                      :disabled="selectedRoleId === 'admin'"
                      class="w-4 h-4 text-[#0d9488] rounded border-gray-300 focus:ring-[#0d9488]"
                    />
                  </td>
                  <td class="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      v-model="perm.create"
                      :disabled="selectedRoleId === 'admin'"
                      class="w-4 h-4 text-[#0d9488] rounded border-gray-300 focus:ring-[#0d9488]"
                    />
                  </td>
                  <td class="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      v-model="perm.update"
                      :disabled="selectedRoleId === 'admin'"
                      class="w-4 h-4 text-[#0d9488] rounded border-gray-300 focus:ring-[#0d9488]"
                    />
                  </td>
                  <td class="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      v-model="perm.delete"
                      :disabled="selectedRoleId === 'admin'"
                      class="w-4 h-4 text-[#0d9488] rounded border-gray-300 focus:ring-[#0d9488]"
                    />
                  </td>
                  <td class="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      v-model="perm.export"
                      :disabled="selectedRoleId === 'admin'"
                      class="w-4 h-4 text-[#0d9488] rounded border-gray-300 focus:ring-[#0d9488]"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ========================================== -->
        <!-- TAB 4: PENGATURAN UMUM -->
        <!-- ========================================== -->
        <section
          v-if="activeTab === 'umum'"
          class="bg-white rounded-xl border border-[#bcc9c6]/40 shadow-xs overflow-hidden"
        >
          <div class="p-5 border-b border-[#bcc9c6]/30 bg-[#f8f9ff]">
            <h2 class="text-lg font-bold text-[#0b1c30]">Pengaturan Umum &amp; Identitas Desa</h2>
            <p class="text-xs text-[#3d4947] mt-0.5">
              Konfigurasi data resmi instansi Pemerintah Desa Cimenyan dan parameter operasional sistem.
            </p>
          </div>

          <div class="p-6 space-y-6">
            <!-- Grid Identitas Desa -->
            <div>
              <h3 class="text-xs font-bold text-[#3d4947] uppercase tracking-wider mb-4 pb-1 border-b border-[#bcc9c6]/30 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[16px] text-[#0d9488]">apartment</span>
                Profil Pemerintahan Desa
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Nama Desa</label>
                  <input
                    v-model="generalSettings.desaName"
                    type="text"
                    class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Kode Desa (Kemendagri)</label>
                  <input
                    v-model="generalSettings.villageCode"
                    type="text"
                    class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none font-mono"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Kecamatan</label>
                  <input
                    v-model="generalSettings.district"
                    type="text"
                    class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Kabupaten / Kota</label>
                  <input
                    v-model="generalSettings.regency"
                    type="text"
                    class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Provinsi</label>
                  <input
                    v-model="generalSettings.province"
                    type="text"
                    class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Kode Pos</label>
                  <input
                    v-model="generalSettings.postalCode"
                    type="text"
                    class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none font-mono"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Alamat Kantor Desa</label>
                  <input
                    v-model="generalSettings.officeAddress"
                    type="text"
                    class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Website Resmi Desa</label>
                  <input
                    v-model="generalSettings.websiteUrl"
                    type="text"
                    class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- Konfigurasi Penomoran & Operasional -->
            <div class="pt-4 border-t border-[#bcc9c6]/40">
              <h3 class="text-xs font-bold text-[#3d4947] uppercase tracking-wider mb-4 pb-1 border-b border-[#bcc9c6]/30 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[16px] text-[#0d9488]">receipt_long</span>
                Format Surat &amp; Operasional
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Format Penomoran Surat Otomatis</label>
                  <input
                    v-model="generalSettings.suratNumberFormat"
                    type="text"
                    class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none font-mono"
                  />
                  <span class="text-[10px] text-[#6d7a77] mt-1 block">Variabel yang didukung: {KODE}, {NOMOR}, {BULAN}, {TAHUN}</span>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Tahun Anggaran Aktif</label>
                  <select
                    v-model="generalSettings.fiscalYear"
                    class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none"
                  >
                    <option value="2024">Tahun Anggaran 2024</option>
                    <option value="2025">Tahun Anggaran 2025</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Mode Pemeliharaan (Maintenance Mode) -->
            <div class="pt-4 border-t border-[#bcc9c6]/40">
              <div class="p-4 rounded-xl border border-amber-200 bg-amber-50/60 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-amber-600 text-[24px]">build</span>
                  <div>
                    <h4 class="text-xs font-bold text-[#0b1c30]">Mode Pemeliharaan (Maintenance Mode)</h4>
                    <p class="text-[11px] text-[#565e74]">
                      Jika diaktifkan, portal publik desa akan menampilkan pesan perbaikan sementara. Administrator tetap dapat login.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  @click="generalSettings.maintenanceMode = !generalSettings.maintenanceMode; triggerToast(generalSettings.maintenanceMode ? 'Mode pemeliharaan diaktifkan!' : 'Mode pemeliharaan dimatikan.')"
                  :class="[
                    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                    generalSettings.maintenanceMode ? 'bg-amber-500' : 'bg-slate-300'
                  ]"
                >
                  <span
                    :class="[
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      generalSettings.maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- ========================================== -->
        <!-- TAB 5: NOTIFIKASI -->
        <!-- ========================================== -->
        <section
          v-if="activeTab === 'notifikasi'"
          class="bg-white rounded-xl border border-[#bcc9c6]/40 shadow-xs overflow-hidden"
        >
          <div class="p-5 border-b border-[#bcc9c6]/30 bg-[#f8f9ff]">
            <h2 class="text-lg font-bold text-[#0b1c30]">Konfigurasi Notifikasi &amp; Alert</h2>
            <p class="text-xs text-[#3d4947] mt-0.5">
              Pilih kanal komunikasi dan peristiwa penting yang memicu pemberitahuan instan.
            </p>
          </div>

          <div class="p-6 space-y-6">
            <!-- Saluran Utama Notifikasi -->
            <div>
              <h3 class="text-xs font-bold text-[#3d4947] uppercase tracking-wider mb-4 pb-1 border-b border-[#bcc9c6]/30">
                Kanal Pemberitahuan Aktif
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- WhatsApp Gateway -->
                <div class="p-4 rounded-xl border border-[#bcc9c6]/40 bg-[#f8f9ff] flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-emerald-600 text-[24px]">chat</span>
                    <div>
                      <p class="text-xs font-bold text-[#0b1c30]">WhatsApp Gateway</p>
                      <p class="text-[10px] text-emerald-600 font-semibold">Terhubung (Fonnte API)</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    v-model="notificationSettings.channels.whatsapp"
                    class="w-4 h-4 text-[#0d9488] rounded"
                  />
                </div>

                <!-- Email Server -->
                <div class="p-4 rounded-xl border border-[#bcc9c6]/40 bg-[#f8f9ff] flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-blue-600 text-[24px]">mail</span>
                    <div>
                      <p class="text-xs font-bold text-[#0b1c30]">Email SMTP</p>
                      <p class="text-[10px] text-blue-600 font-semibold">smtp.cimenyan.desa.id</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    v-model="notificationSettings.channels.email"
                    class="w-4 h-4 text-[#0d9488] rounded"
                  />
                </div>

                <!-- Web Push -->
                <div class="p-4 rounded-xl border border-[#bcc9c6]/40 bg-[#f8f9ff] flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-[#0d9488] text-[24px]">notifications_active</span>
                    <div>
                      <p class="text-xs font-bold text-[#0b1c30]">Web Push Browser</p>
                      <p class="text-[10px] text-[#0d9488] font-semibold">Aktif di peramban</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    v-model="notificationSettings.channels.webPush"
                    class="w-4 h-4 text-[#0d9488] rounded"
                  />
                </div>
              </div>
            </div>

            <!-- Matriks Event Notifikasi -->
            <div class="pt-2">
              <h3 class="text-xs font-bold text-[#3d4947] uppercase tracking-wider mb-4 pb-1 border-b border-[#bcc9c6]/30">
                Pemicu Notifikasi (Trigger Events)
              </h3>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-[#0b1c30]">
                  <thead class="bg-[#eff4ff] text-[#3d4947] font-semibold border-b border-[#bcc9c6]/40 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th class="py-3 px-4">Jenis Peristiwa</th>
                      <th class="py-3 px-4 text-center">Email</th>
                      <th class="py-3 px-4 text-center">WhatsApp</th>
                      <th class="py-3 px-4 text-center">Web Push</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#bcc9c6]/30">
                    <tr
                      v-for="event in notificationSettings.events"
                      :key="event.id"
                      class="hover:bg-[#f8f9ff]"
                    >
                      <td class="py-3 px-4 font-medium text-[#0b1c30]">
                        {{ event.label }}
                      </td>
                      <td class="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          v-model="event.email"
                          class="w-4 h-4 text-[#0d9488] rounded"
                        />
                      </td>
                      <td class="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          v-model="event.whatsapp"
                          class="w-4 h-4 text-[#0d9488] rounded"
                        />
                      </td>
                      <td class="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          v-model="event.push"
                          class="w-4 h-4 text-[#0d9488] rounded"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <!-- ========================================== -->
        <!-- TAB 6: AUDIT LOG PENGATURAN -->
        <!-- ========================================== -->
        <section
          v-if="activeTab === 'audit'"
          class="bg-white rounded-xl border border-[#bcc9c6]/40 shadow-xs overflow-hidden"
        >
          <div class="p-5 border-b border-[#bcc9c6]/30 bg-[#f8f9ff] flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-[#0b1c30]">Audit Log Sistem &amp; Keamanan</h2>
              <p class="text-xs text-[#3d4947] mt-0.5">
                Riwayat rekam jejak aktivitas sensitif, perubahan konfigurasi, dan percobaan akses login.
              </p>
            </div>
            <button
              @click="triggerToast('Log sistem berhasil diekspor ke format CSV')"
              class="px-3.5 py-1.5 border border-[#bcc9c6] hover:bg-white text-xs font-semibold text-[#0b1c30] rounded-lg transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
            >
              <span class="material-symbols-outlined text-[16px]">download</span>
              Ekspor Log
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-[#0b1c30]">
              <thead class="bg-[#eff4ff] text-[#3d4947] font-semibold border-b border-[#bcc9c6]/40 uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="py-3 px-4">Waktu (WIB)</th>
                  <th class="py-3 px-4">Pengguna / Aktor</th>
                  <th class="py-3 px-4">Aktivitas</th>
                  <th class="py-3 px-4">IP Address</th>
                  <th class="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#bcc9c6]/30">
                <tr
                  v-for="log in auditLogs"
                  :key="log.id"
                  class="hover:bg-[#f8f9ff] transition-colors"
                >
                  <td class="py-3 px-4 text-[#6d7a77] font-mono text-[11px]">
                    {{ log.timestamp }}
                  </td>
                  <td class="py-3 px-4 font-bold text-[#0b1c30]">
                    {{ log.user }}
                  </td>
                  <td class="py-3 px-4 text-[#3d4947]">
                    {{ log.action }}
                  </td>
                  <td class="py-3 px-4 text-[#6d7a77] font-mono text-[11px]">
                    {{ log.ip }}
                  </td>
                  <td class="py-3 px-4 text-center">
                    <span
                      :class="[
                        'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                        log.status === 'Sukses'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      ]"
                    >
                      {{ log.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>

    <!-- ========================================== -->
    <!-- MODAL: UBAH KATA SANDI -->
    <!-- ========================================== -->
    <div
      v-if="showPasswordModal"
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-xl border border-[#bcc9c6]/40 shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div class="px-6 py-4 bg-[#f8f9ff] border-b border-[#bcc9c6]/30 flex items-center justify-between">
          <h3 class="text-sm font-bold text-[#0b1c30] flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px] text-[#0d9488]">lock</span>
            Ubah Kata Sandi Akun
          </h3>
          <button
            @click="showPasswordModal = false"
            class="text-[#6d7a77] hover:text-[#0b1c30] p-1 rounded-lg"
          >
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form @submit.prevent="handlePasswordSubmit" class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Kata Sandi Saat Ini</label>
            <input
              v-model="passwordForm.currentPassword"
              type="password"
              placeholder="Masukkan kata sandi lama"
              class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Kata Sandi Baru</label>
            <input
              v-model="passwordForm.newPassword"
              type="password"
              placeholder="Minimal 8 karakter kombinasi huruf & angka"
              class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Konfirmasi Kata Sandi Baru</label>
            <input
              v-model="passwordForm.confirmPassword"
              type="password"
              placeholder="Ulangi kata sandi baru"
              class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none"
            />
          </div>

          <div class="pt-3 flex items-center justify-end gap-2 border-t border-[#bcc9c6]/30">
            <button
              type="button"
              @click="showPasswordModal = false"
              class="px-4 py-2 border border-[#bcc9c6] text-xs font-semibold text-[#3d4947] rounded-lg hover:bg-[#f8f9ff] cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-[#0d9488] hover:bg-[#00685f] text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
            >
              Simpan Kata Sandi
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL: TAMBAH PENGGUNA BARU -->
    <!-- ========================================== -->
    <div
      v-if="showAddUserModal"
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-xl border border-[#bcc9c6]/40 shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div class="px-6 py-4 bg-[#f8f9ff] border-b border-[#bcc9c6]/30 flex items-center justify-between">
          <h3 class="text-sm font-bold text-[#0b1c30] flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px] text-[#0d9488]">person_add</span>
            Tambah Pengguna Baru
          </h3>
          <button
            @click="showAddUserModal = false"
            class="text-[#6d7a77] hover:text-[#0b1c30] p-1 rounded-lg"
          >
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form @submit.prevent="handleAddUser" class="p-6 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="sm:col-span-2">
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Nama Lengkap &amp; Gelar</label>
              <input
                v-model="newUserForm.name"
                type="text"
                required
                placeholder="Contoh: Asep Saepuloh, S.T."
                class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Email</label>
              <input
                v-model="newUserForm.email"
                type="email"
                required
                placeholder="nama@cimenyan.desa.id"
                class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">NIP (Opsional)</label>
              <input
                v-model="newUserForm.nip"
                type="text"
                placeholder="198xxxx..."
                class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none font-mono"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Peran (Role)</label>
              <select
                v-model="newUserForm.role"
                class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none"
              >
                <option value="Operator RT/RW">Operator RT/RW</option>
                <option value="Kepala Dusun">Kepala Dusun</option>
                <option value="Kasi Pelayanan">Kasi Pelayanan</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#0b1c30] mb-1">Wilayah Penugasan</label>
              <input
                v-model="newUserForm.wilayah"
                type="text"
                placeholder="Contoh: Dusun I / RW 05"
                class="w-full bg-[#f8f9ff] border border-[#bcc9c6] rounded-lg px-3 py-2 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0d9488] outline-none"
              />
            </div>
          </div>

          <div class="pt-4 flex items-center justify-end gap-2 border-t border-[#bcc9c6]/30">
            <button
              type="button"
              @click="showAddUserModal = false"
              class="px-4 py-2 border border-[#bcc9c6] text-xs font-semibold text-[#3d4947] rounded-lg hover:bg-[#f8f9ff] cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-[#0d9488] hover:bg-[#00685f] text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
            >
              Simpan Pengguna
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- FLOATING TOAST NOTIFICATION -->
    <!-- ========================================== -->
    <transition
      enter-active-class="transform transition ease-out duration-300"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#0b1c30] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/10"
      >
        <span
          :class="[
            'material-symbols-outlined text-[20px]',
            toastType === 'error' ? 'text-red-400' : 'text-[#2dd4bf]'
          ]"
        >
          {{ toastType === 'error' ? 'error' : 'check_circle' }}
        </span>
        <p class="text-xs font-medium flex-1">{{ toastMessage }}</p>
        <button
          @click="showToast = false"
          class="text-white/60 hover:text-white"
        >
          <span class="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.icon-filled {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24;
}
</style>
