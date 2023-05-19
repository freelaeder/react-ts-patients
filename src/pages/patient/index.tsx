// src/pages/patient/index.tsx
import styles from "@styles/patient.module.scss";
import {Helmet} from "react-helmet";
import Header from "@shared/header";
import classNames from "classnames";
import {useRequestPatientsQuery} from "@store/apiSlice/patientApiSlice";
import useLoading from "@hooks/useLoading";
import {useEffect, useState} from "react";
import {Popup} from "react-vant";
import EditPatient from "@pages/patient/widgets/edit";
import {Patient as PatientType} from "../../types/patient";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useTypedDispatch} from "@store/index";
import {saveConsult} from "@store/slices/consultSlice";


// 身份证脱敏
function maskIdNumber(idNumber: string) {
    if (idNumber.length !== 18) {
        return idNumber; // 如果身份证长度不是18位，直接返回原始值
    }

    const startIndex = 6; // 需要脱敏的位置（第7位到第10位）
    const endIndex = 14;
    return `${idNumber.substr(0, startIndex)}****${idNumber.substr(endIndex)}`;
}

export default function Patient() {

    // 发送请求获取患者列表
    const {data, isLoading, isSuccess} = useRequestPatientsQuery(undefined)
    // 获取loading
    useLoading(isLoading, isSuccess)
    // 获取路径之中的u
    const [searchParams] = useSearchParams();
    // 标识当前进入的是家庭档案页面还是选择患者页面
    const isSelect = searchParams.has('u')
    // 用于记录用户选择的id
    const [uid, setUid] = useState<string | undefined>(undefined)

    // 控制编辑/添加患者
    const [visible, setVisible] = useState(false)
    // 用于存储要编辑的患者对象
    const [patient, setPatient] = useState<undefined | PatientType>()
    // 获取 dispatch 方法
    const dispatch = useTypedDispatch();
    // 获取页面跳转方法
    const navigate = useNavigate();


    // 自动选择患者
    useEffect(() => {
        if (!isSuccess) return;
        if (data?.data.length === 0) {
            setUid(undefined)
            dispatch(saveConsult({patientId: undefined}))
        } else {
            // 查找默认患者
            let selectPatient = data.data.find((item) => item.defaultFlag === 1);
            // 如果默认患者不存在 将患者列表中的第一个患者设置为选中患者
            if (typeof selectPatient === 'undefined') selectPatient = data.data[0]
            // 存储选择患者 id
            setUid(selectPatient.id)
        }
    }, [isSuccess])

    return (
        <>
            <Helmet>
                <title>优医问诊-家庭档案</title>
            </Helmet>
            <div className={styles.page}>
                <Header title={isSelect ? '选择患者' : '家庭档案'}/>
                <div className={styles.message}>最多可添加6人</div>

                {
                    isSuccess && (
                        data.data.map(item => (
                            <div onClick={() => setUid(item.id)} key={item.id} className={classNames(styles.item, {
                                [styles.active]: item.id === uid
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
                <div onClick={() => {
                    dispatch(saveConsult({patientId: uid}));
                    navigate('/consultPay')

                }} className={styles.next}>下一步
                </div>
            </div>
        </>
    );
}