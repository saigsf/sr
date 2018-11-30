import * as API from './index'

export default {
  // 用户登陆
  login: params => {
    return API.POST('/user/login', params)
  },
  // 用户注销
  logout: params => {
    return API.POST('/user/logout', params)
  },
  // 更改密码
  changePsd:  params => {
    return API.POST('/sysuser/updatePassword', params)
  },
  
  // 获取用户列表
  getUser: params => {
    return API.GET('/sysuser/pageQuery', params)
  },
  // 修改用户信息
  updateUser: params => {
    return API.POST('/sysuser/update', params)
  },
  // 删除用户信息
  deleteUser: params => {
    return API.POST('/sysuser/delete', params)
  },
  // 添加用户信息
  saveUser: params => {
    return API.POST('/sysuser/save', params)
  },
  // 获取角色绑定列表
  getUserAndRoles: params => {
    return API.GET('/sysuser/getRoleDto', params)
  },
  // 用户绑定角色
  setUserBindRole: params => {
    return API.POST('/sysuser/userBindRole', params)
  },
  // 获取角色列表
  getRoles: params => {
    return API.GET('/sysrole/pageQuery', params)
  },
  // 修改角色信息
  updateRoles: params => {
    return API.POST('/sysrole/update', params)
  },
  // 添加角色
  saveRoles: params => {
    return API.POST('/sysrole/save', params)
  },
  // 删除角色
  deleteRoles: params => {
    return API.POST('/sysrole/delete', params)
  },
  // 获取权限绑定列表
  getAclDto: params => {
    return API.GET('/sysrole/getAclDto', params)
  },
  // 角色绑定权限
  roleBindAcl: params => {
    return API.POST('/sysrole/roleBindAcl', params)
  },
  // 获取权限列表
  getRights: params => {
    return API.GET('/sysacl/pageQuery', params)
  },
  // 添加权限
  saveRights: params => {
    return API.POST('/sysacl/save', params)
  },
  // 删除权限
  deleteRights: params => {
    return API.POST('/sysacl/delete', params)
  },
  // 获取权限菜单，权限按钮
  getMenuTree: params => {
    return API.GET('/sysmenu/menuTree', params)
  }
}
