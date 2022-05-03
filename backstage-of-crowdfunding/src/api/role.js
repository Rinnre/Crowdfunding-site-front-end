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
    // 新增角色
    addRole(role) {
        return request({
            url: `${api_path}/save/role`,
            method: 'POST',
            data: role
        })
    },
    // 修改角色
    modifyRoleById(id, role) {
        return request({
            url: `${api_path}/modify/role/${id}`,
            method: "PUT",
            data: role
        })
    },
    // 获取所有角色
    getRoles() {
        return request({
            url: `${api_path}/get/Roles`,
            method: 'GET'
        })
    },
    // 角色分配权限
    assignPermission(role_id,permissionIdList){
        return request({
            url: `${api_path}/assign/permissions/${role_id}`,
            method:'POST',
            data: permissionIdList
        })
    },
    // 角色收回权限
    unAssignPermission(role_id,permissionIdList){
        return request({
            url: `${api_path}/unAssign/permissions/${role_id}`,
            method:'DELETE',
            data: permissionIdList
        })
    },
    // 查询权限树
    getPermissionsTree(){
        return request({
            url: `${api_path}/get/permissions/tree`,
            method: 'GET'
        })
    },
    // 获取已经分配权限
    getAssignedPermissions(role_id){
        return request({
            url: `${api_path}/get/assigned/permissions/${role_id}`,
            method: 'GET'
        })
    }
}