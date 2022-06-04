import request from '@/utils/request'
const api_path = '/management/project'
export default {
    // 查询所有项目
    getAllProject(page, size, searchProjectVo) {
        return request({
            url: `${api_path}/get/all/project/pages/${page}/${size}`,
            method: 'POST',
            data: searchProjectVo
        })
    },
    // 查询所有项目详情
    getProjectByProjectId(project_id) {
        return request({
            url: `${api_path}/get/project/detail/${project_id}`,
            method: 'GET'
        })
    },

    // 修改项目状态
    modifyProjectStatus(projectId, status) {
        return request({
            url: `${api_path}/modify/project/status/${projectId}/${status}`,
            method: 'PUT'
        })
    }

}