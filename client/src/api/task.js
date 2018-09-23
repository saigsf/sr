import * as API from './index'

export default {
  // 获取任务列表
  getTaskList: params => {
    return API.GET('', params)
  },
  // 修改任务
  updateTask: params => {
    return API.GET('', params)
  },
  // 删除任务
  deleteTask: params => {
    return API.GET('', params)
  },
  // 分配任务
  allocatingTask: params => {
    return API.GET('', params)
  }
}
