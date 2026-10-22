<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const identifier = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  if (!identifier.value || !password.value) {
    errorMessage.value = "Silakan isi NIK/Email dan Kata Sandi.";
    return;
  }

  errorMessage.value = "";
  loading.value = true;

  try {
    // Simulasi autentikasi atau integrasi API backend
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Simpan status login sementara
    localStorage.setItem("ejimat_user", JSON.stringify({
      username: identifier.value,
      role: "Admin Desa",
      loginAt: new Date().toISOString()
    }));

    // Redirect ke dashboard utama
    router.push("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);
    errorMessage.value = "Gagal masuk. Periksa kembali kredensial Anda.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main class="w-full min-h-screen flex flex-col lg:flex-row bg-[#f8f9ff] text-[#0b1c30]">
    <!-- Left Side: Branding & Imagery (Desktop) -->
    <div class="hidden lg:flex lg:w-1/2 relative flex-col justify-between overflow-hidden">
      <!-- Background Image -->
      <div
        class="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 hover:scale-105"
        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAb2csFf-tYhpOJWq7GX6wGRBjwdxRwrNP5LeinvElwIYlxe8SiKIndP1dNyiWfUUyVVWBxSwh5lV3HkBff-4xTIZr-5ZzIqVkXgD9VTe-_StAgRDIDpZ-6j-usu_DYE3b3KOI31-qmHMGjZePeAzZUNdlc0CnmZ9blqZL8WHSFOcFL-oYeP3uSLsK4uKOA3luOyx4TR4s0shkhDZB9BIE7Frbmito577uA1_QeZFzeLrwpoF4xFL_LdA')"
      ></div>

      <!-- Teal Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#00685f]/95 via-[#00685f]/70 to-transparent z-10 mix-blend-multiply"></div>

      <!-- Branding Content Container -->
      <div class="relative z-20 p-12 lg:p-16 h-full flex flex-col justify-between text-white">
        <div>
          <!-- Logo & Title -->
          <div class="flex items-center gap-3.5 mb-10">
            <span class="material-symbols-outlined text-[42px] leading-none text-white icon-filled">
              account_balance
            </span>
            <span class="text-4xl font-extrabold tracking-tight">EJIMAT</span>
          </div>

          <!-- Headline & Description -->
          <h1 class="text-3xl lg:text-4xl font-bold tracking-tight leading-snug mb-5">
            Satu Data Desa,<br />
            Banyak Layanan
          </h1>
          <p class="text-base lg:text-lg text-white/90 max-w-md leading-relaxed font-normal">
            Sistem manajemen data terpadu untuk pelayanan publik yang lebih cepat, transparan, dan akurat di Desa Cimenyan.
          </p>
        </div>

        <!-- Footer Copyright -->
        <div class="text-xs text-white/80 font-medium">
          © 2026 Pemerintah Desa Cimenyan, Kabupaten Bandung
        </div>
      </div>
    </div>

    <!-- Right Side: Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
      <div class="w-full max-w-[440px] glass-panel rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.06)] p-8 sm:p-10">
        <!-- Mobile Header (Hidden on Desktop) -->
        <div class="lg:hidden text-center mb-8">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#00685f]/10 text-[#00685f] mb-3">
            <span class="material-symbols-outlined text-[36px] icon-filled">
              account_balance
            </span>
          </div>
          <h2 class="text-2xl font-bold text-[#0b1c30]">EJIMAT</h2>
          <p class="text-sm text-[#3d4947] font-medium mt-0.5">Desa Cimenyan</p>
        </div>

        <!-- Heading -->
        <div class="mb-8 text-center lg:text-left">
          <h2 class="text-2xl sm:text-3xl font-bold text-[#0b1c30] mb-2">
            Selamat Datang
          </h2>
          <p class="text-sm text-[#3d4947] leading-relaxed">
            Silakan masuk menggunakan kredensial Anda untuk mengakses sistem pemerintahan desa.
          </p>
        </div>

        <!-- Error Notification -->
        <div
          v-if="errorMessage"
          class="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-[18px]">error</span>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Form -->
        <form class="space-y-5" @submit.prevent="handleLogin">
          <!-- NIK / Email Field -->
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold uppercase tracking-wider text-[#3d4947]" for="identifier">
              NIK atau Email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6d7a77]">
                <span class="material-symbols-outlined text-[20px]">badge</span>
              </div>
              <input
                id="identifier"
                v-model="identifier"
                type="text"
                name="identifier"
                placeholder="Masukkan NIK atau email"
                required
                autocomplete="username"
                class="block w-full pl-10 pr-3.5 py-3 border border-[#bcc9c6] rounded-xl bg-white text-[#0b1c30] text-sm placeholder:text-[#6d7a77] focus:outline-none focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/20 transition-all"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold uppercase tracking-wider text-[#3d4947]" for="password">
              Kata Sandi
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6d7a77]">
                <span class="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                placeholder="Masukkan kata sandi"
                required
                autocomplete="current-password"
                class="block w-full pl-10 pr-11 py-3 border border-[#bcc9c6] rounded-xl bg-white text-[#0b1c30] text-sm placeholder:text-[#6d7a77] focus:outline-none focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/20 transition-all"
              />
              <!-- Toggle Password Visibility -->
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6d7a77] hover:text-[#00685f] transition-colors cursor-pointer"
                :title="showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
                @click="showPassword = !showPassword"
              >
                <span class="material-symbols-outlined text-[20px]">
                  {{ showPassword ? "visibility_off" : "visibility" }}
                </span>
              </button>
            </div>
            <div class="flex justify-end pt-1">
              <a href="#" class="text-xs font-medium text-[#00685f] hover:text-[#005049] hover:underline transition-colors">
                Lupa kata sandi?
              </a>
            </div>
          </div>

          <!-- Action Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center items-center gap-2 py-3.5 px-5 rounded-xl text-white bg-[#00685f] hover:bg-[#005049] active:scale-[0.99] font-medium text-sm shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </span>
            <template v-else>
              <span>Masuk ke Sistem</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </template>
          </button>
        </form>

        <!-- Help Section -->
        <div class="mt-8 pt-6 border-t border-[#bcc9c6]/40 text-center">
          <p class="text-xs sm:text-sm text-[#3d4947] flex items-center justify-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] text-[#6d7a77]">help</span>
            <span>Butuh bantuan teknis?</span>
            <a href="#" class="font-semibold text-[#00685f] hover:underline">
              Hubungi Admin
            </a>
          </p>
        </div>
      </div>

      <!-- Mobile Footer -->
      <div class="lg:hidden absolute bottom-4 text-center w-full left-0 text-xs text-[#3d4947]">
        © 2026 Pemerintah Desa Cimenyan
      </div>
    </div>
  </main>
</template>
