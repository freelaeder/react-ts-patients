import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authSlice} from "@store/slices/authSlice";
import {apiSlice} from "@store/apiSlice";

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([apiSlice.middleware]),
})

// 获取dispatch方法的类型
export type AppDispatch = typeof store.dispatch
// 用于获取带有类型的dispatch方法
export const useTypedDispatch = () => useDispatch<AppDispatch>()
// 获取store中管理的状态的类型
export type AppState = ReturnType<typeof store.getState>
// 获取带有类型的useSelector方法
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector

export default store