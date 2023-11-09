<script>
import { onMounted } from 'vue';

import { useOpenStreetMapComponent } from '@/components/content/maps/openStreetMapComponent';

export function useLocationMapComponent(props, context, options) {
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
		polygons,
		setCircle,
		setView
	} = useOpenStreetMapComponent(props, context, options);
	
	onMounted(async () => {
		setCircle(correlationId(), 'launch', props.coordsLaunch, {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5,
			radius: 500
		});
		setCircle(correlationId(), 'recovery', props.coordsRecovery, {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5,
			radius: 500
		});
	});

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
		polygons,
		setCircle,
		setView
	};
};
</script>
