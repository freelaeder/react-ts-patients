import React, {useEffect} from "react";
import {useMockProgress} from "mock-progress-react";
import {Progress} from "react-vant";

interface FakeProps {
    // 是否开始
    isStart: boolean
    //是否结束
    isEnd: boolean
}

export default function FakeMockProgress(props: FakeProps) {

    const {progress, finish, start} = useMockProgress({timeInterval: 3000, autoComplete: false});

    useEffect(() => {
        if (props.isStart) {
            start()
        }else if(props.isEnd){
            finish()
        }

    }, [props.isEnd,props.isStart])
    return (
        <>
            {
                props.isStart && <Progress showPivot={false} percentage={progress}/>
            }
        </>

    );
}
