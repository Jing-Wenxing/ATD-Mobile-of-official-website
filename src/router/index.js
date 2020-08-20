import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/Home')
  },
  {
    path: '/association',
    name: 'Association',
    component: () => import('../views/Association/Association')
  },
  {
    path: '/service',
    name: 'Service',
    component: () => import('../views/Service/Service')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/Shop/Shop')
  },
  // 个人页面
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('../views/Personal/Personal')
  },
  // 个人页面 - 账户状态
  {
    path: '/personal/login',
    name: 'Login',
    component: () => import('../views/Personal/Login')
  },
  {
    path: '/personal/register',
    name: 'Register',
    component: () => import('../views/Personal/Register')
  },
  {
    path: '/personal/forget',
    name: 'Forget',
    component: () => import('../views/Personal/Forget')
  },
  // 个人页面 - 账户状态
  {
    path: '/personal/level',
    name: 'Level',
    component: () => import('../views/Personal/page/Level')
  },
]

const router = new VueRouter({
  routes
})

export default router