import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
              @use "./src/assets/scss/mixins/base.scss" as *;
            `,
      },
    },
  },
  base: "/anycountry/",
  plugins: [vue()],
});
