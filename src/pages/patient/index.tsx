// src/pages/patient/index.tsx
import styles from "@styles/patient.module.scss";
import { Helmet } from "react-helmet";
import Header from "@shared/header";
import classNames from "classnames";

export default function Patient() {
    return (
        <>
            <Helmet>
                <title>优医问诊-家庭档案</title>
            </Helmet>
            <div className={styles.page}>
                <Header title="家庭档案" />
                <div className={styles.message}>最多可添加6人</div>
                <div className={styles.item}>
                    <div className={styles.info}>
                        <div className={styles.i_1}>
                            <span className={styles.name}>李富贵</span>
                            <span className={styles.id}>150***********4302</span>
                        </div>
                        <div className={styles.i_2}>
                            <span className={styles.sex}>女</span>
                            <span className={styles.age}>20岁</span>
                        </div>
                    </div>
                    <button className={styles.edit}>
                        <img
                            src={require("@icons/user/edit.svg").default}
                            alt="编辑家庭档案"
                        />
                    </button>
                </div>
                <div className={classNames(styles.item, styles.active)}>
                    <div className={styles.info}>
                        <div className={styles.i_1}>
                            <span className={styles.name}>李富贵</span>
                            <span className={styles.id}>150***********4302</span>
                            <span className={styles.default}>默认</span>
                        </div>
                        <div className={styles.i_2}>
                            <span className={styles.sex}>女</span>
                            <span className={styles.age}>20岁</span>
                        </div>
                    </div>
                    <button className={styles.edit}>
                        <img
                            src={require("@icons/user/edit.svg").default}
                            alt="编辑家庭档案"
                        />
                    </button>
                </div>
                <div className={styles.add}>
                    <img src={require("@icons/user/add.svg").default} alt="添加患者" />
                    <span>添加患者</span>
                </div>
                <div className={styles.next}>下一步</div>
            </div>
        </>
    );
}