import React from "react";
import {useTypedSelector} from "@store/index";
import {selectAuth} from "@store/slices/authSlice";
import {Navigate, Outlet} from "react-router-dom";


interface Props {
    children?:React.ReactElement
}

export default function AuthRoute({children}:Props){
    // 获取本地存储的用户登录凭据
    const token = useTypedSelector(selectAuth).token
    if( typeof token === 'undefined') return <Navigate to={'/login'} />

    // 如果 children 存在渲染 children
    if(typeof children !== 'undefined') return children
    //否则渲染路由
    return <Outlet />
}