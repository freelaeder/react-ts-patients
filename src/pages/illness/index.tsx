// src/pages/illness/index.tsx
import {Helmet} from "react-helmet";
import Header from "@shared/header";
import TextareaAutosize from "react-textarea-autosize";
import {PictureOutline, CloseShieldOutline} from "antd-mobile-icons";
import styles from "@styles/illness.module.scss";
import classNames from "classnames";
import React, {useEffect, useState} from "react";
import {IllnessTime} from "@enums/consult";
import {useUploadImgMutation} from "@store/apiSlice/uploadApiSlice";
import {Dialog, Toast} from "react-vant";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {useTypedDispatch, useTypedSelector} from "@store/index";
import {saveConsult, selectConsult} from "@store/slices/consultSlice";

const schema = z.object({
    illnessDesc: z.string().min(1, "病情描述不能为空"),
    illnessTime: z.number().gt(0).lt(5),
    consultFlag: z.number().gt(-1).lt(2),
});


export default function Illness() {
    //  用于记录病情
    const [formState, setFormState] = useState<Partial<Pick<
        Consult, 'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'>>>({})

    // 图片上传
    const [upload] = useUploadImgMutation()
    // 图片上传按钮
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // 创建 formData 对象
        const formData = new FormData()
        // 获取文件
        const files = event.currentTarget.files
        // 如果没有
        if (!files) return
        // 获取文件
        const file = files[0];
        // 判断文件是否小于5M
        if (file.size / 1024 / 1024 > 5)
            return Toast({message: '图片不能大于5M'});
        // 为 formData 追加数据
        formData.append("file", file);
        // 上传图片
        upload(formData).unwrap().then(res => {
            setFormState({
                ...formState, pictures: [...(formState.pictures || []), res.data]
            })
        })
    }
    // 移除照片
    const removePicture = (id: string) => {
        setFormState({
            ...formState,
            pictures: formState.pictures?.filter(item => item.id !== id)
        })
    }

    // 用于存储是否通过验证的标识
    const [isValid, setIsValid] = useState(false);
    // 获取 dispatch 方法
    const dispatch = useTypedDispatch();
    // 获取页面跳转方法
    const navigate = useNavigate();
    // 检测 formState 是否发生变化
    useEffect(() => {
        // 对象格式验证并记录验证结果
        setIsValid(schema.safeParse(formState).success)
    }, [formState])

    // 获取本地问诊信息
    const consult = useTypedSelector(selectConsult)
    useEffect(()=> {
        // 组件初始渲染之后, 检测本地是否包含病情描述
        if(typeof consult.illnessDesc !== 'undefined'){
            Dialog.confirm({
                title: '温馨提示',
                message: '是否恢复您之前写的病情信息呢',
            })
                .then(() => {
                    setFormState(consult)
                })
                .catch(() => {
                    setFormState({})
                })
        }
    },[])

    return (
        <>
            <Helmet>
                <title>优医问诊-病情描述</title>
            </Helmet>
            <Header title="病情描述"/>
            <div className={styles.page}>
                <div className={styles.doctor}>
                    <div className={styles.avatar}>
                        <img src={'https://cp.itheima.net/assets/avatar-doctor.6cf240f4.svg'} alt=""/>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.name}>在线医生</div>
                        <div className={styles.talk}>
                            请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助
                        </div>
                        <div className={styles.tip}>
                            <img src={require("@icons/consult/safe.svg").default} alt=""/>
                            <span>内容仅医生可见</span>
                        </div>
                    </div>
                </div>
                <TextareaAutosize
                    value={formState.illnessDesc}
                    onChange={(event) => setFormState({
                        ...formState,
                        illnessDesc: event.currentTarget.value
                    })}
                    className={styles.textarea}
                    placeholder="请详细描述您的病情，病情描述不能为空"
                />
                <div className={styles.description}>
                    <div className={styles.name}> 本次患病多久了</div>
                    <ul className={styles.options}>
                        <li className={classNames({
                            [styles.active]: formState.illnessTime === IllnessTime.Week
                        })} onClick={() => setFormState({
                            ...formState,
                            illnessTime: IllnessTime.Week
                        })}>一周内
                        </li>
                        <li className={classNames({
                            [styles.active]: formState.illnessTime === IllnessTime.Month
                        })} onClick={() => setFormState({
                            ...formState,
                            illnessTime: IllnessTime.Month
                        })}>一月内
                        </li>
                        <li className={classNames({
                            [styles.active]: formState.illnessTime === IllnessTime.HalfYear
                        })} onClick={() => setFormState({
                            ...formState,
                            illnessTime: IllnessTime.HalfYear
                        })}>半年内
                        </li>
                        <li className={classNames({
                            [styles.active]: formState.illnessTime === IllnessTime.More
                        })} onClick={() => setFormState({
                            ...formState,
                            illnessTime: IllnessTime.More
                        })}>大于半年
                        </li>
                    </ul>
                </div>
                <div className={styles.description}>
                    <div className={styles.name}> 此次病情是否去医院就诊过</div>
                    <ul className={styles.options}>
                        <li className={classNames({
                            [styles.active]: formState.consultFlag === 1
                        })} onClick={() => setFormState({
                            ...formState,
                            consultFlag: 1
                        })}>就诊过
                        </li>
                        <li className={classNames({
                            [styles.active]: formState.consultFlag === 0
                        })} onClick={() => setFormState({
                            ...formState,
                            consultFlag: 0
                        })}>没就诊过
                        </li>
                    </ul>
                </div>
                <div className={styles.upload}>
                    {
                        formState.pictures?.map(item => (
                            <div key={item.id} className={styles.imgContainer}>
                                <img src={item.url} alt=""/>
                                <CloseShieldOutline onClick={() => removePicture(item.id)} className={styles.close}/>
                            </div>
                        ))
                    }

                    <div className={styles.uploader}>
                        <PictureOutline/>
                        <span>上传图片</span>
                        <input onChange={onFileChange} type="file" accept="image/*"/>
                    </div>
                    <div className={styles.tips}>
                        上传内容仅医生可见, 最多9张图, 最大5MB
                    </div>
                </div>
                <div
                    onClick={() => {
                        if (isValid) {
                            dispatch(saveConsult(formState));
                            navigate('/patient?u=select')
                        }
                    }}
                    className={classNames(styles.next, {
                        [styles.disabled]: !isValid
                    })}>下一步
                </div>
            </div>
        </>
    );
}