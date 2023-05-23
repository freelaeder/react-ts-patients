// src/pages/room/index.tsx
import styles from "@styles/room.module.scss";
import {Helmet} from "react-helmet";
import Header from "@shared/header";
import classNames from "classnames";
import {PictureOutline, RightOutline, StarFill, StarOutline} from "antd-mobile-icons";
import React, {useEffect, useRef} from "react";
import TextareaAutosize from "react-textarea-autosize";
import {useNavigate, useSearchParams} from "react-router-dom";
import {io, Socket} from "socket.io-client";
import {useTypedSelector} from "@store/index";
import {selectToken} from "@store/slices/authSlice";

export default function Room() {
    // 用于实现页面跳转
    const navigate = useNavigate();
    // 用户存储socket 实例对象
    const socket = useRef<Socket | null>(null)
    // 获取路径参数
    const [searchParams] = useSearchParams()
    // 获取token
    const token = useTypedSelector(selectToken)
    // 获取订单
    const orderId = searchParams.get('orderId')
    // socket 连接与销毁
    useEffect(() => {
        socket.current = io(process.env.REACT_APP_BASE_URL!, {
            auth: {
                // 只有登录以后才能聊天
                token: `Bearer ${token}`,
            },
            query: {
                // 通过订单 id 绑定医生和患者
                orderId,
            },
        })
        // 监听连接成功事件
        socket.current.on("connect", () => console.log("socket连接成功"));
        // 监听连接失败事件
        socket.current.on("connect_error", (error) => console.log(error.message));
        // 监听连接断开事件
        socket.current.on("disconnect", () => console.log("连接已断开"));
        // 组件卸载前执行
        return () => {
            // 关闭 socket 实例
            socket.current?.close();
        };
    }, [orderId, token])

    return (
        <>
            <Helmet>
                <title>优医问诊-医生问诊室</title>
            </Helmet>
            <Header title="医生问诊室" backHandler={() => navigate("/")}/>
            <div className={styles.page}>
                <div className={styles.wait}>
                    已通知医生尽快接诊，24小时内医生未回复将自动取消
                </div>
                <div className={styles.consultation}>
                    <span>咨询中</span>
                    <i>剩余时间：23:12:03</i>
                </div>
                <div className={styles.consultation}>
                    <b>已结束</b>
                </div>
                <div className={styles.tips}>
                    <span>2023-02-21 19:46:43</span>
                </div>
                <div className={styles.card}>
                    <div className={styles.info_1}>李富贵 男 31岁</div>
                    <div className={styles.info_2}>一周内 | 未去医院就诊</div>
                    <ul className={styles.info_3}>
                        <li>
                            <span>病情描述</span>
                            <span>头痛、头晕、恶心</span>
                        </li>
                        <li>
                            <span>图片</span>
                            <span>点击查看</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.tips}>
                    <span>医护人员正在赶来，请耐心等候</span>
                </div>
                <div className={styles.tips}>
          <span>
            <i>温馨提示：</i>在线咨询不能代替面诊，医护人员建议仅供参考
          </span>
                </div>
                <div className={classNames(styles.chat, styles.doctor)}>
                    <div className={styles.avatar}>
                        <img src={'https://cp.itheima.net/assets/avatar-doctor.6cf240f4.svg'} alt=""/>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.time}>14:13</div>
                        <div className={styles.content}>请问头痛发生多久了？</div>
                    </div>
                </div>
                <div className={classNames(styles.chat, styles.patient)}>
                    <div className={styles.container}>
                        <div className={styles.time}>14:13</div>
                        <div className={styles.content}>不到4.5小时</div>
                    </div>
                    <div className={styles.avatar}>
                        <img src={'https://cp.itheima.net/assets/avatar-doctor.6cf240f4.svg'} alt=""/>
                    </div>
                </div>
                <div className={classNames(styles.chat, styles.patient)}>
                    <div className={classNames(styles.container, styles.imgContainer)}>
                        <div className={styles.time}>14:15</div>
                        <div className={styles.content}>
                            <img
                                src="http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/consult/production/20230226/6870643683958784.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={styles.avatar}>
                        <img src={'https://cp.itheima.net/assets/avatar-doctor.6cf240f4.svg'} alt=""/>
                    </div>
                </div>
                <div className={styles.tips}>
                    <span>正在为您开具处方，请耐心等待。</span>
                </div>
                <div className={styles.prescript}>
                    <div className={styles.patient}>
                        <div className={styles.info_1}>
                            <span>电子处方</span>
                            <i>
                                原始处方 <RightOutline/>
                            </i>
                        </div>
                        <div className={styles.info_2}>李富贵 男 31岁 血管性头痛</div>
                        <div className={styles.info_2}>开方时间：2022-01-15 14:21:42</div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.item}>
                            <div className={styles.name}>
                                <span>优赛明维生素E乳</span>
                                <span>x1</span>
                            </div>
                            <div className={styles.content}>
                                初剂量为一天3次，1次1/2片(5mg),每3天再增加1/2片(5mg)，直到最理想的效果出现。以后可再增加剂量；但每天最高剂量不得超过80mg(20mg，一天4次)，或遵医嘱。当需要停用时，要逐渐地减少剂量以避免副作用产生。
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.name}>
                                <span>骨筋丸胶囊(老专家) 每粒装0.3克</span>
                                <span>x5</span>
                            </div>
                            <div className={styles.content}>口服。一次3～4片，一日3次。</div>
                        </div>
                    </div>
                    <button className={styles.buy}>购买药品</button>
                </div>
                <div className={styles.appraise}>
                    <h4 className={styles.title}>医生服务评价</h4>
                    <p className={styles.question}>本次在线问诊服务您还满意吗？</p>
                    <div className={styles.stars}>
                        <StarFill/>
                        <StarFill/>
                        <StarFill/>
                        <StarFill/>
                        <StarOutline/>
                    </div>
                    <div className={styles.wrapper}>
                        <TextareaAutosize
                            className={styles.content}
                            placeholder="请描述您对医生的评价或是在医生看诊过程中遇到的问题"
                        />
                        <div className={styles.total}>0/150</div>
                    </div>
                    <div className={styles.meta}>
                        <label className={styles.unKnow}>
                            <input type="checkbox"/>
                            <span>匿名评价</span>
                        </label>
                        <button className={styles.submit}>提交评价</button>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <input type="text" className={styles.ask} placeholder="问医生"/>
                <div className={styles.upload}>
                    <PictureOutline/>
                    <input type="file"/>
                </div>
            </div>
        </>
    );
}