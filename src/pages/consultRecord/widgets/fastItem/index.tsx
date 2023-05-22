// src/pages/consultRecord/widgets/fastItem/index.tsx
import styles from "@styles/consultRecord.module.scss";
import classNames from "classnames";

interface Props {
    record:ConsultOrder
}
export default function FastItem({record}:Props) {
    return (
        <li>
            <div className={styles.top}>
                <div className={styles.doctor}>
                    <div className={styles.avatar}>
                        <img src={'https://cp.itheima.net/assets/avatar-doctor.6cf240f4.svg'} alt="" />
                    </div>
                    <div className={styles.name}>极速问诊（自动分配医生）</div>
                </div>
                <div className={classNames(styles.status, )}>{record.statusValue}</div>
            </div>
            <div className={styles.des}>
                <div className={styles.item}>
                    <div className={styles.title}>病情描述</div>
                    <div className={styles.content}>{record.illnessDesc}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.title}>价格</div>
                    <div className={styles.content}>¥ {record.payment}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.title}>创建时间</div>
                    <div className={styles.content}>{record.createTime}</div>
                </div>
            </div>
            <div className={styles.meta}>
                <button className={classNames(styles.button, styles.gray)}>
                    取消问诊
                </button>
                <button className={classNames(styles.button, styles.green)}>
                    继续沟通
                </button>
            </div>
        </li>
    );
}