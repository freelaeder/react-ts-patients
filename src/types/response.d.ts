// src/types/response.d.ts
interface HealthResponse<T> {
    code: number;
    message: string;
    data: T;
    // 请求成功没有 success 属性, 请求失败 success 属性的值为 false
    success?: false;
}

// // 通用的分页查询参数
interface PageParams {
    // 当前页码
    current: number;
    // 每页条数
    pageSize: number;
}