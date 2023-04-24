import {Toast, ToastReturnType} from "react-vant";
import {useEffect, useRef} from "react";


export default function useLoading(isLoading:boolean,isSuccess:boolean){
    // 用于保存加载中提示的引用对象
    const toastHandler = useRef<ToastReturnType>()
    // 判断是否正在获取用户个人资料 ok
    useEffect(() => {
        if (isLoading) {
            toastHandler.current = Toast({
                type: 'loading',
                message: '加载中',
                duration: 0,
            })
        }

    }, [isLoading])
    // 获取完成
    useEffect(() => {
        // 清除显示
        if (isSuccess) toastHandler.current?.clear()

        return () => {
            toastHandler.current?.clear()
        }
    }, [isSuccess])

    return toastHandler
}