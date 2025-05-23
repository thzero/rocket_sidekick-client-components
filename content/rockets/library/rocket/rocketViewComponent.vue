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
	} = useRocketsUtilityComponent(props, context, { manufacturers: props.manufacturers });

	const albums = computed(() => {
		return displayItem.value && displayItem.value.albums && displayItem.value.albums.length > 0 ? displayItem.value.albums : null;
	});
	const coverUrl = computed(() => {
		return displayItem.value ? displayItem.value.coverUrl : '';
	});
	const cp = computed(() => {
		if (!props.detailItem)
			return null;
		return rocketCpHighest(props.detailItem.stages);
	});
	const diameter = computed(() => {
		if (!props.detailItem)
			return null;
		return rocketDiameterHighest(props.detailItem.stages);
	});
	const displayItem = computed(() => {
		return props.detailItem ? props.detailItem : {};
	});
	const documents = computed(() => {
		return displayItem.value && displayItem.value.documents && displayItem.value.documents.length > 0 ? displayItem.value.documents : null;
	});
	const length = computed(() => {
		if (!props.detailItem)
			return null;
		return rocketLengthOverall(props.detailItem.stages);
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
	const videos = computed(() => {
		return displayItem.value && displayItem.value.videos && displayItem.value.videos.length > 0 ? displayItem.value.videos : null;
	});
	const weight = computed(() => {
		if (!props.detailItem)
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
		albums,
		coverUrl,
		cp,
		diameter,
		displayItem,
		documents,
		length,
		manufacturer,
		stagePrimary,
		stages,
		videos,
		weight
	};
};
</script>
