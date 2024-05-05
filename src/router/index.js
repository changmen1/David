import { createRouter, createWebHashHistory } from "vue-router";

import demo from "@/components/demo/demo.vue";
import demo2 from "@/components/demo2/demo2.vue";
import demo3 from "@/components/demo3/demo3.vue";

const routes = [
  {
    path: "/demo2",
    name: "demo2",
    meta: {
      title: "demo2",
    },
    component: demo2,
  },
  {
    path: "/demo3",
    name: "demo3",
    meta: {
      title: "demo3",
    },
    component: demo3,
  },
  {
    path: "/home",
    name: "home",
    meta: {
      title: "首页",
    },
    component: demo,
  },
  {
    path: "/",
    redirect: "/home",
  },
];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // 注意这里不能用history模式
  routes,
});

export default router;
