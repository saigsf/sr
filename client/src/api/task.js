import * as API from './index'

export default {
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
  // 文件上传
  uploadFile: params => {
    return API.POST('/shengruiweb/tcufile/upload', params)
  },
  // 获取文件列表
  getFileList: params => {
    return API.GET('/shengruiweb/tcufile/pageQuery', params)
  },
  // 删除文件列表
  deleteFileList: params => {
    return API.POST('/shengruiweb/tcufile/delete', params)
  }
}
