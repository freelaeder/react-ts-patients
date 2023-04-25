// src/pages/patient/widgets/edit/index.tsx
import styles from "@styles/editPatient.module.scss";
import Header from "@shared/header";
import classNames from "classnames";
import React, {useEffect} from "react";
import {Patient} from "../../../../types/patient";
import {z} from "zod";
import {useForm, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Toast} from "react-vant";
import {useAddPatientMutation, useUpdatePatientMutation} from "@store/apiSlice/patientApiSlice";
import RemovePatient from "@pages/patient/widgets/remove";

interface Props {
    // 控制弹框显示和隐藏
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    // 要编辑的患者对象
    patient?: Patient;
}

// 表单验证状态类型
type FormState = Pick<Patient, 'name' | 'idCard' | 'defaultFlag' | 'gender'>
//表单状态初始值
const defaultValues: FormState = {
    name: '',
    idCard: '',
    defaultFlag: 0,
    gender: 1

}


// 表单验证规则
const schema = z
    .object({
        name: z
            .string()
            .min(1, "请输入姓名")
            .regex(/^[\u4e00-\u9fa5·]{2,16}$/, "姓名为中文2-16个字符"),
        idCard: z
            .string()
            .min(1, "请输入身份证号")
            .regex(
                /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
                "请输入正确格式的身份证号码"
            ),
        // 0 非默认 1 默认
        defaultFlag: z.number().lt(2).gt(-1),
        // 性别 1 男 0 女
        gender: z.number().lt(2).gt(-1),
    })
    .refine(
        (schema) => {
            // 身份证倒数第二位, 奇数是男, 偶数是女
            // 偶数返回 0(女), 奇数返回 1(男)
            // 接口中 1 表示男 0 表示女
            const gender = Number(schema.idCard.slice(-2, -1)) % 2;
            // 如果两者相等表示身份证号中的性别和用户选择的性别一致
            return gender === schema.gender;
        },
        {message: "填写的性别和身份证号中的不一致", path: ["idCard"]}
    );
export default function EditPatient({setVisible, patient}: Props) {

    // 创建表单验证对象
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        reset,
        formState: {errors},
    } = useForm<FormState>({
        // 用户提交表单前的验证策略
        mode: "onSubmit",
        // 用户第一次提交表单后的验证策略
        reValidateMode: "onChange",
        resolver: zodResolver(schema),
        defaultValues,
    });
    // 用于添加患者
    const [addPatient] = useAddPatientMutation()
    // 用于编辑患者信息
    const [modifyPatient] = useUpdatePatientMutation()

    // 表单提交
    const onSubmit: SubmitHandler<FormState> = (formState) => {
        // 如果当前是修改操作
        if (typeof patient !== 'undefined') {
            // 发送请求 编辑患者信息
            modifyPatient(Object.assign(formState, {id: patient.id})).unwrap().then(res => {
                console.log(res)
                if (res.code === 10000 && res.message === '请求成功') {
                    Toast({
                        message: '患者更新成功'
                    })
                    // 隐藏表单
                    setVisible(false)
                    // 重置表单
                    reset(defaultValues)
                } else {
                    Toast({
                        message: res.message
                    })
                }
            })
        } else {
            // 发送请求 添加患者信息
            addPatient(formState)
                .unwrap()
                .then(res => {
                    console.log(res)
                    if (res.code === 10000 && res.message === '请求成功') {
                        Toast({
                            message: '患者添加成功'
                        })
                        // 隐藏表单
                        setVisible(false)
                        // 重置表单
                        reset(defaultValues)
                    } else {
                        Toast({
                            message: res.message
                        })
                    }
                })
        }
    };
    // 实时获取性别值
    const gender = watch("gender");
    // 实时获取是否为默认患者标识
    const defaultFlag = watch("defaultFlag");

    // 检测姓名字段格式是否有错误
    useEffect(() => {
        // 如果姓名字段格式存在错误
        if (typeof errors.name !== "undefined") {
            // 展示错误信息
            Toast.info({
                message: errors.name.message
            })
        }
    }, [errors.name]);
    // 监测是添加还是修改
    useEffect(() => {
        // 如果是修改
        if(typeof patient !== 'undefined'){
            // 使用现有患者信息填充表单
            reset(patient)
        }else {
            // 否则当前是添加操作, 使用初始值填充表单
            reset(defaultValues)
        }
    },[patient,reset])

    // 检测身份证字段格式是否有错误
    useEffect(() => {
        // 如果身份证字段格式存在错误
        if (typeof errors.idCard !== "undefined") {
            // 展示错误信息
            Toast({
                message: errors.idCard.message
            })
        }
    }, [errors.idCard]);

    return (
        <div className={styles.edit}>
            <Header backHandler={() => setVisible(false)} title={typeof patient !== 'undefined' ? '编辑患者' :
                '添加患者'} link="保存" linkHandler={handleSubmit(onSubmit)}/>
            <form className={styles.form}>
                <div className={styles.formItem}>
                    <label>真实姓名</label>
                    <div className={styles.item}>
                        <input type="text"  {...register("name")} placeholder="请输入真实姓名"/>
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label>身份证号</label>
                    <div className={styles.item}>
                        <input type="text"    {...register("idCard")} placeholder="请填写身份证号"/>
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label>性别</label>
                    <div className={styles.item}>
                        <span onClick={() => setValue("gender", 1)}
                              className={classNames(styles.sex, {
                                  [styles.active]: gender === 1,
                              })}>男</span>
                        <span onClick={() => setValue("gender", 0)}
                              className={classNames(styles.sex, {
                                  [styles.active]: gender === 0,
                              })}>女</span>
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label>默认就诊人</label>
                    <div className={styles.item}>
                        <input type="checkbox" checked={defaultFlag === 1}
                               onChange={(event) => {
                                   setValue("defaultFlag", event.currentTarget.checked ? 1 : 0);
                               }} className={styles.default}/>
                    </div>
                </div>
            </form>
            {
                patient && <RemovePatient name={patient.name} id={patient.id} setVisible={setVisible} />
            }

        </div>
    );
}