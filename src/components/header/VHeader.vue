<template>
  <header class="header">
    <div class="header__container _container">
      <div class="header__content">
        <div class="header__title">
          <router-link :to="{ name: 'home' }">AnyCountry?</router-link>
        </div>
        <dark-mode-icon class="header__dark-mode" />
        <button
          v-if="this.$route.path === '/'"
          @click="openMenu()"
          class="header__menu"
          :class="{ open: $store.state.menuStatus }"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import darkModeIcon from "../darkModeIcon.vue";

export default {
  name: "VHeader",
  components: { darkModeIcon },
  methods: {
    openMenu() {
      let scrollWidth =
        window.innerWidth - document.querySelector(".wrapper").offsetWidth;
      this.$store.state.menuStatus = !this.$store.state.menuStatus;
      document.querySelector("body").classList.toggle("_lock");
      if (this.$store.state.menuStatus) {
        document.querySelector("body").style.paddingRight = scrollWidth + "px";
        document.querySelector(
          "header"
        ).style.width = `calc(100% + ${scrollWidth}px`;
      } else {
        document.querySelector("body").style.paddingRight = "0px";
        document.querySelector("header").style.width = "100%";
      }
    },
  },
};
</script>

<style lang="scss">
.header {
  background-color: getColor(base);
  border-bottom: 1px solid getColor(border);
  position: sticky;
  top: 0;
  z-index: 5;
  &__container {
    position: relative;
  }

  &__content {
    display: flex;
    padding: 50px 0 20px;
    justify-content: space-between;
    align-items: center;

    @media (min-width: $tablet) {
      position: relative;
      padding: 20px 45px 20px 0;
    }
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    color: getColor(sec);
  }
  &__dark-mode {
    svg {
      display: flex;
    }
  }
  &__menu {
    position: absolute;
    right: 0px;
    width: 28px;
    height: 22px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    transition: transform 0.4s ease-out;
    @media (max-width: $tablet) {
      top: 16px;
      right: 15px;
    }
    &.open {
      transform: rotate(-45deg);
      span {
        &:nth-of-type(1) {
          transform: rotate(-90deg) translateX(5px);
        }
        &:nth-of-type(3) {
          transform: rotate(-90deg) translateX(-5px);
        }
      }
    }
    span {
      background-color: getColor(sec);
      border-radius: 5px;
      width: 100%;
      height: 3px;
      &:nth-of-type(1) {
        width: 50%;
        transition: transform 0.4s cubic-bezier(0.54, -0.81, 0.57, 0.57);
        transform-origin: right;
      }

      &:nth-of-type(2) {
        width: 100%;
      }

      &:nth-of-type(3) {
        width: 50%;
        align-self: flex-end;
        transition: transform 0.4s cubic-bezier(0.54, -0.81, 0.57, 0.57);
        transform-origin: left;
      }
    }
  }
}
</style>
