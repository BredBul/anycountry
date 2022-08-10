<template>
  <div class="wrapper">
    <v-header />
    <main class="page">
      <router-view />
    </main>
  </div>
</template>

<script>
import VHeader from "../components/header/VHeader.vue";

export default {
  name: "Default",
  components: { VHeader },
};
</script>
