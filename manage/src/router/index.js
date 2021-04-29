import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: '首页',
      component: () => import('@/views/index/index'),
      meta: { title: '首页', icon: 'el-icon-date' }
    }]
  },
  {
    path: '/goodlist',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'goodlist',
      name: '商品列表',
      component: () => import('@/views/goodList/index'),
      meta: { title: '商品列表', icon: 'el-icon-goods' }
    }]
  },
  {
    path: '/goodsedit',
    component: Layout,
    redirect: '/goodsedit',
    meta: { title: '商品编辑' },
    children: [
      {
        path: 'goodsedit',
        name: '商品编辑',
        component: () => import('@/views/goodList/goodsEdit')
      }]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category',
    children: [{
      path: 'category',
      name: '分类列表',
      component: () => import('@/views/category/index'),
      meta: { title: '分类列表', icon: 'el-icon-more-outline' }
    }]
  },
  {
    path: '/brand',
    component: Layout,
    redirect: '/brand',
    children: [{
      path: 'brand',
      name: '品牌管理',
      component: () => import('@/views/brand/index'),
      meta: { title: '品牌管理', icon: 'el-icon-s-shop' }
    }]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order',
    children: [{
      path: 'order',
      name: '订单管理',
      component: () => import('@/views/order/index'),
      meta: { title: '订单管理', icon: 'el-icon-s-finance' }
    }]
  },
  {
    path: '/topic',
    component: Layout,
    redirect: '/topic',
    children: [{
      path: 'topic',
      name: '专题管理',
      component: () => import('@/views/topic/index'),
      meta: { title: '专题管理', icon: 'el-icon-files' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    children: [{
      path: 'user',
      name: '用户管理',
      component: () => import('@/views/user/index'),
      meta: { title: '用户管理', icon: 'el-icon-user' }
    }]
  },
  {
    path: '/set',
    component: Layout,
    redirect: '/set',
    children: [{
      path: 'set',
      name: '设置',
      component: () => import('@/views/setting/index'),
      meta: { title: '设置', icon: 'el-icon-setting' }
    }]
  },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
