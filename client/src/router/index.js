import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/layout'
import Login from '@/view/login'
import Users from '@/view/users'
import Tasks from '@/view/tasks'
import Mes from '@/view/mes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '盛瑞后台管理-登录'
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Layout,
      meta: {
        title: '盛瑞后台管理'
      },
      redirect: '/mes',
      children: [
        {
          path: '/mes',
          name: 'mes',
          component: Mes,
          meta: {
            title: 'MES对接',
            show: true,
            icon: 'icon icon-mes',
            leaf: false
          }
        },
        {
          path: '/users',
          name: 'users',
          component: Users,
          meta: {
            title: '用户管理',
            show: true,
            icon: 'icon icon-user',
            leaf: false
          },
          children: [
            {
              path: '/users/userslist',
              name: 'usersList',
              component: resolve => {
                require(['@/view/users/usersList'], resolve)
              },
              meta: {
                title: '用户列表',
                show: true,
                icon: 'icon icon-dot',
                leaf: true
              }
            },
            {
              path: '/users/roleslist',
              name: 'rolesList',
              component: resolve => {
                require(['@/view/users/rolesList'], resolve)
              },
              meta: {
                title: '角色列表',
                show: true,
                icon: 'icon icon-dot',
                leaf: true
              }
            },
            {
              path: '/users/rightslist',
              name: 'rightsList',
              component: resolve => {
                require(['@/view/users/rightsList'], resolve)
              },
              meta: {
                title: '权限列表',
                show: true,
                icon: 'icon icon-dot',
                leaf: true
              }
            }
          ]
        },
        {
          path: '/tasks',
          name: 'tasks',
          component: Tasks,
          meta: {
            title: '生产管理',
            show: true,
            icon: 'icon icon-product',
            leaf: false
          },
          children: [
            {
              path: '/tasks/carmake',
              name: 'carmake',
              component: resolve => {
                require(['@/view/tasks/carmake'], resolve)
              },
              meta: {
                title: '车企管理',
                show: true,
                icon: 'icon icon-dot',
                leaf: true
              }
            },
            {
              path: '/tasks/tcu',
              name: 'tcu',
              component: resolve => {
                require(['@/view/tasks/tcu'], resolve)
              },
              meta: {
                title: 'TCU管理',
                show: true,
                icon: 'icon icon-dot',
                leaf: true
              }
            },
            {
              path: '/tasks/file',
              name: 'file',
              component: resolve => {
                require(['@/view/tasks/uploadFile'], resolve)
              },
              meta: {
                title: '文件管理',
                show: true,
                icon: 'icon icon-dot',
                leaf: true
              }
            },
            {
              path: '/tasks/project',
              name: 'project',
              component: resolve => {
                require(['@/view/tasks/project'], resolve)
              },
              meta: {
                title: '项目管理',
                show: true,
                icon: 'icon icon-dot',
                leaf: true
              }
            },
            {
              path: '/tasks/project/:id',
              name: 'projectDetail',
              component: resolve => {
                require(['@/view/tasks/projectDetail'], resolve)
              },
              meta: {
                title: '项目详情',
                show: false,
                icon: 'icon icon-dot',
                leaf: true
              }
            },
            {
              path: '/tasks/tasklist',
              name: 'taskList',
              component: resolve => {
                require(['@/view/tasks/taskList'], resolve)
              },
              meta: {
                title: '任务管理',
                show: true,
                icon: 'icon icon-dot',
                leaf: true
              }
            },
            {
              path: '/tasks/productionLog',
              name: 'productionLog',
              component: resolve => {
                require(['@/view/tasks/productionLog'], resolve)
              },
              meta: {
                title: '生产日志',
                show: true,
                icon: 'icon icon-dot',
                leaf: true
              }
            },
            {
              path: '/tasks/operationLog',
              name: 'operationLog',
              component: resolve => {
                require(['@/view/tasks/operationLog'], resolve)
              },
              meta: {
                title: '操作日志',
                show: true,
                icon: 'icon icon-dot',
                leaf: true
              }
            }
          ]
        }
      ]
    }
  ]
})
