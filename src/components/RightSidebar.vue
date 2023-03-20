<template>
	<b-sidebar
		:visible="sidebar_visible"
		bg-variant="white"
		shadow
		right
		no-header
		style="width: 400px"
	>
		<template #default="{ hide }">
			<div class="w-100 text-center position-relative font-weight-bold h6 mb-0">
				<div class="position-absolute cursor-pointer" @click="hide">
					<font-awesome-icon :icon="['fal', 'times']" class="text-danger" />
				</div>
				{{ title }}
			</div>
		</template>
	
	</b-sidebar>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: "",
			},
		},
	};
</script>

<style>
</style>