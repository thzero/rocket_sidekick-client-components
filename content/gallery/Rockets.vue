<template>
	<v-row 
		dense
		style="margin-top: 24px;"
	>
		<v-col 
			cols="12" md="6"
			v-for="item in rockets"
			:key="item.name"
			style="padding-bottom: 18px;"
		>
			<RocketPanel
				:item="item"
				:type="type"
			/>
		</v-col>
	</v-row>
</template>

<script>
import { useRocketPanelBaseProps } from '@/components/content/rockets/gallery/rocketPanelBaseProps';
import { useRocketsUserGalleryComponent } from '@/components/content/gallery/rocketsGalleryComponent';

import RocketPanel from '@/components/content/rockets/gallery/RocketPanel';

export default {
	name: 'UserGalleryRockets',
	components: {
		RocketPanel
	},
	props: {
		...useRocketPanelBaseProps
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
			requestedUser,
			rocketsType,
			user,
			serviceStore,
			sortByOrder,
			target,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			rockets,
			title,
			type,
			rocketUrl
		} = useRocketsUserGalleryComponent(props, context, options);

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
			requestedUser,
			rocketsType,
			user,
			serviceStore,
			sortByOrder,
			target,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			rockets,
			title,
			type,
			rocketUrl
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
