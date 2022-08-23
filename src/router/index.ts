import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  Router,
} from "vue-router";

const routes: RouteRecordRaw[] = [];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
