<template>
	<div class="form__searching d-flex justify-content-center">
		<div class="form__search">
			<div class="form__search--loca d-flex flex-column align-items-start mb-3">
				<div class="form__search--item d-flex align-items-center">
					<p class="form__search--Inputlabel">Địa điểm</p>
				</div>
			</div>

			<SelectDictrictAndWardVue
				@onChangeDistrict="(value) => onChangeDistrict(value)"
				@onChangeWard="(value) => onChangeWard(value)"
			>
			</SelectDictrictAndWardVue>

			<b-form-group class="form__search--type mb-24px">
				<p class="form__search--typelabel mb-0">Loại Xe</p>
				<b-form-select
					class="form__search--select"
					v-model="form_searching.seat"
					:options="seatOptions"
				></b-form-select>
			</b-form-group>
			<b-form-group class="form__search--type mb-24px">
				<p class="form__search--typelabel mb-0">Loại Xe</p>
				<b-form-select
					class="form__search--select"
					v-model="form_searching.typeCar"
					:options="typeOptions"
				></b-form-select>
			</b-form-group>
			<button
				type="button"
				class="form__search--button mt-40px d-flex align-items-center justify-content-center"
				@click="make_searchCar()"
			>
				<i class="fa-solid fa-magnifying-glass"></i>
				<p class="mb-0">TÌM XE NGAY</p>
			</button>
		</div>
	</div>
</template>
<script>
	import axiosIns from "../../libs/axiosConfig";
	import SelectDictrictAndWardVue from "./SelectDictrictAndWard.vue";
	export default {
		components: { SelectDictrictAndWardVue },
		data() {
			return {
				typeOptions: [
					{ value: "xe-tu-lai", text: "Xe tự lái" },
					{ value: "Xe-co-tai-xe", text: "Xe có tài xế" },
				],
				seatOptions: [
					{ value: "2", text: "Xe 2 chỗ" },
					{ value: "4-5", text: "Xe 4-5 chỗ" },
					{ value: "7", text: "Xe 7 chỗ" },
					{ value: "12", text: "Xe 12 chỗ" },
				],
				form_searching: {
					district: "",
					ward: "",
					seat: "",
					typeCar: "",
				},
			};
		},
		methods: {
			onChangeDistrict(value) {
				this.form_searching.district = value;
			},
			onChangeWard(value) {
				this.form_searching.ward = value;
			},
			make_searchCar() {
				console.log(this.form_searching);
				axiosIns
					.get("/car-searching", {
						params: {
							district: this.form_searching.district,
							ward: this.form_searching.ward,
							seat: this.form_searching.seat,
							type: this.form_searching.typeCar,
						},
					})
					.then((res) => {
						console.log(res.data);
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>