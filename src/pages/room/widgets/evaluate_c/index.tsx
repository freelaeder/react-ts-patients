// src/pages/room/widgets/evaluate_c/index.tsx
// 评价已完成组件
import styles from "@styles/room.module.scss";
import {Rate} from "react-vant";

interface Props {
    score: number | undefined;
}

export default function EvaluateComplete({ score }: Props) {
    return (
        <div className={styles.appraise}>
            <h4 className={styles.title}>感谢您对本次服务做出评价</h4>
            <Rate value={score} color={'#fadb14'} voidColor={'#f5f5f5'} />
        </div>
    );
}