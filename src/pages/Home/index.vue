<script setup>
import { computed, onMounted } from 'vue'
import { useAnimeStore } from '@/stores/Anime'
import { useMangaStore } from '@/stores/Manga'
import { useCharacterStore } from '@/stores/Character'
import { storeToRefs } from 'pinia'
import Carosel from '@/components/Reusable/Carousel/index.vue'
import Card from '@/components/Reusable/Card/index.vue'
import { cleanDescription } from '@/utils/text'

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
    id: anime.id,
    title: anime.title?.romaji,
    image: anime.coverImage?.large,
    description: cleanDescription(anime.description),
    rating: anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null,
  })),
)

/**
 * Fetch data saat halaman dibuka
 */
onMounted(() => {
  fetchTopAnime(10)
  fetchTopCharacter(10)
  fetchTopManga(10)
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
      <RouterLink
        v-for="anime in animeList"
        :key="anime.id"
        :to="{ name: 'DetailAnime', params: { id: anime.id } }"
      >
        <Card
          :id="String(anime.id)"
          :title="anime.title?.romaji"
          :image="anime.coverImage?.large"
          :format="anime.format"
          :rating="anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null"
          :status="anime.status"
          :episodes="anime.episodes"
          :season="anime.season"
          :year="anime.seasonYear"
        />
      </RouterLink>
    </template>
  </div>

  <!-- Top Manga -->
  <h1 class="text-2xl font-bold my-4">Top Manga</h1>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    <template v-if="mangaLoading">
      <Card v-for="n in 10" :key="n" :loading="true" />
    </template>
    <template v-else>
      <RouterLink
        :to="{ name: 'DetailManga', params: { id: manga.id } }"
        v-for="manga in mangaList"
        :key="manga.id"
      >
        <Card
          :id="String(manga.id)"
          :title="manga.title?.romaji"
          :image="manga.coverImage?.large"
          :popularity="manga.popularity"
          :status="manga.status"
          :chapters="manga.volumes"
          :year="manga.startDate?.year"
        />
      </RouterLink>
    </template>
  </div>

  <!-- Top Character -->
  <h1 class="text-2xl font-bold my-4">Top Character</h1>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    <template v-if="characterLoading">
      <Card v-for="n in 10" :key="n" :loading="true" />
    </template>
    <template v-else>
      <RouterLink
        :to="{ name: 'DetailCharacter', params: { id: character.id } }"
        v-for="character in characterList"
        :key="character.id"
      >
        <Card
          :id="String(character.id)"
          :title="character.name?.full"
          :image="character.image?.large"
          :popularity="character.favourites"
        />
      </RouterLink>
    </template>
  </div>
</template>
