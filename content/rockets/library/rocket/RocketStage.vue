<template>
	<div
		v-if="debug"
	>
		[[ isEditable {{ isEditable }} ]]
		[[ detailItemData {{ detailItemData }} ]]
		[[ altimeters {{ altimeters }} ]]
		[[ recovery {{ recovery }} ]]
		[[ trackers {{ trackers }} ]]
	</div>
	<v-row dense>
		<v-col>
			<VTextArea
				ref="di-description"
				v-model="displayItem.description"
				:readonly="true"
				:label="$t('forms.description')"
				:rows="0"
			/>
		</v-col>
	</v-row>
		<v-row dense>
			<v-col cols="6">
				<VSelect
					ref="manufacturerRef"
					v-model="displayItem.manufacturerId"
					vid="detailItemManufacturer"
					:items="manufacturers"
					:readonly="true"
					:label="$t('forms.content.manufacturer.name')"
				/>
			</v-col>
			<v-col cols="6">
				<VTextField
					ref="detailItemManufacturerStockIdRef"
					v-model="displayItem.manufacturerStockId"
					vid="detailItemManufacturerStockId"
					:readonly="true"
					:label="$t('forms.content.parts.manufacturerId')"
				/>
			</v-col>
		</v-row>
	<v-row dense>
		<v-col cols="5" md="2">
			<VNumberField
				ref="di-diameter"
				v-model="displayItem.diameterMajor"
				:readonly="true"
				:label="$t('forms.content.rockets.diameter.name')"
			/>
		</v-col>
		<v-col cols="7" md="4">
			<table>
				<tr>
					<td class="measurementUnits">
						<MeasurementUnitsSelect
							v-model="displayItem.diameterMajorMeasurementUnitsId"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.title')"
						/>
					</td>
					<td class="measurementUnit">
						<MeasurementUnitSelect
							v-model="displayItem.diameterMajorMeasurementUnitId"
							:measurementUnitsId="displayItem.diameterMajorMeasurementUnitsId"
							:measurementUnitsType="measurementUnitsLengthType"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.length')"
						/>
					</td>
				</tr>
			</table>
		</v-col>
		<v-col cols="5" md="2">
			<VNumberField
				ref="di-length"
				v-model="displayItem.length"
				:readonly="true"
				:label="$t('forms.content.parts.length')"
			/>
		</v-col>
		<v-col cols="7" md="4">
			<table>
				<tr>
					<td class="measurementUnits">
						<MeasurementUnitsSelect
							v-model="displayItem.lengthMeasurementUnitsId"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.title')"
						/>
					</td>
					<td class="measurementUnit">
						<MeasurementUnitSelect
							v-model="displayItem.lengthMeasurementUnitId"
							:measurementUnitsId="displayItem.lengthMeasurementUnitsId"
							:measurementUnitsType="measurementUnitsLengthType"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.length')"
						/>
					</td>
				</tr>
			</table>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="5" md="2">
			<VNumberField
				ref="di-weight"
				v-model="displayItem.weight"
				:readonly="true"
				:label="$t('forms.content.parts.weight')"
			/>
		</v-col>
		<v-col cols="7" md="4">
			<table>
				<tr>
					<td class="measurementUnits">
						<MeasurementUnitsSelect
							v-model="displayItem.weightMeasurementUnitsId"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.title')"
						/>
					</td>
					<td class="measurementUnit">
						<MeasurementUnitSelect
							v-model="displayItem.weightMeasurementUnitId"
							:measurementUnitsId="displayItem.weightMeasurementUnitsId"
							:measurementUnitsType="measurementUnitsWeightType"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.weight')"
						/>
					</td>
				</tr>
			</table>
		</v-col>
		<v-col cols="5" md="2">
			<VNumberField
				ref="di-cp"
				v-model="displayItem.cp"
				:readonly="true"
				:label="$t('forms.content.rockets.cp')"
			/>
		</v-col>
		<v-col cols="7" md="4">
			<table>
				<tr>
					<td class="measurementUnits">
						<MeasurementUnitsSelect
							v-model="displayItem.cpMeasurementUnitsId"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.title')"
						/>
					</td>
					<td class="measurementUnit">
						<MeasurementUnitSelect
							v-model="displayItem.cpMeasurementUnitId"
							:measurementUnitsId="displayItem.cpMeasurementUnitsId"
							:measurementUnitsType="measurementUnitsLengthType"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.length')"
						/>
					</td>
				</tr>
			</table>
		</v-col>
	</v-row>
	<!-- <v-row dense>
		<v-col cols="5" md="2">
			<VNumberField
				ref="di-cg"
				v-model="displayItem.cg"
				:readonly="true"
				:label="$t('forms.content.rockets.cg')"
			/>
		</v-col>
		<v-col cols="7" md="4">
			<table>
				<tr>
					<td class="measurementUnits">
						<MeasurementUnitsSelect
							v-model="displayItem.cgMeasurementUnitsId"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.title')"
						/>
					</td>
					<td class="measurementUnit">
						<MeasurementUnitSelect
							v-model="displayItem.cgMeasurementUnitId"
							:measurementUnitsId="displayItem.cgMeasurementUnitsId"
							:measurementUnitsType="measurementUnitsLengthType"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.length')"
						/>
					</td>
				</tr>
			</table>
		</v-col>
		<v-col cols="5" md="2">
			<VNumberField
				ref="di-cp"
				v-model="displayItem.cp"
				:readonly="true"
				:label="$t('forms.content.rockets.cp')"
			/>
		</v-col>
		<v-col cols="7" md="4">
			<table>
				<tr>
					<td class="measurementUnits">
						<MeasurementUnitsSelect
							v-model="displayItem.cpMeasurementUnitsId"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.title')"
						/>
					</td>
					<td class="measurementUnit">
						<MeasurementUnitSelect
							v-model="displayItem.cpMeasurementUnitId"
							:measurementUnitsId="displayItem.cpMeasurementUnitsId"
							:measurementUnitsType="measurementUnitsLengthType"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.length')"
						/>
					</td>
				</tr>
			</table>
		</v-col>
	</v-row> -->
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
					<v-btn
						class="mr-2"
						color="primary"
					>
						{{ $t('buttons.add') }}
						<v-menu 
							activator="parent"
							location="top"
						>
							<v-list>
								<v-list-item>
									<v-btn
										variant="flat"
										color="purple"
										@click="clickAltimetersSearchStage(detailItemData.id)"
									>
										{{ $t('forms.content.parts.altimeter.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickRecoverySearchStage(item)"
									>
										{{ $t('forms.content.parts.recovery') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="blue"
										@click="clickTrackersSearchStage(item)"
									>
										{{ $t('forms.content.parts.tracker.name') }}
									</v-btn>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-btn>
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
	<v-row dense>
		<v-col>
			<v-expansion-panels
				v-model="panels"
				multiple
				@update:modelValue="panelsUpdated"
			>
				<RocketParts
					:items="altimeters"
					:deletable="isEditable"
					:stage-id="detailItemData.id"
					@delete="handleAltimeterDeleteStage"
				>
				</RocketParts>
				<RocketParts
					:items="recovery"
					:deletable="isEditable"
					:stageId="detailItemData.id"
					@delete="handleRecoveryDeleteStage"
				>
				</RocketParts>
				<RocketParts
					:items="trackers"
					:deletable="isEditable"
					:stageId="detailItemData.id"
					@delete="handleTrackerDeleteStage"
				></RocketParts>
			</v-expansion-panels>
		</v-col>
	</v-row>
	<AltimetersLookupDialog
		ref="dialogAltimetersSearchManagerRef"
		:signal="dialogAltimetersSearchManager.signal"
		@close="dialogAltimetersSearchManager.cancel()"
		@ok="selectAltimeter"
	/>
	<RecoveryLookupDialog
		ref="dialogRecoverySearchRef"
		:signal="dialogRecoverySearchManager.signal"
		@close="dialogRecoverySearchManager.cancel()"
		@ok="selectRecovery"
	/>
	<TrackersLookupDialog
		ref="dialogTrackersSearchRef"
		:signal="dialogTrackersSearchManager.signal"
		@close="dialogTrackersSearchManager.cancel()"
		@ok="selectTracker"
	/>
	<VConfirmationDialog
		ref="dialogPartsDeleteRef"
		:message="dialogPartsDeleteMessage"
		:messageRaw=true
		:signal="dialogPartsDeleteManager.signal"
		@cancel="dialogPartsDeleteCancel"
		@ok="dialogPartsDeleteOk"
	/>
</template>

<script>
import { useRocketStageComponent } from '@/components/content/rockets/library/rocket/rocketStageComponent';
import { useRocketStageComponentProps } from '@/components/content/rockets/library/rocket/rocketStageComponentProps';

import ChuteProtectorPanelTitle from '@/components/content/parts/chuteProtectors/ChuteProtectorPanelTitle';
import DeploymentBagPanelTitle from '@/components/content/parts/deploymentBags/DeploymentBagPanelTitle';
import ParachutePanelTitle from '@/components/content/parts/parachutes/ParachutePanelTitle';
import StreamerPanelTitle from '@/components/content/parts/streamers/StreamerPanelTitle';

import AltimetersLookupDialog from '@/components/content/rockets/library/dialogs/altimeters/AltimetersLookupDialog';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RocketParts from '@/components/content/rockets/library/rocket/RocketParts';
import RecoveryLookupDialog from '@/components/content/rockets/library/dialogs/recovery/RecoveryLookupDialog';
import TrackersLookupDialog from '@/components/content/rockets/library/dialogs/trackers/TrackersLookupDialog';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VNumberField from '@thzero/library_client_vue3_vuetify3/components/form/VNumberField';
import VSelect from '@thzero/library_client_vue3_vuetify3/components/form/VSelect';
import VTextArea from '@thzero/library_client_vue3_vuetify3/components/form/VTextArea';
import VTextField from '@thzero/library_client_vue3_vuetify3/components/form/VTextField';

export default {
	name: 'RocketStageControl',
	components: {
		AltimetersLookupDialog,
		ChuteProtectorPanelTitle,
		DeploymentBagPanelTitle,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		ParachutePanelTitle,
		RocketParts,
		RecoveryLookupDialog,
		StreamerPanelTitle,
		TrackersLookupDialog,
		VConfirmationDialog,
		VFormControl,
		VNumberField,
		VSelect,
		VTextArea,
		VTextField
	},
	props: {
		...useRocketStageComponentProps
	},
	// emits: ['deleteAltimeter', 'deleteRecovery', 'deleteTracker'],
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
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			displayItem,
			altimeters,
			detailItemData,
			hasAltimeters,
			hasRecovery,
			hasTrackers,
			recovery,
			trackers,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			dialogPartsDeleteManager,
			dialogPartsDeleteMessage,
			dialogAltimetersSearchManager,
			dialogRecoverySearchManager,
			dialogTrackersSearchManager,
			manufacturers,
			panels,
			clickAltimetersSearchStage,
			clickRecoverySearchStage,
			clickTrackersSearchStage,
			dialogPartsDeleteCancel,
			dialogPartsDeleteOk,
			handleAltimeterDeleteStage,
			handleRecoveryDeleteStage,
			handleTrackerDeleteStage,
			panelsUpdated,
			selectAltimeter,
			selectRecovery,
			selectTracker
		} = useRocketStageComponent(props, context, options);

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
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			displayItem,
			altimeters,
			detailItemData,
			hasAltimeters,
			hasRecovery,
			hasTrackers,
			recovery,
			trackers,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			dialogPartsDeleteManager,
			dialogPartsDeleteMessage,
			dialogAltimetersSearchManager,
			dialogRecoverySearchManager,
			dialogTrackersSearchManager,
			manufacturers,
			panels,
			clickAltimetersSearchStage,
			clickRecoverySearchStage,
			clickTrackersSearchStage,
			dialogPartsDeleteCancel,
			dialogPartsDeleteOk,
			handleAltimeterDeleteStage,
			handleRecoveryDeleteStage,
			handleTrackerDeleteStage,
			panelsUpdated,
			selectAltimeter,
			selectRecovery,
			selectTracker
		};
	}
};
</script>

<style>
.v-expansion-panel--active > .v-expansion-panel-title {
	min-height: 0px !important;
}
</style>
