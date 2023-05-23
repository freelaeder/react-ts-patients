import {apiSlice} from "@store/apiSlice/index";


export const consultApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        // 获取订单支付信息
        requestConsultInfo: build.query<ConsultOrderPreDataResponse, consultOrderPreParams>({
            query: (params) => ({
                url: '/patient/consult/order/pre',
                params
            })
        }),
        // 生成问诊订单
        createConsultOrder: build.mutation<HealthResponse<{ id: string }>, PartialConsult>({
            query: (body) => ({
                url: '/patient/consult/order',
                method: 'post',
                body
            })
        }),
        // 获取订单问诊列表
        consultRecords: build.query<ConsultRecordResponse, ConsultRecordParams>({
            query: (params) => ({
                url: '/patient/consult/order/list',
                params
            }),
        }),
        // 获取订单支付地址
        payConsultOrder: build.mutation<HealthResponse<{ payUrl: string }>, {
            // 0 微信支付 1 支付宝 2 云闪付
            paymentMethod: 0 | 1 | 2; orderId: string; payCallback: string
        }>({
            query: (body) => ({
                url: '/patient/consult/pay',
                method: 'post',
                body
            })
        })

    })
})

export const {
    useRequestConsultInfoQuery,
    useCreateConsultOrderMutation,
    useLazyConsultRecordsQuery,
    usePayConsultOrderMutation
} = consultApiSlice