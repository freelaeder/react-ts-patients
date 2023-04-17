import {useEffect, useRef, useState} from "react";
import {Progress} from "react-vant";
import useProgress from "@hooks/useFakeProgress";

interface FakeProgressProps {
    time?: number;
    color?: string;
}

export default function FakeProgress({time = 2000, ...props}: FakeProgressProps) {
    const [percent, setPercent] = useState(0);
    const timer = useRef<NodeJS.Timeout>();
    const [count, end] = useProgress()

    const start = () => {
        clearInterval(timer.current!);
        setPercent(0);
        timer.current = setInterval(() => {
            setPercent((prev) => prev + 20);
        }, time / 5);

    };


    useEffect(() => {
        if (percent >= 100) {
            clearInterval(timer.current);
        }
    }, [percent])


    // useEffect(() => {
    //     const li = setTimeout(() => {
    //         setPercent(x => x + 20)
    //     }, 2000 / 5)
    //     return () => {
    //         clearTimeout(li)
    //     }
    // }, [Math.min(percent, 80)])

    return (
        <>
            <Progress {...props} percentage={percent}/>
        </>
    );
}
