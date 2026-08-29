import AppLayout from '@/components/Layouts/AppLayout.vue'
import Seasonal from '@/pages/Anime/Seasonal/index.vue'
import DetailAnime from '@/pages/Anime/Detail/index.vue'
import Schedule from '@/pages/Anime/Schedule/index.vue'
import ListAnime from '@/pages/Anime/List/index.vue'

export default [
  {
    path: '/anime',
    component: AppLayout,
    children: [
      {
        path: 'seasonal',
        name: 'Seasonal',
        component: Seasonal,
      },
      {
        path: 'schedule',
        name: 'Schedule',
        component: Schedule,
      },
      {
        path: `detail/:id`,
        name: 'DetailAnime',
        component: DetailAnime,
      },
      {
        path: 'list',
        name: 'ListAnime',
        component: ListAnime,
      },
    ],
  },
]
