import api from '@/api'

export default {
  async fetchTopCharacter(params = {}) {
    this.loading = true
    this.error = null

    try {
      const res = await api.Character.getTop(params)
      this.characterList = res
    } catch (err) {
      this.error = err
      console.error(err)
    } finally {
      this.loading = false
    }
  },

  async fetchCharacterDetail(id) {
    this.loading = true
    this.error = null
    try {
      const res = await api.Character.getDetail(id)
      this.characterDetail = res
    } catch (err) {
      this.error = err
      console.error(err)
    } finally {
      this.loading = false
    }
  },
}
