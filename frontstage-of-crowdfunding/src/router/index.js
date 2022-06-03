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
    redirect: "/user/index",
    component: () => import('@/views/user'),
    children: [
      {
        path: '/user/index',
        // 设置路由的名称，命名路由。
        name: 'user_index',
        component: () => import('@/views/user/components/user_index'),
      }, {
        path: '/user/dynamic',
        // 设置路由的名称，命名路由。
        name: 'user_dynamic',
        component: () => import('@/views/user/components/user_dynamic'),
      }, {
        path: '/user/info',
        // 设置路由的名称，命名路由。
        name: 'user_info',
        component: () => import('@/views/user/components/user_info'),
      }, {
        path: '/user/address',
        // 设置路由的名称，命名路由。
        name: 'user_addresss',
        component: () => import('@/views/user/components/user_address'),
      }, {
        path: '/user/order',
        // 设置路由的名称，命名路由。
        name: 'user_order',
        component: () => import('@/views/user/components/user_order'),
      }, {
        path: '/user/pro_optimistic',
        // 设置路由的名称，命名路由。
        name: 'user_pro_optimistic',
        component: () => import('@/views/user/components/pro_optimistic'),
      },
      {
        path: '/user/address',
        // 设置路由的名称，命名路由。
        name: 'user_address',
        component: () => import('@/views/user/components/user_address'),
      }, {
        path: '/user/auth',
        // 设置路由的名称，命名路由。
        name: 'user_auth',
        component: () => import('@/views/user/components/user_auth'),
      },
      {
        path: '/user/safe',
        // 设置路由的名称，命名路由。
        name: 'user_safe',
        component: () => import('@/views/user/components/user_safe'),
      },
      {
        path: '/user/project',
        // 设置路由的名称，命名路由。
        name: 'user_project',
        component: () => import('@/views/user/components/user_project'),
      },
    ]
  },
  {
    path: '/project/list',
    // 设置路由的名称，命名路由。
    name: 'project_list',
    component: () => import('@/views/project')
  },
  {
    path: '/project/detail/:id',
    // 设置路由的名称，命名路由。
    name: 'project_detail',
    component: () => import('@/views/project/project_detail')
  },
  {

    path: '/launch/project',
    // 设置路由的名称，命名路由。
    name: 'launch_project',
    component: () => import('@/views/project/launch_project')
  },
  {

    path: '/order/:rewordId',
    // 设置路由的名称，命名路由。
    name: 'order',
    component: () => import('@/views/order')
  },
  {

    path: '/pay/success',
    // 设置路由的名称，命名路由。
    name: 'paySuccess',
    component: () => import('@/views/result/success')
  }, {

    path: '/dynamic',
    // 设置路由的名称，命名路由。
    name: 'dynamic',
    component: () => import('@/views/dynamic')
  },


]

const router = new VueRouter({
  routes
})

export default router
