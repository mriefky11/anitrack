import api from '@/api'

export default {
  async fetchAnimeList(params = {}) {
    this.loading = true
    this.error = null

    try {
      const res = await api.Anime.getList(params)
      this.animeList = res
    } catch (err) {
      this.error = err
      console.error(err)
    } finally {
      this.loading = false
    }
  },

  async fetchAnimeDetail(id) {
    this.loading = true
    this.error = null

    try {
      const res = await api.Anime.getAnimeDetail(id)

      this.animeDetail = res
    } catch (err) {
      this.error = err
      console.error(err)
    } finally {
      this.loading = false
    }
  },

  async fetchTopAnime(params = {}) {
    this.loading = true
    this.error = null

    try {
      const res = await api.Anime.getTopAnime(params)
      this.animeList = res
    } catch (err) {
      this.error = err
      console.error(err)
    } finally {
      this.loading = false
    }
  },

  async fetchSeasonalAnime(year, season, page = 1) {
    this.loading = true
    this.error = null
    try {
      const { items, pageInfo } = await api.Anime.getSeasonalAnime(year, season, page)
      this.seasonalList = items
      this.seasonalPageInfo = pageInfo
    } catch (err) {
      this.error = err
    } finally {
      this.loading = false
    }
  },
}
