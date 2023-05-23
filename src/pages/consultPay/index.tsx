import Header from "@shared/header";
import styles from "@styles/consultPay.module.scss";
import {useTypedSelector} from "@store/index";
import {selectConsult} from "@store/slices/consultSlice";
import {
    useCreateConsultOrderMutation,
    usePayConsultOrderMutation,
    useRequestConsultInfoQuery
} from "@store/apiSlice/consultApiSlice";
import {useRequestPatientQuery} from "@store/apiSlice/patientApiSlice";
import {useState} from "react";
import {ActionSheet, Dialog, Toast} from "react-vant";
import {useNavigate} from "react-router-dom";

// 预支付页面
export default function ConsultPay() {


    // 获取本地的问诊信息
    const consult = useTypedSelector(selectConsult)
    // 用于获取问诊订单预付款信息
    const {data: consultPreData} = useRequestConsultInfoQuery({type: consult.type!, illnessType: consult.illnessType!})
    //获取患者信息
    const {data: patientData} = useRequestPatientQuery(consult.patientId!)
    // 是否点击同意协议
    const [isagree, setIsAgree] = useState(false)
    // 创建问诊订单
    const [createOrder] = useCreateConsultOrderMutation()
    // 用于保存订单 id
    const [orderId, setOrderId] = useState<string | undefined>(undefined);
    // 动作模板
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    // 记录用户选择的支付方式
    const [payMethod, setPayMethod] = useState<0 | 1 | 2>(0)
    // 获取订单地址
    const [payUrl] = usePayConsultOrderMutation()
    // 取消订单
    const onCancel = () => {
        Dialog.confirm({
            title: '关闭支付',
            message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
            confirmButtonText: '继续支付',
            cancelButtonText: '仍要关闭'
        })
            .then(() => {
                // 继续支付
                console.log('confirm')
            })
            .catch(() => {
                // 仍要关闭
                setVisible(false)
                // 跳转到问诊记录
                navigate("/record/fast", {replace: true});
            })
    }
    if (typeof patientData === 'undefined' || typeof consultPreData === 'undefined') return null
    return (
        <>
            <Header title="支付"/>
            <div className={styles.page}>
                <div className={styles.top}>图文问诊 49元</div>
                <div className={styles.doctor}>
                    <div className={styles.avatar}>
                        <img src={'https://cp.itheima.net/assets/avatar-doctor.6cf240f4.svg'} alt=""/>
                    </div>
                    <div className={styles.title}>
                        <h4>极速问诊</h4>
                        <h5>自动分配医生</h5>
                    </div>
                </div>
                <ul className={styles.list}>
                    <li>
                        <span>优惠券</span>
                        <span>-¥{consultPreData.data.couponDeduction}</span>
                    </li>
                    <li>
                        <span>积分抵扣</span>
                        <span>-¥{consultPreData.data.couponDeduction}</span>
                    </li>
                    <li>
                        <span>实付款</span>
                        <span>
              <i>-¥{consultPreData.data.actualPayment}</i>
            </span>
                    </li>
                </ul>
                <div className={styles.divide}></div>
                <h6 className={styles.title}>患者资料</h6>
                <ul className={styles.list}>
                    <li>
                        <span>患者信息</span>
                        <span>{patientData.data.name} | {patientData.data.genderValue} | {patientData.data.age}岁</span>
                    </li>
                    <li className={styles.vertical}>
                        <span>病情描述</span>
                        <span>{consult.illnessDesc}</span>
                    </li>
                </ul>
                <div className={styles.agree}>
                    <input checked={isagree} onChange={event => setIsAgree(event.currentTarget.checked)} type="checkbox"
                           id="agree"/>
                    <label htmlFor="agree">
            <span>
              我已同意<i>支付协议</i>
            </span>
                    </label>
                </div>
            </div>
            <div className={styles.summary}>
                <div className={styles.total}>
                    <i>合计</i>
                    <span>¥ {consultPreData.data.actualPayment} </span>
                </div>
                <button onClick={() => {
                    if (isagree) {
                        createOrder(consult).unwrap().then((res) => {
                            // 保存订单id
                            setOrderId(res.data.id)
                            // 开启动作面板
                            setVisible(true)
                        })
                    } else {
                        Toast.success({message: '请勾选协议'})
                    }
                }} className={styles.pay_button}>立即支付
                </button>
            </div>
            <ActionSheet visible={visible} onCancel={onCancel}>
                <div className={styles.pay_method}>
                    <div className={styles.title}>选择支付方式</div>
                    <div className={styles.price}>¥ {consultPreData.data.actualPayment}</div>
                    <ul className={styles.methods}>
                        <li>
                            <label htmlFor="wechat" className={styles.method}>
                                <img src={require("@icons/consult/wechat.svg").default} alt=""/>
                                <span>微信支付</span>
                            </label>
                            <input checked={payMethod === 0} onChange={(event) => {
                                if (event.currentTarget.checked) {
                                    setPayMethod(0)
                                }
                            }
                            } name="payMethod" type="radio" id="wechat"/>
                        </li>
                        <li>
                            <label htmlFor="alipay" className={styles.method}>
                                <img src={require("@icons/consult/alipay.svg").default} alt=""/>
                                <span>支付宝支付</span>
                            </label>
                            <input checked={payMethod === 1} onChange={event => {
                                if (event.currentTarget.checked) {
                                    setPayMethod(1)
                                }
                            }} name="payMethod" type="radio" id="alipay"/>
                        </li>
                    </ul>
                    <button onClick={() => {
                        if (typeof orderId !== 'undefined') {
                            // 获取支付地址
                            payUrl({paymentMethod: payMethod, payCallback: 'http://localhost:3000/room', orderId}).unwrap().then(res => {
                                // 获取地址，跳转
                                window.location.href = res.data.payUrl
                            })
                        }

                    }} className={styles.pay_button}>立即支付
                    </button>
                </div>
            </ActionSheet>

        </>
    );
}