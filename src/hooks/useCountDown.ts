// src/hooks/useCountDown.ts
import { useState, useCallback, useRef, useEffect } from "react";

export default function useCountDown() {
    // 用于记录倒计时的开始时间
    const [seconds, setSeconds] = useState(0);
    // 用于记录是否正在倒计时
    const [isActive, setIsActive] = useState(false);
    // 用于保存定时器 id
    const timerRef = useRef<number>();
    // 开始倒计时
    const start = useCallback((seconds: number) => {
        // 设置倒计时时间
        setSeconds(seconds);
        // 正在倒计时
        setIsActive(true);
        // 开启定时器开始倒计时
        timerRef.current = window.setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);
    }, []);

    // 监控倒计时变化
    useEffect(() => {
        // 如果数值为 0
        if (seconds === 0) {
            // 清空定时器
            window.clearInterval(timerRef.current);
            // 没有在倒计时
            setIsActive(false);
        }
    }, [seconds]);

    return {
        day: toDouble(~~(seconds / 60 / 60 / 24)),
        hour: toDouble(~~((seconds / 60 / 60) % 24)),
        minute: toDouble(~~((seconds / 60) % 60)),
        seconds: toDouble(~~(seconds % 60)),
        isActive,
        start,
    };
}

function toDouble(n: number) {
    return n < 10 ? "0" + n : n;
}

// 天数：d = parseInt(总秒数 / 60 / 60 / 24)
// 小时：h = parseInt(总秒数 / 60 / 60 % 24)
// 分钟：m = parseInt(总秒数 / 60 % 60)
// 秒数：s = parseInt(总秒数 % 60)