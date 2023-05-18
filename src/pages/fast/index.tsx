// src/pages/fast/index.tsx
import styles from "@styles/fast.module.scss";
import { Helmet } from "react-helmet";
import Header from "@shared/header";
import { RightOutline } from "antd-mobile-icons";

export default function Fast() {
    return (
        <>
            <Helmet>
                <title>优医问诊-极速问诊</title>
            </Helmet>
            <Header title="极速问诊" link="问诊记录" />
            <div className={styles.page}>
                <div className={styles.picture}>
                    {/*<img src={require("@images/fast.png")} alt="" />*/}
                </div>
                <div className={styles.tip}>
                    <span>20s</span>快速匹配专业医生
                </div>
                <div className={styles.options}>
                    <div className={styles.item}>
                        <div className={styles.left}>
                            <div className={styles.imgContainer}>
                                <img
                                    src={require("@icons/consult/doctor.svg").default}
                                    alt=""
                                />
                            </div>
                            <div className={styles.title}>
                                <h4>三甲图文问诊</h4>
                                <h5>三甲主治及以上级别医生</h5>
                            </div>
                        </div>
                        <RightOutline className={styles.gt} />
                    </div>
                    <div className={styles.item}>
                        <div className={styles.left}>
                            <div className={styles.imgContainer}>
                                <img
                                    src={require("@icons/consult/message.svg").default}
                                    alt=""
                                />
                            </div>
                            <div className={styles.title}>
                                <h4>三甲图文问诊</h4>
                                <h5>三甲主治及以上级别医生</h5>
                            </div>
                        </div>
                        <RightOutline className={styles.gt} />
                    </div>
                </div>
            </div>
        </>
    );
}