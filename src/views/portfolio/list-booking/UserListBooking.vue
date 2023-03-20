<template>
	<div class="listBookingCar">
		<h1 class="py-24px">Danh sách chuyến xe</h1>
		<b-table
			responsive
			striped
			hover
			class="list__user--table"
			:fields="fields"
			:items="userListBooking"
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
		</b-table>
	</div>
</template>

<script>
	import axiosIns from "@/libs/axiosConfig";

	export default {
		data() {
			return {
				userListBooking: [],
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
					},
					{
						key: "ownerUsername",
						label: "Tên chủ xe",
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
					},
					{
						key: "status",
						label: "Trạng thái",
					},
				],
			};
		},
		mounted() {
			let user_id = localStorage.getItem("user_id");
			axiosIns
				.get(`/booking/user/` + user_id)
				.then((res) => {
					this.userListBooking = res.data;
				})
				.catch((err) => {
					console.log(err);
				});
		},
	};
</script>

<style>
.listBookingCar {
	height: 100vh;
	padding: 38px 38px;
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