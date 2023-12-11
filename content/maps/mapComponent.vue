<script>
import { onMounted, ref } from 'vue';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useMapComponent(props, context, options) {
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

	const center = ref([42.0280554 ,-91.5975513]);
	const mapInstsance = ref(null);
	const markers = ref({});
	const polygons = ref({});
	const tooltips = ref({});
	const zoom = ref(13);
	const zoomMax = ref(19);

	const mapContainerName = () => {
		return 'mapContainer' + props.type + props.id;
	};
	const setCircle = (correlationId, id, coords, style) => {
		options.setCircle(correlationId, id, coords, style);
	};
	const setMarker = (correlationId, id, coords, style) => {
		options.setMarker(correlationId, id, coords, style);
	};
	const setTooltip = (correlationId, id, coords, content, style) => {
		options.setTooltip(correlationId, id, coords, content, style);
	};
	const setView = (correlationId, coords) => {
		options.setView(correlationId, id, coords, style);
	};

	onMounted(async () => {
		options.initialize(correlationId());
	});

	return {
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
