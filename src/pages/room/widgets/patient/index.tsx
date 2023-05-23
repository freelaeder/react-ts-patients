// src/pages/room/widgets/patient/index.tsx
import { IllnessTime } from "@enums/consult";
import styles from '@styles/room.module.scss'
import {ImagePreview} from "react-vant";
import {ConsultRecord} from "../../../../types/room";
interface Props {
    // 接收问诊信息和就诊信息
    consultRecord: ConsultRecord;
}



export default function Patient({
                                    consultRecord: {
                                        // 患者信息
                                        patientInfo,
                                        // 患病时间
                                        illnessTime,
                                        // 是否就诊过
                                        consultFlag,
                                        // 病情描述文字信息
                                        illnessDesc,
                                        // 病情描述图片
                                        pictures,
                                    },
                                }: Props) {
    const images = pictures.map(item => item.url)
    console.log(images,'im')
    return (
        <div className={styles.card}>
            <div className={styles.info_1}>
                {patientInfo.name} {patientInfo.genderValue}
                {patientInfo.age} 岁
            </div>
            <div className={styles.info_2}>
                {turnIllnessTime(illnessTime)} |{" "}
                {consultFlag === 0 ? "未就诊" : "就诊过"}
            </div>
            <ul className={styles.info_3}>
                <li>
                    <span>病情描述</span>
                    <span>{illnessDesc}</span>
                </li>
                {pictures.length > 0 && (
                    <li>
                        <span>图片</span>
                        <span   onClick={() =>
                            ImagePreview.open({
                                images  ,
                                onChange: (index) => console.log(`当前展示第${index + 1}张`),
                            })
                        } >点击查看</span>
                    </li>
                )}
            </ul>
        </div>
    );
}

// 将就诊时间转换为对应的文字描述
function turnIllnessTime(illnessTime: IllnessTime) {
    switch (illnessTime) {
        case IllnessTime.Week:
            return "一周内";
        case IllnessTime.Month:
            return "一月内";
        case IllnessTime.HalfYear:
            return "半年内";
        case IllnessTime.More:
            return "大于半年";
    }
}