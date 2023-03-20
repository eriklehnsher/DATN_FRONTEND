<template>
	<div style="height:100vh; padding:20px; background-color: #e8eaef;" class=" d-flex flex-row gap-2">

		<div class="form__searching d-flex justify-content-center">
			<div class="form__search">
				<div class="form__search--loca d-flex flex-column align-items-start mb-3">
					<div class="form__search--item d-flex align-items-center">
						<p class="form__search--Inputlabel">Địa điểm</p>
					</div>
				</div>

				<SelectDictrictAndWardVue @onChangeDistrict="(value) => onChangeDistrict(value)"
					@onChangeWard="(value) => onChangeWard(value)">
				</SelectDictrictAndWardVue>
				<div class="d-flex gap-2">
					<b-form-group class="form__search--type mb-24px">
						<p class="form__search--typelabel mb-0">Số Ghế</p>
						<b-form-select class="form__search--select" v-model="form_searching.seat"
							:options="seatOptions"></b-form-select>
					</b-form-group>
					<b-form-group class="form__search--type mb-24px">
						<p class="form__search--typelabel mb-0">Loại Xe</p>
						<b-form-select class="form__search--select" v-model="form_searching.typeCar"
							:options="typeOptions"></b-form-select>
					</b-form-group>

				</div>
				<button type="button" class="form__search--button mt-40px d-flex align-items-center justify-content-center"
					@click="make_searchCar()">
					<i class="fa-solid fa-magnifying-glass"></i>
					<p class="mb-0">TÌM XE NGAY</p>
				</button>
				<button type="button" class="form__search--button mt-40px d-flex align-items-center justify-content-center"
					@click="make_clear()">
					<i class="fa-solid fa-magnifying-glass"></i>
					<p class="mb-0">LÀM TRỐNG</p>
				</button>
			</div>
		</div>

		<div>
			<div class="d-flex flex-row gap-16px">
				<div v-for="(car, key) in listCar" :key="key" style="background-color: #fff; bmax-width: 300px"
					class="border" @click="goToDetail(car._id)">
					<img :src="car.images[0].src" alt="" class="new-list__img p-12px" v-if="car.images[0].src" />

					<div class="border-top p-12px">
						<p class="text-18-20-700">
							{{ car.name }}
						</p>
						<p>{{ car.price }}K</p>
						<p>
							{{
								car.fuel == "dong-co-xang"
								? "Động cơ xăng"
								: car.fuel == "dong-co-diesel"
									? "Động cơ Diesel"
									: car.fuel == "dong-co-dien"
										? "Động cơ điện"
										: ""
							}}
						</p>
						<p>
							<i class="fa-solid fa-location-dot"></i>
							{{ car.address.addressDetail }},{{ car.address.ward }},{{
								car.address.district
							}}, Hà Nội
						</p>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import axiosIns from "@/libs/axiosConfig";
import SelectDictrictAndWardVue from "./SelectDictrictAndWard.vue";


export default {
	components: { SelectDictrictAndWardVue },

	data() {
		return {
			listCar: [],
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
	mounted() {
		axiosIns
			.get("/car/all")
			.then((response) => {
				this.listCar = response.data;
				console.log(this.listCar);
			})
			.catch(() => {
				console.log("error");
			});
	},
	methods: {
		make_clear() {
			axiosIns
				.get("/car/all")
				.then((response) => {
					this.listCar = response.data;
					console.log(this.listCar);
				})
				.catch(() => {
					console.log("error");
				});
		},
		goToDetail(id) {
			this.$router.push(`/car/${id}`);
		},
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
					this.listCar = res.data;

				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
};
</script>

<style>
.new-list__img {
	width: 100%;
	height: 200px;
}
</style>