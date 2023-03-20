<template>
	<div id="app">
		<Header></Header>
		<router-view class="body__view" />
		<Footer></Footer>
	</div>
</template>

<script>
	import Footer from "./components/Footer.vue";
	import Header from "./components/Header.vue";

	export default {
		name: "App",
		components: {
			Header,
			Footer,
		},
	};
</script>

<style lang="scss">
	#app {

		height: auto;
	}
	.body__view {

		height: calc(100vh - 300vh);
	}
</style>
