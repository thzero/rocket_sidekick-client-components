<script>
import { computed, ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRocketDetailItemComponent(props, context, detailItem, options) {
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
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsAreaDefaultId,
		measurementUnitsAreaType,
		measurementUnitsDensityDefaultId,
		measurementUnitsDensityType,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsFluidDefaultId,
		measurementUnitsFluidType,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		measurementUnitsVolumeDefaultId,
		measurementUnitsVolumeType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType
	} = useToolsMeasurementBaseComponent(props, context);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const detailItemAltimeters = ref(null);
	const detailItemCg = ref(null);
	const detailItemCgFrom = ref(null);
	const detailItemCgMeasurementUnitId = ref(null);
	const detailItemCgMeasurementUnitsId = ref(null);
	const detailItemCp = ref(null);
	const detailItemCpFrom = ref(null);
	const detailItemCpMeasurementUnitId = ref(null);
	const detailItemCpMeasurementUnitsId = ref(null);
	const detailItemDescription = ref(null);
	const detailItemLength = ref(null);
	const detailItemWeight = ref(null);
	const detailItemLengthMeasurementUnitId = ref(null);
	const detailItemLengthMeasurementUnitsId = ref(null);
	const detailItemName = ref(null);
	const detailItemRecovery = ref(false);
	const detailItemTrackers = ref(false);
	const detailItemWeightMeasurementUnitId = ref(null);
	const detailItemWeightMeasurementUnitsId = ref(null);
	const dialogAltimtersSearchManager = ref(new DialogSupport());
	const dialogRecoverySearchManager = ref(new DialogSupport());
	const dialogTrackersSearchManager = ref(new DialogSupport());

	const altimeters = computed(() => {
		return detailItemData.value ? detailItemData.value.altimeters : [];
	});
	const detailItemData = computed(() => {
		return detailItem.value ? detailItem.value.data : [];
	});
	const recovery = computed(() => {
		return detailItemData.value ? detailItemData.value.recovery : [];
	});
	const trackers = computed(() => {
		return detailItemData.value ? detailItemData.value.trackers : [];
	});

	const clickAltimetersSearch = async (selection) => {
		dialogAltimtersSearchManager.value.open();
	};
	const clickRecoverySearch = async (selection) => {
		dialogRecoverySearchManager.value.open();
	};
	const clickTrackersSearch = async (selection) => {
		dialogTrackersSearchManager.value.open();
	};

	const resetEditData = (correlationId, value) => {
		detailItemDescription.value = value ? value.description : null;
		detailItemName.value = value ? value.name : null;
		
		detailItemAltimeters.value = false;
		
		detailItemCg.value = value ? value.cg : null;
		detailItemCgFrom.value = value ? value.cgFrom : AppCommonConstants.Rocketry.Direction.Tip;
		detailItemCgMeasurementUnitId.value = value ? value.cgMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemCgMeasurementUnitsId.value = value ? value.cgMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemCp.value = value ? value.cp : null;
		detailItemCpFrom.value = value ? value.cpFrom : AppCommonConstants.Rocketry.Direction.Tip;
		detailItemCpMeasurementUnitId.value = value ? value.cpMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemCpMeasurementUnitsId.value = value ? value.cpMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemLength.value = value ? value.length : null;
		detailItemLengthMeasurementUnitId.value = value ? value.lengthMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemLengthMeasurementUnitsId.value = value ? value.lengthMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		detailItemRecovery.value = false;
		detailItemTrackers.value = false;

		detailItemWeight.value = value ? value.weight : null;
		detailItemWeightMeasurementUnitId.value = value ? value.weightMeasurementUnitId ?? measurementUnitsWeightDefaultId.value : measurementUnitsWeightDefaultId.value;
		detailItemWeightMeasurementUnitsId.value = value ? value.weightMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
	};
	const selectPart = async(correlationId, item, getF, setF) => {
		if (!item || !getF || !setF)
			return error('useRocketDetailItemComponent', 'selectPart', null, null, null, null, correlationId);

		const saveItem = { id: item.id, typeId: item.typeId };

		let parts = getF();
		parts =  parts ? parts : [];

		const temp = LibraryCommonUtility.updateArrayByObject(parts, saveItem);
		setF(temp);
			
		const response = await serviceStore.dispatcher.saveRocket(correlationIdI, detailItemData.value);
		logger.debug('rocketDetailItemComponent', 'selectPart', 'response', response, correlationIdI);
		return response;
	};
	const selectAltimter = async (item) => {
		try {
			return selectPart(correlationId(), item, () => detailItemData.value.altimters, (t) => { detailItemData.value.altimters = t; });
		}
		finally {
			dialogAltimtersSearchManager.value.ok();
		}
	};
	const selectRecovery = async (item) => {
		try {
			return selectPart(correlationId(), item, () => detailItemData.value.recovery, (t) => { detailItemData.value.recovery = t; });
			// const correlationIdI = correlationId();

			// if (!item)
			// 	return;

			// const saveItem = { id: item.id, typeId: item.typeId };

			// detailItemData.value.recovery = detailItemData.value.recovery ? detailItemData.value.recovery : [];

			// detailItemData.value.recovery = LibraryCommonUtility.updateArrayByObject(detailItemData.value.recovery, saveItem);
				
			// const response = await serviceStore.dispatcher.saveRocket(correlationIdI, detailItemData.value);
			// logger.debug('rocketDetailItemComponent', 'selectRecovery', 'response', response, correlationIdI);
			// return response;
		}
		finally {
			dialogRecoverySearchManager.value.ok();
		}
	};
	const selectTracker = async (item) => {
		try {
			return selectPart(correlationId(), item, () => detailItemData.value.trackers, (t) => { detailItemData.value.trackers = t; });
			// const correlationIdI = correlationId();

			// if (!item)
			// 	return;

			// const saveItem = { id: item.id, typeId: item.typeId };

			// detailItemData.value.trackers = detailItemData.value.recovery ? detailItemData.value.trackers : [];

			// detailItemData.value.trackers = LibraryCommonUtility.updateArrayByObject(detailItemData.value.trackers, saveItem);
				
			// const response = await serviceStore.dispatcher.saveRocket(correlationIdI, detailItemData.value);
			// logger.debug('rocketDetailItemComponent', 'selectTracker', 'response', response, correlationIdI);
			// return response;
		}
		finally {
			dialogTrackersSearchManager.value.ok();
		}
	};
	const setEditData = (correlationId, value) => {
		value.description = String.trim(detailItemDescription.value);
		value.name = String.trim(detailItemName.value);

		value.cg = AppUtility.convertNumber(detailItemCg.value);
		value.cgFrom = detailItemCgFrom.value;
		value.cgMeasurementUnitId = detailItemCgMeasurementUnitId.value;
		value.cgMeasurementUnitsId = detailItemCgMeasurementUnitsId.value;

		value.cp = AppUtility.convertNumber(detailItemCp.value);
		value.cpFrom = detailItemCpFrom.value;
		value.cpMeasurementUnitId = detailItemCpMeasurementUnitId.value;
		value.cpMeasurementUnitsId = detailItemCpMeasurementUnitsId.value;

		value.length = AppUtility.convertNumber(detailItemLength.value);
		value.lengthMeasurementUnitId = detailItemLengthMeasurementUnitId.value;
		value.lengthMeasurementUnitsId = detailItemLengthMeasurementUnitsId.value;
		
		value.weight = AppUtility.convertNumber(detailItemWeight.value);
		value.weightMeasurementUnitId = detailItemWeightMeasurementUnitId.value;
		value.weightMeasurementUnitsId = detailItemWeightMeasurementUnitsId.value;
	};
	
	return {
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
	};
};
</script>
