import { useCookies } from "@vueuse/integrations/useCookies";
import { CookieEnum } from "~/constant/constant";

const cookie = useCookies();

export const getToken = () => {
    return cookie.get(CookieEnum.TOKEN_COOKIE);
};


export const setToken = (token: string) => {
    return cookie.set(CookieEnum.TOKEN_COOKIE, token);
};

export const delToken = () => {
    cookie.remove(CookieEnum.TOKEN_COOKIE);
};