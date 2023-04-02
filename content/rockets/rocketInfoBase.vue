<script>
import { useRoute } from 'vue-router';
import { computed, onMounted, ref} from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useRocketBaseComponent } from '@/components/content/rockets/rocketBase';

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
		sort,
		target,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine
	} = useRocketBaseComponent(props, context, options);

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
			response = await serviceStore.dispatcher.requestRocketById(correlationId(), rocketId.value);
		else if (props.type === AppCommonConstants.Rocketry.DisplayTypes.User)
			response = await serviceStore.dispatcher.requestRocketByIdUser(correlationId(), rocketId.value);
		if (hasFailed(response))
			return [];
		return response.results;
	};
	const measurementUnitTranslate = (measurementUnitId, measurementUnit, measurementUnitType) => {
		if (String.isNullOrEmpty(measurementUnitId) || String.isNullOrEmpty(measurementUnit))
			return '';
		return LibraryClientUtility.$trans.t('measurementUnits.' + measurementUnitId + '.' + measurementUnitType + '.' + measurementUnit + 'Abbr');
	};
	const measurementUnitTranslateLength = (measurementUnitId, measurementUnit) => {
		return measurementUnitTranslate(measurementUnitId, measurementUnit, AppCommonConstants.MeasurementUnits.length.id);
	};
	const measurementUnitTranslateWeight = (measurementUnitId, measurementUnit) => {
		return measurementUnitTranslate(measurementUnitId, measurementUnit, AppCommonConstants.MeasurementUnits.weight.id);
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
		sort,
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
		measurementUnitTranslate,
		measurementUnitTranslateLength,
		measurementUnitTranslateWeight,
		videos,
		rocketsUrl
	};
};
</script>
