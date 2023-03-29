<script>
import AppCommonConstants from 'rocket_sidekick_common/constants';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useChecklistBaseComponent(props, context, options) {
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
		target
	} = useContentBaseComponent(props, context, options);

	const fetch = async () => {
		const response = await serviceStore.dispatcher.requestChecklistsById(correlationId(), checklistId.value);
		if (hasFailed(response))
			return [];
		return response.results;
	};
	const hasCoverUrl = (item) => {
		if (!item)
			return null;
		return !String.isNullOrEmpty(item.coverUrl);
	};
	const checklistTypeIcon = (item) => {
		const icon = checklistTypeIconDetermine(item);
		if (!icon)
			return null;
		return '/icons/' + icon;
	};
	const checklistTypeIconDetermine = (item) => {
		if (!item)
			return null;
		if (item.launchTypeId === AppCommonConstants.Rocketry.RocketTypes.highone)
			return 'rocket_level1.png';
		if (item.launchTypeId === AppCommonConstants.Rocketry.RocketTypes.hightwo)
			return 'rocket_level2.png';
		if (item.launchTypeId === AppCommonConstants.Rocketry.RocketTypes.highthree)
			return 'rocket_level3.png';
		if (item.launchTypeId === AppCommonConstants.Rocketry.RocketTypes.low)
			return 'rocket_low.png';
		if (item.launchTypeId === AppCommonConstants.Rocketry.RocketTypes.mid)
			return 'rocket_mid.png';
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
		checklistTypeIcon,
		checklistTypeIconDetermine
	};
};
</script>
