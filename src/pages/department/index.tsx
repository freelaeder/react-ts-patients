// src/pages/department/index.tsx
import {Helmet} from "react-helmet";
import Header from "@shared/header";
import styles from "@styles/department.module.scss";
import classNames from "classnames";
import {useRequestDepartmentQuery} from "@store/apiSlice/departmentApiSlice";
import { useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTypedDispatch} from "@store/index";
import {saveConsult} from "@store/slices/consultSlice";

export default function Department() {
    const {data, isSuccess} = useRequestDepartmentQuery(undefined)
    // 当前激活的下标
    const [activeIndex,setActiveIndex] = useState(0)
    const navigate = useNavigate()
    const dispatch = useTypedDispatch()

    if (!isSuccess) return null
    return (
        <>
            <Helmet>
                <title>优医问诊-选择科室</title>
            </Helmet>
            <Header title="选择科室"/>
            <div className={styles.page}>

                <div className={styles.left}>
                    {
                        data.data.map((item,index) => (
                            <span onClick={() => setActiveIndex(index) } key={item.id} className={classNames(styles.item, {
                                [styles.active]: index === activeIndex
                            })}>{item.name}</span>
                        ))
                    }
                </div>
                <div className={styles.right}>
                    {
                        data.data[activeIndex].child.map(item => (
                            <span onClick={() => {
                                dispatch(saveConsult({depId:item.id}));
                                navigate('/illness')
                            } }  key={item.id} className={styles.item}>{item.name}</span>
                        ))
                    }

                </div>

            </div>
        </>
    );
}