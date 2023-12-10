<script>
import { computed, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentMarkupComponent } from '@/components/content/contentMarkup';
import { useDetailComponent } from '@/components/content/detailComponent';
import { useLaunchComponent } from '@/components/content/launches/launch/launchComponent';

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
		isOwner,
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
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		displayItemMeasurement,
		displayItemMeasurementLength,
		displayItemMeasurementWeight,
		measurementUnitsFromUnitId,
		failureReasons,
		successReasons,
		locationIterationName
	} = useLaunchComponent(props, context);
	
	const {
		markupHint
	} = useContentMarkupComponent(props, context);
	
	const dialogLocationLookupManager = ref(new DialogSupport());
	const dialogRocketLookupManager = ref(new DialogSupport());
	const detailItemAlbumUrl = ref(null);
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
	const detailItemVelocityRecoveryMeasurementUnitId = ref(null);
	const detailItemVelocityRecoveryMeasurementUnitsId = ref(null);
	const detailItemRocketId = ref(null);
	const detailItemRocketName = ref(null);
	const detailItemSuccess = ref(null);
	const detailItemTemperature = ref(null);
	const detailItemTemperatureMeasurementUnitId = ref(null);
	const detailItemTemperatureMeasurementUnitsId = ref(null);
	const detailItemVideoUrl = ref(null);
	const detailItemWindSpeed = ref(null);
	const detailItemWindSpeedMeasurementUnitId = ref(null);
	const detailItemWindSpeedMeasurementUnitsId = ref(null);
	
	const location = ref(null);
	
	const hasAdmin = computed(() => {
		return false;
	});
	const isSuccess = computed(() => {
		return detailItemSuccess.value === AppCommonConstants.Rocketry.Launches.Reasons.Success.success;
	});
	const locationIterations = computed(() => {
		if (location.value)
			return LibraryClientVueUtility.selectBlank(location.value.iterations.map(l => { return { id : l.id, name: locationIterationName(l) }; }), '');

		return [];
	});

	const clickSearchLocations = async (correlationId) => {
		dialogLocationLookupManager.value.open();
	};
	const clickSearchRockets = async (correlationId) => {
		dialogRocketLookupManager.value.open();
	};
	// const locationIterationName = (item) => {
	// 	let output = '';
	// 	if (item.number)
	// 		output += item.number + ' ';
	// 	if (item.year)
	// 		output += item.year + ' ';
	// 	return output.trim();
	// };
	const requestLocation = async (correlationId, id) => {
		const response = await serviceStore.dispatcher.requestLocationById(correlationId, id);
		return hasSucceeded(response) ? response.results : null;
	};
	const resetData = (correlationId, value) => {
		detailItemAlbumUrl.value = value ? value.albumUrl : null;
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
		if (value && value.rocket) {
			detailItemRocketId.value = value.rocket.id;
			detailItemRocketName.value = value.rocket.name;
		}
		else {
			detailItemRocketId.value = null;
			detailItemRocketName.value = null;
		}

		detailItemSuccess.value = value ? value.success : false;
		detailItemFailureReasons.value = value  ? value.failureReasons : null;
		
		detailItemTemperature.value = value ? value.temperature : null;

		detailItemVideoUrl.value = value ? value.videoUrl : null;
		
		detailItemWindSpeed.value = value ? value.windSpeed : null;

		value.results = value.results ?? {};
		detailItemResultsCoordsLatLaunch.value = value ? value.results.coordsLatLaunch : false;
		detailItemResultsCoordsLongLaunch.value = value ? value.results.coordsLongLaunch : false;
		detailItemResultsCoordsLatRecovery.value = value ? value.results.coordsLatRecovery : false;
		detailItemResultsCoordsLongRecovery.value = value ? value.results.coordsLongRecovery : false;
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
				return error('useuseLaunchEditComponent', 'selectPart', 'Invalid item.', null, null, null, correlationId);
			
			detailItemRocketId.value = item.id;
			detailItemRocketName.value = item.name;
		}
		finally {
			dialogRocketLookupManager.value.ok();
		}
	};
	const setData = (correlationId) => {
		detailItemData.value.albumUrl = detailItemAlbumUrl.value;
		detailItemData.value.date = detailItemDate.value;
		detailItemData.value.description = detailItemDescription.value;
		
		detailItemData.value.name = detailItemName.value;
		detailItemData.value.notes = detailItemNotes.value;

		detailItemData.value.locationId = detailItemLocationId.value;
		detailItemData.value.locationIterationId = detailItemLocationIterationId.value;
		detailItemData.value.rocketId = detailItemRocketId.value;
		
		detailItemData.value.success = detailItemSuccess.value;
		detailItemData.value.failureReasons = detailItemFailureReasons.value;

		detailItemData.value.temperature = Number(detailItemTemperature.value);
		
		detailItemData.value.videoUrl = detailItemVideoUrl.value;

		detailItemData.value.windSpeed =Number(detailItemWindSpeed.value);

		detailItemData.value.results = detailItemData.results ?? {};

		detailItemData.value.results.coordsLatLaunch = detailItemResultsCoordsLatLaunch.value ? detailItemResultsCoordsLatLaunch.value : null;
		detailItemData.value.results.coordsLongLaunch = detailItemResultsCoordsLongLaunch.value ? detailItemResultsCoordsLongLaunch.value : null;
		detailItemData.value.results.coordsLatRecovery = detailItemResultsCoordsLatRecovery.value ? detailItemResultsCoordsLatRecovery.value : null;
		detailItemData.value.results.coordsLongRecovery = detailItemResultsCoordsLongRecovery.value ? detailItemResultsCoordsLongRecovery.value : null;
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
		isOwner,
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
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		displayItemMeasurement,
		displayItemMeasurementLength,
		displayItemMeasurementWeight,
		measurementUnitsFromUnitId,
		failureReasons,
		successReasons,
		locationIterationName,
		markupHint,
		dialogLocationLookupManager,
		dialogRocketLookupManager,
		detailItemAlbumUrl,
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
		detailItemVelocityRecoveryMeasurementUnitId,
		detailItemVelocityRecoveryMeasurementUnitsId,
		detailItemRocketId,
		detailItemRocketName,
		detailItemSuccess,
		detailItemTemperature,
		detailItemTemperatureMeasurementUnitId,
		detailItemTemperatureMeasurementUnitsId,
		detailItemVideoUrl,
		detailItemWindSpeed,
		detailItemWindSpeedMeasurementUnitId,
		detailItemWindSpeedMeasurementUnitsId,
		hasAdmin,
		isSuccess,
		locationIterations,
		clickSearchLocations,
		clickSearchRockets,
		selectLocation,
		selectRocket,
		scope: 'LaunchControl',
		validation: useVuelidate({ $scope: 'LaunchControl' })
	};
};
</script>
