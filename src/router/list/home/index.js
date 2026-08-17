import AppLayout from '@/components/Layouts/AppLayout.vue'
import Home from '@/pages/Home/index.vue'

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
    ],
  },
]
