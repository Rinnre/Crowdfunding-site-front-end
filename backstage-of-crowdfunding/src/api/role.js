import request from '@/utils/request'
const api_path = '/management/role'

export default {
    // 条件查询带分页
    getRolePages(page, size, key_words) {
        return request({
            url: `${api_path}/get/role/pages/${page}/${size}`,
            method: 'GET',
            params: { key_words }
        })
    },

    // 根据id查询
    getRoleById(id) {
        return request({
            url: `${api_path}/get/role/by/${id}`,
            method: "GET"
        })
    },

    // 根据id删除
    removeRoleById(id) {
        return request({
            url: `${api_path}/remove/role/${id}`,
            method: 'DELETE'
        })
    },

    // 根据id数组批量删除
    removeRoleByIdList(idList) {
        return request({
            url: `${api_path}/remove/role/list`,
            method: 'DELETE',
            data: idList
        })
    },
    addRole(role) {
        return request({
            url: `${api_path}/save/role`,
            method: 'POST',
            data: role
        })
    },
    modifyRoleById(id,role){
        return request({
            url: `${api_path}/modify/role/${id}`,
            method: "PUT",
            data:role
        })
    }
}