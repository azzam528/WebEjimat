<script setup>
import { ref } from "vue";
import AppSidebar from "./AppSidebar.vue";
import AppHeader from "./AppHeader.vue";

const isMobileOpen = ref(false);
</script>

<template>
  <div class="min-h-screen bg-[#F8F9FF] text-[#0B1C30] flex overflow-hidden">
    <!-- Sidebar -->
    <AppSidebar
      :mobile-open="isMobileOpen"
      @close="isMobileOpen = false"
    />

    <!-- Main Content Shell -->
    <div class="flex-1 flex flex-col md:ml-[280px] w-full min-w-0 h-screen overflow-hidden">
      <!-- Top Header -->
      <AppHeader @toggle-mobile-menu="isMobileOpen = !isMobileOpen" />

      <!-- Scrollable Route Canvas -->
      <main class="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#F9FAFB]">
        <RouterView />
      </main>
    </div>
  </div>
</template>
