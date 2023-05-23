// src/pages/room/widgets/evaluate/index.tsx
import styles from "@styles/room.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import {Rate, Toast} from "react-vant";
import {useState} from "react";
import {useEvaluateDoctorMutation} from "@store/apiSlice/consultApiSlice";

interface Props {
    docId: string;
    orderId: string;
}

export default function Evaluate({docId, orderId}: Props) {
    // 评价分数
    const [value, setValue] = useState(3);
    // 评价内容
    const [con, setCon] = useState('')
    // 是否匿名
    const [anony, setAnony] = useState(false)
    // 评价方法
    const [sendEva] = useEvaluateDoctorMutation()
    const evaluate = () => {
        if (con.trim().length === 0) return Toast({message: '请输入评价内容'})
        sendEva({docId, orderId, score: value, content: con, anonymousFlag: anony ? 1 : 0}).unwrap().then(() => {
            Toast({message: '提交评价成功'})
        })
    }
    return (
        <div className={styles.appraise}>
            <h4 className={styles.title}>医生服务评价</h4>
            <p className={styles.question}>本次在线问诊服务您还满意吗？</p>
            <div className={styles.stars}>
                <Rate value={value} color={'#fadb14'} voidColor={'#f5f5f5'} onChange={setValue}/>
            </div>
            <div className={styles.wrapper}>
                <TextareaAutosize
                    className={styles.content}
                    placeholder="请描述您对医生的评价或是在医生看诊过程中遇到的问题"
                    maxLength={150}
                    value={con}
                    onChange={event => setCon(event.currentTarget.value)}
                />
                <div className={styles.total}>{con.length}/150</div>
            </div>
            <div className={styles.meta}>
                <label className={styles.unKnow}>
                    <input checked={anony} onChange={event => setAnony(event.currentTarget.checked)} type="checkbox"/>
                    <span>匿名评价</span>
                </label>
                <button onClick={evaluate} className={styles.submit}>提交评价</button>
            </div>
        </div>
    );
}