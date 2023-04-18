// 短信登录组件
import styles from "@styles/login.module.scss";
import {Button, Checkbox, Form, Input, Toast} from 'react-vant';
import React, {ChangeEvent, useEffect, useState} from "react";
import useToggle from "@hooks/useToggle";
import useCountdown from "@hooks/delayTime";
import {useLoginByMsgCodeMutation, useSendMsgCodeMutation} from "@store/apiSlice/authApiSlice";
import {useTypedDispatch} from "@store/index";
import {useNavigate} from "react-router-dom";
import {saveAuth} from "@store/slices/authSlice";

export default function Message() {
    // 是否显示短信验证码
    const [visible, setVisible] = useToggle(true);
    // 复选框
    const [checked, setChecked] = useState(false)
    // 倒计时
    const [time, reset] = useCountdown(60)
    // 手机号
    const [phone, setPhone] = useState('13230000001')

    const [form] = Form.useForm()
    // 用于发送手机验证码
    const [sendMsgCodeRequest] = useSendMsgCodeMutation();
    // 用于短信登录
    const [loginByMsgCode] = useLoginByMsgCodeMutation()
    // dispatch 方法
    const dispatch = useTypedDispatch()
    // 路由信息
    const navigate = useNavigate()

    const onFinish = async (values: { mobile: string; code: string }) => {
        if (!checked) {
            Toast.info('请勾选协议')
            return
        }
        const {mobile, code} = values
        try {
            // 发送请求
            const res = await loginByMsgCode({
                mobile, code
            }).unwrap()
            // 请求成功
            if (res.code === 10000) {
                // 登录成功，保存用户凭证
                dispatch(saveAuth(res.data))
                // 消息提示
                Toast({
                    message: "登录成功",
                    onClose: () => {
                        // 跳转到个人中心页面
                        navigate("/personal");
                    },
                });
            } else {
                Toast.info(res.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    // 若倒计时为0，修改  相当于倒计时归零,让再次发送的按钮显示
    useEffect(() => {
        if (time === 0 && !visible) {
            setVisible()
        }
    }, [time])
    // 发生短信验证码
    const sendCode = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        // 如果验证通过
        if (/^1[3-9]\d{9}$/.test(phone)) {
            // 发送手机验证码请求
            try {
                const res = await sendMsgCodeRequest({mobile: phone, type: 'login'}).unwrap()
                Toast.info('请求成功')
                // 显示倒计时
                setVisible()
                // 重置倒计时时间
                reset()
            } catch (e) {
                Toast.info('请求失败')
            }

            return
        }
        // 不通过
        Toast.info('请填写正确的手机号')
    }

    // 渲染视图
    return (
        <Form
            className={styles.form}
            form={form}
            onFinish={onFinish}
            footer={
                <div style={{margin: '16px 16px 0',}}>
                    <Button round nativeType='submit' type='primary' block>
                        登录
                    </Button>
                </div>
            }
        >
            <Form.Item
                tooltip={{
                    message:
                        'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.',
                }}
                initialValue={phone}
                colon={true} // 取消冒号
                rules={[{required: false, message: '请填写正确的用户名'},
                    {
                        validator: (_, value) => {
                            if (/^1[3-9]\d{9}$/.test(value)) {
                                return Promise.resolve(true)
                            }
                            return Promise.reject(new Error('请填写正确的手机号'))
                        },
                    },]}
                name='mobile'
            >
                <Input value={phone} onChange={(vals) => setPhone(vals)}
                       placeholder='请输入手机号'/>
            </Form.Item>
            <Form.Item
                rules={[{required: false, message: '请填写密码'},
                    {
                        validator: (_, value) => {
                            if (/^\d{6}$/.test(value)) {
                                return Promise.resolve(true)
                            }
                            return Promise.reject(new Error('请填写正确的验证码'))
                        },
                    },
                ]}
                name='code'

            >
                <Input placeholder='短信验证码'
                       suffix={visible ? <a onClick={sendCode} href="#"> 发送验证码</a> :
                           <a href="#"> {`${time}s后再次发送`} </a>}
                />
            </Form.Item>
            <Form.Item
            >
                <Checkbox className={styles.agree} checked={checked} onChange={setChecked}>
                        <span>
            我已同意<a href="#"> 用户协议 </a>及<a href="#">  隐私条款</a>
          </span>
                </Checkbox>
            </Form.Item>
        </Form>
    );
}