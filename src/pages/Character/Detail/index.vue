<script setup>
import { computed, onMounted, watch, reactive } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCharacterStore } from '@/stores/Character'
import { parseBio } from '@/utils/bio'
import { formatBirthday } from '@/utils/date'
import Card from '@/components/Reusable/Card/index.vue'
import { Heart } from '@lucide/vue'

const route = useRoute()
const characterStore = useCharacterStore()
const { fetchCharacterDetail } = characterStore
const { characterDetail, loading, error } = storeToRefs(characterStore)

const bioLines = computed(() => {
  const raw = characterDetail.value?.description
  if (!raw) return []
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => parseBio(line))
})

const birthDate = computed(() => formatBirthday(characterDetail.value?.dateOfBirth))
const appearances = computed(() => characterDetail.value?.media?.edges ?? [])
const genderLabel = computed(() => characterDetail.value?.gender || null)

// key spoiler: gabungan index baris + index segmen, biar unik walau ada banyak baris
const revealedSpoilers = reactive(new Set())
function toggleSpoiler(key) {
  if (revealedSpoilers.has(key)) revealedSpoilers.delete(key)
  else revealedSpoilers.add(key)
}

onMounted(() => fetchCharacterDetail(route.params.id))
watch(
  () => route.params.id,
  (id) => id && fetchCharacterDetail(id),
)
</script>

<template>
  <!-- SKELETON -->
  <div v-if="loading" class="mx-auto px-4 py-6">
    <div class="flex gap-5">
      <div class="skeleton w-40 h-56 rounded-xl shrink-0" />
      <div class="flex-1 space-y-3 pt-2">
        <div class="skeleton h-7 w-64 rounded" />
        <div class="skeleton h-3 w-full rounded" />
        <div class="skeleton h-3 w-5/6 rounded" />
        <div class="skeleton h-3 w-3/4 rounded" />
      </div>
    </div>
  </div>

  <!-- ERROR -->
  <div v-else-if="error" class="mx-auto px-10 py-16 text-center">
    <p class="text-lg font-medium mb-1">Failed to load character details</p>
    <p class="text-sm text-base-content/60 mb-4">
      {{ error.message || 'Something went wrong, please try again.' }}
    </p>
    <button class="btn btn-sm btn-primary" @click="fetchCharacterDetail(route.params.id)">
      Retry
    </button>
  </div>

  <!-- CONTENT -->
  <div v-else-if="characterDetail" class="mx-auto px-4 sm:px-10 py-10">
    <div class="flex flex-col sm:flex-row gap-6 mb-10">
      <img
        :src="characterDetail.image?.large"
        :alt="characterDetail.name?.full"
        class="w-40 sm:w-48 rounded-xl shadow-2xl border border-white/10 shrink-0 aspect-[3/4] object-cover"
      />
      <div class="flex-1 min-w-0">
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <span v-if="characterDetail.favourites" class="badge badge-secondary gap-1">
            <Heart class="w-3 h-3" /> {{ characterDetail.favourites }}
          </span>
          <span v-if="genderLabel" class="badge badge-outline">{{ genderLabel }}</span>
          <span v-if="characterDetail.bloodType" class="badge badge-outline">
            Blood Type {{ characterDetail.bloodType }}
          </span>
        </div>

        <h1 class="text-2xl md:text-3xl font-bold leading-tight mb-1">
          {{ characterDetail.name?.full }}
        </h1>
        <p v-if="characterDetail.name?.native" class="text-base text-base-content/60 mb-1">
          {{ characterDetail.name.native }}
        </p>
        <p
          v-if="characterDetail.name?.alternative?.length"
          class="text-sm text-base-content/50 mb-3"
        >
          Also known as: {{ characterDetail.name.alternative.filter(Boolean).join(', ') }}
        </p>

        <p v-if="birthDate" class="text-base text-base-content/70 mb-3">
          Birthday: {{ birthDate }}
        </p>
      </div>
    </div>

    <!-- Biography -->
    <div v-if="bioLines.length" class="mb-10">
      <h2 class="text-lg font-semibold mb-4">Biography</h2>
      <ul class="list-disc list-inside space-y-2.5 text-justify">
        <li
          v-for="(segments, lineIdx) in bioLines"
          :key="lineIdx"
          class="text-base leading-relaxed text-base-content/80"
        >
          <template v-for="(seg, segIdx) in segments" :key="segIdx">
            <strong v-if="seg.type === 'bold'">{{ seg.content }}</strong>

            <span
              v-else-if="seg.type === 'spoiler'"
              class="rounded px-1 cursor-pointer transition-colors"
              :class="
                revealedSpoilers.has(`${lineIdx}-${segIdx}`)
                  ? 'bg-transparent'
                  : 'bg-base-300 text-transparent select-none hover:bg-base-content/20'
              "
              @click="toggleSpoiler(`${lineIdx}-${segIdx}`)"
            >
              {{ seg.content }}
            </span>

            <a
              v-else-if="seg.type === 'link'"
              :href="seg.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary underline"
              >{{ seg.content }}</a
            >

            <template v-else>{{ seg.content }}</template>
          </template>
        </li>
      </ul>
    </div>

    <!-- Appearances -->
    <div v-if="appearances.length" class="mb-10">
      <h2 class="text-lg font-semibold mb-4">Appearances</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <RouterLink
          v-for="edge in appearances"
          :key="edge.node.id"
          :to="{
            name: edge.node.type === 'MANGA' ? 'DetailManga' : 'DetailAnime',
            params: { id: edge.node.id },
          }"
        >
          <Card
            :id="String(edge.node.id)"
            :title="edge.node.title?.romaji"
            :image="edge.node.coverImage?.large"
            :status="edge.node.status"
            :format="edge.node.format"
            :rating="edge.node.averageScore ? (edge.node.averageScore / 10).toFixed(1) : null"
            :role="edge.characterRole"
          />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
