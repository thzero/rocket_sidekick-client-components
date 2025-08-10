<script>
import { onMounted, ref} from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useContentBaseComponent } from '@/components/content/contentBase';

export function useRocketsBaseComponent(props, context, options) {
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
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine
	} = useRocketsUtilityComponent(props, context, options);

	const type = ref(options ? options.type ?? AppCommonConstants.Rocketry.DisplayTypes.Site : AppCommonConstants.Rocketry.DisplayTypes.Site);
	const manufacturers = ref(null);
	const params = ref({});
	const rockets = ref([]);
	const title = ref(
		(type.value === AppCommonConstants.Rocketry.DisplayTypes.User ? LibraryClientUtility.$trans.t('titles.content.yours') + ' ' : '') + LibraryClientUtility.$trans.t('titles.content.rockets.title') + ' ' + LibraryClientUtility.$trans.t('titles.content.gallery')
	);

	const fetch = async () => {
		let response;
		if (type.value === AppCommonConstants.Rocketry.DisplayTypes.Site)
			response = await serviceStore.dispatcher.requestRocketsGallery(correlationId(), params.value);
		else if (type.value === AppCommonConstants.Rocketry.DisplayTypes.User) {
			params.value.userId = serviceStore.user ? serviceStore.user.id : null;
			response = await serviceStore.dispatcher.requestRocketsGalleryUser(correlationId(), params.value);
		}
		else if (type.value === AppCommonConstants.Rocketry.DisplayTypes.GamerTag) {
			params.value.gamerTag = options ? options.requestedTag.value : null;
			if (!params.value.gamerTag)
				return [];
			response = await serviceStore.dispatcher.requestRocketsGalleryGamerTag(correlationId(), params.value);
		}

		if (hasFailed(response))
			return [];
		return response.results;
	};
	const fetchManufacturers = async (correlationId) => {
		if (manufacturers.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId);
		if (hasFailed(response))
			return;

		manufacturers.value = response.results.sort((a, b) => a.name.localeCompare(b.name));
	};
	const rocketUrl = (item) => {
		if (!item)
			return null;
		if (type.value === AppCommonConstants.Rocketry.DisplayTypes.Site)
			return '/rocket/' + item.id;
		// if (type.value === AppCommonConstants.Rocketry.DisplayTypes.User)
		// 	return '/user/rocket/' + item.id;
		return null;
	};

	onMounted(async () => {
		await fetchManufacturers();
		rockets.value = await fetch();
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
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		manufacturers,
		params,
		rockets,
		title,
		type,
		rocketUrl
	};
};
</script>
