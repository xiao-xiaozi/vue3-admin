import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import apiConfig from './api/config'
import './assets/main.css'
import 'normalize.css'

async function enableMocking() {
  if (!apiConfig.isMock) return

  const { worker } = await import('./mocks/browser')
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` }
  })
}

async function bootstrap() {
  await enableMocking()

  const app = createApp(App);

  app.use(createPinia());
  app.use(router);

  app.mount("#app");
}

bootstrap()
