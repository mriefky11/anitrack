import { defineStore } from 'pinia'
import state from './state'
import actions from './action'
import getters from './getter'

export const useCharacterStore = defineStore('character', {
  state,
  actions,
  getters,
})
