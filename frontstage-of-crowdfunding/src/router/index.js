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
    path: '/user',
    // 设置路由的名称，命名路由。
    name: 'user',
    redirect:"/user/index",
    component: () => import('@/views/user'),
    children:[
      {
        path: '/user/index',
        // 设置路由的名称，命名路由。
        name: 'user_index',
        component: () => import('@/views/user/components/user_index'),
      },{
        path: '/user/dynamic',
        // 设置路由的名称，命名路由。
        name: 'user_dynamic',
        component: () => import('@/views/user/components/user_dynamic'),
      },{
        path: '/user/info',
        // 设置路由的名称，命名路由。
        name: 'user_info',
        component: () => import('@/views/user/components/user_info'),
      },{
        path: '/user/address',
        // 设置路由的名称，命名路由。
        name: 'user_addresss',
        component: () => import('@/views/user/components/user_address'),
      },
    ]
  },
  {
    path: '/project/list',
    // 设置路由的名称，命名路由。
    name: 'project_list',
    component: () => import('@/views/project')
  },
]

const router = new VueRouter({
  routes
})

export default router
