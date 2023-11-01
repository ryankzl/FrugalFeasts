import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/about-us',
      name: 'About-Us',
      component: () => import('../views/About-Us.vue')
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import("../views/Login.vue")
    },

    {
      path: '/game',
      name: 'Game',
      component: () => import("../views/Game.vue")
    },
    
    {
      path: '/Profile',
      name: 'Profile',
      component: () => import("../views/Profile.vue")
    },

    {
      path: '/Location',
      name: 'Location',
      component: () => import("../views/Location.vue")
    },

    {
      path: '/Store',
      name: 'Store',
      component: () => import("../views/Store.vue")
    },
  ]
})

export default router
