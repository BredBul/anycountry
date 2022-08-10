<template>
  <header class="header">
    <div class="header__container _container">
      <div class="header__content">
        <div class="header__title">AnyCountry?</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "VHeader",
};
</script>

<style lang="scss">
.header {
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 30%) 0px 3px 8px;
  &__container {
  }

  &__content {
    padding: 20px 0;
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
  }
}
</style>
