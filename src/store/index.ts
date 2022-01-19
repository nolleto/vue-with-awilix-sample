import { StoreData } from './Store'
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store<StoreData>({
  modules
})

export default store
