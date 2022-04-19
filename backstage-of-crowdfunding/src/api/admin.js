import request from '@/utils/request'
const api_path = '/management/admin'

export default {

    // 分页查询所有管理员账号
    getAdminPageList(page, limit, key_words) {
        return request({
            url: `${api_path}/get/admin/pages/${page}/${limit}`,
            method: 'GET',
            params: {key_words}
        })
    },

    // 通过id删除账号
    removeAdminById(id) {
        return request({
            url: `${api_path}/remove/admin/${id}`,
            method: 'DELETE'
        })
    },

    // 批量删除账号
    removeAdminByIdList(idList) {
        return request({
            url: `${api_path}/remove/admin/list`,
            method: 'DELETE',
            data: idList
        })
    },

    // 通过id查询账号信息
    getAdminById(id) {
        return request({
            url: `${api_path}/get/admin/${id}`,
            method: 'GET',
        })
    },

    // 新增管理员账号
    addAdmin(admin) {
        return request({
            url: `${api_path}/save/admin`,
            method: 'POST',
            data: admin
        })
    },

    // 修改管理员账号信息
    modifyAdmin(id, admin) {
        return request({
            url: `${api_path}/modify/admin/${id}`,
            method: `PUT`,
            params: {admin}
        })
    },

    // 给管理员分配角色
    assignRoles(admin_id, roles_id) {
        return request({
            url: `${api_path}/assign/roles/${admin_id}`,
            method: 'POST',
            params: roles_id
        })
    },
    // 给管理员取消分配角色
    unAssigenRole(admin_id, roles_id) {
        return request({
            url: `${api_path}/assign/roles/${admin_id}`,
            method: 'DELETE',
            params: roles_id
        })
    }

}