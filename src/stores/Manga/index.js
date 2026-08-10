import { defineStore } from 'pinia'
import state from './state'
import actions from './action'
import getters from './getter'

export const useMangaStore = defineStore('manga', {
  state,
  actions,
  getters,
})
