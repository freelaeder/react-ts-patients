// src/pages/personal/index.tsx
import styles from "@styles/personal.module.scss";
import {Helmet} from "react-helmet";
import {EditSOutline, RightOutline} from "antd-mobile-icons";
import {useRequestProfileQuery} from "@store/apiSlice/profileApiSlice";
import {Swiper} from "react-vant";
import classNames from "classnames";
import useLoading from "@hooks/useLoading";
import Logout from "@pages/personal/widgets/logout";
import {useNavigate} from "react-router-dom";

export default function Personal() {
    // 发送请求获取登录用户个人资料
    const {data, isLoading, isSuccess} = useRequestProfileQuery(undefined)
    // 加载提示
    useLoading(isLoading, isSuccess);
    console.log( data?.data)

    const navigate = useNavigate()
    return (
        <>
            <Helmet>
                <title>优医问诊-个人中心</title>
            </Helmet>
            {
                isSuccess && (
                    <div className={styles.page}>
                        <div className={styles.summary}>
                            <div className={styles.user}>
                                <div className={styles.avatar}>
                                    <img
                                        src={data.data.avatar}
                                        alt="avatar"
                                    />
                                </div>
                                <div className={styles.name}>
                                    <span>{data.data.account}</span>
                                    <EditSOutline/>
                                </div>
                            </div>
                            <ul className={styles.statistics}>
                                <li>
                                    <span>{data.data.collectionNumber}</span>
                                    <span>收藏</span>
                                </li>
                                <li>
                                    <span>{data.data.likeNumber}</span>
                                    <span>关注</span>
                                </li>
                                <li>
                                    <span>{data.data.score}</span>
                                    <span>积分</span>
                                </li>
                                <li>
                                    <span>{data.data.couponNumber}</span>
                                    <span>优惠券</span>
                                </li>
                            </ul>
                        </div>
                        {
                            data.data.consultationInfo.length !== 0 && (
                                <div className={styles.inquiring}>
                                    <h5>问诊中</h5>
                                    <div className={styles.content}>

                                        <Swiper autoplay={5000}
                                                indicator={(total: number, current: number) => {
                                                    // console.log('total',total,'current',current)
                                                    //创建指示器数组
                                                    const items: React.ReactElement[] = [];
                                                    for (let i = 0; i < total; i++) {
                                                        items.push(
                                                            <span key={i} className={classNames({
                                                                [styles.active]: i == current
                                                            })}></span>
                                                        )
                                                    }

                                                    return <div className={styles.indicator}>{items}</div>;
                                                }}
                                        >
                                            {
                                                data.data.consultationInfo.map(item => (
                                                    <Swiper.Item key={item.orderId}>
                                                        <div className={styles.item}>
                                                            <div className={styles.avatar}>
                                                                <img
                                                                    src={item.avatar}
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className={styles.info}>
                                                                <div className={styles.doctor}>
                                                                    <span>{item.name}</span>
                                                                    <i>{item.depName} | {item.positionalTitles}</i>
                                                                </div>
                                                                <div className={styles.hospital}>
                                                                    <span>{item.gradeName}</span>
                                                                    <i>{item.hospitalName}</i>
                                                                </div>
                                                            </div>
                                                            <div className={styles.consult}>进入咨询</div>
                                                        </div>
                                                    </Swiper.Item>
                                                ))
                                            }

                                        </Swiper>


                                    </div>
                                </div>
                            )
                        }
                        <div className={styles.order}>
                            <div className={styles.top}>
                                <h5>药品订单</h5>
                                <a href="#">
                                    全部订单 <RightOutline/>
                                </a>
                            </div>
                            <ul className={styles.list}>
                                <li>
                                    <div className={styles.imgContainer}>
                                        <img
                                            src={require("@icons/user/paid.svg").default}
                                            alt="待付款"
                                        />
                                        {
                                            data.data.orderInfo.paidNumber > 0 && (
                                                <em>{data.data.orderInfo.paidNumber}</em>
                                            )
                                        }

                                    </div>
                                    <span>待付款</span>
                                </li>
                                <li>
                                    <div className={styles.imgContainer}>
                                        <img
                                            src={require("@icons/user/shipped.svg").default}
                                            alt="待发货"
                                        />
                                        {
                                            data.data.orderInfo.receivedNumber > 0 && (
                                                <em> {data.data.orderInfo.receivedNumber} </em>
                                            )
                                        }
                                    </div>
                                    <span>待发货</span>
                                </li>
                                <li>
                                    <div className={styles.imgContainer}>
                                        <img
                                            src={require("@icons/user/received.svg").default}
                                            alt="待收货"
                                        />
                                        {
                                            data.data.orderInfo.shippedNumber > 0 && (
                                                <em> {data.data.orderInfo.shippedNumber} </em>
                                            )
                                        }
                                    </div>
                                    <span>待收货</span>
                                </li>
                                <li>
                                    <div className={styles.imgContainer}>
                                        <img
                                            src={require("@icons/user/finished.svg").default}
                                            alt="已完成"
                                        />
                                        {
                                            data.data.orderInfo.finishedNumber > 0 && (
                                                <em> {data.data.orderInfo.finishedNumber} </em>
                                            )
                                        }
                                    </div>
                                    <span>已完成</span>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.shortcuts}>
                            <h5 className={styles.title}>快捷工具</h5>
                            <ul className={styles.list}>
                                <li onClick={()=> navigate('/record/fast') } >
                                    <div className={styles.imgContainer}>
                                        <img
                                            src={require("@icons/user/tool-01.svg").default}
                                            alt="我的问诊"
                                        />
                                    </div>
                                    <span>我的问诊</span>
                                    <RightOutline/>
                                </li>
                                <li>
                                    <div className={styles.imgContainer}>
                                        <img
                                            src={require("@icons/user/tool-02.svg").default}
                                            alt="我的处方"
                                        />
                                    </div>
                                    <span>我的处方</span>
                                    <RightOutline/>
                                </li>
                                <li onClick={() => navigate('/patient')}>
                                    <div className={styles.imgContainer}>
                                        <img
                                            src={require("@icons/user/tool-03.svg").default}
                                            alt="家庭档案"
                                        />
                                    </div>
                                    <span>家庭档案</span>
                                    <RightOutline/>
                                </li>
                                <li>
                                    <div className={styles.imgContainer}>
                                        <img
                                            src={require("@icons/user/tool-04.svg").default}
                                            alt="地址管理"
                                        />
                                    </div>
                                    <span>地址管理</span>
                                    <RightOutline/>
                                </li>
                                <li>
                                    <div className={styles.imgContainer}>
                                        <img
                                            src={require("@icons/user/tool-05.svg").default}
                                            alt="我的评价"
                                        />
                                    </div>
                                    <span>我的评价</span>
                                    <RightOutline/>
                                </li>
                                <li>
                                    <div className={styles.imgContainer}>
                                        <img
                                            src={require("@icons/user/tool-06.svg").default}
                                            alt="官方客服"
                                        />
                                    </div>
                                    <span>官方客服</span>
                                    <RightOutline/>
                                </li>
                                <li>
                                    <div className={styles.imgContainer}>
                                        <img
                                            src={require("@icons/user/tool-07.svg").default}
                                            alt="设置"
                                        />
                                    </div>
                                    <span>设置</span>
                                    <RightOutline/>
                                </li>
                            </ul>
                        </div>
                        <Logout/>
                    </div>
                )
            }

        </>
    );
}