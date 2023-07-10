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
        },
        {
          path: 'study',
          component: () => import('../views/student/StudentStudyView.vue')
        },
        {
          path: 'recommend',
          component: () => import('../views/student/StudentRecommendView.vue')
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
          component: () => import('../views/teacher/MyCourseL.vue')
        },
        {
          path: '/teacher/addcourse',
          name: 'addcourse',
          component: () => import('../views/teacher/AddCourse.vue')
        },
        {
          path: '/teacher/coursedetail',
          name: 'coursedetail',
          component: () => import('../views/teacher/CourseDetail.vue')
        },
        {
          path: '/teacher/examdetail',
          name: 'examdetail',
          component: () => import('../views/teacher/ExamDetail.vue')
        },
        {
          path: '/teacher/lecturedetail',
          name: 'lecturedetail',
          component: () => import('../views/teacher/LectureDetail.vue')
        },
        {
          path: '/teacher/itembank',
          name: 'itembank',
          component: () => import('../views/teacher/ItemBank.vue')
        },
        {
          path: '/teacher/addItem',
          name: 'addItem',
          component: () => import('../views/teacher/AddItem.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: ()=> import('../views/admin/AdminHomeView.vue')
    }
  ]
})

export default router
