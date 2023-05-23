// src/pages/room/widgets/prescript/index.tsx
import styles from "@styles/room.module.scss";
import {RightOutline} from "antd-mobile-icons";
import {Prescription} from "../../../../types/room";
import { usePrescriptionQuery} from "@store/apiSlice/consultApiSlice";
import {ImagePreview} from "react-vant";

interface Props {
    // 处方
    prescription: Prescription;
}

export default function Prescript({prescription}: Props) {
    const {data} = usePrescriptionQuery(prescription.id)
    if(!data) return null

    const images = [data?.data.url]
    return (
        <div className={styles.prescript}>
            <div className={styles.patient}>
                <div className={styles.info_1}>
                    <span>电子处方</span>
                    <i onClick={() => {
                        ImagePreview.open({
                            images,
                            onChange: (index) => console.log(`当前展示第${index + 1}张`),
                        })
                    }}>
                        原始处方 <RightOutline/>
                    </i>
                </div>
                <div
                    className={styles.info_2}>{prescription.name} {prescription.genderValue} {prescription.age}岁 {prescription.diagnosis}</div>
                <div className={styles.info_2}>开方时间：{prescription.createTime}</div>
            </div>
            <div className={styles.body}>
                {
                    prescription.medicines.map(item => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.name}>
                                <span>{item.name}</span>
                                <span>x{item.quantity}</span>
                            </div>
                            <div className={styles.content}>
                                {item.usageDosag}
                            </div>
                        </div>
                    ))
                }


            </div>
            <button className={styles.buy}>购买药品</button>
        </div>
    );
}