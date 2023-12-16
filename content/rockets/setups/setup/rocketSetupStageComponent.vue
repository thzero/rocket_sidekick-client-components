<script>
import { computed, onMounted, ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useMotorUtilityComponent } from '@/components/external/motorUtilityComponent';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementBase';
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
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		displayItemMeasurementLength,
		displayItemMeasurementWeight
	} = useToolsMeasurementUtilityComponent(props, context);

	const {
		motorImpulseClasses,
		motorMountDiameters,
		motorCaseInfo,
		motorMountDiameter,
		motorMountName,
		motorUrl
	} = useMotorUtilityComponent(props, context);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const dialogPartsDeleteId = ref(null);
	const dialogPartsDeleteManager = ref(new DialogSupport());
	const dialogPartsDeleteMessage = ref();
	const dialogPartsDeleteType = ref(null);
	const dialogPartsEditId = ref(null);
	const dialogPartsEditMessage = ref();
	const dialogPartsEditAltimeterManager = ref(new DialogSupport());
	const dialogPartsEditChuteProtectorManager = ref(new DialogSupport());
	const dialogPartsEditChuteReleaseManager = ref(new DialogSupport());
	const dialogPartsEditDeploymentBagManager = ref(new DialogSupport());
	const dialogPartsEditMotorManager = ref(new DialogSupport());
	const dialogPartsEditMotorCaseManager = ref(new DialogSupport());
	const dialogPartsEditParachuteManager = ref(new DialogSupport());
	const dialogPartsEditStreamerManager = ref(new DialogSupport());
	const dialogPartsEditTrackerManager = ref(new DialogSupport());
	const dialogPartsSearchAltimetersManager = ref(new DialogSupport());
	const dialogPartsSearchChuteProtectorsManager = ref(new DialogSupport());
	const dialogPartsSearchChuteReleasesManager = ref(new DialogSupport());
	const dialogPartsSearchDeploymentBagsManager = ref(new DialogSupport());
	const dialogPartsSearchParachutesManager = ref(new DialogSupport());
	const dialogPartsSearchStreamersManager = ref(new DialogSupport());
	const dialogPartsSearchTrackersManager = ref(new DialogSupport());
	const manufacturerTypeAltimeter = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.altimeter ]);
	const manufacturerTypeChuteProtector = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.chuteProtector ]);
	const manufacturerTypeChuteRelease = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.chuteRelease ]);
	const manufacturerTypeDeploymentBag = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.deploymentBag ]);
	const manufacturerTypeParachute = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.parachute ]);
	const manufacturerTypeStreamer = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.streamer ]);
	const manufacturerTypeTracker = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.tracker ]);
	const manufacturers = ref(props.manufacturers);
	const panels = ref([]);
	
	const altimeters = computed(() => {
		const temp = props.detailItem ? props.detailItem.altimeters : [];
		if (fromRocketStage.value && fromRocketStage.value.altimeters) {
			fromRocketStage.value.altimeters.forEach(l => l.fromRocket = true);
			temp.push(...fromRocketStage.value.altimeters);
		}
		return temp;
	});
	const chuteProtectors = computed(() => {
		const temp = props.detailItem ? props.detailItem.chuteProtectors : [];
		if (fromRocketStage.value && fromRocketStage.value.chuteProtectors) {
			fromRocketStage.value.chuteProtectors.forEach(l => l.fromRocket = true);
			temp.push(...fromRocketStage.value.chuteProtectors);
		}
		return temp;
	});
	const chuteReleases = computed(() => {
		const temp = props.detailItem ? props.detailItem.chuteReleases : [];
		if (fromRocketStage.value && fromRocketStage.value.chuteReleases) {
			fromRocketStage.value.chuteReleases.forEach(l => l.fromRocket = true);
			temp.push(...fromRocketStage.value.chuteReleases);
		}
		return temp;
	});
	const deploymentBags = computed(() => {
		const temp = props.detailItem ? props.detailItem.deploymentBags : [];
		if (fromRocketStage.value && fromRocketStage.value.deploymentBags) {
			fromRocketStage.value.deploymentBags.forEach(l => l.fromRocket = true);
			temp.push(...fromRocketStage.value.deploymentBags);
		}
		return temp;
	});
	const displayItem = computed(() => {
		return props.detailItem ? props.detailItem : {};
	});
	const displayItemCg = computed(() => {
		return displayItemMeasurementLength(correlationId(), displayItem.value, (value) => { return value.cg; }, (value) => { return value.cgMeasurementUnitsId; }, (value) => { return value.cgMeasurementUnitId; });
	});
	const displayItemWeight = computed(() => {
		if (displayItem.value && displayItem.value.weight)
			return displayItemMeasurementWeight(correlationId(), displayItem.value, (value) => { return value.weight; }, (value) => { return value.weightMeasurementUnitsId; }, (value) => { return value.weightMeasurementUnitId; });
		return fromRocketStageWeight.value;
	});
	const displayItemWeightNose = computed(() => {
		if (displayItem.value && displayItem.value.weightNose)
			return displayItemMeasurementWeight(correlationId(), displayItem.value, (value) => { return value.weightNose; }, (value) => { return value.weightNoseMeasurementUnitsId; }, (value) => { return value.weightNoseMeasurementUnitId; });
		return null;
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
	const fromRocketStage = computed(() => {
		// if (!props.detailItemSetup)
		// 	return null;
		// if (!props.detailItemSetup.rocket)
		// 	return null;
		// if (!props.detailItemSetup.rocket.stages)
		// 	return null;
		// return props.detailItemSetup.rocket.stages.find(l => l.id === props.detailItem.rocketStageId);
		return props.detailItem.fromRocket ? props.detailItem.fromRocket : null;
	});
	const fromRocketStageCp = computed(() => {
		const temp = fromRocketStage.value;
		if (!temp)
			return null;
		return displayItemMeasurementLength(correlationId(), temp, (value) => { return value.cp; }, (value) => { return value.cpMeasurementUnitsId; }, (value) => { return value.cpMeasurementUnitId; });
	});
	const fromRocketStageDescription = computed(() => {
		const temp = fromRocketStage.value;
		return temp ? temp.description : null;
	});
	const fromRocketStageDiameterMajor = computed(() => {
		const temp = fromRocketStage.value;
		if (!temp)
			return null;
		return displayItemMeasurementLength(correlationId(), temp, (value) => { return value.diameterMajor; },  (value) => { return value.diameterMajorMeasurementUnitsId; }, (value) => { return value.diameterMajorMeasurementUnitId; });
	});
	const fromRocketStageDiameterMinor = computed(() => {
		const temp = fromRocketStage.value;
		if (!temp)
			return null;
		return displayItemMeasurementLength(correlationId(), temp, (value) => { return value.diameterMinor; },  (value) => { return value.diameterMinorMeasurementUnitsId; }, (value) => { return value.diameterMinorMeasurementUnitId; });
	});
	const fromRocketStageLength = computed(() => {
		const temp = fromRocketStage.value;
		if (!temp)
			return null;
		return displayItemMeasurementLength(correlationId(), temp, (value) => { return value.length; },  (value) => { return value.lengthMeasurementUnitsId; }, (value) => { return value.lengthMeasurementUnitId; });
	});
	const fromRocketStageWeight = computed(() => {
		const temp = fromRocketStage.value;
		if (!temp)
			return null;
		return displayItemMeasurementWeight(correlationId(), temp, (value) => { return value.weight; }, (value) => { return value.weightMeasurementUnitsId; }, (value) => { return value.weightMeasurementUnitId; });
	});
	const motorCases = computed(() => {
		const output = [];
		if (hasMotorInfo(0))
			output.push(motorCaseInfoByIndex(0));
		if (hasMotorInfo(1))
			output.push(motorCaseInfoByIndex(1));
		if (hasMotorInfo(2))
			output.push(motorCaseInfoByIndex(2));
		if (hasMotorInfo(3))
			output.push(motorCaseInfoByIndex(3));
		return output;
	});
	const motors = computed(() => {
		const output = [];
		if (hasMotorInfo(0))
			output.push(motorInfo(0));
		if (hasMotorInfo(1))
			output.push(motorInfo(3));
		if (hasMotorInfo(2))
			output.push(motorInfo(2));
		if (hasMotorInfo(3))
			output.push(motorInfo(3));
		return output;
	});
	const parachutes = computed(() => {
		const temp = props.detailItem ? props.detailItem.parachutes : [];
		if (fromRocketStage.value && fromRocketStage.value.parachutes) {
			fromRocketStage.value.parachutes.forEach(l => l.fromRocket = true);
			temp.push(...fromRocketStage.value.parachutes);
		}
		return temp;
	});
	const stageIndex = computed(() => {
		if (!props.detailItem)
			return null;
		
		return props.detailItem.index + 1;
	});
	const streamers = computed(() => {
		const temp = props.detailItem ? props.detailItem.streamers : [];
		if (fromRocketStage.value && fromRocketStage.value.streamers) {
			fromRocketStage.value.streamers.forEach(l => l.fromRocket = true);
			temp.push(...fromRocketStage.value.streamers);
		}
		return temp;
	});
	const trackers = computed(() => {
		const temp = props.detailItem ? props.detailItem.trackers : [];
		if (fromRocketStage.value && fromRocketStage.value.trackers) {
			fromRocketStage.value.trackers.forEach(l => l.fromRocket = true);
			temp.push(...fromRocketStage.value.trackers);
		}
		return temp;
	});

	const partsKeyAltimeters = 'altimeters';
	const partsKeyChuteProtectors = 'chuteProtectors';
	const partsKeyChuteReleases = 'chuteReleases';
	const partsKeyDeploymentBags = 'deploymentBags';
	const partsKeyParachutes = 'parachutes';
	const partsKeyStreamers = 'streamers';
	const partsKeyTrackers = 'trackers';
	
	const clickAltimetersSearch = async () => {
		dialogPartsSearchAltimetersManager.value.open();
	};
	const clickChuteProtectorsSearch = async () => {
		dialogPartsSearchChuteProtectorsManager.value.open();
	};
	const clickChuteReleasesSearch = async () => {
		dialogPartsSearchChuteReleasesManager.value.open();
	};
	const clickDeploymentBagsSearch = async () => {
		dialogPartsSearchDeploymentBagsManager.value.open();
	};
	const clickParachutesSearch = async () => {
		dialogPartsSearchParachutesManager.value.open();
	};
	const clickStreamersSearch = async () => {
		dialogPartsSearchStreamersManager.value.open();
	};
	const clickTrackersSearch = async () => {
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
	const fromRocketStageHasMotor = (index) => {
		const temp = fromRocketStage.value;
		if (!temp || !temp.motors)
			return false;
		const temp2 = temp.motors.find(l => l.index === index);
		return temp2 && (temp2.count > 0);
	};
	const fromRocketStageMotorI = (index) => {
		const temp = fromRocketStage.value;
		if (!temp || !temp.motors)
			return {};
		const temp2 = temp.motors.find(l => l.index === index);
		return temp2 ? temp2 : {};
	};
	const fromRocketStageMotor = (index) => {
		const temp = fromRocketStageMotorI(index);
		if (!temp)
			return { value: null };
		const diameter = temp.diameter ? motorMountDiameter(temp.diameter) : null;
		const count = temp.count ? temp.count : null;
		return { value: `${diameter}${diameter ? ' x ' : ''}${count}` };
	};
	const generateMotorInfo = (id, name) => {
		if (String.isNullOrEmpty(name))
			return {};
		let manufacturer = null;
		if (props.manufacturers)
			manufacturer = props.manufacturers.find(l => l.id === id);

		return {
			value: `${manufacturer ? manufacturer.abbrev : ''} ${name}`.trim(),
			name: `${name}`.trim(),
			manufacturer: manufacturer.abbrev,
			manufacturerId: manufacturer.id
		};
	};
	const getMotor = (index) => {
		if (!displayItem.value || !displayItem.value.motors || (index >= displayItem.value.motors.length))
			return null;

		return displayItem.value.motors[index];
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
	const handleAltimeterDelete = async (item) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyAltimeters}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsKeyAltimeters;
		dialogPartsDeleteManager.value.open();
	};
	const handleAltimeterEdit = async (item) => {
		dialogPartsEditMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyAltimeters}.Edit_confirm`);
		dialogPartsEditId.value = item.id;
		dialogPartsEditAltimeterManager.value.open();
	};
	const handleChuteProtectorDelete = async (item) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyChuteProtectors}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsKeyChuteProtectors;
		dialogPartsDeleteManager.value.open();
	};
	const handleChuteProtectorEdit = async (item) => {
		dialogPartsEditMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyChuteProtectors}.Edit_confirm`);
		dialogPartsEditId.value = item.id;
		dialogPartsEditChuteProtectorManager.value.open();
	};
	const handleChuteReleaseDelete = async (item) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyChuteReleases}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsKeyChuteReleases;
		dialogPartsDeleteManager.value.open();
	};
	const handleChuteReleaseEdit = async (item) => {
		dialogPartsEditMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyChuteReleases}.Edit_confirm`);
		dialogPartsEditId.value = item.id;
		dialogPartsEditChuteReleaseManager.value.open();
	};
	const handleDeploymentBagDelete = async (item) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyDeploymentBags}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsKeyDeploymentBags;
		dialogPartsDeleteManager.value.open();
	};
	const handleDeploymentBagEdit = async (item) => {
		dialogPartsEditMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyDeploymentBags}.Edit_confirm`);
		dialogPartsEditId.value = item.id;
		dialogPartsEditDeploymentBagManager.value.open();
	};
	const handleParachuteDelete = async (item) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyParachutes}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsKeyParachutes;
		dialogPartsDeleteManager.value.open();
	};
	const handleParachuteEdit = async (item) => {
		dialogPartsEditMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyParachutes}.Edit_confirm`);
		dialogPartsEditId.value = item.id;
		dialogPartsEditParachuteManager.value.open();
	};
	const handleStreamerDelete = async (item) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyStreamers}.delete_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsKeyStreamers;
		dialogPartsDeleteManager.value.open();
	};
	const handleStreamerEdit = async (ite) => {
		dialogPartsEditMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyStreamers}.Edit_confirm`);
		dialogPartsEditId.value = item.id;
		dialogPartsEditStreamerManager.value.open();
	};
	const handleTrackerDelete = async (item) => {
		dialogPartsDeleteMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyTrackers}.delepartsKeyAltimeterste_confirm`);
		dialogPartsDeleteId.value = item.id;
		dialogPartsDeleteType.value = partsKeyTrackers;
		dialogPartsDeleteTrackerManager.value.open();
	};
	const handleTrackerEdit = async (item) => {
		dialogPartsEditMessage.value = LibraryClientUtility.$trans.t(`messages.${partsKeyTrackers}.Edit_confirm`);
		dialogPartsEditId.value = item.id;
		dialogPartsEditTrackerManager.value.open();
	};
	const hasMotorInfo = (index) => {
		const motor = getMotor(index);
		const fromRocket = fromRocketStageMotor(index);
		return ((motor && motor.motorId) || (fromRocket && fromRocket.diameter));
	};
	const motorCaseInfoByIndex = (index) => {
		const motor = getMotor(index);
		if (!motor)
			return { value: '' };

		// const output = generateMotorInfo(motor.motorCaseManufacturerId, motor.motorCaseName);
		// return { index: index, value: output.full, name: output.name, manufacturer: output.manufacturer, manufacturerId: output.manufacturerId, typeId: AppCommonConstants.Rocketry.PartTypes.motorCase };
		const output = generateMotorInfo(motor.motorCaseManufacturerId, motor.motorCaseName);
		output.typeId = AppCommonConstants.Rocketry.PartTypes.motorCase;
		return output;
	};
	const motorInfo = (index) => {
		const motor = getMotor(index);
		if (!motor)
			return { value: '' };

		let output = generateMotorInfo(motor.motorManufacturerId, motor.motorName);
		if (!String.isNullOrEmpty(motor.motorDelay)) {
			output.value += '-' + motor.motorDelay;
			output.name += '-' + motor.motorDelay;
		}
		// return { index: index, value: output.full, name: output.name, manufacturer: output.manufacturer, typeId: AppCommonConstants.Rocketry.PartTypes.motor };
		output.typeId = AppCommonConstants.Rocketry.PartTypes.motor;
		output.motor = fromRocketStageMotor(index).value;
		output.motorCase = motorCaseInfoByIndex(index).value;
		return output;
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
				displayItem.value.id
			);
		}
		finally {
			dialogPartsSearchAltimetersManager.value.ok();
		}
	};
	const selectChuteProtector = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsKeyChuteProtectors,
				displayItem.value.id
			);
		}
		finally {
			dialogPartsSearchChuteProtectorsManager.value.ok();
		}
	};
	const selectChuteRelease = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsKeyChuteReleases,
				displayItem.value.id
			);
		}
		finally {
			dialogPartsSearchChuteReleasesManager.value.ok();
		}
	};
	const selectDeploymentBag = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsKeyDeploymentBags,
				displayItem.value.id
			);
		}
		finally {
			dialogPartsSearchDeploymentBagsManager.value.ok();
		}
	};
	const selectParachute = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsKeyParachutes,
				displayItem.value.id
			);
		}
		finally {
			dialogPartsSearchParachutesManager.value.ok();
		}
	};
	const selectStreamer = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item, 
				partsKeyStreamers,
				displayItem.value.id
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
				displayItem.value.id
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
		// const temp4 = temp3[panelsKey()];
		const temp4 = [...new Set(temp3[panelsKey()])];
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
		fromRocketStageCp,
		fromRocketStageDescription,
		fromRocketStageDiameterMajor,
		fromRocketStageDiameterMinor,
		fromRocketStageLength,
		fromRocketStageHasMotor,
		fromRocketStageMotor,
		fromRocketStageWeight,
		deploymentBags,
		displayItem,
		displayItemCg,
		displayItemWeight,
		displayItemWeightNose,
		hasAltimeters,
		hasChuteProtectors,
		hasChuteReleases,
		hasDeploymentBags,
		hasParachutes,
		hasStreamers,
		hasTrackers,
		motors,
		motorCases,
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
		dialogPartsEditMessage,
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
		dialogPartsSearchParachutesManager,
		dialogPartsSearchStreamersManager,
		dialogPartsSearchTrackersManager,
		manufacturerTypeAltimeter,
		manufacturerTypeChuteProtector,
		manufacturerTypeChuteRelease,
		manufacturerTypeDeploymentBag,
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
		handleAltimeterEdit,
		handleChuteProtectorDelete,
		handleChuteProtectorEdit,
		handleChuteReleaseDelete,
		handleChuteReleaseEdit,
		handleDeploymentBagDelete,
		handleDeploymentBagEdit,
		handleParachuteDelete,
		handleParachuteEdit,
		handleStreamerDelete,
		handleStreamerEdit,
		handleTrackerDelete,
		handleTrackerEdit,
		hasMotorInfo,
		motorInfo,
		panelsUpdated,
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
