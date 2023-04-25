import React from 'react';
import styles from "@styles/editPatient.module.scss";
import {useDeletePatientMutation} from "@store/apiSlice/patientApiSlice";
import {Dialog, Toast} from "react-vant";


interface Props {
    // 要删除的患者的 id
    id: string;
    // 要删除的患者的姓名
    name: string;
    // 控制弹框显示和隐藏
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function RemovePatient({id, name, setVisible}: Props) {
    // 用于删除患者信息
    const [deletePatient] = useDeletePatientMutation()
    return (
        <button className={styles.remove} onClick={() => {
            Dialog.confirm({
                title: '温馨提示',
                message: `您确定删除 ${name} 患者信息吗?`,
            })
                .then(() => {
                    deletePatient(id)
                        .unwrap()
                        .then(res => {
                            if (res.code === 10000 && res.message === '请求成功') {
                                Toast({
                                    message: '删除成功'
                                })
                                //隐藏·Popur
                                setVisible(false)
                            } else {
                                Toast({
                                    message: '删除失败'
                                })
                            }
                        })

                })
                .catch(() => {
                    Toast({
                        message: '取消删除'
                    })
                })

        }
        }>
            删除患者
        </button>
    );
}

export default RemovePatient;