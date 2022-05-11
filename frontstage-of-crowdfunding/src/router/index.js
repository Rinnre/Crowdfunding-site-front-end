import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
    path: '/login',
    // 设置路由的名称，命名路由。
    name: 'login',
    component: () => import('@/views/home/components/login')
  },
  {
    path: '/',
    // 设置路由的名称，命名路由。
    name: 'index',
    component: () => import('@/views/home/home')
  },
  {
    path: '/user_index',
    // 设置路由的名称，命名路由。
    name: 'user',
    component: () => import('@/views/user')
  }
]

const router = new VueRouter({
  routes
})

export default router
