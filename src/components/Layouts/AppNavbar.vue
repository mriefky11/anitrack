<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Sun, Moon, Search } from '@lucide/vue'

defineProps({
  open: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['toggle'])

const router = useRouter()
const isDark = ref(document.documentElement.getAttribute('data-theme') === 'dark')
const searchQuery = ref('')

function toggleDark() {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

function handleSearch(e) {
  if (e.key === 'Enter' && searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value.trim() } })
    searchQuery.value = ''
  }
}
</script>

<template>
  <nav class="navbar w-full bg-base-200 border-b border-base-300 sticky top-0 z-30 px-2 gap-2">
    <!-- Toggle button -->
    <button
      class="btn btn-square btn-ghost btn-sm"
      aria-label="toggle sidebar"
      @click="emit('toggle')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="2"
        fill="none"
        stroke="currentColor"
        class="inline-block size-5"
      >
        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
        <path d="M9 4v16" />
        <path d="M14 10l2 2l-2 2" />
      </svg>
    </button>

    <div class="flex-1" />

    <!-- Search -->
    <label
      class="input input-sm input-bordered flex items-center gap-2 w-44 hidden sm:flex focus-within:w-60 transition-all duration-200"
    >
      <Search :size="13" class="opacity-50 shrink-0" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search anime..."
        class="grow bg-transparent outline-none text-sm min-w-0"
        @keydown="handleSearch"
      />
    </label>

    <!-- Dark toggle -->
    <button
      class="btn btn-square btn-ghost btn-sm"
      @click="toggleDark"
      :aria-label="isDark ? 'Light mode' : 'Dark mode'"
    >
      <Sun v-if="isDark" :size="17" />
      <Moon v-else :size="17" />
    </button>
  </nav>
</template>
