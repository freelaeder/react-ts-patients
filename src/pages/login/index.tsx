import {Helmet} from "react-helmet";
import {useState} from "react";
import styles from '@styles/login.module.scss'
import Header from "@shared/header";
import qq from '@icons/login/qq.svg'
import {RightOutline} from "antd-mobile-icons";
import Message from "@pages/login/widgets/message";
import Password from "@pages/login/widgets/password";

export default function Login() {
    // 用于控制短信登录组件和密码登录组件的切换
    const [mobileLogin, setMobileLogin] = useState(false)
    return <>
        <Helmet>
            <title>优医问诊--登录</title>
        </Helmet>
        <Header link={'注册'} />
        <div className={styles.page}>
            <div className={styles.title}>
                <h3>{mobileLogin ? "短信验证码登录" : "密码登录"}</h3>
                <span onClick={() => setMobileLogin(x => !x)}>
            {mobileLogin ? "密码登录" : "短信验证码登录"}<RightOutline/>
          </span>
            </div>
            {mobileLogin ? <Message/> : <Password/>}
            <div className={styles.forget}>
                <a href="#">忘记密码?</a>
            </div>
            <div className={styles.third}>
                <div className={styles.headline}>
                    <span>第三方登录</span>
                </div>
                <div className={styles.methods}>
                    <img src={qq} alt="QQ登录"/>
                </div>
            </div>
        </div>
    </>;
}