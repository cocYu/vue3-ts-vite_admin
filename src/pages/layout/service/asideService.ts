import { reactive } from "vue";

export function useMenu() {
    const menus = reactive([
        {
            name: "系统管理",
            frontpath: null,
            icon: "management",
            child: [
                {
                    name: "用户管理",
                    frontpath: "/user",
                    icon: "user",
                },
                {
                    name: "角色管理",
                    frontpath: "/role",
                    icon: "user",
                },
                {
                    name: "权限管理",
                    frontpath: "/privilege",
                    icon: "lock",
                },
                {
                    name: "系统设置",
                    frontpath: "/setting",
                    icon: "setting",
                },
            ],
        },
        {
            name: "商品管理",
            frontpath: null,
            icon: "handbag",
            child: [
                {
                    name: "用户管理",
                    frontpath: "/user",
                    icon: "user",
                },
                {
                    name: "角色管理",
                    frontpath: "/role",
                    icon: "user",
                },
                {
                    name: "权限管理",
                    frontpath: "/privilege",
                    icon: "lock",
                },
                {
                    name: "系统设置",
                    frontpath: "/setting",
                    icon: "setting",
                },
            ],
        },
    ]);

    function select(index: any, indexPath: any, item: any) {
        console.log(index, indexPath, item);
    }


    return {
        menus,
        select
    };
}