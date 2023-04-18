// src/shared/layout/index.tsx
import styles from "@styles/layout.module.scss";
import { Outlet } from "react-router-dom";
import Tabbar from "@shared/tabbar";

export default function Layout() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Outlet />
            </div>
            <div className={styles.footer}>
                <Tabbar />
            </div>
        </div>
    );
}