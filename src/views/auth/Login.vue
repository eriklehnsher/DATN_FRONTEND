<template>
	<div class="login">
		<p class="login-title text-center m-4">Đăng Nhập</p>
		<div class="d-flex align-items-center justify-content-center">
			<div>
				<b-form-group>
					<label class="d-flex align-items-center">
						<i class="fa-solid fa-envelope"></i>
						<p class="mb-0">Email</p>
					</label>
					<b-form-input class="login-form__input" type="email" placeholder="Nhập địa chỉ Email" required
						v-model="formLogin.email"></b-form-input>
					<span v-if="
						(!$v.formLogin.email.required || !$v.formLogin.email.email) &&
						$v.formLogin.email.$dirty
					" class=" text-danger">
						Hãy nhập chính xác Email!
					</span>
				</b-form-group>

				<b-form-group>
					<label class="d-flex align-items-center">
						<i class="fa-solid fa-lock"></i>
						<p class="mb-0">Mật khẩu</p>
					</label>
					<b-form-input :type="showPassword ? 'text' : 'password'" placeholder="Nhập mật khẩu" required
						v-model="formLogin.password" class="login-form__input input-password"></b-form-input>
					<span @click="toggleShowPassword()" class="password__eye">
						<i class="fas" :class="{
							'fa-eye-slash': showPassword,
							'fa-eye': !showPassword,
						}"></i>
					</span>
				</b-form-group>

				<p>
					Bạn chưa là thành viên?
					<span class="span-link" @click="goToRegister()">
						Hãy đăng ký ngay!
					</span>
				</p>
				<div class="d-flex align-items-center justify-content-center mb-48px">
					<b-button @click="submitLogin()" class="login-form__input--button btn">
						Đăng Nhập
					</b-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { AUTH_REQUEST } from "../../store/constants";
import axiosIns from "@/libs/axiosConfig";

export default {
	props: ["isLogin"],
	data() {
		return {
			formLogin: {
				email: "",
				password: "",
			},
			showPassword: false,
		};
	},
	validations: {
		formLogin: {
			email: {
				required,
				email,
			},
		},
	},
	methods: {
		toggleShowPassword() {
			this.showPassword = !this.showPassword;
		},
		goToRegister() {
			this.$router.push("/register");
		},
		async submitLogin() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return false; // stop here if form is invalid
			}

			const data = {
				email: this.formLogin.email,
				password: this.formLogin.password,
			};

			this.$store
				.dispatch(AUTH_REQUEST, { data: data })
				.then((res) => {
					axiosIns
						.get(`/user/email/${this.formLogin.email}`)
						.then((response) => {
							localStorage.setItem("user_id", response.data._id);
							localStorage.setItem("username", response.data.username);
							localStorage.setItem("user_email", this.formLogin.email);
							window.location.replace("/");
						})
						.catch((error) => {
							console.log("Error", error);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
};
</script>

<style lang="scss">
.login {
	height: 100vh;
}
.login-title {
	color: #141414;
	font-size: 1.5em;
	line-height: 1.5;
	font-weight: 700;
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

.password__eye {
	position: relative;
	left: 230px;
	bottom: 30px;
}
</style>