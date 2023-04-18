// 密码登录组件
import styles from "@styles/login.module.scss";
import useToggle from "@hooks/useToggle";
import {Button, Input, Form, Checkbox, Toast} from 'react-vant'
import {useState} from "react";
import {EyeInvisibleOutline, EyeOutline} from "antd-mobile-icons";
import NProgress from "nprogress";
import delayTwoSeconds from "@hooks/delaytwoTime";
import {useLoginByPasswordMutation} from "@store/apiSlice/authApiSlice";
import {useTypedDispatch} from "@store/index";
import {useNavigate} from "react-router-dom";
import {saveAuth} from "@store/slices/authSlice";

export default function Password() {
    // 控制密码是否显示
    const [visible, setVisible] = useToggle(true);
    // 复选框
    const [checked, setChecked] = useState(false)
    const [form] = Form.useForm()
    // 用于实现用户登录的方法
    const [loginByPassword] = useLoginByPasswordMutation()
    // 获取 dispatch 方法
    const dispatch = useTypedDispatch()
    // 获取路由对象
    const navigate = useNavigate()
    const onFinish = (values: { password: string; mobile: string }) => {
        // 如果没有选择同意协议退出
        if (!checked) {
            Toast.info('请勾选协议')
            return
        }
        const {mobile, password} = values
        // 用户登录
        NProgress.start()

        loginByPassword({mobile, password})
            .unwrap()
            .then((response) => {
                // 请求失败
                if (typeof response.success !== "undefined" && response.success === false) {
                    // 消息提示
                    return Toast.info(response.message);
                }
                // 请求成功, 保存用户登录凭据
                dispatch(saveAuth(response.data));
                // 消息提示
                Toast({
                    message: "登录成功",
                    onClose: () => {
                        // 跳转到个人中心页面
                        navigate("/personal");
                    },
                });
            });
        NProgress.done()
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
                initialValue={'13230000001'}
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
                name='mobile'
            >
                <Input name={'mobile'} autoComplete={'chrome-off'} placeholder='请输入用户名'/>
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
                initialValue={'abc12345'}
                name='password'
            >
                {/* autoComplete="current-password"*/}
                <Input name={'password'} autoComplete="current-password" type={!visible ? 'tel' : 'password'}
                       placeholder='请输入密码'
                       suffix={<div onClick={setVisible}> {!visible ?
                           <EyeOutline fontSize={20}/> : <EyeInvisibleOutline fontSize={20}/>}  </div>}
                />
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