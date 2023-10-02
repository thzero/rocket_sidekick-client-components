<template>
	<div
		v-if="search"
		style="width: 100%;"
	>
		<div
			v-for="item in results" 
			:key="item.typeId"
			:value="item.typeId"
			style="width: 100%;"
		>
			<div
				v-for="item2 in item.results" 
				:key="item2.id"
				style="width: 100%;"
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
						<MotorPanelTitle
							v-if="isPartType(item2, partTypes.motor)"
							:item="item2"
						/>
						<MotorCasePanelTitle
							v-if="isPartType(item2, partTypes.motorCase)"
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
		</div>
	</div>
	<v-expansion-panel
		v-if="!search"
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
						<MotorPanelTitle
							v-if="isPartType(item2, partTypes.motor)"
							:item="item2"
						/>
						<MotorCasePanelTitle
							v-if="isPartType(item2, partTypes.motorCase)"
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
					<v-card-text>
						<slot name="partText" :item="item2">
						</slot>
					</v-card-text>
					<v-card-actions
						v-if="deletable || editable || selectable"
					>
						<v-spacer></v-spacer>
						<v-btn
							v-if="deletable && !item2.fromRocket"
							:variant="buttonsForms.variant.delete"
							:color="buttonsForms.color.delete"
							@click="clickDelete(item2, stageId)"
						>{{ $t('buttons.delete') }}</v-btn>
						<v-btn
							v-if="editable"
							:variant="buttonsForms.variant.edit"
							:color="buttonsForms.color.edit"
							@click="clickEdit(item2, stageId)"
						>{{ $t('buttons.edit') }}</v-btn>
						<v-btn
							v-if="selectable && !item2.fromRocket"
							:variant="buttonsForms.variant.default"
							:color="buttonsForms.color.default"
							@click="clickSelect(item2, stageId)"
						>{{ $t('buttons.select') }}</v-btn>
					</v-card-actions>
				</v-card>
			</div>
		</v-expansion-panel-text>
	</v-expansion-panel>
</template>

<script>
import { useRocketPartsComponent } from '@/components/content/rockets/parts/rocketPartsComponent';
import { useRocketPartsComponentProps } from '@/components/content/rockets/parts/rocketPartsComponentProps';

import AltimeterPanelTitle from '@/components/content/parts/altimeters/AltimeterPanelTitle';
import ChuteProtectorPanelTitle from '@/components/content/parts/chuteProtectors/ChuteProtectorPanelTitle';
import ChuteReleasePanelTitle from '@/components/content/parts/chuteReleases/ChuteReleasePanelTitle';
import DeploymentBagPanelTitle from '@/components/content/parts/deploymentBags/DeploymentBagPanelTitle';
import MotorPanelTitle from '@/components/content/parts/motors/MotorPanelTitle';
import MotorCasePanelTitle from '@/components/content/parts/motorCases/MotorCasePanelTitle';
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
		MotorPanelTitle,
		MotorCasePanelTitle,
		ParachutePanelTitle,
		StreamerPanelTitle,
		TrackerPanelTitle
	},
	props: {
		...useRocketPartsComponentProps
	},
	emits: ['delete', 'edit', 'select'],
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
			panels,
			partTypes,
			results,
			clickDelete,
			clickEdit,
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
			panels,
			partTypes,
			results,
			clickDelete,
			clickEdit,
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
</style>
