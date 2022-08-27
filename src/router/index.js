import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home/Index.vue";
import CountryView from "../views/country/Index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/country/:id",
      name: "country",
      component: CountryView,
      props: true,
    },
  ],
});

export default router;
