// src/shared/infinite/index.tsx
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import styles from "@styles/infinite.module.scss";
import classNames from "classnames";

interface Props {
    hasMore: boolean;
    loadMore: () => Promise<any>;
    direction: "vertical" | "horizontal";
}

export default function Infinite({
                                     direction = "vertical",
                                     hasMore,
                                     loadMore,
                                 }: Props) {
    const { ref, inView } = useInView();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // 如果进入可视区, 如果没有正在加载, 如果还有更多数据可以加载
        if (inView && hasMore && !loading) {
            setLoading(true);
            loadMore().finally(() => requestIdleCallback(() => setLoading(false)));
        }
    }, [hasMore, inView, loadMore, loading]);
    return (
        <div
            ref={ref}
            className={classNames(styles.container, {
                [styles.vertical]: direction === "vertical",
                [styles.horizontal]: direction === "horizontal",
            })}
        >
            {loading && "拼命加载中"}
            {!hasMore && "没有更多数据可以加载"}
        </div>
    );
}