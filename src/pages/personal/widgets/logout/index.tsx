import React from 'react';
import styles from "@styles/personal.module.scss";
import {Dialog} from "react-vant";
import {useNavigate} from "react-router-dom";
import {useTypedDispatch} from "@store/index";
import {clearAuth} from "@store/slices/authSlice";
import {apiSlice} from "@store/apiSlice";
function Logout() {
    // 获取 dispatch 方法
    const dispatch = useTypedDispatch();
    // 获取用于跳转页面的方法
    const navigate = useNavigate();
    return (
        <div className={styles.logout} onClick={() =>
            Dialog.confirm({
                title: '温馨提示',
                message: '您确定退出优医问诊吗?',
            })
                .then(() => {
                    // 清空本地登录凭据
                    dispatch(clearAuth())
                       // 跳转登录页
                    navigate('/login')
                    // 清空api状态切片
                    dispatch(apiSlice.util.resetApiState())
                })
                .catch(() => {
                    console.log('catch')
                })
        } >
            退出登录
        </div>
    );
}

export default Logout;