import {apiSlice} from "@store/apiSlice/index";


const consultApiSlice = apiSlice.injectEndpoints({
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
        })

    })
})

export const {useRequestConsultInfoQuery,useCreateConsultOrderMutation} = consultApiSlice