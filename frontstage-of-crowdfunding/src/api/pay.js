import request from "@/utils/request"
const api_path  = "/pay"

export default{
    // 生成支付二维码
    sendRequestToAliPay(order_id){
        return request({
            url: `${api_path}/send/request/to/pay/${order_id}`,
            method:'POST'
        })
    }
}