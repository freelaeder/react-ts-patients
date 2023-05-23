// src/pages/room/widgets/say_doctor/index.tsx
import classNames from "classnames";
import styles from "@styles/room.module.scss";
import dateFormat from "dateformat";
import {MsgType} from "@enums/room";
interface Props {
    message: Message;
}

export default function SayDoctor({ message }: Props) {
    return (
        <div className={classNames(styles.chat, styles.doctor)}>
            <div className={styles.avatar}>
                <img src={'https://cp.itheima.net/assets/avatar-doctor.6cf240f4.svg'} alt="" />
            </div>
            <div className={classNames(styles.container,{
                [styles.imgContainer]:message.msgType === MsgType.MsgImage
            })}>
                <div className={styles.time}>{
                    dateFormat(message.createTime,'HH:MM:ss')
                }</div>
                <div className={styles.content}>
                    {message.msgType === MsgType.MsgImage ? (
                        <img src={message.msg.picture?.url} alt="" />
                    ) : (
                        message.msg.content
                    )}
                    </div>
            </div>
        </div>
    );
}