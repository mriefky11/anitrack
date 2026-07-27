import { defineStore } from 'pinia'
import state from './state'
import actions from './action'
import getters from './getter'

export const useAnimeStore = defineStore('anime', {
  state,
  actions,
  getters,
})
