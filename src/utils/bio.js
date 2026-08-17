/**
 * Parses AniList-flavored markdown (bold __x__, spoiler ~!x!~, link [x](url))
 * into an array of segments Vue can render safely without v-html.
 */
export function parseBio(raw = '') {
  if (!raw) return []

  const tokens = []
  const pattern = /__(.+?)__|~!(.+?)!~|\[(.+?)\]\((.+?)\)/g
  let lastIndex = 0
  let match

  while ((match = pattern.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', content: raw.slice(lastIndex, match.index) })
    }
    if (match[1] !== undefined) {
      tokens.push({ type: 'bold', content: match[1] })
    } else if (match[2] !== undefined) {
      tokens.push({ type: 'spoiler', content: match[2] })
    } else if (match[3] !== undefined) {
      tokens.push({ type: 'link', content: match[3], url: match[4] })
    }
    lastIndex = pattern.lastIndex
  }

  if (lastIndex < raw.length) {
    tokens.push({ type: 'text', content: raw.slice(lastIndex) })
  }

  return tokens
}
