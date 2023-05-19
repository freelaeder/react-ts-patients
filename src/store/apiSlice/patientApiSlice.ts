import {apiSlice} from "@store/apiSlice/index";
import {Patient, PatientResponse} from "../../types/patient";


export const patientApiSlice = apiSlice.enhanceEndpoints({addTagTypes: ["patients"]}).injectEndpoints({
    endpoints: build => ({
        // 查询患者列表
        requestPatients: build.query<PatientResponse, undefined>({
            query: () => ({
                url: "/patient/mylist"
            }),
            // 添加状态
            providesTags: ["patients"],
        }),
        // 添加患者
        addPatient: build.mutation<HealthResponse<{
            id: string
        }>, Pick<Patient, 'name' | 'idCard' | 'defaultFlag' | 'gender'>>({
            query: (body) => ({
                url: '/patient/add',
                method: 'post',
                body
            }),
            // 使状态无效
            invalidatesTags: ["patients"]
        }),
        // 更新患者信息
        updatePatient: build.mutation<HealthResponse<{ id: string }>, {
            id: string
        } & Pick<Patient, 'name' | 'idCard' | 'defaultFlag' | 'gender'>>({
            query: (body) => ({
                url: '/patient/update',
                method: 'put',
                body
            }),
            invalidatesTags: ["patients"]
        }),
        // 删除患者
        deletePatient: build.mutation<HealthResponse<{ id: string }>, string>({
            query: (id) => ({
                url: `/patient/del/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['patients']
        }),
        // 根据患者 id 获取患者信息
        requestPatient: build.query<HealthResponse<Patient>, string>({
            query: (id) => ({
                url: `/patient/info/${id}`
            })
        })


    })
})

// 导出

export const {
    useRequestPatientsQuery, useAddPatientMutation,
    useUpdatePatientMutation, useDeletePatientMutation,
    useRequestPatientQuery
} = patientApiSlice