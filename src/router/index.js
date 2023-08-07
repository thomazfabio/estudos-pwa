import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Account from '../views/Account.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import store from '../store/index'
import { firebaseApp } from '../plugins/firebase'



Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/register',
    name: 'register',
    component: Register,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {

  await firebaseApp.auth().onAuthStateChanged((user) => {

    if (!user && to.meta.requiresAuth == true && to.name !== 'login') {
      next({ name: 'login' })
    } else next(store.dispatch("currentUser", user), store.dispatch("isSpinnerVisible", false))
  });
})

export default router
