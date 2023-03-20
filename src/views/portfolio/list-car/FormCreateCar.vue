<template>
	<div>
		<button
			class="car-form__button--modal btn btn-block"
			v-b-modal.modal-prevent-closing
		>
			Tạo Xe Mới Ngay!
		</button>
		<b-modal
			class="car-form__modal"
			id="modal-prevent-closing"
			ref="modal"
			title="VUI LÒNG ĐIỀN ĐẦY ĐỦ THÔNG TIN DƯỚI ĐÂY !"
			@show="resetModal"
			@hidden="resetModal"
			@ok="handleOk"
			hide-header-close
			size="lg"
		>
			<form ref="" @submit.stop.prevent="handleSubmit">
				<div class="">
					<div class="group__input-data">
						<b-form-group label="Tên Xe" class="">
							<b-form-input
								id="name-input"
								class="car-form__detail--input"
								v-model="form.name"
							></b-form-input>
						</b-form-group>
						<b-form-group label="Loại Xe" class="">
							<b-form-select
								class="car-form__detail--input car-form__select"
								v-model="form.type"
								:options="typeOptions"
							></b-form-select>
						</b-form-group>
						<b-form-group label="Số ghế" class="">
							<b-form-select
								class="car-form__detail--input car-form__select"
								v-model="form.seat"
								:options="seatOptions"
							></b-form-select>
						</b-form-group>
						<b-form-group label="Loại động cơ" class="">
							<b-form-select
								class="car-form__detail--input car-form__select text-capitalize"
								v-model="form.fuel"
								:options="fuelOptions"
							></b-form-select>
						</b-form-group>
					</div>
					<b-form-group label="Mô tả ngắn" class="mb-24px">
						<b-form-textarea
							class="car-form__detail--input"
							id="decs"
							v-model="form.desc"
							placeholder="Mô tả ngắn"
						></b-form-textarea>
					</b-form-group>
				</div>

				<b-form-group label="Các tính năng cơ bản">
					<b-form-checkbox-group
						class="car-form__feature"
						v-model="form.features"
						:options="featureOptions"
						value-field="item"
						text-field="name"
					>

					</b-form-checkbox-group>
				</b-form-group>

				<b-form-group label="Các Giấy phép liên quan">
					<b-form-checkbox-group
						class="car-form__requirements"
						v-model="form.requiredDocuments"
						:options="requiredDocumentsOptions"
						value-field="item"
						text-field="name"
					></b-form-checkbox-group>
				</b-form-group>

				<div class="d-flex flex-row">
					<b-form-group
						label="Thế Chấp"
						class="car-form__detail mr-10px mt-24px"
					>
						<b-form-input
							class="car-form__mortgage"
							id="collateral-input"
							v-model="form.collateral"
							type="number"
						></b-form-input>
					</b-form-group>

					<b-form-group
						label="Giá Thuê"
						class="car-form__detail mt-24px ml-10px mb-24px"
					>
						<b-form-input
							class="car-form__price"
							id="price-input"
							v-model="form.price"
							type="number"
						></b-form-input>
					</b-form-group>
				</div>

				<Map
					@onChangeDistrict="(value) => onChangeDistrict(value)"
					@onChangeWard="(value) => onChangeWard(value)"
					@onChangeAddressDetails="(value) => onChangeAddressDetails(value)"
				>
				</Map>

				<input
					ref="uploadImage"
					type="file"
					id="uploads__carImg"
					accept="image/*"
					multiple
					@change="processFiles($event)"
				/>
			</form>
		</b-modal>
	</div>
</template>

<script>
	import axiosIns from "@/libs/axiosConfig";
	import Map from "./Map.vue";

	export default {
		components: {  Map },
		data() {
			return {
				name: "",
				nameState: null,
				form: {
					name: "",
					type: "",
					seat: "",
					fuel: "",
					desc: "",
					features: [],
					requiredDocuments: [],
					collateral: "",
					price: "",
					address: {
						district: "",
						ward: "",
						addressDetail: "",
					},
					images: "",
					ownerId: "",
					ownerUsername: "",
				},
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
				fuelOptions: [
					{ value: "dong-co-xang", text: "động cơ xăng" },
					{ value: "dong-co-diesel", text: "động cơ diesel" },
					{ value: "dong-co-dien", text: "động cơ điện" },
				],
				featureOptions: [
					{ item: "map", name: "Bản đồ" },
					{ item: "camera", name: "Camera" },
					{ item: "gps", name: "Định vị GPS" },
					{ item: "usb", name: "Khe cắm USB" },
					{ item: "tire", name: "Lốp dự phòng" },
					{ item: "airbag", name: "Túi khí an toàn" },
				],
				requiredDocumentsOptions: [
					{ item: "cmnd", name: "Căn cước công dân" },
					{ item: "gplx", name: "Giấy phép lái xe" },
					{ item: "pp-hk", name: "Passport hoặc Hộ khẩu" },
				],
				list: [],
				enabled: true,
				url: process.env.VUE_APP_API_URL,
			};
		},
		methods: {
			resetModal() {
				(this.list = []),
					(this.form = {
						name: "",
						type: "",
						seat: "",
						fuel: "",
						desc: "",
						features: [],
						requiredDocuments: [],
						collateral: "",
						price: "",
						address: { district: "", ward: "", addressDetail: "" },
						images: "",
					});
			},
			handleOk(bvModalEvent) {
				bvModalEvent.preventDefault();
				this.handleSubmit();
			},
			handleSubmit() {
				this.form.images = this.list;
				this.form.ownerId = localStorage.getItem("user_id");
				this.form.ownerUsername = localStorage.getItem("username");
				console.log(this.form)
				axiosIns
					.post("/car/create", this.form)
					.then((response) => {
						this.$emit("newCarData", response);
					})
					.catch(() => {
						console.log("error");
					});
				this.$nextTick(() => {
					this.$bvModal.hide("modal-prevent-closing");
				});
			},

			onChangeDistrict(value) {
				this.form.address.district = value;
			},
			onChangeAddressDetails(value) {
				this.form.address.addressDetail = value ? value : "";
			},
			onChangeWard(value) {
				this.form.address.ward = value;
			},
			processFiles(event) {
				let files = event.target.files;
				let formData = new FormData();
				for (var i = 0; i < files.length; i++) {
					formData.append("files", files[i]);
				}
				axiosIns
					.post("/images/car", formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					})
					.then((response) => {
						response.data.files_url.forEach((file) => {
							this.list.push({
								src: this.url + file,
							});
						});
						console.log(this.list);
					})
					.catch(() => {
						console.log("something went wrong!!");
					});
			},
		},
	};
</script>
<style scoped lang="scss">
	.group__input-data {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
	}
</style>