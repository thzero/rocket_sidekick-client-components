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
	const dialogPartsDeleteId = ref(null);
	const dialogPartsDeleteType = ref(null);
	const dialogPartsDeleteManager = ref(new DialogSupport());
	const dialogPartsDeleteMessage = ref();
	const dialogAltimetersSearchManager = ref(new DialogSupport());
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

	const partsDeleteKeyAltimeters = 'altimeters';
	const partsDeleteKeyRecovery = 'recovery';
	const partsDeleteKeyTrackers = 'trackers';

	const clickAltimeterDelete = async (item) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsDeleteKeyAltimeters}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsDeleteKeyAltimeters;
		dialogPartsDeleteManager.value.open();
	};
	const clickRecoveryDelete = async (item) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsDeleteKeyRecovery}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsDeleteKeyRecovery;
		dialogPartsDeleteManager.value.open();
	};
	const clickTrackerDelete = async (item) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsDeleteKeyTrackers}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsDeleteKeyTrackers;
		dialogPartsDeleteManager.value.open();
	};
	const clickAltimetersSearch = async (selection) => {
		dialogAltimetersSearchManager.value.open();
	};
	const clickRecoverySearch = async (selection) => {
		dialogRecoverySearchManager.value.open();
	};
	const clickTrackersSearch = async (selection) => {
		dialogTrackersSearchManager.value.open();
	};
	const dialogPartsDeleteCancel = async () => {
		dialogPartsDeleteManager.value.cancel();

		dialogPartsDeleteId.value = null;
		dialogPartsDeleteType.value = null;
	};
	const dialogPartsDeleteOk = async (item) => {
		try {
			dialogPartsDeleteManager.value.ok();

			const correlationIdI = correlationId();
			
			const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);
			let parts = getParts(correlationIdI, temp, dialogPartsDeleteType.value);
			if (!parts)
				return success(correlationIdI);
			
			LibraryCommonUtility.deleteArrayById(parts, dialogPartsDeleteId.value);
			setParts(correlationIdI, temp, parts, dialogPartsDeleteType.value);
				
			const response = await serviceStore.dispatcher.saveRocket(correlationIdI, temp);
			logger.debug('rocketDetailItemComponent', 'dialogPartsDeleteOk', 'response', response, correlationIdI);
			if (hasFailed(response))
				return response;
			
			parts = getParts(correlationIdI, response.results, dialogPartsDeleteType.value);
			setParts(correlationIdI, detailItemData.value, parts, dialogPartsDeleteType.value);
			return response;
		}
		finally {
			dialogPartsDeleteId.value = null;
			dialogPartsDeleteType.value = null;
		}
	};
	const getParts = (correlationId, item, type) => {
		if (type === partsDeleteKeyAltimeters)
			return item.altimeters;
		if (type === partsDeleteKeyRecovery)
			return item.recovery;
		if (type === partsDeleteKeyTrackers)
			return item.trackers;
		return null;
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
	const selectPart = async(correlationId, item, getF, saveF, setF, type) => {
		// if (!item || !getF || !saveF || !setF)
		// 	return error('useRocketDetailItemComponent', 'selectPart', null, null, null, null, correlationId);
		
		// const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);

		// let parts = getF(temp);
		// parts =  parts ? parts : [];
		
		// const saveItem = { id: LibraryCommonUtility.generateId(), itemId: item.id, typeId: item.typeId };
		// const tempParts = LibraryCommonUtility.updateArrayByObject(parts, saveItem);
		// saveF(temp, tempParts);
			
		// const response = await serviceStore.dispatcher.saveRocket(correlationId, temp);
		// logger.debug('rocketDetailItemComponent', 'selectPart', 'response', response, correlationId);
		// if (hasFailed(response))
		// 	return response;
		
		// setF(response.results);
		// return response;
		if (!item || !type)
			return error('useRocketDetailItemComponent', 'selectPart', null, null, null, null, correlationId);

		const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);

		let parts = getParts(correlationId, temp, type);
		parts =  parts ? parts : [];
		
		const saveItem = { id: LibraryCommonUtility.generateId(), itemId: item.id, typeId: item.typeId };
		const tempParts = LibraryCommonUtility.updateArrayByObject(parts, saveItem);
		setParts(correlationId, temp, tempParts, type);
			
		const response = await serviceStore.dispatcher.saveRocket(correlationId, temp);
		logger.debug('rocketDetailItemComponent', 'selectPart', 'response', response, correlationId);
		if (hasFailed(response))
			return response;
	
		parts = getParts(correlationId, response.results, type);
		setParts(correlationId, detailItemData.value, parts, type);
		return response;
	};
	const selectAltimeter = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				(value) => value.altimeters, 
				(value, items) => { value.altimeters = items; }, 
				(value) => { detailItemData.value.altimeters = value.altimeters; },
				partsDeleteKeyAltimeters
			);
		}
		finally {
			dialogAltimetersSearchManager.value.ok();
		}
	};
	const selectRecovery = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				(value) => value.recovery, 
				(value, items) => { value.recovery = items; }, 
				(value) => { detailItemData.value.recovery = value.recovery; },
				partsDeleteKeyRecovery
			);
		}
		finally {
			dialogRecoverySearchManager.value.ok();
		}
	};
	const selectTracker = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				(value) => value.trackers, 
				(value, items) => { value.trackers = items; }, 
				(value) => { detailItemData.value.trackers = value.trackers; },
				partsDeleteKeyTrackers
			);
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
	const setParts = (correlationId, item, parts, type) => {
		if (type === partsDeleteKeyAltimeters) {
			item.altimeters = parts;
			return;
		}
		if (type === partsDeleteKeyRecovery) {
			item.recovery = parts;
			return;
		}
		if (type === partsDeleteKeyTrackers) {
			item.trackers = parts;
			return;
		}
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
		dialogPartsDeleteManager,
		dialogPartsDeleteMessage,
		dialogAltimetersSearchManager,
		dialogRecoverySearchManager,
		dialogTrackersSearchManager,
		clickAltimeterDelete,
		clickRecoveryDelete,
		clickTrackerDelete,
		clickAltimetersSearch,
		clickRecoverySearch,
		clickTrackersSearch,
		dialogPartsDeleteCancel,
		dialogPartsDeleteOk,
		resetEditData,
		selectAltimeter,
		selectRecovery,
		selectTracker,
		setEditData
	};
};
</script>
