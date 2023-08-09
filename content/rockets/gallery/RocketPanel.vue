<template>
	<v-card
		:key="item.name"
		class="mx-auto"
		max-width="400"
		color="secondary"
	>
		<v-img
			v-if="hasCoverUrl(item)"
			:src="item.coverUrl"
			cover
		></v-img>

		<v-card-title>
			<v-row dense>
				<v-col>
					<v-btn
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						:to="rocketUrl(item)"
						size="large"
					>
						{{ item.name }}
					</v-btn>
				</v-col>
				<v-col>
					<img :src="rocketTypeIcon(item)" style="height: 48px; float: right;" />
				</v-col>
			</v-row>
		</v-card-title>
	</v-card>
</template>

<script>
import { useRocketPanelBaseProps } from '@/components/content/rockets/gallery/rocketPanelBaseProps';
import { useRocketPanelBaseComponent } from '@/components/content/rockets/gallery/rocketPanelBase';

export default {
	name: 'RocketGalleryPanel',
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
			serviceStore,
			sortByOrder,
			target,
			buttonsDialog,
			buttonsForms,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			rocketUrl
		} = useRocketPanelBaseComponent(props, context, options);

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
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
