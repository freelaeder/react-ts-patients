// src/types/profile.d.ts
// 登录用户个人信息
export interface Profile {
    // 用户 id
    id: string;
    // 头像
    avatar: string;
    // 手机号
    mobile: string;
    // 用户名
    account: string;
    // 关注数量
    likeNumber: number;
    // 收藏数量
    collectionNumber: number;
    // 总积分
    score: number;
    // 优惠券数量
    couponNumber: number;
    // 问诊中信息
    consultationInfo: ConsultationInfo[];
    // 订单信息
    orderInfo: OrderNumber;
}

// 订单数量信息
export interface OrderNumber {
    // 待付款订单数量
    paidNumber: number;
    // 待发货订单数量
    receivedNumber: number;
    // 待收货订单数量
    shippedNumber: number;
    // 已完成订单数量
    finishedNumber: number;
}

// 问诊信息
export interface ConsultationInfo {
    // 医生id
    id: string;
    // 医生姓名
    name: string;
    // 医生头像
    avatar: string;
    // 科室
    depName: string;
    // 职称
    positionalTitles: string;
    // 医院名称
    hospitalName: string;
    // 医院等级
    gradeName: string;
    // 订单id
    orderId: string;
}

// 个人信息接口返回值类型
export type ProfileResponse = HealthResponse<Profile>;