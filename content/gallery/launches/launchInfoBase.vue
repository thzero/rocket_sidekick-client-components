<script>
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useLaunchComponent } from '@/components/content/launches/launch/launchComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useContentBaseComponent } from '@/components/content/contentBase';

export function useLaunchInfoBaseComponent(props, context, options) {
	const routes = useRoute();

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

	const item = ref(null);

	const requestedTag = computed(() => {
		return routes.params.user ?? props.requestedTag;
	});

	const clickClose = async () => {
		context.emit('close');
	}
	const clickLaunch = (item) => {
		if (!item)
			return;
		return;
	};
	const clickRocket = (item) => {
		if (!item)
			return;
		return;
	};
	const fetch = async () => {
		let response;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.GamerTag)
			response = await serviceStore.dispatcher.requestLaunchByIdGalleryGamerTag(correlationId(), routes.params.user, props.id ? props.id : routes.params.id);
		else if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Site)
			response = await serviceStore.dispatcher.requestLaunchByIdGallery(correlationId(), props.id);
		else if (props.type === AppCommonConstants.Rocketry.DisplayTypes.User)
			response = await serviceStore.dispatcher.requestLaunchById(correlationId(), props.id);
		if (hasFailed(response))
			return [];
		return response.results;
	};
	const launchUrl = (item) => {
		if (!item)
			return null;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Site)
			return '/launches';
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.User)
			return '/user/launches';
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.GamerTag)
			return '/gallery/' + requestedTag.value + '/launch/' + props.id;
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
			return '/gallery/' + requestedTag.value;
		return null;
	};
	const rocketIsPublic = (item) => {
		if (!item || !item.rocketSetup || !item.rocketSetup.rocket)
			return '';
		return item && item.rocketSetup.rocket.public;
	};
	const rocketUrl = (item) => {
		if (!item)
			return null;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Site)
			return '/rockets';
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.User)
			return '/user/rockets';
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.GamerTag)
			return '/gallery/' + requestedTag.value + '/rocket/' + (item && item.rocketSetup && item.rocketSetup.rocket ? item.rocketSetup.rocket.id : '');
		return null;
	};
	const title = (item) => {
		if (!item)
			return '';
		let title = props.showUserName ? item.owner ? item.owner.name : '' : '';
		title += (title ? "'s " : '') + launchTitle(item) + ' @ ' + launchLocationName(item);
		return title;
	};

	onMounted(async () => {
		item.value = await fetch();
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
		item,
		clickClose,
		clickLaunch,
		requestedTag,
		launchUrl,
		launchUrlBack,
		rocketIsPublic,
		rocketUrl,
		title
	};
};
</script>
