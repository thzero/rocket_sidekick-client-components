<template>
	<v-row>
		<v-col cols="0" lg="1" xl="1"/>
		<v-col cols="12" lg="10" xl="10">
<slot></slot>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'ContentLayout',
};
</script>

<style scoped>
</style>
