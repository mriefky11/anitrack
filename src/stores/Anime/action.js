import api from '@/api'

export default {
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

  async fetchTopAnime({ limit = 10, page = 1 } = {}) {
    this.loading = true
    this.error = null

    try {
      const { items, pageInfo } = await api.Anime.getTopAnime(limit, page)
      this.animeList = items
      this.animePageInfo = pageInfo
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

  async fetchWeeklySchedule(weekStart, weekEnd) {
    this.loading = true
    this.error = null
    try {
      const res = await api.Anime.getWeeklySchedule(weekStart, weekEnd)
      this.weeklySchedule = res
    } catch (err) {
      console.error(err)
    } finally {
      this.loading = false
    }
  },

  async searchAnime(keyword) {
    this.loading = true
    this.error = null
    try {
      this.animeList = await api.Anime.searchAnime(keyword, 10)
      this.animePageInfo = null
    } catch (err) {
      this.error = err
      console.error(err)
    } finally {
      this.loading = false
    }
  },
}
