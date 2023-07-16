<template>
	<RocketInfo
		:type="type"
	/>
</template>

<script>
import AppCommonConstants from 'rocket_sidekick_common/constants';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

import RocketInfo from '@/components/content/rockets/gallery/rocket/RocketInfo';

export default {
	name: 'RocketInfoGallery',
	components: {
		RocketInfo
	},
	setup(props, context) {
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
		} = useBaseComponent(props, context);

		const type = AppCommonConstants.Rocketry.DisplayTypes.Site;

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
			type
		};
	}
};
</script>
