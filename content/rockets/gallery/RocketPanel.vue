<template>
	<v-card
		:key="item.name"
		class="mx-auto"
		max-width="500"
		color="secondary"
	>
		<div
			style="background-color: #b6b6b6;"
		>
			<a 
				v-if="!clickType || clickType==='hyperlink'"
				:href="rocketUrl(item)"
			>
				<v-img
					:src="hasCoverUrl(item) ? item.coverUrl : '/images/blank.png'"
					cover
				></v-img>
			</a>
			<a 
				v-if="clickType==='click'"
				@click="clickRocket(item)"
				style="cursor: pointer;"
			>
				<v-img
					:src="hasCoverUrl(item) ? item.coverUrl : '/images/blank.png'"
					cover
				>
					<div class="text-right pt-4">
						<v-btn
							:variant="buttonsForms.variant.default"
							:color="buttonsForms.color.default"
							class="mr-2"
							:to="rocketUrl(item)"
							target="_blank"
							icon="mdi-open-in-new"
							@click.native.stop=""
						>
						</v-btn>
							<!-- 
							append-icon="mdi mdi-open-in-new"
							{{ $t('buttons.open') }} -->
					</div>
				</v-img>
			</a>
		</div>

		<v-card-title>
			<v-row dense>
				<v-col>
					<v-btn
						v-if="!clickType || clickType==='hyperlink'"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						:to="rocketUrl(item)"
						size="large"
					>
						{{ item.name }}
					</v-btn>
					<v-btn
						v-if="clickType==='click'"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						size="large"
						@click="clickRocket(item)"
					>
						{{ item.name }}
					</v-btn>
				</v-col>
				<v-col>
					<img :src="rocketTypeIcon(item)" style="height: 48px; float: right;" />
				</v-col>
			</v-row>
		</v-card-title>
		<v-card-text
			v-if="displayExtras"
		>
		</v-card-text>
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
	emits: ['display'],
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
			clickRocket,
			rocketUrl,
			rocketUrlBack
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
			clickRocket,
			rocketUrl,
			rocketUrlBack
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
