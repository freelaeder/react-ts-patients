// src/types/consult.d.ts
/// <reference path="../enums/consult.ts" />

// 问诊类型
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