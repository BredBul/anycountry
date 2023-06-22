<template>
	<transition name="fade">
		<section class="page__country country-page">
			<div class="country-page__container _container">
				<div class="country-page__back">
					<button @click="this.$router.go(-1)"><span>Back</span></button>
				</div>
				<div class="country-page__body">
					<div class="country-page__flag _ibg">
						<img
							:src="`https://flagcdn.com/${country.cca2.toLowerCase()}.svg`"
							:alt="country.name.common" />
					</div>
					<div class="country-page__content">
						<div class="country-page__name">{{ country.name.common }}</div>
						<div class="country-page__info">
							<div class="country-page__item">
								<span>Population:</span>
								{{ $store.state.numberWithCommas(country.population) }}
							</div>
							<div class="country-page__item">
								<span>Region:</span>
								{{ country.region }}
							</div>
							<div class="country-page__item">
								<span>Sub Region:</span>
								{{ country.subregion }}
							</div>
							<div class="country-page__item">
								<span>Capital:</span>
								{{ country.capital.join(", ") }}
							</div>
							<div class="country-page__item">
								<span>Top Level Domain:</span>
								{{ country.tld.join(", ") }}
							</div>
							<div class="country-page__item">
								<span>Currencies:</span>
								{{
									Object.values(country.currencies)
										.map(el => el.name)
										.join(", ")
								}}
							</div>
							<div class="country-page__item">
								<span>Languages:</span>
								{{ Object.values(country.languages).join(", ") }}
							</div>
						</div>
						<div class="country-page__borders borders">
							<span>Border Countries:</span>
							<div class="borders__items">
								<router-link
									class="borders__item"
									v-for="(border, i) in borders"
									:key="i"
									:to="{
										name: 'country',
										params: {
											id: `${border.name.common
												.toLowerCase()
												.split(' ')
												.join('')}`,
										},
									}">
									{{ border.name.common }}
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</transition>
</template>

<script>
export default {
	name: "Index",
	props: {
		id: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			countries: this.$store.state.dataCountries,
		};
	},
	computed: {
		country() {
			return this.countries.find(el =>
				el.name.common.toLowerCase().split(" ").join("").includes(this.id)
			);
		},
		borders() {
			if (this.country.borders) {
				return this.country.borders
					.reduce(
						(arr, border) => [
							...arr,
							this.countries.find(el => el.cca3 === border),
						],
						[]
					)
					.filter(el => el);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.country-page {
	&__back {
		margin-top: 30px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		min-width: 55px;
		padding: 8px;
		box-shadow: 0px 0px 5px rgb(0 0 0 / 18%);
		text-align: center;
		transition: transform 0.2s;
		cursor: pointer;
		span {
			font-weight: 500;
			color: getColor(sec);
		}
		&:hover {
			transform: translateY(-2px);
		}
		&:active {
			transform: translateY(1px);
		}
	}
	&__body {
		padding: 10% 0px;
		display: flex;
		align-items: flex-start;
		gap: 50px;
		@media (min-width: $tablet) {
			padding: 2.5% 0px;
			gap: 100px;
		}
		@media (max-width: $tablet) {
			flex-direction: column;
		}
	}
	&__flag {
		width: 100%;
		@media (max-width: $tablet) {
			padding-bottom: 66%;
		}
		@media (min-width: $tablet) {
			min-height: 400px;
			flex: 0 0 600px;
		}
	}
	&__content {
	}
	&__name {
		margin-bottom: 40px;
		font-size: 46px;
		font-weight: bold;
	}
	&__info {
		display: grid;
		grid-template-rows: repeat(4, 1fr);
		grid-auto-flow: column;
		gap: 10px 30px;
		margin-bottom: 30px;
	}
	&__item {
		span {
			font-weight: 500;
		}
	}
}
.borders {
	span {
		font-weight: 500;
		display: inline-block;
		margin-bottom: 20px;
	}
	&__items {
		display: grid;
		gap: 15px 20px;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
	}
	&__item {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		min-width: 55px;
		width: 100%;
		padding: 8px;
		box-shadow: 0px 0px 5px rgb(0 0 0 / 18%);
		text-align: center;
	}
}
</style>
