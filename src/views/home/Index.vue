<template>
  <section class="page__main-block main-block">
    <loading v-model:active="isLoading" />
    <div class="main-block__container _container">
      <div class="main-block__search">
        <input
          type="text"
          v-model="search"
          placeholder="Search for countries"
        />
      </div>
      <div class="main-block__filters">
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
          <div v-for="option in colorCheckboxes">
            <input
              :id="`checkbox-${option.value}`"
              type="checkbox"
              :value="option.value"
              v-model="checkbox"
            />
            <label
              :class="`main-block__checkbox-${option.value}`"
              :for="`checkbox-${option.value}`"
            ></label>
          </div>
        </div>
        <div class="main-block__radio">
          <div>
            <input id="radio-all" type="radio" value="all" v-model="includes" />
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
      </div>
      <div class="main-block__content">
        <v-country
          v-for="(country, i) in color"
          :key="i"
          :flag="country.flags.svg"
          :name="country.name.common"
          :population="country.population"
          :region="country.region"
          :capital="country.capital"
        />
      </div>
      <div class="item error" v-if="search && !filteredList.length">
        <p>No results found!</p>
      </div>
    </div>
  </section>
</template>

<script>
import VCountry from "../../components/country/VCountry.vue";
import data from "../../assets/data.json";

import Loading from "vue-loading-overlay";
import vSelect from "vue-select";

import "vue-loading-overlay/dist/vue-loading.css";
import "vue-select/dist/vue-select.css";

export default {
  name: "Index",
  components: { VCountry, Loading, vSelect },
  data() {
    return {
      countries: [],
      search: "",
      selected: "nameAZ",
      selectedRegion: null,
      checkbox: [],
      includes: "all",
      options: [
        { label: "A to Z", value: "nameAZ" },
        { label: "Z to A", value: "nameZA" },
        { label: "By population: lower to higher", value: "populationLower" },
        { label: "By population: higher to lower", value: "populationHigher" },
      ],
      regionsOptions: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
      placeholderRegion: "select",
      colorCheckboxes: [
        {
          value: "Red",
        },
        {
          value: "Saffron",
        },
        {
          value: "Yellow",
        },
        {
          value: "Green",
        },
        {
          value: "Blue",
        },
        {
          value: "LiBlue",
        },
        {
          value: "Black",
        },
        {
          value: "White",
        },
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
    this.countries = data;
    // GET request using fetch with error handling
    // fetch("https://restcountries.com/v3.1/all")
    //   .then(async (response) => {
    //     const data = await response.json();
    //
    //     for (let i in dataColors) this.countryColors.push(dataColors[i]);
    //
    //     this.countries = data;
    //     // this.countries = this.countries.map((country) => {
    //     //   country.trash = "";
    //     //   return country;
    //     // });
    //
    //     // this.propertiesCheckboxes = [
    //     //   ...new Set(
    //     //     this.countryColors.reduce((all, country) => {
    //     //       return [
    //     //         ...all,
    //     //         ...country.Shapes.split(", "),
    //     //         ...country.Symbols.split(", "),
    //     //         ...country.Stripes.split(", "),
    //     //         country.Cross,
    //     //       ].filter((v) => v);
    //     //     }, [])
    //     //   ),
    //     // ];
    //     this.countryColors.forEach((country) => {
    //       country.properties = [];
    //
    //       for (let color of this.colorCheckboxes) {
    //         if (country[color.value]) country.properties.push(`${color.value}`);
    //       }
    //
    //       for (let property of this.propertiesCheckboxes) {
    //         for (let el of Object.values(country)) {
    //           if (typeof el === "string" && el.split(", ").includes(property)) {
    //             country.properties.push(property);
    //           }
    //         }
    //       }
    //     });
    //
    //     this.countries = this.countries.filter((country) => {
    //       for (let i in this.countryColors) {
    //         if (country.name.common === this.countryColors[i].Name) {
    //           country.properties = this.countryColors[i].properties;
    //           // country.trash = "trash";
    //           // delete country.trash;
    //           return true;
    //           break;
    //         }
    //       }
    //     });
    //
    //     // // A comparer used to determine if two entries are equal.
    //     // const isSameUser = (a, b) => a.trash === b.trash;
    //     //
    //     // // Get items that only occur in the left array,
    //     // // using the compareFunction to determine equality.
    //     // const onlyInLeft = (left, right, compareFunction) =>
    //     //   left.filter(
    //     //     (leftValue) =>
    //     //       !right.some((rightValue) =>
    //     //         compareFunction(leftValue, rightValue)
    //     //       )
    //     //   );
    //     //
    //     // const onlyInA = onlyInLeft(
    //     //   this.countries,
    //     //   this.newCountries,
    //     //   isSameUser
    //     // );
    //     //
    //     // onlyInA.forEach((el) => {
    //     //   console.log(el.name.common);
    //     // });
    //
    //     if (!response.ok) {
    //       const error = (data && data.message) || response.statusText;
    //       return Promise.reject(error);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("There was an error!", error);
    //   });
  },
  methods: {},
  computed: {
    filteredList() {
      return this.countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
    sortedList() {
      if (this.selected === "nameAZ") {
        return this.filteredList.sort(function (a, b) {
          return a.name.common.localeCompare(b.name.common);
        });
      }
      if (this.selected === "nameZA") {
        return this.filteredList.sort(function (a, b) {
          return b.name.common.localeCompare(a.name.common);
        });
      }
      if (this.selected === "populationLower") {
        return this.filteredList.sort(function (a, b) {
          return a.population - b.population;
        });
      }
      if (this.selected === "populationHigher") {
        return this.filteredList.sort(function (a, b) {
          return b.population - a.population;
        });
      }
      if (this.selected === null) {
        return this.filteredList();
      }
    },
    color: function () {
      console.log(this.includes);
      if (this.checkbox.length > 0) {
        if (this.includes === "all") {
          return this.sortedList.filter((country) => {
            return this.checkbox.every((v) => country.colors.includes(v));
          });
        } else {
          return this.sortedList.filter(
            (country) =>
              country.colors.sort().join(",") === this.checkbox.sort().join(",")
          );
        }
      }
      return this.sortedList;
    },
  },
};
</script>

<style scoped></style>
