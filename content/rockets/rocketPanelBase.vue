<script>
import { onMounted, ref} from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useRocketBaseComponent } from '@/components/content/rockets/rocketBase';

export function useRocketPanelBaseComponent(props, context, options) {
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

	const rocketUrl = (item) => {
		if (!item)
			return null;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Site)
			return '/rocket/' + item.id;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Personal)
			return '/user/rocket/' + item.id;
		return null;
	};

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
		rocketUrl
	};
};
</script>
