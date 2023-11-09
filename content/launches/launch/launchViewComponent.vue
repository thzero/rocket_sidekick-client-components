<script>
import { computed, ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useLaunchComponent } from '@/components/content/launches/launch/launchComponent';

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
		displayItemMeasurementAcceleration,
		displayItemMeasurementLength,
		displayItemMeasurementWeight,
		displayItemMeasurementVelocity,
		measurementUnitsFromUnitId,
		failureReasons,
		successReasons
	} = useLaunchComponent(props, context);

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
			temp = displayItem.value.location.iteration.address.city + ', ' + displayItem.value.location.iteration.address.stateProvince + ' ' + displayItem.value.location.iteration.address.country;
		if (displayItem.value.location.address)
			temp = displayItem.value.location.address.city + ', ' + displayItem.value.location.address.stateProvince + ' ' + displayItem.value.location.address.country;
		return temp;
	});
	const displayItemLocationName = computed(() => {
		return displayItem.value && displayItem.value.location ? displayItem.value.location.name + displayItemLocationIteration.value : '';
	});
	const displayItemResultsAltitudeDrogue = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.altitudeDrogue)
			return displayItemMeasurementAcceleration(correlationId(), displayItem.value, (value) => { return value.altitudeDrogue; }, (value) => { return value.altitudeDrogueMeasurementUnitsId; }, (value) => { return value.altitudeDrogueMeasurementUnitId; });
		return null;
	});
	const displayItemResultsAltitudeMain = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.altitudeMain)
			return displayItemMeasurementAcceleration(correlationId(), displayItem.value, (value) => { return value.altitudeMain; }, (value) => { return value.altitudeMainMeasurementUnitsId; }, (value) => { return value.altitudeMainMeasurementUnitId; });
		return null;
	});
	const displayItemResultsAltitudeMax = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.altitudeMax)
			return displayItemMeasurementAcceleration(correlationId(), displayItem.value, (value) => { return value.altitudeMax; }, (value) => { return value.altitudeMaxMeasurementUnitsId; }, (value) => { return value.altitudeMaxMeasurementUnitId; });
		return null;
	});
	const displayItemResultsAccelerationDrogue = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.accelerationDrogue)
			return displayItemMeasurementAcceleration(correlationId(), displayItem.value, (value) => { return value.accelerationDrogue; }, (value) => { return value.accelerationDrogueMeasurementUnitsId; }, (value) => { return value.accelerationDrogueMeasurementUnitId; });
		return null;
	});
	const displayItemResultsAccelerationMain = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.accelerationMain)
			return displayItemMeasurementAcceleration(correlationId(), displayItem.value, (value) => { return value.accelerationMain; }, (value) => { return value.accelerationMainMeasurementUnitsId; }, (value) => { return value.accelerationMainMeasurementUnitId; });
		return null;
	});
	const displayItemResultsAccelerationMax = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.accelerationMax)
			return displayItemMeasurementAcceleration(correlationId(), displayItem.value, (value) => { return value.accelerationMax; }, (value) => { return value.accelerationMaxMeasurementUnitsId; }, (value) => { return value.accelerationMaxMeasurementUnitId; });
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
		return [ 51.505, -0.09 ]; //displayItem.value ? [ displayItem.value.coordsLatLaunch, displayItem.value.coordsLatLong ] : '';
	});
	const displayItemResultsCoordsRecovery = computed(() => {
		return [ 51.503, -0.11] ; // displayItem.value ? [ displayItem.value.coordsLatRecovery, displayItem.value.coordsLatRecovery ] : '';
	});
	const displayItemResultsVelocityMax = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.velcoityMax)
			return displayItemMeasurementVelocity(correlationId(), displayItem.value, (value) => { return value.velcoityMax; }, (value) => { return value.velcoityMaxMeasurementUnitsId; }, (value) => { return value.velcoityMaxMeasurementUnitId; });
		return null;
	});
	const displayItemResultsVelocityRecovery = computed(() => {
		if (displayItem.value && displayItem.value.results && displayItem.value.results.velocityRecovery)
			return displayItemMeasurementAcceleration(correlationId(), displayItem.value, (value) => { return value.velocityRecovery; }, (value) => { return value.velocityRecoveryMeasurementUnitsId; }, (value) => { return value.velocityRecoveryMeasurementUnitId; });
		return null;
	});
	const displayItemRocketMame = computed(() => {
		return displayItem.value && displayItem.value.rocket ? displayItem.value.rocket.name : '';
	});
	const hasCoords = computed(() => {
		return hasCoordsLaunch.value || hasCoordsRecovery.value;
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
	const isFailure = computed(() => {
		return displayItem.value ? displayItem.value.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.failed : false;
	});
	const isSuccess = computed(() => {
		return displayItem.value ? displayItem.value.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.success : false;
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
		displayItemRocketMame,
		hasCoords,
		hasCoordsLaunch,
		hasCoordsRecovery,
		isFailure,
		isSuccess
	};
};
</script>
