<script setup>
import { computed, onMounted } from 'vue'
import { useAnimeStore } from '@/stores/Anime'
import { useMangaStore } from '@/stores/Manga'
import { useCharacterStore } from '@/stores/Character'
import { storeToRefs } from 'pinia'
import Carosel from '@/components/Reusable/Carousel/index.vue'
import Card from '@/components/Reusable/Card/index.vue'

const animeStore = useAnimeStore()
const { fetchTopAnime } = animeStore
const { animeList, loading: animeLoading } = storeToRefs(animeStore)

const mangaStore = useMangaStore()
const { fetchTopManga } = mangaStore
const { mangaList, loading: mangaLoading } = storeToRefs(mangaStore)

const characterStore = useCharacterStore()
const { fetchTopCharacter } = characterStore
const { characterList, loading: characterLoading } = storeToRefs(characterStore)

const carouselItems = computed(() =>
  animeList.value.map((anime) => ({
    id: anime.mal_id,
    title: anime.title,
    image: anime.images?.jpg?.large_image_url,
    description: anime.synopsis ? anime.synopsis : 'No description',
    rating: anime.score,
  })),
)

/**
 * Fetch data saat halaman dibuka
 */
onMounted(() => {
  fetchTopAnime({ limit: 10 })
  fetchTopCharacter()
  fetchTopManga({ limit: 10 })
})
</script>

<template>
  <!-- Carousel -->
  <Carosel :items="carouselItems" :loading="animeLoading" />

  <!-- Top Anime -->
  <h1 class="text-2xl font-bold my-4">Top Anime</h1>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    <template v-if="animeLoading">
      <Card v-for="n in 10" :key="n" :loading="true" />
    </template>
    <template v-else>
      <Card
        v-for="anime in animeList"
        :key="anime.mal_id"
        :id="String(anime.mal_id)"
        :title="anime.title"
        :image="anime.images?.jpg?.large_image_url"
        :rating="anime.score"
        :status="anime.status"
        :episodes="anime.episodes"
        :season="anime.season"
        :year="anime.year"
      />
    </template>
  </div>

  <!-- Top Manga -->
  <h1 class="text-2xl font-bold my-4">Top Manga</h1>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    <template v-if="mangaLoading">
      <Card v-for="n in 10" :key="n" :loading="true" />
    </template>
    <template v-else>
      <Card
        v-for="manga in mangaList"
        :key="manga.mal_id"
        :id="String(manga.mal_id)"
        :title="manga.title"
        :image="manga.images?.jpg?.large_image_url"
        :rating="manga.score"
        :status="manga.status"
        :episodes="manga.chapters"
        :year="manga.published?.prop?.from?.year"
      />
    </template>
  </div>

  <!-- Top Character -->
  <h1 class="text-2xl font-bold my-4">Top Character</h1>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    <template v-if="characterLoading">
      <Card v-for="n in 10" :key="n" :loading="true" />
    </template>
    <template v-else>
      <Card
        v-for="character in characterList"
        :key="character.mal_id"
        :id="String(character.mal_id)"
        :title="character.name"
        :image="character.images?.jpg?.image_url"
        :rating="character.favorites"
      />
    </template>
  </div>
</template>
