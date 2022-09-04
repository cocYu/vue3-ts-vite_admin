export interface Notice{
    id: number,
    title: string,
    content: string,
    order: number,
    create_time: Date,
    update_time: Date
}

export interface INoticeList{
    list: Notice[],
    totalCount: number
}