// 将文章列表拆分成一个单独的组件 (注意: 不要忘了在首页组件中调用该组件)
// src/pages/home/widgets/article/index.tsx
import styles from "@styles/home.module.scss";
import {useState} from "react";
import classNames from "classnames";
import {useLazyRequestArticlesQuery} from "@store/apiSlice/articleApiSlice";
import {List} from "react-vant";
import {useTypedDispatch, useTypedSelector} from "@store/index";
import {saveArticles, selectArticles} from "@store/slices/articleSlice";
import {date} from "zod";

export default function Article() {
    const [type, setType] = useState<ArticleType>('recommend')
    // 是否还有更多
    const [more, setMore] = useState(false)
    const [requestArticle] = useLazyRequestArticlesQuery()
    const dispatch = useTypedDispatch()
    // 根据文章类型获取文章状态
    const {current, pageSize, articles, hasMore} = useTypedSelector(selectArticles(type));
    // 用于加载文章列表
    const loadMore = () => {
        // 发送请求获取文章列表
        return requestArticle({type, current, pageSize})
            .unwrap()
            .then(({data: {pageTotal, rows}}) => {
                const hasMore = current < pageTotal
                // 保存文章列表
                dispatch(
                    saveArticles({
                        // 文章分类
                        type,
                        // 更新页码
                        current: hasMore ? current + 1 : current,
                        // 更新是否还有更多数据的状态
                        hasMore,
                        // 保存文章列表
                        articles: rows,
                        // 更新页码
                        pageSize: 10,
                    })
                );
            })

    }

    return (
        <>
            <div className={styles.category}>
                <span onClick={() => {
                    setType('like')
                }} className={classNames({[styles.active]: type === 'like'})}>关注</span>
                <span onClick={() => {
                    setType('recommend')
                }} className={classNames({[styles.active]: type === 'recommend'})}>推荐</span>
                <span onClick={() => {
                    setType('fatReduction')
                }} className={classNames({[styles.active]: type === 'fatReduction'})}>减脂</span>
                <span onClick={() => {
                    setType('food')
                }} className={classNames({[styles.active]: type === 'food'})}>饮食</span>
            </div>
            <div className={styles.focus}>
                <div className={styles.top}>
                    <h4>推荐关注</h4>
                    <a href="#">查看更多 &gt;</a>
                </div>
                <div className={styles.container}>
                    <div className={styles.inner}>
                        <div className={styles.item}>
                            <img
                                src="https://img0.baidu.com/it/u=2858914388,963166811&fm=253"
                                alt=""
                                className={styles.avatar}
                            />
                            <span className={styles.doctor}>王医生</span>
                            <span className={styles.hospital}>积水潭医院 内分泌科</span>
                            <span className={styles.job}>主任医师</span>
                            <button className={styles.focus_btn}>+ 关注</button>
                        </div>
                        <div className={styles.item}>
                            <img
                                src="https://img0.baidu.com/it/u=2858914388,963166811&fm=253"
                                alt=""
                                className={styles.avatar}
                            />
                            <span className={styles.doctor}>王医生</span>
                            <span className={styles.hospital}>积水潭医院 内分泌科</span>
                            <span className={styles.job}>主任医师</span>
                            <button className={styles.focus_btn}>+ 关注</button>
                        </div>
                        <div className={styles.item}>
                            <img
                                src="https://img0.baidu.com/it/u=2858914388,963166811&fm=253"
                                alt=""
                                className={styles.avatar}
                            />
                            <span className={styles.doctor}>王医生</span>
                            <span className={styles.hospital}>积水潭医院 内分泌科</span>
                            <span className={styles.job}>主任医师</span>
                            <button className={styles.focus_btn}>+ 关注</button>
                        </div>
                        <div className={styles.item}>
                            <img
                                src="https://img0.baidu.com/it/u=2858914388,963166811&fm=253"
                                alt=""
                                className={styles.avatar}
                            />
                            <span className={styles.doctor}>王医生</span>
                            <span className={styles.hospital}>积水潭医院 内分泌科</span>
                            <span className={styles.job}>主任医师</span>
                            <button className={styles.focus_btn}>+ 关注</button>
                        </div>
                        <div className={styles.item}>
                            <img
                                src="https://img0.baidu.com/it/u=2858914388,963166811&fm=253"
                                alt=""
                                className={styles.avatar}
                            />
                            <span className={styles.doctor}>王医生</span>
                            <span className={styles.hospital}>积水潭医院 内分泌科</span>
                            <span className={styles.job}>主任医师</span>
                            <button className={styles.focus_btn}>+ 关注</button>
                        </div>
                        <div className={styles.item}>
                            <img
                                src="https://img0.baidu.com/it/u=2858914388,963166811&fm=253"
                                alt=""
                                className={styles.avatar}
                            />
                            <span className={styles.doctor}>王医生</span>
                            <span className={styles.hospital}>积水潭医院 内分泌科</span>
                            <span className={styles.job}>主任医师</span>
                            <button className={styles.focus_btn}>+ 关注</button>
                        </div>
                        <div className={styles.item}>
                            <img
                                src="https://img0.baidu.com/it/u=2858914388,963166811&fm=253"
                                alt=""
                                className={styles.avatar}
                            />
                            <span className={styles.doctor}>王医生</span>
                            <span className={styles.hospital}>积水潭医院 内分泌科</span>
                            <span className={styles.job}>主任医师</span>
                            <button className={styles.focus_btn}>+ 关注</button>
                        </div>
                        <div className={styles.item}>
                            <img
                                src="https://img0.baidu.com/it/u=2858914388,963166811&fm=253"
                                alt=""
                                className={styles.avatar}
                            />
                            <span className={styles.doctor}>王医生</span>
                            <span className={styles.hospital}>积水潭医院 内分泌科</span>
                            <span className={styles.job}>主任医师</span>
                            <button className={styles.focus_btn}>+ 关注</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.article}>
                <List finished={!hasMore} onLoad={loadMore}>
                    {articles.map((article) => (
                        <div className={styles.item} key={article.id}>
                            <div className={styles.meta}>
                                <div className={styles.left}>
                                    <img
                                        src={article.creatorAvatar}
                                        alt=""
                                        className={styles.avatar}
                                    />
                                    <div className={styles.info}>
                                        <span>{article.creatorName}</span>
                                        <i>
                                            {article.creatorHospatalName}&nbsp;{article.creatorDep}
                                            &nbsp;{article.creatorTitles}
                                        </i>
                                    </div>
                                </div>
                                <button className={styles.attention}>
                                    {article.likeFlag === 0 ? "+ 关注" : "已关注"}
                                </button>
                            </div>
                            <h4 className={styles.title}>{article.title}</h4>
                            <div className={styles.tag}># {article.topic}</div>
                            <div className={styles.content}>
                                {article.content.replace(/<[^>]+>/g, "")}
                            </div>
                            <div className={styles.container}>
                                {article.coverUrl.map((url, index) => (
                                    <img key={index} src={url} alt=""/>
                                ))}
                            </div>
                            <div className={styles.footer}>
                                <span>{article.collectionNumber} 收藏</span>
                                <span>{article.commentNumber} 评论</span>
                            </div>
                        </div>
                    ))}

                </List>

            </div>

        </>
    );
}