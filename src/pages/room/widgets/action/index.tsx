// src/pages/room/widgets/action/index.tsx
import styles from "@styles/room.module.scss";
import { PictureOutline } from "antd-mobile-icons";
import { OrderStatus } from "@enums/consult";
import React, {useState} from "react";

interface Props {
    // 订单状态
    status: OrderStatus;
    sendMsg:(text:string) => void;
}

export default function Action({ status,sendMsg }: Props) {
    // 记录用户输入
    const [text,setText] =useState('')
    const checkIsEnter = (event:React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            sendMsg(text);
            setText("");
        }
    }

    return (
        <div className={styles.bottom}>
            <input
                disabled={status !== OrderStatus.ConsultChat}
                type="text"
                className={styles.ask}
                placeholder="问医生"
                value={text}
                onChange={event => setText(event.currentTarget.value)}
                onKeyUp={checkIsEnter}
            />
            <div className={styles.upload}>
                <PictureOutline />
                <input type="file" disabled={status !== OrderStatus.ConsultChat} />
            </div>
        </div>
    );
}