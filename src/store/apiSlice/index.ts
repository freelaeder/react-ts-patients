// src/store/apiSlice/index.ts
import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {AppState} from "@store/index";
import {clearAuth} from "@store/slices/authSlice";


// 获取真正的用于发送请求的方法
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders(headers: Headers, api) {
        //监测请求是否已经有token
        if (headers.get('authorization')) return headers;
        // 获取token
        const token = (api.getState() as AppState).auth.auth.token
        // 如果 token 存在, 将 token 加入到请求头中
        if (token) headers.set('authorization', `Bearer ${token}`)
        // 返回处理之后的请求头对象
        return headers
    }
});

// 自定义请求
const customBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // 发送请求、获取响应
    const response = await baseQuery(args, api, extraOptions);
    // 判断请求是否出错, 请求状态码是否为未授权
    if (response.error && response.error.status === 401) {
        // 清空本地存储的用户资料
        // 用户资料清空后由于 Redux 状态发生变化组件重新渲染
        // 组件重新渲染时路由守卫组件检测到本地没有 token
        // 路由守卫组件会跳转到登录页面
        api.dispatch(clearAuth());
    }
    // 必须返回
    return response;
};


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: customBaseQuery,
    endpoints: () => ({}),
});