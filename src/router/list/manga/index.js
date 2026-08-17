import AppLayout from '@/components/Layouts/AppLayout.vue'
import DetailManga from '@/pages/Manga/Detail/index.vue'

export default [
  {
    path: '/manga',
    component: AppLayout,
    children: [
      {
        path: 'detail/:id',
        name: 'DetailManga',
        component: DetailManga,
      },
    ],
  },
]
