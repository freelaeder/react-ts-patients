// src/pages/patient/widgets/edit/index.tsx
import styles from "@styles/editPatient.module.scss";
import Header from "@shared/header";
import classNames from "classnames";

export default function EditPatient() {
    return (
        <div className={styles.edit}>
            <Header title="添加患者" link="保存" />
            <form className={styles.form}>
                <div className={styles.formItem}>
                    <label>真实姓名</label>
                    <div className={styles.item}>
                        <input type="text" placeholder="请输入真实姓名" />
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label>身份证号</label>
                    <div className={styles.item}>
                        <input type="text" placeholder="请填写身份证号" />
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label>性别</label>
                    <div className={styles.item}>
                        <span className={classNames(styles.sex, styles.active)}>男</span>
                        <span className={styles.sex}>女</span>
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label>默认就诊人</label>
                    <div className={styles.item}>
                        <input type="checkbox" className={styles.default} />
                    </div>
                </div>
            </form>
            <button className={styles.remove}>删除患者</button>
        </div>
    );
}