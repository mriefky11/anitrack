import api from '@/api'

export default {
  async fetchTopManga(params = {}) {
    this.loading = true
    this.error = null

    try {
      const res = await api.Manga.getTopManga(params)
      this.mangaList = res
    } catch (err) {
      this.error = err
    } finally {
      this.loading = false
    }
  },
}
