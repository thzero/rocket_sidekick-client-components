<script>
import { computed } from 'vue';

import { useContentBaseComponent } from '@/components/content/contentBase';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useRocketViewComponent(props, context, options) {
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
		rocketCp,
		rocketDiameter,
		rocketLength,
		rocketManufacturer,
		rocketStagePrimary,
		rocketStages,
		rocketWeight
	} = useRocketsUtilityComponent(props, context, { manufacturers: props.manufacturers });

	const coverUrl = computed(() => {
		return displayItem.value ? displayItem.value.coverUrl : '';
	});
	const cp = computed(() => {
		if (!props.detailItem)
			return null;
		return rocketCp(props.detailItem.stages);
	});
	const diameter = computed(() => {
		if (!props.detailItem)
			return null;
		return rocketDiameter(props.detailItem.stages);
	});
	const displayItem = computed(() => {
		return props.detailItem ? props.detailItem : {};
	});
	const length = computed(() => {
		if (!props.detailItem)
			return null;
		return rocketLength(props.detailItem.stages);
	});
	const manufacturer = computed(() => {
		if (!props.detailItem)
			return null;
		return rocketManufacturer(props.detailItem.stages);
	});
	const stagePrimary = computed(() => {
		if (!props.detailItem)
			return {};
		return rocketStagePrimary(props.detailItem.stages);
	});
	const stages = computed(() => {
		if (!props.detailItem)
			return 0;
		return rocketStages(props.detailItem.stages);
	});
	const weight = computed(() => {
		if (!props.detailItem)
			return null;
		return rocketWeight(props.detailItem.stages);
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
		coverUrl,
		cp,
		diameter,
		displayItem,
		length,
		manufacturer,
		stagePrimary,
		stages,
		weight
	};
};
</script>
