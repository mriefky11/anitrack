<template>
  <div class="bg-base-100">
    <div class="mx-auto px-4 pt-4 flex items-center gap-3">
      <div>
        <!-- Title slot (kiri) -->
        <h1 class="font-bold text-4xl">{{ title }}</h1>
        <!-- Section label -->
        <p class="text-sm text-base-content/50 mb-4">
          <template v-if="isSearchMode">
            Search results for
            <span class="text-base-content font-medium">"{{ activeQuery }}"</span>
            <span v-if="!loading"> · {{ items.length }} Found</span>
          </template>
          <template v-else>
            {{ defaultLabel }}
          </template>
        </p>
      </div>
      <!-- Search (kanan) -->
      <label class="input input-bordered flex items-center gap-2 w-full max-w-sm ml-auto">
        <Search />
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="`Search ${typeLabel.toLowerCase()}...`"
          class="grow"
          @input="onSearchInput"
        />
        <button v-if="searchQuery" @click="clearSearch" class="opacity-50 hover:opacity-100">
          <X />
        </button>
      </label>
    </div>

    <!-- Content -->
    <div class="mx-auto px-4 py-4">
      <!-- Loading skeleton -->
      <ul v-if="loading" class="list bg-base-100 rounded-box shadow-md">
        <li v-for="n in 10" :key="n" class="list-row items-center">
          <div class="skeleton w-10 h-6 rounded"></div>
          <div class="skeleton size-14 rounded-box shrink-0"></div>
          <div class="list-col-grow flex flex-col gap-2">
            <div class="skeleton h-3 w-2/3 rounded"></div>
            <div class="skeleton h-3 w-1/2 rounded"></div>
            <div class="skeleton h-3 w-1/3 rounded"></div>
          </div>
          <div class="skeleton size-10 rounded-full"></div>
        </li>
      </ul>

      <!-- Empty state -->
      <div
        v-else-if="items.length === 0"
        class="flex flex-col items-center justify-center py-24 gap-2 text-base-content/40"
      >
        <SearchX :size="40" />
        <p class="text-md">{{ typeLabel }} Not Found</p>
        <button class="btn btn-md btn-ghost" @click="clearSearch">
          Back to list {{ typeLabel.toLowerCase() }}
        </button>
      </div>

      <!-- List -->
      <ul v-else class="list bg-base-100 rounded-box shadow-md">
        <li class="p-4 pb-2 text-xs opacity-60 tracking-wide uppercase">
          {{ isSearchMode ? `${items.length} Results found` : defaultLabel }}
        </li>
        <MediaListRow
          v-for="(item, index) in items"
          :key="item.id"
          :item="item"
          :rank="rankOffset + index + 1"
          :type="type"
          @select="$emit('select', $event)"
        />
      </ul>

      <!-- Pagination -->
      <Pagination
        v-if="!isSearchMode"
        :page-info="pageInfo"
        @prev="$emit('prev')"
        @next="$emit('next')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MediaListRow from '@/components/Atoms/ListRow/index.vue'
import Pagination from '@/components/Reusable/Pagination/index.vue'
import { Search, SearchX, X } from '@lucide/vue'

const props = defineProps({
  title: { type: String, default: '' },
  items: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  pageInfo: { type: Object, default: null },
  type: { type: String, default: '' },
  rankOffset: { type: Number, default: 0 },
})

const emit = defineEmits(['search', 'clear', 'select', 'prev', 'next'])

const searchQuery = ref('')
const activeQuery = ref('')
const isSearchMode = ref(false)
let searchTimeout = null

const typeLabel = computed(() => {
  return props.type === 'manga' ? 'Manga' : 'Anime'
})

function onSearchInput() {
  clearTimeout(searchTimeout)
  if (!searchQuery.value.trim()) {
    clearSearch()
    return
  }
  searchTimeout = setTimeout(() => {
    activeQuery.value = searchQuery.value.trim()
    isSearchMode.value = true
    emit('search', activeQuery.value)
  }, 500)
}

function clearSearch() {
  searchQuery.value = ''
  activeQuery.value = ''
  isSearchMode.value = false
  emit('clear')
}
</script>
