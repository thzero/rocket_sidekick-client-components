<script>
import { computed, onMounted, ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRocketSetupStageComponent(props, context, options) {
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
		measurementUnitsWeightType,
		displayItemMeasurement,
		displayItemMeasurementLength,
		displayItemMeasurementWeight
	} = useToolsMeasurementBaseComponent(props, context);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const dialogPartsDeleteId = ref(null);
	const dialogPartsDeleteType = ref(null);
	const dialogPartsDeleteManager = ref(new DialogSupport());
	const dialogPartsDeleteMessage = ref();
	const dialogPartsEditAltimeterManager = ref(new DialogSupport());
	const dialogPartsEditChuteProtectorManager = ref(new DialogSupport());
	const dialogPartsEditChuteReleaseManager = ref(new DialogSupport());
	const dialogPartsEditDeploymentBagManager = ref(new DialogSupport());
	const dialogPartsEditMotorManager = ref(new DialogSupport());
	const dialogPartsEditMotorCaseManager = ref(new DialogSupport());
	const dialogPartsEditParachuteManager = ref(new DialogSupport());
	const dialogPartsEditStreamerManager = ref(new DialogSupport());
	const dialogPartsEditTrackerManager = ref(new DialogSupport());
	const dialogPartsSearchStageId = ref(null);
	const dialogPartsSearchAltimetersManager = ref(new DialogSupport());
	const dialogPartsSearchChuteProtectorsManager = ref(new DialogSupport());
	const dialogPartsSearchChuteReleasesManager = ref(new DialogSupport());
	const dialogPartsSearchDeploymentBagsManager = ref(new DialogSupport());
	const dialogPartsSearchMotorsManager = ref(new DialogSupport());
	const dialogPartsSearchMotorCasesManager = ref(new DialogSupport());
	const dialogPartsSearchParachutesManager = ref(new DialogSupport());
	const dialogPartsSearchStreamersManager = ref(new DialogSupport());
	const dialogPartsSearchTrackersManager = ref(new DialogSupport());
	const manufacturerTypeAltimeter = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.altimeter ]);
	const manufacturerTypeChuteProtector = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.chuteProtector ]);
	const manufacturerTypeChuteRelease = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.chuteRelease ]);
	const manufacturerTypeDeploymentBag = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.deploymentBag ]);
	const manufacturerTypeMotor = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.motor ]);
	const manufacturerTypeMotorCase = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.motorCase ]);
	const manufacturerTypeParachute = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.parachute ]);
	const manufacturerTypeStreamer = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.streamer ]);
	const manufacturerTypeTracker = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.tracker ]);
	const manufacturers = ref(props.manufacturers);
	const panels = ref([]);
	
	const altimeters = computed(() => {
		return props.detailItem ? props.detailItem.altimeters : [];
	});
	const chuteProtectors = computed(() => {
		return props.detailItem ? props.detailItem.chuteProtectors : [];
	});
	const chuteReleases = computed(() => {
		return props.detailItem ? props.detailItem.chuteReleases : [];
	});
	const cp = computed(() => {
		if (!props.detailItem)
			return null;
		if (!props.detailItem.stages)
			return null;
		
		const temp = props.detailItem.stages[stageNumber];
		return temp ? temp.cp : null;
	});
	const deploymentBags = computed(() => {
		return props.detailItem ? props.detailItem.deploymentBags : [];
	});
	const displayItem = computed(() => {
		return props.detailItem ? props.detailItem : {};
	});
	const displayItemCg = computed(() => {
		return displayItemMeasurementLength(correlationId(), displayItem.value, (value) => { return value.cg; }, (value) => { return value.cgMeasurementUnitsId; }, (value) => { return value.cgMeasurementUnitId; });
	});
	const displayItemWeight = computed(() => {
		return displayItemMeasurementWeight(correlationId(), displayItem.value, (value) => { return value.weight; }, (value) => { return value.weightMeasurementUnitsId; }, (value) => { return value.weightMeasurementUnitId; });
	});
	const hasAltimeters = computed(() => {
		const temp = altimeters.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const hasChuteProtectors = computed(() => {
		const temp = chuteProtectors.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const hasChuteReleases = computed(() => {
		const temp = chuteReleases.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const hasDeploymentBags = computed(() => {
		const temp = deploymentBags.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const hasParachutes = computed(() => {
		const temp = parachutes.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const hasStreamers = computed(() => {
		const temp = streamers.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const hasTrackers = computed(() => {
		const temp = trackers.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const motorDiameter = computed(() => {
		if (!props.detailItem)
			return null;
		if (!props.detailItem.stages)
			return null;
		
		const temp = props.detailItem.stages[stageNumber];
		return temp ? temp.motorDiameter : null;
	});
	const parachutes = computed(() => {
		return props.detailItem ? props.detailItem.parachutes : [];
	});
	const stageNumber = computed(() => {
		if (!props.detailItem)
			return null;
		
		return props.detailItem.number + 1;
	});
	const streamers = computed(() => {
		return props.detailItem ? props.detailItem.streamers : [];
	});
	const trackers = computed(() => {
		return props.detailItem ? props.detailItem.trackers : [];
	});

	const partsKeyAltimeters = 'altimeters';
	const partsKeyChuteProtectors = 'chuteProtectors';
	const partsKeyChuteReleases = 'chuteReleases';
	const partsKeyDeploymentBags = 'deploymentBags';
	const partsKeyParachutes = 'parachutes';
	const partsKeyStreamers = 'streamers';
	const partsKeyTrackers = 'trackers';
	
	const clickAltimetersSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogPartsSearchAltimetersManager.value.open();
	};
	const clickChuteProtectorsSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogPartsSearchChuteProtectorsManager.value.open();
	};
	const clickChuteReleasesSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogPartsSearchChuteReleasesManager.value.open();
	};
	const clickDeploymentBagsSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogPartsSearchDeploymentBagsManager.value.open();
	};
	const clickMotorsSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogPartsSearchMotorsManager.value.open();
	};
	const clickMotorCasesSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogPartsSearchMotorCasesManager.value.open();
	};
	const clickParachutesSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogPartsSearchParachutesManager.value.open();
	};
	const clickStreamersSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogPartsSearchStreamersManager.value.open();
	};
	const clickTrackersSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogPartsSearchTrackersManager.value.open();
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
				return error('useRocketSetupStageComponent', 'dialogPartsDeleteOk', 'Invalid item, type or partId.', null, null, null, correlationIdI);
			
			if (!props.updateStage)
				return error('useRocketSetupStageComponent', 'dialogPartsDeleteOk', 'Invalid update parts function.', null, null, null, correlationIdI);

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
	const handleAltimeterDelete = async (item) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyAltimeters}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsKeyAltimeters;
		dialogPartsDeleteManager.value.open();
	};
	const handleChuteProtectorDelete = async (ite) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyChuteProtectors}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsKeyChuteProtectors;
		dialogPartsDeleteManager.value.open();
	};
	const handleChuteReleaseDelete = async (ite) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyChuteReleases}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsKeyChuteReleases;
		dialogPartsDeleteManager.value.open();
	};
	const handleDeploymentBagDelete = async (ite) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyDeploymentBags}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsKeyDeploymentBags;
		dialogPartsDeleteManager.value.open();
	};
	const handleParachuteDelete = async (ite) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyParachutes}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsKeyParachutes;
		dialogPartsDeleteManager.value.open();
	};
	const handleStreamerDelete = async (ite) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyStreamers}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsKeyStreamers;
		dialogPartsDeleteManager.value.open();
	};
	const handleTrackerDelete = async (item) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyTrackers}.delepartsKeyAltimeterste_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsKeyTrackers;
		dialogPartsDeleteManager.value.open();
	};
	const handleAltimeterEdit = async (item) => {
		dialogPartsEditMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyAltimeters}.edit_confirm`);
		dialogPartsEditId.value = item.id;
		dialogPartsEditType.value = partsKeyAltimeters;
		dialogPartsEditManager.value.open();
	};
	const handleChuteProtectorEdit = async (ite) => {
		dialogPartsEditMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyChuteProtectors}.Edit_confirm`);
		dialogPartsEditId.value = item.id;
		dialogPartsEditType.value = partsKeyChuteProtectors;
		dialogPartsEditManager.value.open();
	};
	const handleChuteReleaseEdit = async (ite) => {
		dialogPartsEditMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyChuteReleases}.Edit_confirm`);
		dialogPartsEditId.value = item.id;
		dialogPartsEditType.value = partsKeyChuteReleases;
		dialogPartsEditManager.value.open();
	};
	const handleDeploymentBagEdit = async (ite) => {
		dialogPartsEditMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyDeploymentBags}.Edit_confirm`);
		dialogPartsEditId.value = item.id;
		dialogPartsEditType.value = partsKeyDeploymentBags;
		dialogPartsEditManager.value.open();
	};
	const handleParachuteEdit = async (ite) => {
		dialogPartsEditMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyParachutes}.Edit_confirm`);
		dialogPartsEditId.value = item.id;
		dialogPartsEditType.value = partsKeyParachutes;
		dialogPartsEditManager.value.open();
	};
	const handleStreamerEdit = async (ite) => {
		dialogPartsEditMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyStreamers}.Edit_confirm`);
		dialogPartsEditId.value = item.id;
		dialogPartsEditType.value = partsKeyStreamers;
		dialogPartsEditManager.value.open();
	};
	const handleTrackerEdit = async (item) => {
		dialogPartsEditMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyTrackers}.Edit_confirm`);
		dialogPartsEditId.value = item.id;
		dialogPartsEditType.value = partsKeyTrackers;
		dialogPartsEditManager.value.open();
	};
	const getParts = (correlationId, item, type) => {
		if (type === partsKeyAltimeters)
			return item.altimeters;
		if (type === partsKeyChuteProtectors)
			return item.chuteProtectors;
		if (type === partsKeyChuteReleases)
			return item.chuteReleases;
		if (type === partsKeyDeploymentBags)
			return item.deploymentBags;
		if (type === partsKeyParachutes)
			return item.parachutes;
		if (type === partsKeyStreamers)
			return item.streamers;
		if (type === partsKeyTrackers)
			return item.trackers;
		return null;
	};
	const panelsKey = (type) => {
		return displayItem.value.id + '-stage-';
	};
	const panelsUpdated = async (value) => {
		 await serviceStore.dispatcher.setRocketsExpanded(correlationId(), { id: panelsKey(), expanded: value });
	};
	const selectPart = async(correlationId, item, type, stageId) => {
		if (!item || String.isNullOrEmpty(type) || String.isNullOrEmpty(stageId))
			return error('useRocketSetupStageComponent', 'selectPart', 'Invalid item, type or stageId.', null, null, null, correlationId);
		
		if (!props.updateStage)
			return error('useRocketSetupStageComponent', 'selectPart', 'Invalid update parts function.', null, null, null, correlationId);

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
				partsKeyAltimeters,
				dialogPartsSearchStageId.value
			);
		}
		finally {
			dialogPartsSearchAltimetersManager.value.ok();
		}
	};
	const selectChuteProtectors = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsKeyChuteProtectors,
				dialogPartsSearchStageId.value
			);
		}
		finally {
			dialogPartsSearchChuteProtectorsManager.value.ok();
		}
	};
	const selectChuteReleases = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsKeyChuteReleases,
				dialogPartsSearchStageId.value
			);
		}
		finally {
			dialogPartsSearchChuteReleasesManager.value.ok();
		}
	};
	const selectDeploymentBags = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsKeyDeploymentBags,
				dialogPartsSearchStageId.value
			);
		}
		finally {
			dialogPartsSearchDeploymentBagsManager.value.ok();
		}
	};
	const selectParachutes = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsKeyParachutes,
				dialogPartsSearchStageId.value
			);
		}
		finally {
			dialogPartsSearchParachutesManager.value.ok();
		}
	};
	const selectStreamers = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsKeyStreamers,
				dialogPartsSearchStageId.value
			);
		}
		finally {
			dialogPartsSearchStreamersManager.value.ok();
		}
	};
	const selectTracker = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsKeyTrackers,
				dialogPartsSearchStageId.value
			);
		}
		finally {
			dialogPartsSearchTrackersManager.value.ok();
		}
	};
	const setParts = (correlationId, item, parts, type) => {
		if (type === partsKeyAltimeters) {
			item.altimeters = parts;
			return;
		}
		if (type === partsKeyChuteProtectors) {
			item.chuteProtectors = parts;
			return;
		}
		if (type === partsKeyChuteReleases) {
			item.chuteReleases = parts;
			return;
		}
		if (type === partsKeyDeploymentBags) {
			item.deploymentBags = parts;
			return;
		}
		if (type === partsKeyParachutes) {
			item.parachutes = parts;
			return;
		}
		if (type === partsKeyStreamers) {
			item.streamers = parts;
			return;
		}
		if (type === partsKeyTrackers) {
			item.trackers = parts;
			return;
		}
	};

	onMounted(async () => {
		const temp3 = await serviceStore.getters.getRocketsExpanded();
		const temp4 = temp3[panelsKey()];
		panels.value = temp4 ?? [ 
			partsKeyAltimeters,
			partsKeyChuteProtectors,
			partsKeyChuteReleases,
			partsKeyDeploymentBags,
			partsKeyParachutes,
			partsKeyStreamers,
			partsKeyTrackers
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
		altimeters,
		chuteProtectors,
		chuteReleases,
		cp,
		deploymentBags,
		displayItem,
		displayItemCg,
		displayItemWeight,
		hasAltimeters,
		hasChuteProtectors,
		hasChuteReleases,
		hasDeploymentBags,
		hasParachutes,
		hasStreamers,
		hasTrackers,
		parachutes,
		motorDiameter,
		stageNumber,
		streamers,
		trackers,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		dialogPartsDeleteManager,
		dialogPartsDeleteMessage,
		dialogPartsEditAltimeterManager,
		dialogPartsEditChuteProtectorManager,
		dialogPartsEditChuteReleaseManager,
		dialogPartsEditDeploymentBagManager,
		dialogPartsEditMotorManager,
		dialogPartsEditMotorCaseManager,
		dialogPartsEditParachuteManager,
		dialogPartsEditStreamerManager,
		dialogPartsEditTrackerManager,
		dialogPartsSearchAltimetersManager,
		dialogPartsSearchChuteProtectorsManager,
		dialogPartsSearchChuteReleasesManager,
		dialogPartsSearchDeploymentBagsManager,
		dialogPartsSearchMotorsManager,
		dialogPartsSearchMotorCasesManager,
		dialogPartsSearchParachutesManager,
		dialogPartsSearchStreamersManager,
		dialogPartsSearchTrackersManager,
		manufacturerTypeAltimeter,
		manufacturerTypeChuteProtector,
		manufacturerTypeChuteRelease,
		manufacturerTypeDeploymentBag,
		manufacturerTypeMotor,
		manufacturerTypeMotorCase,
		manufacturerTypeParachute,
		manufacturerTypeStreamer,
		manufacturerTypeTracker,
		manufacturers,
		panels,
		clickAltimetersSearch,
		clickChuteProtectorsSearch,
		clickChuteReleasesSearch,
		clickDeploymentBagsSearch,
		clickMotorsSearch,
		clickMotorCasesSearch,
		clickParachutesSearch,
		clickStreamersSearch,
		clickTrackersSearch,
		dialogPartsDeleteCancel,
		dialogPartsDeleteOk,
		handleAltimeterDelete,
		handleChuteProtectorDelete,
		handleChuteReleaseDelete,
		handleDeploymentBagDelete,
		handleParachuteDelete,
		handleStreamerDelete,
		handleTrackerDelete,
		handleAltimeterEdit,
		handleChuteProtectorEdit,
		handleChuteReleaseEdit,
		handleDeploymentBagEdit,
		handleParachuteEdit,
		handleStreamerEdit,
		handleTrackerEdit,
		panelsUpdated,
		selectAltimeter,
		selectChuteProtectors,
		selectChuteReleases,
		selectDeploymentBags,
		selectParachutes,
		selectStreamers,
		selectTracker
	};
};
</script>
