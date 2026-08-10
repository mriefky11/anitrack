import api from '@/api'

export default {
  async fetchTopCharacter(params = {}) {
    this.loading = true
    this.error = null

    try {
      const res = await api.Character.getTop(params)
      this.characterList = res.data.data
    } catch (err) {
      this.error = err
    } finally {
      this.loading = false
    }
  },
}
