<script>
import { onMounted } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useContentBaseComponent } from '@/components/content/contentBase';

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
		sortByOrder,
		target
	} = useContentBaseComponent(props, context, options);

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);
	
	const {
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine
	} = useRocketsUtilityComponent(props, context, options);
	
	const rocketUrl = (item) => {
		if (!item)
			return null;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Site)
			return '/rocket/' + item.id;
		if (props.type === AppCommonConstants.Rocketry.DisplayTypes.Personal)
			return '/user/rocket/' + item.id;
		return null;
	};

	onMounted(async () => {
		AppUtility.usageMetricsMeasurementTag(correlationId(), 'rockets.gallery');
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
		buttonsDialog,
		buttonsForms,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rocketUrl
	};
};
</script>
