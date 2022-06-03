import request from '@/utils/request'
const api_path = '/dynamic'

export default{
    uploadPicture(file){
        return request({
            url: `${api_path}/upload/picture`,
            method: 'POST',
            data: file
        })
    },

    saveDynamic(dynamic){
        return request({
            url: `${api_path}/save/dynamic`,
            method:'POST',
            data: dynamic
        })
    },

    // 获取所有动态
    getAllDynamic(){
        return request({
            url: `${api_path}/get/all/dynamic`,
            method:'GET',
        })
    },
    // 发布动态评论
    addCommentToDynamic(commentFormVo){
        return request({
            url:`${api_path}/add/comment/to/dynamic`,
            method:'POST',
            data: commentFormVo
        })
    },

    getCommentsByDynamicId(dynamicId){
        return request({
            url:`${api_path}/get/comments/by/${dynamicId}`,
            method:'GET',
        })
    }

}