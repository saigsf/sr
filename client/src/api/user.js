import * as API from './index'

export default {
  // 用户登陆
  login: params => {
    return API.POST('/shengruiweb/user/login', params)
  },
  // 获取用户列表
  getUser: params => {
    return API.GET('/shengruiweb/sysuser/pageQuery', params)
  },
  // 修改用户信息
  updateUser: params => {
    return API.GET('/shengruiweb/sysuser/upadte', params)
  },
  // 删除用户信息
  deleteUser: params => {
    return API.GET('/shengruiweb/sysuser/delete', params)
  },
  // 添加用户信息
  saveUser: params => {
    return API.POST('/shengruiweb/sysuser/save', params)
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
