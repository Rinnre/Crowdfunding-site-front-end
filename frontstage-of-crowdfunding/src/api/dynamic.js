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

}