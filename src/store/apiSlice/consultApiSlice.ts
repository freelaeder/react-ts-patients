import {apiSlice} from "@store/apiSlice/index";


const consultApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        // 获取订单支付信息
        requestConsultInfo: build.query<ConsultOrderPreDataResponse, consultOrderPreParams>({
            query: (params) => ({
                url: '/patient/consult/order/pre',
                params
            })
        })
    })
})

export const {useRequestConsultInfoQuery} = consultApiSlice