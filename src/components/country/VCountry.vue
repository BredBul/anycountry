<template>
  <div class="country">
    <div class="country__body">
      <div class="country__flag _ibg">
        <img
          :src="`https://countryflagsapi.com/svg/${flag.toLowerCase()}`"
          :alt="name"
        />
      </div>
      <div class="country__name">{{ name }}</div>
      <div class="country__item">
        <span>Population:</span> {{ $store.state.numberWithCommas(population) }}
      </div>
      <div class="country__item"><span>Region:</span> {{ region }}</div>
      <div class="country__item">
        <span>Capital:</span> {{ capital.join(", ") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VCountry",
  props: {
    flag: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    population: {
      type: Number,
      default: null,
    },
    region: {
      type: String,
      default: null,
    },
    capital: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.country {
  border: 1px solid getColor(border);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  overflow: hidden;
  &__body {
    display: flex;
    flex-direction: column;
    padding: 20px 20px 30px;
    width: 100%;
    background-color: getColor(base);
    color: getColor(sec);
  }
  &__flag {
    padding-bottom: 60%;
    margin-bottom: 20px;
  }

  &__name {
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 500;
  }

  &__item {
    margin-bottom: 10px;
  }
}
</style>
