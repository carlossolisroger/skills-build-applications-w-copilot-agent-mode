export function formatReference(value) {
  if (value == null || value === '') {
    return '-'
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value)
  }

  if (typeof value === 'object') {
    return String(value.name ?? value.title ?? value.email ?? value._id ?? value.id ?? '-')
  }

  return '-'
}

export function formatDate(value) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleDateString()
}
