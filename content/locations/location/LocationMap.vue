<template>
	<div :id="mapContainerName()"
		style="height: 250px; width: 500px;"
	></div>
</template>

<script>
import { useLocationMapComponent } from '@/components/content/locations/location/locationMapComponent';
import { useMapComponentProps } from '@/components/content/maps/mapComponentProps';
import { useLocationMapComponentProps } from '@/components/content/locations/location/locationMapComponentProps';

export default {
	name: 'LocationMapControl',
	props: {
		...useMapComponentProps,
		...useLocationMapComponentProps
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
			zoom,
			zoomMax,
			mapContainerName,
			markers,
			polygons,
			tooltips,
			setCircle,
			setMarker,
			setTooltip,
			setView
		} = useLocationMapComponent(props, context, options);

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
			zoom,
			zoomMax,
			mapContainerName,
			markers,
			polygons,
			tooltips,
			setCircle,
			setMarker,
			setTooltip,
			setView
		};
	}
};
</script>

<style scoped>
</style>
