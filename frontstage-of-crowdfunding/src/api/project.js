import request from '@/utils/request'
const api_path = '/project'

export default {
    // 保存项目基本信息
    saveBaseProject(project) {
        return request({
            url: `${api_path}/save/base/project/info`,
            method: 'POST',
            data: project
        })
    },
    //保存项目目标金额
    saveProjectMoney(project) {
        return request({
            url: `${api_path}/save/project/money`,
            method: 'POST',
            data: project
        })
    },
    // 设置项目回报
    saveProjectReward(project) {
        return request({
            url: `${api_path}/save/project/reward`,
            method: 'POST',
            data: project
        })
    },
    // 获取项目信息
    getProjectInfo(project_name){
        return request({
            url: `${api_path}/get/project/info/${project_name}`,
            method: 'GET'
        })
    },
    // 保存项目详情
    saveProjectDetail(project){
        return request({
            url: `${api_path}/save/project/detail`,
            method: 'POST',
            data: project
        })
    },

    // 提交项目辅助审核资料将项目保存至数据库
    saveProject(project){
        return request({
            url: `${api_path}/save/project/supporting`,
            method: 'POST',
            data:project
        })
    }
}