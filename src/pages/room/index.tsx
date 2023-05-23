// src/pages/room/index.tsx
import styles from "@styles/room.module.scss";
import {Helmet} from "react-helmet";
import Header from "@shared/header";
import {PictureOutline } from "antd-mobile-icons";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {io, Socket} from "socket.io-client";
import {useTypedSelector} from "@store/index";
import {selectToken} from "@store/slices/authSlice";
import {nanoid} from "@reduxjs/toolkit";
import {MsgType} from "@enums/room";
import Message from "@pages/room/widgets/message";

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
    // 用于保存默认聊天记录
    const [messages, setMessages] = useState<Message[]>([]);

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
        // 接收默认聊天记录
        socket.current.on('chatMsgList', ({data}: { data: TimeMessages[] }) => {
            // 遍历以时间段分割的消息组
            data.forEach((group) => {
                    // 保存消息
                    setMessages((messages) => [
                        // 创建普通系统消息 用于存储消息组的时间
                        {
                            id: nanoid(),
                            from: "sys",
                            fromAvatar: "",
                            to: "",
                            toAvatar: "",
                            createTime: group.createTime,
                            msgType: MsgType.Notify,
                            msg: {
                                content: group.createTime,
                            },
                        },
                        // // 存储消息列表
                        ...group.items,
                        ...messages,

                    ])

                }
            );
        })
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

                <Message messages={messages}/>
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