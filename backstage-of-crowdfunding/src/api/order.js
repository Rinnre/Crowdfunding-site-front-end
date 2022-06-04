import request from '@/utils/request'
const api_path = '/management/order'

export default {
    // 获取所有订单信息
    getAllOrders(page, size, keyWords, orderStatus) {
        return request({
            url: `${api_path}/get/all/order/pages/${page}/${size}`,
            method: 'GET',
            params: { keyWords, orderStatus }
        })
    }
}