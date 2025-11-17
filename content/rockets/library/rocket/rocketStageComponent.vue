<script>
import { computed, onMounted, ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useMotorUtilityComponent } from '@/components/external/motorUtilityComponent';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementUtilityComponent';
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
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		displayItemMeasurementLength,
		displayItemMeasurementWeight
	} = useToolsMeasurementUtilityComponent(props, context);

	const {
		motorMountDiameters,
		motorMountDiameter,
		motorMountName
	} = useMotorUtilityComponent(props, context);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const dialogPartsDeleteId = ref(null);
	const dialogPartsDeleteType = ref(null);
	const dialogPartsDeleteManager = ref(new DialogSupport());
	const dialogPartsDeleteMessage = ref();
	const dialogPartsSearchStageId = ref(null);
	const dialogAltimetersSearchManager = ref(new DialogSupport());
	const dialogChuteProtectorsSearchManager = ref(new DialogSupport());
	const dialogChuteReleasesSearchManager = ref(new DialogSupport());
	const dialogDeploymentBagsSearchManager = ref(new DialogSupport());
	const dialogParachutesSearchManager = ref(new DialogSupport());
	const dialogStreamersSearchManager = ref(new DialogSupport());
	const dialogTrackersSearchManager = ref(new DialogSupport());
	const manufacturerTypeAltimeter = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.altimeter ]);
	const manufacturerTypeChuteProtector = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.chuteProtector ]);
	const manufacturerTypeChuteRelease = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.chuteRelease ]);
	const manufacturerTypeChuteDeploymentBag = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.deploymentBag ]);
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
	const deploymentBags = computed(() => {
		return props.detailItem ? props.detailItem.deploymentBags : [];
	});
	const displayItem = computed(() => {
		return props.detailItem ? props.detailItem : {};
	});
	const displayItemCp = computed(() => {
		return displayItemMeasurementLength(correlationId(), displayItem.value, (value) => { return value.cp; }, (value) => { return value.cpMeasurementUnitsId; }, (value) => { return value.cpMeasurementUnitId; });
	});
	const displayItemDiameterMajor = computed(() => {
		return displayItemMeasurementLength(correlationId(), displayItem.value, (value) => { return value.diameterMajor; }, (value) => { return value.diameterMajorMeasurementUnitsId; }, (value) => { return value.diameterMajorMeasurementUnitId; });
	});
	const displayItemDiameterMinor = computed(() => {
		return displayItemMeasurementLength(correlationId(), displayItem.value, (value) => { return value.diameterMinor; }, (value) => { return value.diameterMinorMeasurementUnitsId; }, (value) => { return value.diameterMinorMeasurementUnitId; });
	});
	const displayItemEjectionDrogue = computed(() => {
		return displayItemMeasurementWeight(correlationId(), displayItem.value, (value) => { return value.ejection ? value.ejection.drogue : ''; }, (value) => { return value.ejection ? value.ejection.drogueMeasurementUnitsId : ''; }, (value) => { return value.ejection ? value.ejection.drogueMeasurementUnitId : ''; });
	});
	const displayItemEjectionDrogueBackup = computed(() => {
		return displayItemMeasurementWeight(correlationId(), displayItem.value, (value) => { return value.ejection ? value.ejection.drogueBackup : ''; }, (value) => { return value.ejection ? value.ejection.drogueBackupMeasurementUnitsId : ''; }, (value) => { return value.ejection ? value.ejection.drogueBackupMeasurementUnitId : ''; });
	});
	const displayItemEjectionMain = computed(() => {
		return displayItemMeasurementWeight(correlationId(), displayItem.value, (value) => { return value.ejection ? value.ejection.main : ''; }, (value) => { return value.ejection ? value.ejection.mainMeasurementUnitsId : ''; }, (value) => { return value.ejection ? value.ejection.mainMeasurementUnitId : ''; });
	});
	const displayItemEjectionMainBackup = computed(() => {
		return displayItemMeasurementWeight(correlationId(), displayItem.value, (value) => { return value.ejection ? value.ejection.mainBackup : ''; }, (value) => { return value.ejection ? value.ejection.mainBackupMeasurementUnitsId : ''; }, (value) => { return value.ejection ? value.ejection.mainBackupMeasurementUnitId : ''; });
	});
	const displayItemLength = computed(() => {
		return displayItemMeasurementLength(correlationId(), displayItem.value, (value) => { return value.length; },  (value) => { return value.lengthMeasurementUnitsId; }, (value) => { return value.lengthMeasurementUnitId; });
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
	const parachutes = computed(() => {
		return props.detailItem ? props.detailItem.parachutes : [];
	});
	const stageIndex = computed(() => {
		return props.detailItem ? (props.detailItem.index + 1) : null;
	});
	const streamers = computed(() => {
		return props.detailItem ? props.detailItem.streamers : [];
	});
	const trackers = computed(() => {
		return props.detailItem ? props.detailItem.trackers : [];
	});

	const partsDeleteKeyAltimeters = 'altimeters';
	const partsDeleteKeyChuteProtectors = 'chuteProtectors';
	const partsDeleteKeyChuteReleases = 'chuteReleases';
	const partsDeleteKeyDeploymentBags = 'deploymentBags';
	const partsDeleteKeyParachutes = 'parachutes';
	const partsDeleteKeyStreamers = 'streamers';
	const partsDeleteKeyTrackers = 'trackers';
	
	const clickAltimetersSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogAltimetersSearchManager.value.open();
	};
	const clickChuteProtectorsSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogChuteProtectorsSearchManager.value.open();
	};
	const clickChuteReleasesSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogChuteReleasesSearchManager.value.open();
	};
	const clickDeploymentBagsSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogDeploymentBagsSearchManager.value.open();
	};
	const clickParachutesSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogParachutesSearchManager.value.open();
	};
	const clickStreamersSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
		dialogStreamersSearchManager.value.open();
	};
	const clickTrackersSearch = async (selection) => {
		if (!selection)
			return;

		dialogPartsSearchStageId.value = selection;
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
	const handleAltimeterDelete = async (item) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsDeleteKeyAltimeters}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsDeleteKeyAltimeters;
		dialogPartsDeleteManager.value.open();
	};
	const handleChuteProtectorsDelete = async (ite) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsDeleteKeyChuteProtectors}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsDeleteKeyChuteProtectors;
		dialogPartsDeleteManager.value.open();
	};
	const handleChuteReleasesDelete = async (ite) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsDeleteKeyChuteReleases}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsDeleteKeyChuteReleases;
		dialogPartsDeleteManager.value.open();
	};
	const handleDeploymentBagsDelete = async (ite) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsDeleteKeyDeploymentBags}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsDeleteKeyDeploymentBags;
		dialogPartsDeleteManager.value.open();
	};
	const handleParachutesDelete = async (ite) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsDeleteKeyParachutes}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsDeleteKeyParachutes;
		dialogPartsDeleteManager.value.open();
	};
	const handleStreamersDelete = async (ite) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsDeleteKeyStreamers}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsDeleteKeyStreamers;
		dialogPartsDeleteManager.value.open();
	};
	const handleTrackerDelete = async (item) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsDeleteKeyTrackers}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsDeleteKeyTrackers;
		dialogPartsDeleteManager.value.open();
	};
	const hasMotor = (index) => {
		if (!displayItem.value || !displayItem.value.motors)
			return false;
		const temp = displayItem.value.motors.find(l => l.index === index);
		return temp && (temp.count > 0);
	};
	const getParts = (correlationId, item, type) => {
		if (type === partsDeleteKeyAltimeters)
			return item.altimeters;
		if (type === partsDeleteKeyChuteProtectors)
			return item.chuteProtectors;
		if (type === partsDeleteKeyChuteReleases)
			return item.chuteReleases;
		if (type === partsDeleteKeyDeploymentBags)
			return item.deploymentBags;
		if (type === partsDeleteKeyParachutes)
			return item.parachutes;
		if (type === partsDeleteKeyStreamers)
			return item.streamers;
		if (type === partsDeleteKeyTrackers)
			return item.trackers;
		return null;
	};
	const motor = (index) => {
		if (!displayItem.value || !displayItem.value.motors)
			return { value: null };
		const temp = displayItem.value.motors.find(l => l.index === index);
		return { value: motorMountName(temp) };
	};
	const panelsKey = (type) => {
		return displayItem.value ? displayItem.value.id + '-stage-' : '';
	};
	const panelsUpdated = async (value) => {
		 await serviceStore.dispatcher.setRocketsExpanded(correlationId(), { id: panelsKey(), expanded: value });
	};
	const preCompleteOkRocketParts = async(correlationId, item) => {
		if (!props.preCompleteOkRocketPart)
			return error('useRocketStageComponent', 'preCompleteOkRocketParts', 'Invalid dialogEditPreCompleteOkRocketParts method.', null, null, null, correlationId);
		return await props.preCompleteOkRocketPart(correlationId, item);
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
	const selectChuteProtector = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsDeleteKeyChuteProtectors,
				dialogPartsSearchStageId.value
			);
		}
		finally {
			dialogChuteProtectorsSearchManager.value.ok();
		}
	};
	const selectChuteRelease = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsDeleteKeyChuteReleases,
				dialogPartsSearchStageId.value
			);
		}
		finally {
			dialogChuteReleasesSearchManager.value.ok();
		}
	};
	const selectDeploymentBag = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsDeleteKeyDeploymentBags,
				dialogPartsSearchStageId.value
			);
		}
		finally {
			dialogDeploymentBagsSearchManager.value.ok();
		}
	};
	const selectParachute = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsDeleteKeyParachutes,
				dialogPartsSearchStageId.value
			);
		}
		finally {
			dialogParachutesSearchManager.value.ok();
		}
	};
	const selectStreamer = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsDeleteKeyStreamers,
				dialogPartsSearchStageId.value
			);
		}
		finally {
			dialogStreamersSearchManager.value.ok();
		}
	};
	const selectTracker = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsDeleteKeyTrackers,
				dialogPartsSearchStageId.value
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
		if (type === partsDeleteKeyChuteProtectors) {
			item.chuteProtectors = parts;
			return;
		}
		if (type === partsDeleteKeyChuteReleases) {
			item.chuteReleases = parts;
			return;
		}
		if (type === partsDeleteKeyDeploymentBags) {
			item.deploymentBags = parts;
			return;
		}
		if (type === partsDeleteKeyParachutes) {
			item.parachutes = parts;
			return;
		}
		if (type === partsDeleteKeyStreamers) {
			item.streamers = parts;
			return;
		}
		if (type === partsDeleteKeyTrackers) {
			item.trackers = parts;
			return;
		}
	};

	onMounted(async () => {
		const temp3 = await serviceStore.getters.getRocketsExpanded();
		const temp4 = temp3[panelsKey()];
		panels.value = temp4 ?? [ 
			partsDeleteKeyAltimeters,
			partsDeleteKeyChuteProtectors,
			partsDeleteKeyChuteReleases,
			partsDeleteKeyDeploymentBags,
			partsDeleteKeyParachutes,
			partsDeleteKeyStreamers,
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
		buttonsForms,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		altimeters,
		chuteProtectors,
		chuteReleases,
		deploymentBags,
		displayItem,
		displayItemCp,
		displayItemDiameterMajor,
		displayItemDiameterMinor,
		displayItemEjectionDrogue,
		displayItemEjectionDrogueBackup,
		displayItemEjectionMain,
		displayItemEjectionMainBackup,
		displayItemLength,
		displayItemWeight,
		hasAltimeters,
		hasChuteProtectors,
		hasChuteReleases,
		hasDeploymentBags,
		hasParachutes,
		hasStreamers,
		hasTrackers,
		parachutes,
		stageIndex,
		streamers,
		trackers,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		motorMountDiameters,
		motorMountDiameter,
		dialogPartsDeleteManager,
		dialogPartsDeleteMessage,
		dialogAltimetersSearchManager,
		dialogChuteProtectorsSearchManager,
		dialogChuteReleasesSearchManager,
		dialogDeploymentBagsSearchManager,
		dialogParachutesSearchManager,
		dialogStreamersSearchManager,
		dialogTrackersSearchManager,
		manufacturerTypeAltimeter,
		manufacturerTypeChuteProtector,
		manufacturerTypeChuteRelease,
		manufacturerTypeChuteDeploymentBag,
		manufacturerTypeParachute,
		manufacturerTypeStreamer,
		manufacturerTypeTracker,
		manufacturers,
		panels,
		clickAltimetersSearch,
		clickChuteProtectorsSearch,
		clickChuteReleasesSearch,
		clickDeploymentBagsSearch,
		clickParachutesSearch,
		clickStreamersSearch,
		clickTrackersSearch,
		dialogPartsDeleteCancel,
		dialogPartsDeleteOk,
		handleAltimeterDelete,
		handleChuteProtectorsDelete,
		handleChuteReleasesDelete,
		handleDeploymentBagsDelete,
		handleParachutesDelete,
		handleStreamersDelete,
		handleTrackerDelete,
		panelsUpdated,
		hasMotor,
		motor,
		preCompleteOkRocketParts,
		selectAltimeter,
		selectChuteProtector,
		selectChuteRelease,
		selectDeploymentBag,
		selectParachute,
		selectStreamer,
		selectTracker
	};
};
</script>
