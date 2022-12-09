import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Rank from '../views/Rank.vue'
import Video from '../views/Video.vue'

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
  },
  {
    path: '/video',
    name: 'Video',
    component: Video
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
