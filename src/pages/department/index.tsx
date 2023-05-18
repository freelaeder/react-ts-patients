// src/pages/department/index.tsx
import { Helmet } from "react-helmet";
import Header from "@shared/header";
import styles from "@styles/department.module.scss";
import classNames from "classnames";

export default function Department() {
    return (
        <>
            <Helmet>
                <title>优医问诊-选择科室</title>
            </Helmet>
            <Header title="选择科室" />
            <div className={styles.page}>
                <div className={styles.left}>
                    <span className={styles.item}>外科</span>
                    <span className={classNames(styles.item, styles.active)}>内科</span>
                    <span className={styles.item}>妇产科学</span>
                    <span className={styles.item}>儿科学</span>
                    <span className={styles.item}>骨外科</span>
                    <span className={styles.item}>眼科学</span>
                    <span className={styles.item}>口腔科学</span>
                    <span className={styles.item}>耳鼻咽喉头颈科</span>
                </div>
                <div className={styles.right}>
                    <span className={styles.item}>心血管内科</span>
                    <span className={styles.item}>普通内科</span>
                    <span className={styles.item}>神经内科</span>
                    <span className={styles.item}>消化内科</span>
                </div>
            </div>
        </>
    );
}