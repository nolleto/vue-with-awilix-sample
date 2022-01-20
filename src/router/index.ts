import VueRouter, { RouteConfig } from 'vue-router'

import Home from '../views/Home.vue'
import Vue from 'vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const openExternalLink = (linkUrl: string): void => {
  const newWindowsTab = window.open()

  if (newWindowsTab) {
    newWindowsTab.opener = null
    newWindowsTab.location = linkUrl
  }
}

export { openExternalLink }
export default router
