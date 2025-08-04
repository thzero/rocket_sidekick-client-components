<script>
import { onMounted, ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useLaunchComponent } from '@/components/content/launches/launch/launchComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useContentBaseComponent } from '@/components/content/contentBase';

export function useLaunchPanelBaseComponent(props, context, options) {
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
		serviceStore,
		sortByOrder,
		target
	} = useContentBaseComponent(props, context, options);

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
		weatherOptions
	} = useLaunchComponent(props, context);
	
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

	const viewType = ref('listing');
	const viewTypeListingRef = ref(null);

	const clickLaunch = (item) => {
		context.emit('display', item.id);
	}
	const handleViewType = () => {
		viewType.value = viewType.value === 'listing' ? 'table' : 'listing';
		settings.value.viewType = viewType.value;
		serviceStore.dispatcher.setLaunchesSettings(correlationId, settings.value);
	};
	// const handleViewTypeListingDownload = async () => {
	// 	if (!viewTypeListingRef.value) {
	// 		alert('boo');
	// 		return;
	// 	}
		
	// 	await handleViewTypeListingConversion();
	// };
	// const handleViewTypeListingConversion = async () => {
	// 	const el = viewTypeListingRef.value.$el.children[0].children[0];
	// 	let htmlHeaders = el.children[0].children[0];
	// 	const headers = [];
	// 	for (const header of htmlHeaders.children)
	// 		headers.push(header.innerHTML);

	// 	const ids = [];
	// 	ids.push('rocket');
	// 	ids.push('location');
	// 	ids.push('failureReasons');
	// 	ids.push('diameter');
	// 	ids.push('length');
	// 	ids.push('weight');
	// 	ids.push('cg');
	// 	ids.push('cp');
	// 	ids.push('motors');
	// 	ids.push('temperature');
	// 	ids.push('windSpeed');
	// 	ids.push('accelerationMax');
	// 	ids.push('velocityMax');
	// 	ids.push('altitudeMax');
	// 	ids.push('altitudeMain');
	// 	ids.push('aAltitudeDrogue');

	// 	let htmlBody = el.children[1];
	// 	const rows = [];
	// 	let temp = {};
	// 	let index = 0;
	// 	for (const row of htmlBody.children) {
	// 		index = 0;
	// 		temp = {};
	// 		if (row.children.length > 2) {
	// 			for (const id of ids) {
	// 				temp[id] = row.children[index].innerHTML;
	// 				index++;
	// 			}
	// 		}
	// 		rows.push(temp);
	// 	}
		
	// 	const output = rows;

	// 	/* generate worksheet from state */
	// 	const ws = utils.json_to_sheet(output);
	// 	utils.sheet_add_aoa(ws, [ headers ], { origin: 'A1' });

	// 	const cols = [];
	// 	index = 0;
	// 	for (const id of ids) {
	// 		const max_width_data = output.reduce((w, r) => Math.max(w, r[id].length), 12);
	// 		const max_width_header = headers[index].length;
	// 		const max_width = max_width_data > max_width_header ? max_width_data : max_width_header;
	// 		cols.push( { wch: max_width });
	// 		index++;
	// 	}
	// 	ws['!cols'] = cols;

	// 	/* create workbook and append worksheet */
	// 	const wb = utils.book_new();
	// 	utils.book_append_sheet(wb, ws, "Data");
	// 	/* export to XLSX */
	// 	const now = new Date();
	// 	let launchFileName = `${LibraryClientUtility.$trans.t('forms.content.launches.plural')} ${now.getDate()}${now.getMonth()}${now.getFullYear()}`;
	// 	launchFileName = launchFileName.toLocaleLowerCase();
	// 	writeFileXLSX(wb, `${launchFileName}.xlsx`);
	// };
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
	const isFailure = (item) => {
		return item ? item.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.failed : false;
	};
	const isSuccess = (item) => {
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
		return LibraryMomentUtility.getDateHuman(item.date);
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
		if (!String.isNullOrEmpty(item.name))
			output += item.name;
		else if (item.rocketSetup && item.rocketSetup.rocket && !String.isNullOrEmpty(item.rocketSetup.rocket.name))
			output += item.rocketSetup.rocket.name;
		return output;
	};
	const launchTitleLocation = (item) => {
		let location = '';
		if (item.location) {
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
	const launchUrl = (item) => {
		if (!item)
			return null;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Site)
			return '/rocket/' + item.id;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.User)
			return '/user/rockets/' + item.id;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.GamerTag)
			return '/gallery/' + props.requestedTag + '/rocket/' + item.id;
		return null;
	};
	const launchUrlBack = (item) => {
		if (!item)
			return null;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Site)
			return '/launches';
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.User)
			return '/user/launches';
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.GamerTag)
			return '/gallery/' + props.requestedTag;
		return null;
	};

	onMounted(async () => {
		AppUtility.usageMetricsMeasurementTag(correlationId(), 'gallery.launches');
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
		serviceStore,
		sortByOrder,
		target,
		buttonsDialog,
		buttonsForms,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		clickLaunch,
		hasLaunchCoverUrl,
		hasLaunchResults,
		hasLaunchResultsCoords,
		hasLaunchResultsCoordsLaunch,
		hasLaunchResultsCoordsLocation,
		hasLaunchResultsCoordsRecovery,
		hasLaunchRocketSpecs,
		hasLaunchWeather,
		isFailure,
		isSuccess,
		launchCoverUrl,
		launchDate,
		launchLocationIterationAddress,
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
		launchTitleLocation,
		launchUrl,
		launchUrlBack
	};
};
</script>
