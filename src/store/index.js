import boardModule from './boardModule'
import gameModule from './gameModule'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    board: boardModule,
    game: gameModule
  }
})

export default store