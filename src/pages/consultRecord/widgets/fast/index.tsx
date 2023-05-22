// 极速问诊组件
import styles from "@styles/consultRecord.module.scss";
import FastItem from "@pages/consultRecord/widgets/fastItem";
import {consultApiSlice, useLazyConsultRecordsQuery} from "@store/apiSlice/consultApiSlice";
import {useTypedDispatch, useTypedSelector} from "@store/index";
import {
    removeConsultOrder,
    saveConsultOrder,
    selectCurrent,
    selectFastRecords,
    selectHasMore,
    selectPageSize,
    updateCurrent, updateHasMore
} from "@store/slices/fastRecordSlice";
import Infinite from "@shared/infinite";
import {useEffect} from "react";
import {List} from "react-vant";

export default function FastRecord() {

    // 获取问诊列表
    const [requestConsultOrders] = useLazyConsultRecordsQuery()
    // 获取快速问诊订单列表
    const fastRecords = useTypedSelector(selectFastRecords);
    // 获取页码
    const current = useTypedSelector(selectCurrent);
    // 获取每页显示数据条数
    const pageSize = useTypedSelector(selectPageSize);
    // 获取是否还有更多数据的标识
    const hasMore = useTypedSelector(selectHasMore);
    // 获取 dispatch 方法
    const dispatch = useTypedDispatch();
    // 用于加载更多数据
    const loadMore = (): Promise<any> => {
        return requestConsultOrders({type: 2, current, pageSize})
            .unwrap()
            .then((response) => {
                // 表示是否还有更多数据的布尔值
                const hasMore = current < response.data.pageTotal;
                // 更新页码
                if (hasMore) dispatch(updateCurrent());
                // 是否还有更多数据
                dispatch(updateHasMore(hasMore));
                // 存储问诊订单列表
                dispatch(saveConsultOrder(response.data.rows));
            });
    };

    useEffect(() => {
        loadMore()
        return () => {
            dispatch(removeConsultOrder())
        }
    }, [])


    return (
        <>
            <ul className={styles.wrapper}>
                <List finished={!hasMore} onLoad={loadMore} finishedText={'没有更多数据了'}>
                    {
                        fastRecords.map(item => <FastItem key={item.id} record={item}/>)
                    }
                </List>
            </ul>
            {/*<Infinite hasMore={hasMore} loadMore={loadMore} direction="vertical"/>*/}
        </>

    );
}