import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import Router from "./router";

import "virtual:windi.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(ElementPlus);
app.use(Router);
app.mount("#app");
