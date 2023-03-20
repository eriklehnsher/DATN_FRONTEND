import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "@/views/home/HomePage.vue";
import Tutorials from "@/views/tutorials/Tutorials.vue";
import UserInfo from "@/views/portfolio/user-info/UserInfo.vue";
import CarDetails from "@/views/car/CarDetails";
import VendorLandingPage from "@/views/vendor/VendorLandingPage";


const routes = [
  // HomePage
  { path: "/", name: "Home", component: HomePage },
  { path: "/tutorials", name: "Tutorials", component: Tutorials },
  { path: "/car/:car_id", name: "CarDetails", component: CarDetails, },
  { path: "/vendor", name: "VendorLandingPage", component: VendorLandingPage, },
  {
    path: "/allCars", name: "AllCars", component: () => import("@/views/car/AllCars.vue")
  },


  //Admin page
  { path: "/portfolio/user-info", name: "UserInfo", component: UserInfo },
  { path: "/portfolio/list-users", name: "ListUser", component: () => import("@/views/portfolio/list-user/ListUsers.vue") },
  { path: "/portfolio/list-vendors", name: "ListVendor", component: () => import("@/views/portfolio/list-user/ListVendors.vue") },
  { path: "/portfolio/list-cars", name: "ListCar", component: () => import("@/views/portfolio/list-car/ListCars.vue") },
  { path: "/portfolio/user-list-booking", name: "UserListBooking", component: () => import("@/views/portfolio/list-booking/UserListBooking.vue") },
  { path: "/portfolio/vendor-list-booking", name: "VendorListBooking", component: () => import("@/views/portfolio/list-booking/VendorListBooking.vue") },

  //Auth
  { path: "/login", name: "Login", component: () => import("@/views/auth/Login.vue") },
  { path: "/register", name: "Register", component: () => import("@/views/auth/Register.vue") },


];

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes
});
export default router;
