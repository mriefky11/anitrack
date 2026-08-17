import AppLayout from '@/components/Layouts/AppLayout.vue'
import DetailCharacter from '@/pages/Character/Detail/index.vue'

export default [
  {
    path: '/character',
    component: AppLayout,
    children: [
      {
        path: 'detail/:id',
        name: 'DetailCharacter',
        component: DetailCharacter,
      },
    ],
  },
]
