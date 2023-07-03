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
<<<<<<< HEAD
      path: '/student',
      children: [
        {
          path: '',
          component: () => import('../views/student/StudentHomeView.vue')
        },
        {
          path: 'course',
          component: () => import('../views/student/StudentCourseView.vue')
        },
        {
          path: 'exam',
          component: () => import('../views/student/StudentExamView.vue')
        },
        {
          path: 'game',
          component: () => import('../views/student/StudentGameView.vue')
        }
      ]
    },
    {
      path: '/teacher',
      name: 'teacher',
      // redirect: (to => {return {path: '/teacher/mycourse'}}),
      component: () => import('../views/teacher/TeacherHomeView.vue'),
      children: [
        {
          path: '/teacher/infomation',
          name: 'info',
          component: () => import('../views/teacher/Infomation.vue')
        },
        {
          path: '/teacher/infoEdit',
          name: 'infoEdit',
          component: () => import('../views/teacher/InformationEdit.vue')
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
=======
      path: '/admin',
      name: 'admin',
      component: ()=> import('../views/admin/AdminHomeView.vue')
>>>>>>> a93fd01d47efaffad07e492688a41bac2f668c73
    }
  ]
})

export default router
