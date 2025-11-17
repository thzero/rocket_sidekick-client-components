<script>
import { onMounted, ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';

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
		weatherOptions,
		hasLaunchCoverUrl,
		hasLaunchResults,
		hasLaunchResultsCoords,
		hasLaunchResultsCoordsLaunch,
		hasLaunchResultsCoordsLocation,
		hasLaunchResultsCoordsRecovery,
		hasCoordsLocationIteration,
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
		rocketTypeIcon,
		rocketTypeIconDetermine
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
	const launchUrl = (item) => {
		if (!item)
			return null;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Site)
			return '/launch/' + item.id;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.User)
			return '/user/launches/' + item.id;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.GamerTag)
			return '/gallery/' + props.requestedTag + '/launch/' + item.id;
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
		hasCoordsLocationIteration,
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
		launchTitleLocation,
		launchUrl
	};
};
</script>
