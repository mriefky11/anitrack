<template>
  <li class="list-row items-center hover:bg-base-200 transition-colors">
    <!-- Rank number -->
    <div class="text-3xl font-thin opacity-30 tabular-nums w-10 text-center shrink-0">
      {{ String(rank).padStart(2, '0') }}
    </div>

    <!-- Cover image -->
    <div class="shrink-0">
      <img
        v-if="item.coverImage?.large"
        :src="item.coverImage.large"
        :alt="item.title?.romaji"
        class="size-14 rounded-box object-cover"
        loading="lazy"
      />
      <div v-else class="size-14 rounded-box bg-base-300 flex items-center justify-center">
        <Star />
      </div>
    </div>

    <!-- Info -->
    <div class="list-col-grow min-w-0">
      <!-- Title -->
      <div class="font-medium text-sm leading-snug line-clamp-1">
        {{ item.title?.romaji || item.title?.english || item.title?.native }}
      </div>

      <!-- Meta -->
      <div class="text-xs opacity-60 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
        <!-- Anime: episodes | Manga: chapters -->
        <span v-if="type === 'anime' && item.episodes">{{ item.episodes }} eps</span>
        <span v-if="type === 'manga' && item.chapters">{{ item.chapters }} ch</span>
        <span v-if="type === 'manga' && item.volumes">{{ item.volumes }} vol</span>

        <span v-if="item.seasonYear">{{ item.seasonYear }}</span>
        <span v-if="item.season">{{ seasonLabel(item.season) }}</span>

        <span v-if="item.format" class="badge badge-xs badge-neutral">
          {{ formatLabel(item.format) }}
        </span>
        <span
          v-if="item.averageScore"
          class="badge badge-xs"
          :class="scoreClass(item.averageScore)"
        >
          ★ {{ (item.averageScore / 10).toFixed(1) }}
        </span>
      </div>

      <!-- Genres -->
      <div v-if="item.genres?.length" class="flex flex-wrap gap-1 mt-1.5">
        <span
          v-for="genre in item.genres.slice(0, 3)"
          :key="genre"
          class="badge badge-xs badge-ghost"
        >
          {{ genre }}
        </span>
      </div>
    </div>

    <!-- Detail button -->
    <button
      class="btn btn-square btn-ghost shrink-0"
      @click="$emit('select', item)"
      :title="`Detail ${item.title?.romaji}`"
    >
      <ChevronRight />
    </button>
  </li>
</template>

<script setup>
import { ChevronRight, Star } from '@lucide/vue'
defineProps({
  item: { type: Object, required: true },
  rank: { type: Number, required: true },
  type: { type: String, default: 'anime' },
})

defineEmits(['select'])

function scoreClass(score) {
  if (score >= 80) return 'badge-success'
  if (score >= 60) return 'badge-warning'
  return 'badge-error'
}

function formatLabel(format) {
  const map = {
    TV: 'TV',
    MOVIE: 'Movie',
    OVA: 'OVA',
    ONA: 'ONA',
    SPECIAL: 'Special',
    MANGA: 'Manga',
    NOVEL: 'Novel',
    ONE_SHOT: 'One Shot',
  }
  return map[format] || format
}

function seasonLabel(season) {
  const map = { WINTER: 'Winter', SPRING: 'Spring', SUMMER: 'Summer', FALL: 'Fall' }
  return map[season] || season
}
</script>
