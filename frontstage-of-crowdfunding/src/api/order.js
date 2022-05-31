import request from "@/utils/request"
const api_path  = "/order"

export default {
    // 获取订单确认信息
   getOrderConfirmInfo(reward_id){
       return request({
           url: `${api_path}/get/order/confirm/info/${reward_id}`,
           method: "GET"
       })
   },
   
   // 提交订单
   saveOrderInfo(order){
       return request({
           url:`${api_path}/save/order/info`,
           method: "POST",
           data:order
       })
   }
}