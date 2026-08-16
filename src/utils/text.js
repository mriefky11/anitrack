export function cleanDescription(text = '') {
  if (!text) return ''
  return text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/\(Source:.*?\)/gi, '')
    .replace(/\n{2,}/g, '\n')
    .trim()
}
