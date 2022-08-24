import { defineStore } from "pinia";
import { UserInfo, UserStoreAction, UserStoreState } from "~/store/types";
import { GET_LOGIN_USER_INFO, LOGIN } from "~/api/auth/auth";
import { DefaultResponseResult } from "~/api/CommonTypes";
import { toast } from "~/utils/notifyUtil";
import { setToken } from "~/utils/cookieUtil";

export const useUserStore = defineStore<string, UserStoreState, any, UserStoreAction>('userStore', {
    state: (): UserStoreState  => {
        return {
            // 用户信息
            userInfo: {}
        };
    },
    getters: {

    },
    actions: {
        SET_USER_INFO(): Promise<UserInfo>{
            return new Promise<UserInfo>((resolve, reject) => {
                GET_LOGIN_USER_INFO()
                    .then(userInfoRes => {
                        console.log(userInfoRes);
                        this.userInfo = {...userInfoRes.data};
                        resolve(this.userInfo);
                    }).catch(err => reject(err));
            })
        }
    }
});