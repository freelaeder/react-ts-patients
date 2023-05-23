// src/pages/room/widgets/action/index.tsx
import styles from "@styles/room.module.scss";
import {PictureOutline} from "antd-mobile-icons";
import {OrderStatus} from "@enums/consult";
import React, {useState} from "react";
import {Image} from "../../../../types/consult";
import {useUploadImgMutation} from "@store/apiSlice/uploadApiSlice";
import {Toast} from "react-vant";

interface Props {
    // 订单状态
    status: OrderStatus | undefined;
    sendMsg: (text: string) => void;
    sendImg: (img: Image) => void;
}

export default function Action({status, sendMsg, sendImg}: Props) {
    // 记录用户输入
    const [text, setText] = useState('')
    const checkIsEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMsg(text);
            setText("");
        }
    }
    //上传图片
    const [upload] = useUploadImgMutation()
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files
        if (files === null) return
        const file = files[0]
        // 判断文件是否小于5M
        if (file.size / 1024 / 1024 > 5) return Toast({message: "图片不能大于5M"});
        // 创建form对象
        const form = new FormData()
        // 追加file到form
        form.append('file', file)
        // 上传图片
        upload(form).unwrap().then((res) => {
            sendImg(res.data)
        })
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
                <PictureOutline/>
                <input type="file" onChange={onFileChange} disabled={status !== OrderStatus.ConsultChat}/>
            </div>
        </div>
    );
}