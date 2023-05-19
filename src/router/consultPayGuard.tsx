// src/router/consultPayGuard.tsx
import {useTypedSelector} from "@store/index";
import {selectConsult} from "@store/slices/consultSlice";
import {Navigate} from "react-router-dom";
import React from "react";
import {Toast} from "react-vant";

interface Props {
    children: React.ReactElement;
}

export default function ConsultPayGuard({children}: Props) {
    // 获取问诊记录
    const consult = useTypedSelector(selectConsult);
    // 检测信息是否完整
    // 1. 问诊类型
    // 2. 快速问诊类型
    // 3. 科室 id
    // 4. 病情描述
    // 5. 病情持续时间
    // 6. 是否就诊过
    if (
        typeof consult.type === "undefined" ||
        typeof consult.illnessType === "undefined" ||
        typeof consult.depId === "undefined" ||
        typeof consult.illnessDesc === "undefined" ||
        typeof consult.illnessTime === "undefined" ||
        typeof consult.consultFlag === "undefined" ||
        typeof consult.patientId === "undefined"
    ) {
        // 用户提示
        Toast.success({message: '问诊信息不完整, 请重新选择'})
        // 跳转到首页
        return <Navigate to="/"/>;
    }
    // 进入问诊订单预支付页面
    return children;
}