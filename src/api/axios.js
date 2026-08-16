import axios from 'axios'
import rateLimit from 'axios-rate-limit'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ANILIST_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// AniList: 90 request/menit ≈ 1.5 request/detik, kita ambil konservatif
const http = rateLimit(axiosInstance, {
  maxRequests: 1,
  perMilliseconds: 700,
})

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config
    if (error.response?.status === 429 && !config._retry) {
      config._retry = true
      const retryAfter = Number(error.response.headers['retry-after']) || 5
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000))
      return http(config)
    }
    console.error('AniList API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  },
)

// helper: semua request AniList selalu POST ke '' dengan {query, variables}
export const gql = (query, variables = {}) =>
  http.post('', { query, variables }).then((res) => {
    if (res.data.errors) throw new Error(res.data.errors[0].message)
    return res.data.data
  })

export default http
