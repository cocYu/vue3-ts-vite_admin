import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import Router from "./router";

import "virtual:windi.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
/**注册路由 */
app.use(Router);

/**全局注册ElementPlus */
app.use(ElementPlus);
/**全局注册element-icons图标 */
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(Element)) {
  app.component(key, component);
}

app.mount("#app");
