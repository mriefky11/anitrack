<script setup>
const props = defineProps({
  id: { type: String },
  title: { type: String },
  rating: { type: [String, Number], default: null },
  image: { type: String },
  status: { type: String, default: 'N/A' },
  episodes: { type: [String, Number], default: null },
  season: { type: String, default: null },
  year: { type: [String, Number], default: null },
  loading: { type: Boolean, default: false },
})

const statusClass = {
  'Currently Airing': 'badge-success',
  'Finished Airing': 'badge-ghost',
  'Not yet aired': 'badge-info',
}
const statusLabel = {
  'Currently Airing': 'Airing',
  'Finished Airing': 'Finished',
  'Not yet aired': 'Upcoming',
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
      <span v-if="rating" class="badge badge-warning badge-sm absolute top-2 left-2 font-medium">
        {{ rating }}
      </span>
      <span
        v-if="status !== 'N/A'"
        class="badge badge-sm absolute top-2 right-2 font-medium"
        :class="statusClass[status] ?? 'badge-ghost'"
      >
        {{ statusLabel[status] ?? status }}
      </span>
    </figure>
    <div class="card-body p-3 gap-1">
      <p class="card-title text-sm font-medium leading-snug line-clamp-2">{{ title }}</p>
      <p class="text-xs text-base-content/50">
        <span v-if="episodes">{{ episodes }} eps</span>
        <span v-if="episodes && (season || year)"> · </span>
        <span v-if="season || year" class="capitalize">{{ season }} {{ year }}</span>
      </p>
    </div>
  </div>
</template>
