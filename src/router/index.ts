import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  Router,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("~/pages/index/index.vue"),
  },
  {
    path: "/about",
    component: () => import("~/pages/about/about.vue"),
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

export default router;
