<script setup>
import { Star } from '@lucide/vue'
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  items: Array,
  loading: { type: Boolean, default: false },
})

const current = ref(0)
let interval = null

const next = () => {
  if (!props.items?.length) return
  current.value = (current.value + 1) % props.items.length
}
const goTo = (index) => {
  current.value = index
  resetInterval()
}
const resetInterval = () => {
  clearInterval(interval)
  interval = setInterval(next, 7000)
}

onMounted(() => {
  interval = setInterval(next, 7000)
})
onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <!-- SKELETON -->
  <div
    v-if="loading"
    class="relative w-full rounded-2xl overflow-hidden bg-base-200"
    style="height: 420px"
  >
    <div class="skeleton w-full h-full" />
    <div class="absolute bottom-10 left-10 flex gap-6 items-center">
      <div class="skeleton h-64 w-44 rounded-xl shrink-0" />
      <div class="flex flex-col gap-3">
        <div class="skeleton h-4 w-24 rounded" />
        <div class="skeleton h-7 w-64 rounded" />
        <div class="skeleton h-3 w-80 rounded" />
        <div class="skeleton h-3 w-72 rounded" />
        <div class="skeleton h-3 w-60 rounded" />
        <div class="skeleton h-8 w-28 rounded-full mt-2" />
      </div>
    </div>
  </div>

  <!-- CONTENT -->
  <div v-else class="relative w-full overflow-hidden rounded-2xl bg-base-300" style="height: 420px">
    <div class="absolute inset-0 bg-gradient-to-r from-base-300/90 via-base-300/50 to-transparent">
      <img
        :src="items[current]?.image"
        class="w-full h-full object-cover scale-110 blur-md opacity-30 transition-all duration-700"
      />
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

    <div
      class="relative z-10 flex h-full transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${current * 100}%)` }"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="w-full h-full flex-shrink-0 flex items-center px-10 gap-8"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="h-64 w-44 object-cover rounded-xl shadow-2xl flex-shrink-0 border border-white/10"
        />
        <div class="text-white">
          <div v-if="item.rating" class="mb-3">
            <span class="flex items-center gap-1 badge badge-warning font-bold">
              <Star class="w-3 h-3" /> {{ item.rating }}
            </span>
          </div>
          <h2 class="text-3xl font-extrabold leading-tight mb-3 drop-shadow text-base-content">
            {{ item.title }}
          </h2>
          <p class="text-md leading-relaxed line-clamp-4 text-base-content/70">
            {{ item.description }}
          </p>
          <RouterLink :to="{ name: 'DetailAnime', params: { id: item.id } }">
            <button class="mt-5 btn btn-sm btn-primary rounded-full px-6">View Detail →</button>
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
      <button
        v-for="(_, i) in items"
        :key="i"
        @click="goTo(i)"
        class="h-1.5 rounded-full transition-all duration-300 bg-base-content"
        :class="i === current ? 'w-6 opacity-100' : 'w-2 opacity-40'"
      />
    </div>
  </div>
</template>
