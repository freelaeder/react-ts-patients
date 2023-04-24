// src/types/patient.d.ts
export interface Patient {
    // 患者 id
    id: string;
    // 患者姓名
    name: string;
    // 患者身份证号
    idCard: string;
    // 0 非默认 1 默认
    defaultFlag: 0 | 1;
    // 性别 1 男 0 女
    gender: 0 | 1;
    // 性别值
    genderValue: "男" | "女";
    // 年龄
    age: number;
}

export type PatientResponse = HealthResponse<Patient[]>;