<template>
	<div class="list__car">
		<div class="list__car--content">
			<div class="d-flex align-items-center justify-content-between">
				<h1 class="py-24px">Danh sách xe</h1>

				<FormCreateCar :update="listCarUpdate" @newCarData="newCarData" @newCarFeature="newCarFeature"
					class="mb-16px">
				</FormCreateCar>
			</div>

			<b-table responsive striped hover :fields="fields" :items="listCar">
				<template #cell(name)="car">
					<p class="text-capitalize pointer" @click="goToCarDetailPage(car.item._id)">
						{{ car.item.name }}
					</p>
				</template>
				<template #cell(type)="car">
					<p class="text-capitalize">
						{{
							car.item.type == "xe-tu-lai"
							? "Xe tự lái"
							: car.item.type == "Xe-co-tai-xe"
								? "Xe có tài xế"
								: ""
						}}
					</p>
				</template>
				<template #cell(seat)="car">
					<p>Xe {{ car.item.seat }} chỗ</p>
				</template>
				<template #cell(address)="car">
					<p>
						<span>{{ car.item.address.addressDetail }}</span> -
						<span>{{ car.item.address.ward }}</span> -
						<span>{{ car.item.address.district }}</span> - Ha Noi
					</p>
				</template>
				<template #cell(price)="car">
					<p>{{ car.item.price }}</p>
				</template>
				<template #cell(ownerUsername)="car">
					<p>
						{{ car.item.ownerUsername }}
					</p>
				</template>
				<template #cell(action)="car">
					<div class="d-flex">
						<b-button @click="DetailCar(car.item._id)" class="btn btn-success mr-16px">
							Detail
						</b-button>
					</div>
				</template>
			</b-table>
			<b-sidebar :visible="showSideBar" backdrop-variant="dark" backdrop shadow right no-header no-footer
				no-close-on-backdrop>
				<div>
					<div class="border-bottom height-48px d-flex align-items-center text-20-27-700 px-16px">
						<p class="mb-0">Thông tin xe</p>
					</div>

					<div class="p-16px text-14-24-400">
						<b-row class="mb-24px">
							<b-col cols="4" class="d-flex flex-column justify-content-between">
								<p>Tên xe:</p>
							</b-col>
							<b-col cols="8" class="d-flex flex-column justify-content-between">
								<p style="color: #00a550;    font-weight: 700;
									font-size: 14px;
									text-transform: none;
									color: #00a550;">{{ carDetail.name }}</p>
							</b-col>
						</b-row>
						<b-row class="mb-24px">
							<b-col cols="4" class="d-flex flex-column justify-content-between">
								<p>Loại xe:</p>
							</b-col>
							<b-col cols="8" class="d-flex flex-column justify-content-between">
								<span class="text-14-24-600 text-capitalize">{{
									carDetail.type == "xe-tu-lai"
									? "Xe tự lái"
									: carDetail.type == "Xe-co-tai-xe"
										? "Xe có tài xế"
										: ""
								}}</span>
							</b-col>
						</b-row>
						<b-row class="mb-24px">
							<b-col cols="4" class="d-flex flex-column justify-content-between">
								<p>Số ghế:</p>
							</b-col>
							<b-col cols="8" class="d-flex flex-column justify-content-between">
								<span class="text-14-24-600 text-capitalize">{{ carDetail.seat }} chỗ</span>
							</b-col>
						</b-row>
						<b-row class="mb-24px">
							<b-col cols="4" class="d-flex flex-column justify-content-between">
								<p>Động cơ:</p>
							</b-col>
							<b-col cols="8" class="d-flex flex-column justify-content-between">
								<span class="text-14-24-600 text-capitalize">
									{{
										carDetail.fuel == "dong-co-xang"
										? "Động cơ xăng"
										: carDetail.fuel == "dong-co-diesel"
											? "Động cơ Diesel"
											: carDetail.fuel == "dong-co-dien"
												? "Động cơ điện"
												: ""
									}}</span>
							</b-col>
						</b-row>
						<b-row class="mb-24px">
							<b-col cols="4" class="d-flex flex-column justify-content-between">
								<p>Tính năng:</p>
							</b-col>
							<b-col cols="8">
								<ul class="text-14-24-600 d-flex flex-wrap" style="list-style-type: none; padding: 0px">
									<li class="mr-20px" v-for="feature in carDetail.features" :key="feature.id">
										{{
											feature == "map"
											? "Bản đồ"
											: feature == "camera"
												? "Camera 360"
												: feature == "gps"
													? "Định vị GPS"
													: feature == "usb"
														? "Khe cắm USB"
														: feature == "tire"
															? "Lốp dự phòng"
															: feature == "airbag"
																? "Túi khi an toàn"
																: ""
										}}
									</li>
								</ul>
							</b-col>
						</b-row>
						<b-row class="mb-24px">
							<b-col cols="4" class="d-flex flex-column justify-content-between">
								<p>Giấy tờ:</p>
							</b-col>
							<b-col cols="8" class="d-flex flex-column justify-content-between">
								<ul class="d-flex flex-wrap text-14-24-600" style="list-style-type: none; padding: 0px">
									<li class="mr-20px" v-for="requiredDocument in carDetail.requiredDocuments"
										:key="requiredDocument.id">
										{{
											requiredDocument == "cmnd"
											? "Chứng minh nhân dân"
											: requiredDocument == "gplx"
												? "Giấy phép lái xe"
												: requiredDocument == "pp-hk"
													? "Passport hoặc hộ khẩu"
													: ""
										}}
									</li>
								</ul>
							</b-col>
						</b-row>
						<b-row class="mb-24px">
							<b-col cols="4" class="d-flex flex-column justify-content-between">
								<p>Thế chấp:</p>
							</b-col>
							<b-col cols="8" class="d-flex flex-column justify-content-between">
								<span class="text-14-24-600 text-capitalize">{{ carDetail.collateral }} 000vnd</span>
							</b-col>
						</b-row>
						<b-row class="mb-24px">
							<b-col cols="4" class="d-flex flex-column justify-content-between">
								<p>Giá thuê:</p>
							</b-col>
							<b-col cols="8" class="d-flex flex-column justify-content-between">
								<span class="text-14-24-600 text-capitalize">{{ carDetail.price }} 000vnd.</span>
							</b-col>
						</b-row>
						<b-row class="mb-24px">
							<b-col cols="4" class="d-flex flex-column justify-content-between">
								<p>Địa chỉ:</p>
							</b-col>
							<b-col cols="8" class="d-flex flex-column justify-content-between">
								<p class="text-14-24-600" v-if="carDetail.address">
									{{ carDetail.address.addressDetail }}/
									{{ carDetail.address.ward }}/
									{{ carDetail.address.district }}/ Hà Nội
								</p>
							</b-col>
						</b-row>
						<b-row class="mb-24px">
							<b-col cols="4" class="d-flex flex-column justify-content-between">
								<p>Địa chỉ:</p>
							</b-col>
							<b-col cols="8" class="d-flex flex-column justify-content-between">
								<div v-for="(index, key) in carDetail.images" :key="key" class="cars">
									<img :src="index.src" alt="" class="car__img mb-16px" />
								</div>
							</b-col>
						</b-row>
					</div>
				</div>

				<div class="d-flex align-items-center justify-content-end gap-16px px-16px">
					<b-button class="mb-20px" variant="outline-primary" @click="showSideBar = false">
						Đóng
					</b-button>
				</div>
			</b-sidebar>
		</div>
	</div>
</template>

<script>
import FormCreateCar from "./FormCreateCar.vue";
import axiosIns from "@/libs/axiosConfig";

export default {
	props: {
		update: {
			type: Object,
			default: null,
		},
	},

	components: {
		FormCreateCar,
	},
	data() {
		return {
			features: [],
			car: {},
			fields: [
				{
					key: "name",
					label: "Tên Xe",
					sortable: true,
				},
				{
					key: "type",
					label: "Loại Xe",
				},
				{
					key: "seat",
					label: "Số ghế",
				},
				{
					key: "address",
					label: "Địa chỉ",
				},
				{
					key: "price",
					label: "Giá Thuê Xe",
				},
				{
					key: "ownerUsername",
					label: "Chủ Xe",
				},
				{
					key: "action",
					label: "",
				},
			],
			listCar: [],
			listCarUpdate: {},
			showSideBar: false,
			carDetail: {},
		};
	},
	methods: {
		newCarFeature() {
			return this.features;
		},
		newCarData(element) {
			this.listCar.push(element.data);
		},

		DetailCar(id) {
			this.showSideBar = true;
			axiosIns
				.get(`/car/${id}`)
				.then((response) => {
					this.carDetail = response.data;
				})
				.catch(() => {
					console.log("error");
				});
		},
		goToCarDetailPage(id) {
			this.$router.push(`/car/${id}`);
		},
	},
	mounted() {
		// Fetch all cars

		let role = localStorage.getItem("role");
		let user_id = localStorage.getItem("user_id");
		if (role == "admin") {
			axiosIns
				.get("/car/all")
				.then((response) => {
					this.listCar = response.data;
					console.log(this.listCar);
				})
				.catch(() => {
					console.log("error");
				});
		} else {
			axiosIns
				.get("/car/all/" + user_id)
				.then((response) => {
					this.listCar = response.data;
					console.log(this.listCar);
				})
				.catch(() => {
					console.log("error");
				});
		}
	},
	computed: {},
};
</script>
<style>
.list__car--content {
	height: 100vh;
	padding: 38px 38px;
}

.cars {
	display: grid;
	gap: 24px;
}

.car__img {
	width: 100%;
	height: auto;
	outline: 1px dashed #ccc;
}
</style>