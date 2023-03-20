<template>
	<div class="register">
		<p class="register-title text-center m-4">Đăng kí tài khoản</p>
		<div class="d-flex align-items-center justify-content-center">
			<div>
				<div>
					<div class="register__form">
						<b-form-group>
							<label class="d-flex align-items-center">
								<i class="fa-solid fa-envelope"></i>
								<p class="mb-0">Email</p>
							</label>
							<b-form-input class="register__form--title-input" type="email" placeholder="Nhập địa chỉ Email" required
								v-model="formRegister.email"></b-form-input>
							<span v-if="
								(!$v.formRegister.email.required ||
									!$v.formRegister.email.email) &&
								$v.formRegister.email.$dirty
							" class="text-danger">
								Hãy nhập chính xác Email!
							</span>
						</b-form-group>
						<b-form-group>
							<label class="d-flex align-items-center">
								<i class="fa-solid fa-user"></i>
								<p class="mb-0">Tên tài khoản</p>
							</label>
							<b-form-input class="register__form--title-input" type="text" placeholder="Nhập Tên tài khoản" required
								v-model="formRegister.username"></b-form-input>
							<span v-if="
								!$v.formRegister.username.required &&
								$v.formRegister.username.$dirty
							" class="text-danger">
								Hãy nhập tên hiển thị!</span>
						</b-form-group>
						<b-form-group>
							<label class="d-flex align-items-center">
								<i class="fa-solid fa-lock"></i>
								<p class="mb-0">Mật khẩu</p>
							</label>
							<div class="position-relative">
								<b-form-input class="register__form--title-input input-password" :type="showPassword ? 'text' : 'password'" placeholder="Nhập mật khẩu"
									required v-model="formRegister.password" ></b-form-input>
								<span @click="toggleShowPassword()" class="password__eye1">
									<i class="fas" :class="{
										'fa-eye-slash': showPassword,
										'fa-eye': !showPassword,
									}"></i>
								</span>
							</div>

							<span v-if="
								!$v.formRegister.password.required &&
								$v.formRegister.password.$dirty
							" class="text-danger">
								Hãy nhập mật khẩu của bạn!</span>
							<span v-if="
								!$v.formRegister.password.minLength &&
								$v.formRegister.password.$dirty
							" class="text-danger">
								Mật khẩu phải có nhiều hơn
								{{ $v.formRegister.password.$params.minLength.min }}!
							</span>
						</b-form-group>
						<b-form-group>
							<label class="d-flex align-items-center">
								<i class="fa-solid fa-lock"></i>
								<p class="mb-0">Xác nhận mật khẩu</p>
							</label>
							<div class="position-relative">
								<b-form-input class="register__form--title-input input-password" :type="showConfirmPassword ? 'text' : 'password'"
									placeholder="Nhập lại mật khẩu" required v-model="confirmPassword"
									></b-form-input>
								<span @click="toggleShowConfirmPassword()" class="password__eye1">
									<i class="fas" :class="{
										'fa-eye-slash': showConfirmPassword,
										'fa-eye': !showConfirmPassword,
									}"></i>
								</span>
							</div>
							<span v-if="
								!$v.confirmPassword.passwordMatch && $v.confirmPassword.$dirty
							" class="text-danger">
								Mật khẩu không khớp!
							</span>
						</b-form-group>
					</div>

					<b-form-checkbox id="checkbox-1" v-model="isRegisterVendor" name="checkbox-1" class="text-16-24-700">
						Đăng ký trở thành chủ xe
					</b-form-checkbox>
					<div v-if="isRegisterVendor">
						<p>*Cung cấp thông tin để được phê duyệt:</p>
						<!-- KYC -->
						<div class="register__form">
							<b-form-group>
								<label> Họ và tên *</label>
								<b-form-input class="register__form--title-input" type="text" placeholder="Nhập họ và tên" required
									v-model="formRegister.fullName"></b-form-input>
							</b-form-group>
							<b-form-group>
								<label> Số điện thoại *</label>
								<b-form-input class="register__form--title-input" type="text" placeholder="Nhập số điện thoại" required
									v-model="formRegister.phone"></b-form-input>
							</b-form-group>
						</div>
						<b-form-group>
							<label> Địa chỉ *</label>
							<b-form-input class="register__form--title-input" type="text" placeholder="Nhập địa chỉ" required
								v-model="formRegister.address"></b-form-input>
						</b-form-group>

						<b-form-group>
							<div style="display: grid">
								<label> Căn cước công dân / Chứng minh thư *</label>
								<input ref="uploadImage" type="file" id="uploads__carImg" accept="image/*" multiple
									@change="processFiles($event)" />
							</div>
						</b-form-group>
					</div>
				</div>

				<div class="d-flex align-items-center justify-content-end">
					<p class="login-form__policy-text">
						Bạn đã có tài khoản?

						<span @click="goToLogin()" class="span-link">
							Đăng nhập ngay!
						</span>
					</p>
				</div>
				<div class="d-flex justify-content-center mt-48px mb-48px">
					<b-button class="register__button btn btn-success" size="md" @click="submitRegister()"> Đăng ký </b-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import axiosConfig from "../../libs/axiosConfig";
import axiosIns from "@/libs/axiosConfig";
import { AUTH_REQUEST } from "../../store/constants";
export default {
	data() {
		return {
			formRegister: {
				username: "",
				email: "",
				password: "",
				fullName: "",
				phone: "",
				address: "",
				vendorState: "none",
				imagesID: [],
			},
			confirmPassword: "",
			isRegisterVendor: false,
			list: [],
			enabled: true,
			url: process.env.VUE_APP_API_URL,
			showPassword: false,
			showConfirmPassword: false,
		};
	},
	validations: {
		formRegister: {
			email: {
				required,
				email,
			},
			username: {
				required,
			},
			password: {
				required,
				minLength: minLength(6),
			},
		},
		confirmPassword: {
			passwordMatch: function () {
				return this.confirmPassword === this.formRegister.password;
			},
		},
	},
	methods: {
		toggleShowPassword() {
			this.showPassword = !this.showPassword;
		},
		toggleShowConfirmPassword() {
			this.showConfirmPassword = !this.showConfirmPassword;
		},
		goToLogin() {
			this.$router.push("/login");
		},

		processFiles(event) {
			let files = event.target.files;
			let formData = new FormData();
			for (var i = 0; i < files.length; i++) {
				formData.append("files", files[i]);
			}
			axiosIns
				.post("/images/user", formData, {
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

		async submitRegister() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return false; // stop here if form is invalid
			} else {
				// alert("Form Valid");
			}

			this.formRegister.imagesID = this.list;
			if (this.isRegisterVendor) {
				this.formRegister.vendorState = "pending";
			}
			console.log(this.formRegister);
			await axiosConfig
				.post("/user/register", this.formRegister)
				.then((response) => {
					let dataLogin = {
						email: this.formRegister.email,
						password: this.formRegister.password,
					};
					console.log("dataLogin", dataLogin);
					this.$store
						.dispatch(AUTH_REQUEST, { data: dataLogin })
						.then((res) => {
							this.$emit("login", this.isLogin);
							localStorage.setItem("user_id", response.data._id);
							localStorage.setItem("username", response.data.username);
							localStorage.setItem("user_email", this.formRegister.email);
							window.location.replace("/");
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log("err:::::::", err);
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.register {
	height: 100vh;
}
.register-title {
	color: #141414;
	font-size: 1.5em;
	line-height: 1.5;
	font-weight: 700;
    font-weight: 700;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}





.span-link {
	font-size: 15px;
	font-weight: 700;
	color: #07b63b;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
}

.password__eye1 {
	position: absolute;
	top: 8px;
	right: 0px;
}

::v-deep .input-password {
	padding: 6px 32px 6px 12px !important;
}
</style>