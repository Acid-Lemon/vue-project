import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/IndexView.vue"),
    },
    {
      path: "/comment",
      name: "comment",
      component: () => import("@/views/CommentView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
  ],
});
export default router;
