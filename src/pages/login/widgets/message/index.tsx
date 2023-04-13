// 短信登录组件
import styles from "@styles/login.module.scss";
import classNames from "classnames";
import {Input} from 'react-vant';
import {useState} from "react";

export default function Message() {
    const [state, updateState] = useState({
        text: ''
    })
    return (
        <form className={styles.form}>
            <div className={styles.formItem}>
                <input type="text" placeholder="请输入手机号" className={styles.text}/>
                <p className={styles.msg}>手机号格式不正确</p>
            </div>
            <div className={styles.formItem}>
                <Input
                    value={state.text}
                    onChange={text => updateState({text})}
                    placeholder='请输入文本'
                />

                <div className={styles.right}>
                    <button type="button" className={styles.sendMsgCode}>
                        发送手机验证码
                    </button>
                </div>
                <p className={styles.msg}>请输入短信验证码</p>
            </div>
            <div className={styles.formItem}>
                <label className={styles.agree}>
                    <input type="checkbox"/>
                    <span>
            我已同意<a href="#"> 用户协议 </a>及<a href="#"> 隐私条款</a>
          </span>
                </label>
            </div>
            <button
                type="submit"
                className={classNames(styles.submit, {
                    [styles.disabled]:true
                })}
            >
                登录
            </button>
        </form>
    );
}