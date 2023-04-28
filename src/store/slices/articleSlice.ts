import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@store/index";


// 状态切片中管理的状态的类型
interface ArticleState {
    // 推荐
    recommend: {
        // 页码
        current: number;
        // 每次请求获取的数据数量
        pageSize: number;
        // 是否还有更多数据
        hasMore: boolean;
        // 文章列表
        articles: Article[];
    };
    // 减脂
    fatReduction: {
        // 页码
        current: number;
        // 每次请求获取的数据数量
        pageSize: number;
        // 是否还有更多数据
        hasMore: boolean;
        // 文章列表
        articles: Article[];
    };
    // 健康美食
    food: {
        // 页码
        current: number;
        // 每次请求获取的数据数量
        pageSize: number;
        // 是否还有更多数据
        hasMore: boolean;
        // 文章列表
        articles: Article[];
    };
    // 关注
    like: {
        // 页码
        current: number;
        // 每次请求获取的数据数量
        pageSize: number;
        // 是否还有更多数据
        hasMore: boolean;
        // 文章列表
        articles: Article[];
    };
}

export const articleSlice = createSlice<ArticleState, {
    // 保存文章
    saveArticles: (state: Draft<ArticleState>, action: PayloadAction<{
        type: ArticleType;
        articles: Article[];
        current: number;
        hasMore: boolean;
        pageSize: number;
    }>) => void;
}, 'article'>({
    name: 'article',
    initialState: {
        recommend: {current: 1, pageSize: 10, hasMore: true, articles: []},
        fatReduction: {current: 1, pageSize: 10, hasMore: true, articles: []},
        food: {current: 1, pageSize: 10, hasMore: true, articles: []},
        like: {current: 1, pageSize: 10, hasMore: true, articles: []},
    },
    reducers: {
        saveArticles(state, action) {
            const {type, articles, current, hasMore, pageSize} = action.payload
            state[type].articles = [...state[type].articles, ...articles];
            state[type].current = current;
            state[type].hasMore = hasMore;
            state[type].pageSize = pageSize
        }
    }
})
// 获取文章列表(根据文章类型)
export const selectArticles = (type: ArticleType) => (state: AppState) => state.article[type];
export const {saveArticles} = articleSlice.actions