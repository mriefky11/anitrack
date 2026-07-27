import api from '@/api'

export default {
  async fetchAnimeList(params = {}) {
    this.loading = true
    this.error = null

    try {
      const res = await api.Anime.getList(params)
      this.animeList = res.data.data
    } catch (err) {
      this.error = err
    } finally {
      this.loading = false
    }
  },

  async fetchAnimeDetail(id) {
    this.loading = true
    this.error = null

    try {
      const res = await api.Anime.getById(id)

      this.animeDetail = res.data.data
    } catch (err) {
      this.error = err
    } finally {
      this.loading = false
    }
  },

  async fetchTopAnime(params = {}) {
    this.loading = true
    this.error = null

    try {
      const res = await api.Anime.getTop(params)
      this.animeList = res.data.data
    } catch (err) {
      this.error = err
    } finally {
      this.loading = false
    }
  },
}
