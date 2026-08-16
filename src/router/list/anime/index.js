// router/list/index.js (atau router/index.js)
import AppLayout from '@/components/Layouts/AppLayout.vue'
import Home from '@/pages/Home/index.vue'
import Seasonal from '@/pages/Anime/Seasonal/index.vue'

export default [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: '/seasonal',
        name: 'Seasonal',
        component: Seasonal,
      },
    ],
  },
]
