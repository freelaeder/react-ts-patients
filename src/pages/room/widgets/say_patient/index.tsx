// src/pages/room/widgets/say_patient/index.tsx
import classNames from "classnames";
import styles from "@styles/room.module.scss";
import dateFormat from "dateformat";
interface Props {
    message: Message;
}

export default function SayPatient({ message }: Props) {
    return (
        <div className={classNames(styles.chat, styles.patient)}>
            <div className={styles.container}>
                <div className={styles.time}>
                    {dateFormat(message.createTime,'HH:MM:ss')}
                </div>
                <div className={styles.content}>{message.msg.content}</div>
            </div>
            <div className={styles.avatar}>
                <img src={message.fromAvatar} alt="" />
            </div>
        </div>
    );
}