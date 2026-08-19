function removeTrailingSlash(value) {
  return value.replace(/\/$/, '')
}

const mode = import.meta.env.VITE_API_MODE || 'mock'
const appBase = removeTrailingSlash(import.meta.env.BASE_URL || '')

export default {
  mode,
  isMock: mode === 'mock',
  baseURL: mode === 'mock'
    ? `${appBase}/api`
    : removeTrailingSlash(import.meta.env.VITE_API_BASE_URL || '')
}
