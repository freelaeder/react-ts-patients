// src/pages/department/index.tsx
import {Helmet} from "react-helmet";
import Header from "@shared/header";
import styles from "@styles/department.module.scss";
import classNames from "classnames";
import {useRequestDepartmentQuery} from "@store/apiSlice/departmentApiSlice";
import {Fragment, useState} from "react";

export default function Department() {
    const {data, isSuccess} = useRequestDepartmentQuery(undefined)
    // 当前激活的下标
    const [activeIndex,setActiveIndex] = useState(0)

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
                            <span key={item.id} className={styles.item}>{item.name}</span>
                        ))
                    }

                </div>

            </div>
        </>
    );
}