// src/pages/consultRecord/index.tsx
import styles from "@styles/consultRecord.module.scss";
import Header from "@shared/header";
import { Outlet, useNavigate } from "react-router-dom";

export default function ConsultRecord() {
    // 用户实现页面跳转
    const navigate = useNavigate();
    return (
        <>
            <Header title="问诊记录" />
            <div className={styles.page}>
                <div className={styles.tab}>
                    <h5 onClick={() => navigate("/record/fast")} className={styles.active}>极速问诊</h5>
                    <h5 onClick={() => navigate("/record/doctor")}>问医生</h5>
                    <h5 onClick={() => navigate("/record/medicinal")}>开药问诊</h5>
                    <div className={styles.line}></div>
                </div>
                <Outlet />
            </div>
        </>
    );
}