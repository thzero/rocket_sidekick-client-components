<script>
import { computed, onMounted } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useContentBaseComponent } from '@/components/content/contentBase';

export function useRocketPanelBaseComponent(props, context, options) {
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
		rocketManufacturerRocketName,
		rocketManufacturerStockId,
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

	const stagePrimary = computed(() => {
		if (!props.item || !props.item.stages || props.item.stages.length === 0)
			return {};
		return props.item.stages[0];
	});

	const clickRocket = (item) => {
		context.emit('display', item.id);
	};
	const manufacturer = (item) => {
		if (!item)
			return null;
		return rocketManufacturer(item, props.manufacturers);
	};
	const manufacturerRocketName = (item) => {
		if (!item)
			return null;
		return rocketManufacturerRocketName(item);
	};
	const manufacturerStockId = (item) => {
		if (!item)
			return null;
		return rocketManufacturerStockId(item);
	};
	const measurementUnitTranslateLength = (measurementUnitId, measurementUnit) => {
		return AppUtility.measurementUnitTranslateLength(correlationId(), measurementUnitId, measurementUnit);
	};
	const measurementUnitTranslateWeight = (measurementUnitId, measurementUnit) => {
		return AppUtility.measurementUnitTranslateWeight(correlationId(), measurementUnitId, measurementUnit);
	};
	const rocketUrl = (item) => {
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
	const rocketUrlBack = (item) => {
		if (!item)
			return null;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Site)
			return '/rockets';
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.User)
			return '/user/rockets';
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.GamerTag)
			return '/gallery/' + props.requestedTag;
		return null;
	};

	onMounted(async () => {
		AppUtility.usageMetricsMeasurementTag(correlationId(), 'rockets.gallery');
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
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		stagePrimary,
		clickRocket,
		manufacturer,
		manufacturerRocketName,
		manufacturerStockId,
		measurementUnitTranslateLength,
		measurementUnitTranslateWeight,
		rocketUrl,
		rocketUrlBack
	};
};
</script>
