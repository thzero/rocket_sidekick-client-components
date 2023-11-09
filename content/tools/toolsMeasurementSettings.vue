<script>
import { onMounted, ref } from 'vue';

import AppUtility from '@/utility/app';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useToolsMeasurementSettingsComponent(props, context, options) {
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
		serviceStore,
		sortByOrder,
		target
	} = useContentBaseComponent(props, context, options);

	const measurementUnitsIdOutput = ref(null);
	const measurementUnitsIdSettings = ref(null);

	onMounted(async () => {
		const settings = serviceStore.getters.user.getUserSettings();
		measurementUnitsIdOutput.value = AppUtility.measurementUnitsIdDefault(correlationId, settings);
		measurementUnitsIdSettings.value = AppUtility.measurementUnitsIdDefault(correlationId, settings);
	});

	return {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	};
};
</script>
