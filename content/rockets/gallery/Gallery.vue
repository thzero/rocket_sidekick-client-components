<template>
	<ContentHeader :value="title" />
	<!-- <pre>{{ JSON.stringify(rockets, null, '  ') }}</pre> -->
	<v-row dense>
		<v-col cols="12">
			<v-row dense>
				<v-col cols="6"
					v-for="item in rockets"
					:key="item.name"
				>
					<RocketPanel
						:item="item"
						:type="type"
					/>
				</v-col>
			</v-row>
		</v-col>
	</v-row> 
</template>

<script>
import AppCommonConstants from 'rocket_sidekick_common/constants';

import { useRocketsBaseComponent } from '@/components/content/rockets/gallery/rocketsBase';
import { useRocketsBaseProps } from '@/components/content/rockets/gallery/rocketsBaseProps';
import RocketPanel from '@/components/content/rockets/gallery/RocketPanel';

import ContentHeader from '@/components/content/Header';

export default {
	name: 'RocketsGallery',
	components: {
		ContentHeader,
		RocketPanel
	},
	props: {
		...useRocketsBaseProps
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
			success,
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
		} = useRocketsBaseComponent(props, context, {
			type: AppCommonConstants.Rocketry.DisplayTypes.Site
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
