<script setup>
import { ref } from "vue";

const identifier = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true;

    console.log("Login:", {
      identifier: identifier.value,
      password: password.value,
    });

    // TODO:
    // Hubungkan ke API FastAPI EJIMAT
    //
    // Contoh:
    //
    // const response = await fetch('http://localhost:8000/auth/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     identifier: identifier.value,
    //     password: password.value
    //   })
    // })
    //
    // const data = await response.json()
    //
    // localStorage.setItem('token', data.access_token)
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main class="w-full min-h-screen flex flex-col lg:flex-row">
    <!-- LEFT SIDE -->
    <div
      class="hidden lg:flex lg:w-1/2 relative flex-col justify-between overflow-hidden"
    >
      <!-- Background -->
      <div
        class="absolute inset-0 bg-cover bg-center z-0"
        style="
          background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuAb2csFf-tYhpOJWq7GX6wGRBjwdxRwrNP5LeinvElwIYlxe8SiKIndP1dNyiWfUUyVVWBxSwh5lV3HkBff-4xTIZr-5ZzIqVkXgD9VTe-_StAgRDIDpZ-6j-usu_DYE3b3KOI31-qmHMGjZePeAzZUNdlc0CnmZ9blqZL8WHSFOcFL-oYeP3uSLsK4uKOA3luOyx4TR4s0shkhDZB9BIE7Frbmito577uA1_QeZFzeLrwpoF4xFL_LdA&quot;);
        "
      ></div>

      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#00685f]/90 via-[#00685f]/60 to-transparent z-10 mix-blend-multiply"
      ></div>

      <!-- Content -->
      <div class="relative z-20 p-12 h-full flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-3 mb-8">
            <span class="material-symbols-outlined text-white text-[40px]">
              account_balance
            </span>

            <h1 class="text-5xl font-bold text-white">EJIMAT</h1>
          </div>

          <h2 class="text-3xl font-semibold text-white mb-4">
            Satu Data Desa,
            <br />
            Banyak Layanan
          </h2>

          <p class="text-lg text-white/90 max-w-md">
            Sistem manajemen data terpadu untuk pelayanan publik yang lebih
            cepat, transparan, dan akurat di Desa Cimenyan.
          </p>
        </div>

        <div class="text-sm text-white/80">
          © 2026 Pemerintah Desa Cimenyan, Kabupaten Bandung
        </div>
      </div>
    </div>

    <!-- RIGHT SIDE -->
    <div
      class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-[#f8f9ff]"
    >
      <div
        class="w-full max-w-[440px] bg-white/90 backdrop-blur-md border border-white/20 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-8 sm:p-10"
      >
        <!-- MOBILE HEADER -->
        <div class="lg:hidden text-center mb-8">
          <span
            class="material-symbols-outlined text-[#00685f] text-[48px] mb-2"
          >
            account_balance
          </span>

          <h1 class="text-3xl font-semibold text-[#0b1c30]">EJIMAT</h1>

          <p class="text-[#3d4947] mt-1">Desa Cimenyan</p>
        </div>

        <!-- HEADER -->
        <div class="mb-10 text-center lg:text-left">
          <h2 class="text-2xl font-semibold text-[#0b1c30] mb-2">
            Selamat Datang
          </h2>

          <p class="text-sm text-[#3d4947]">
            Silakan masuk menggunakan kredensial Anda untuk mengakses sistem
            pemerintahan desa.
          </p>
        </div>

        <!-- FORM -->
        <form class="space-y-6" @submit.prevent="handleLogin">
          <!-- IDENTIFIER -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-[#0b1c30]">
              NIK atau Email
            </label>

            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <span class="material-symbols-outlined text-[#6d7a77]">
                  badge
                </span>
              </div>

              <input
                v-model="identifier"
                type="text"
                placeholder="Masukkan NIK atau email"
                required
                class="block w-full pl-10 pr-3 py-3 border border-[#bcc9c6] rounded-lg bg-white text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] transition"
              />
            </div>
          </div>

          <!-- PASSWORD -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-[#0b1c30]">
              Kata Sandi
            </label>

            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <span class="material-symbols-outlined text-[#6d7a77]">
                  lock
                </span>
              </div>

              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Masukkan kata sandi"
                required
                class="block w-full pl-10 pr-12 py-3 border border-[#bcc9c6] rounded-lg bg-white text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] transition"
              />

              <!-- TOGGLE PASSWORD -->
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6d7a77] hover:text-[#00685f] transition"
                @click="showPassword = !showPassword"
              >
                <span class="material-symbols-outlined">
                  {{ showPassword ? "visibility_off" : "visibility" }}
                </span>
              </button>
            </div>

            <!-- FORGOT PASSWORD -->
            <div class="flex justify-end mt-1">
              <a
                href="#"
                class="text-xs font-semibold text-[#00685f] hover:underline"
              >
                Lupa kata sandi?
              </a>
            </div>
          </div>

          <!-- LOGIN BUTTON -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg shadow-sm text-white bg-[#00685f] hover:bg-[#008378] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00685f] transition active:scale-[0.98] disabled:opacity-70"
          >
            <span v-if="loading"> Memproses... </span>

            <span v-else> Masuk ke Sistem </span>

            <span v-if="!loading" class="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </button>
        </form>

        <!-- HELP -->
        <div class="mt-8 pt-6 border-t border-[#bcc9c6] text-center">
          <p
            class="text-sm text-[#3d4947] flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-[16px]"> help </span>

            Butuh bantuan teknis?

            <a href="#" class="font-semibold text-[#00685f] hover:underline">
              Hubungi Admin
            </a>
          </p>
        </div>
      </div>

      <!-- MOBILE FOOTER -->
      <div
        class="lg:hidden absolute bottom-6 text-center w-full left-0 text-sm text-[#3d4947]"
      >
        © 2026 Pemerintah Desa Cimenyan
      </div>
    </div>
  </main>
</template>
