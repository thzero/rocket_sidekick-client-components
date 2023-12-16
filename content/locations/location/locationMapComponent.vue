<script>
import { onMounted } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility';

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
		markers,
		polygons,
		tooltips,
		setCircle,
		setMarker,
		setTooltip,
		setView
	} = useOpenStreetMapComponent(props, context, { coords: props.coords });
	
	onMounted(async () => {
		// setCircle(correlationId(), 'location', props.coords, {
		// 	color: 'red',
		// 	fillColor: '#f03',
		// 	fillOpacity: 0.5,
		// 	radius: 500
		// });
		setMarker(correlationId(), 'location', props.coords, {
			title: LibraryClientUtility.$trans.t('strings.content.locations.launchSite'),
			tooltip: {
				content: props.coords.join(', '),
				permanent: true
			}
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
		markers,
		polygons,
		tooltips,
		setCircle,
		setMarker,
		setTooltip,
		setView
	};
};
</script>
