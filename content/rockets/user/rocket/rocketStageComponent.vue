<script>
import { computed } from 'vue';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useRocketDetailItemComponent } from '@/components/content/rockets/user/rocket/rocketDetailItemComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRocketStageComponent(props, context, options) {
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
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);
	
	const {
		altimeters,
		detailItemAltimeters,
		detailItemCg,
		detailItemCgFrom,
		detailItemCgMeasurementUnitId,
		detailItemCgMeasurementUnitsId,
		detailItemCp,
		detailItemCpFrom,
		detailItemCpMeasurementUnitId,
		detailItemCpMeasurementUnitsId,
		detailItemDescription,
		detailItemLength,
		detailItemLengthMeasurementUnitId,
		detailItemLengthMeasurementUnitsId,
		detailItemName,
		detailItemRecovery,
		detailItemTrackers,
		detailItemWeight,
		detailItemWeightMeasurementUnitId,
		detailItemWeightMeasurementUnitsId,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		recovery,
		trackers,
		dialogAltimtersSearchManager,
		dialogRecoverySearchManager,
		dialogTrackersSearchManager,
		clickAltimetersSearch,
		clickRecoverySearch,
		clickTrackersSearch,
		resetEditData,
		selectAltimter,
		selectRecovery,
		selectTracker,
		setEditData
	} =  useRocketDetailItemComponent(props, context, options);

	const displayItem = computed(() => {
		return props.item ? props.item : {};
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
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		displayItem
	};
};
</script>
