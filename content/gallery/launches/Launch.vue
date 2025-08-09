<template>
	<LaunchInfo
		backType="none"
		:showUserName="true"
		:type="type"
	/>
</template>

<script>
import { ref } from 'vue';
import AppCommonConstants from 'rocket_sidekick_common/constants';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

import LaunchInfo from '@/components/content/gallery/launches/LaunchInfo';

export default {
	name: 'LaunchInfoGallery',
	components: {
		LaunchInfo
	},
	props: {
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

		const type = ref(AppCommonConstants.Rocketry.DisplayTypes.GamerTag);

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
