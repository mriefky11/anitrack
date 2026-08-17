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
      console.error(err)
    } finally {
      this.loading = false
    }
  },

  async fetchDetailManga(params = {}) {
    this.loading = true
    this.error = null

    try {
      const res = await api.Manga.getMangaDetail(params)
      this.mangaDetail = res
    } catch (err) {
      this.error = err
      console.error(err)
    } finally {
      this.loading = false
    }
  },
}
