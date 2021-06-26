import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Tool1 from "../views/Tool1.vue";
import Tool2 from "../views/Tool2.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/tool1",
    name: "Tool1",
    component: Tool1,
  },
  {
    path: "/tool2",
    name: "Tool2",
    component: Tool2,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
