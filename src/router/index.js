import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/',
      name: 'test',
      component: () => import('../views/TestView.vue')
    },
    {
      path: '/login',
      component: () => import('../views/login/LoginView.vue')
    },
    {
      path: '/student',
      children: [
        {
          path: '',
          component: () => import('../views/student/StudentHomeView.vue'),
        },
        {
          path: 'course',
          component: () => import('../views/student/StudentCourseView.vue'),
        }
      ]
    }
  ]
})

export default router
