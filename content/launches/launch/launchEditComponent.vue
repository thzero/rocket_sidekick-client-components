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
		measurementUnitsDistanceDefaultId,
		measurementUnitsTemperatureDefaultId,
		measurementUnitsTemperatureType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		displayItemMeasurement,
		displayItemMeasurementAcceleration,
		displayItemMeasurementLength,
		displayItemMeasurementTemperature,
		displayItemMeasurementVelocity,
		measurementUnitsFromUnitId,
		failureReasons,
		successReasons,
		weatherOptions
	} = useLaunchComponent(props, context);

	const {
		location,
		locationIterations,
		locationIterationName
	} = useLocationsUtilityComponent(props, context);

	const {
		rocketMotorNames
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
		detailItemNotes.value = value ? value.notes : false;

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
		
		if (value && value.rocketSetup) {
			if (value && value.rocketSetup.rocket) {
				detailItemRocketId.value = value.rocketSetup.rocket.id;
				detailItemRocketName.value = value.rocketSetup.rocket.name;
			}
			else {
				detailItemRocketId.value = null;
				detailItemRocketName.value = null;
			}
			
			detailItemRocketSetupId.value = value.rocketSetup.id;
			detailItemRocketSetupName.value = rocketName(value.rocketSetup);
		}
		else {
			detailItemRocketId.value = null;
			detailItemRocketName.value = null;
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

		if (value)
			value.results = temp.results;
	};
	const rocketName = (item) => {
		if (!item)
			return null;
		return item.name ? item.name : rocketMotorNames(item)
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
	const selectRocket = async (item) => {
		try {
			if (!item)
				return error('useLaunchEditComponent', 'selectRocket', 'Invalid item.', null, null, null, correlationId);
			
			detailItemRocketId.value = item.id;
			detailItemRocketName.value = item.name;
		}
		finally {
			dialogRocketLookupManager.value.ok();
		}
	};
	const selectRocketSetup = async (item) => {
		try {
			if (!item)
				return error('useLaunchEditComponent', 'selectRocketSetup', 'Invalid item.', null, null, null, correlationId);
			
			detailItemRocketSetupId.value = item.id;
			detailItemRocketSetupName.value = rocketName(item);
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
		detailItemName,
		detailItemNotes,
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
		selectLocation,
		selectRocket,
		selectRocketSetup,
		scope: 'LaunchControl',
		validation: useVuelidate({ $scope: 'LaunchControl' })
	};
};
</script>
