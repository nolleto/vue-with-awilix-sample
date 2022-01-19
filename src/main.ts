import App from './App.vue'
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
