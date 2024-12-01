<template>
	<div
		v-if="debug"
	>
		<!-- [[ isEditable {{ isEditable }} ]]
		[[ displayItem {{ displayItem }} ]]
		[[ altimeters {{ altimeters }} ]]
		[[ chuteProtectors {{ chuteProtectors }} ]]
		[[ chuteReleases {{ chuteReleases }} ]]
		[[ deploymentBags {{ deploymentBags }} ]]
		[[ parachutes {{ parachutes }} ]]
		[[ streamers {{ streamers }} ]]
		[[ trackers {{ trackers }} ]] -->
	</div>
	<v-row
		dense
		class="mt-2"
	>
		<v-col 
			cols="12"
		>
			<VtTextField
				v-model="displayItem.link"
				:readonly="true"
				:label="$t('forms.content.rockets.videos.url')"
			/>
		</v-col>
	</v-row>
	
	<v-row dense>
		<v-col>
			<div
				v-if="isEditable"
				class="d-flex"
			>
				<v-spacer></v-spacer>
				<div
					v-if="isEditable"
					class="pl-4 pr-4 pb-2 pt-2"
				>
					<slot 
						v-if="isEditable"
						name="actionsEdit"
					>
					</slot>
				</div>
				<div>
					<slot 
						v-if="!isEditable"
						name="actionsView"
					></slot>
				</div>
			</div>
		</v-col>
	</v-row>
</template>

<script>
import { useRocketVideoComponent } from '@/components/content/rockets/library/rocket/rocketVideoComponent';
import { useRocketVideoComponentProps } from '@/components/content/rockets/library/rocket/rocketVideoComponentProps';

import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

export default {
	name: 'RocketStageControl',
	components: {
		VtTextField
	},
	props: {
		...useRocketVideoComponentProps
	},
	setup (props, context, options) {
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
			buttonsForms,
			displayItem
		} = useRocketVideoComponent(props, context, options);

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
			buttonsForms,
			displayItem
		};
	}
};
</script>

<style>
.v-expansion-panel--active > .v-expansion-panel-title {
	min-height: 0px !important;
}
</style>
