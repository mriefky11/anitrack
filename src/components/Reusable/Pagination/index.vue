<script setup>
defineProps({
  pageInfo: Object, // { currentPage, hasNextPage }
})
const emit = defineEmits(['prev', 'next'])
</script>

<template>
  <div v-if="pageInfo" class="flex items-center justify-center gap-3 mt-8">
    <button class="btn btn-sm" :disabled="pageInfo.currentPage <= 1" @click="emit('prev')">
      Previous
    </button>
    <span class="text-sm text-base-content/60">Page {{ pageInfo.currentPage }}</span>
    <button class="btn btn-sm" :disabled="!pageInfo.hasNextPage" @click="emit('next')">Next</button>
  </div>
</template>
