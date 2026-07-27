import axios from 'axios'
import rateLimit from 'axios-rate-limit'

/**
 * Gabungkan base URL + version dari .env
 * Contoh hasil:
 * https://api.jikan.moe/v4
 */
const baseURL = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_API_VERSION

/**
 * Buat instance axios
 * Tujuannya supaya semua request konsisten (baseURL, timeout, dll)
 */
const axiosInstance = axios.create({
  baseURL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
})

/**
 * Bungkus axios dengan rate limiter
 * Jikan limit kira-kira 2 request per detik
 */
const http = rateLimit(axiosInstance, {
  maxRequests: 2, // max 2 request
  perMilliseconds: 1000, // per 1 detik
})

/**
 * Response interceptor
 * Handle error global (terutama rate limit 429)
 */
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config

    /**
     * Kalau kena rate limit (429)
     * retry otomatis setelah delay
     */
    if (error.response?.status === 429 && !config._retry) {
      config._retry = true

      // delay 1 detik sebelum retry
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return http(config)
    }

    /**
     * Optional: logging error biar gampang debug
     */
    console.error('API Error:', error.response || error.message)

    return Promise.reject(error)
  },
)

export default http
