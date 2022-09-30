import { createApp } from "vue";
import { createPinia } from "pinia";
import { useMenuStore } from "@/stores/menu";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

router.beforeEach((to, from, next) => {
  let menuStore = useMenuStore();
  menuStore.setCurrentMenu(to.path);
  next();
});

app.mount("#app");
