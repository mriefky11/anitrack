import AppLayout from '@/components/Layouts/AppLayout.vue'
import DetailManga from '@/pages/Manga/Detail/index.vue'
import ReadList from '@/pages/Manga/ReadList/index.vue'
import ListManga from '@/pages/Manga/List/index.vue'

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
      {
        path: 'readlist',
        name: 'Readlist',
        component: ReadList,
      },
      {
        path: 'ListManga',
        name: 'ListManga',
        component: ListManga,
      },
    ],
  },
]
