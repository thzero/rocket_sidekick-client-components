<template>
	<div
		v-if="debug"
	>
		[[ displayItem {{ displayItem }} ]]
	</div>
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
		<v-col cols="12" sm="6">
			<VtTextField
				v-model="displayItemLocationName"
				:label="$t('forms.content.locations.name')"
				:readonly="true"
			/>
		</v-col>
		<v-col 
			v-if="displayItemLocationIterationAddress"
			cols="12" sm="6"
		>
			<VtTextField
				v-model="displayItemLocationIterationAddress"
				:label="$t('forms.content.locations.address')"
				:readonly="true"
			/>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="12" sm="6">
			<VtTextField
				v-model="displayItemRocketMame"
				:label="$t('forms.content.rockets.name')"
				:readonly="true"
			/>
		</v-col>
	<!-- </v-row>
	<v-row dense> -->
		<!-- <v-col cols="12" sm="6">
			<VtSelect
				v-model="displayItem.success"
				:items="successReasons"
				:readonly="true"
				:label="$t('forms.content.launches.success')"
			/>
		</v-col> -->
		<v-col cols="12" sm="6">
			<VtSelect
				v-if="isFailure"
				v-model="displayItem.failureReasons"
				:items="failureReasons"
				:chips="true"
				:readonly="true"
				:label="$t('forms.content.launches.failureReasons')"
			/>
		</v-col>
	</v-row>
	<v-row
		dense
	>
		<v-col 
			v-if="displayItem.albumUrl"
			cols="12" md="6"
		>
			<a :href="displayItem.albumUrl" target="_blank">{{ displayItem.albumUrl }}</a>
		</v-col>
		<v-col 
			v-if="displayItem.videoUrl"
			cols="12" md="6"
		>
			<a :href="displayItem.videoUrl" target="_blank">{{ displayItem.videoUrl }}</a>
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
	<v-row densemdAndUp
		v-if="hasCoords && $vuetify.display.mdAndUp"
	>
		<v-col cols="6">
			<LaunchMapping
				:id="displayItem.id"
				type="recovery"
				:coordsLaunch="displayItemResultsCoordsLaunch"
				:coordsRecovery="displayItemResultsCoordsRecovery"
			></LaunchMapping>
		</v-col>
		<v-col cols="6">
			<v-row dense>
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
		</v-col>
	</v-row>
	<v-row
		v-if="displayItem.results && $vuetify.display.smAndDown"
		dense
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
	<v-row
		v-if="hasCoords && $vuetify.display.smAndDown"
		dense
	>
		<v-col>
			<LaunchMapping
				:id="displayItem.id"
				type="recovery"
				:coordsLaunch="displayItemResultsCoordsLaunch"
				:coordsRecovery="displayItemResultsCoordsRecovery"
			></LaunchMapping>
		</v-col>
	</v-row>
</template>

<script>
import { useLaunchViewComponent } from '@/components/content/launches/launch/launchViewComponent';
import { useLaunchViewComponentProps } from '@/components/content/launches/launch/launchViewComponentProps';

import LaunchMapping from '@/components/content/launches/launch/LaunchMap';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtTextArea from '@thzero/library_client_vue3_vuetify3/components/form/VtTextArea';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

export default {
	name: 'LaunchViewControl',
	components: {
		MeasurementUnitSelect2,
		VtSelect,
		VtTextArea,
		VtTextField,
		LaunchMapping
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
			measurementUnitsAltitudeType,
			measurementUnitsAltitudeDefaultId,
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
			displayItemLocationLink,
			displayItemLocationIteration,
			displayItemLocationIterationAddress,
			displayItemLocationName,
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
			measurementUnitsAltitudeType,
			measurementUnitsAltitudeDefaultId,
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
			displayItemLocationLink,
			displayItemLocationIteration,
			displayItemLocationIterationAddress,
			displayItemLocationName,
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
