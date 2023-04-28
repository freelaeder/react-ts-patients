// src/shared/layout/index.tsx
import styles from "@styles/layout.module.scss";
import {Outlet} from "react-router-dom";
import Tabbar from "@shared/tabbar";
import React, {useState} from "react";


export interface OutletContextType {
    scrollTop: number
}

export default function Layout() {
    // 用于记录滚动位置
    const [scrollTop, setScrollTop] = useState(0)
    // 内容区域滚动事件
    const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
        // 记录滚动的位置
        setScrollTop(event.currentTarget.scrollTop)
    }

    return (
        <div className={styles.page}>
            <div className={styles.container} onScroll={scrollHandler}>
                <Outlet context={{scrollTop}}/>
            </div>
            <div className={styles.footer}>
                <Tabbar/>
            </div>
        </div>
    );
}