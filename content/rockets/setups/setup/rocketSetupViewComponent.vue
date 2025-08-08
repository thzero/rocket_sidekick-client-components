<script>
import { computed } from 'vue';

import { useContentBaseComponent } from '@/components/content/contentBase';
import { useMotorUtilityComponent } from '@/components/external/motorUtilityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useRocketSetupViewComponent(props, context, options) {
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

	const cg = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return null;
		return rocketCg(props.detailItem.stages);
	});
	const coverUrl = computed(() => {
		return displayItem.value && displayItem.value.rocket ? displayItem.value.rocket.coverUrl : '';
	});
	const cp = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return null;
		return rocketCpHighest(props.detailItem.rocket.stages);
	});
	const diameter = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return null;
		return rocketDiameterHighest(props.detailItem.rocket.stages);
	});
	const displayItem = computed(() => {
		return props.detailItem ? props.detailItem : {};
	});
	const hasSpecs = computed(() => {
		return cg.value || cp.value || diameter.value || length.value || weight.value;
	});
	const length = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return null;
		return rocketLengthOverall(props.detailItem.rocket.stages);
	});
	const manufacturer = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return null;
		return rocketManufacturer(props.detailItem.rocket);
	});
	const motors = computed(() => {
		return rocketMotors(props.detailItem);
	});
	const stagePrimary = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return {};
		return rocketStagePrimary(props.detailItem.rocket.stages);
	});
	const stagePrimaryRocket = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return {};
		return rocketStagePrimary(props.detailItem.stages);
	});
	const stages = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return 0;
		return rocketStages(props.detailItem.rocket.stages);
	});
	const weight = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return null;
		return rocketWeightHighest(props.detailItem.stages);
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
		cg,
		coverUrl,
		cp,
		diameter,
		displayItem,
		hasSpecs,
		length,
		manufacturer,
		motors,
		stagePrimary,
		stagePrimaryRocket,
		stages,
		weight,
		motorUrl
	};
};
</script>
