<script setup>
import { useAnimeStore } from '@/stores/Anime'
import { storeToRefs } from 'pinia'
import Card from '@/components/Reusable/Card/index.vue'

const animeStore = useAnimeStore()
const { watchlist } = storeToRefs(animeStore)
</script>

<template>
  <h1 class="text-2xl font-bold my-4 flex items-center gap-2">Watch List</h1>

  <div v-if="watchlist.length === 0" class="text-center text-base-content/50 my-50">
    <p class="text-lg font-semibold">Your watchlist is empty.</p>
    <p class="text-sm">Add some anime to your watchlist to see them here.</p>
  </div>

  <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    <RouterLink
      v-for="anime in watchlist"
      :key="anime.id"
      :to="{ name: 'DetailAnime', params: { id: anime.id } }"
    >
      <Card
        :id="anime.id"
        :title="anime.title"
        :image="anime.image"
        :rating="anime.rating"
        :status="anime.status"
        :episodes="anime.episodes"
        :format="anime.format"
        :season="anime.season"
        :year="anime.year"
      />
    </RouterLink>
  </div>
</template>
