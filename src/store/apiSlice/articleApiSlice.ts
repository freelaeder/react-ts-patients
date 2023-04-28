import {apiSlice} from "@store/apiSlice/index";


export const articleApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // 获取文章列表
        requestArticles: build.query<ArticleResponse, ArticleParams>({
            query: (params) => ({
                url: '/patient/home/knowledge',
                params
            })
        })
    })

})


export const {useLazyRequestArticlesQuery} = articleApiSlice