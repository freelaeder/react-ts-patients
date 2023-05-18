// src/pages/home/widgets/doctors/index.tsx
import styles from "@styles/home.module.scss";
import {useLazyRequestDoctorsQuery} from "@store/apiSlice/doctorApiSlice";
import {useTypedDispatch, useTypedSelector} from "@store/index";
import {doctorSelectors, saveDoctors} from "@store/slices/doctorSlice";
import {useState} from "react";
import Infinite from "@shared/infinite";
import FocusDoctor from "@pages/home/widgets/doctors/focusDoctor";

export default function Doctors() {
    // 用于获取推荐医生列表
    const [requestDoctors] = useLazyRequestDoctorsQuery()
    //获取推荐医生列表
    const doctors = useTypedSelector(doctorSelectors.selectAll)
    // 页码
    const [current, setCurrent] = useState(1);
    // 每页加载数据条数
    const [pageSize] = useState(10);
    // 是否还有更多
    const [hasMore, setHasMore] = useState(true)
    const dispatch = useTypedDispatch()
    // 加载更多
    const loadMore = () => {
        return requestDoctors({
            current,
            pageSize,
        }).unwrap().then(res => {
            const {pageTotal, rows} = res.data
            // 保存数据至store
            dispatch(saveDoctors(rows))
            // 是否还有更多的数据
            setHasMore(current < pageTotal)
            // 页码加一
            if (hasMore) setCurrent(x => x + 1)
        })
    }


    return (
        <div className={styles.focus}>
            <div className={styles.top}>
                <h4>推荐关注</h4>
                <a href="#">查看更多 &gt;</a>
            </div>
            <div className={styles.container}>
                <div className={styles.inner}>
                    {
                        doctors.map(item => (
                            <div key={item.id} className={styles.item}>
                                <img
                                    src={item.avatar}
                                    alt=""
                                    className={styles.avatar}
                                />
                                <span className={styles.doctor}>{item.name}</span>
                                <span className={styles.hospital}>{item.hospitalName} {item.depName}</span>
                                <span className={styles.job}>{item.positionalTitles}</span>
                               <FocusDoctor doctor={item} />
                            </div>
                        ))
                    }
                    <Infinite direction="horizontal" loadMore={loadMore} hasMore={hasMore} />
                </div>
            </div>
        </div>
    );
}