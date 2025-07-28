<template>
	<v-row
		v-if="!rocketId"
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
				clickType="click"
				:type="type"
				:gamerTag="requestedTag"
				@display="handleRocket"
			/>
				<!-- clickType="click" -->
		</v-col>
	</v-row>
	<div
		v-if="rocketId"
	>
		<RocketInfo
			ref="rocketInfo"
			backType="close"
			:type="type"
			:id="rocketId"
			:requestedTag="requestedTag"
			:showUserName="false"
			@close="handleRocketClose"
		/>
	</div>
</template>

<script>
import { useRocketPanelBaseProps } from '@/components/content/rockets/gallery/rocketPanelBaseProps';
import { useRocketsUserGalleryComponent } from '@/components/content/gallery/rocketsGalleryComponent';

import RocketInfo from '@/components/content/rockets/gallery/rocket/RocketInfo';
import RocketPanel from '@/components/content/rockets/gallery/RocketPanel';

export default {
	name: 'UserGalleryRockets',
	components: {
		RocketInfo,
		RocketPanel
	},
	props: {
		...useRocketPanelBaseProps,
		requestedTag: {
			type: String
		}
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
			requestedTag,
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
			rocketUrl,
			rocketId,
			rocketInfo,
			userTag,
			handleRocket,
			handleRocketClose
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
			requestedTag,
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
			rocketUrl,
			rocketId,
			rocketInfo,
			userTag,
			handleRocket,
			handleRocketClose
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
