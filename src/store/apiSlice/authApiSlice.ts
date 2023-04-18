import {apiSlice} from "@store/apiSlice/index";
import {AuthResponse} from "../../types/auth";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //密码登录
        loginByPassword: builder.mutation<
            AuthResponse,
            { password: string; mobile: string }
        >({
            query: (body) => ({url: "/login/password", method: "POST", body}),
        }),
    })
})

export const {useLoginByPasswordMutation} = authApiSlice