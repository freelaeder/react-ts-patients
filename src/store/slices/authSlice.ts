import {Auth} from "../../types/auth";
import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@store/index";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface AuthState {
    auth: Partial<Auth>
}

// 创建用于管理用户登录凭据的状态切片
export const authSlice = createSlice<
    AuthState,
    {
        // 保存用户登录凭据
        saveAuth(state: Draft<AuthState>, action: PayloadAction<Auth>): void;
        // 清空用户登录凭据
        clearAuth(state: Draft<AuthState>): void;
    },
    "auth"
>({
    name: 'auth',
    initialState: {
        auth: {}
    },
    reducers: {
        // 保存用户登录凭据
        saveAuth(state: Draft<AuthState>, action: PayloadAction<Auth>) {
            state.auth = action.payload
        },
        // 清空用户登录凭据
        clearAuth(state: Draft<AuthState>) {
            state.auth = {}
        }
    }
})
// 导出用于操作用户资料的 action creator 函数的对象集合
export const {saveAuth, clearAuth} = authSlice.actions
// 导出用于获取用户资料的状态选择器
export const selectAuth = (state: AppState) => state.auth.auth;
export const selectToken = (state:AppState) => state.auth.auth.token
// 持久化
export const authReducer = persistReducer({
        key: authSlice.name, storage
    },
    authSlice.reducer)
