const WEEK_IN_SECONDS = 7 * 24 * 60 * 60

export function getNextAiringTime(airingAt, nowSeconds) {
  let next = airingAt
  while (next <= nowSeconds) {
    next += WEEK_IN_SECONDS
  }
  return next
}

export function hasAired(airingAt, nowSeconds) {
  return airingAt <= nowSeconds
}

export function getCountdownParts(airingAt, nowSeconds) {
  if (!airingAt) return null

  const next = getNextAiringTime(airingAt, nowSeconds)
  const diff = Math.max(0, next - nowSeconds)

  return {
    days: Math.floor(diff / 86400),
    hours: Math.floor((diff % 86400) / 3600),
    minutes: Math.floor((diff % 3600) / 60),
    seconds: Math.floor(diff % 60),
  }
}
