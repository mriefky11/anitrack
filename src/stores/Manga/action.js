import api from '@/api'

export default {
  async fetchTopManga({ limit = 10, page = 1 } = {}) {
    this.loading = true
    this.error = null
    try {
      const { items, pageInfo } = await api.Manga.getTopManga(limit, page)
      this.mangaList = items
      this.mangaPageInfo = pageInfo
    } catch (err) {
      this.error = err
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

  async searchManga(keyword, { limit = 10, page = 1 } = {}) {
    this.loading = true
    this.error = null
    try {
      const { items, pageInfo } = await api.Manga.searchManga(keyword, limit, page)
      this.mangaList = items
      this.mangaPageInfo = pageInfo
    } catch (err) {
      this.error = err
    } finally {
      this.loading = false
    }
  },

  toggle(manga) {
    const idx = this.readlist.findIndex((f) => f.id === manga.id)
    if (idx === -1) {
      this.readlist.push(manga)
    } else {
      this.readlist.splice(idx, 1)
    }
    localStorage.setItem('readlist', JSON.stringify(this.readlist))
  },

  isFavorited(id) {
    return this.readlist.some((f) => f.id === id)
  },

  clearAll() {
    this.readlist = []
    localStorage.removeItem('readlist')
  },
}
