<script>
import { computed, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentMarkupComponent } from '@/components/content/contentMarkup';
import { useDetailComponent } from '@/components/content/detailComponent';
import { useLaunchComponent } from '@/components/content/launches/launch/launchComponent';
import { useMotorUtilityComponent } from '@/components/external/motorUtilityComponent';
import { useLocationsUtilityComponent } from '@/components/content/locations/locationUtilityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useLaunchEditComponent(props, context, options) {
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
		successResponse,
		isSaving,
		serverErrors,
		setErrors,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify,
		serviceStore,
		formControlRef,
		dirty,
		detailItem,
		dialogDeleteManager,
		dialogDeleteMessage,
		dialogDeleteParams,
		invalid,
		canDelete,
		detailItemData,
		detailItemTextRows,
		isDeleting,
		isEditable,
		isNew,
		dialogDeleteCancel,
		dialogDeleteError,
		dialogDeleteOk,
		dialogDeleteOpen,
		dirtyCallback,
		invalidCallback,
		handleCancel,
		handleClose,
		handleOk,
		preCompleteOk,
		resetAdditional
	} = useDetailComponent(props, context, {
		init: async (correlationId, value) => {
			resetData(correlationId, value);
		},
		preCompleteOk : async (correlationId) => {
			setData(correlationId);

			const response = await serviceStore.dispatcher.saveLaunch(correlationId, detailItemData.value);
			logger.debug('useLaunchEditComponent', 'preCompleteOk', 'response', response, correlationId);
			return response;
		},
		resetAdditional: (correlationId, orig) => {
			resetData(correlationId, orig);
		}
	});

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsAltitudeType,
		measurementUnitsAltitudeDefaultId,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsTemperatureDefaultId,
		measurementUnitsTemperatureType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		displayItemMeasurement,
		displayItemMeasurementAcceleration,
		displayItemMeasurementAltitude,
		displayItemMeasurementLength,
		displayItemMeasurementTemperature,
		displayItemMeasurementVelocity,
		measurementUnitsFromUnitId,
		failureReasons,
		successReasons,
		weatherOptions,
		hasLaunchCoverUrl,
		hasLaunchResults,
		hasLaunchResultsCoords,
		hasLaunchResultsCoordsLaunch,
		hasLaunchResultsCoordsLocation,
		hasLaunchResultsCoordsRecovery,
		hasLaunchRocketSpecs,
		hasLaunchWeather,
		isLaunchFailure,
		isLaunchSuccess,
		launchLocationIterationAddress,
		launchCoverUrl,
		launchDate,
		launchLocationIteration,
		launchLocationName,
		launchLocationIterationCoords,
		launchResultsAccelerationDrogue,
		launchResultsAccelerationMain,
		launchResultsAccelerationMax,
		launchResultsAltitudeDrogue,
		launchResultsAltitudeMain,
		launchResultsAltitudeMax,
		launchResultsCoords,
		launchResultsCoordsLatLaunch,
		launchResultsCoordsLongLaunch,
		launchResultsCoordsLatRecovery,
		launchResultsCoordsLongRecovery,
		launchResultsCoordsLaunch,
		launchResultsCoordsLocation,
		launchResultsCoordsRecovery,
		launchResultsVelocityMax,
		launchResultsVelocityRecovery,
		launchRocketCg,
		launchRocketCp,
		launchRocketDiameter,
		launchRocketLength,
		launchRocketWeight,
		launchStatusColor,
		launchStatusIcon,
		launchTemperature,
		launchWeather,
		launchWindSpeed,
		launchTitle,
		launchTitleLocation
	} = useLaunchComponent(props, context);

	const {
		location,
		locationIterations,
		locationIterationName
	} = useLocationsUtilityComponent(props, context);

	const {
		motorImpulseClasses,
		motorMountDiameters,
		motorCaseInfo,
		motorMountDiameter,
		motorMountName,
		motorUrl
	} = useMotorUtilityComponent(props, context);

	const {
		rocketSetupMotorNames
	} = useRocketsUtilityComponent(props, context, options);
	
	const {
		markupHint
	} = useContentMarkupComponent(props, context);
	
	const dialogDeleteConfirmationManager = ref(new DialogSupport());
	const dialogDeleteConfirmationMessage = ref(null);
	const dialogDeleteConfirmationParams = ref(null);
	const dialogLocationLookupManager = ref(new DialogSupport());
	const dialogRocketLookupManager = ref(new DialogSupport());
	const dialogRocketSetupLookupManager = ref(new DialogSupport());
	const detailItemAlbumUrl = ref(null);
	const detailItemCoverUrl = ref(null);
	const detailItemDate = ref(null);
	const detailItemDescription = ref(null);
	const detailItemFailureReasons = ref(null);
	const detailItemName = ref(null);
	const detailItemLocationId = ref(null);
	const detailItemLocationIterationId = ref(null);
	const detailItemLocationName = ref(null);
	const detailItemNotes = ref(null);
	const detailItemMotor0 = ref(null);
	const detailItemMotor1 = ref(null);
	const detailItemMotor2 = ref(null);
	const detailItemMotorCase0 = ref(null);
	const detailItemMotorCase1 = ref(null);
	const detailItemMotorCase2 = ref(null);
	const detailItemMotorCaseId0 = ref(null);
	const detailItemMotorCaseId1 = ref(null);
	const detailItemMotorCaseId2 = ref(null);
	const detailItemMotorCaseInfo0 = ref(null);
	const detailItemMotorCaseInfo1 = ref(null);
	const detailItemMotorCaseInfo2 = ref(null);
	const detailItemMotorDelay0 = ref(null);
	const detailItemMotorDelay1 = ref(null);
	const detailItemMotorDelay2 = ref(null);
	const detailItemMotorDiameter0 = ref(null);
	const detailItemMotorDiameter1 = ref(null);
	const detailItemMotorDiameter2 = ref(null);
	const detailItemMotorId0 = ref(null);
	const detailItemMotorId1 = ref(null);
	const detailItemMotorId2 = ref(null);
	const detailItemMotorInfo0 = ref(null);
	const detailItemMotorInfo1 = ref(null);
	const detailItemMotorInfo2 = ref(null);
	const detailItemPublic = ref(false);
	const detailItemResultsAccelerationMax = ref(null);
	const detailItemResultsAccelerationMaxMeasurementUnitId = ref(null);
	const detailItemResultsAccelerationMaxMeasurementUnitsId = ref(null);
	const detailItemResultsAltitudeMax = ref(null);
	const detailItemResultsAltitudeMaxMeasurementUnitId = ref(null);
	const detailItemResultsAltitudeMaxMeasurementUnitsId = ref(null);
	const detailItemResultsAltitudeDeployDrogue = ref(null);
	const detailItemResultsAltitudeDeployDrogueMeasurementUnitId = ref(null);
	const detailItemResultsAltitudeDeployDrogueMeasurementUnitsId = ref(null);
	const detailItemResultsAltitudeDeployMain = ref(null);
	const detailItemResultsAltitudeDeployMainMeasurementUnitId = ref(null);
	const detailItemResultsAltitudeDeployMainMeasurementUnitsId = ref(null);
	const detailItemResultsCoordsLatLaunch = ref(null);
	const detailItemResultsCoordsLongLaunch = ref(null);
	const detailItemResultsCoordsLatRecovery = ref(null);
	const detailItemResultsCoordsLongRecovery = ref(null);
	const detailItemResultsVelocityMax = ref(null);
	const detailItemResultsVelocityMaxMeasurementUnitId = ref(null);
	const detailItemResultsVelocityMaxMeasurementUnitsId = ref(null);
	const detailItemResultsVelocityRecovery = ref(null);
	const detailItemResultsVelocityRecoveryMeasurementUnitId = ref(null);
	const detailItemResultsVelocityRecoveryMeasurementUnitsId = ref(null);
	const detailItemRocketId = ref(null);
	const detailItemRocketName = ref(null);
	const detailItemRocketSetupId = ref(null);
	const detailItemRocketSetupName  = ref(null);
	const detailItemSuccess = ref(null);
	const detailItemTemperature = ref(null);
	const detailItemTemperatureMeasurementUnitId = ref(null);
	const detailItemTemperatureMeasurementUnitsId = ref(null);
	const detailItemVideoUrl = ref(null);
	const detailItemWeather = ref(null);
	const detailItemWindSpeed = ref(null);
	const detailItemWindSpeedMeasurementUnitId = ref(null);
	const detailItemWindSpeedMeasurementUnitsId = ref(null);
	const dialogPartsSearchMotorsDiameter = ref(null);
	const dialogPartsSearchMotorsManager = ref(new DialogSupport());
	const hasMotorsI = ref([]);
	const manufacturerTypeMotor = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.motor ]);
	const manufacturerTypeMotorCase = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.motorCase ]);
	
	// const weatherOptionsBlank = ref(LibraryClientVueUtility.selectBlank(weatherOptions));
	
	const hasAdmin = computed(() => {
		return false;
	});
	const isSuccess = computed(() => {
		return detailItemSuccess.value === AppCommonConstants.Rocketry.Launches.Reasons.Success.success;
	});

	const clickRemoveLocation = async (item) => {
		dialogDeleteConfirmationParams.value = { id: detailItemLocationId.value, type: 'location' };
		dialogDeleteConfirmationManager.value.open();
	};
	const clickRemoveRocket = async (item) => {
		dialogDeleteConfirmationParams.value = { id: detailItemRocketId.value, type: 'rocket' };
		dialogDeleteConfirmationManager.value.open();
	};
	const clickRemoveRocketSetup = async (item) => {
		dialogDeleteConfirmationParams.value = { id: detailItemRocketSetupId.value, type: 'rocketSetup' };
		dialogDeleteConfirmationManager.value.open();
	};
	const clickSearchLocations = async (correlationId) => {
		dialogLocationLookupManager.value.open();
	};
	const clickSearchRockets = async (correlationId) => {
		dialogRocketLookupManager.value.open();
	};
	const clickSearchRocketSetups = async (correlationId) => {
		dialogRocketSetupLookupManager.value.open();
	};
	const clickViewLocation = async (item) => {
		if (!item)
			return;
		LibraryClientUtility.$navRouter.push('/user/locations/' + item.locationId);
	};
	const clickViewRocket = async (item) => {
		if (!item)
			return;
		LibraryClientUtility.$navRouter.push('/user/rockets/' + item.rocketId);
	};
	const clickViewRocketSetup = async (item) => {
		if (!item)
			return;
		LibraryClientUtility.$navRouter.push('/user/rocketsetups/' + item.rocketSetupId);
	};
	const dialogDeleteConfirmationCancel = async (item) => {
		try {
			dialogDeleteConfirmationManager.value.cancel();
		}
		finally {
			dialogDeleteConfirmationParams.id = null;
		}
	};
	const dialogDeleteConfirmationError = async (err) => {
		try {
			dialogDeleteConfirmationManager.value.cancel();
		}
		finally {
			dialogDeleteConfirmationParams.id = null;
		}
	};
	const dialogDeleteConfirmationOk = async (correlationId) => {
		try {
			if (!dialogDeleteConfirmationParams.value.type)
				return;

			if (dialogDeleteConfirmationParams.value.type === 'location') {
				await removeLocation(correlationId);
				return;
			}
			else if (dialogDeleteConfirmationParams.value.type === 'rocket') {
				await removeRocket(correlationId);
				return;
			}
			else if (dialogDeleteConfirmationParams.value.type === 'rocketSetup') {
				await removeRocketSetup(correlationId);
				return;
			}
		}
		finally {
			dialogDeleteConfirmationParams.id = null;
			dialogDeleteConfirmationManager.value.ok();
		}
	};
	const dialogDeleteConfirmationOpen = (item) => {
		if (!item)
			return;
		if (!canDelete(item)) {
			setNotify(correlationId(), 'errors.security');
			return;
		}

		dialogDeleteConfirmationParams.id = item.id;
		dialogDeleteConfirmationManager.value.open();
	};
	const getMotors = () => {
		detailItemMotor0.value = null;
		detailItemMotor1.value = null;
		detailItemMotor2.value = null;
		detailItemMotorCase0.value = null;
		detailItemMotorCase1.value = null;
		detailItemMotorCase2.value = null;
		detailItemMotorCaseId0.value = null;
		detailItemMotorCaseId1.value = null;
		detailItemMotorCaseId2.value = null;
		detailItemMotorCaseInfo0.value = null;
		detailItemMotorCaseInfo1.value = null;
		detailItemMotorCaseInfo2.value = null;
		detailItemMotorDelay0.value = null;
		detailItemMotorDelay1.value = null;
		detailItemMotorDelay2.value = null;
		detailItemMotorDiameter0.value = null;
		detailItemMotorDiameter1.value = null;
		detailItemMotorDiameter2.value = null;
		detailItemMotorId0.value = null;
		detailItemMotorId1.value = null;
		detailItemMotorId2.value = null;
		detailItemMotorInfo0.value = null;
		detailItemMotorInfo1.value = null;
		detailItemMotorInfo2.value = null;
		
		hasMotorsI.value = [];
		const fromRocket = detailItem.value && detailItem.value.rocket ? detailItem.value.rocket : null;
		if (fromRocket) {
			let temp;
			let temp2;
			let index = -1;
			let diameter;
			let count;
			for (const item of fromRocket.motors) {
				index++;
				if (!item.diameter || !item.count)
					continue;

				if (index > 2)
					break;
				
				hasMotorsI.value.push(index);

				temp = selectMotorByIndex(index);
				if (!temp)
					continue;

				diameter = item.diameter ? motorMountDiameter(item.diameter) : null;
				count = item.count ? item.count : null;
				temp.motorInfo.value = `${diameter}${diameter ? ' x ' : ''}${count}`;

				temp2 = (detailItem.value.motors ?? []).find(l => l.index === item.index);
				if (!temp2)
					continue;

				temp.motorCase.value = generateTitle(temp2.motorCaseManufacturerId, temp2.motorCaseName);
				temp.motorCaseId.value = temp2.motorCaseId;
				temp.motorCaseInfo.value = temp2.motorCaseInfo;
				temp.motorDelay.value = temp2.motorDelay;
				temp.motorDiameter.value = item.diameter;
				temp.motor.value = generateTitle(temp2.motorManufacturerId, temp2.motorName);
				temp.motorId.value = temp2.motorId;
			}
		}
	};
	const hasMotor = (index) => {
		return hasMotorsI.value ? hasMotorsI.value.includes(index) : false;
	};
	const removeLocation = async () => {
		detailItemLocationId.value = null;
		detailItemLocationName.value = null;
		location.value = null;
	};
	const removeRocket = async () => {
		detailItemRocketId.value = null;
		detailItemRocketName.value = null;
		detailItemRocketSetupId.value = null;
		detailItemRocketSetupName.value = null;
		detailItem.value.rocket = null;
	};
	const removeRocketSetup = async () => {
		detailItemRocketSetupId.value = null;
		detailItemRocketSetupName.value = null;
	};
	const requestLocation = async (correlationId, id) => {
		const response = await serviceStore.dispatcher.requestLocationById(correlationId, id);
		return hasSucceeded(response) ? response.results : null;
	};
	const resetData = (correlationId, value) => {
		detailItemAlbumUrl.value = value ? value.albumUrl : null;
		detailItemCoverUrl.value = value ? value.coverUrl : null;
		detailItemDate.value = value ? value.date : null;
		detailItemDescription.value = value ? value.description : null;
		
		detailItemName.value = value ? value.name : null;
		detailItemNotes.value = value ? value.notes : null;
		detailItemPublic.value = value ? value.public : false;

		if (value && value.location) {
			detailItemLocationId.value = value.location.id;
			detailItemLocationIterationId.value = value.locationIterationId;
			detailItemLocationName.value = value.location.name;
			location.value = value.location;
			// (async () => {
			// 	location.value = await requestLocation(correlationId, value.location.id);
			// })();
		}
		else {
			detailItemLocationId.value = null;
			detailItemLocationIterationId.value = null;
			detailItemLocationName.value = null;
			location.value = null;
		}
	
		if (value && value.rocket) {
			detailItemRocketId.value = value.rocket.id;
			detailItemRocketName.value = value.rocket.name;
		}
		else {
			detailItemRocketId.value = null;
			detailItemRocketName.value = null;
			detailItemRocketSetupId.value = null;
			detailItemRocketSetupName.value = null;
		}

		if (value && value.rocketSetup) {
			detailItemRocketSetupId.value = value.rocketSetup.id;
			detailItemRocketSetupName.value = rocketSetupName(value.rocketSetup);
		}
		else {
			detailItemRocketSetupId.value = null;
			detailItemRocketSetupName.value = null;
		}

		detailItemSuccess.value = value ? value.success : false;
		detailItemFailureReasons.value = value  ? value.failureReasons : null;
		
		detailItemTemperature.value = value ? value.temperature : null;
		detailItemTemperatureMeasurementUnitId.value = value ? value.temperatureMeasurementUnitId ?? measurementUnitsTemperatureDefaultId.value : measurementUnitsTemperatureDefaultId.value;
		detailItemTemperatureMeasurementUnitsId.value = value ? value.temperatureMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		detailItemVideoUrl.value = value ? value.videoUrl : null;

		detailItemWeather.value = value ? value.weather : null;
		
		detailItemWindSpeed.value = value ? value.windSpeed : null;
		detailItemWindSpeedMeasurementUnitId.value = value ? value.windSpeedMeasurementUnitId ?? measurementUnitsVelocityDefaultId.value : measurementUnitsVelocityDefaultId.value;
		detailItemWindSpeedMeasurementUnitsId.value = value ? value.windSpeedMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		let temp = value ?? {};
		temp.results = temp.results ?? {};
		detailItemResultsCoordsLatLaunch.value = temp ? temp.results.coordsLatLaunch : false;
		detailItemResultsCoordsLongLaunch.value = temp ? temp.results.coordsLongLaunch : false;
		detailItemResultsCoordsLatRecovery.value = temp ? temp.results.coordsLatRecovery : false;
		detailItemResultsCoordsLongRecovery.value = temp ? temp.results.coordsLongRecovery : false;
		
		detailItemResultsAccelerationMax.value = temp ? temp.results.accelerationMax : false;
		detailItemResultsAccelerationMaxMeasurementUnitId.value = temp ? temp.accelerationMaxMeasurementUnitId ?? measurementUnitsAccelerationDefaultId.value : measurementUnitsAccelerationDefaultId.value;
		detailItemResultsAccelerationMaxMeasurementUnitsId.value = temp ? temp.accelerationMaxMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		detailItemResultsAltitudeMax.value = temp ? temp.results.altitudeMax : false;
		detailItemResultsAltitudeMaxMeasurementUnitId.value = temp ? temp.altitudeMaxMeasurementUnitId ?? measurementUnitsAltitudeDefaultId.value : measurementUnitsAltitudeDefaultId.value;
		detailItemResultsAltitudeMaxMeasurementUnitsId.value = temp ? temp.altitudeMaMeasurementxUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		detailItemResultsAltitudeDeployDrogue.value = temp ? temp.results.altitudeDeployDrogue : false;
		detailItemResultsAltitudeDeployDrogueMeasurementUnitId.value = temp ? temp.altitudeDeployDrogueMeasurementUnitId ?? measurementUnitsAltitudeDefaultId.value : measurementUnitsAltitudeDefaultId.value;
		detailItemResultsAltitudeDeployDrogueMeasurementUnitsId.value = temp ? temp.altitudeDeployDrogueMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		detailItemResultsAltitudeDeployMain.value = temp ? temp.results.altitudeDeployMain : false;
		detailItemResultsAltitudeDeployMainMeasurementUnitId.value = temp ? temp.altitudeDeployMainMeasurementUnitId ?? measurementUnitsAltitudeDefaultId.value : measurementUnitsAltitudeDefaultId.value;
		detailItemResultsAltitudeDeployMainMeasurementUnitsId.value = temp ? temp.altitudeDeployMainMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		detailItemResultsVelocityMax.value = temp ? temp.results.velocityMax : false;
		detailItemResultsVelocityMaxMeasurementUnitId.value = temp ? temp.velocityMaxMeasurementUnitId ?? measurementUnitsVelocityDefaultId.value : measurementUnitsVelocityDefaultId.value;
		detailItemResultsVelocityMaxMeasurementUnitsId.value = temp ? temp.velocityMaxMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		detailItemResultsVelocityRecovery.value = temp ? temp.results.velocityRecovery : false;
		detailItemResultsVelocityRecoveryMeasurementUnitId.value = temp ? temp.velocityRecoveryMeasurementUnitId ?? measurementUnitsVelocityDefaultId.value : measurementUnitsVelocityDefaultId.value;
		detailItemResultsVelocityRecoveryMeasurementUnitsId.value = temp ? temp.velocityRecoveryMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		getMotors();

		if (value)
			value.results = temp.results;
	};
	const rocketSetupName = (item) => {
		if (!item)
			return null;
		return item.name ? item.name : rocketSetupMotorNames(item)
	};
	const selectLocation = async (item) => {
		try {
			if (!item)
				return error('useLaunchEditComponent', 'selectPart', 'Invalid item.', null, null, null, correlationId);
			
			detailItemLocationId.value = item.id;
			detailItemLocationName.value = item.name;
			location.value = await requestLocation(correlationId(), item.id);
		}
		finally {
			dialogLocationLookupManager.value.ok();
		}
	};
	const selectMotor = async (item) => {
		try {
			if (!item)
				return;
			const temp = selectMotorByIndex(dialogPartsSearchMotorIndex.value);
			if (!temp)
				return;

			temp.motor.value = generateTitle(item.manufacturerId, item.name);
			temp.motorId.value = item.id;
		}
		finally {
			dialogPartsSearchMotorsManager.value.ok();
		}
	};
	const selectMotorByIndex = (index) => {
		const temp = {
			motor: null,
			motorCase: null,
			motorCaseId: null,
			motorCaseInfo: null,
			motorDiameter: null,
			motorDelay: null,
			motorId: null,
			motorInfo: null
		}

		if (index === 0) {
			temp.motor = detailItemMotor0;
			temp.motorCase = detailItemMotorCase0;
			temp.motorCaseId = detailItemMotorCaseId0;
			temp.motorCaseInfo = detailItemMotorCaseInfo0;
			temp.motorDelay = detailItemMotorDelay0;
			temp.motorDiameter = detailItemMotorDiameter0;
			temp.motorId = detailItemMotorId0;
			temp.motorInfo = detailItemMotorInfo0;
			return temp;
		}
		if (index === 1) {
			temp.motor = detailItemMotor1;
			temp.motorCase = detailItemMotorCase1;
			temp.motorCaseId = detailItemMotorCaseId1;
			temp.motorCaseInfo = detailItemMotorCaseInfo1;
			temp.motorDelay = detailItemMotorDelay1;
			temp.motorDiameter = detailItemMotorDiameter1;
			temp.motorId = detailItemMotorId1;
			temp.motorInfo = detailItemMotorInfo1;
			return temp;
		}
		if (index === 2) {
			temp.motor = detailItemMotor2;
			temp.motorCase = detailItemMotorCase2;
			temp.motorCaseId = detailItemMotorCaseId2;
			temp.motorCaseInfo = detailItemMotorCaseInfo2;
			temp.motorDelay = detailItemMotorDelay2;
			temp.motorDiameter = detailItemMotorDiameter2;
			temp.motorId = detailItemMotorId2;
			temp.motorInfo = detailItemMotorInfo2;
			return temp;
		}

		return null;
	};
	const selectMotorCase = async (item) => {
		try {
			if (!item)
				return;
			const temp = selectMotorByIndex(dialogPartsSearchMotorIndex.value);
			if (!temp)
				return;

			temp.motorCase.value = generateTitle(item.manufacturerId, item.name);
			temp.motorCaseId.value = item.id;
		}
		finally {
			dialogPartsSearchMotorCasesManager.value.ok();
		}
	};
	const selectRocket = async (item) => {
		try {
			if (!item)
				return error('useLaunchEditComponent', 'selectRocket', 'Invalid item.', null, null, null, correlationId);
			
			detailItemRocketId.value = item.id;
			detailItemRocketName.value = item.name;

			detailItemData.value.rocket = item;
			detailItemData.value.rocketSetup = {};
			detailItemData.value.rocketSetup.rocket = item;
		}
		finally {
			dialogRocketLookupManager.value.ok();
		}
	};
	const selectRocketSetup = async (item) => {
		try {
			if (!item)
				return error('useLaunchEditComponent', 'selectRocketSetup', 'Invalid item.', null, null, null, correlationId);

			detailItemData.value.rocketSetup = item;
			
			detailItemRocketSetupId.value = item.id;
			detailItemRocketSetupName.value = rocketSetupName(item);
		}
		finally {
			dialogRocketSetupLookupManager.value.ok();
		}
	};
	const setData = (correlationId) => {
		detailItemData.value.albumUrl = detailItemAlbumUrl.value;
		detailItemData.value.coverUrl = detailItemCoverUrl.value;
		detailItemData.value.date = detailItemDate.value;
		detailItemData.value.description = detailItemDescription.value;
		
		detailItemData.value.name = detailItemName.value;
		detailItemData.value.notes = detailItemNotes.value;
		detailItemData.value.public = detailItemPublic.value;

		detailItemData.value.locationId = detailItemLocationId.value;
		detailItemData.value.locationIterationId = detailItemLocationIterationId.value;

		detailItemData.value.rocketId = detailItemRocketId.value;
		detailItemData.value.rocketSetupId = detailItemRocketSetupId.value;
		
		detailItemData.value.success = detailItemSuccess.value;
		detailItemData.value.failureReasons = detailItemFailureReasons.value;

		detailItemData.value.temperature = LibraryClientUtility.convertNumber(detailItemTemperature.value);
		detailItemData.value.temperatureMeasurementUnitId = detailItemTemperatureMeasurementUnitId.value;
		detailItemData.value.temperatureMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.temperature.id, detailItemTemperatureMeasurementUnitId.value);
		
		detailItemData.value.videoUrl = detailItemVideoUrl.value;

		detailItemData.value.weather = detailItemWeather.value;

		detailItemData.value.windSpeed = LibraryClientUtility.convertNumber(detailItemWindSpeed.value);
		detailItemData.value.windSpeedMeasurementUnitId = detailItemWindSpeedMeasurementUnitId.value;
		detailItemData.value.windSpeedMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.velocity.id, detailItemWindSpeedMeasurementUnitId.value);

		detailItemData.value.results = detailItemData.results ?? {};

		detailItemData.value.results.coordsLatLaunch = detailItemResultsCoordsLatLaunch.value ? detailItemResultsCoordsLatLaunch.value : null;
		detailItemData.value.results.coordsLongLaunch = detailItemResultsCoordsLongLaunch.value ? detailItemResultsCoordsLongLaunch.value : null;
		detailItemData.value.results.coordsLatRecovery = detailItemResultsCoordsLatRecovery.value ? detailItemResultsCoordsLatRecovery.value : null;
		detailItemData.value.results.coordsLongRecovery = detailItemResultsCoordsLongRecovery.value ? detailItemResultsCoordsLongRecovery.value : null;

		detailItemData.value.results.accelerationMax = LibraryClientUtility.convertNumber(detailItemResultsAccelerationMax.value);
		detailItemData.value.results.accelerationMaxMeasurementUnitId = detailItemResultsAccelerationMaxMeasurementUnitId.value;
		detailItemData.value.results.accelerationMaxMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.acceleration.id, detailItemResultsAccelerationMaxMeasurementUnitId.value);
		
		detailItemData.value.results.altitudeMax = LibraryClientUtility.convertNumber(detailItemResultsAltitudeMax.value);
		detailItemData.value.results.altitudeMaxMeasurementUnitId = detailItemResultsAltitudeMaxMeasurementUnitId.value;
		detailItemData.value.results.altitudeMaxMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.altitude.id, detailItemResultsAltitudeMaxMeasurementUnitId.value);
		
		detailItemData.value.results.altitudeDeployDrogue = LibraryClientUtility.convertNumber(detailItemResultsAltitudeDeployDrogue.value);
		detailItemData.value.results.altitudeDeployDrogueMeasurementUnitId = detailItemResultsAltitudeDeployDrogueMeasurementUnitId.value;
		detailItemData.value.results.altitudeDeployDrogueMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.altitude.id, detailItemResultsAltitudeDeployDrogueMeasurementUnitId.value);
		
		detailItemData.value.results.altitudeDeployMain = LibraryClientUtility.convertNumber(detailItemResultsAltitudeDeployMain.value);
		detailItemData.value.results.altitudeDeployMainMeasurementUnitId = detailItemResultsAltitudeDeployMainMeasurementUnitId.value;
		detailItemData.value.results.altitudeDeployMainMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.altitude.id, detailItemResultsAltitudeDeployMainMeasurementUnitId.value);
		
		detailItemData.value.results.velocityMax = LibraryClientUtility.convertNumber(detailItemResultsVelocityMax.value);
		detailItemData.value.results.velocityMaxMeasurementUnitId = detailItemResultsVelocityMaxMeasurementUnitId.value;
		detailItemData.value.results.velocityMaxMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.velocity.id, detailItemResultsVelocityMaxMeasurementUnitId.value);
		
		detailItemData.value.results.velocityRecovery = LibraryClientUtility.convertNumber(detailItemResultsVelocityRecovery.value);
		detailItemData.value.results.velocityRecoveryMeasurementUnitId = detailItemResultsVelocityRecoveryMeasurementUnitId.value;
		detailItemData.value.results.velocityRecoveryMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.velocity.id, detailItemResultsVelocityRecoveryMeasurementUnitId.value);
	};

	watch(() => detailItemSuccess.value,
		(value, prev) => {
			if (prev === value)
				return;

			if (value !== AppCommonConstants.Rocketry.Launches.Reasons.Success.failed)
				detailItemFailureReasons.value = null;
		}
	);

	watch(() => detailItemLocationId.value,
		(value, prev) => {
			if (prev === value)
				return;

			detailItemLocationIterationId.value = null;
			detailItemLocationName.value = null;
		}
	);
	
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
		successResponse,
		isSaving,
		serverErrors,
		setErrors,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify,
		serviceStore,
		formControlRef,
		dirty,
		detailItem,
		dialogDeleteManager,
		dialogDeleteMessage,
		dialogDeleteParams,
		invalid,
		canDelete,
		detailItemData,
		detailItemTextRows,
		isDeleting,
		isEditable,
		isNew,
		dialogDeleteCancel,
		dialogDeleteError,
		dialogDeleteOk,
		dialogDeleteOpen,
		dirtyCallback,
		invalidCallback,
		handleCancel,
		handleClose,
		handleOk,
		preCompleteOk,
		resetAdditional,
		buttonsDialog,
		buttonsForms,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsAccelerationType,
		measurementUnitsAltitudeType,
		measurementUnitsTemperatureType,
		measurementUnitsVelocityType,
		displayItemMeasurement,
		displayItemMeasurementLength,
		measurementUnitsFromUnitId,
		failureReasons,
		successReasons,
		motorImpulseClasses,
		motorMountDiameters,
		motorCaseInfo,
		motorMountDiameter,
		motorMountName,
		motorUrl,
		markupHint,
		dialogDeleteConfirmationManager,
		dialogDeleteConfirmationMessage,
		dialogDeleteConfirmationParams,
		dialogLocationLookupManager,
		dialogRocketLookupManager,
		dialogRocketSetupLookupManager,
		detailItemAlbumUrl,
		detailItemCoverUrl,
		detailItemDate,
		detailItemDescription,
		detailItemFailureReasons,
		detailItemMotor0,
		detailItemMotor1,
		detailItemMotor2,
		detailItemMotorCase0,
		detailItemMotorCase1,
		detailItemMotorCase2,
		detailItemMotorCaseId0,
		detailItemMotorCaseId1,
		detailItemMotorCaseId2,
		detailItemMotorCaseInfo0,
		detailItemMotorCaseInfo1,
		detailItemMotorCaseInfo2,
		detailItemMotorDelay0,
		detailItemMotorDelay1,
		detailItemMotorDelay2,
		detailItemMotorDiameter0,
		detailItemMotorDiameter1,
		detailItemMotorDiameter2,
		detailItemMotorId0,
		detailItemMotorId1,
		detailItemMotorId2,
		detailItemMotorInfo0,
		detailItemMotorInfo1,
		detailItemMotorInfo2,
		detailItemName,
		detailItemNotes,
		detailItemPublic,
		detailItemLocationId,
		detailItemLocationIterationId,
		detailItemLocationName,
		detailItemResultsAccelerationMax,
		detailItemResultsAccelerationMaxMeasurementUnitId,
		detailItemResultsAccelerationMaxMeasurementUnitsId,
		detailItemResultsAltitudeMax,
		detailItemResultsAltitudeMaxMeasurementUnitId,
		detailItemResultsAltitudeMaxMeasurementUnitsId,
		detailItemResultsAltitudeDeployDrogue,
		detailItemResultsAltitudeDeployDrogueMeasurementUnitId,
		detailItemResultsAltitudeDeployDrogueMeasurementUnitsId,
		detailItemResultsAltitudeDeployMain,
		detailItemResultsAltitudeDeployMainMeasurementUnitId,
		detailItemResultsAltitudeDeployMainMeasurementUnitsId,
		detailItemResultsCoordsLatLaunch,
		detailItemResultsCoordsLongLaunch,
		detailItemResultsCoordsLatRecovery,
		detailItemResultsCoordsLongRecovery,
		detailItemResultsVelocityMax,
		detailItemResultsVelocityMaxMeasurementUnitId,
		detailItemResultsVelocityMaxMeasurementUnitsId,
		detailItemResultsVelocityRecovery,
		detailItemResultsVelocityRecoveryMeasurementUnitId,
		detailItemResultsVelocityRecoveryMeasurementUnitsId,
		detailItemRocketId,
		detailItemRocketName,
		detailItemRocketSetupId,
		detailItemRocketSetupName,
		detailItemSuccess,
		detailItemTemperature,
		detailItemTemperatureMeasurementUnitId,
		detailItemTemperatureMeasurementUnitsId,
		detailItemVideoUrl,
		detailItemWeather,
		detailItemWindSpeed,
		detailItemWindSpeedMeasurementUnitId,
		detailItemWindSpeedMeasurementUnitsId,
		dialogPartsSearchMotorsDiameter,
		dialogPartsSearchMotorsManager,
		hasMotorsI,
		manufacturerTypeMotor,
		manufacturerTypeMotorCase,
		weatherOptions,
		hasAdmin,
		isSuccess,
		locationIterations,
		clickRemoveLocation,
		clickRemoveRocket,
		clickRemoveRocketSetup,
		clickSearchLocations,
		clickSearchRockets,
		clickSearchRocketSetups,
		clickViewLocation,
		clickViewRocket,
		clickViewRocketSetup,
		dialogDeleteConfirmationCancel,
		dialogDeleteConfirmationError,
		dialogDeleteConfirmationOk,
		dialogDeleteConfirmationOpen,
		hasMotor,
		selectLocation,
		selectMotor,
		selectMotorByIndex,
		selectMotorCase,
		selectRocket,
		selectRocketSetup,
		scope: 'LaunchControl',
		validation: useVuelidate({ $scope: 'LaunchControl' })
	};
};
</script>
