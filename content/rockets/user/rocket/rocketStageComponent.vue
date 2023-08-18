<script>
import { computed, onMounted, ref } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
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

	const dialogPartsDeleteId = ref(null);
	const dialogPartsDeleteType = ref(null);
	const dialogPartsDeleteManager = ref(new DialogSupport());
	const dialogPartsDeleteMessage = ref();
	const dialogPartsSearchStageId = ref(null);
	const dialogAltimetersSearchManager = ref(new DialogSupport());
	const dialogRecoverySearchManager = ref(new DialogSupport());
	const dialogTrackersSearchManager = ref(new DialogSupport());
	const manufacturers = ref(props.manufacturers);
	const panels = ref([]);

	const displayItem = computed(() => {
		return props.detailItem ? props.detailItem : {};
	});
	
	const altimeters = computed(() => {
		return props.detailItem ? props.detailItem.altimeters : [];
	});
	const detailItemData = computed(() => {
		return props.detailItem ? props.detailItem : {};
	});
	const hasAltimeters = computed(() => {
		const temp = altimeters.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const hasRecovery = computed(() => {
		const temp = recovery.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const hasTrackers = computed(() => {
		const temp = trackers.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const recovery = computed(() => {
		return props.detailItem ? props.detailItem.recovery : [];
	});
	const trackers = computed(() => {
		return props.detailItem ? props.detailItem.trackers : [];
	});

	const partsDeleteKeyAltimeters = 'altimeters';
	const partsDeleteKeyRecovery = 'recovery';
	const partsDeleteKeyTrackers = 'trackers';
	
	const clickAltimetersSearchStage = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogAltimetersSearchManager.value.open();
	};
	const clickRecoverySearchStage = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection.id;
		dialogRecoverySearchManager.value.open();
	};
	const clickTrackersSearchStage = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection.id;
		dialogTrackersSearchManager.value.open();
	};
	const dialogPartsDeleteCancel = async () => {
		dialogPartsDeleteManager.value.cancel();

		dialogPartsDeleteId.value = null;
		dialogPartsDeleteType.value = null;
	};
	const dialogPartsDeleteOk = async () => {
		try {
			dialogPartsDeleteManager.value.ok();

			const correlationIdI = correlationId();

			const partId = dialogPartsDeleteId.value;
			const type = dialogPartsDeleteType.value;
			if (String.isNullOrEmpty(type) || String.isNullOrEmpty(partId))
				return error('useRocketStageComponent', 'dialogPartsDeleteOk', 'Invalid item, type or partId.', null, null, null, correlationIdI);
			
			if (!props.updateStage)
				return error('useRocketStageComponent', 'dialogPartsDeleteOk', 'Invalid update parts function.', null, null, null, correlationIdI);

			const detailItemClone = LibraryCommonUtility.cloneDeep(props.detailItem);

			let parts = getParts(correlationIdI, detailItemClone, type);
			parts = parts ? parts : [];
			
			LibraryCommonUtility.deleteArrayById(parts, partId);
			setParts(correlationIdI, detailItemClone, parts, type);

			return await props.updateStage(correlationIdI, detailItemClone);
		}
		finally {
			dialogPartsDeleteId.value = null;
			dialogPartsDeleteType.value = null;
		}
	};
	const handleAltimeterDeleteStage = async (item, stageId) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsDeleteKeyAltimeters}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsDeleteKeyAltimeters;
		dialogPartsDeleteManager.value.open();
	};
	const handleRecoveryDeleteStage = async (ite, stageIdm) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsDeleteKeyRecovery}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsDeleteKeyRecovery;
		dialogPartsDeleteManager.value.open();
	};
	const handleTrackerDeleteStage = async (item, stageId) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsDeleteKeyTrackers}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsDeleteKeyTrackers;
		dialogPartsDeleteManager.value.open();
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
	const panelsLKey = (type) => {
		return detailItemData.value.id + '-stage-';
	};
	const panelsUpdated = async (value) => {
		 await serviceStore.dispatcher.setRocketsExpanded(correlationId(), { id: panelsLKey(), expanded: value });
	};
	const selectPart = async(correlationId, item, type, stageId) => {
		if (!item || String.isNullOrEmpty(type) || String.isNullOrEmpty(stageId))
			return error('useRocketStageComponent', 'selectPart', 'Invalid item, type or stageId.', null, null, null, correlationId);
		
		if (!props.updateStage)
			return error('useRocketStageComponent', 'selectPart', 'Invalid update parts function.', null, null, null, correlationId);

		const detailItemClone = LibraryCommonUtility.cloneDeep(props.detailItem);

		let parts = getParts(correlationId, detailItemClone, type);
		parts = parts ? parts : [];
		
		const saveItem = { id: LibraryCommonUtility.generateId(), itemId: item.id, typeId: item.typeId };
		const updatesParts = LibraryCommonUtility.updateArrayByObject(parts, saveItem);
		setParts(correlationId, detailItemClone, updatesParts, type);

		return await props.updateStage(correlationId, detailItemClone);
	};
	const selectAltimeter = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsDeleteKeyAltimeters,
				dialogPartsSearchStageId.value
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
				partsDeleteKeyRecovery,
				dialogPartsSearchStageId.value
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
				partsDeleteKeyTrackers,
				dialogPartsSearchIsStage.value
			);
		}
		finally {
			dialogTrackersSearchManager.value.ok();
		}
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

	onMounted(async () => {
		const temp3 = await serviceStore.getters.getRocketsExpanded();
		const temp4 = temp3[panelsLKey()];
		panels.value = temp4 ?? [ 
			partsDeleteKeyAltimeters,
			partsDeleteKeyRecovery,
			partsDeleteKeyTrackers
		];
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
		displayItem,
		altimeters,
		detailItemData,
		hasAltimeters,
		hasRecovery,
		hasTrackers,
		recovery,
		trackers,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		dialogPartsDeleteManager,
		dialogPartsDeleteMessage,
		dialogAltimetersSearchManager,
		dialogRecoverySearchManager,
		dialogTrackersSearchManager,
		manufacturers,
		panels,
		clickAltimetersSearchStage,
		clickRecoverySearchStage,
		clickTrackersSearchStage,
		dialogPartsDeleteCancel,
		dialogPartsDeleteOk,
		handleAltimeterDeleteStage,
		handleRecoveryDeleteStage,
		handleTrackerDeleteStage,
		panelsUpdated,
		selectAltimeter,
		selectRecovery,
		selectTracker
	};
};
</script>
