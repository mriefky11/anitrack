<template>
  <List
    type="manga"
    title="Manga List"
    :items="mangaList"
    :loading="loading"
    :page-info="mangaPageInfo"
    :rank-offset="rankOffset"
    @search="onSearch"
    @clear="onClear"
    @select="onSelect"
    @prev="onPrev"
    @next="onNext"
  />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useMangaStore } from '@/stores/Manga'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import List from '@/components/Reusable/List/index.vue'

const router = useRouter()
const mangaStore = useMangaStore()

const { mangaList, loading, mangaPageInfo } = storeToRefs(mangaStore)
const { fetchTopManga, searchManga } = mangaStore

const currentPage = ref(1)
const PER_PAGE = 10

const rankOffset = computed(() => (currentPage.value - 1) * PER_PAGE)

function onSearch(keyword) {
  searchManga(keyword)
}

function onSelect(manga) {
  router.push({ name: 'DetailManga', params: { id: manga.id } })
}

function onClear() {
  currentPage.value = 1
  fetchTopManga({ limit: 10, page: 1 })
}

function onPrev() {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchTopManga({ limit: 10, page: currentPage.value })
  }
}

function onNext() {
  currentPage.value++
  fetchTopManga({ limit: 10, page: currentPage.value })
}

onMounted(() => {
  fetchTopManga({ limit: 10, page: 1 })
})
</script>
