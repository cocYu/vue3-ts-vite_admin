/**
 * 统一返回体定义
 */
export interface DefaultResponseResult<T = any>{
    msg: string,
    data?: T,
    success?: boolean
}


export interface PageRequest<T = any> {
    page: number ,
    data?: T,
    limit?: number
}