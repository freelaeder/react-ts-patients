import React from 'react';
import FakeMockProgress from "@shared/progress/fake-mock";
import {LeftOutline} from "antd-mobile-icons";
import styles from "@styles/header.module.scss";
import {useLocation, useNavigate} from "react-router-dom";


interface Props {
    // 页面标题
    title?: string;
    // 头部右侧链接
    link?: string;
    // 头部右侧链接的点击事件的处理函数
    linkHandler?: () => void;
    // 返回按钮的点击事件处理函数
    backHandler?: () => void;
}

const Header = ({
                    title,
                    link,
                    linkHandler,
                    backHandler,
                }: Props) => {
    // 用于跳转页面的方法
    const navigate = useNavigate();
    // 返回上一页
    const toBack = () => navigate(-1);

    return (
        <>
            {/*<FakeProgress/>*/}
            <FakeMockProgress isEnd={false} isStart={false}/>
            <div className={styles.container} >
                <LeftOutline onClick={backHandler ? backHandler : toBack}/>
                <div className={styles.title}>{title}</div>
                <div className={styles.link} onClick={linkHandler}>{link}</div>
                <div className={styles.border}></div>
            </div>
        </>
    );
};

export default Header;