<script>
import { computed } from 'vue';

import AppUtility from '@/utility/app';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function usePartsPanelComponent(props, context, options) {
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
		contentLoadSignal,
		serviceStore,
		sort,
		target
	} = useContentBaseComponent(props, context, options);

	const manufacturer = (item) => {
		const id = item ? item.manufacturerId ?? null : null;
		if (!id)
			return null;

		if (!manufacturers.value)
			return null;

		const temp = manufacturers.value.find(l => l.id === id);
		return temp ? temp.name : null;
	};
	const manufacturers = computed(() => {
		return props.manufacturers
	});
	const measurementUnitTranslateLength = (measurementUnitsId, measurementUnitId) => {
		return AppUtility.measurementUnitTranslateLength(correlationId(), measurementUnitsId, measurementUnitId);
	};
	const measurementUnitTranslateWeight = (measurementUnitsId, measurementUnitId) => {
		return AppUtility.measurementUnitTranslateWeight(correlationId(), measurementUnitsId, measurementUnitId);
	};

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
		contentLoadSignal,
		serviceStore,
		sort,
		target,
		manufacturer,
		measurementUnitTranslateLength,
		measurementUnitTranslateWeight
	};
};
</script>
