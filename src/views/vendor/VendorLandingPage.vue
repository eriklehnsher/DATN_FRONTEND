<template>
	<div class="vendor__main">
		<!-- form đăng ký -->
		<div class="vendor__owner-reg d-flex align-items-center justify-content-around">
			<div class="vendor__owner-title">
				<h1 class="mb-20px">
					Cho thuê xe trên HaNoi-Car để gia tăng <br />
					nhập đến 10tr/tháng !
				</h1>
				<p class="mb-20px">
					Hotline: 1900 9217 (T2-T7 9AM-9PM) <br />
					Hoặc để lại tin nhắn cho HaNoi-Car qua Fanpage
				</p>
				<p class="mb-20px">
					HaNoi-Car không thu phí khi bạn đăng xe. Bạn chỉ chia sẻ phí dịch vụ với
					HaNoi-Car <br />khi có giao dịch cho thuê thành công.
				</p>
			</div>
			<div class="car__registerVendor">
				<router-link tag="a" to="/register" class="">
					<b-button class="buttonVendor" variant="success">
						<p>ĐĂNG KÝ NGAY</p>
					</b-button>
				</router-link>
			</div>
		</div>

		<!-- lý do nên đăng ký -->
		<div class="vendor__res-rent ml-200px mr-200px">
			<h1 class="">TẠI SAO BẠN NÊN CHO THUÊ XE TRÊN HaNoi-Car ?</h1>

			<carousel-3d :disable3d="true" :space="315" :clickable="true" :controls="true" :autoplay="false"
				:autoplay-timeout="3000" :height="250" :width="300">
				<slide :index="0">
					<img src="../../assets/jpg/owner-res/owner-reason-1.png" class="img" />
				</slide>
				<slide :index="1">
					<img src="../../assets/jpg/owner-res/owner-reason-2.png" class="img" />
				</slide>
				<slide :index="2">
					<img src="../../assets/jpg/owner-res/owner-reason-3.png" class="img" />
				</slide>
				<slide :index="3">
					<img src="../../assets/jpg/owner-res/owner-reason-4.png" class="img" />
				</slide>
				<slide :index="4">
					<img src="../../assets/jpg/owner-res/owner-reason-5.png" class="img" />
				</slide>
				<slide :index="5">
					<img src="../../assets/jpg/owner-res/owner-reason-6.png" class="img" />
				</slide>
			</carousel-3d>
		</div>

		<!-- huong dan dang ky -->
		<div class="vendor__reg-tuto ml-200px mr-200px">
			<h1>3 BƯỚC ĐĂNG KÍ CHO THUÊ XE TRÊN HaNoi-Car</h1>
			<div class="vendor__reg-tutoStep d-flex justify-content-around">
				<div class="step1 mr-10px d-flex flex-column align-items-center">
					<div class="step__img">
						<img src="../../assets/jpg/owner-tuto/step1.png" class="img" />
					</div>
					<div class="step__detail">
						<h4>Bước 1</h4>
						<p>
							Truy cập và website HaNoi-Car, vào mục Xe của <br />
							tôi và đăng kí xe theo hướng dẫn. <br />

						</p>
					</div>
				</div>
				<div class="step2 mr-20px ml-20px d-flex flex-column align-items-center">
					<div class="step__img">
						<img src="../../assets/jpg/owner-tuto/step1.png" class="img" />
					</div>
					<div class="step__detail">
						<h4>Bước 2</h4>
						<p>
							Nhân viên HaNoi-Car sẽ xem xét thông tin đăng ký của chủ xe<br />
							và sẽ duyệt trong vòng 1 ngày sau khi nhận được thông tin.
						</p>
					</div>
				</div>
				<div class="step1 d-flex flex-column align-items-center">
					<div class="step__img">
						<img src="../../assets/jpg/owner-tuto/step1.png" class="img" />
					</div>
					<div class="step__detail">
						<h4>Bước 3</h4>
						<p>
							Bắt đầu cho thuê xe trên HaNoi-Car sau khi nhận thông báo<br />
							xe đã được phê duyệt.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
	name: "HANOICARFrontendCarvendor",
	components: {
		Carousel3d,
		Slide,

	},
	data() {
		return {};
	},

	mounted() { },

	methods: {},
};
</script>