import { StoreData } from './Store'
import Vue from 'vue'
import Vuex from 'vuex'
import { plugin as containerPlugin } from './modules/container'
import modules from './modules'
import { plugin as sourceCodeInfoPlugin } from './modules/sourceCode/info'

Vue.use(Vuex)

const store = new Vuex.Store<StoreData>({
  modules,
  plugins: [sourceCodeInfoPlugin, containerPlugin]
})

export default store
