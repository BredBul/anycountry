import { createApp, h } from "vue";
import { createStore } from "vuex";

import router from "./router";
import App from "./App.vue";

const store = createStore({
  state() {
    return {
      searchValue: "",
      menuStatus: false,
    };
  },
});

const app = createApp({
  render: () => h(App),
});

app.use(store).use(router).mount("#app");
