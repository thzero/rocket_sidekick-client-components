<template>
	<div>
		<v-expansion-panels
			v-model="panels"
			multiple
			@update:modelValue="panelsUpdated"
		>
			<v-expansion-panel
				v-for="item in results" 
				:key="item.typeId"
				:value="item.typeId"
			>
				<v-expansion-panel-title
					color="secondary"
				>
					{{ partTypeName(item.name) }}
				</v-expansion-panel-title>
				<v-expansion-panel-text>
					<div
						v-for="item2 in item.results" 
						:key="item2.id"
					>
						<v-card
							color="grey-darken-3"
							class="mb-4"
						>
							<v-card-title>
								<ChuteProtectorPanelTitle
									v-if="isPartType(item2, partTypes.chuteProtector)"
									:item="item2"
								/>
								<DeploymentBagPanelTitle
									v-if="isPartType(item2, partTypes.deploymentBag)"
									:item="item2"
								/>
								<ParachutePanelTitle
									v-if="isPartType(item2, partTypes.parachute)"
									:item="item2"
								/>
								<StreamerPanelTitle
									v-if="isPartType(item2, partTypes.streamer)"
									:item="item2"
								/>
								<div 
									class="float-right"
								>{{ manufacturer(item2) }}</div>
							</v-card-title>
							<v-card-actions
								v-if="deletable || selectable"
							>
								<v-spacer></v-spacer>
								<v-btn
									v-if="deletable"
									:variant="buttonsForms.variant.delete"
									:color="buttonsForms.color.delete"
									@click="clickDelete(item2)"
								>{{ $t('buttons.delete') }}</v-btn>
								<v-btn
									v-if="selectable"
									:variant="buttonsForms.variant.select"
									:color="buttonsForms.color.select"
									@click="clickSelect(item2)"
								>{{ $t('buttons.select') }}</v-btn>
							</v-card-actions>
						</v-card>
					</div>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script>
import { useRocketPartsComponent } from '@/components/content/rockets/user/rocket/rocketPartsComponent';
import { useRocketPartsComponentProps } from '@/components/content/rockets/user/rocket/rocketPartsComponentProps';

import ChuteProtectorPanelTitle from '@/components/content/parts/chuteProtectors/ChuteProtectorPanelTitle';
import DeploymentBagPanelTitle from '@/components/content/parts/deploymentBags/DeploymentBagPanelTitle';
import ParachutePanelTitle from '@/components/content/parts/parachutes/ParachutePanelTitle';
import StreamerPanelTitle from '@/components/content/parts/streamers/StreamerPanelTitle';

export default {
	name: 'RocketPartsControl',
	components: {
		ChuteProtectorPanelTitle,
		DeploymentBagPanelTitle,
		ParachutePanelTitle,
		StreamerPanelTitle
	},
	props: {
		...useRocketPartsComponentProps
	},
	emits: ['delete', 'select'],
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
			successResponse,
			isSaving,
			serverErrors,
			setErrors,
			buttonsDialog,
			buttonsForms,
			manufacturersI,
			panels,
			partTypes,
			results,
			clickSelect,
			isPartType,
			manufacturer,
			partTypeName,
			panelsUpdated
		} = useRocketPartsComponent(props, context, options);

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
			successResponse,
			isSaving,
			serverErrors,
			setErrors,
			buttonsDialog,
			buttonsForms,
			manufacturersI,
			panels,
			partTypes,
			results,
			clickSelect,
			isPartType,
			manufacturer,
			partTypeName,
			panelsUpdated
		};
	}
};
</script>

<style>
.v-expansion-panel-text__wrapper {
	padding-bottom: 0px !important;
	padding-right: 0px !important;
}
</style>
