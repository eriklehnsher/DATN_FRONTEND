<template>
	<div class="vendorListBooking">
		<h1 class="py-24px">Danh sách lịch đặt xe</h1>
		<b-table
			responsive
			striped
			hover
			class="list__vendor--table"
			:fields="fields"
			:items="vendorListBooking"
		>
			<template #cell(createdAt)="data">
				<div class="d-flex align-items-center">
					<p>{{ data.value }}</p>
				</div>
			</template>
			<template #cell(startDate)="data">
				<span>{{ data.item.startDate }}</span>
			</template>
			<template #cell(endDate)="data">
				<span>{{ data.item.endDate }}</span>
			</template>
			<template #cell(total)="data">
				<span>{{ data.value }}.000 VND</span>
			</template>
			<template #cell(status)="data">
				<div
					class="vendor-status d-flex align-items-center justify-content-center"
					:class="
						data.value == 'pending'
							? 'vendor-status--pending'
							: data.value == 'approved'
							? 'vendor-status--approved'
							: 'vendor-status--rejected'
					"
				>
					<p class="mb-0">
						{{
							data.value == "pending"
								? "Chờ duyệt"
								: data.value == "approved"
								? "Đã duyệt"
								: "Đã từ chối"
						}}
					</p>
				</div>
			</template>
			<template #cell(action)="data">
				<div class="d-flex align-items-center gap-16px">
					<b-button
						variant="success"
						size="sm"
						class="mr-2"
						@click="approveBooking(data.item._id)"
						:disabled="data.item.status !== 'pending'"
					>
						Duyệt
					</b-button>
					<b-button
						variant="danger"
						size="sm"
						@click="rejectBooking(data.item._id)"
						:disabled="data.item.status !== 'pending'"
					>
						Hủy
					</b-button>
				</div>
			</template>
		</b-table>
	</div>
</template>

<script>
	import axiosIns from "@/libs/axiosConfig";

	export default {
		data() {
			return {
				vendorListBooking: [],
				fields: [
					{
						key: "createdAt",
						label: "Ngày tạo",
						sortable: true,
						thClass: "text-left width-200px",
					},
					{
						key: "carName",
						label: "Tên xe",
						sortable: true,
					},
					{
						key: "startDate",
						label: "Ngày bắt đầu",
					},
					{
						key: "endDate",
						label: "Ngày kết thúc",
					},
					{
						key: "total",
						label: "Tổng tiền",
						sortable: true,
					},
					{
						key: "status",
						label: "Trạng thái",
						sortable: true,
					},
					{
						key: "action",
						label: "Hành động",
					},
				],
			};
		},
		mounted() {
			let role = localStorage.getItem("role");

			let ownerId = localStorage.getItem("user_id");
			if (role == "admin") {
				axiosIns
					.get("/booking/admin")
					.then((res) => {
						this.vendorListBooking = res.data;
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				axiosIns
					.get(`/booking/vendor/` + ownerId)
					.then((res) => {
						this.vendorListBooking = res.data;
					})
					.catch((err) => {
						console.log(err);
					});
			}
		},
		methods: {
			approveBooking(id) {
				axiosIns
					.post(`/booking/approve/` + id)
					.then((res) => {
						this.$router.go(0);
					})
					.catch((err) => {
						console.log(err);
					});
			},
			rejectBooking(id) {
				axiosIns
					.post(`/booking/reject/` + id)
					.then((res) => {
						this.$router.go(0);
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
	};
</script>

<style>
.vendorListBooking{
	padding: 38px 38px;
	height: 100vh;
}
	.vendor-status {
		padding: 5px 10px;
		border-radius: 5px;
		max-width: 100px;
		display: flex;
		align-items: center;
		height: 32px;
	}
	.vendor-status--pending {
		background-color: #f0ad4e;
		color: white;
	}
	.vendor-status--approved {
		background-color: #5cb85c;
		color: white;
	}
	.vendor-status--rejected {
		background-color: #d9534f;
		color: white;
	}
</style>