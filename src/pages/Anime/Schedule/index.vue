<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAnimeStore } from '@/stores/Anime'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import TabNav from '@/components/Reusable/TabNav/index.vue'
import Card from '@/components/Reusable/Card/index.vue'
import { useClock } from '@/composables/useClock'
import { getCountdownParts } from '@/utils/countDown'

const animeStore = useAnimeStore()
const { fetchWeeklySchedule } = animeStore
const { weeklySchedule, loading } = storeToRefs(animeStore)

const now = useClock()

const days = [
  { key: 'MONDAY', label: 'Monday' },
  { key: 'TUESDAY', label: 'Tuesday' },
  { key: 'WEDNESDAY', label: 'Wednesday' },
  { key: 'THURSDAY', label: 'Thursday' },
  { key: 'FRIDAY', label: 'Friday' },
  { key: 'SATURDAY', label: 'Saturday' },
  { key: 'SUNDAY', label: 'Sunday' },
]

const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
const selectedDay = ref(days[todayIndex].key)

function getCurrentWeekRange() {
  const n = new Date()
  const day = n.getDay() || 7
  const monday = new Date(n)
  monday.setHours(0, 0, 0, 0)
  monday.setDate(n.getDate() - day + 1)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  sunday.setHours(23, 59, 59, 999)
  return {
    start: Math.floor(monday.getTime() / 1000),
    end: Math.floor(sunday.getTime() / 1000),
  }
}

onMounted(() => {
  const { start, end } = getCurrentWeekRange()
  fetchWeeklySchedule(start, end)
})

const filteredByDay = computed(() => {
  const dayIdx = days.findIndex((d) => d.key === selectedDay.value)
  return weeklySchedule.value
    .filter((item) => {
      const date = new Date(item.airingAt * 1000)
      const jsDay = date.getDay() === 0 ? 6 : date.getDay() - 1
      return jsDay === dayIdx
    })
    .sort((a, b) => a.airingAt - b.airingAt)
})
</script>

<template>
  <div class="px-10 py-6">
    <h1 class="font-bold text-4xl mb-8">Schedule</h1>

    <TabNav v-model="selectedDay" :tabs="days" />

    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <Card v-for="n in 12" :key="n" loading />
    </div>

    <div v-else-if="!filteredByDay.length" class="text-center py-16 text-base-content/50">
      No anime airing on this day.
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <RouterLink
        v-for="item in filteredByDay"
        :key="item.media.id"
        :to="{ name: 'DetailAnime', params: { id: item.media.id } }"
      >
        <Card
          :id="String(item.media.id)"
          :title="item.media.title?.romaji"
          :image="item.media.coverImage?.large"
          :rating="item.media.averageScore ? (item.media.averageScore / 10).toFixed(1) : null"
          :status="item.media.status"
          :episodes="item.episode"
          :countdown="getCountdownParts(item.airingAt, now)"
          :season="item.media.season"
          :year="item.media.seasonYear"
          :format="item.media.format"
        />
      </RouterLink>
    </div>
  </div>
</template>
