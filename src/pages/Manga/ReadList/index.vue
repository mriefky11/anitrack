<script setup>
import { useMangaStore } from '@/stores/Manga'
import { storeToRefs } from 'pinia'
import Card from '@/components/Reusable/Card/index.vue'

const mangaStore = useMangaStore()
const { readlist } = storeToRefs(mangaStore)
</script>

<template>
  <h1 class="text-2xl font-bold my-4 flex items-center gap-2">Read List</h1>

  <div v-if="readlist.length === 0" class="text-center text-base-content/50 my-50">
    <p class="text-lg font-semibold">Your readlist is empty.</p>
    <p class="text-sm">Add some manga to your readlist to see them here.</p>
  </div>

  <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    <RouterLink
      v-for="manga in readlist"
      :key="manga.id"
      :to="{ name: 'DetailManga', params: { id: manga.id } }"
    >
      <Card
        :id="manga.id"
        :title="manga.title"
        :image="manga.image"
        :rating="manga.rating"
        :status="manga.status"
        :episodes="manga.episodes"
        :format="manga.format"
        :season="manga.season"
        :year="manga.year"
      />
    </RouterLink>
  </div>
</template>
