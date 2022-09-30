import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import Layout from "@/Layout/LayoutIndex.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Layout,
      redirect: "/index",
      children: [
        {
          path: "index",
          name: "HomeView",
          component: () => import("../views/HomeView.vue")
        },
        {
          path: "test-two",
          name: "TestTwo",
          component: () => import("@/views/TestTwo.vue")
        }
      ]
    },
    {
      path: "/test-three",
      name: "TestThree",
      redirect: "/test-three/child-1",
      component: Layout,
      children: [
        {
          path: "child-1",
          name: "ChildOne",
          component: () => import("@/views/testThree/ChildOne.vue")
        },
        {
          path: "child-2",
          name: "ChildTwo",
          component: () => import("@/views/testThree/ChildTwo.vue")
        },
        {
          path: "child-3",
          name: "ChildThree",
          redirect: "/test-three/child-3/CT-one",
          children: [
            {
              path: "CT-one",
              name: "CTOne",
              component: () => import("@/views/testThree/ChildThree/CTone.vue")
            }
          ]
        }
      ]
    },
    {
      path: "/login",
      name: "LoginView",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue")
    }
  ]
});

export default router;
