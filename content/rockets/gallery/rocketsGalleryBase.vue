<script>
import { onMounted, ref} from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useContentBaseComponent } from '@/components/content/contentBase';

export function useRocketsGalleryBaseComponent(props, context, options) {
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

	// console.log(options, 'useRocketSetupsBaseComponent.options');
	// console.log(options ? options.parent : 'unknown', 'useRocketSetupsBaseComponent.options.parent');
	// console.log(props, 'useRocketSetupsBaseComponent.props');
	// console.log(props.type, 'useRocketSetupsBaseComponent.props.type');
	const type = ref(props ? props.type ?? AppCommonConstants.Rocketry.DisplayTypes.Site : AppCommonConstants.Rocketry.DisplayTypes.Site);
	// console.log(type.value, 'useRocketSetupsBaseComponent.type.value');
	if (!type.value) {
		// console.log(options ? options.type : 'unknown', 'useRocketSetupsBaseComponent.options.type');
		type.value = options ? options.type ?? AppCommonConstants.Rocketry.DisplayTypes.Site : AppCommonConstants.Rocketry.DisplayTypes.Site;
	}
	// console.log(type.value, 'useRocketSetupsBaseComponent.type.value');
	const manufacturers = ref(null);
	const params = ref({});
	// console.log(props.requestedTag, 'useRocketSetupsBaseComponent.props.requestedTag');
	const requestedTag = ref(props.requestedTag);
	// console.log(requestedTag.value, 'useRocketSetupsBaseComponent.requestedTag.value');
	if (!requestedTag.value) {
		console.log(options ? options.requestedTag : 'unknown', 'useRocketSetupsBaseComponent.options.requestedTag');
		requestedTag.value = options ? options.requestedTag : null;
	}
	// console.log(requestedTag.value, 'useRocketSetupsBaseComponent.requestedTag.value');
	const rockets = ref([]);
	const title = ref(
		(type.value === AppCommonConstants.Rocketry.DisplayTypes.User ? LibraryClientUtility.$trans.t('titles.content.yours') + ' ' : '') + LibraryClientUtility.$trans.t('titles.content.rockets.title') + ' ' + LibraryClientUtility.$trans.t('titles.content.gallery')
	);

	const fetch = async () => {
		let response;
		// console.log(type.value, 'useRocketSetupsBaseComponent.fetch.type.value');
		if (type.value === AppCommonConstants.Rocketry.DisplayTypes.Site)
			response = await serviceStore.dispatcher.requestRocketsGallery(correlationId(), params.value);
		else if (type.value === AppCommonConstants.Rocketry.DisplayTypes.User) {
			params.value.userId = serviceStore.user ? serviceStore.user.id : null;
			response = await serviceStore.dispatcher.requestRocketsGalleryUser(correlationId(), params.value);
		}
		else if (type.value === AppCommonConstants.Rocketry.DisplayTypes.GamerTag) {
			params.value.gamerTag = requestedTag.value;
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
