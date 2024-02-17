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
				<!-- reefing -->
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
							@click="clickDeleteRocketPart(item2, stageId)"
						>{{ $t('buttons.delete') }}</v-btn>
						<v-btn
							v-if="selectable"
							:variant="buttonsForms.variant.default"
							:color="buttonsForms.color.default"
							@click="clickSelectRocketPart(item2, stageId)"
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
			<span class="v-card-title pb-0 pl-0 pr-0 pt-0">{{ partTypeName(item.name) }}</span>
		</v-expansion-panel-title>
		<v-expansion-panel-text>
			<div
				v-for="(item2, index2) in item.results" 
				:key="item2.id"
			>
				<v-card
					class="mb-4"
				>
					<v-card-title
						:class="index2 % 2 === 1 ? 'bg-grey-darken-3' : 'bg-grey-darken-1'"
					>
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
						<v-chip
							v-if="item2.fromRocket"
							class="ma-2"
							variant="elevated"
							:color="buttonsForms.color.select"
						>
							{{ $t('forms.content.rockets.from')}}
						</v-chip>
						<v-btn
							v-if="deletable && !item2.fromRocket"
							:variant="buttonsForms.variant.delete"
							:color="buttonsForms.color.delete"
							@click="clickDeleteRocketPart(item2, stageId)"
						>{{ $t('buttons.delete') }}</v-btn>
						<v-btn
							v-if="editablePart(item2)"
							:variant="buttonsForms.variant.edit"
							:color="buttonsForms.color.edit"
							@click="clickEditRocketPart(item2, stageId, item2.typeId)"
						>{{ $t('buttons.edit') }}</v-btn>
						<v-btn
							v-if="selectable && !item2.fromRocket"
							:variant="buttonsForms.variant.default"
							:color="buttonsForms.color.default"
							@click="clickSelectRocketPart(item2, stageId)"
						>{{ $t('buttons.select') }}</v-btn>
					</v-card-actions>
				</v-card>
			</div>
		</v-expansion-panel-text>
	</v-expansion-panel>
	<AltimeterRocketPartDialog
		ref="dialogRocketPartAltimeterRef"
		:debug="debug"
		:pre-complete-ok="dialogEditRocketPartPreCompleteOk"
		:editable="editable"
		:value="dialogEditRocketPartParams"
		:signal="dialogEditRocketPartsManager[appCommonConstants.Rocketry.PartTypes.altimeter].signal"
		@close="dialogEditRocketPartCancel"
		@ok="dialogEditRocketPartOk"
	/>
	<ChuteReleaseRocketPartDialog
		ref="dialogRocketPartChuteReleaseRef"
		:debug="debug"
		:pre-complete-ok="dialogEditRocketPartPreCompleteOk"
		:editable="editable"
		:value="dialogEditRocketPartParams"
		:signal="dialogEditRocketPartsManager[appCommonConstants.Rocketry.PartTypes.chuteRelease].signal"
		@close="dialogEditRocketPartCancel"
		@ok="dialogEditRocketPartOk"
	/>
	<ParachuteRocketPartDialog
		ref="dialogRocketPartParachuteRef"
		:debug="debug"
		:pre-complete-ok="dialogEditRocketPartPreCompleteOk"
		:editable="editable"
		:value="dialogEditRocketPartParams"
		:signal="dialogEditRocketPartsManager[appCommonConstants.Rocketry.PartTypes.parachute].signal"
		@close="dialogEditRocketPartCancel"
		@ok="dialogEditRocketPartOk"
	/>
</template>

<script>
import { useRocketPartsComponent } from '@/components/content/rockets/parts/rocketPartsComponent';
import { useRocketPartsComponentProps } from '@/components/content/rockets/parts/rocketPartsComponentProps';

import AltimeterPanelTitle from '@/components/content/parts/altimeters/AltimeterPanelTitle';
import AltimeterRocketPartDialog from '@/components/content/rockets/parts/dialogs/altimeter/AltimeterRocketPartDialog';
import ChuteProtectorPanelTitle from '@/components/content/parts/chuteProtectors/ChuteProtectorPanelTitle';
import ChuteReleaseRocketPartDialog from '@/components/content/rockets/parts/dialogs/chuteRelease/ChuteReleaseRocketPartDialog';
import ChuteReleasePanelTitle from '@/components/content/parts/chuteReleases/ChuteReleasePanelTitle';
import DeploymentBagPanelTitle from '@/components/content/parts/deploymentBags/DeploymentBagPanelTitle';
import MotorPanelTitle from '@/components/content/parts/motors/MotorPanelTitle';
import MotorCasePanelTitle from '@/components/content/parts/motorCases/MotorCasePanelTitle';
import ParachuteRocketPartDialog from '@/components/content/rockets/parts/dialogs/parachute/ParachuteRocketPartDialog';
import ParachutePanelTitle from '@/components/content/parts/parachutes/ParachutePanelTitle';
import StreamerPanelTitle from '@/components/content/parts/streamers/StreamerPanelTitle';
import TrackerPanelTitle from '@/components/content/parts/trackers/TrackerPanelTitle';

export default {
	name: 'RocketPartsControl',
	components: {
		AltimeterPanelTitle,
		AltimeterRocketPartDialog,
		ChuteProtectorPanelTitle,
		ChuteReleaseRocketPartDialog,
		ChuteReleasePanelTitle,
		DeploymentBagPanelTitle,
		MotorPanelTitle,
		MotorCasePanelTitle,
		ParachutePanelTitle,
		ParachuteRocketPartDialog,
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
			appCommonConstants,
			dialogEditRocketPartsManager,
			dialogEditRocketPartParams,
			panels,
			partTypes,
			results,
			clickDeleteRocketPart,
			clickEditRocketPart,
			clickSelectRocketPart,
			dialogEditRocketPartCancel,
			dialogEditRocketPartOk,
			dialogEditRocketPartPreCompleteOk,
			editablePart,
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
			appCommonConstants,
			dialogEditRocketPartsManager,
			dialogEditRocketPartParams,
			panels,
			partTypes,
			results,
			clickDeleteRocketPart,
			clickEditRocketPart,
			clickSelectRocketPart,
			dialogEditRocketPartCancel,
			dialogEditRocketPartOk,
			dialogEditRocketPartPreCompleteOk,
			editablePart,
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
