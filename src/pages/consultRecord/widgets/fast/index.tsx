// src/pages/consultRecord/widgets/fast/index.tsx
// 极速问诊组件
import styles from "@styles/consultRecord.module.scss";
import classNames from "classnames";

export default function FastRecord() {
    return (
        <ul className={styles.wrapper}>
            <li>
                <div className={styles.top}>
                    <div className={styles.doctor}>
                        <div className={styles.avatar}>
                            {/*<img src={require("@icons/consult/avatar.svg").default} alt="" />*/}
                        </div>
                        <div className={styles.name}>极速问诊（自动分配医生）</div>
                    </div>
                    <div className={classNames(styles.status, styles.notPay)}>待支付</div>
                </div>
                <div className={styles.des}>
                    <div className={styles.item}>
                        <div className={styles.title}>病情描述</div>
                        <div className={styles.content}>腹痛腹泻 胃部有些痉挛</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.title}>价格</div>
                        <div className={styles.content}>¥ 39.00</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.title}>创建时间</div>
                        <div className={styles.content}>2019-07-08 09:55:54</div>
                    </div>
                </div>
                <div className={styles.meta}>
                    <button className={classNames(styles.button, styles.gray)}>
                        取消问诊
                    </button>
                    <button className={classNames(styles.button, styles.green)}>
                        去支付
                    </button>
                    <button className={classNames(styles.button, styles.green)}>
                        继续沟通
                    </button>
                    <button className={classNames(styles.button, styles.gray)}>
                        查看处方
                    </button>
                    <button className={classNames(styles.button, styles.gray)}>
                        删除订单
                    </button>
                    <button className={classNames(styles.button, styles.green)}>
                        咨询其他医生
                    </button>
                    <button className={classNames(styles.button, styles.gray)}>
                        问诊记录
                    </button>
                    <button className={classNames(styles.button, styles.green)}>
                        写评价
                    </button>
                    <button className={classNames(styles.button, styles.green)}>
                        查看评价
                    </button>
                </div>
            </li>
        </ul>
    );
}