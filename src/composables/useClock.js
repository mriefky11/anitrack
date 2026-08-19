import { ref, onMounted, onUnmounted } from 'vue'

export function useClock(intervalMs = 1000) {
  const now = ref(Math.floor(Date.now() / 1000))
  let timer = null

  onMounted(() => {
    timer = setInterval(() => {
      now.value = Math.floor(Date.now() / 1000)
    }, intervalMs)
  })
  onUnmounted(() => clearInterval(timer))

  return now
}
