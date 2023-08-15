<script>
import { computed, ref } from 'vue';

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

	const detailItemI = ref({ data: props.detailItem });
	
	const {
		altimeters,
		detailItemData,
		hasAltimeters,
		hasRecovery,
		hasTrackers,
		recovery,
		trackers,
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
		dialogPartsDeleteManager,
		dialogPartsDeleteMessage,
		dialogAltimetersSearchManager,
		dialogRecoverySearchManager,
		dialogTrackersSearchManager,
		clickAltimeterDelete,
		clickAltimeterDeleteStage,
		clickRecoveryDelete,
		clickRecoveryDeleteStage,
		clickTrackerDelete,
		clickTrackerDeleteStage,
		clickAltimetersSearch,
		clickAltimetersSearchStage,
		clickRecoverySearch,
		clickRecoverySearchStage,
		clickTrackersSearch,
		clickTrackersSearchStage,
		dialogPartsDeleteCancel,
		dialogPartsDeleteOk,
		resetEditData,
		selectAltimeter,
		selectRecovery,
		selectTracker,
		setEditData
	} = useRocketDetailItemComponent(props, context, detailItemI, options);

	const displayItem = computed(() => {
		return props.detailItem ? props.detailItem : {};
	});

	const clickAltimeterDelete2 = async (item, stageId) => {
		context.emit('deleteAltimeter', item, stageId);
	};

	const clickRecoveryDeleteStage2 = async (item, stageId) => {
		context.emit('deleteRecovery', item, stageId);
	};

	const clickTrackerDeleteStage2 = async (item, stageId) => {
		context.emit('deleteTracker', item, stageId);
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
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		altimeters,
		detailItemData,
		hasAltimeters,
		hasRecovery,
		hasTrackers,
		recovery,
		trackers,
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
		dialogPartsDeleteManager,
		dialogPartsDeleteMessage,
		dialogAltimetersSearchManager,
		dialogRecoverySearchManager,
		dialogTrackersSearchManager,
		clickAltimeterDelete,
		clickAltimeterDeleteStage,
		clickRecoveryDelete,
		clickRecoveryDeleteStage,
		clickTrackerDelete,
		clickTrackerDeleteStage,
		clickAltimetersSearch,
		clickAltimetersSearchStage,
		clickRecoverySearch,
		clickRecoverySearchStage,
		clickTrackersSearch,
		clickTrackersSearchStage,
		dialogPartsDeleteCancel,
		dialogPartsDeleteOk,
		resetEditData,
		selectAltimeter,
		selectRecovery,
		selectTracker,
		setEditData,
		detailItemI,
		displayItem,
		clickAltimeterDelete2,
		clickRecoveryDeleteStage2,
		clickTrackerDeleteStage2
	};
};
</script>
