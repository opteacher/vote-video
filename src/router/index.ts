import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Rank from '../views/Rank.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/vote-video/'),
  routes
})

export default router
