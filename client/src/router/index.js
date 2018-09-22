import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/layout'
import Users from '@/view/users'
import Tasks from '@/view/tasks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Layout,
      meta: {
        title: '主界面'
      },
      children: [
        {
          path: '/users',
          name: 'users',
          component: Users,
          meta: {
            title: '用户管理',
            show: true,
            icon: '',
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
                icon: '',
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
                icon: '',
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
                icon: '',
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
            title: '任务管理',
            show: true,
            icon: '',
            leaf: false
          },
          children: [
            {
              path: '/tasks/tasklist',
              name: 'taskList',
              component: resolve => {
                require(['@/view/tasks/taskList'], resolve)
              },
              meta: {
                title: '任务列表',
                show: true,
                icon: '',
                leaf: true
              }
            },
            {
              path: '/tasks/tasking',
              name: 'tasking',
              component: resolve => {
                require(['@/view/tasks/tasking'], resolve)
              },
              meta: {
                title: '任务分配',
                show: true,
                icon: '',
                leaf: true
              }
            }
          ]
        }
      ]
    }
  ]
})
