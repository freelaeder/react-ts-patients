import {apiSlice} from "@store/apiSlice/index";


const departmentApiSlice = apiSlice.injectEndpoints({
    endpoints:build => ({
        // 获取科室列表
        requestDepartment:build.query<DepartmentResponse,undefined>({
            query:() => ({
                url:'/dep/all'
            })
        })
    })
})


export const { useRequestDepartmentQuery} = departmentApiSlice