<script>
import { ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementUtilityComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useLaunchComponent(props, context, options) {
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
		measurementUnitsAltitudeDefaultId,
		measurementUnitsAltitudeType,
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
		measurementUnitsFromUnitId
	} = useToolsMeasurementUtilityComponent(props, context);
	
	const {
		rocketTypes,
		hasCoverUrl: hasCoverUrlRocket,
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

	const failureReasons = ref(Object.getOwnPropertyNames(AppCommonConstants.Rocketry.Launches.Reasons.Failure).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('strings.content.launches.reasons.failure.' + item) }; }));
	const successReasons = ref(Object.getOwnPropertyNames(AppCommonConstants.Rocketry.Launches.Reasons.Success).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('strings.content.launches.reasons.success.' + item) }; }));
	
	const weatherOptions = LibraryClientVueUtility.selectOptions(Object.getOwnPropertyNames(AppCommonConstants.Rocketry.Launches.Weather), LibraryClientUtility.$trans.t, 'strings.content.launches.weather');
	
	const hasLaunchCoverUrl = (item) => {
		if (!item)
			return false;
		if (!String.isNullOrEmpty(item.coverUrl))
			return true;
		return hasCoverUrlRocket(item.rocketSetup ? item.rocketSetup.rocket : null);
	};
	const hasLaunchResults = (item) => {
		if (!item || !item.results)
			return false;

		return (
			item.results.accelerationMax || 
			item.results.altitudeMax || 
			item.results.altitudeDeployDrogue || 
			item.results.altitudeDeployMain || 
			item.results.velocityMax || 
			item.results.velocityRecovery
		);
	};
	const hasLaunchResultsCoords = (item) => {
		if (!item || !item.results)
			return false;

		return (
			item.results.coordsLatLaunch || 
			item.results.coordsLongLaunch
		);
	};
	const hasLaunchResultsCoordsLaunch = (item) => {
		return (
			item.coordsLat || 
			item.coordsLong
		);
	};
	const hasLaunchResultsCoordsLocation = (item) => {
		if (!item || !item.location || !item.location.iteration)
			return false;

		return (
			item.location.iteration.coordsLat || 
			item.location.iteration.coordsLong
		);
	};
	const hasCoordsLocationIteration = (item) => {
		if (!item || !item.location || !item.location.iteration)
			return false;

		return (
			item.location.iteration.coordsLat || 
			item.location.iteration.coordsLong
		);
	};
	const hasLaunchResultsCoordsRecovery = (item) => {
		if (!item || !item.results)
			return false;

		return (
			item.results.coordsLatRecovery || 
			item.results.coordsLongRecovery
		);
	};
	const hasLaunchRocketSpecs = (item) => {
		return launchRocketCg(item) || launchRocketCp(item) || launchRocketDiameter(item) || launchRocketLength(item) || launchRocketWeight(item);
	};
	const hasLaunchWeather = (item) => {
		if (!item)
			return false;

		return (
			item.temperature || 
			item.windSpeed ||
			(item.weather && item.weather.length > 0)
		);
	};
	const isLaunchFailure = (item) => {
		return item ? item.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.failed : false;
	};
	const isLaunchSuccess = (item) => {
		return item ? item.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.success : false;
	};
	const launchLocationIterationAddress = (item) => {
		if (!item || !item.location)
			return '';

		let temp = '';
		if (item.location.iteration && item.location.iteration.address)
			// temp = item.location.iteration.address.city + ', ' + item.location.iteration.address.stateProvince + ' ' + item.location.iteration.address.country;
			temp = AppUtility.address(item.location.iteration.address);

		if (item.location.address && (item.location.address.city || item.location.address.stateProvince || item.location.address.country || item.location.address.postalCode))
			// temp = item.location.address.city + ', ' + item.location.address.stateProvince + ' ' + item.location.address.country;
			temp = AppUtility.address(item.location.address);

		return temp;
	};
	const launchCoverUrl = (item) => {
		if (!item)
			return false;
		if (!String.isNullOrEmpty(item.coverUrl))
			return item.coverUrl;
		return item.rocketSetup && item.rocketSetup.rocket ? item.rocketSetup.rocket.coverUrl : null;
	};
	const launchDate = (item) => {
		if (!item)
			return null;
		return LibraryMomentUtility.getDateHuman(item.date);
	};
	const launchLocationIteration = (item) => {
		if (!item || !item.location || !item.location.iteration)
			return '';
		let temp = [];
		// if (item.location.iteration.name)
		// 	temp.push(item.location.iteration.name);
		if (item.location.iteration.number)
			temp.push('#'+item.location.iteration.number);
		if (item.location.iteration.year)
			temp.push(item.location.iteration.year);
		if (!temp)
			return '';
		return ` (${temp.join(', ')})`;
	};
	const launchLocationName = (item) => {
		return item && item.location ? item.location.name + launchLocationIteration(item) : '';
	};
	const launchLocationIterationCoords = (item) => {
		if (!item || !item.location || !item.location.iteration)
			return null;

		if (item.location.iteration.coordsLat || item.location.iteration.coordsLong)
			return [ item.location.iteration.coordsLat, item.location.iteration.coordsLong ];

		return null;
	};
	const launchResultsAccelerationDrogue = (item) => {
		if (item && item.results && item.results.accelerationDrogue)
			return displayItemMeasurementAcceleration(correlationId(), item.results, (value) => { return value.accelerationDrogue; }, (value) => { return value.accelerationDrogueMeasurementUnitsId; }, (value) => { return value.accelerationDrogueMeasurementUnitId; });
		return null;
	};
	const launchResultsAccelerationMain = (item) => {
		if (item && item.results && item.results.accelerationMain)
			return displayItemMeasurementAcceleration(correlationId(), item.results, (value) => { return value.accelerationMain; }, (value) => { return value.accelerationMainMeasurementUnitsId; }, (value) => { return value.accelerationMainMeasurementUnitId; });
		return null;
	};
	const launchResultsAccelerationMax = (item) => {
		if (item && item.results && item.results.accelerationMax)
			return displayItemMeasurementAcceleration(correlationId(), item.results, (value) => { return value.accelerationMax; }, (value) => { return value.accelerationMaxMeasurementUnitsId; }, (value) => { return value.accelerationMaxMeasurementUnitId; });
		return null;
	};
	const launchResultsAltitudeDrogue = (item) => {
		if (item && item.results && item.results.altitudeDeployDrogue)
			return displayItemMeasurementAltitude(correlationId(), item.results, (value) => { return value.altitudeDeployDrogue; }, (value) => { return value.altitudeDeployDrogueMeasurementUnitsId; }, (value) => { return value.altitudeDeployDrogueMeasurementUnitId; });
		return null;
	};
	const launchResultsAltitudeMain = (item) => {
		if (item && item.results && item.results.altitudeDeployMain)
			return displayItemMeasurementAltitude(correlationId(), item.results, (value) => { return value.altitudeDeployMain; }, (value) => { return value.altitudeDeployMainMeasurementUnitsId; }, (value) => { return value.altitudeDeployMainMeasurementUnitId; });
		return null;
	};
	const launchResultsAltitudeMax = (item) => {
		if (item && item.results && item.results.altitudeMax)
			return displayItemMeasurementAltitude(correlationId(), item.results, (value) => { return value.altitudeMax; }, (value) => { return value.altitudeMaxMeasurementUnitsId; }, (value) => { return value.altitudeMaxMeasurementUnitId; });
		return null;
	};
	const launchResultsCoords = (item) => {
		let temp = launchResultsCoordsLaunch(item);
		if (temp && temp.length > 1)
			return temp;
		temp = launchResultsCoordsLocation(item);
		if (temp && temp.length > 1)
			return temp;
		temp = displayItemLocationIterationCoords.value;
		if (temp && temp.length > 1)
			return temp;
		return null;
	};
	const launchResultsCoordsLatLaunch = (item) => {
		return item ? item.coordsLatLaunch : '';
	};
	const launchResultsCoordsLongLaunch = (item) => {
		return item ? item.coordsLatLaunch : '';
	};
	const launchResultsCoordsLatRecovery = (item) => {
		return item ? item.coordsLatLaunch : '';
	};
	const launchResultsCoordsLongRecovery = (item) => {
		return item ? item.coordsLatLaunch : '';
	};
	const launchResultsCoordsLaunch = (item) => {
		return item && item.results && (item.results.coordsLatLaunch || item.results.coordsLongLaunch) ? [ item.results.coordsLatLaunch, item.results.coordsLongLaunch ] : null;
	};
	const launchResultsCoordsLocation = (item) => {
		return item && (item.coordsLat || item.coordsLong) ? [ item.coordsLat, item.coordsLong ] : null;
	};
	const launchResultsCoordsRecovery = (item) => {
		return item && item.results && (item.results.coordsLatRecovery || item.results.coordsLongRecovery) ? [ item.results.coordsLatRecovery, item.results.coordsLongRecovery ] : null;
	};
	const launchResultsVelocityMax = (item) => {
		if (item && item.results && item.results.velocityMax)
			return displayItemMeasurementVelocity(correlationId(), item.results, (value) => { return value.velocityMax; }, (value) => { return value.velocityMaxMeasurementUnitsId; }, (value) => { return value.velocityMaxMeasurementUnitId; });
		return null;
	};
	const launchResultsVelocityRecovery = (item) => {
		if (item && item.results && item.results.velocityRecovery)
			return displayItemMeasurementAcceleration(correlationId(), item.results, (value) => { return value.velocityRecovery; }, (value) => { return value.velocityRecoveryMeasurementUnitsId; }, (value) => { return value.velocityRecoveryMeasurementUnitId; });
		return null;
	};
	const launchRocketCg = (item) => {
		if (!item || !item.rocketSetup)
			return null;
		return rocketCgHighest(item.rocketSetup.stages);
	};
	const launchRocketCp = (item) => {
		if (!item || !item.rocketSetup || !item.rocketSetup.rocket)
			return null;
		return rocketCpHighest(item.rocketSetup.rocket.stages);
	};
	const launchRocketDiameter = (item) => {
		if (!item || !item.rocketSetup || !item.rocketSetup.rocket)
			return null;
		return rocketDiameterHighest(item.rocketSetup.rocket.stages);
	};
	const launchRocketLength = (item) => {
		if (!item || !item.rocketSetup || !item.rocketSetup.rocket)
			return null;
		return rocketLengthOverall(item.rocketSetup.rocket.stages);
	};
	const launchRocketWeight = (item) => {
		if (!item || !item.rocketSetup)
			return null;
		return rocketWeightHighest(item.rocketSetup.stages);
	};
	const launchStatusColor = (item) => {
		return item ? (item.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.success ? 'bg-success' : item.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.failed ? 'bg-red' : 'bg-primary') : 'bg-primary';
	};
	const launchStatusIcon = (item) => {
		return item ? (item.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.success ? 'mdi-thumb-up' : item.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.failed ? 'mdi-thumb-down' : null) : null;
	};
	const launchTemperature = (item) => {
		if (item && item.temperature)
			return displayItemMeasurementTemperature(correlationId(), item, (value) => { return value.temperature; }, (value) => { return value.temperatureMeasurementUnitsId; }, (value) => { return value.temperatureMeasurementUnitId; });
		return null;
	};
	const launchWeather = (item) => {
		if (!item || !item.weather)
			return '';
		let output = [];
		for (let weather of item.weather)
			output.push(weatherOptions.find(l => l.id === weather).name);
		return output.join(', ');
	};
	const launchWindSpeed = (item) => {
		if (item && item.windSpeed)
			return displayItemMeasurementVelocity(correlationId(), item, (value) => { return value.windSpeed; }, (value) => { return value.windSpeedMeasurementUnitsId; }, (value) => { return value.windSpeedMeasurementUnitId; });
		return null;
	};
	const launchTitle = (item) => {
		let output = '';
		if (!item)
			return output;
		if (!String.isNullOrEmpty(item.name))
			output += item.name;
		else if (item.rocketSetup && item.rocketSetup.rocket && !String.isNullOrEmpty(item.rocketSetup.rocket.name))
			output += item.rocketSetup.rocket.name;
		return output;
	};
	const launchTitleLocation = (item) => {
		let location = '';
		if (item && item.location) {
			location = item.location.name;
			if (item.location.iteration) {
				let iteration = '';
				if (item.location.iteration.number)
					iteration += '#' + item.location.iteration.number + ' ';
				if (item.location.iteration.year)
					iteration += '(' + item.location.iteration.year + ')';
					location += ' ' + iteration;
			}
		}
		
		return location.trim();
	};

	return {
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
		hasCoordsLocationIteration,
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
	};
};
</script>
