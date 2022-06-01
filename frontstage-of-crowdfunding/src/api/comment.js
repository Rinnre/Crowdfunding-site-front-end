import request from '@/utils/request'
const api_path = '/project'

export default{
    // 获取项目所有评论
    getCommentsByProjectId(projectId){
        return request({
            url: `${api_path}/get/comments/by/${projectId}`,
            method: 'GET'
        })
    },
    // 删除评论
    removeCommentById(commentId){
        return request({
            url: `${api_path}/remove/comment/by/${commentId}`,
            method:'DELETE'
        })
    },
    // 发布评论
    addCommentToProject(comment){
        return request({
            url:`${api_path}/add/comment/to/project`,
            method:'POST',
            data:comment 
        })
    }
}