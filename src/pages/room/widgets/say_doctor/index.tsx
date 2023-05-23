// src/pages/room/widgets/say_doctor/index.tsx
import classNames from "classnames";
import styles from "@styles/room.module.scss";
import dateFormat from "dateformat";
interface Props {
    message: Message;
}

export default function SayDoctor({ message }: Props) {
    return (
        <div className={classNames(styles.chat, styles.doctor)}>
            <div className={styles.avatar}>
                <img src={'https://cp.itheima.net/assets/avatar-doctor.6cf240f4.svg'} alt="" />
            </div>
            <div className={styles.container}>
                <div className={styles.time}>{
                    dateFormat(message.createTime,'HH:MM:ss')
                }</div>
                <div className={styles.content}>{message.msg.content}</div>
            </div>
        </div>
    );
}