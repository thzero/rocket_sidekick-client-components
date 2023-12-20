<script>
import { computed, ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

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
		locationIterationName
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
		rocketCp,
		rocketDiameter,
		rocketLength,
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
		rocketWeight
	} = useRocketsUtilityComponent(props, context, options);

	const displayItem = computed(() => {
		return props.detailItem ? props.detailItem : {};
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
		if (displayItem.value.location.iteration.name)
			temp.push(displayItem.value.location.iteration.name);
		if (displayItem.value.location.iteration.number)
			temp.push('#'+displayItem.value.location.iteration.number);
		if (displayItem.value.location.iteration.year)
			temp.push(displayItem.value.location.iteration.year);
		if (!temp)
			return '';
		return ` (${temp.join(', ')})`;
	});
	const displayItemLocationIterationAddress = computed(() => {
		if (!displayItem.value || !displayItem.value.location)
			return '';

		let temp = '';
		if (displayItem.value.location.iteration && displayItem.value.location.iteration.address)
			// temp = displayItem.value.location.iteration.address.city + ', ' + displayItem.value.location.iteration.address.stateProvince + ' ' + displayItem.value.location.iteration.address.country;
			temp = AppUtility.address(displayItem.value.location.iteration.address);
		if (displayItem.value.location.address)
			// temp = displayItem.value.location.address.city + ', ' + displayItem.value.location.address.stateProvince + ' ' + displayItem.value.location.address.country;
			temp = AppUtility.address(displayItem.value.location.address);
		return temp;
	});
	const displayItemLocationName = computed(() => {
		return displayItem.value && displayItem.value.location ? displayItem.value.location.name + displayItemLocationIteration.value : '';
	});
	const displayItemResultsAccelerationDrogue = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.accelerationDrogue)
			return displayItemMeasurementAcceleration(correlationId(), displayItem.value.results, (value) => { return value.accelerationDrogue; }, (value) => { return value.accelerationDrogueMeasurementUnitsId; }, (value) => { return value.accelerationDrogueMeasurementUnitId; });
		return null;
	});
	const displayItemResultsAccelerationMain = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.accelerationMain)
			return displayItemMeasurementAcceleration(correlationId(), displayItem.value.results, (value) => { return value.accelerationMain; }, (value) => { return value.accelerationMainMeasurementUnitsId; }, (value) => { return value.accelerationMainMeasurementUnitId; });
		return null;
	});
	const displayItemResultsAccelerationMax = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.accelerationMax)
			return displayItemMeasurementAcceleration(correlationId(), displayItem.value.results, (value) => { return value.accelerationMax; }, (value) => { return value.accelerationMaxMeasurementUnitsId; }, (value) => { return value.accelerationMaxMeasurementUnitId; });
		return null;
	});
	const displayItemResultsAltitudeDrogue = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.altitudeDeployDrogue)
			return displayItemMeasurementAltitude(correlationId(), displayItem.value.results, (value) => { return value.altitudeDeployDrogue; }, (value) => { return value.altitudeDeployDrogueMeasurementUnitsId; }, (value) => { return value.altitudeDrogueMeasurementUnitId; });
		return null;
	});
	const displayItemResultsAltitudeMain = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.altitudeDeployMain)
			return displayItemMeasurementAltitude(correlationId(), displayItem.value.results, (value) => { return value.altitudeDeployMain; }, (value) => { return value.altitudeDeployMainMeasurementUnitsId; }, (value) => { return value.altitudeMainMeasurementUnitId; });
		return null;
	});
	const displayItemResultsAltitudeMax = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.altitudeMax)
			return displayItemMeasurementAltitude(correlationId(), displayItem.value.results, (value) => { return value.altitudeMax; }, (value) => { return value.altitudeMaxMeasurementUnitsId; }, (value) => { return value.altitudeMaxMeasurementUnitId; });
		return null;
	});
	const displayItemResultsCoordsLatLaunch = computed(() => {
		return displayItem.value ? displayItem.value.coordsLatLaunch : '';
	});
	const displayItemResultsCoordsLongLaunch = computed(() => {
		return displayItem.value ? displayItem.value.coordsLatLaunch : '';
	});
	const displayItemResultsCoordsLatRecovery = computed(() => {
		return displayItem.value ? displayItem.value.coordsLatLaunch : '';
	});
	const displayItemResultsCoordsLongRecovery = computed(() => {
		return displayItem.value ? displayItem.value.coordsLatLaunch : '';
	});
	const displayItemResultsCoordsLaunch = computed(() => {
		return displayItem.value && displayItem.value.results ? [ displayItem.value.results.coordsLatLaunch, displayItem.value.results.coordsLongLaunch ] : '';
	});
	const displayItemResultsCoordsRecovery = computed(() => {
		return displayItem.value && displayItem.value.results ? [ displayItem.value.results.coordsLatRecovery, displayItem.value.results.coordsLongRecovery ] : '';
	});
	const displayItemResultsVelocityMax = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.velocityMax)
			return displayItemMeasurementVelocity(correlationId(), displayItem.value.results, (value) => { return value.velocityMax; }, (value) => { return value.velocityMaxMeasurementUnitsId; }, (value) => { return value.velocityMaxMeasurementUnitId; });
		return null;
	});
	const displayItemResultsVelocityRecovery = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.velocityRecovery)
			return displayItemMeasurementAcceleration(correlationId(), displayItem.value.results, (value) => { return value.velocityRecovery; }, (value) => { return value.velocityRecoveryMeasurementUnitsId; }, (value) => { return value.velocityRecoveryMeasurementUnitId; });
		return null;
	});
	const displayItemRocketCoverUrl = computed(() => {
		return displayItem.value && displayItem.value.rocketSetup && displayItem.value.rocketSetup.rocket ? displayItem.value.rocketSetup.rocket.coverUrl : '';
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
	const displayItemTemperature = computed(() => {
		if (displayItem.value && displayItem.value.temperature)
			return displayItemMeasurementTemperature(correlationId(), displayItem.value, (value) => { return value.temperature; }, (value) => { return value.temperatureMeasurementUnitsId; }, (value) => { return value.temperatureMeasurementUnitId; });
		return null;
	});
	const displayItemWindSpeed = computed(() => {
		if (displayItem.value && displayItem.value.windSpeed)
			return displayItemMeasurementVelocity(correlationId(), displayItem.value, (value) => { return value.windSpeed; }, (value) => { return value.windSpeedMeasurementUnitsId; }, (value) => { return value.windSpeedMeasurementUnitId; });
		return null;
	});
	
	const displayItemRocketCg = computed(() => {
		if (!displayItem.value || !displayItem.value.rocketSetup)
			return null;
		return rocketCg(displayItem.value.rocketSetup.stages);
	});
	const displayItemRocketCp = computed(() => {
		if (!displayItem.value || !displayItem.value.rocketSetup || !displayItem.value.rocketSetup.rocket)
			return null;
		return rocketCp(displayItem.value.rocketSetup.rocket.stages);
	});
	const displayItemRocketDiameter = computed(() => {
		if (!displayItem.value || !displayItem.value.rocketSetup || !displayItem.value.rocketSetup.rocket)
			return null;
		return rocketDiameter(displayItem.value.rocketSetup.rocket.stages);
	});
	const displayItemRocketLength = computed(() => {
		if (!displayItem.value || !displayItem.value.rocketSetup || !displayItem.value.rocketSetup.rocket)
			return null;
		return rocketLength(displayItem.value.rocketSetup.rocket.stages);
	});
	const displayItemRocketWeight = computed(() => {
		if (!displayItem.value || !displayItem.value.rocketSetup)
			return null;
		return rocketWeight(displayItem.value.rocketSetup.stages);
	});

	const hasCoords = computed(() => {
		return hasCoordsLaunch.value && hasCoordsRecovery.value;
	});
	const hasCoordsLaunch = computed(() => {
		if (!displayItem.value || !displayItem.value.results)
			return false;

		return (
			displayItem.value.results.coordsLatLaunch || 
			displayItem.value.results.coordsLongLaunch
		);
	});
	const hasCoordsRecovery = computed(() => {
		if (!displayItem.value || !displayItem.value.results)
			return false;

		return (
			displayItem.value.results.coordsLatRecovery || 
			displayItem.value.results.coordsLongRecovery
		);
	});
	const hasResults = computed(() => {
		if (!displayItem.value || !displayItem.value.results)
			return false;

		return (
			displayItem.value.results.accelerationMax || 
			displayItem.value.results.altitudeMax || 
			displayItem.value.results.altitudeDeployDrogue || 
			displayItem.value.results.altitudeDeployMain || 
			displayItem.value.results.velocityMax || 
			displayItem.value.results.velocityRecovery
		);
	});
	const hasRocketSpecs = computed(() => {
		return displayItemRocketCg.value || displayItemRocketCp.value || displayItemRocketDiameter.value || displayItemRocketLength.value || displayItemRocketWeight.value;
	});
	const hasWeather = computed(() => {
		if (!displayItem.value)
			return false;

		return (
			displayItem.value.temperature || 
			displayItem.value.windSpeed
		);
	});
	const isFailure = computed(() => {
		return displayItem.value ? displayItem.value.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.failed : false;
	});
	const isSuccess = computed(() => {
		return displayItem.value ? displayItem.value.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.success : false;
	});
	
	const clickViewLocation = async (item) => {
		if (!item)
			return;
		LibraryClientUtility.$navRouter.push('/user/locations/' + item.id);
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
		displayItemLocationLink,
		displayItemLocationIteration,
		displayItemLocationIterationAddress,
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
		displayItemResultsCoordsLaunch,
		displayItemResultsCoordsRecovery,
		displayItemResultsVelocityMax,
		displayItemResultsVelocityRecovery,
		displayItemRocketCg,
		displayItemRocketCoverUrl,
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
