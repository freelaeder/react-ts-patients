// src/pages/patient/index.tsx
import styles from "@styles/patient.module.scss";
import {Helmet} from "react-helmet";
import Header from "@shared/header";
import classNames from "classnames";
import {useRequestPatientsQuery} from "@store/apiSlice/patientApiSlice";
import useLoading from "@hooks/useLoading";

export default function Patient() {

    // 发送请求获取患者列表
    const {data, isLoading, isSuccess} = useRequestPatientsQuery(undefined)
    // 获取loading
    useLoading(isLoading, isSuccess)

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
                            <div key={item.id} className={classNames(styles.item ,{
                                [styles.active]:item.defaultFlag === 1
                            }) }>
                                <div className={styles.info}>
                                    <div className={styles.i_1}>
                                        <span className={styles.name}>{item.name}</span>
                                        <span className={styles.id}>{item.idCard}</span>
                                        {
                                            item.defaultFlag === 1 && <span className={styles.default}> 默认</span>
                                        }

                                    </div>
                                    <div className={styles.i_2}>
                                        <span className={styles.sex}>{item.genderValue}</span>
                                        <span className={styles.age}>{item.age}岁</span>
                                    </div>
                                </div>
                                <button className={styles.edit}>
                                    <img
                                        src={require("@icons/user/edit.svg").default}
                                        alt="编辑家庭档案"
                                    />
                                </button>
                            </div>
                        ))
                    )
                }
                <div className={styles.add}>
                    <img src={require("@icons/user/add.svg").default} alt="添加患者"/>
                    <span>添加患者</span>
                </div>
                <div className={styles.next}>下一步</div>
            </div>
        </>
    );
}