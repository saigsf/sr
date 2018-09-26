import * as API from './index'

export default {
  // 获取用户列表
  getUserList: params => {
    return API.GET('/api/users/getList', params)
  },
  // 修改用户信息
  updateUserInfo: params => {
    return API.GET('/api/users/update', params)
  },
  // 删除用户信息
  deleteUser: params => {
    return API.GET('/api/users/deleteById', params)
  },
  // 添加用户信息
  addUser: params => {
    return API.POST('/api/users/add', params)
  },
  // 获取角色列表
  getRoleList: params => {
    return API.GET('', params)
  },
  // 修改权限
  updateRoles: params => {
    return API.GET('', params)
  },
  // 添加角色
  addRoles: params => {
    return API.GET('', params)
  },
  // 删除角色
  deleteRoles: params => {
    return API.GET('', params)
  },
  // 获取权限列表
  getRightsList: params => {
    return API.GET('', params)
  },
  // 删除权限
  deleteRights: params => {
    return API.GET('', params)
  }
}
