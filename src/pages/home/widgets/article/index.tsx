// 将文章列表拆分成一个单独的组件 (注意: 不要忘了在首页组件中调用该组件)
// src/pages/home/widgets/article/index.tsx
import styles from "@styles/home.module.scss";
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {useLazyRequestArticlesQuery} from "@store/apiSlice/articleApiSlice";
import {List} from "react-vant";
import {useTypedDispatch, useTypedSelector} from "@store/index";
import {saveArticles, selectArticles} from "@store/slices/articleSlice";
import {useOutletContext} from "react-router-dom";
import {OutletContextType} from "@shared/layout";
import Doctors from "@pages/home/widgets/doctors";

export default function Article() {
    const [type, setType] = useState<ArticleType>('recommend')
    // 是否还有更多
    const [more, setMore] = useState(false)
    const [requestArticle] = useLazyRequestArticlesQuery()
    const dispatch = useTypedDispatch()
    // 根据文章类型获取文章状态
    const {current, pageSize, articles, hasMore} = useTypedSelector(selectArticles(type));
    // 获取内容滚动距离
    const {scrollTop} = useOutletContext<OutletContextType>()
    // 记录文章分类是否吸顶
    const [fixed, setFixed] = useState(false)
    // 用于记录文章分类区域于页面顶部的距离
    const offsetTop = useRef(0)
    // 监听内容区域滚动
    useEffect(()=> {
        // if(scrollTop > offsetTop.current){
        //     setFixed(true)
        // }else {
        //     setFixed(false)
        // }
        // offsetTop 固定407   scrollTop 变化的滚动
        // 如果内容区域的滚动距离大于了文章分类区域与页面顶部的距离
        // 设置吸顶, 否则取消吸顶
        setFixed(scrollTop > offsetTop.current);
    },[scrollTop])
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
            {/*
        由于文章分类区域变成了固定定位, 脱离了文档流, 不再在页面中占据空间,
        该区域下面的内容会依次向上移动, 用户体验不好, 所以当文章分类区域变成固定定位以后,
        渲染下面的 div 用于占位, 占据原本文章分类区域的位置, 防止内容突然上串, 影响用户体验
      */}
            {fixed ? <div className={styles.filler}></div> : null}
            <div ref={(element) => {
                if (element !== null && !fixed) {
                    offsetTop.current = element.offsetTop;
                }
            }} className={classNames(styles.category, {
                [styles.fixed]: fixed
            })}>
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
            <Doctors />
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