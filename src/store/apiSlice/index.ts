// src/store/apiSlice/index.ts
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AppState} from "@store/index";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery(
        {
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
        },
    ),
    endpoints: () => ({}),
});