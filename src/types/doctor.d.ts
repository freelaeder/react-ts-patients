// src/types/doctor.d.ts
// 医生卡片对象
type Doctor = {
    // 医生ID
    id: string;
    // 医生名称
    name: string;
    // 头像
    avatar: string;
    // 医院名称
    hospitalName: string;
    // 医院等级
    gradeName: string;
    // 科室
    depName: string;
    // 职称
    positionalTitles: string;
    // 是否关注，0 未关注 1 已关注
    likeFlag: 0 | 1;
    // 接诊服务费
    serviceFee: number;
    // 接诊人数
    consultationNum: number;
    // 评分
    score: number;
    // 主攻方向
    major: string;
};

// 医生分页
type DoctorWithPage = {
    pageTotal: number;
    total: number;
    rows: Doctor[];
};



// 推荐医生关注列表接口的返回值类型
type DoctorResponse = HealthResponse<DoctorWithPage>;



