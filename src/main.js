import "./assets/scss/style.scss";

import { createApp, h } from "vue";
import { createStore } from "vuex";

import router from "./router";
import App from "./App.vue";

import data from "./assets/data.json";

const store = createStore({
  state() {
    return {
      searchValue: "",
      menuStatus: false,
      dataCountries: data,
      darkMode: false,
      numberWithCommas: (x) =>
        x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    };
  },
});

const app = createApp({
  render: () => h(App),
});

app.use(store).use(router).mount("#app");
