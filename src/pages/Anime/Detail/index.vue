<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useAnimeStore } from '@/stores/Anime'
import { storeToRefs } from 'pinia'
import { cleanDescription } from '@/utils/text'
import Card from '@/components/Reusable/Card/index.vue'
import { Star, Play, Heart } from '@lucide/vue'

const animeStore = useAnimeStore()
const { fetchAnimeDetail } = animeStore
const { animeDetail, loading, error } = storeToRefs(animeStore)

const route = useRoute()
const activeTab = ref('overview')
const showTrailer = ref(false)

const description = computed(() => cleanDescription(animeDetail.value?.description))
const score = computed(() =>
  animeDetail.value?.averageScore ? (animeDetail.value.averageScore / 10).toFixed(1) : null,
)
const studios = computed(() => animeDetail.value?.studios?.edges?.map((e) => e.node) ?? [])
const recommendations = computed(
  () =>
    animeDetail.value?.recommendations?.nodes?.map((n) => n.mediaRecommendation).filter(Boolean) ??
    [],
)
const reviews = computed(() => animeDetail.value?.reviews?.nodes ?? [])
const characters = computed(() => animeDetail.value?.characters?.edges ?? [])

const sourceLabel = computed(() => {
  const map = {
    ORIGINAL: 'Original',
    MANGA: 'Manga',
    LIGHT_NOVEL: 'Light Novel',
    VISUAL_NOVEL: 'Visual Novel',
    VIDEO_GAME: 'Video Game',
    NOVEL: 'Novel',
    DOUJINSHI: 'Doujinshi',
    ANIME: 'Anime',
    WEB_NOVEL: 'Web Novel',
    LIVE_ACTION: 'Live Action',
    GAME: 'Game',
    COMIC: 'Comic',
    MULTIMEDIA_PROJECT: 'Multimedia Project',
    PICTURE_BOOK: 'Picture Book',
    OTHER: 'Other',
  }
  return map[animeDetail.value?.source] ?? null
})

const trailerUrl = computed(() => {
  const t = animeDetail.value?.trailer
  if (!t) return null
  if (t.site === 'youtube') return `https://www.youtube.com/embed/${t.id}?autoplay=1`
  if (t.site === 'dailymotion') return `https://www.dailymotion.com/embed/video/${t.id}?autoplay=1`
  return null
})

onMounted(() => fetchAnimeDetail(route.params.id))
watch(
  () => route.params.id,
  (id) => id && fetchAnimeDetail(id),
)
</script>

<template>
  <!-- SKELETON -->
  <div v-if="loading" class="mx-auto px-4 py-6">
    <div class="skeleton w-full h-56 rounded-2xl mb-6" />
    <div class="flex gap-5">
      <div class="skeleton w-40 h-56 rounded-xl shrink-0" />
      <div class="flex-1 space-y-3">
        <div class="skeleton h-4 w-24 rounded" />
        <div class="skeleton h-7 w-64 rounded" />
        <div class="skeleton h-3 w-full rounded" />
        <div class="skeleton h-3 w-5/6 rounded" />
        <div class="skeleton h-3 w-3/4 rounded" />
      </div>
    </div>
  </div>

  <!-- ERROR -->
  <div v-else-if="error" class="mx-auto px-10 py-16 text-center">
    <p class="text-lg font-medium mb-1">Failed to load anime details</p>
    <p class="text-sm text-base-content/60 mb-4">
      {{ 'Something went wrong, please try again.' }}
    </p>
    <button class="btn btn-sm btn-primary" @click="fetchAnimeDetail(route.params.id)">Retry</button>
  </div>

  <!-- CONTENT -->
  <div v-else-if="animeDetail" class="pb-16 px-10">
    <!-- Banner -->
    <div class="relative w-full h-56 md:h-72 overflow-hidden rounded-b-xl">
      <img
        v-if="animeDetail.bannerImage"
        :src="animeDetail.bannerImage"
        class="w-full h-full object-cover"
        :alt="animeDetail.title?.romaji"
      />
      <div
        v-else
        class="w-full h-full"
        :style="{ background: animeDetail.coverImage?.color || '#20222d' }"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/40 to-transparent" />
    </div>

    <div class="mx-auto px-10 -mt-24 relative z-10">
      <!-- Header: poster + info -->
      <div class="flex flex-col sm:flex-row gap-5 mb-8">
        <img
          :src="animeDetail.coverImage?.large"
          :alt="animeDetail.title?.romaji"
          class="w-40 sm:w-48 rounded-xl shadow-2xl border border-white/10 shrink-0"
        />
        <div class="flex-1 min-w-0 pt-2 sm:pt-20">
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="badge badge-neutral">{{ animeDetail.status?.replaceAll('_', ' ') }}</span>
            <span v-if="animeDetail.format" class="badge badge-outline">{{
              animeDetail.format
            }}</span>
            <span v-if="sourceLabel" class="badge badge-outline">{{ sourceLabel }}</span>
            <span v-if="score" class="badge badge-warning gap-1 font-bold"
              ><Star class="w-3 h-3" /> {{ score }}</span
            >
            <span v-if="animeDetail.popularity" class="badge badge-secondary gap-1"
              ><Heart class="w-3 h-3" /> {{ animeDetail.popularity }}</span
            >
          </div>
          <h1 class="text-2xl md:text-3xl font-bold leading-tight mb-2">
            {{ animeDetail.title?.romaji }}
          </h1>
          <p
            v-if="
              animeDetail.title?.english && animeDetail.title.english !== animeDetail.title.romaji
            "
            class="text-sm text-base-content/60 mb-3"
          >
            {{ animeDetail.title.english }}
          </p>

          <div class="flex flex-wrap gap-1.5 mb-3">
            <span
              v-for="g in animeDetail.genres"
              :key="g"
              class="badge badge-sm badge-primary badge-outline"
            >
              {{ g }}
            </span>
          </div>

          <div class="flex flex-wrap gap-x-5 gap-y-1 text-md text-base-content/70 mb-3">
            <span v-if="animeDetail.duration">{{ animeDetail.duration }} mins</span>
            <span v-if="animeDetail.episodes">{{ animeDetail.episodes }} episodes</span>
            <span v-if="animeDetail.season && animeDetail.seasonYear"
              >{{ animeDetail.season }} {{ animeDetail.seasonYear }}</span
            >
            <span v-if="studios.length">{{ studios.map((s) => s.name).join(', ') }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 mb-10" :class="trailerUrl ? 'lg:grid-cols-3' : ''">
        <!-- Synopsis -->
        <div :class="trailerUrl ? 'lg:col-span-2' : ''">
          <p
            class="text-md leading-relaxed text-base-content/80 text-justify whitespace-pre-line mb-8"
          >
            {{ description }}
          </p>
        </div>
        <div v-if="trailerUrl">
          <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-base-200">
            <template v-if="showTrailer">
              <iframe
                :src="trailerUrl"
                class="w-full h-full"
                allow="autoplay; encrypted-media"
                allowfullscreen
              />
            </template>
            <template v-else>
              <img
                v-if="animeDetail.trailer?.thumbnail"
                :src="animeDetail.trailer.thumbnail"
                class="w-full h-full object-cover"
                alt="Trailer thumbnail"
              />
              <button
                class="btn btn-circle btn-primary absolute inset-0 m-auto w-12 h-12"
                aria-label="Play trailer"
                @click="showTrailer = true"
              >
                <Play class="w-5 h-5" />
              </button>
            </template>
          </div>
        </div>
      </div>
      <!-- Characters -->
      <div v-if="characters.length" class="mb-10">
        <h2 class="text-lg font-semibold mb-4">Characters</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="c in characters" :key="c.node.id" class="text-center">
            <Card
              :id="String(c.node.id)"
              :title="c.node.name.full"
              :image="c.node.image?.large"
              :voiceActors="c.voiceActors[0].name.full"
              :role="c.role"
            />
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div role="tablist" class="tabs tabs-bordered mb-5">
        <a
          role="tab"
          class="tab"
          :class="{ 'tab-active': activeTab === 'overview' }"
          @click="activeTab = 'overview'"
        >
          Reviews ({{ reviews.length }})
        </a>
        <a
          role="tab"
          class="tab"
          :class="{ 'tab-active': activeTab === 'reco' }"
          @click="activeTab = 'reco'"
        >
          Recommendations ({{ recommendations.length }})
        </a>
      </div>

      <!-- Tab: Reviews -->
      <div v-if="activeTab === 'overview'" class="space-y-3 max-w-full">
        <p v-if="!reviews.length" class="text-sm text-base-content/50">No reviews yet.</p>
        <div v-for="r in reviews" :key="r.user.name" class="bg-base-200 rounded-xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <div class="avatar placeholder">
              <div class="bg-neutral text-neutral-content text-center rounded-lg w-7">
                <span class="text-xs">{{ r.user.name.slice(0, 2).toUpperCase() }}</span>
              </div>
            </div>
            <span class="text-sm font-medium">{{ r.user.name }}</span>
            <span class="text-xs text-base-content/50 ml-auto">👍 {{ r.rating }}</span>
          </div>
          <p class="text-sm text-base-content/70">{{ r.summary }}</p>
        </div>
      </div>

      <!-- Tab: Recommendations -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <p v-if="!recommendations.length" class="text-sm text-base-content/50 col-span-full">
          No recommendations available for this anime.
        </p>
        <RouterLink
          v-for="rec in recommendations"
          :key="rec.id"
          :to="{ name: 'DetailAnime', params: { id: rec.id } }"
        >
          <Card
            :id="String(rec.id)"
            :title="rec.title?.romaji"
            :image="rec.coverImage?.large"
            :status="rec.status"
            :episodes="rec.episodes"
            :season="rec.season"
            :year="rec.seasonYear"
            :rating="rec.averageScore ? (rec.averageScore / 10).toFixed(1) : null"
            :format="rec.format"
          />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
