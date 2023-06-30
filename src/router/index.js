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
      path: '/register',
      name: 'register',
      component: () => import('../views/login/RegisterView.vue')
    },
    {
      path: '/teacher',
      name: 'teacher',
      // redirect: (to => {return {path: '/teacher/mycourse'}}),
      component: () => import('../views/teacher/TeacherHomeView.vue'),
      children: [
        {
          path: '/teacher/information',
          name: 'information',
          component: () => import('../views/teacher/Information.vue')
        },
        {
          path: '/teacher/mycourse',
          name: 'mycourse',
          component: () => import('../views/teacher/MyCourse.vue')
        },
        {
          path: '/teacher/addcourse',
          name: 'addcourse',
          component: () => import('../views/teacher/Addcourse.vue')
        },
        {
          path: '/teacher/itembank',
          name: 'itembank',
          component: () => import('../views/teacher/Itembank.vue')
        }
      ]
    }
  ]
})

export default router
