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
