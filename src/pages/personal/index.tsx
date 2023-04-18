// src/pages/personal/index.tsx
import styles from "@styles/personal.module.scss";
import { Helmet } from "react-helmet";
import { EditSOutline, RightOutline } from "antd-mobile-icons";

export default function Personal() {
    return (
        <>
            <Helmet>
                <title>优医问诊-个人中心</title>
            </Helmet>
            <div className={styles.page}>
                <div className={styles.summary}>
                    <div className={styles.user}>
                        <div className={styles.avatar}>
                            <img
                                src="http://toutiao.itheima.net/images/user_head.jpg"
                                alt="avatar"
                            />
                        </div>
                        <div className={styles.name}>
                            <span>用户907456</span>
                            <EditSOutline />
                        </div>
                    </div>
                    <ul className={styles.statistics}>
                        <li>
                            <span>150</span>
                            <span>收藏</span>
                        </li>
                        <li>
                            <span>23</span>
                            <span>关注</span>
                        </li>
                        <li>
                            <span>230</span>
                            <span>积分</span>
                        </li>
                        <li>
                            <span>3</span>
                            <span>优惠券</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.inquiring}>
                    <h5>问诊中</h5>
                    <div className={styles.content}>
                        <div className={styles.item}>
                            <div className={styles.avatar}>
                                <img
                                    src="https://img0.baidu.com/it/u=2858914388,963166811&fm=253"
                                    alt=""
                                />
                            </div>
                            <div className={styles.info}>
                                <div className={styles.doctor}>
                                    <span>王医生</span>
                                    <i>内分泌科 | 主治医师</i>
                                </div>
                                <div className={styles.hospital}>
                                    <span>三甲</span>
                                    <i>积水潭医院</i>
                                </div>
                            </div>
                            <div className={styles.consult}>进入咨询</div>
                        </div>
                        <div className={styles.indicator}>
                            <span></span>
                            <span className={styles.active}></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className={styles.order}>
                    <div className={styles.top}>
                        <h5>药品订单</h5>
                        <a href="#">
                            全部订单 <RightOutline />
                        </a>
                    </div>
                    <ul className={styles.list}>
                        <li>
                            <div className={styles.imgContainer}>
                                <img
                                    src={require("@icons/user/paid.svg").default}
                                    alt="待付款"
                                />
                                <em>5</em>
                            </div>
                            <span>待付款</span>
                        </li>
                        <li>
                            <div className={styles.imgContainer}>
                                <img
                                    src={require("@icons/user/shipped.svg").default}
                                    alt="待发货"
                                />
                            </div>
                            <span>待发货</span>
                        </li>
                        <li>
                            <div className={styles.imgContainer}>
                                <img
                                    src={require("@icons/user/received.svg").default}
                                    alt="待收货"
                                />
                            </div>
                            <span>待收货</span>
                        </li>
                        <li>
                            <div className={styles.imgContainer}>
                                <img
                                    src={require("@icons/user/finished.svg").default}
                                    alt="已完成"
                                />
                            </div>
                            <span>已完成</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.shortcuts}>
                    <h5 className={styles.title}>快捷工具</h5>
                    <ul className={styles.list}>
                        <li>
                            <div className={styles.imgContainer}>
                                <img
                                    src={require("@icons/user/tool-01.svg").default}
                                    alt="我的问诊"
                                />
                            </div>
                            <span>我的问诊</span>
                            <RightOutline />
                        </li>
                        <li>
                            <div className={styles.imgContainer}>
                                <img
                                    src={require("@icons/user/tool-02.svg").default}
                                    alt="我的处方"
                                />
                            </div>
                            <span>我的处方</span>
                            <RightOutline />
                        </li>
                        <li>
                            <div className={styles.imgContainer}>
                                <img
                                    src={require("@icons/user/tool-03.svg").default}
                                    alt="家庭档案"
                                />
                            </div>
                            <span>家庭档案</span>
                            <RightOutline />
                        </li>
                        <li>
                            <div className={styles.imgContainer}>
                                <img
                                    src={require("@icons/user/tool-04.svg").default}
                                    alt="地址管理"
                                />
                            </div>
                            <span>地址管理</span>
                            <RightOutline />
                        </li>
                        <li>
                            <div className={styles.imgContainer}>
                                <img
                                    src={require("@icons/user/tool-05.svg").default}
                                    alt="我的评价"
                                />
                            </div>
                            <span>我的评价</span>
                            <RightOutline />
                        </li>
                        <li>
                            <div className={styles.imgContainer}>
                                <img
                                    src={require("@icons/user/tool-06.svg").default}
                                    alt="官方客服"
                                />
                            </div>
                            <span>官方客服</span>
                            <RightOutline />
                        </li>
                        <li>
                            <div className={styles.imgContainer}>
                                <img
                                    src={require("@icons/user/tool-07.svg").default}
                                    alt="设置"
                                />
                            </div>
                            <span>设置</span>
                            <RightOutline />
                        </li>
                    </ul>
                </div>
                <div className={styles.logout}>退出登录</div>
            </div>
        </>
    );
}