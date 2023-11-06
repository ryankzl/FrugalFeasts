import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Location from '../views/Location.vue';

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
    	path: '/auth',
        name: 'Auth',
        component: () => import("../views/Auth.vue")
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
      path: '/Location/:postalCode',
      name: 'Location',
      component: () => import("../views/Location.vue"),
      props: true,
    },
 
  ]
})

export default router
