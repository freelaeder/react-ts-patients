import React from 'react';
import styles from "@styles/home.module.scss";
import {useFocusMutation} from "@store/apiSlice/articleApiSlice";
import {useTypedDispatch} from "@store/index";
import {toggleLikeFlag} from "@store/slices/doctorSlice";

interface Props {
    doctor: Doctor
}

function FocusDoctor({doctor}: Props) {

    // 关注
    const [focus, {isLoading}] = useFocusMutation()
    const dispatch = useTypedDispatch()
    const onFocus = () => {
        focus({type: 'doc', id: doctor.id}).unwrap().then(res => {
            dispatch(toggleLikeFlag({id: doctor.id, likeFlag: doctor.likeFlag === 0 ? 1 : 0}))
        })
    }
    return (
        <button onClick={onFocus} className={styles.focus_btn}>
            {isLoading ? '加载中' : doctor.likeFlag === 0 ? ' + 关注' : '已关注'}
        </button>
    );
}

export default FocusDoctor;