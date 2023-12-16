<template>
	<!-- <div
		v-if="debug"
	>
		[[ displayItem <pre>{{ displayItem }}</pre> ]]
	</div> -->
	<div
		class="mt-4"
	>
		<v-row
			v-if="displayItemRocketCoverUrl"
			dense
		>
			<v-col
				cols="7"
			>
				<v-row dense>
					<v-col cols="12">
						<VtTextField
							v-model="displayItemLocationName"
							:label="$t('forms.content.locations.name')"
							:readonly="true"
						/>
					</v-col>
					<v-col cols="12">
						<VtTextField
							v-model="displayItemLocationIterationAddress"
							:label="$t('forms.content.locations.address')"
							:readonly="true"
						/>
					</v-col>
					<v-col cols="12">
						<VtSelect
							v-if="isFailure"
							v-model="displayItem.failureReasons"
							:items="failureReasons"
							:chips="true"
							:readonly="true"
							:label="$t('forms.content.launches.failureReasons')"
						/>
					</v-col>
					<v-col cols="12">
						<VtMarkdown 
							v-if="displayItem.description"
							v-model="displayItem.description" :use-github=false 
						/>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="5">
				<img
					:src="displayItemRocketCoverUrl"
					style="width: 150px;display: block;margin-left: auto; margin-right: auto; float: right;"
				/>
			</v-col>
		</v-row>
		<v-row
			v-if="!displayItemRocketCoverUrl"
			dense
		>
			<v-col>
				<VtMarkdown 
					v-if="displayItem.description"
					v-model="displayItem.description" :use-github=false 
				/>
			</v-col>
		</v-row>
		<v-row
			v-if="!displayItemRocketCoverUrl"
			dense
		>
			<v-col
				cols="12" sm="6" lg="4"
			>
				<VtTextField
					v-model="displayItemLocationName"
					:label="$t('forms.content.locations.name')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="displayItemLocationIterationAddress"
				cols="12" sm="6" lg="4"
			>
				<VtTextField
					v-model="displayItemLocationIterationAddress"
					:label="$t('forms.content.locations.address')"
					:readonly="true"
				/>
			</v-col>
			<!-- <v-col cols="12" sm="6" lg="4">
				<VtTextField
					v-model="displayItemRocketMame"
					:label="$t('forms.content.rockets.name')"
					:readonly="true"
				/>
			</v-col> -->
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
			dense
		>
			<v-col 
				cols="12"
			>
				<v-sheet
					class="pt-2 pb-2"
				>
					<h3>{{ $t('titles.content.rockets.specifications') }}</h3>
					<v-divider></v-divider>
				</v-sheet>
			</v-col>
		</v-row>
		<v-row
			v-if="hasWeather"
			dense
		>
			<v-col 
				cols="12"
			>
				<v-sheet
					class="pt-2 pb-2"
				>
					<h3>{{ $t('forms.content.launches.weather.title') }}</h3>
					<v-divider></v-divider>
				</v-sheet>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col
				v-if="hasWeather && displayItem.temperature"
				cols="4" sm="4"
			>
				<VtTextField
					v-model="displayItemTemperature"
					:readonly="true"
					:label="$t('forms.content.launches.weather.temperature')"
				/>
			</v-col>
			<v-col
				v-if="hasWeather && displayItem.windSpeed"
				cols="4" sm="4"
			>
				<VtTextField
					v-model="displayItemWindSpeed"
					:readonly="true"
					:label="$t('forms.content.launches.weather.windspeed')"
				/>
			</v-col>
			<v-col
				v-if="hasWeather && displayItem.weather"
				cols="12" sm="4"
			>
				<VtSelect
					v-model="displayItem.weather"
					:items="weatherOptions"
					multiple
					:readonly="true"
					:label="$t('forms.content.launches.weather.title')"
				/>
			</v-col>
		</v-row>
		<v-row dense
			v-if="hasResults"
		>
			<v-col 
				cols="12"
			>
				<v-sheet
					class="pt-2 pb-2"
				>
					<h3>{{ $t('forms.content.launches.results.title') }}</h3>
					<v-divider></v-divider>
				</v-sheet>
			</v-col>
		</v-row>
		<v-row
			v-if="$vuetify.display.mdAndUp"
			dense
		>
			<v-col
				v-if="hasCoords"
				cols="6"
				lg="5"
			>
				<LaunchMapping
					:id="displayItem.id"
					type="recovery"
					:coordsLaunch="displayItemResultsCoordsLaunch"
					:coordsRecovery="displayItemResultsCoordsRecovery"
				></LaunchMapping>
			</v-col>
			<v-col 
				:cols="hasCoords ? 6 : 12"
				:lg="hasCoords ? 7 : 12"
			>
				<v-row dense>
					<v-col
						v-if="displayItemResultsAccelerationMax"
						:cols="hasCoords ? 4 : 2" :lg="hasCoords ? 3 : 2" :xl="hasCoords ? 2 : 2"
					>
						<VtTextField
							v-model="displayItemResultsAccelerationMax"
							:label="$t('forms.content.launches.results.acceleration.max')"
						/>
					</v-col>
					<v-col
						v-if="displayItemResultsVelocityMax"
						:cols="hasCoords ? 4 : 2" :lg="hasCoords ? 3 : 2" :xl="hasCoords ? 2 : 2"
					>
						<VtTextField
							v-model="displayItemResultsVelocityMax"
							:label="$t('forms.content.launches.results.velocity.max')"
						/>
					</v-col>
					<v-col
						v-if="displayItemResultsAltitudeMax"
						:cols="hasCoords ? 4 : 2" :lg="hasCoords ? 3 : 2" :xl="hasCoords ? 2 : 2"
					>
						<VtTextField
							v-model="displayItemResultsAltitudeMax"
							:label="$t('forms.content.launches.results.altitude.max')"
						/>
					</v-col>
					<v-col
						v-if="displayItemResultsAltitudeMain"
						:cols="hasCoords ? 6 : 3" :lg="hasCoords ? 4 : 2" :xl="hasCoords ? 2 : 2"
					>
						<VtTextField
							v-model="displayItemResultsAltitudeMain"
							:label="$t('forms.content.launches.results.altitude.main')"
						/>
					</v-col>
					<v-col
						v-if="displayItemResultsAltitudeDrogue"
						:cols="hasCoords ? 6 : 3" :lg="hasCoords ? 4 : 2" :xl="hasCoords ? 3 : 2"
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
				cols="6" sm="3"
			>
				<VtTextField
					v-model="displayItemResultsAccelerationMax"
					:label="$t('forms.content.launches.results.acceleration.max')"
				/>
			</v-col>
			<v-col
				v-if="displayItemResultsVelocityMax"
				cols="6" sm="3"
			>
				<VtTextField
					v-model="displayItemResultsVelocityMax"
					:label="$t('forms.content.launches.results.velocity.max')"
				/>
			</v-col>
			<v-col
				v-if="displayItemResultsAltitudeMax"
				cols="6" sm="3"
			>
				<VtTextField
					v-model="displayItemResultsAltitudeMax"
					:label="$t('forms.content.launches.results.altitude.max')"
				/>
			</v-col>
			<v-col
				v-if="displayItemResultsAltitudeMain"
				cols="6" sm="4"
			>
				<VtTextField
					v-model="displayItemResultsAltitudeMain"
					:label="$t('forms.content.launches.results.altitude.main')"
				/>
			</v-col>
			<v-col
				v-if="displayItemResultsAltitudeDrogue"
				cols="6" sm="4"
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
	</div>
</template>

<script>
import { useLaunchViewComponent } from '@/components/content/launches/launch/launchViewComponent';
import { useLaunchViewComponentProps } from '@/components/content/launches/launch/launchViewComponentProps';

import LaunchMapping from '@/components/content/launches/launch/LaunchMap';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

export default {
	name: 'LaunchViewControl',
	components: {
		MeasurementUnitSelect2,
		VtMarkdown,
		VtSelect,
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
			displayItemMeasurement,
			displayItemMeasurementLength,
			measurementUnitsFromUnitId,
			failureReasons,
			successReasons,
			weatherOptions,
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
			displayItemRocketCoverUrl,
			displayItemRocketMame,
			displayItemTemperature,
			displayItemWindSpeed,
			hasCoords,
			hasCoordsLaunch,
			hasCoordsRecovery,
			hasResults,
			hasWeather,
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
			displayItemMeasurement,
			displayItemMeasurementLength,
			measurementUnitsFromUnitId,
			failureReasons,
			successReasons,
			weatherOptions,
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
			displayItemRocketCoverUrl,
			displayItemRocketMame,
			displayItemTemperature,
			displayItemWindSpeed,
			hasCoords,
			hasCoordsLaunch,
			hasCoordsRecovery,
			hasResults,
			hasWeather,
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
