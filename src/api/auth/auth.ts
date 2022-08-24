import { LoginForm } from "./types";
import requestClient from "~/utils/axios/axios";
import { DefaultResponseResult } from "~/api/CommonTypes";


/**
 * 认证授权 api 声明
 */
enum AuthApiDeclare {
    login = "/admin/login",
    getLoginUserInfo = "/admin/getinfo",
    logout = "/admin/logout"
}

export const LOGIN = (loginForm: LoginForm): Promise<DefaultResponseResult> => {
    return requestClient.post<DefaultResponseResult>({
        url: AuthApiDeclare.login,
        data: loginForm,
    });
};


export const GET_LOGIN_USER_INFO = (): Promise<DefaultResponseResult> => {
    return requestClient.post({
        url: AuthApiDeclare.getLoginUserInfo,
    });
};

export const LOGOUT = (): Promise<DefaultResponseResult> => {
    return requestClient.post<DefaultResponseResult>({
        url: AuthApiDeclare.logout
    })
};