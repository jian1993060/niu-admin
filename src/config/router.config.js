// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/index/index',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '概括', icon: 'dashboard', permission: ['merchant', 'admin'] },
        hideChildrenInMenu: true,
        children: [
          {
            path: '/index/index',
            name: 'indexIndex',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '首页', keepAlive: true }
          }
        ]
      },
      {
        path: 'member',
        name: 'Member',
        component: RouteView,
        redirect: '/member/member-list',
        meta: { title: '会员管理', icon: 'solution' },
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        children: [
            {
                path: '/member/member-list',
                name: 'MemberMangeList',
                component: () => import('@/views/manage/member-list'),
                meta: { title: '会员管理', keepAlive: true }
            }
        ]
      },
      {
        path: 'order',
        name: 'Order',
        component: RouteView,
        redirect: '/order/order-list',
        meta: { title: '现货订单', icon: 'table' },
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        children: [
            {
                path: '/order/order-list',
                name: 'OrderManageList',
                component: () => import('@/views/manage/order-list'),
                meta: { title: '现货订单', keepAlive: true }
            }
        ]
      },
      {
        path: 'cloudOrder',
        name: 'CloudOrder',
        component: RouteView,
        redirect: '/cloudOrder/cloudOrder-list',
        meta: { title: '挖矿订单', icon: 'table' },
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        children: [
            {
                path: '/cloudOrder/cloudOrder-list',
                name: 'CloudOrderManageList',
                component: () => import('@/views/manage/cloudOrder-list'),
                meta: { title: '挖矿订单', keepAlive: true }
            }
        ]
      },
      {
        path: 'secondOrder',
        name: 'SecondOrder',
        component: RouteView,
        redirect: '/secondOrder/secondOrder-list',
        meta: { title: '秒合约订单', icon: 'table' },
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        children: [
            {
                path: '/secondOrder/secondOrder-list',
                name: 'SecondOrderManageList',
                component: () => import('@/views/manage/secondOrder-list'),
                meta: { title: '秒合约订单', keepAlive: true }
            }
        ]
      },
      {
        path: 'second',
        name: 'Second',
        component: RouteView,
        redirect: '/second/second-list',
        meta: { title: '秒合约产品', icon: 'dollar' },
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        children: [
            {
                path: '/second/second-list',
                name: 'SecondList',
                component: () => import('@/views/manage/second-list'),
                meta: { title: '秒合约产品', keepAlive: true }
            }
        ]
      },
      {
        path: 'cloud',
        name: 'Cloud',
        component: RouteView,
        redirect: '/cloud/cloud-list',
        meta: { title: '云挖矿产品', icon: 'dollar' },
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        children: [
            {
                path: '/cloud/cloud-list',
                name: 'CloudList',
                component: () => import('@/views/manage/cloud-list'),
                meta: { title: '云挖矿产品', keepAlive: true }
            }
        ]
      },
      {
        path: 'stock',
        name: 'Stock',
        component: RouteView,
        redirect: '/stock/stock-list',
        meta: { title: '币种管理', icon: 'dollar' },
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        children: [
            {
                path: '/stock/stock-list',
                name: 'StockList',
                component: () => import('@/views/manage/stock-list'),
                meta: { title: '币种管理', keepAlive: true }
            }
        ]
      },
      {
        path: 'real',
        name: 'Real',
        component: RouteView,
        redirect: '/real/real-list',
        meta: { title: '实名审核', icon: 'dollar' },
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        children: [
            {
                path: '/real/real-list',
                name: 'RealList',
                component: () => import('@/views/manage/real-list'),
                meta: { title: '实名审核', keepAlive: true }
            }
        ]
      },
      {
        path: 'withdraw',
        name: 'Withdraw',
        component: RouteView,
        redirect: '/withdraw/withdraw-list',
        meta: { title: '提现审核', icon: 'dollar' },
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        children: [
            {
                path: '/withdraw/withdraw-list',
                name: 'WithdrawManageList',
                component: () => import('@/views/manage/withdraw-list'),
                meta: { title: '提现审核', keepAlive: true }
            }
        ]
      },
      {
        path: 'recharge',
        name: 'Recharge',
        component: RouteView,
        redirect: '/recharge/recharge-list',
        meta: { title: '充值记录', icon: 'monitor' },
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        children: [
            {
                path: '/recharge/recharge-list',
                name: 'RechargeManageList',
                component: () => import('@/views/manage/recharge-list.vue'),
                meta: { title: '充值记录', keepAlive: true }
            }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
