<template>
	<div class="list__Vendor">
		<div class="list__Vendor--content">
			<h1 class="py-24px">Danh sách chủ xe</h1>
			<b-table
				responsive
				hover
				class="list__Vendor--table"
				:fields="fields"
				:items="listVendor"
			>
				<template #cell(name)="vendor">
					<p class="text-capitalize">{{ vendor.item.username }}</p>
				</template>

				<template #cell(email)="vendor">
					<p>{{ vendor.item.email }}</p>
				</template>

				<template #cell(vendorState)="vendor">
					<div
						class="vendor-status d-flex align-items-center justify-content-center"
						:class="
							vendor.item.vendorState == 'pending'
								? 'vendor-status--pending'
								: vendor.item.vendorState == 'approved'
								? 'vendor-status--approved'
								: 'vendor-status--rejected'
						"
					>
						<p class="mb-0">
							{{
								vendor.item.vendorState == "pending"
									? "Chờ duyệt"
									: vendor.item.vendorState == "approved"
									? "Đã duyệt"
									: "Đã từ chối"
							}}
						</p>
					</div>
				</template>
				<template #cell(actions)="vendor">
					<b-button
						variant="outline-primary"
						@click="DetailVendor(vendor.item._id)"
					>
						Chi tiết
					</b-button>
				</template>
			</b-table>
			<b-sidebar
				:visible="showSideBar"
				backdrop-variant="dark"
				backdrop
				shadow
				right
				no-header
				no-footer
				no-close-on-backdrop
				style="width: 400px"
			>
				<div>
					<div
						class="border-bottom height-48px d-flex align-items-center text-20-27-700 px-16px"
					>
						<p class="mb-0">Thông tin chủ xe</p>
					</div>

					<div class="p-16px text-14-24-400">
						<div class="d-flex">
							<p class="width-100px mb-0">Họ và tên :</p>
							<span class="text-14-24-600 text-capitalize">
								{{ vendorDetail.username }}</span
							>
						</div>
						<div class="d-flex">
							<p class="width-100px mb-0">Email :</p>
							<span class="text-14-24-600"> {{ vendorDetail.email }}</span>
						</div>
						<div class="d-flex">
							<p class="width-100px mb-0">Số điện thoại :</p>
							<span class="text-14-24-600"> {{ vendorDetail.phone }}</span>
						</div>
						<div class="d-flex">
							<p class="width-100px mb-0">Địa chỉ :</p>
							<span class="text-14-24-600"> {{ vendorDetail.address }}</span>
						</div>
						<div class="d-flex">
							<p class="width-100px mb-0">Trạng thái :</p>
							<span class="text-14-24-600">
								{{
									vendorDetail.vendorState == "pending"
										? "Chờ duyệt"
										: vendorDetail.vendorState == "approved"
										? "Đã duyệt"
										: "Đã từ chối"
								}}
							</span>
						</div>

						<div>
							<p class="width-100px mb-0">CCCD/CMND:</p>
							<div
								v-for="(index, key) in vendorDetail.imagesID"
								:key="key"
								class="id-cards"
							>
								<img :src="index.src" alt="" class="id-card__img mb-16px" />
							</div>
						</div>
					</div>
				</div>

				<div
					class="d-flex align-items-center justify-content-end gap-16px px-16px"
				>
					<b-button variant="outline-primary" @click="showSideBar = false">
						Đóng
					</b-button>
					<b-button
						v-if="vendorDetail.vendorState == 'pending'"
						variant="success"
						@click="approveVendor(vendorDetail._id)"
					>
						Duyệt
					</b-button>

					<b-button
						v-if="vendorDetail.vendorState == 'pending'"
						variant="danger"
						@click="rejectVendor(vendorDetail._id)"
					>
						Từ chối
					</b-button>
				</div>
			</b-sidebar>
		</div>
	</div>
</template>

<script>
	import axiosIns from "@/libs/axiosConfig";

	export default {
		data() {
			return {
				vendorDetail: {},
				fields: [
					{
						key: "createdAt",
						label: "Ngày tạo",
						sortable: true,
						thClass: "text-left width-200px",
					},
					{
						key: "name",
						label: "Tên",
					},
					{
						key: "email",
						label: "Địa chỉ Email",
						sortable: true,
					},
					{
						key: "vendorState",
						label: "Trạng thái",
						sortable: true,
					},
					{ key: "actions", label: "Actions" },
				],
				listVendor: [],
				showSideBar: false,
			};
		},
		methods: {
			DetailVendor(id) {
				this.showSideBar = true;
				axiosIns
					.get(`/vendor/${id}`)
					.then((response) => {
						this.vendorDetail = response.data;
					})
					.catch(() => {
						console.log("error");
					});
			},
			approveVendor(id) {
				console.log(id);
				axiosIns.post(`/vendor/approve/${id}`).then((response) => {
					this.showSideBar = false;
					window.location.replace("/portfolio/list-vendors");
				});
			},
			rejectVendor(id) {
				console.log(id);
				axiosIns.post(`/vendor/reject/${id}`).then((response) => {
					this.showSideBar = false;
					window.location.replace("/portfolio/list-vendors");
				});
			},
		},
		mounted() {
			// Fetch all Vendors
			axiosIns
				.get("/vendor/all")
				.then((response) => {
					this.listVendor = response.data;
					console.log(this.listVendor);
				})
				.catch(() => {
					console.log("error");
				});
		},
	};
</script>
<style lang="scss" scoped>
	.list__Vendor {
		padding: 38px 38px;
		height: 100vh;
		.list__Vendor--content {
			
		}
	}

	.list__Vendor--search {
		margin-bottom: 20px;
		border: 2px solid grey;
	}

	.fa-solid.fa-magnifying-glass {
		font-size: 20px;
	}

	.search--input {
		width: 50%;
		margin-bottom: 20px;
		border: 0px;
		border-bottom: 2px solid grey;
		border-radius: 0px;
	}
	.list__Vendor--table {
		display: flex;
		justify-content: space-around;
	}
	tr {
		display: flex;
		justify-content: space-around;
	}
	.table {
		--bs-table-striped-bg: none;
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

	.id-cards {
		display: grid;
		gap: 24px;
	}
	.id-card__img {
		width: 100%;
		height: auto;
		outline: 1px dashed #ccc;
	}
</style>