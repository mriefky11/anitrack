import { createRouter, createWebHistory } from 'vue-router'
import animeRoutes from '@router/list/anime/index'
import mangaRoutes from '@/router/list/manga/index'
import homeRoutes from '@/router/list/home/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...animeRoutes, ...mangaRoutes, ...homeRoutes],
})

export default router
