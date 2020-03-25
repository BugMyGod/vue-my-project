import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
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
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/mind',
    component: Layout,
    redirect: '/mind/kityminderCode',
    name: 'Mind',
    meta: { title: '脑图', icon: 'example' },
    children: [
      {
        path: 'kityminderCode',
        name: 'kityminderCode',
        component: () => import('@/views/mind/kityminderCode/index'),
        meta: { title: 'kityminderCode', icon: 'table' }
      },
      {
        path: 'gojs',
        name: 'GoJs',
        component: () => import('@/views/mind/gojs/index'),
        meta: { title: 'GoJs', icon: 'tree' }
      },
      {
        path: 'd3js',
        name: 'D3js',
        component: () => import('@/views/mind/d3js/index'),
        meta: { title: 'd3Js', icon: 'tree' }
      },
      {
        path: 'joint',
        name: 'Joint',
        component: () => import('@/views/mind/joint/index'),
        meta: { title: 'jointJs', icon: 'tree' }
      }
    ]
  },
  {
    path: '/xterm',
    component: Layout,
    children: [{
      path: 'xterm',
      name: 'Xterm',
      component: () => import('@/views/xterm/index'),
      meta: { title: 'xterm', icon: 'dashboard' }
    }]
  },
  {
    path: '/table',
    component: Layout,
    name: 'Table',
    meta: { title: 'Table', icon: 'example' },
    children: [
      {
        path: 'editTable',
        name: 'EditTable',
        component: () => import('@/views/table/editTable/index'),
        meta: { title: '可编辑table', icon: 'table' }
      },
      {
        path: 'fixedTable',
        name: 'FixedTable',
        component: () => import('@/views/table/fixedTable/index'),
        meta: { title: '固定表头/列', icon: 'table' }
      },
      {
        path: 'mergeTable',
        name: 'MergeTable',
        component: () => import('@/views/table/mergeTable/index'),
        meta: { title: '合并单元格', icon: 'table' }
      },
      {
        path: 'searchTable',
        name: 'SearchTable',
        component: () => import('@/views/table/searchTable/index'),
        meta: { title: '可搜索table', icon: 'table' }
      },
      {
        path: 'treeTable',
        name: 'TreeTable',
        component: () => import('@/views/table/treeTable/index'),
        meta: { title: '树table', icon: 'table' }
      }
    ]
  },
  {
    path: '/tree',
    component: Layout,
    children: [{
      path: 'tree',
      name: 'Tree',
      component: () => import('@/views/tree/index'),
      meta: { title: 'Tree', icon: 'dashboard' }
    }]
  },
  {
    path: '/list',
    component: Layout,
    children: [{
      path: 'dragList',
      name: 'DragList',
      component: () => import('@/views/list/dragList/index'),
      meta: { title: '拖拽列表', icon: 'dashboard' }
    }]
  },
  {
    path: '/echarts',
    component: Layout,
    name: 'Echarts',
    meta: { title: 'Echarts', icon: 'example' },
    children: [
      {
        path: 'line',
        name: 'Line',
        component: () => import('@/views/echarts/line/index'),
        meta: { title: '折线图', icon: 'dashboard' }
      },
      {
        path: 'bar',
        name: 'Bar',
        component: () => import('@/views/echarts/bar/index'),
        meta: { title: '柱状图', icon: 'dashboard' }
      },
      {
        path: 'pie',
        name: 'Pie',
        component: () => import('@/views/echarts/pie/index'),
        meta: { title: '饼图', icon: 'dashboard' }
      },
      {
        path: 'radar',
        name: 'Radar',
        component: () => import('@/views/echarts/radar/index'),
        meta: { title: '雷达图', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/file',
    component: Layout,
    name: 'File',
    meta: { title: 'File', icon: 'example' },
    children: [
      {
        path: 'download',
        name: 'Download',
        component: () => import('@/views/file/download/index'),
        meta: { title: '下载', icon: 'dashboard' }
      },
      {
        path: 'export',
        name: 'Export',
        component: () => import('@/views/file/export/index'),
        meta: { title: '导出', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/picture',
    component: Layout,
    children: [{
      path: 'carouselPicture',
      name: 'CarouselPicture',
      component: () => import('@/views/picture/carouselPicture/index'),
      meta: { title: '带缩略图轮播', icon: 'dashboard' }
    }]
  },
  {
    path: '/canvas',
    component: Layout,
    children: [{
      path: 'canvas',
      name: 'Canvas',
      component: () => import('@/views/canvas/index'),
      meta: { title: 'canvas', icon: 'dashboard' }
    }]
  },
  {
    path: '/animation',
    component: Layout,
    children: [{
      path: 'animation',
      name: 'Animation',
      component: () => import('@/views/animation/index'),
      meta: { title: 'animation', icon: 'dashboard' }
    }]
  },
  {
    path: '/websocket',
    component: Layout,
    children: [{
      path: 'websocket',
      name: 'Websocket',
      component: () => import('@/views/websocket/index'),
      meta: { title: 'Websocket', icon: 'dashboard' }
    }]
  },
  {
    path: '/mouseEvent',
    component: Layout,
    children: [{
      path: 'mouseEvent',
      name: 'MouseEvent',
      component: () => import('@/views/mouseEvent/index'),
      meta: { title: '鼠标事件', icon: 'dashboard' }
    }]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
