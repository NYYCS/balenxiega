import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

import "./style.css";
import App from "./App.vue";

import { createRouter } from "./router";

const app = createApp(App);
const router = createRouter();

app.use(VueQueryPlugin);
app.use(router);

app.mount("#app");
