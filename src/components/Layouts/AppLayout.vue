<script setup>
import { ref } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppNavbar from './AppNavbar.vue'

const drawerOpen = ref(true)
</script>

<template>
  <div class="flex min-h-screen">
    <AppSidebar :open="drawerOpen" />
    <div class="flex flex-col flex-1 min-w-0">
      <AppNavbar :open="drawerOpen" @toggle="drawerOpen = !drawerOpen" />
      <main class="flex-1 p-4 lg:p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
