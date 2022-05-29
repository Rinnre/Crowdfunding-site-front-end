import request from '@/utils/request'
const api_path = '/user'

export default {
    login_password(user) {
        return request({
            url: `${api_path}/do/login`,
            method: 'POST',
            data: user
        })
    },
    login_code(user) {
        return request({
            url: `${api_path}/do/login_or_register`,
            method: 'POST',
            data: user
        })
    },
    send_code(phone, type) {
        return request({
            url: `${api_path}/send/code/${phone}/${type}`,
            method: 'GET'
        })
    },
    // 修改用户密码
    modifyPassword(params) {
        return request({
            url: `${api_path}/modify/password`,
            method: 'PUT',
            data: params
        })
    },
    // 验证手机验证码
    confirm_code(params) {
        return request({
            url: `${api_path}/confirm/modify_code`,
            method: 'POST',
            data: params
        })
    },
    // 手机号修改密码
    modifyPasswordByPhone(params) {
        return request({
            url: `${api_path}/modify/password`,
            method: 'POST',
            data: params
        })
    },
    // 用户动态
    getDynamicList() {
        return request({
            url: `${api_path}/get/dynamic/by/user_id`,
            method: 'GET',
        })
    },
    // 用户删除动态
    removeDynamic(dynamic_id) {
        return request({
            url: `${api_path}/remove/dynamic/${dynamic_id}`,
            method: 'DELETE',
        })
    },
    //用户认证
    doUserAuth(userAuth) {
        return request({
            url: `${api_path}/do/user/auth`,
            method: 'POST',
            data: userAuth
        })
    },
    // 获取用户认证信息
    getUserAuth() {
        return request({
            url: `${api_path}/get/user/auth/info`,
            method: 'GET',
        })
    },
    // 获取用户信息
    getUserInfo() {
        return request({
            url: `${api_path}/get/user/info`,
            method: 'GET',
        })
    },
    // 更新用户信息
    modifyUserInfo(userInfo) {
        return request({
            url: `${api_path}/modify/use/info`,
            method: 'PUT',
            data: userInfo
        })
    },
    // 获取用户收货地址
    getUserAddress() {
        return request({
            url: `${api_path}/get/shipping/address`,
            method: 'GET',
        })
    },

    // 修改用户收货地址
    modifyUserAddress(userAddress) {
        return request({
            url: `${api_path}/modify/shipping/address`,
            method: 'PUT',
            data: userAddress
        })
    },

    // 添加用户收货地址
    saveUserAddress(userAddress) {
        return request({
            url: `${api_path}/save/shipping/address`,
            method: 'POST',
            data: userAddress

        })
    },
    // 删除用户收货地址
    removeUserAddress(addressId) {
        return request({
            url: `${api_path}/remove/shipping/address/${addressId}`,
            method: 'DELETE'
        })
    },

    // 用户项目管理
    getUserProject() {
        return request({
            url: `${api_path}/get/user/project`,
            method: 'GET',
        })
    },
    // 用户项目删除
    removeUserProject(projectId) {
        return request({
            url: `${api_path}/remove/project/${projectId}`,
            method: 'DELETE',
        })
    }
}