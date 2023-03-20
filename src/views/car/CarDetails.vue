<template>
	<div class="car-detail">
		<Carousel :car="car"></Carousel>
		<CarInfo :car="car"></CarInfo>
	</div>
</template>

<script>
	import axiosIns from "@/libs/axiosConfig";
	import Carousel from "./Carousel.vue";
	import CarInfo from "./CarInfo.vue";
	export default {
		components: {
			Carousel,
			CarInfo,
		},
		data() {
			return {
				car: {},
				id: this.$route.params.car_id,
			};
		},
		mounted() {
			axiosIns
				.get("/car/" + this.id)
				.then((response) => {
					this.car = response.data;
				})
				.catch((error) => {
					console.log("Error", error);
				});
		},
	
	};

</script>

<style>
</style>