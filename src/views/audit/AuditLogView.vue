<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import DataQualityView from "./DataQualityView.vue";
import DuplicateDetectionView from "./DuplicateDetectionView.vue";

const route = useRoute();
const router = useRouter();

// Tab state: 'kualitas' | 'duplikat'
const activeTab = ref("kualitas");

onMounted(() => {
  if (route.query.tab === "duplikat") {
    activeTab.value = "duplikat";
  }
});

watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab === "duplikat" || newTab === "kualitas") {
      activeTab.value = newTab;
    }
  }
);

const setTab = (tab) => {
  activeTab.value = tab;
  router.replace({ query: { ...route.query, tab } });
};
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-6 sm:space-y-8 pb-12">
    <!-- Top Navigation Tabs Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#bcc9c6]/30 pb-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
          Kualitas & Rekonsiliasi Data
        </h1>
        <p class="text-sm sm:text-base text-[#565e74] mt-1">
          Pantau metrik integritas, validitas, dan deteksi anomali data kependudukan Desa Cimenyan.
        </p>
      </div>

      <!-- Segmented Tab Controls -->
      <div class="inline-flex p-1 bg-[#eff4ff] rounded-xl border border-[#bcc9c6]/40 self-start sm:self-auto shrink-0">
        <button
          type="button"
          @click="setTab('kualitas')"
          :class="[
            'px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer',
            activeTab === 'kualitas'
              ? 'bg-white text-[#0d9488] shadow-xs'
              : 'text-[#565e74] hover:text-[#0b1c30]'
          ]"
        >
          <span class="material-symbols-outlined text-[18px]">analytics</span>
          <span>Ikhtisar Kualitas Data</span>
        </button>

        <button
          type="button"
          @click="setTab('duplikat')"
          :class="[
            'px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer',
            activeTab === 'duplikat'
              ? 'bg-white text-[#0d9488] shadow-xs'
              : 'text-[#565e74] hover:text-[#0b1c30]'
          ]"
        >
          <span class="material-symbols-outlined text-[18px]">file_copy</span>
          <span>Deteksi Duplikat</span>
          <span class="px-2 py-0.2 rounded-full text-[10px] font-bold bg-[#ffdad6] text-[#ba1a1a]">
            42
          </span>
        </button>
      </div>
    </div>

    <!-- Active Tab Components -->
    <transition mode="out-in" enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <DataQualityView
        v-if="activeTab === 'kualitas'"
        @go-to-duplicate="setTab('duplikat')"
      />
      <DuplicateDetectionView v-else />
    </transition>
  </div>
</template>
