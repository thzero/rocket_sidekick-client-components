<template>
	<div :id="mapContainerName()"
		style="height: 250px; width: 500px;"
	></div>
</template>

<script>
import { useLaunchMapComponent } from '@/components/content/launches/launch/launchMapComponent';
import { useMapComponentProps } from '@/components/content/maps/mapComponentProps';
import { useLaunchMapComponentProps } from '@/components/content/launches/launch/launchMapComponentProps';

export default {
	name: 'LaunchMapControl',
	props: {
		...useMapComponentProps,
		...useLaunchMapComponentProps
	},
	setup(props, context, options) {
		const {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			center,
			mapInstsance,
			mapContainerName
		} = useLaunchMapComponent(props, context, options);

		return {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			center,
			mapInstsance,
			mapContainerName
		};
	}
};
</script>

<style scoped>
</style>
