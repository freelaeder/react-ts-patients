// 短信登录组件
import styles from "@styles/login.module.scss";
import {Button, Checkbox, Form, Input, Toast} from 'react-vant';
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import useToggle from "@hooks/useToggle";
import useCountdown from "@hooks/delayTime";

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

    const onFinish = (values: ChangeEvent<HTMLFormElement>) => {
        if (!checked) {
            Toast.info('请勾选协议')
        }
    }

    // 若倒计时为0，修改
    useEffect(() => {
        if (time === 0 && !visible) {
            setVisible()
        }
    }, [time])
    // 发生短信验证码
    const sendCode = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        // 如果验证通过
        if (/^1[3-9]\d{9}$/.test(phone)) {
            setVisible()
            reset()
            return
        }
        Toast.info('请填写手机号')
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
                name='username'
            >
                <Input  value={phone} onChange={(vals) => setPhone(vals)}
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
                name='password'

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