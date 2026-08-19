<script setup>
defineProps({
  tabs: { type: Array, required: true },
  modelValue: String,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div role="tablist" class="tabs tabs-lift w-full mb-5">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      role="tab"
      class="tab flex-1 gap-1.5"
      :class="{ 'tab-active font-bold': modelValue === tab.key }"
      @click="$emit('update:modelValue', tab.key)"
    >
      <component :is="tab.icon" v-if="tab.icon" class="w-4 h-4" />
      {{ tab.label }}
      <span v-if="tab.count !== undefined" class="opacity-60">({{ tab.count }})</span>
    </button>
  </div>
</template>
