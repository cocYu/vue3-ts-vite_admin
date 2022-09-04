import { DefaultResponseResult } from "~/api/CommonTypes";
import { MenuListApiRes } from "~/api/menu/types";
import requestClient from "~/utils/axios/axios";

export enum MenuApiPaths {
    LIST = "/admin/rule/1"
}

export const GetMenuList = (): Promise<DefaultResponseResult<MenuListApiRes>> => {
    return requestClient.get<DefaultResponseResult<MenuListApiRes>>({
        url: MenuApiPaths.LIST,
    });
};