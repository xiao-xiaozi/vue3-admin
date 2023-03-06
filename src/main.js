import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import './assets/main.css'
import 'normalize.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import { locale } from "element-plus"

// locale(zhCn)

const app = createApp(App);

app.use(createPinia());
app.use(router);

// todo: 期望将elementPlus 语言配置为中文，但没有效果。
app.config.globalProperties.$ELEMENT = { locale: zhCn }


app.mount("#app");
