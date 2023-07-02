<script>
import { onMounted, ref} from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useRocketBaseComponent } from '@/components/content/rockets/rocketBase';

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
		sort,
		target,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine
	} = useRocketBaseComponent(props, context, options);

	const type = ref(options ? options.type ?? AppCommonConstants.Rocketry.DisplayTypes.Site : AppCommonConstants.Rocketry.DisplayTypes.Site);
	const params = ref({});
	const rockets = ref([]);
	const title = ref(
		(type.value === AppCommonConstants.Rocketry.DisplayTypes.User ? LibraryClientUtility.$trans.t('titles.rockets.yours') + ' ' : '') + LibraryClientUtility.$trans.t('titles.rockets.title')
	);

	const fetch = async () => {
		let response;
		if (type.value === AppCommonConstants.Rocketry.DisplayTypes.Site)
			response = await serviceStore.dispatcher.requestRockets(correlationId(), params.value);
		else if (type.value === AppCommonConstants.Rocketry.DisplayTypes.User)
			response = await serviceStore.dispatcher.requestRocketsUser(correlationId(), params.value);

		if (hasFailed(response))
			return [];
		return response.results;
	}

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
		sort,
		target,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rockets,
		title,
		type,
		rocketUrl
	};
};
</script>
