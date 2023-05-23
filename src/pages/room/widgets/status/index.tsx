// src/pages/room/widgets/status/index.tsx
import styles from "@styles/room.module.scss";
import {OrderStatus} from "@enums/consult";
import useCountDown from "@hooks/useCountDown";
import {useEffect} from "react";

interface Props {
    // 订单类型
    status?: OrderStatus;
    // 倒计时时间
    countDown?: number;
}

export default function Status({status,countDown}:Props) {
    // const {current} = hooks.useCountDown({
    //     time: 24 * 60 * 60 * 1000 ,
    //     autostart:true
    // })
    // 用于实现倒计时
    const { seconds, hour, minute, start, isActive } = useCountDown();
    // 实现倒计时
    useEffect(() => {
        // 如果倒计时时间存在并且没有正在倒计时
        if (typeof countDown !== "undefined" && !isActive) {
            // 开启倒计时
            start(countDown);
        }
    }, [countDown, isActive, start]);

    switch (status) {
        case OrderStatus.ConsultWait:
            return (
                <div className={styles.wait}>
                    已通知医生尽快接诊，24小时内医生未回复将自动取消
                </div>
            );
        case OrderStatus.ConsultChat:
            return (
                <div className={styles.consultation}>
                    <span>咨询中</span>
                    <i>剩余时间：{hour}:{minute}:{seconds}</i>
                </div>
            );
        case OrderStatus.ConsultComplete:
            return (
                <div className={styles.consultation}>
                    <b>已结束</b>
                </div>
            );
        default:
            return null;
    }

}