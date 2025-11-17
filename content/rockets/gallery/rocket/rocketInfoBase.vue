<script>
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
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
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);
	
	const {
		rocketTypes,
		hasCoverUrl,
		rocketManufacturer,
		rocketManufacturerName,
		rocketManufacturerRocketName,
		rocketManufacturerStockId,
		rocketManufacturerUrl,
		rocketStages,
		rocketTypeIcon,
		rocketTypeIconDetermine
	} = useRocketsUtilityComponent(props, context, options);

	const rocket = ref([]);

	const albums = computed(() => {
		if (!rocket.value || !rocket.value.albums)
			return [];
		return rocket.value.albums;
	});
	const displayTypeGamerTag = computed(() => {
		return (props.type === AppCommonConstants.Rocketry.DisplayTypes.GamerTag);
	});
	const displayTypeSite = computed(() => {
		return (props.type === AppCommonConstants.Rocketry.DisplayTypes.Site);
	});
	const displayTypeUser = computed(() => {
		return (props.type === AppCommonConstants.Rocketry.DisplayTypes.User);
	});
	const documents = computed(() => {
		if (!rocket.value || !rocket.value.documents)
			return [];
		return rocket.value.documents;
	});
	const hasAlbums = computed(() => {
		if (!rocket.value || !rocket.value.albums)
			return false;
		return rocket.value.albums.length > 0;
	});
	const hasDocuments = computed(() => {
		if (!rocket.value || !rocket.value.documents)
			return false;
		return rocket.value.documents.length > 0;
	});
	const hasLaunches = computed(() => {
		if (!rocket.value || !rocket.value.logs)
			return false;
		return rocket.value.logs.length > 0;
	});
	const hasVideos = computed(() => {
		if (!rocket.value || !rocket.value.videos)
			return false;
		return rocket.value.videos.length > 0;
	});
	const manufacturer = computed(() => {
		if (!rocket.value)
			return null;
		return rocketManufacturer(rocket.value, props.manufacturers);
	});
	const manufacturerName = computed(() => {
		if (!rocket.value)
			return null;
		return rocketManufacturerName(rocket.value, props.manufacturers);
	});
	const manufacturerRocketName = computed(() => {
		if (!rocket.value)
			return null;
		return rocketManufacturerRocketName(rocket.value);
	});
	const manufacturerStockId = computed(() => {
		if (!rocket.value)
			return null;
		return rocketManufacturerStockId(rocket.value);
	});
	const manufacturerUrl = computed(() => {
		if (!rocket.value)
			return null;
		return rocketManufacturerUrl(rocket.value, props.manufacturers);
	});
	const requestedTag = computed(() => {
		return routes.params.user ?? props.requestedTag;
	});
	const rocketId = computed(() => {
		return routes.params.id ?? (props.id ?? null);
	});
	const rocketUrl = computed(() => {
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Site)
			return '/rocket/' + props.id;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.User)
			return '/user/rockets/' + props.id;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.GamerTag)
			return '/gallery/' + requestedTag.value + '/rocket/' + props.id;
		return null;
	});
	const rocketsUrl = computed(() => {
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.GamerTag)
			return '/gallery/' + requestedTag.value;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Site)
			return '/rockets';
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.User)
			return '/user/rockets';
		return null;
	});
	const stagePrimary = computed(() => {
		if (!rocket.value || !rocket.value.stages || rocket.value.stages.length === 0)
			return {};
		return rocket.value.stages[0];
	});
	const stages = computed(() => {
		if (!rocket.value)
			return null;
		return rocketStages(rocket.value);
	});
	const title = computed(() => {
		if (!rocket.value)
			return '';
		let title = props.showUserName ? rocket.value.owner ? rocket.value.owner.name : '' : '';
		title += (title ? "'s " : '') + rocket.value.name;
		return title;
	});

	const clickClose = async () => {
		context.emit('close');
	}
	const fetch = async () => {
		let response;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.GamerTag)
			response = await serviceStore.dispatcher.requestRocketByIdGalleryGamerTag(correlationId(), routes.params.user, rocketId.value);
		else if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Site)
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
		rocket,
		buttonsDialog,
		buttonsForms,
		rocketTypes,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		albums,
		displayTypeGamerTag,
		displayTypeSite,
		displayTypeUser,
		documents,
		hasAlbums,
		hasDocuments,
		hasLaunches,
		hasVideos,
		manufacturer,
		manufacturerName,
		manufacturerRocketName,
		manufacturerStockId,
		manufacturerUrl,
		requestedTag,
		rocketId,
		rocketUrl,
		rocketsUrl,
		stagePrimary,
		stages,
		title,
		clickClose,
		fetch,
		measurementUnitTranslateLength,
		measurementUnitTranslateWeight,
		videos
	};
};
</script>
