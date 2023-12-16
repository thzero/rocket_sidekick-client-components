<script>
import { onMounted } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility';

import { useOpenStreetMapComponent } from '@/components/content/maps/openStreetMapComponent';

export function useLaunchMapComponent(props, context, options) {
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
	} = useOpenStreetMapComponent(props, context, { coords: props.coordsLaunch, zoom: 17 });
	
	onMounted(async () => {
		// setCircle(correlationId(), 'launch', props.coordsLaunch, {
		// 	color: 'red',
		// 	fillColor: '#f03',
		// 	fillOpacity: 0.5,
		// 	radius: 5
		// });
		// setCircle(correlationId(), 'recovery', props.coordsRecovery, {
		// 	color: 'red',
		// 	fillColor: '#f03',
		// 	fillOpacity: 0.5,
		// 	radius: 5
		// });
		setMarker(correlationId(), 'launch', props.coordsLaunch, {
			// hueRotate: '150', // red
			hueRotate: '175', // orange
			title: LibraryClientUtility.$trans.t('strings.content.launches.launch'),
			tooltip: {
				content: LibraryClientUtility.$trans.t('strings.content.launches.launch'),
				permanent: true
			}
		});
		setMarker(correlationId(), 'recovery', props.coordsRecovery, {
			hueRotate: '250', // green
			title: LibraryClientUtility.$trans.t('strings.content.launches.recovery'),
			tooltip: {
				content: LibraryClientUtility.$trans.t('strings.content.launches.recovery'),
				permanent: true
			}
		});	
		// setTooltip(correlationId(), 'recovery', props.coordsRecovery, 'recovery', { offset: [5,5]});
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
		mapContainerName
	};
};
</script>
