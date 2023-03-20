<template>
	<div class="list__user">
		<div class="list__user--content">
			<h1 class="py-24px">Danh sách thành viên</h1>
			<b-table
				responsive
				striped
				hover
				class="list__user--table"
				:fields="fields"
				:items="listUser"
			>
				<template #cell(name)="user">
					<p class="text-capitalize">{{ user.item.username }}</p>
				</template>

				<template #cell(email)="user">
					<p>{{ user.item.email }}</p>
				</template>
			</b-table>
		</div>
	</div>
</template>

<script>
	import axiosIns from "@/libs/axiosConfig";

	export default {
		props: {
			update: {
				type: Object,
				default: null,
			},
		},

		data() {
			return {
				user: {},
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
				],
				listUser: [],
				listUserUpdate: {},
			};
		},
		methods: {
			newUserUpdate(element) {
				this.listUser.push(element.data);
			},
			DeleteUser(id) {
				axiosIns
					.delete(`/user/${id}`)
					.then((response) => {
						for (let i = 0; i < this.listUser.length; i++) {
							if (id === this.listUser[i]._id) {
								this.listUser.splice(i, 1);
							}
						}
					})
					.catch(() => {
						console.log("error");
					});
			},
			UpdateUser() {
				console.log("Update");
			},
			DetailUser(id) {
				this.$router.push(`/user/${id}`);
			},
		},
		mounted() {
			// Fetch all users
			axiosIns
				.get("/user/all")
				.then((response) => {
					this.listUser = response.data;
					console.log(this.listUser);
				})
				.catch(() => {
					console.log("error");
				});
		},
	};
</script>
<style lang="scss" scoped>
	.list__user {
		padding: 38px 38px;
		.list__user--content {
			height: 100vh;
		}
	}

	.list__user--search {
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
	.list__user--table {
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
</style>