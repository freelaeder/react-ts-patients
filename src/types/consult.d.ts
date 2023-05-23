// src/types/consult.d.ts
/// <reference path="../enums/consult.ts" />

// 问诊类型
import {OrderStatus} from "@enums/consult";

enum ConsultType {
    // 找医生
    Doctor = 1,
    // 快速问诊
    Fast = 2,
    // 开药问诊
    Medication = 3,
}

// 问诊时间
enum IllnessTime {
    // 一周内
    Week = 1,
    // 一月内
    Month = 2,
    // 半年内
    HalfYear = 3,
    // 半年以上
    More = 4,
}

// 图片列表
type Image = {
    // 图片ID
    id: string;
    // 图片地址
    url: string;
};

// 问诊记录
type Consult = {
    // 问诊记录ID
    id: string;
    // 问诊类型
    type: ConsultType;
    // 快速问诊类型，0 普通 1 三甲
    illnessType: 0 | 1;
    // 科室ID
    depId: string;
    // 疾病描述
    illnessDesc: string;
    // 疾病持续时间
    illnessTime: IllnessTime;
    // 是否就诊过，0 未就诊过  1 就诊过
    consultFlag: 0 | 1;
    // 图片数组
    pictures: Image[];
    // 患者ID
    patientId: string;
    // 优惠券ID
    couponId: string;
};

// 问诊记录-全部可选
type PartialConsult = Partial<Consult>;


// 问诊订单预支付信息
type ConsultOrderPreData = {
    /** 积分抵扣 */
    pointDeduction: number;
    /** 优惠券抵扣 */
    couponDeduction: number;
    /** 优惠券ID */
    couponId: string;
    /** 需付款 */
    payment: number;
    /** 实付款 */
    actualPayment: number;
}
//问诊订单预付款接口返回值类型
type ConsultOrderPreDataResponse = HealthResponse<ConsultOrderPreData>

// 问诊订单预付款传参

type consultOrderPreParams = Pick<Consult, 'type' | 'illnessType'>

// 问诊记录列表接口需要传递的参数的类型
type ConsultRecordParams = Partial<PageParams & { type: ConsultType }>;

interface PatientInfo {
    id: string;
    name: string;
    idCard: string;
    gender: number;
    age: string;
}

interface DocInfo {
    id: string;
    name: string;
    avatar: string;
    depName: string;
    positionalTitles: string;
    major: string;
    hospitalName: string;
    gradeName: string;
    score: number;
    consultationNum: number;
    serviceFee: number;
    status: number;
}

interface ConsultOrder {
    id: string;
    orderNo: string;
    type: number;
    createTime: string;
    patientInfo: PatientInfo;
    illnessDesc: string;
    illnessTime: number;
    consultFlag: number;
    liverFunction: number;
    renalFunction: number;
    allergicHistory: number;
    fertilityStatus: number;
    docInfo?: DocInfo;
    prescriptionId?: string;
    recordId: string;
    status: OrderStatus;
    statusValue: string;
    cancelReason: string;
    cancelReasonValue: string;
    cancelProcess: string;
    countdown: number;
    payment: number;
    evaluateFlag: string;
}


// 问诊记录列表接口的返回值类型
type ConsultRecordResponse = HealthResponse<{
    total: number;
    pageTotal: number;
    rows: ConsultOrder[];
}>;
// 订单详情返回值类型
type ConsultOrderResponse = HealthResponse<ConsultOrder>;