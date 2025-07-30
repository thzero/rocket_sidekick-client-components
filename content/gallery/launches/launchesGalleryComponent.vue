<script>
import { onMounted, ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useContentBaseComponent } from '@/components/content/contentBase';
import { useUserGalleryComponent } from '@/components/content/gallery/galleryComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useLaunchesUserGalleryComponent(props, context, options) {
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
		requestedTag,
		// title,
		user
	} = useUserGalleryComponent(props, context, { 
		user: false 
	});
	const {
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
	const params = ref({});
	const launches = ref([]);
	const title = ref(
		(type.value === AppCommonConstants.Rocketry.DisplayTypes.User ? LibraryClientUtility.$trans.t('titles.content.yours') + ' ' : '') + LibraryClientUtility.$trans.t('titles.content.launches.title') + ' ' + LibraryClientUtility.$trans.t('titles.content.gallery')
	);

	const launchId = ref(null);
	const launchInfo = ref(null);

	const fetch = async () => {
		let response;
		if (type.value === AppCommonConstants.Rocketry.DisplayTypes.Site)
			response = await serviceStore.dispatcher.requestLaunchesGallery(correlationId(), params.value);
		else if (type.value === AppCommonConstants.Rocketry.DisplayTypes.User) {
			params.value.userId = serviceStore.user ? serviceStore.user.id : null;
			response = await serviceStore.dispatcher.requestLaunchesGalleryUser(correlationId(), params.value);
		}
		else if (type.value === AppCommonConstants.Rocketry.DisplayTypes.GamerTag) {
			params.value.gamerTag = options ? options.requestedTag.value : null;
			if (!params.value.gamerTag)
				return [];
			response = await serviceStore.dispatcher.requestLaunchesGalleryGamerTag(correlationId(), params.value);
		}

		if (hasFailed(response))
			return [];
		return response.results;
	}

	const handleLaunch = (id) => {
		launchId.value = id;
	};
	const handleLaunchClose = () => {
		launchId.value = null;
	};
	const launchUrl = (item) => {
		if (!item)
			return null;
		if (type.value === AppCommonConstants.Rocketry.DisplayTypes.Site)
			return '/rocket/' + item.id;
		// if (type.value === AppCommonConstants.Rocketry.DisplayTypes.User)
		// 	return '/user/rocket/' + item.id;
		return null;
	};

	onMounted(async () => {
		launches.value = await fetch();
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
		requestedTag,
		user,
		serviceStore,
		sortByOrder,
		target,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		launches,
		title,
		launchId,
		handleLaunch,
		handleLaunchClose,
		launchUrl
	};
}
</script>