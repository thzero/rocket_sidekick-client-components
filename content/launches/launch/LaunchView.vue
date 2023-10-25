<template>
	<div
		v-if="debug"
	>
		[[ displayItem {{ displayItem }} ]]
	</div>
	<v-row dense>
		<v-col cols="12" sm="8">
				<VtTextField
					v-model="displayItem.name"
					:label="$t('forms.name')"
					:counter="30"
				/>
		</v-col>
		<v-col cols="sm" sm="4">
			<VtDateTimePickerField
				v-model="displayItem.date"
				:default-date="false"
				:readonly="true"
				:label="$t('forms.date')"
			/>
		</v-col>
	</v-row>
	<v-row dense
		v-if="displayItem.description"
	>
		<v-col>
			<VTextArea2
				v-model="displayItem.description"
				:readonly="true"
				:label="$t('forms.description')"
			/>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="12" sm="8">
			<VtTextField
				v-model="displayItemLocationMame"
				:label="$t('forms.content.locations.name')"
				:readonly="true"
			/>
		</v-col>
		<v-col cols="12" sm="4">
			<VtSelect
				v-model="displayItemLocationIteration"
				:label="$t('forms.content.locations.iterations.name')"
			/>
		</v-col>
	</v-row>
	<!-- <v-row dense>
		<v-col cols="12">
			<VtTextField
				v-model="displayItemRocketMame"
				:label="$t('forms.content.rockets.name')"
				:readonly="true"
			/>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="12" sm="6">
			<VtSelect
				v-model="displayItem.success"
				:items="successReasons"
				:readonly="true"
				:label="$t('forms.content.launches.success')"
			/>
		</v-col>
		<v-col cols="12" sm="6">
			<VtSelect
				v-if="isFailure"
				v-model="displayItem.failureReasons"
				:items="failureReasons"
				:readonly="true"
				:label="$t('forms.content.launches.failureReasons')"
			/>
		</v-col>
	</v-row>
	<v-row
		v-if="displayItem.notes"
		dense
	>
		<v-col cols="12">
			<VTextArea2
				v-model="displayItem.notes"
				:readonly="true"
				:label="$t('forms.content.launches.notes')"
				:rows="detailItemTextRows"
			/>
<div v-html="markupHint"></div>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="12">
			<h3 class="mt-6">{{ $t('forms.content.launches.results.title') }}</h3>
		</v-col>
	</v-row> -->
	<!-- <v-row dense>
		<v-col cols="12" sm="6">
			<table style="width: 100%;">
				<tr>
					<td>
						<VtNumberField
							v-model="detailitemResultsAccelerationMax"
							:readonly="true"
							:label="$t('forms.content.launches.results.acceleration.max')"
						/>
					</td>
					<td class="measurementUnitMedium">
						<MeasurementUnitSelect2
							v-model="detailItemResultsAccelerationMaxMeasurementUnitId"
							vid="detailItemResultsAccelerationMaxMeasurementUnitId"
							:measurementUnitsType="measurementUnitsAccelerationType"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.length')"
						/>
					</td>
				</tr>
			</table>
		</v-col>
		<v-col cols="12" sm="6">
			<table style="width: 100%;">
				<tr>
					<td>
						<VtNumberField
							v-model="detailitemResultsVelocityMax"
							:readonly="true"
							:label="$t('forms.content.launches.results.velocity.max')"
						/>
					</td>
					<td class="measurementUnitLong">
						<MeasurementUnitSelect2
							v-model="detailItemResultsVelocityMaxMeasurementUnitId"
							:measurementUnitsType="measurementUnitsVelocityType"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.velocity')"
						/>
					</td>
				</tr>
			</table>
		</v-col>
		<v-col cols="12" sm="6">
			<table style="width: 100%;">
				<tr>
					<td>
						<VtNumberField
							v-model="detailitemResultsAltitudeMax"
							:readonly="true"
							:label="$t('forms.content.launches.results.altitude.max')"
						/>
					</td>
					<td class="measurementUnitLong">
						<MeasurementUnitSelect2
							v-model="detailItemResultsAltitudeMaxMeasurementUnitId"
							:measurementUnitsType="measurementUnitsDistanceType"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.altitude')"
						/>
					</td>
				</tr>
			</table>
		</v-col>
		<v-col cols="12" sm="6">
			<table style="width: 100%;">
				<tr>
					<td>
						<VtNumberField
							v-model="detailitemResultsAltitudeDeployMain"
							:readonly="true"
							:label="$t('forms.content.launches.results.altitude.main')"
						/>
					</td>
					<td class="measurementUnitLong">
						<MeasurementUnitSelect2
							v-model="detailItemResultsAltitudeDeployMainMeasurementUnitId"
							:measurementUnitsType="measurementUnitsDistanceType"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.altitude')"
						/>
					</td>
				</tr>
			</table>
		</v-col>
		<v-col cols="12" sm="6">
			<table style="width: 100%;">
				<tr>
					<td>
						<VtNumberField
							v-model="detailitemResultsAltitudeDeployDrogue"
							:readonly="true"
							:label="$t('forms.content.launches.results.altitude.drogue')"
						/>
					</td>
					<td class="measurementUnitLong">
						<MeasurementUnitSelect2
							v-model="detailItemResultsAltitudeDeployDrogueMeasurementUnitId"
							:measurementUnitsType="measurementUnitsDistanceType"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.altitude')"
						/>
					</td>
				</tr>
			</table>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="6" sm="3">
			<VtNumberField
				v-model="detailitemResultsCoordsLatLaunch"
				:readonly="true"
				:label="$t('forms.content.launches.results.coords.lat') + ' ' + $t('forms.content.launches.results.coords.launch')"
			/>
		</v-col>
		<v-col cols="6" sm="3">
			<VtNumberField
				v-model="detailitemResultsCoordsLongLaunch"
				:readonly="true"
				:label="$t('forms.content.launches.results.coords.long') + ' ' + $t('forms.content.launches.results.coords.launch')"
			/>
		</v-col>
		<v-col cols="6" sm="3">
			<VtNumberField
				v-model="detailitemResultsCoordsLatRecovery"
				:readonly="true"
				:label="$t('forms.content.launches.results.coords.lat') + ' ' + $t('forms.content.launches.results.coords.recovery')"
			/>
		</v-col>
		<v-col cols="6" sm="3">
			<VtNumberField
				v-model="detailitemResultsCoordsLongRecovery"
				:readonly="true"
				:label="$t('forms.content.launches.results.coords.long') + ' ' + $t('forms.content.launches.results.coords.recovery')"
			/>
		</v-col>
	</v-row> -->
</template>

<script>
import { useLaunchViewComponent } from '@/components/content/launches/launch/launchViewComponent';
import { useLaunchViewComponentProps } from '@/components/content/launches/launch/launchViewComponentProps';

import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtDateTimePickerField from '@thzero/library_client_vue3_vuetify3/components/form/VtDateTimePickerFieldTemp';
import VtNumberField from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberField';
import VTextArea2 from '@thzero/library_client_vue3_vuetify3/components/form/VTextArea2';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

export default {
	name: 'LaunchViewControl',
	components: {
		MeasurementUnitSelect2,
		VtDateTimePickerField,
		VtNumberField,
		VtSelect,
		VTextArea2,
		VtTextField
	},
	props: {
		...useLaunchViewComponentProps
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
			measurementUnitsAccelerationDefaultId,
			measurementUnitsAccelerationType,
			measurementUnitsDistanceType,
			measurementUnitsDistanceDefaultId,
			measurementUnitsVelocityDefaultId,
			measurementUnitsVelocityType,
			displayItemMeasurement,
			displayItemMeasurementLength,
			displayItemMeasurementWeight,
			measurementUnitsFromUnitId,
			failureReasons,
			successReasons,
			displayItem,
			displayItemLocationIteration,
			displayItemLocationMame,
			displayItemRocketMame,
			isFailure,
			isSuccess
		} = useLaunchViewComponent(props, context, options);

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
			measurementUnitsAccelerationDefaultId,
			measurementUnitsAccelerationType,
			measurementUnitsDistanceType,
			measurementUnitsDistanceDefaultId,
			measurementUnitsVelocityDefaultId,
			measurementUnitsVelocityType,
			displayItemMeasurement,
			displayItemMeasurementLength,
			displayItemMeasurementWeight,
			measurementUnitsFromUnitId,
			failureReasons,
			successReasons,
			displayItem,
			displayItemLocationIteration,
			displayItemLocationMame,
			displayItemRocketMame,
			isFailure,
			isSuccess
		};
	}
};
</script>

<style>
.v-expansion-panel--active > .v-expansion-panel-title {
	min-height: 0px !important;
}
</style>
