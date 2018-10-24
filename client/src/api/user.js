import * as API from './index'

export default {
  // 用户登陆
  login: params => {
    return API.POST('/shengruiweb/user/login', params)
  },
  // 用户注销
  logout: params => {
    return API.POST('/shengruiweb/user/logout', params)
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
  // 获取角色绑定列表
  getUserAndRoles: params => {
    return API.GET('/shengruiweb/sysuser/getRoleDto', params)
  },
  // 获取角色绑定列表
  setUserBindRole: params => {
    return API.POST('/shengruiweb/sysuser/userBindRole', params)
  },
  // 获取角色列表
  getRoles: params => {
    return API.GET('/shengruiweb/sysrole/pageQuery', params)
  },
  // 修改权限
  updateRoles: params => {
    return API.POST('/shengruiweb/sysrole/update', params)
  },
  // 添加角色
  saveRoles: params => {
    return API.POST('/shengruiweb/sysrole/save', params)
  },
  // 删除角色
  deleteRoles: params => {
    return API.POST('/shengruiweb/sysrole/delete', params)
  },
  // 获取权限绑定列表
  getAclDto: params => {
    return API.GET('/shengruiweb/sysrole/getAclDto', params)
  },
  // 角色绑定权限
  roleBindAcl: params => {
    return API.POST('/shengruiweb/sysrole/roleBindAcl', params)
  },
  // 获取权限列表
  getRights: params => {
    return API.GET('/shengruiweb/sysacl/pageQuery', params)
  },
  // 删除权限
  deleteRights: params => {
    return API.GET('', params)
  }
}
