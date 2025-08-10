<template>
	<RocketInfo
		backType="none"
		:manufacturers="manufacturers"
		:showUserName="true"
		:type="type"
	/>
</template>

<script>
import { useRocketUserGalleryComponent } from '@/components/content/gallery/rockets/rocketGalleryComponent.vue';

import RocketInfo from '@/components/content/rockets/gallery/rocket/RocketInfo';

export default {
	name: 'RocketInfoGallery',
	components: {
		RocketInfo
	},
	props: {
	},
	setup(props, context, options) {
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
			manufacturers,
			type
		} = useRocketUserGalleryComponent(props, context, options);

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
			manufacturers,
			type
		};
	}
};
</script>
