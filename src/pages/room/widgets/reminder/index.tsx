// src/pages/room/widgets/reminder/index.tsx
// 温馨提示消息组件
import styles from "@styles/room.module.scss";

interface Props {
    msg: string;
}

export default function Reminder({ msg }: Props) {
    return (
        <div className={styles.tips}>
      <span>
        <i>温馨提示：</i>
          {msg}
      </span>
        </div>
    );
}