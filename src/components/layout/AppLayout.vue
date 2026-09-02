<script setup>
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
</script>
<template>
  <div class="layout-container">
    <AppSidebar />
    <div class="main-content">
      <AppHeader />
      <main class="content-area">
        <RouterView />
      </main>
    </div>
  </div>
</template>
