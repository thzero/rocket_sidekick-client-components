<script>
import { useRoute } from 'vue-router';
import { computed, onMounted, ref} from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';

import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useContentBaseComponent } from '@/components/content/contentBase';

export function useRocketInfoBaseComponent(props, context, options) {
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
		rocketTypes,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine
	} = useRocketsUtilityComponent(props, context, options);

	const rocket = ref([]);

	const rocketId = computed(() => {
		return routes.params.id;
	});

	const albums = computed(() => {
		if (!rocket.value || !rocket.value.albums)
			return [];
		return rocket.value.albums;
	});
	const hasAlbums = computed(() => {
		if (!rocket.value || !rocket.value.albums)
			return false;
		return rocket.value.albums.length > 0;
	});
	const hasLaunches = computed(() => {
		if (!rocket.value || !rocket.value.logs)
			return false;
		return rocket.value.logs.length > 0;
	});
	const hasAlbumsOrVideos= computed(() => {
		return hasAlbums.value || hasVideos.value;
	});
	const hasVideos = computed(() => {
		if (!rocket.value || !rocket.value.videos)
			return false;
		return rocket.value.videos.length > 0;
	});
	const rocketsUrl = computed((item) => {
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Site)
			return '/rockets';
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.User)
			return '/user/rockets';
		return null;
	});

	const fetch = async () => {
		let response;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Site)
			response = await serviceStore.dispatcher.requestRocketByIdGallery(correlationId(), rocketId.value);
		else if (props.type === AppCommonConstants.Rocketry.DisplayTypes.User)
			response = await serviceStore.dispatcher.requestRocketById(correlationId(), rocketId.value);
		if (hasFailed(response))
			return [];
		return response.results;
	};
	const measurementUnitTranslateLength = (measurementUnitId, measurementUnit) => {
		return AppUtility.measurementUnitTranslateLength(correlationId(), measurementUnitId, measurementUnit);
	};
	const measurementUnitTranslateWeight = (measurementUnitId, measurementUnit) => {
		return AppUtility.measurementUnitTranslateWeight(correlationId(), measurementUnitId, measurementUnit);
	};
	const videos = computed(() => {
		if (!rocket.value || !rocket.value.videos)
			return [];
		return rocket.value.videos;
	});

	onMounted(async () => {
		rocket.value = await fetch();
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
		hasAlbums,
		hasAlbumsOrVideos,
		hasLaunches,
		hasVideos,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rocket,
		rocketId,
		measurementUnitTranslateLength,
		measurementUnitTranslateWeight,
		videos,
		rocketsUrl
	};
};
</script>
