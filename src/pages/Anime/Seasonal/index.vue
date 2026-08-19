<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAnimeStore } from '@/stores/Anime'
import { storeToRefs } from 'pinia'
import TabsNav from '@/components/Reusable/TabNav/index.vue'
import Card from '@/components/Reusable/Card/index.vue'
import Pagination from '@/components/Reusable/Pagination/index.vue'
import { RouterLink } from 'vue-router'
import { Snowflake, Flower2, Sun, Leaf } from '@lucide/vue'

const animeStore = useAnimeStore()
const { fetchSeasonalAnime } = animeStore
const { seasonalList, seasonalPageInfo, loading } = storeToRefs(animeStore)

const seasons = [
  { key: 'WINTER', label: 'Winter', icon: Snowflake },
  { key: 'SPRING', label: 'Spring', icon: Flower2 },
  { key: 'SUMMER', label: 'Summer', icon: Sun },
  { key: 'FALL', label: 'Fall', icon: Leaf },
]

function getCurrentSeason() {
  const month = new Date().getMonth() + 1
  if (month >= 1 && month <= 3) return 'WINTER'
  if (month >= 4 && month <= 6) return 'SPRING'
  if (month >= 7 && month <= 9) return 'SUMMER'
  return 'FALL'
}

const currentYear = new Date().getFullYear()
const selectedYear = ref(currentYear)
const selectedSeason = ref(getCurrentSeason())
const currentPage = ref(1)

const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

function load() {
  fetchSeasonalAnime(selectedYear.value, selectedSeason.value, currentPage.value)
}

function handlePrev() {
  if (currentPage.value > 1) currentPage.value--
}

function handleNext() {
  currentPage.value++
}

onMounted(load)

watch([selectedYear, selectedSeason], () => {
  currentPage.value = 1
  load()
})

watch(currentPage, load)
</script>

<template>
  <div class="px-10 py-6">
    <div class="flex items-center justify-between gap-3 mb-10">
      <h1 class="font-bold text-4xl">Seasonal</h1>
      <select v-model.number="selectedYear" class="select select-bordered select-md">
        <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
      </select>
    </div>

    <TabsNav v-model="selectedSeason" :tabs="seasons" />

    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <Card v-for="n in 12" :key="n" loading />
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <RouterLink
        v-for="anime in seasonalList"
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
    </div>
    <Pagination :pageInfo="seasonalPageInfo" @prev="handlePrev" @next="handleNext" />
  </div>
</template>
