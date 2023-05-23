
// 一条消息的类型
import {Consult} from "./consult";
import {Patient} from "./patient";

type Message = {
    // 消息ID
    id: string;
    // 消息类型
    msgType: MsgType;
    // 发消息的人
    from: string;
    // 发消息的人的ID
    fromAvatar: string;
    // 收消息的人
    to: string;
    // 收消息的人的头像
    toAvatar: string;
    // 消息创建时间
    createTime: string;
    // 消息主体
    msg: {
        // 文本消息内容
        content?: string;
        // 图片消息对象
        picture?: Image;
        // 问诊记录: 问诊记录、患者信息
        consultRecord?: ConsultRecord;
        // 处方信息
        prescription?: Prescription;
        // 评价信息
        evaluateDoc?: EvaluateDoc;
    };
};

// 问诊记录、患者信息 (患者卡片)
type ConsultRecord = Consult & { patientInfo: Patient };

// 处方信息
type Prescription = {
    // 处方ID
    id: string;
    // 药品订单ID
    orderId: string;
    // 处方创建时间
    createTime: string;
    // 患者名称
    name: string;
    // 问诊记录ID
    recordId: string;
    // 性别 0 女 1 男
    gender: 0 | 1;
    // 性别文字
    genderValue: "";
    // 年龄
    age: number;
    // 诊断信息
    diagnosis: string;
    // 处方状态
    status: PrescriptionStatus;
    // 药品清单
    medicines: Medical[];
};

// 药品清单
type Medical = {
    // 药品ID
    id: string;
    // 药品名称
    name: string;
    // 药品金额
    amount: string;
    // 药品图片
    avatar: string;
    // 药品规格信息
    specs: string;
    // 药品用法用量
    usageDosag: string;
    // 药品数量
    quantity: string;
    // 否处方，0 不是 1 是
    prescriptionFlag: 0 | 1;
};

// 评价信息
type EvaluateDoc = {
    // 评价ID
    id?: string;
    // 评分
    score?: number;
    // 内容
    content?: string;
    // 创建时间
    createTime?: string;
    // 创建人
    creator?: string;
};

// 消息分组列表
type TimeMessages = {
    // 分组消息最早时间
    createTime: string;
    // 消息数组
    items: Message[];
    // 订单ID
    orderId: string;
    // 会话ID
    sid: string;
};