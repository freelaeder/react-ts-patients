import {apiSlice} from "@store/apiSlice/index";


const doctorApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        // 获取推荐关注医生列表
        requestDoctors:build.query<DoctorResponse,PageParams>({
            query:(params) => ({
                url:'/home/page/doc',
                params
            })
        })
    })
})

export const {useLazyRequestDoctorsQuery} = doctorApiSlice