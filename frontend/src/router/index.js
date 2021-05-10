import Vue from 'vue'
import VueRouter from 'vue-router'
import Results from '../views/Results.vue'
import Stats from '../views/Stats.vue'
import Settings from '../views/Settings.vue'
import Dashboard from '../views/Dashboard.vue'
import FileExplorer from '../views/FileExplorer.vue'

import UserResult from '@/components/Results/UserResult'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard
    // component: () => import(/* webpackChunkName: "about" */ '../views/Results.vue')
  },
  {
    path: '/results',
    name: 'Results',
    component: Results
    // component: () => import(/* webpackChunkName: "about" */ '../views/Results.vue')
  },
  {
    path: '/results/:username',
    name: 'User Results',
    component: Results,
    props: true
    // component: () => import(/* webpackChunkName: "about" */ '../views/Results.vue')
  },
  {
    path: '/result/:username',
    name: 'Results routing',
    component: UserResult,
    props: true
    // component: () => import(/* webpackChunkName: "about" */ '../views/Results.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
    // component: () => import(/* webpackChunkName: "about" */ '../views/Results.vue')
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats
    // component: () => import(/* webpackChunkName: "about" */ '../views/Results.vue')
  },
  {
    path: '/explorer',
    name: 'Explorer',
    component: FileExplorer
    // component: () => import(/* webpackChunkName: "about" */ '../views/Results.vue')
  },
]

const router = new VueRouter({
  routes
})

import store from '@/store/index.js'
import markerAPI from '@/lib/marker/API'

router.beforeEach(async (to, from, next) => {
  if (to.path == "/explorer") next()

  if (!store.state.markerState.loaded) {
    await store.dispatch('fetchMarkerState',
      () => markerAPI.getMarkerState()
    );
  } 
  
  if (!store.state.markerState.valid) next('/explorer')
  else next();
})

export default router
