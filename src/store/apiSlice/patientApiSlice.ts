import {apiSlice} from "@store/apiSlice/index";
import {Patient, PatientResponse} from "../../types/patient";
import * as url from "url";


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
        })


    })
})

// 导出

export const {useRequestPatientsQuery, useAddPatientMutation, useUpdatePatientMutation} = patientApiSlice