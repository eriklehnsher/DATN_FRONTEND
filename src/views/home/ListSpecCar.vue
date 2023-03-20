<template>
	<div class="carspec container mt-80px">
		
		<div  class="d-flex justify-content-between gap-16px ">
			<div v-for="(car, key) in listCar" :key="key" style="background-color: white; max-width: 300px" class="border"
				@click="goToDetail(car._id)">
				<img :src="car.images[0].src" alt="" class="new-list__img p-12px" />
				<div class="border-top p-12px">
					<p class="text-18-20-700">
						{{ car.name }}
					</p>
					<p style="background-color: rgba(0,161,80,.8);; width:20%; border-radius: 2px; text-align: center; font-weight:700 " >{{ car.price }}K</p>
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
		<h1 style="color: #6e6e6e;"
			class="d-flex homepage__tutorials--title d-flex  mb-10px d-flex align-items-center justify-content-between">

			<u class="d-flex flex-end" @click="goToAllCar()">Tất cả xe </u>
		</h1>
	</div>
</template>
<script> 
import axiosIns from "@/libs/axiosConfig";
export default {
	components: {},
	data() {
		return {
			listCar: [],
		};
	},
	mounted() {
		axiosIns
			.get("/car/list-new")
			.then((response) => {
				this.listCar = response.data;
				console.log(this.listCar);
			})
			.catch(() => {
				console.log("error");
			});
	},
	methods: {
		goToDetail(id) {
			this.$router.push(`/car/${id}`)
		},
		goToAllCar() {
			this.$router.push(`/allCars`)
		}
	}
};
</script>
<style lang="scss" scoped>
.carousel-3d-container {
	background-color: white;

	.carousel-3d-slide {
		background-color: white;
		height: 330px;
		padding: 5px;
	}
}

.next {
	font-size: 40px;

	span {
		font-size: 40px;
	}
}

.img {
	width: 100%;
	height: 200px;
}



.carspec--car {
	.carspec__price {
		color: white;
		background-color: rgb(29, 158, 29);
		border-radius: 2px;
		font-size: 15px;
		font-weight: 800;
		text-align: center;
		width: 30%;
		position: relative;
		bottom: 24px;
		left: 202px;
	}

	.carspec__name {
		margin-left: 5px;
	}

	.carspec__loca {
		color: #584e4e;
		font-size: 0.8rem;
		font-weight: 700;
		margin: 0px 0px 5px;
	}

	.carspec__engines {
		color: #6e6e6e;
		background-color: #e8eaef;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 700;
		text-align: center;
		width: 45%;
		margin: 5px 6px 5px 0px;
	}

	p {
		margin-bottom: 0px;
	}
}

i {
	margin-top: 3px;
	line-height: 1;
	margin-right: 3px;
	margin-left: 0px;
}

.listcar__input--button {
	width: 100%;
}

.new-list__img {
	width: 100%;
	height: 200px;
}
</style>