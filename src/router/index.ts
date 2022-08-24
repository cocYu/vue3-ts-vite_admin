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

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("~/pages/index/index.vue"),
        meta: {
            title: "首页"
        }
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
            title: "登录"
        }
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: () => import("~/pages/404/404.vue"),
    },
];

const router: Router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

/**
 * 全局路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
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
    if (token) {
        // 如果用户登录了我们就自动获取用户信息，并存储到 pinia 中
        const userStore = useUserStore();
        await userStore.SET_USER_INFO();
    }
    // 设置页面标题
    let title = (to.meta.title ? to.meta.title : "" ) + "郁凯的后台管理系统";
    document.title = title;
    next();
});

/**
 * 全局后置守卫
 */
router.afterEach((to, from) => {
    hideFullLoading();
});

export default router;
