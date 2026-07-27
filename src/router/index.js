import { createRouter, createWebHistory } from 'vue-router'
import animeRoutes from '@router/list/anime/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // { path: '/', name: 'Home', component: Home },
    // { path: '/login', name: 'Login', component: Login },
    ...animeRoutes,
  ],
})

export default router
