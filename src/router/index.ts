import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw,
    Router,
} from "vue-router";
import { getToken } from "~/utils/cookieUtil";
import { toast } from "~/utils/notifyUtil";
import { useUserStore } from "~/store/userStore";
import { hideFullLoading, showFullLoading } from "~/utils/loadUtil";
import { Menu } from "~/store/types";

// const routes: RouteRecordRaw[] = [
//     {
//         path: "/",
//         component: () => import("~/pages/layout/admin.vue"),
//         children: [
//             {
//                 path: "/",
//                 component: () => import("~/pages/index/index.vue"),
//                 meta: {
//                     title: "首页"
//                 }
//             },
//             {
//                 path: "/:pathMatch(.*)*",
//                 name: "notFound",
//                 component: () => import("~/pages/404/404.vue"),
//             }
//         ]
//     },
//     {
//         path: "/about",
//         component: () => import("~/pages/about/about.vue"),
//     },
//     {
//         path: "/login",
//         name: "Login",
//         component: () => import("~/pages/login/login.vue"),
//         meta: {
//             title: "登录"
//         }
//     },
//     {
//         path: "/:pathMatch(.*)*",
//         name: "notFound",
//         component: () => import("~/pages/404/404.vue"),
//     },
// ];

/**
 * 默认路由所有用户共享
 */
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("~/pages/layout/admin.vue"),
        name: "Admin",
    },
    {
        path: "/about",
        component: () => import("~/pages/about/about.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("~/pages/login/login.vue"),
        meta: {
            title: "登录",
        },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: () => import("~/pages/404/404.vue"),
    },
];

/**
 * 动态注册路由
 */
const dynamicRouter: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("~/pages/index/index.vue"),
        name: "INDEX",
        meta: {
            title: "首页",
        },
    },
    {
        path: "/role/list",
        component: () => import("~/pages/admin/systemManager/roleManager/role-manager.vue"),
        name: "ROLE_MANAGER",
        meta: {
            title: "角色管理",
        },
    },
    {
        path: "/manager/list",
        component: () => import("~/pages/admin/manager/list.vue"),
        name: "MANAGER_LIST",
        meta: {
            title: "管理员管理",
        },
    }
];

export const router: Router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

export const addDynamicRoutes = (menus: Menu[]):boolean => {
    let hasNewRoute = false;
    const findAndAddRouteByMenus = (arr: Menu[]) => {
        arr.forEach(menu => {
            let item =  dynamicRouter.find(o => o.path == menu.frontpath);
            if (item && !router.hasRoute(item.name || "")){
                // 添加路由
                router.addRoute("Admin", item);
                hasNewRoute = true;
            }
            // 递归添加
            if (menu.child && menu.child.length > 0){
                findAndAddRouteByMenus(menu.child);
            }
        })
    }
    findAndAddRouteByMenus(menus);
    return hasNewRoute;
}

let hasGetInfo = false;

/**
 * 全局路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    showFullLoading();
    console.log("全局前置路由守卫");
    let token = getToken();
    // 没有登录强制跳转回登录页
    if (!token && to.path != "/login") {
        toast("请先登录", "error");
        return next({ path: "/login" });
    }
    // 防止重复登录
    if (token && to.path == "/login") {
        toast("请勿重复登录", "error");
        return next({ path: from.path });
    }
    let hasNewRoute = false;
    if (token && !hasGetInfo) {
        // 如果用户登录了我们就自动获取用户信息，并存储到 pinia 中
        await userStore.SET_USER_INFO();
        // 动态添加路由
        hasNewRoute = addDynamicRoutes(userStore.userInfo?.menus || []);
        hasGetInfo = true;
    }
    // 设置页面标题
    let title = (to.meta.title ? to.meta.title : "") + "郁凯的后台管理系统";
    document.title = title;
    hasNewRoute ? next(to.fullPath) : next();
});

/**
 * 全局后置守卫
 */
router.afterEach((to, from) => {
    hideFullLoading();
});
