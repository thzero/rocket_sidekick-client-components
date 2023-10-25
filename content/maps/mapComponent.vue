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
	const polygons = ref({});
	const zoom = ref(13);
	const zoomMax = ref(19);

	const mapContainerName = () => {
		return 'mapContainer' + props.type + props.id;
	};
	const setCircle = (correlationId, id, coords, style) => {
		options.setCircle(correlationId, id, coords, style);
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
		polygons,
		setCircle,
		setView
	};
};
</script>
