<template>
	<div>
		<div class="car__booking">
			<div class="car__booking--title d-flex align-items-flex-end">
				<h1>{{ car.price }}.000vnd</h1>
				<p class="mb-0">/Ngày</p>
			</div>

			<div class="car__booking-form d-flex flex-column">
				<!-- start_dateTIme -->

				<p class="label_input mb-0 ml-0 mr-0 mt-0">Thời gian</p>
				<div class="d-flex flex-wrap">
					<date-range-picker :locale-data="{ firstDay: 1, format: 'dd/mm/yyyy' }" v-model="form_booking.dateRange"
						:ranges="ranges" :opens="opens" id="starDate">
					</date-range-picker>
				</div>

				<div v-for="(index, key) in surcharge" :key="key">
					<div class="mt-24px">
						<p class="label_input mb-0">{{ index.title }}</p>
						<div class="d-flex flex-column">
							<p class="surcharge__detail--header">
								{{ index.content }}
							</p>
						</div>
					</div>
				</div>

				<div class="mt-24px">
					<p class="label_input mb-0">Tổng chi phí:</p>
					<div class="d-flex flex-column">
						<p class="surcharge__detail--header">
							Phí thuê: {{ car.price }} x
							{{
								form_booking.dateRange.endDate.getDate() -
								form_booking.dateRange.startDate.getDate()
							}}
							Ngày
						</p>
						<p class="surcharge__detail--header">
							Phí giao nhận xe : 500.000 vnd (0.3km)
						</p>
						<p class="surcharge__detail--header">
							Tổng chi phí:
							{{
								car.price *
								(form_booking.dateRange.endDate.getDate() -
									form_booking.dateRange.startDate.getDate()) +
								500
							}}.000vnd
						</p>
					</div>
				</div>
				<div v-if="!isLogin">
					<b-button class="mt-48px car__booking--form-button btn btn-block btn-success"
						@click="make_booking(car._id)">
						ĐẶT XE
					</b-button>
				</div>

			</div>
		</div>
	</div>
</template>

<script>

import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import axiosIns from "../../libs/axiosConfig";
export default {
	components: { DateRangePicker },
	props: {
		car: Object,
	},
	data() {
		let startDate = new Date();
		let endDate = new Date();
		endDate.setDate(endDate.getDate() + 1);
		return {
			isLogin: false,
			form_booking: {
				dateRange: { startDate, endDate },
			},
			ranges: false,
			opens: "left",
			surcharge: [
				{
					title: "Quá giờ",
					content: "Phí: 100 000đ/giờ. Quá 4 giờ tính bằng giá thuê 1 ngày",
				},
				{
					title: "Vệ sinh xe",
					content:
						"Phí: 100 000đ (nếu trả xe nhiều vết bẩn, bùn cát, sình lầy.... cần phải vệ sinh lại trước khi giao cho khách sau)",
				},
				{
					title: "Vệ sinh xe Phí:",
					content:
						"500 000đ (nếu hút thuốc lá trong xe, chở sầu riêng, hải sản nặng mùi .... cần phải đi khử mùi trước khi giao cho khách sau)",
				},
				{ title: "Bảo hiểm", content: "Chuyến đi được bảo hiểm bởi HaNoi-Car" },
			],
			bookingFromData: {
				carId: "",
				userId: "",
				startDate: "",
				endDate: "",
				total: "",
			},
		};
	},
	methods: {
		convert(str) {
			var date = new Date(str),
				month = ("0" + (date.getMonth() + 1)).slice(-2),
				day = ("0" + date.getDate()).slice(-2);
			return [day, month, date.getFullYear()].join("/");
		},
		make_booking(id) {
			let token = localStorage.getItem("token");
			if (token == null) {
				this.isLogin = true;
				this.$router.push("/login");
			}
			this.bookingFromData.carId = id;
			this.bookingFromData.userId = localStorage.getItem("user_id");
			this.bookingFromData.startDate = this.convert(
				this.form_booking.dateRange.startDate
			);
			this.bookingFromData.endDate = this.convert(
				this.form_booking.dateRange.endDate
			);
			this.bookingFromData.total =
				this.car.price *
				(this.form_booking.dateRange.endDate.getDate() -
					this.form_booking.dateRange.startDate.getDate()) +
				500;
			console.log(this.bookingFromData);
			axiosIns
				.post(`/booking/create/${id}`, this.bookingFromData)
				.then((res) => {
					this.$toast("Dat xe thanh cong!");
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		loginIn() {
			this.isLogin = true;
		},


	},
	created() {

	},
};
</script>

<style></style>