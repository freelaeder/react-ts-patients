// src/pages/room/index.tsx
import styles from "@styles/room.module.scss";
import {Helmet} from "react-helmet";
import Header from "@shared/header";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {io, Socket} from "socket.io-client";
import {useTypedSelector} from "@store/index";
import {selectAuth, selectToken} from "@store/slices/authSlice";
import {nanoid} from "@reduxjs/toolkit";
import {MsgType} from "@enums/room";
import MessageCom from "@pages/room/widgets/message";
import {useOrderDetailQuery} from "@store/apiSlice/consultApiSlice";
import Status from "@pages/room/widgets/status";
import Action from "@pages/room/widgets/action";
import {Image} from "../../types/consult";
import {Message, TimeMessages} from "../../types/room";

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
    // 用于获取订单详细信息
    const { data, refetch } = useOrderDetailQuery(orderId!);
    // 获取用户 id
    const { id } = useTypedSelector(selectAuth);

    // 获取.page
    const pageRef = useRef<HTMLDivElement| null>(null)

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
        // 监听订单状态变化
        socket.current.on("statusChange", () => {
            // 重新获取订单详情
            refetch();
        });
        // 接收默认聊天记录
        socket.current.on('chatMsgList', ({data}: { data: TimeMessages[] }) => {
            // 遍历以时间段分割的消息组
            data.forEach((group) => {
                    // 保存消息
                    setMessages((messages) => [
                        ...messages,
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
                    ])

                }
            );
        })
        // socket 连接与销毁
        socket.current.on('receiveChatMsg',(message:Message) => {
            //存储信息
            setMessages((messages) => [...messages,message])
            // 滚动位置
            requestIdleCallback(scrollToBottom)
        })

        // 组件卸载前执行
        return () => {
            // 关闭 socket 实例
            socket.current?.close();
        };
    }, [orderId,refetch, token])

    // 若页
     messages.sort(function (a, b){
         return new Date(a.createTime).getTime() - new Date(b.createTime).getTime()
     })

    // 滚动到最新位置
    const scrollToBottom = () => {
        pageRef.current?.scrollTo({
            top:pageRef.current?.scrollHeight,
            behavior:'smooth'
        })
    }
    // 用于发送文字信息
    const sendMsg = (text: string) => {
        socket.current?.emit("sendChatMsg", {
            from: id,
            to: data?.data.docInfo?.id,
            msgType: MsgType.MsgText,
            msg: { content: text },
        });
    };
    // 发送图片消息
    const sendImg = (img:Image) => {
        socket.current?.emit('sendChatMsg',{
            from: id,
            to: data?.data.docInfo?.id,
            msgType: MsgType.MsgImage,
            msg: { picture: img },
        })
    }

    return (
        <>
            <Helmet>
                <title>优医问诊-医生问诊室</title>
            </Helmet>
            <Header title="医生问诊室" backHandler={() => navigate("/")}/>
            <div ref={pageRef} className={styles.page}>
                <Status status={data?.data.status} countDown={data?.data.countdown} />
                <MessageCom messages={messages}/>
            </div>
            <Action sendMsg={sendMsg} sendImg={sendImg} status={data?.data.status} />
        </>
    );
}