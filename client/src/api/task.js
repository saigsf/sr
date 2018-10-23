import * as API from './index'

export default {
  // 获取所有车企
  getCarmakeAll: params => {
    return API.GET('/shengruiweb/company/findAll', params)
  },
  // 获取车企列表
  getCarmakeList: params => {
    return API.GET('/shengruiweb/company/pageQuery', params)
  },
  // 删除车企列表
  deleteCarmakeById: params => {
    return API.POST('/shengruiweb/company/delete', params)
  },
  // 添加车企
  saveCarmake: params => {
    return API.POST('/shengruiweb/company/save', params)
  },
  // 更新车企--
  updateCarmakeById: params => {
    return API.POST('/shengruiweb/company/update', params)
  },
  // 获取所有TCU
  getTCUAll: params => {
    return API.GET('/shengruiweb/tcu/findAll', params)
  },
  // 获取TCU列表
  getTCUList: params => {
    return API.GET('/shengruiweb/tcu/pageQuery', params)
  },
  // 删除TCU列表
  deleteTCUById: params => {
    return API.POST('/shengruiweb/tcu/delete', params)
  },
  // 添加TCU
  saveTCU: params => {
    return API.POST('/shengruiweb/tcu/save', params)
  },
  // 更新TCU
  updateTCUById: params => {
    return API.POST('/shengruiweb/tcu/update', params)
  },
  // 获取所有Project
  getProjectAll: params => {
    return API.GET('/shengruiweb/project/findAll', params)
  },
  // 获取Project列表
  getProjectList: params => {
    return API.GET('/shengruiweb/project/pageQuery', params)
  },
  // 删除Project列表
  deleteProjectById: params => {
    return API.POST('/shengruiweb/project/delete', params)
  },
  // 添加Project
  saveProject: params => {
    return API.POST('/shengruiweb/project/save', params)
  },
  // 更新Project
  updateProjectById: params => {
    return API.POST('/shengruiweb/project/update', params)
  },
  // 获取项目详情
  getProjectDetailById: params => {
    return API.GET('/shengruiweb/project/getProjectDetails', params)
  },
  // 项目，tcu，文件绑定
  getProjectAssociate: params => {
    return API.POST('/shengruiweb/project/associate', params)
  },
  // 标定文件启用
  setProjectEnable: params => {
    return API.POST('/shengruiweb/project/enable', params)
  },
  // 标定文件禁用
  setProjectDisable: params => {
    return API.POST('/shengruiweb/project/disable', params)
  },
  // 删除标定文件
  deleteAssociate: params => {
    return API.POST('/shengruiweb/project/deleteAssociate', params)
  },
  // 获取Task列表
  getTaskList: params => {
    return API.GET('/shengruiweb/task/pageQuery', params)
  },
  // 删除Task列表
  deleteTaskById: params => {
    return API.POST('/shengruiweb/task/delete', params)
  },
  // 添加Task
  saveTask: params => {
    return API.POST('/shengruiweb/task/save', params)
  },
  // 更新Task
  updateTaskById: params => {
    return API.POST('/shengruiweb/task/update', params)
  },
  // 挂起Task
  hangUpTaskById: params => {
    return API.POST('/shengruiweb/task/cancleTask', params)
  },
  // 文件上传
  uploadFile: params => {
    return API.POST('/shengruiweb/tcufile/upload', params)
  },
  // 获取所有文件
  getFillAll: params => {
    return API.GET('/shengruiweb/tcufile/findAll', params)
  },
  // 获取文件列表
  getFileList: params => {
    return API.GET('/shengruiweb/tcufile/pageQuery', params)
  },
  // 删除文件列表
  deleteFileList: params => {
    return API.POST('/shengruiweb/tcufile/delete', params)
  },
  // 获取生产日志
  getProductionLog: params => {
    return API.GET('/shengruiweb/tcufile/pageQuery', params)
  },
  // 删除生产日志
  deleteProductionLog: params => {
    return API.GET('/shengruiweb/tcufile/delete', params)
  },
  // 获取操作日志
  getOperationLog: params => {
    return API.GET('/shengruiweb/operationlog/pageQuery', params)
  },
  // 删除操作日志
  deleteOperationLog: params => {
    return API.POST('/shengruiweb/operationlog/delete', params)
  }
}
