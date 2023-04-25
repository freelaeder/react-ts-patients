// src/pages/patient/index.tsx
import styles from "@styles/patient.module.scss";
import {Helmet} from "react-helmet";
import Header from "@shared/header";
import classNames from "classnames";
import {useRequestPatientsQuery} from "@store/apiSlice/patientApiSlice";
import useLoading from "@hooks/useLoading";
import {useState} from "react";
import {Popup} from "react-vant";
import EditPatient from "@pages/patient/widgets/edit";
import {Patient as PatientType} from "../../types/patient";


// 身份证脱敏
function maskIdNumber(idNumber: string) {
    if (idNumber.length !== 18) {
        return idNumber; // 如果身份证长度不是18位，直接返回原始值
    }

    const startIndex = 6; // 需要脱敏的位置（第7位到第10位）
    const endIndex = 14;
    const maskedNumber = `${idNumber.substr(0, startIndex)}****${idNumber.substr(endIndex)}`;

    return maskedNumber;
}

export default function Patient() {

    // 发送请求获取患者列表
    const {data, isLoading, isSuccess} = useRequestPatientsQuery(undefined)
    // 获取loading
    useLoading(isLoading, isSuccess)

    // 控制编辑/添加患者
    const [visible, setVisible] = useState(false)
    // 用于存储要编辑的患者对象
    const [patient, setPatient] = useState<undefined | PatientType>()

    return (
        <>
            <Helmet>
                <title>优医问诊-家庭档案</title>
            </Helmet>
            <div className={styles.page}>
                <Header title="家庭档案"/>
                <div className={styles.message}>最多可添加6人</div>

                {
                    isSuccess && (
                        data.data.map(item => (
                            <div key={item.id} className={classNames(styles.item, {
                                [styles.active]: item.defaultFlag === 1
                            })}>
                                <div className={styles.info}>
                                    <div className={styles.i_1}>
                                        <span className={styles.name}>{item.name}</span>
                                        <span className={styles.id}>{maskIdNumber(item.idCard)}</span>
                                        {
                                            item.defaultFlag === 1 && <span className={styles.default}> 默认</span>
                                        }

                                    </div>
                                    <div className={styles.i_2}>
                                        <span className={styles.sex}>{item.genderValue}</span>
                                        <span className={styles.age}>{item.age}岁</span>
                                    </div>
                                </div>
                                <button onClick={() => {
                                    setVisible(true)
                                    setPatient(item)
                                }} className={styles.edit}>
                                    <img
                                        src={require("@icons/user/edit.svg").default}
                                        alt="编辑家庭档案"
                                    />
                                </button>
                            </div>
                        ))
                    )
                }
                <div onClick={() => {
                    setVisible(true)
                    setPatient(undefined)
                }} className={styles.add}>
                    <img src={require("@icons/user/add.svg").default} alt="添加患者"/>
                    <span>添加患者</span>
                </div>
                <Popup visible={visible} onClose={() => {
                    setVisible(false)

                }} style={{width: '100%', height: '100%'}}
                       position='right'>
                    <EditPatient patient={patient} setVisible={setVisible}/>
                </Popup>
                <div className={styles.next}>下一步</div>
            </div>
        </>
    );
}