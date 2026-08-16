<script setup>
import { useRoute } from 'vue-router'
import { Home, Tv2, Calendar, BookOpen, TrendingUp, Clock, Star, Heart } from '@lucide/vue'

defineProps({
  open: {
    type: Boolean,
    default: true,
  },
})

const route = useRoute()

const sections = [
  {
    label: null,
    items: [
      { label: 'Home', to: '/', icon: Home, exact: true },
      { label: 'Seasonal', to: '/seasonal', icon: Tv2 },
      { label: 'Schedule', to: '/schedule', icon: Calendar },
      { label: 'Manga', to: '/manga', icon: BookOpen },
    ],
  },
  {
    label: 'Discover',
    items: [
      { label: 'Top Anime', to: '/top', icon: TrendingUp },
      { label: 'Top Manga', to: '/top', icon: TrendingUp },
      { label: 'Top Character', to: '/top', icon: TrendingUp },
    ],
  },
  {
    label: 'My List',
    items: [{ label: 'Watchlist', to: '/watchlist', icon: Heart }],
  },
]

function isActive(item) {
  if (item.exact) return route.path === item.to
  return route.path.startsWith(item.to)
}
</script>

<template>
  <aside
    :class="[
      'flex flex-col shrink-0 bg-base-200 border-r border-base-300 transition-all duration-300 ease-in-out h-screen overflow-y-auto',
      open ? 'w-64' : 'w-14 overflow-visible',
    ]"
  >
    <!-- Brand -->
    <div class="flex h-14 items-center border-b border-base-300 px-5 shrink-0 overflow-hidden">
      <RouterLink v-if="open" to="/" class="font-bold tracking-widest text-xl whitespace-nowrap">
        LIVE<span class="text-primary">NIME</span>
      </RouterLink>
      <span v-else class="font-bold tracking-widest text-sm whitespace-nowrap">
        L<span class="text-primary">N</span>
      </span>
    </div>

    <!-- Menu -->
    <ul class="menu w-full grow py-2 gap-2">
      <template v-for="(section, i) in sections" :key="i">
        <!-- Section label -->
        <template v-if="section.label">
          <li v-if="open" class="menu-title text-md uppercase tracking-widest opacity-40">
            {{ section.label }}
          </li>
          <div v-else class="divider my-0 mx-2 h-px bg-base-300" />
        </template>

        <!-- Items -->
        <li v-for="item in section.items" :key="item.to">
          <RouterLink
            :to="item.to"
            :data-tip="!open ? item.label : undefined"
            :class="[
              !open ? 'tooltip tooltip-right justify-center' : '',
              isActive(item) ? 'active' : '',
            ]"
          >
            <component :is="item.icon" class="inline-block size-5 my-0.5 shrink-0" />
            <span v-if="open">{{ item.label }}</span>
          </RouterLink>
        </li>
      </template>
    </ul>
  </aside>
</template>
