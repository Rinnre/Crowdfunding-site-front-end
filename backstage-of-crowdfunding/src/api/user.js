import request from '@/utils/request'
const api_path = '/management/user'

export default {
    // 获取所有用户信息
    getUserPages(page, size, key_words, authStatus) {
        return request({
            url: `${api_path}/get/user/info/pages/${page}/${size}`,
            method: "GET",
            params: { key_words, authStatus }
        })
    },
    // 用户认证
    authUser(uid, authStatus) {
        return request({
            url: `${api_path}/modify/user/auth/status/${uid}/${authStatus}`,
            method: 'PUT'
        })
    },
}