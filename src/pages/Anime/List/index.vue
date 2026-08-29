<template>
  <List
    type="anime"
    title="Anime List"
    :items="animeList"
    :loading="loading"
    :page-info="animePageInfo"
    :rank-offset="rankOffset"
    @search="onSearch"
    @clear="onClear"
    @select="onSelect"
    @prev="onPrev"
    @next="onNext"
  >
  </List>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAnimeStore } from '@/stores/Anime'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import List from '@/components/Reusable/List/index.vue'

const router = useRouter()
const animeStore = useAnimeStore()

const { animeList, loading, animePageInfo } = storeToRefs(animeStore)
const { fetchTopAnime, searchAnime } = animeStore

const currentPage = ref(1)
const PER_PAGE = 10

const rankOffset = computed(() => (currentPage.value - 1) * PER_PAGE)

function onSearch(keyword) {
  searchAnime(keyword)
}

function onSelect(anime) {
  router.push({ name: 'DetailAnime', params: { id: anime.id } })
}

onMounted(() => {
  fetchTopAnime({ limit: 10, page: 1 })
})

function onClear() {
  currentPage.value = 1
  fetchTopAnime({ limit: 10, page: 1 })
}

function onPrev() {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchTopAnime({ limit: 10, page: currentPage.value })
  }
}

function onNext() {
  currentPage.value++
  fetchTopAnime({ limit: 10, page: currentPage.value })
}
</script>
