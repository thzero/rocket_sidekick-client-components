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
		markers,
		polygons,
		tooltips,
		setCircle,
		setMarker,
		setTooltip,
		setView
	} = useMapComponent(props, context, {
		initialize: (correlationId) => {
			let zoomI = zoom.value;
			if (options && options.zoom)
				zoomI = options.zoom;
			zoomI = zoomI ?? zoom.value;
			mapInstsance.value = L.map(mapContainerName()).setView(props.coordsLaunch, zoomI);
			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: zoomMax.value,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(mapInstsance.value);
		},
		setCircle: (correlationId, id, coords, style) => {
			polygons.value[id] = L.circle(coords, style).addTo(mapInstsance.value);
		},
		setMarker: (correlationId, id, coords, style) => {
			const marker = L.marker(coords, style).addTo(mapInstsance.value);
			if (style.hueRotate)
				marker.valueOf()._icon.style.filter = `hue-rotate(${style.hueRotate}deg)`;
			if (style.tooltip) {
				marker.bindTooltip(style.tooltip.content, {
   					permanent: style.tooltip.permanent ?? false
				}).openTooltip();
			}
			markers.value[id] = marker;
		},
		setTooltip: (correlationId, id, coords, content, style) => {
			// const tooltip = L.tooltip()
			// 	.setLatLng(coords)
			// 	.setContent(content)
			// 	.addTo(mapInstsance.value);
			const tooltip = L.tooltip(coords, 
					{
						content: content,
						offset: style && style.offset ? style.offset : [0,0]
					}
				)
				.addTo(mapInstsance.value);
			tooltips.value[id] = tooltip;
		},
		setView: (correlationId, coords, zoom) => {
			zoom = zoom ?? 13;
			mapInstsance.value.setView(coords, zoom);
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

<style>
img.huechange { filter: hue-rotate(120deg); }
</style>