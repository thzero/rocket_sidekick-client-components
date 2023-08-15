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
		<v-col cols="5" md="2">
			<VNumberField
				ref="di-diameter"
				v-model="displayItem.diameter"
				:readonly="true"
				:label="$t('forms.content.rockets.diameter.name')"
			/>
		</v-col>
		<v-col cols="7" md="4">
			<table>
				<tr>
					<td class="measurementUnits">
						<MeasurementUnitsSelect
							v-model="displayItem.diameterMeasurementUnitsId"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.title')"
						/>
					</td>
					<td class="measurementUnit">
						<MeasurementUnitSelect
							v-model="displayItem.diameterMeasurementUnitId"
							:measurementUnitsId="displayItem.diameterMeasurementUnitsId"
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
	</v-row>
	<v-row dense>
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
	</v-row>
	<v-row dense>
		<v-col>
			<v-expansion-panels
				multiple
			>
				<v-expansion-panel
					v-if="hasAltimeters"
					value="altimeters"
				>
					<v-expansion-panel-title
						color="primary"
					>
						{{ $t(`forms.content.parts.altimeter.plural`) }}
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<RocketParts
							class="mt-2"
							:items="altimeters"
							panelTypeId="altimeters"
							:deletable="isEditable"
							:stage-id="detailItemData.id"
							@delete="clickAltimeterDelete2"
						>
						</RocketParts>
					</v-expansion-panel-text>
				</v-expansion-panel>
				<v-expansion-panel
					v-if="hasRecovery"
					value="recovery"
				>
					<v-expansion-panel-title
						color="primary"
					>
						{{ $t(`forms.content.parts.recovery`) }}
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<RocketParts
							class="mt-2"
							:items="recovery"
							panelTypeId="recovery"
							:deletable="isEditable"
							:stageId="detailItemData.id"
							@delete="clickRecoveryDeleteStage2"
						>
						</RocketParts>
					</v-expansion-panel-text>
				</v-expansion-panel>
				<v-expansion-panel
					v-if="hasTrackers"
					value="trackers"
				>
					<v-expansion-panel-title
						color="primary"
					>
						{{ $t(`forms.content.parts.tracker.plural`) }}
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<RocketParts
							class="mt-2"
							:items="trackers"
							panelTypeId="trackers"
							:deletable="isEditable"
							:stage-id="detailItemData.id"
							@Wdelete="clickTrackerDeleteStage2"
						>
						</RocketParts>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-col>
	</v-row>
	<div
		v-if="isEditable"
		class="d-flex"
	>
		<v-spacer></v-spacer>
		<div>
			<slot name="actionsEdit"></slot>
		</div>
		<div>
			<slot name="actionsView"></slot>
		</div>
	</div>
</template>

<script>
import { useRocketStageComponent } from '@/components/content/rockets/user/rocket/rocketStageComponent';
import { useRocketStageComponentProps } from '@/components/content/rockets/user/rocket/rocketStageComponentProps';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RocketParts from '@/components/content/rockets/user/rocket/RocketParts';
import VNumberField from '@thzero/library_client_vue3_vuetify3/components/form/VNumberField';
import VSelect from '@thzero/library_client_vue3_vuetify3/components/form/VSelect';
import VTextArea from '@thzero/library_client_vue3_vuetify3/components/form/VTextArea';
import VTextField from '@thzero/library_client_vue3_vuetify3/components/form/VTextField';

export default {
	name: 'RocketStageControl',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		RocketParts,
		VNumberField,
		VSelect,
		VTextArea,
		VTextField
	},
	props: {
		...useRocketStageComponentProps
	},
	emits: ['deleteAltimeter', 'deleteRecovery', 'deleteTracker'],
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
			altimeters,
			detailItemData,
			hasAltimeters,
			hasRecovery,
			hasTrackers,
			recovery,
			trackers,
			detailItemAltimeters,
			detailItemCg,
			detailItemCgFrom,
			detailItemCgMeasurementUnitId,
			detailItemCgMeasurementUnitsId,
			detailItemCp,
			detailItemCpFrom,
			detailItemCpMeasurementUnitId,
			detailItemCpMeasurementUnitsId,
			detailItemDescription,
			detailItemLength,
			detailItemLengthMeasurementUnitId,
			detailItemLengthMeasurementUnitsId,
			detailItemName,
			detailItemRecovery,
			detailItemTrackers,
			detailItemWeight,
			detailItemWeightMeasurementUnitId,
			detailItemWeightMeasurementUnitsId,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			dialogPartsDeleteManager,
			dialogPartsDeleteMessage,
			dialogAltimetersSearchManager,
			dialogRecoverySearchManager,
			dialogTrackersSearchManager,
			clickAltimeterDelete,
			clickAltimeterDeleteStage,
			clickRecoveryDelete,
			clickRecoveryDeleteStage,
			clickTrackerDelete,
			clickTrackerDeleteStage,
			clickAltimetersSearch,
			clickAltimetersSearchStage,
			clickRecoverySearch,
			clickRecoverySearchStage,
			clickTrackersSearch,
			clickTrackersSearchStage,
			dialogPartsDeleteCancel,
			dialogPartsDeleteOk,
			resetEditData,
			selectAltimeter,
			selectRecovery,
			selectTracker,
			setEditData,
			detailItemI,
			displayItem,
			clickAltimeterDelete2,
			clickRecoveryDeleteStage2,
			clickTrackerDeleteStage2
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
			altimeters,
			detailItemData,
			hasAltimeters,
			hasRecovery,
			hasTrackers,
			recovery,
			trackers,
			detailItemAltimeters,
			detailItemCg,
			detailItemCgFrom,
			detailItemCgMeasurementUnitId,
			detailItemCgMeasurementUnitsId,
			detailItemCp,
			detailItemCpFrom,
			detailItemCpMeasurementUnitId,
			detailItemCpMeasurementUnitsId,
			detailItemDescription,
			detailItemLength,
			detailItemLengthMeasurementUnitId,
			detailItemLengthMeasurementUnitsId,
			detailItemName,
			detailItemRecovery,
			detailItemTrackers,
			detailItemWeight,
			detailItemWeightMeasurementUnitId,
			detailItemWeightMeasurementUnitsId,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			dialogPartsDeleteManager,
			dialogPartsDeleteMessage,
			dialogAltimetersSearchManager,
			dialogRecoverySearchManager,
			dialogTrackersSearchManager,
			clickAltimeterDelete,
			clickAltimeterDeleteStage,
			clickRecoveryDelete,
			clickRecoveryDeleteStage,
			clickTrackerDelete,
			clickTrackerDeleteStage,
			clickAltimetersSearch,
			clickAltimetersSearchStage,
			clickRecoverySearch,
			clickRecoverySearchStage,
			clickTrackersSearch,
			clickTrackersSearchStage,
			dialogPartsDeleteCancel,
			dialogPartsDeleteOk,
			resetEditData,
			selectAltimeter,
			selectRecovery,
			selectTracker,
			setEditData,
			detailItemI,
			displayItem,
			clickAltimeterDelete2,
			clickRecoveryDeleteStage2,
			clickTrackerDeleteStage2
		};
	}
};
</script>

<style>
.v-expansion-panel--active > .v-expansion-panel-title {
	min-height: 0px !important;
}
</style>
