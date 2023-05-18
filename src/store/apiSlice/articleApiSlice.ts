import {apiSlice} from "@store/apiSlice/index";
import {FocusType} from "../../types/profile";


export const articleApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // 获取文章列表
        requestArticles: build.query<ArticleResponse, ArticleParams>({
            query: (params) => ({
                url: '/patient/home/knowledge',
                params
            })
        }),
        // 关注、取消关注
        focus: build.mutation<HealthResponse<{id:string}>, { type: FocusType; id: string }>({
            query: (body) => ({
                url: '/like',
                method: "post",
                body
            })
        })
    })

})


export const {
    useLazyRequestArticlesQuery,
    useFocusMutation
} = articleApiSlice