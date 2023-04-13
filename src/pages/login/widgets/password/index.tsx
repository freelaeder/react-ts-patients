// 密码登录组件
import styles from "@styles/login.module.scss";
import useToggle from "@hooks/useToggle";
import {Button, Input, Form, Checkbox} from 'react-vant'
import {useState} from "react";

export default function Password() {
    // 控制密码是否显示
    const [visible, setVisible] = useToggle(false);
    // 复选框
    const [checked, setChecked] = useState(false)
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        console.log(values)
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
                colon={true} // 取消冒号
                rules={[{required: false, message: '请填写正确的用户名'},
                    {
                        validator: (_, value) => {
                            if (/^1[3-9]\d{9}$/.test(value)) {
                                return Promise.resolve(true)
                            }
                            return Promise.reject(new Error('请填写正确的用户名'))
                        },
                    },]}
                name='username'
            >
                <Input placeholder='请输入用户名'/>
            </Form.Item>
            <Form.Item
                rules={[{required: false, message: '请填写密码'},
                    {
                        validator: (_, value) => {
                            if (/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]){6,12}$/.test(value)) {
                                return Promise.resolve(true)
                            }
                            return Promise.reject(new Error('请填写正确的密码'))
                        },
                    },
                ]}
                name='password'
            >
                <Input placeholder='请输入密码'/>
            </Form.Item>
            <Form.Item
            >
                <Checkbox className={styles.agree} checked={checked} onChange={setChecked}>
                        <span>
            我已同意<a href="#"> 用户协议 </a>及<a href="#"> 隐私条款</a>
          </span>
                </Checkbox>
            </Form.Item>
        </Form>
    );
}