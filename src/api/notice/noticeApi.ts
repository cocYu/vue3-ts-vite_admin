import { DefaultResponseResult, PageRequest } from "~/api/CommonTypes";
import { INoticeList } from "~/api/notice/types";
import requestClient from "~/utils/axios/axios";

enum NoticeApiUrlEnum {
    list = "/admin/notice/"
}

export const getNoticeList = (params: PageRequest): Promise<DefaultResponseResult<INoticeList>> => {
    return requestClient.get<DefaultResponseResult<INoticeList>>({
        url: `${NoticeApiUrlEnum.list}${params.page}`,
    });
};