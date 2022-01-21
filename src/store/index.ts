import { StoreData } from './Store'
import Vue from 'vue'
import Vuex from 'vuex'
import { plugin as containerPlugin } from './modules/container'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store<StoreData>({
  modules,
  plugins: [containerPlugin]
})

export default store
