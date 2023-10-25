<template>
	<div :id="mapContainerName()"
		style="min-height: 500px; min-width: 500px;"
	></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { onMounted, ref} from 'vue';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export default {
	name: 'LocationMapControl',
	props: {
		id: {
			type: String,
			value: null
		},
		type: {
			type: String,
			value: null
		}
	},
	setup(props, context) {
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
		} = useBaseComponent(props, context);

		const center = ref([51.505, -0.09]);
		const zoom = ref(13);
		const zoomMax = ref(19);
		const mapInstsance = ref(null);

		const mapContainerName = () => {
			return 'mapContainer' + props.type + props.id;
		};
		const setView = (coords) => {
			mapInstsance.value.setView(coords, 13);
		};

		const setupLeafletMap = () => {
			mapInstsance.value = L.map(mapContainerName()).setView(center.value, zoom.value);
			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: zoomMax.value,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(mapInstsance.value);
			// L.tileLayer(
			// 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
			// {
			// 	attribution:
			// 	'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
			// 	maxZoom: 18,
			// 	id: 'mapbox/streets-v11',
			// 	accessToken: 'XXX',
			// }
			// ).addTo(mapDiv);
			var circle = L.circle([51.508, -0.11], {
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 500
			}).addTo(mapInstsance.value);
		};

		onMounted(async () => {
			setupLeafletMap();
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
			zoom,
			zoomMax,
			mapContainerName,
			setView
		};
	}
};
</script>

<style scoped>
</style>
