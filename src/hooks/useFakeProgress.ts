import {useEffect, useRef, useState} from "react";

type UseProgressReturnType = [count: number, start: () => void, end: () => void];
// 生成一到一百
export default function useProgress(): UseProgressReturnType {
    const [count, setCount] = useState<number>(0);
    const timer = useRef<NodeJS.Timeout>();
    useEffect(() => {
        if (count >= 100) {
            return undefined;
        }

        timer.current = setTimeout(() => {
            setCount((prevCount) =>
                Math.min(prevCount + Math.floor(Math.random() * 10) + 1, 100)
            );
        }, 2000 / (5 * (count / 10 + 1))); // 计时器的时间间隔随着 count 的增加而逐渐变慢
        return () => clearTimeout(timer.current!);
    }, [count]);

    const start = () => setCount(0);
    const end = () => setCount(100);

    return [count, start, end];
}
