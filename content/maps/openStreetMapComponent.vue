<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

import { useMapComponent } from '@/components/content/maps/mapComponent';

export function useOpenStreetMapComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success
	} = useBaseComponent(props, context, options);
	
	const {
		center,
		mapInstsance,
		zoom,
		zoomMax,
		mapContainerName,
		polygons,
		setCircle,
		setView
	} = useMapComponent(props, context, {
		initialize: (correlationId) => {
		mapInstsance.value = L.map(mapContainerName()).setView(props.coordsLaunch, zoom.value);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: zoomMax.value,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(mapInstsance.value);
		},
		setCircle: (correlationId, id, coords, style) => {
			polygons.value[id] = L.circle(coords, style).addTo(mapInstsance.value);
		},
		setView: (correlationId, coords) => {
			mapInstsance.value.setView(coords, 13);
		}
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
