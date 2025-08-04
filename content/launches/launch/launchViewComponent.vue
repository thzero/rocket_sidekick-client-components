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
		if (!displayItem.value)
			return null;
		// return (displayItem.value.date ? new Date(displayItem.value.date).toLocaleDateString() : '');
		return (displayItem.value.date ? LibraryMomentUtility.getDateHuman(displayItem.value.date) : '');
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
		// if (!displayItem.value || !displayItem.value.location)
		// 	return '';

		// let temp = '';
		// if (displayItem.value.location.iteration && displayItem.value.location.iteration.address)
		// 	// temp = displayItem.value.location.iteration.address.city + ', ' + displayItem.value.location.iteration.address.stateProvince + ' ' + displayItem.value.location.iteration.address.country;
		// 	temp = AppUtility.address(displayItem.value.location.iteration.address);

		// if (displayItem.value.location.address && (displayItem.value.location.address.city || displayItem.value.location.address.stateProvince || displayItem.value.location.address.country || displayItem.value.location.address.postalCode))
		// 	// temp = displayItem.value.location.address.city + ', ' + displayItem.value.location.address.stateProvince + ' ' + displayItem.value.location.address.country;
		// 	temp = AppUtility.address(displayItem.value.location.address);

		// return temp;
		return launchLocationIterationAddress(displayItem.value);
	});
	const displayItemLocationIterationCoords = computed(() => {
		// if (!displayItem.value || !displayItem.value.location || !displayItem.value.location.iteration)
		// 	return null;

		// if (displayItem.value.location.iteration.coordsLat || displayItem.value.location.iteration.coordsLong)
		// 	return [ displayItem.value.location.iteration.coordsLat, displayItem.value.location.iteration.coordsLong ];

		// return null;
		return launchLocationIterationCoords(displayItem.value);
	});
	const displayItemLocationName = computed(() => {
		// return displayItem.value && displayItem.value.location ? displayItem.value.location.name + displayItemLocationIteration.value : '';
		return launchLocationName(displayItem.value, displayItemLocationIteration.value);
	});
	const displayItemResultsAccelerationDrogue = computed(() => {
		// if (displayItem.value && displayItem.value.results && displayItem.value.results.accelerationDrogue)
		// 	return displayItemMeasurementAcceleration(correlationId(), displayItem.value.results, (value) => { return value.accelerationDrogue; }, (value) => { return value.accelerationDrogueMeasurementUnitsId; }, (value) => { return value.accelerationDrogueMeasurementUnitId; });
		// return null;
		return launchResultsAccelerationDrogue(displayItem.value);
	});
	const displayItemResultsAccelerationMain = computed(() => {
		// if (displayItem.value && displayItem.value.results && displayItem.value.results.accelerationMain)
		// 	return displayItemMeasurementAcceleration(correlationId(), displayItem.value.results, (value) => { return value.accelerationMain; }, (value) => { return value.accelerationMainMeasurementUnitsId; }, (value) => { return value.accelerationMainMeasurementUnitId; });
		// return null;
		return launchResultsAccelerationMain(displayItem.value);
	});
	const displayItemResultsAccelerationMax = computed(() => {
		// if (displayItem.value && displayItem.value.results && displayItem.value.results.accelerationMax)
		// 	return displayItemMeasurementAcceleration(correlationId(), displayItem.value.results, (value) => { return value.accelerationMax; }, (value) => { return value.accelerationMaxMeasurementUnitsId; }, (value) => { return value.accelerationMaxMeasurementUnitId; });
		// return null;
		return launchResultsAccelerationMax(displayItem.value);
	});
	const displayItemResultsAltitudeDrogue = computed(() => {
		// if (displayItem.value && displayItem.value.results && displayItem.value.results.altitudeDeployDrogue)
		// 	return displayItemMeasurementAltitude(correlationId(), displayItem.value.results, (value) => { return value.altitudeDeployDrogue; }, (value) => { return value.altitudeDeployDrogueMeasurementUnitsId; }, (value) => { return value.altitudeDeployDrogueMeasurementUnitId; });
		// return null;
		return launchResultsAltitudeDrogue(displayItem.value);
	});
	const displayItemResultsAltitudeMain = computed(() => {
		// if (displayItem.value && displayItem.value.results && displayItem.value.results.altitudeDeployMain)
		// 	return displayItemMeasurementAltitude(correlationId(), displayItem.value.results, (value) => { return value.altitudeDeployMain; }, (value) => { return value.altitudeDeployMainMeasurementUnitsId; }, (value) => { return value.altitudeDeployMainMeasurementUnitId; });
		// return null;
		return launchResultsAltitudeMain(displayItem.value);
	});
	const displayItemResultsAltitudeMax = computed(() => {
		// if (displayItem.value && displayItem.value.results && displayItem.value.results.altitudeMax)
		// 	return displayItemMeasurementAltitude(correlationId(), displayItem.value.results, (value) => { return value.altitudeMax; }, (value) => { return value.altitudeMaxMeasurementUnitsId; }, (value) => { return value.altitudeMaxMeasurementUnitId; });
		// return null;
		return launchResultsAltitudeMax(displayItem.value);
	});
	const displayItemResultsCoords = computed(() => {
		// let temp = displayItemResultsCoordsLaunch.value;
		// if (temp && temp.length > 1)
		// 	return temp;
		// temp = displayItemResultsCoordsLocation.value;
		// if (temp && temp.length > 1)
		// 	return temp;
		// temp = displayItemLocationIterationCoords.value;
		// if (temp && temp.length > 1)
		// 	return temp;
		// return null;
		return launchResultsCoords(displayItem.value);
	});
	const displayItemResultsCoordsLatLaunch = computed(() => {
		// return displayItem.value ? displayItem.value.coordsLatLaunch : '';
		return launchResultsCoordsLatLaunch(displayItem.value);
	});
	const displayItemResultsCoordsLongLaunch = computed(() => {
		// return displayItem.value ? displayItem.value.coordsLatLaunch : '';
		return launchResultsCoordsLongLaunch(displayItem.value);
	});
	const displayItemResultsCoordsLatRecovery = computed(() => {
		// return displayItem.value ? displayItem.value.coordsLatLaunch : '';
		return launchResultsCoordsLatRecovery(displayItem.value);
	});
	const displayItemResultsCoordsLongRecovery = computed(() => {
		// return displayItem.value ? displayItem.value.coordsLatLaunch : '';
		return launchResultsCoordsLongRecovery(displayItem.value);
	});
	const displayItemResultsCoordsLaunch = computed(() => {
		// return displayItem.value && displayItem.value.results && (displayItem.value.results.coordsLatLaunch || displayItem.value.results.coordsLongLaunch) ? [ displayItem.value.results.coordsLatLaunch, displayItem.value.results.coordsLongLaunch ] : null;
		return launchResultsCoordsLaunch(displayItem.value);
	});
	const displayItemResultsCoordsLocation = computed(() => {
		// return displayItem.value && (displayItem.value.coordsLat || displayItem.value.coordsLong) ? [ displayItem.value.coordsLat, displayItem.value.coordsLong ] : null;
		return launchResultsCoordsLocation(displayItem.value);
	});
	const displayItemResultsCoordsRecovery = computed(() => {
		// return displayItem.value && displayItem.value.results && (displayItem.value.results.coordsLatRecovery || displayItem.value.results.coordsLongRecovery) ? [ displayItem.value.results.coordsLatRecovery, displayItem.value.results.coordsLongRecovery ] : null;
		return launchResultsCoordsRecovery(displayItem.value);
	});
	const displayItemResultsVelocityMax = computed(() => {
		// if (displayItem.value && displayItem.value.results && displayItem.value.results.velocityMax)
		// 	return displayItemMeasurementVelocity(correlationId(), displayItem.value.results, (value) => { return value.velocityMax; }, (value) => { return value.velocityMaxMeasurementUnitsId; }, (value) => { return value.velocityMaxMeasurementUnitId; });
		// return null;
		return launchResultsVelocityMax(displayItem.value);
	});
	const displayItemResultsVelocityRecovery = computed(() => {
		// if (displayItem.value && displayItem.value.results && displayItem.value.results.velocityRecovery)
		// 	return displayItemMeasurementAcceleration(correlationId(), displayItem.value.results, (value) => { return value.velocityRecovery; }, (value) => { return value.velocityRecoveryMeasurementUnitsId; }, (value) => { return value.velocityRecoveryMeasurementUnitId; });
		// return null;
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
		// if (!displayItem.value || !displayItem.value.rocketSetup)
		// 	return null;
		// return rocketCgHighest(displayItem.value.rocketSetup.stages);
		return launchRocketCg(displayItem.value);
	});
	const displayItemRocketCp = computed(() => {
		// if (!displayItem.value || !displayItem.value.rocketSetup || !displayItem.value.rocketSetup.rocket)
		// 	return null;
		// return rocketCpHighest(displayItem.value.rocketSetup.rocket.stages);
		return launchRocketCp(displayItem.value);
	});
	const displayItemRocketDiameter = computed(() => {
		// if (!displayItem.value || !displayItem.value.rocketSetup || !displayItem.value.rocketSetup.rocket)
		// 	return null;
		// return rocketDiameterHighest(displayItem.value.rocketSetup.rocket.stages);
		return launchRocketDiameter(displayItem.value);
	});
	const displayItemRocketLength = computed(() => {
		// if (!displayItem.value || !displayItem.value.rocketSetup || !displayItem.value.rocketSetup.rocket)
		// 	return null;
		// return rocketLengthOverall(displayItem.value.rocketSetup.rocket.stages);
		return launchRocketLength(displayItem.value);
	});
	const displayItemRocketWeight = computed(() => {
		// if (!displayItem.value || !displayItem.value.rocketSetup)
		// 	return null;
		// return rocketWeightHighest(displayItem.value.rocketSetup.stages);
		return launchRocketWeight(displayItem.value);
	});
	const displayItemTemperature = computed(() => {
		// if (displayItem.value && displayItem.value.temperature)
		// 	return displayItemMeasurementTemperature(correlationId(), displayItem.value, (value) => { return value.temperature; }, (value) => { return value.temperatureMeasurementUnitsId; }, (value) => { return value.temperatureMeasurementUnitId; });
		// return null;
		return launchTemperature(displayItem.value);
	});
	const displayItemWindSpeed = computed(() => {
		// if (displayItem.value && displayItem.value.windSpeed)
		// 	return displayItemMeasurementVelocity(correlationId(), displayItem.value, (value) => { return value.windSpeed; }, (value) => { return value.windSpeedMeasurementUnitsId; }, (value) => { return value.windSpeedMeasurementUnitId; });
		// return null;
		return launchWindSpeed(displayItem.value);
	});
	const hasCoords = computed(() => {
		return hasLaunchResultsCoords(displayItem.value);
	});
	const hasCoordsLaunch = computed(() => {
		// if (!displayItem.value || !displayItem.value.results)
		// 	return false;

		// return (
		// 	displayItem.value.results.coordsLatLaunch || 
		// 	displayItem.value.results.coordsLongLaunch
		// );
		return hasLaunchResultsCoordsLaunch(displayItem.value);
	});
	const hasCoordsLocation = computed(() => {
		// return (
		// 	displayItem.value.coordsLat || 
		// 	displayItem.value.coordsLong
		// );
		return hasLaunchResultsCoordsLocation(displayItem.value);
	});
	const hasCoordsLocationIteration = computed(() => {
		// if (!displayItem.value || !displayItem.value.location || !displayItem.value.location.iteration)
		// 	return false;

		// return (
		// 	displayItem.value.location.iteration.coordsLat || 
		// 	displayItem.value.location.iteration.coordsLong
		// );
		return hasCoordsLocationIteration(displayItem.value);
	});
	const hasCoordsRecovery = computed(() => {
		// if (!displayItem.value || !displayItem.value.results)
		// 	return false;

		// return (
		// 	displayItem.value.results.coordsLatRecovery || 
		// 	displayItem.value.results.coordsLongRecovery
		// );
		return hasLaunchResultsCoordsRecovery(displayItem.value);
	});
	const hasResults = computed(() => {
		// if (!displayItem.value || !displayItem.value.results)
		// 	return false;

		// return (
		// 	displayItem.value.results.accelerationMax || 
		// 	displayItem.value.results.altitudeMax || 
		// 	displayItem.value.results.altitudeDeployDrogue || 
		// 	displayItem.value.results.altitudeDeployMain || 
		// 	displayItem.value.results.velocityMax || 
		// 	displayItem.value.results.velocityRecovery
		// );
		return hasLaunchResults(displayItem.value);
	});
	const hasRocketSpecs = computed(() => {
		// return displayItemRocketCg.value || displayItemRocketCp.value || displayItemRocketDiameter.value || displayItemRocketLength.value || displayItemRocketWeight.value;
		return hasLaunchRocketSpecs(displayItem.value);
	});
	const hasWeather = computed(() => {
		// if (!displayItem.value)
		// 	return false;

		// return (
		// 	displayItem.value.temperature || 
		// 	displayItem.value.windSpeed || 
		// 	(displayItem.value.weather && displayItem.value.weather.length > 0)
		// );
		return hasLaunchWeather(displayItem.value);
	});
	const isFailure = computed(() => {
		// return displayItem.value ? displayItem.value.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.failed : false;
		return isLaunchFailure(displayItem.value);
	});
	const isSuccess = computed(() => {
		// return displayItem.value ? displayItem.value.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.success : false;
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
