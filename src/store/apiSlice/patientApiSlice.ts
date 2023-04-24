import {apiSlice} from "@store/apiSlice/index";
import {PatientResponse} from "../../types/patient";


export const patientApiSlice = apiSlice.enhanceEndpoints({addTagTypes: ["patients"]}).injectEndpoints({
    endpoints: build => ({
        // 查询患者列表
        requestPatients: build.query<PatientResponse, undefined>({
            query: () => ({
                url: "/patient/mylist"
            }),
            // 添加状态
            providesTags: ["patients"],
        })


    })
})

// 导出

export const {useRequestPatientsQuery} = patientApiSlice