/**
 * 登录用户信息
 */
import { LoginForm } from "~/api/auth/types";


export interface UserInfo{
    id?: number,
    avatar?: string,
    super?: number,
    username?: string,
    menus?: Menu[],
    roleNames?: string[],
    role?: Role
}

/**
 * 角色信息
 */
export interface Role{
    id: number,
    name: string
}

/**
 * 菜单信息
 */
export interface Menu{
    condition?: string,
    create_time: Date,
    desc: string,
    frontpath: string,
    icon: string,
    id: number,
    menu: number,
    name: string,
    order: number,
    rule_id: number,
    status: number,
    update_time: Date,
    child: Menu[]
}


export interface UserStoreState {
    userInfo: UserInfo
}

export interface UserStoreAction {
    /**
     * 设置用户信息
     *
     * @param userInfo 用户信息
     * @constructor
     */
    SET_USER_INFO: () => Promise<UserInfo>
}