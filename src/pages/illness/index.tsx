// src/pages/illness/index.tsx
import { Helmet } from "react-helmet";
import Header from "@shared/header";
import TextareaAutosize from "react-textarea-autosize";
import { PictureOutline, CloseShieldOutline } from "antd-mobile-icons";
import styles from "@styles/illness.module.scss";
import classNames from "classnames";

export default function Illness() {
    return (
        <>
            <Helmet>
                <title>优医问诊-病情描述</title>
            </Helmet>
            <Header title="病情描述" />
            <div className={styles.page}>
                <div className={styles.doctor}>
                    <div className={styles.avatar}>
                        {/*<img src={require("@icons/consult/avatar.svg").default} alt="" />*/}
                    </div>
                    <div className={styles.content}>
                        <div className={styles.name}>在线医生</div>
                        <div className={styles.talk}>
                            请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助
                        </div>
                        <div className={styles.tip}>
                            {/*<img src={require("@icons/consult/safe.svg").default} alt="" />*/}
                            <span>内容仅医生可见</span>
                        </div>
                    </div>
                </div>
                <TextareaAutosize
                    className={styles.textarea}
                    placeholder="请详细描述您的病情，病情描述不能为空"
                />
                <div className={styles.description}>
                    <div className={styles.name}> 本次患病多久了</div>
                    <ul className={styles.options}>
                        <li>一周内</li>
                        <li className={styles.active}>一月内</li>
                        <li>半年内</li>
                    </ul>
                </div>
                <div className={styles.description}>
                    <div className={styles.name}> 此次病情是否去医院就诊过</div>
                    <ul className={styles.options}>
                        <li>就诊过</li>
                        <li>没就诊过</li>
                        <li>半年内</li>
                    </ul>
                </div>
                <div className={styles.upload}>
                    <div className={styles.imgContainer}>
                        <CloseShieldOutline className={styles.close} />
                    </div>
                    <div className={styles.uploader}>
                        <PictureOutline />
                        <span>上传图片</span>
                        <input type="file" accept="image/*" />
                    </div>
                    <div className={styles.tips}>
                        上传内容仅医生可见, 最多9张图, 最大5MB
                    </div>
                </div>
                <div className={classNames(styles.next, styles.disabled)}>下一步</div>
            </div>
        </>
    );
}