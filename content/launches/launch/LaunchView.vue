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
			<VtTextArea
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
	<v-row dense>
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
			<VtTextArea
				v-model="displayItem.notes"
				:readonly="true"
				:label="$t('forms.content.launches.notes')"
				:rows="detailItemTextRows"
			/>
<div v-html="markupHint"></div>
		</v-col>
	</v-row>
	<v-row dense
		v-if="displayItem.results"
	>
		<v-col cols="12">
			<h3 class="mt-6">{{ $t('forms.content.launches.results.title') }}</h3>
		</v-col>
	</v-row>
	<v-row dense
		v-if="displayItem.results"
	>
		<v-col
			v-if="displayItemResultsAccelerationMax"
			cols="12" sm="6"
		>
			<VtTextField
				v-model="displayItemResultsAccelerationMax"
				:label="$t('forms.content.launches.results.acceleration.max')"
			/>
		</v-col>
		<v-col
			v-if="displayItemResultsVelocityMax"
			cols="12" sm="6"
		>
			<VtTextField
				v-model="displayItemResultsVelocityMax"
				:label="$t('forms.content.launches.results.velocity.max')"
			/>
		</v-col>
		<v-col
			v-if="displayItemResultsAltitudeMax"
			cols="12" sm="6"
		>
			<VtTextField
				v-model="displayItemResultsAltitudeMax"
				:label="$t('forms.content.launches.results.altitude.max')"
			/>
		</v-col>
		<v-col
			v-if="displayItemResultsAltitudeMain"
			cols="12" sm="6"
		>
			<VtTextField
				v-model="displayItemResultsAltitudeMain"
				:label="$t('forms.content.launches.results.altitude.main')"
			/>
		</v-col>
		<v-col
			v-if="displayItemResultsAltitudeDrogue"
			cols="12" sm="6"
		>
			<VtTextField
				v-model="displayItemResultsAltitudeDrogue"
				:label="$t('forms.content.launches.results.altitude.drogue')"
			/>
		</v-col>
	</v-row>
	<v-row dense
		v-if="displayItem.hasCoords"
	>
		<v-col
			v-if="displayItemResultsCoordsLatLaunch"
			cols="6" sm="3"
		>
			<VtNumberField
				v-model="displayItemResultsCoordsLatLaunch"
				:readonly="true"
				:label="$t('forms.content.launches.results.coords.lat') + ' ' + $t('forms.content.launches.results.coords.launch')"
			/>
		</v-col>
		<v-col
			v-if="displayItemResultsCoordsLongLaunch"
			cols="6" sm="3"
		>
			<VtNumberField
				v-model="displayItemResultsCoordsLongLaunch"
				:readonly="true"
				:label="$t('forms.content.launches.results.coords.long') + ' ' + $t('forms.content.launches.results.coords.launch')"
			/>
		</v-col>
		<v-col
			v-if="displayItemResultsCoordsLatRecovery"
			cols="6" sm="3"
		>
			<VtNumberField
				v-model="displayItemResultsCoordsLatRecovery"
				:readonly="true"
				:label="$t('forms.content.launches.results.coords.lat') + ' ' + $t('forms.content.launches.results.coords.recovery')"
			/>
		</v-col>
		<v-col
			v-if="displayItemResultsCoordsLongRecovery"
			cols="6" sm="3"
		>
			<VtNumberField
				v-model="displayItemResultsCoordsLongRecovery"
				:readonly="true"
				:label="$t('forms.content.launches.results.coords.long') + ' ' + $t('forms.content.launches.results.coords.recovery')"
			/>
		</v-col>
	</v-row>
	<v-row>
	<!-- <v-row dense
		v-if="displayItem.hasCoords"
	> -->
		<v-col>
			<LocationMapping
				:id="displayItem.id"
				type="recovery"
				:coordsLaunch="displayItemResultsCoordsLaunch"
				:coordsRecovery="displayItemResultsCoordsRecovery"
			></LocationMapping>
		</v-col>
	</v-row>
</template>

<script>
import { useLaunchViewComponent } from '@/components/content/launches/launch/launchViewComponent';
import { useLaunchViewComponentProps } from '@/components/content/launches/launch/launchViewComponentProps';

import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtDateTimePickerField from '@thzero/library_client_vue3_vuetify3/components/form/VtDateTimePickerFieldTemp';
import VtNumberField from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberField';
import VtTextArea from '@thzero/library_client_vue3_vuetify3/components/form/VtTextArea';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';
import LocationMapping from '@/components/content/launches/launch/LaunchMap';

export default {
	name: 'LaunchViewControl',
	components: {
		MeasurementUnitSelect2,
		VtDateTimePickerField,
		VtNumberField,
		VtSelect,
		VtTextArea,
		VtTextField,
		LocationMapping
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
			displayItemResultsAccelerationDrogue,
			displayItemResultsAccelerationMain,
			displayItemResultsAccelerationMax,
			displayItemResultsAltitudeDrogue,
			displayItemResultsAltitudeMain,
			displayItemResultsAltitudeMax,
			displayItemResultsCoordsLatLaunch,
			displayItemResultsCoordsLongLaunch,
			displayItemResultsCoordsLatRecovery,
			displayItemResultsCoordsLongRecovery,
			displayItemResultsCoordsLaunch,
			displayItemResultsCoordsRecovery,
			displayItemResultsVelocityMax,
			displayItemResultsVelocityRecovery,
			displayItemRocketMame,
			hasCoords,
			hasCoordsLaunch,
			hasCoordsRecovery,
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
			displayItemResultsAccelerationDrogue,
			displayItemResultsAccelerationMain,
			displayItemResultsAccelerationMax,
			displayItemResultsAltitudeDrogue,
			displayItemResultsAltitudeMain,
			displayItemResultsAltitudeMax,
			displayItemResultsCoordsLatLaunch,
			displayItemResultsCoordsLongLaunch,
			displayItemResultsCoordsLatRecovery,
			displayItemResultsCoordsLongRecovery,
			displayItemResultsCoordsLaunch,
			displayItemResultsCoordsRecovery,
			displayItemResultsVelocityMax,
			displayItemResultsVelocityRecovery,
			displayItemRocketMame,
			hasCoords,
			hasCoordsLaunch,
			hasCoordsRecovery,
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
