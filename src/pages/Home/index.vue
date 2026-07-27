<script setup>
import { onMounted } from 'vue'
import { useAnimeStore } from '@/stores/Anime'

/**
 * Ambil store
 */
const animeStore = useAnimeStore()

/**
 * Fetch data saat halaman dibuka
 */
onMounted(() => {
  animeStore.fetchTopAnime()
})
</script>

<template>
  <div class="p-6">
    <!-- TITLE -->
    <h1 class="text-2xl font-bold mb-4">Anime List</h1>

    <!-- LOADING -->
    <div v-if="animeStore.loading" class="text-center">Loading...</div>

    <!-- ERROR -->
    <div v-else-if="animeStore.error" class="text-red-500">Failed to load data</div>

    <!-- DATA -->
    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="anime in animeStore.animeList"
        :key="anime.mal_id"
        class="bg-base-200 rounded-xl p-3 shadow"
      >
        <!-- IMAGE -->
        <img :src="anime.images.jpg.image_url" :alt="anime.title" class="rounded-lg mb-2" />

        <!-- TITLE -->
        <h2 class="font-semibold text-sm line-clamp-2">
          {{ anime.title }}
        </h2>

        <!-- SCORE -->
        <p class="text-xs text-gray-500">⭐ {{ anime.score || 'N/A' }}</p>
      </div>
    </div>
  </div>
</template>
