import {apiSlice} from "@store/apiSlice/index";
import {ProfileResponse} from "../../types/profile";


export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        // 获取登录用户的个人信息
        requestProfile:builder.query<ProfileResponse,undefined>({
           query:()=> ({
               url:'/patient/myUser'
           })
        })
    })
})


export const {useRequestProfileQuery} = profileApiSlice