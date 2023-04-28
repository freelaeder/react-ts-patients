// src/types/article.d.ts
// 文章对象类型
type Article = {
    id: string;
    title: string;
    coverUrl: string[];
    topic: string;
    collectionNumber: number;
    commentNumber: number;
    creatorName: string;
    creatorAvatar: string;
    creatorHospatalName: string;
    // 是否关注 0 未关注 1 关注
    likeFlag: 0 | 1;
    content: string;
    creatorDep: string;
    creatorTitles: string;
    creatorId: string;
};

// 文章列表带分页
type ArticleWithPage = {
    pageTotal: number;
    total: number;
    rows: Article[];
};

// 文章列表响应值类型
type ArticleResponse = HealthResponse<ArticleWithPage>;

// 获取文章列表时传递的参数的类型
type ArticleParams = PageParams & {
    // recommend 推荐
    // fatReduction 减脂
    // food 健康饮食
    // like 关注
    type: ArticleType;
};

// 文章类型
type ArticleType = "recommend" | "fatReduction" | "food" | "like";