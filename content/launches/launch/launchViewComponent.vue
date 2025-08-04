<script>
import { computed } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useLaunchComponent } from '@/components/content/launches/launch/launchComponent';
import { useMotorUtilityComponent } from '@/components/external/motorUtilityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useLaunchViewComponent(props, context, options) {
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
		motorImpulseClasses,
		motorMountDiameters,
		motorCaseInfo,
		motorMountDiameter,
		motorMountName,
		motorUrl
	} = useMotorUtilityComponent(props, context);

	const {
		rocketTypes,
		hasCoverUrl,
		rocketCg,
		rocketCgHighest,
		rocketCp,
		rocketCpHighest,
		rocketDiameter,
		rocketDiameterHighest,
		rocketLength,
		rocketLengthHighest,
		rocketLengthOverall,
		rocketManufacturer,
		rocketMotorMountName,
		rocketMotorMountNames,
		rocketMotorNames,
		rocketMotorNamesByStage,
		rocketMotors,
		rocketStagePrimary,
		rocketStages,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rocketTypeName,
		rocketTypeNames,
		rocketWeight,
		rocketWeightHighest
	} = useRocketsUtilityComponent(props, context, options);

	const displayItem = computed(() => {
		return props.detailItem ? props.detailItem : {};
	});
	const displayItemAlbumUrl = computed(() => {
		return displayItem.value && displayItem.value.albumUrl ? displayItem.value.albumUrl : null;
	});
	const displayItemCoverUrl = computed(() => {
		if (!displayItem.value)
			return null;
		if (displayItem.value.coverUrl)
			return displayItem.value.coverUrl;
		return displayItem.value.rocketSetup && displayItem.value.rocketSetup.rocket ? displayItem.value.rocketSetup.rocket.coverUrl : null;
	});
	const displayItemDate = computed(() => {
		return launchDate(displayItem.value);
	});
	const displayItemLocationLink = computed(() => {
		if (!displayItem.value || !displayItem.value.location)
			return null;
		return '/user/locations/' + displayItem.value.location.id + (displayItem.value.location.iteration ? ('/' + displayItem.value.location.iteration.id) : '');
	});
	const displayItemLocationIteration = computed(() => {
		if (!displayItem.value || !displayItem.value.location || !displayItem.value.location.iteration)
			return '';
		let temp = [];
		// if (displayItem.value.location.iteration.name)
		// 	temp.push(displayItem.value.location.iteration.name);
		if (displayItem.value.location.iteration.number)
			temp.push('#'+displayItem.value.location.iteration.number);
		if (displayItem.value.location.iteration.year)
			temp.push(displayItem.value.location.iteration.year);
		if (!temp)
			return '';
		return ` (${temp.join(', ')})`;
	});
	const displayItemLocationIterationAddress = computed(() => {
		return launchLocationIterationAddress(displayItem.value);
	});
	const displayItemLocationIterationCoords = computed(() => {
		return launchLocationIterationCoords(displayItem.value);
	});
	const displayItemLocationName = computed(() => {
		return launchLocationName(displayItem.value, displayItemLocationIteration.value);
	});
	const displayItemResultsAccelerationDrogue = computed(() => {
		return launchResultsAccelerationDrogue(displayItem.value);
	});
	const displayItemResultsAccelerationMain = computed(() => {
		return launchResultsAccelerationMain(displayItem.value);
	});
	const displayItemResultsAccelerationMax = computed(() => {
		return launchResultsAccelerationMax(displayItem.value);
	});
	const displayItemResultsAltitudeDrogue = computed(() => {
		return launchResultsAltitudeDrogue(displayItem.value);
	});
	const displayItemResultsAltitudeMain = computed(() => {
		return launchResultsAltitudeMain(displayItem.value);
	});
	const displayItemResultsAltitudeMax = computed(() => {
		return launchResultsAltitudeMax(displayItem.value);
	});
	const displayItemResultsCoords = computed(() => {
		return launchResultsCoords(displayItem.value);
	});
	const displayItemResultsCoordsLatLaunch = computed(() => {
		return launchResultsCoordsLatLaunch(displayItem.value);
	});
	const displayItemResultsCoordsLongLaunch = computed(() => {
		return launchResultsCoordsLongLaunch(displayItem.value);
	});
	const displayItemResultsCoordsLatRecovery = computed(() => {
		return launchResultsCoordsLatRecovery(displayItem.value);
	});
	const displayItemResultsCoordsLongRecovery = computed(() => {
		return launchResultsCoordsLongRecovery(displayItem.value);
	});
	const displayItemResultsCoordsLaunch = computed(() => {
		return launchResultsCoordsLaunch(displayItem.value);
	});
	const displayItemResultsCoordsLocation = computed(() => {
		return launchResultsCoordsLocation(displayItem.value);
	});
	const displayItemResultsCoordsRecovery = computed(() => {
		return launchResultsCoordsRecovery(displayItem.value);
	});
	const displayItemResultsVelocityMax = computed(() => {
		return launchResultsVelocityMax(displayItem.value);
	});
	const displayItemResultsVelocityRecovery = computed(() => {
		return launchResultsVelocityRecovery(displayItem.value);
	});
	const displayItemRocketMotorNames = computed(() => {
		if (!displayItem.value || !displayItem.value.rocketSetup)
			return null;
		return rocketMotorNames(displayItem.value.rocketSetup, '\n');
	});
	const displayItemRocketMotors = computed(() => {
		if (!displayItem.value || !displayItem.value.rocketSetup)
			return [];
		return rocketMotors(displayItem.value.rocketSetup) ?? [];
	});
	const displayItemRocketMame = computed(() => {
		return displayItem.value && displayItem.value.rocketSetup && displayItem.value.rocketSetup.rocket ? displayItem.value.rocketSetup.rocket.name : '';
	});
	const displayItemRocketCg = computed(() => {
		return launchRocketCg(displayItem.value);
	});
	const displayItemRocketCp = computed(() => {
		return launchRocketCp(displayItem.value);
	});
	const displayItemRocketDiameter = computed(() => {
		return launchRocketDiameter(displayItem.value);
	});
	const displayItemRocketLength = computed(() => {
		return launchRocketLength(displayItem.value);
	});
	const displayItemRocketWeight = computed(() => {
		return launchRocketWeight(displayItem.value);
	});
	const displayItemTemperature = computed(() => {
		return launchTemperature(displayItem.value);
	});
	const displayItemWindSpeed = computed(() => {
		return launchWindSpeed(displayItem.value);
	});
	const hasCoords = computed(() => {
		return hasLaunchResultsCoords(displayItem.value);
	});
	const hasCoordsLaunch = computed(() => {
		return hasLaunchResultsCoordsLaunch(displayItem.value);
	});
	const hasCoordsLocation = computed(() => {
		return hasLaunchResultsCoordsLocation(displayItem.value);
	});
	const hasCoordsLocationIteration = computed(() => {
		return hasCoordsLocationIteration(displayItem.value);
	});
	const hasCoordsRecovery = computed(() => {
		return hasLaunchResultsCoordsRecovery(displayItem.value);
	});
	const hasResults = computed(() => {
		return hasLaunchResults(displayItem.value);
	});
	const hasRocketSpecs = computed(() => {
		return hasLaunchRocketSpecs(displayItem.value);
	});
	const hasWeather = computed(() => {
		return hasLaunchWeather(displayItem.value);
	});
	const isFailure = computed(() => {
		return isLaunchFailure(displayItem.value);
	});
	const isSuccess = computed(() => {
		return isLaunchSuccess(displayItem.value);
	});
	
	const clickViewLocation = async (item) => {
		if (!item)
			return;
		LibraryClientUtility.$navRouter.push('/user/locations/' + item.locationId);
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
		buttonsForms,
		measurementUnitsIdOutput,
		displayItemMeasurement,
		displayItemMeasurementLength,
		measurementUnitsFromUnitId,
		motorUrl,
		failureReasons,
		successReasons,
		weatherOptions,
		displayItem,
		displayItemAlbumUrl,
		displayItemCoverUrl,
		displayItemDate,
		displayItemLocationLink,
		displayItemLocationIteration,
		displayItemLocationIterationAddress,
		displayItemLocationIterationCoords,
		displayItemLocationName,
		displayItemResultsAccelerationDrogue,
		displayItemResultsAccelerationMain,
		displayItemResultsAccelerationMax,
		displayItemResultsAltitudeDrogue,
		displayItemResultsAltitudeMain,
		displayItemResultsAltitudeMax,
		displayItemResultsCoordsLatLaunch,
		displayItemResultsCoordsLongLaunch,
		displayItemResultsCoordsLatRecovery,
		displayItemResultsCoordsLongRecovery,
		displayItemResultsCoords,
		displayItemResultsCoordsLaunch,
		displayItemResultsCoordsLocation,
		displayItemResultsCoordsRecovery,
		displayItemResultsVelocityMax,
		displayItemResultsVelocityRecovery,
		displayItemRocketCg,
		displayItemRocketCp,
		displayItemRocketDiameter,
		displayItemRocketLength,
		displayItemRocketMotorNames,
		displayItemRocketMotors,
		displayItemRocketMame,
		displayItemRocketWeight,
		displayItemTemperature,
		displayItemWindSpeed,
		hasCoords,
		hasCoordsLaunch,
		hasCoordsLocation,
		hasCoordsRecovery,
		hasResults,
		hasRocketSpecs,
		hasWeather,
		isFailure,
		isSuccess,
		clickViewLocation
	};
};
</script>
