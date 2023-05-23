// src/pages/room/widgets/say_patient/index.tsx
import classNames from "classnames";
import styles from "@styles/room.module.scss";
import dateFormat from "dateformat";
import {MsgType} from "@enums/room";

interface Props {
    message: Message;
}

export default function SayPatient({message}: Props) {
    return (
        <div className={classNames(styles.chat, styles.patient)}>
            <div className={classNames(styles.container, {
                [styles.imgContainer]: message.msgType === MsgType.MsgImage
            })}>
                <div className={styles.time}>
                    {dateFormat(message.createTime, 'HH:MM:ss')}
                </div>
                <div className={styles.content}>
                    {
                        message.msgType === MsgType.MsgImage ? (
                            <img src={message.msg.picture?.url} alt=""/>
                        ) : (message.msg.content)
                    }
                </div>
            </div>
            <div className={styles.avatar}>
                <img src={message.fromAvatar} alt=""/>
            </div>
        </div>
    );
}