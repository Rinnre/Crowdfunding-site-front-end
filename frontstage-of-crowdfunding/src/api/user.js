import request from '@/utils/request'
const api_path = '/user'

export default {
    login_password(user){
        return request({
            url:`${api_path}/do/login`,
            method:'POST',
            data: user
        })
    },
    login_code(user){
        return request({
            url:`${api_path}/do/login_or_register`,
            method:'POST',
            data: user
        })
    },
    send_code(phone,type){
        return request({
            url: `${api_path}/send/code/${phone}/${type}`,
            method:'GET'
        })
    }
}