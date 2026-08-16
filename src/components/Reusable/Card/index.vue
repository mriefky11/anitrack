<script setup>
import { Heart, Star } from '@lucide/vue'
const props = defineProps({
  id: { type: String },
  title: { type: String },
  rating: { type: [String, Number], default: null },
  image: { type: String },
  status: { type: String, default: 'N/A' },
  episodes: { type: [String, Number], default: null },
  chapters: { type: [String, Number], default: null },
  season: { type: String, default: null },
  year: { type: [String, Number], default: null },
  loading: { type: Boolean, default: false },
  popularity: { type: String, default: null },
  format: { type: String, default: null },
})

const statusClass = {
  RELEASING: 'badge-success',
  FINISHED: 'badge-neutral',
  NOT_YET_RELEASED: 'badge-info',
  CANCELLED: 'badge-error',
  HIATUS: 'badge-warning',
}
const statusLabel = {
  RELEASING: 'Airing',
  FINISHED: 'Finished',
  NOT_YET_RELEASED: 'Upcoming',
  CANCELLED: 'Cancelled',
  HIATUS: 'Hiatus',
}
</script>

<template>
  <!-- SKELETON -->
  <div v-if="loading" class="card bg-base-100 border border-base-200 overflow-hidden">
    <div class="aspect-[2/3] skeleton w-full" />
    <div class="card-body p-3 gap-2">
      <div class="skeleton h-3 w-3/4 rounded" />
      <div class="skeleton h-3 w-1/2 rounded" />
    </div>
  </div>

  <!-- CONTENT -->
  <div
    v-else
    class="card bg-base-100 border border-base-200 shadow-sm hover:-translate-y-1 transition-transform duration-200 overflow-hidden cursor-pointer"
  >
    <figure class="relative aspect-[2/3] overflow-hidden bg-base-200">
      <img :src="image" :alt="title" class="w-full h-full object-cover" />
      <div class="absolute top-2 left-2 flex flex-col gap-1 items-start">
        <span v-if="rating" class="badge badge-warning badge-md font-bold">
          <Star class="w-3 h-3" />
          {{ rating }}
        </span>
        <span v-if="popularity" class="badge badge-secondary badge-md font-bold">
          <Heart class="w-3 h-3" />
          {{ popularity }}
        </span>
      </div>
      <span
        v-if="status && status !== 'N/A'"
        class="badge badge-md absolute top-2 right-2 font-bold"
        :class="statusClass[status] ?? 'badge-ghost'"
      >
        {{ statusLabel[status] ?? status }}
      </span>
    </figure>
    <div class="card-body p-3 gap-1 text-center">
      <p class="card-title text-md font-medium leading-snug line-clamp-1">
        {{ title }}
      </p>
      <p class="text-xs text-base-content/50">
        <span v-if="format">{{ format }}</span>
        <span v-if="episodes"> {{ format ? ' · ' : '' }}{{ episodes }} eps </span>
        <span v-if="chapters"> {{ format || episodes ? ' · ' : '' }}{{ chapters }} chapter </span>
        <span v-if="season || year" class="capitalize">
          {{ format || episodes || chapters ? ' · ' : '' }}
          {{ season }} {{ year }}
        </span>
      </p>
    </div>
  </div>
</template>
