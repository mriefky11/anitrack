<script setup>
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Number, String, Date, Array, Object],
    default: null,
  },
  mode: {
    type: String,
    default: 'date', // 'date' | 'range' | 'month' | 'year'
    validator: (val) => ['date', 'range', 'month', 'year'].includes(val),
  },
  minDate: { type: Date, default: null },
  maxDate: { type: Date, default: null },
})

const emit = defineEmits(['update:modelValue', 'cleared'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

// map mode -> props yang perlu di-pass ke VueDatePicker
const modeProps = computed(() => {
  switch (props.mode) {
    case 'range':
      return { range: true }
    case 'month':
      return { monthPicker: true }
    case 'year':
      return { yearPicker: true }
    default:
      return {}
  }
})
</script>

<template>
  <VueDatePicker
    v-model="value"
    v-bind="modeProps"
    :clearable="false"
    :min-date="minDate"
    :max-date="maxDate"
    @cleared="$emit('cleared')"
    auto-apply
  />
</template>
