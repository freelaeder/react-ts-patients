import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer, authSlice} from "@store/slices/authSlice";
import {apiSlice} from "@store/apiSlice";
import { persistStore } from "redux-persist";
const store = configureStore({
    reducer: {
        [authSlice.name]: authReducer,
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

// 持久化对象
export const persistor =persistStore(store)
export default store