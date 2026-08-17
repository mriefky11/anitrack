export function formatDate({ day, month, year } = {}) {
  if (!year) return null
  const parts = [String(year)]
  if (month) parts.unshift(String(month).padStart(2, '0'))
  if (day) parts.unshift(String(day).padStart(2, '0'))
  return parts.reverse().join('-')
}

export function formatDateRange(start, end) {
  const startStr = formatDate(start)
  if (!startStr) return null
  const endStr = formatDate(end)
  return `${startStr} - ${endStr ?? 'Ongoing'}`
}

export function formatBirthday({ day, month } = {}) {
  if (!day || !month) return null
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return `${months[month - 1]} ${day}`
}
