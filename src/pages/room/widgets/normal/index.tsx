// src/pages/room/widgets/normal/index.tsx
// 普通消息组件
import styles from "@styles/room.module.scss";

interface Props {
    msg: string;
}

export default function Normal({ msg }: Props) {
    return (
        <div className={styles.tips}>
            <span>{msg}</span>
        </div>
    );
}