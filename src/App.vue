<template>
  <component v-if="layout" :is="layout" />
</template>

<script>
import Default from "./layouts/Default.vue";

export default {
  name: "App",
  components: { Default },
  data() {
    return {
      layout: "Default",
    };
  },
};
</script>

<style lang="scss">
@import "assets/scss/style";
</style>
