import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import {router} from "./router";

import "virtual:windi.css";

import "nprogress/nprogress.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { createPinia } from "pinia";

const pinia = createPinia();


const app = createApp(App);

app.use(pinia);
/**注册路由 */
app.use(router);

/**全局注册ElementPlus */
app.use(ElementPlus);
/**全局注册element-icons图标 */

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount("#app");
