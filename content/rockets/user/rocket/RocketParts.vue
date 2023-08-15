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
								<AltimeterPanelTitle
									v-if="isPartType(item2, partTypes.altimeter)"
									:item="item2"
								/>
								<ChuteProtectorPanelTitle
									v-if="isPartType(item2, partTypes.chuteProtector)"
									:item="item2"
								/>
								<ChuteReleasePanelTitle
									v-if="isPartType(item2, partTypes.chuteRelease)"
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
								<TrackerPanelTitle
									v-if="isPartType(item2, partTypes.tracker)"
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
									@click="clickDelete(item2, stageId)"
								>{{ $t('buttons.delete') }}</v-btn>
								<v-btn
									v-if="selectable"
									:variant="buttonsForms.variant.default"
									:color="buttonsForms.color.default"
									@click="clickSelect(item2, stageId)"
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

import AltimeterPanelTitle from '@/components/content/parts/altimeters/AltimeterPanelTitle';
import ChuteProtectorPanelTitle from '@/components/content/parts/chuteProtectors/ChuteProtectorPanelTitle';
import ChuteReleasePanelTitle from '@/components/content/parts/chuteReleases/ChuteReleasePanelTitle';
import DeploymentBagPanelTitle from '@/components/content/parts/deploymentBags/DeploymentBagPanelTitle';
import ParachutePanelTitle from '@/components/content/parts/parachutes/ParachutePanelTitle';
import StreamerPanelTitle from '@/components/content/parts/streamers/StreamerPanelTitle';
import TrackerPanelTitle from '@/components/content/parts/trackers/TrackerPanelTitle';

export default {
	name: 'RocketPartsControl',
	components: {
		AltimeterPanelTitle,
		ChuteProtectorPanelTitle,
		ChuteReleasePanelTitle,
		DeploymentBagPanelTitle,
		ParachutePanelTitle,
		StreamerPanelTitle,
		TrackerPanelTitle
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
			clickDelete,
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
			clickDelete,
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
