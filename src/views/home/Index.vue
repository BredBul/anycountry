<template>
  <section class="page__main-block main-block">
    <div class="main-block__container _container">
      <div class="main-block__search">
        <input
          type="text"
          v-model="$store.state.searchValue"
          placeholder="Search by country or capital name"
        />
      </div>
      <div class="main-block__content">
        <router-link
          v-for="(country, i) in properties"
          :key="i"
          :to="{
            name: 'country',
            params: {
              id: `${country.name.common.toLowerCase().split(' ').join('')}`,
            },
          }"
        >
          <v-country
            :flag="country.cca2"
            :name="country.name.common"
            :population="country.population"
            :region="country.region"
            :capital="country.capital"
          />
        </router-link>
      </div>
      <div
        class="item error"
        v-if="$store.state.searchValue && !filteredList.length"
      >
        <p>No results found!</p>
      </div>
    </div>
    <Teleport to="body">
      <Transition name="menu">
        <div class="main-block__filters" v-if="$store.state.menuStatus">
          <v-select
            class="main-block__regions"
            :options="options"
            v-model="selected"
            :reduce="(option) => option.value"
            :clearable="false"
            label="label"
          ></v-select>
          <v-select
            class="main-block__regions"
            :options="regionsOptions"
            v-model="selectedRegion"
            placeholder="Filter by Region"
            label="label"
          ></v-select>
          <div class="main-block__checkboxes">
            <span>Filter by flag colors</span>
            <div class="main-block__checkboxes-wrap">
              <div
                v-for="option in colorCheckboxes"
                class="main-block__checkbox"
              >
                <input
                  :id="`checkbox-${option}`"
                  type="checkbox"
                  :value="option"
                  v-model="checkbox"
                />
                <label
                  :class="`main-block__checkbox-${option}`"
                  :for="`checkbox-${option}`"
                ></label>
              </div>
            </div>
          </div>
          <div class="main-block__radio">
            <div>
              <input
                id="radio-all"
                type="radio"
                value="all"
                v-model="includes"
              />
              <label class="main-block__radio-all" for="radio-all"
                >Includes these colors</label
              >
            </div>
            <div>
              <input
                id="radio-only"
                type="radio"
                value="only"
                v-model="includes"
              />
              <label class="main-block__radio-only" for="radio-only"
                >Includes only these colors</label
              >
            </div>
          </div>
          <div class="main-block__properties">
            <span>Filter by flag properties</span>
            <div class="main-block__properties-wrap">
              <div v-for="option in propertiesCheckboxes">
                <input
                  :id="`property-${option}`"
                  type="checkbox"
                  :value="option"
                  v-model="selectedProperty"
                />
                <label
                  :class="`main-block__property-${option}`"
                  :for="`property-${option}`"
                  >{{ option }}</label
                >
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script>
import VCountry from "../../components/country/VCountry.vue";

import Loading from "vue-loading-overlay";
import vSelect from "vue-select";

import "vue-loading-overlay/dist/vue-loading.css";
import "vue-select/dist/vue-select.css";

export default {
  name: "Index",
  components: { VCountry, Loading, vSelect },
  data() {
    return {
      countries: this.$store.state.dataCountries,
      selected: "nameAZ",
      selectedRegion: null,
      checkbox: [],
      selectedProperty: [],
      includes: "all",
      options: [
        { label: "A to Z", value: "nameAZ" },
        { label: "Z to A", value: "nameZA" },
        { label: "By population: lower to higher", value: "populationLower" },
        { label: "By population: higher to lower", value: "populationHigher" },
      ],
      regionsOptions: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
      colorCheckboxes: [
        "Red",
        "Saffron",
        "Yellow",
        "Green",
        "Blue",
        "LiBlue",
        "Black",
        "White",
      ],
      propertiesCheckboxes: [
        "Vertical",
        "Horizontal",
        "Bird",
        "Weapon",
        "Agriculture",
        "Sun",
        "Stars",
        "Crescent",
        "Emblem",
        "Circle",
        "Diagonal",
        "Cross",
        "Triangle",
        "Animal",
        "Plant",
        "Landscape",
        "Crown",
      ],
      countryColors: [],
      isLoading: false,
    };
  },
  mounted() {
    document.addEventListener("click", (e) => {
      if (document.querySelector("body").classList.contains("_lock")) {
        let isContainer = document.querySelector("main").contains(e.target);
        if (isContainer) {
          document.querySelector("body").classList.remove("_lock");
          document.querySelector("body").style.paddingRight = "0px";
          document.querySelector("header").style.width = "100%";
          this.$store.state.menuStatus = false;
        }
      }
    });
  },
  computed: {
    filteredList() {
      return this.countries.filter(
        (country) =>
          country.name.common
            .toLowerCase()
            .includes(this.$store.state.searchValue.toLowerCase()) ||
          country.capital
            .sort()
            .join(",")
            .toLowerCase()
            .includes(this.$store.state.searchValue.toLowerCase())
      );
    },
    sortedList() {
      if (this.selected === "nameAZ") {
        return this.filteredList.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
      }
      if (this.selected === "nameZA") {
        return this.filteredList.sort((a, b) =>
          b.name.common.localeCompare(a.name.common)
        );
      }
      if (this.selected === "populationLower") {
        return this.filteredList.sort((a, b) => a.population - b.population);
      }
      if (this.selected === "populationHigher") {
        return this.filteredList.sort((a, b) => b.population - a.population);
      }
      if (this.selected === null) {
        return this.filteredList();
      }
    },
    color() {
      if (this.checkbox.length > 0) {
        if (this.includes === "all") {
          return this.sortedList.filter((country) =>
            this.checkbox.every((v) => country.colors.includes(v))
          );
        } else {
          return this.sortedList.filter(
            (country) =>
              country.colors.sort().join(",") === this.checkbox.sort().join(",")
          );
        }
      }
      return this.sortedList;
    },
    region() {
      if (this.selectedRegion) {
        return this.color.filter(
          (country) => country.region === this.selectedRegion
        );
      } else {
        return this.color;
      }
    },
    properties() {
      if (this.selectedProperty.length > 0) {
        return this.region.filter((country) =>
          this.selectedProperty.every((v) => country.properties.includes(v))
        );
      }
      return this.region;
    },
  },
};
</script>
