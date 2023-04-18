// src/shared/tabbar/index.tsx
import styles from "@styles/tabbar.module.scss";
import {useLocation, useNavigate} from "react-router-dom";
import classNames from "classnames";

export default function Tabbar() {
    const {pathname} = useLocation();
    const navigate = useNavigate()
    const isHome = pathname === '/'
    const isArticle = pathname === '/article'
    const isNotify = pathname === '/notify'
    const isPersonal = pathname === '/personal'
    return (
        <ul className={styles.bar}>
            <li onClick={() => navigate('/')} className={classNames({[styles.active]: isHome})}>
                <img src={require( isHome ?  "@icons/home/index-active.svg"  : "@icons/home/index-default.svg" ).default} alt="首页"/>
                <span>首页</span>
            </li>
            <li onClick={() => navigate('/article')}  className={classNames({ [styles.active] :isArticle })}>
                <img
                    src={require( isArticle ? "@icons/home/article-active.svg" :  "@icons/home/article-default.svg" ).default}
                    alt="健康百科"
                />
                <span>健康百科</span>
            </li>
            <li onClick={() => navigate('/notify')} className={classNames({  [styles.active]:isNotify })}  >
                <img
                    src={require( isNotify ? "@icons/home/notice-active.svg" : "@icons/home/notice-default.svg").default}
                    alt="消息通知"
                />
                <span>消息通知</span>
            </li>
            <li  onClick={() => navigate('/personal')} className={classNames({ [styles.active]:isPersonal })} >
                <img src={require( isPersonal ? "@icons/home/mine-active.svg" : "@icons/home/mine-default.svg").default} alt="我的"/>
                <span>我的</span>
            </li>
        </ul>
    );
}