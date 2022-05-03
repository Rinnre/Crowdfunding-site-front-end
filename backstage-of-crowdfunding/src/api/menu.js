import request from '@/utils/request'
const api_path = '/management/menu-permissions'

export default{
    // 查询菜单树
    getMenuTree(){
        return request({
            url: `${api_path}/get/menu/tree`,
            method: 'GET'
        })
    },

    // 添加菜单节点
    addMenu(menu){
        return request({
            url: `${api_path}/save/menu`,
            method: 'POST',
            data: menu,
        })
    },

    // 修改菜单节点
    modifyMenu(menu){
        return request({
            url: `${api_path}/modify/menu`,
            method: 'PUT',
            data: menu
        })
    },
    // 删除菜单节点
    removeMenu(menu_id){
        return request({
            url: `${api_path}/remove/menu/${menu_id}`,
            method: 'DELETE'
        })
    },

    // 菜单-权限绑定
    assignPermission(menu_id,permissionIdList){
        return request({
            url: `${api_path}/assign/permissions/${menu_id}`,
            method: 'POST',
            data: permissionIdList
        })
    },

    // 菜单-权限取消绑定
    unAssignPermission(menu_id,permissionIdList){
        return request({
            url: `${api_path}/unAssign/permissions/${menu_id}`,
            method: 'POST',
            data: permissionIdList
        })
    },

    // 获取已经分配给页面的权限
    getAssignedPermissions(menu_id){
        return request({
            url: `${api_path}/get/assigned/permissions/${menu_id}`,
            method: 'GET'
        })
    },

    // 页面节点对应的所有权限
    getPermissions(menu_id){
        return request({
            url: `${api_path}/get/permissions/${menu_id}`,
            method: 'GET'
        })
    }

}