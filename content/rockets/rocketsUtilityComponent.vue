<script>
import { computed } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useRocketsUtilityComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success
	} = useBaseComponent(props, context, options);

	const rocketTypes = computed(() => {
		const object = AppCommonConstants.Rocketry.RocketTypes;
		return Object.getOwnPropertyNames(object).filter(l => l !== 'high').map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('strings.content.rockets.levels.' + item) }; });
	});

	const hasCoverUrl = (item) => {
		if (!item)
			return null;
		return !String.isNullOrEmpty(item.coverUrl);
	};
	const rocketTypeIcon = (item) => {
		const icon = rocketTypeIconDetermine(item);
		if (!icon)
			return null;
		return '/icons/' + icon;
	};
	const rocketTypeIconDetermine = (item) => {
		if (!item)
			return null;
		if (item.typeId === AppCommonConstants.Rocketry.RocketTypes.highone)
			return 'rocket_level1.png';
		if (item.typeId === AppCommonConstants.Rocketry.RocketTypes.hightwo)
			return 'rocket_level2.png';
		if (item.typeId === AppCommonConstants.Rocketry.RocketTypes.highthree)
			return 'rocket_level3.png';
		if (item.typeId === AppCommonConstants.Rocketry.RocketTypes.low)
			return 'rocket_low.png';
		if (item.typeId === AppCommonConstants.Rocketry.RocketTypes.mid)
			return 'rocket_mid.png';
		return null;
	};

	return {
		rocketTypes,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine
	};
};
</script>
