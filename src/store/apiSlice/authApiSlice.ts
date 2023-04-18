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
        // 发送手机验证码
        sendMsgCode: builder.mutation<HealthResponse<{ code: string }>, {
            mobile: string;
            type: 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile';
        }>({
            query: (params) => ({
                url: '/code',
                params
            })
        }),
        //短信登录
        loginByMsgCode:builder.mutation<AuthResponse,{mobile:string;code:string}>({
            query:(body) => ({
                url:'/login',
                method: 'POST',
                body
            })
        })
    })
})

export const {useLoginByPasswordMutation,useSendMsgCodeMutation,useLoginByMsgCodeMutation} = authApiSlice