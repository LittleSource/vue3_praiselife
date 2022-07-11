import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Index from "../views/index.vue";
import About from "../views/about.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Index },
  { path: "/about", component: About },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
