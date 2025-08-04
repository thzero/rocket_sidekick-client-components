<script>
import { onMounted, ref} from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useContentBaseComponent } from '@/components/content/contentBase';

export function useLaunchesBaseComponent(props, context, options) {
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
	const params = ref({});
	const rockets = ref([]);
	const title = ref(
		(type.value === AppCommonConstants.Rocketry.DisplayTypes.User ? LibraryClientUtility.$trans.t('titles.content.yours') + ' ' : '') + LibraryClientUtility.$trans.t('titles.content.rockets.title') + ' ' + LibraryClientUtility.$trans.t('titles.content.gallery')
	);

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

	onMounted(async () => {
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
		requestedTag,
		// title,
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
		handleLaunchClose
	};
};
</script>
