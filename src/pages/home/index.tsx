// src/pages/home/index.tsx
import { Helmet } from "react-helmet";
import styles from "@styles/home.module.scss";
import {Swiper} from "react-vant";
import Article from "@pages/home/widgets/article";
import {useNavigate} from "react-router-dom";
import {useTypedDispatch} from "@store/index";
import {saveConsult} from "@store/slices/consultSlice";
import {ConsultType} from "@enums/consult";

export default function Home() {

    const navigate = useNavigate()
    const dispatch = useTypedDispatch()
    return (
        <>
            <Helmet>
                <title>优医问诊-首页</title>
            </Helmet>
            <div className={styles.page}>
                <div className={styles.header}>
                    <span>优医</span>
                </div>
                <div className={styles.search}>
                    <img src={require("@icons/home/search.svg").default} alt="" />
                    <span>搜一搜：疾病/症状/医生/健康知识</span>
                </div>
                <div className={styles.ask}>
                    <div className={styles.item}>
                        <img src={require("@icons/home/doctor.svg").default} alt="" />
                        <span className={styles.title}>问医生</span>
                        <span className={styles.sub_title}>按科室查问医生</span>
                    </div>
                    <div onClick={() => {
                        dispatch(saveConsult({type:ConsultType.Fast}))
                        navigate('/fast')
                    } }  className={styles.item}>
                        <img src={require("@icons/home/graphic.svg").default} alt="" />
                        <span className={styles.title}>极速问诊</span>
                        <span className={styles.sub_title}>20s医生极速回复</span>
                    </div>
                    <div className={styles.item}>
                        <img src={require("@icons/home/prescribe.svg").default} alt="" />
                        <span className={styles.title}>开药门诊</span>
                        <span className={styles.sub_title}>线上买药更方便</span>
                    </div>
                </div>
                <div className={styles.mine}>
                    <div className={styles.item}>
                        <img src={require("@icons/home/order.svg").default} alt="" />
                        <span>药品订单</span>
                    </div>
                    <div className={styles.item}>
                        <img src={require("@icons/home/docs.svg").default} alt="" />
                        <span>健康档案</span>
                    </div>
                    <div className={styles.item}>
                        <img src={require("@icons/home/rp.svg").default} alt="" />
                        <span>我的处方</span>
                    </div>
                    <div className={styles.item}>
                        <img src={require("@icons/home/find.svg").default} alt="" />
                        <span>疾病查询</span>
                    </div>
                </div>
                <div className={styles.ad}>
                    <Swiper
                       autoplay={5000}
                       stuckAtBoundary={true}
                    >
                        <Swiper.Item>
                            <img src={require("@icons/home/ad.png")} alt="" />
                        </Swiper.Item>
                        <Swiper.Item>
                            <img src={require("@icons/home/ad.png")} alt="" />
                        </Swiper.Item>
                    </Swiper>
                </div>
                {/*吸附*/}
                <Article/>

            </div>
        </>
    );
}