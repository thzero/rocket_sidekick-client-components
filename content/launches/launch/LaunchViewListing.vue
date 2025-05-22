<template>
	<!-- <div
		v-if="debug"
	>
		[[ displayItem <pre>{{ displayItem }}</pre> ]]
	</div> -->
	<template
		v-if="!isHeaders"
	>
	<tr>
		<td style="white-space:nowrap;">{{ displayItemDate }}</td>
		<td style="white-space:nowrap;">{{ displayItemRocketMame }}</td>
		<td style="min-width: 250px;">{{ displayItemLocationName }}</td>
		<!-- <td>{{ displayItemLocationIterationAddress }}</td> -->
		<td>{{ displayItem.failureReasons }}</td>
		<td>{{ displayItemRocketDiameter }}</td>
		<td>{{ displayItemRocketLength }}</td>
		<td>{{ displayItemRocketWeight }}</td>
		<td>{{ displayItemRocketCg }}</td>
		<td>{{ displayItemRocketCp }}</td>
		<td>
			<div
				v-for="(items, index) in displayItemRocketMotors"
				:key="index"
				style="white-space:nowrap;"
			>
				<div
					v-for="(motors, index2) in items"
					:key="index2"
				>
					<div
						v-for="(motor, index2) in motors"
						:key="index2"
					>
						{{ motor.name }}
					</div>
				</div>
			</div>
		</td>
		<td>{{ displayItem.temperature }}</td>
		<td>{{ displayItem.windSpeed }}</td>
		<td>{{ displayItemResultsAccelerationMax }}</td>
		<td>{{ displayItemResultsVelocityMax }}</td>
		<td>{{ displayItemResultsAltitudeMax }}</td>
		<td>{{ displayItemResultsAltitudeMain }}</td>
		<td>{{ displayItemResultsAltitudeDrogue }}</td>
	</tr>
	<!-- <tr>
		<td 
			v-if="displayItem.description"
		></td>
		<td 
			v-if="displayItem.description"
			colspan="14"
		>
			{{ displayItem.description }}
		</td>
	</tr>
	<tr>
		<td 
			v-if="displayItem.notes"
		></td>
		<td 
			v-if="displayItem.notes"
			colspan="14"
		>
			{{ displayItem.notes }}
		</td>
	</tr> -->
	</template>
	<template
		v-if="isHeaders"
	>
	<tr :style="!isSuccess ? 'background-color: red;' : ''">
		<th class="text-left font-weight-bold">
			{{ $t('forms.content.launches.dates') }}
		</th>
		<th class="text-left font-weight-bold">
			{{ $t('forms.content.rockets.name') }}
		</th>
		<th class="text-left font-weight-bold">
			{{ $t('forms.content.locations.name') }}
		</th>
		<!-- <th class="text-left font-weight-bold">
			{{ $t('forms.content.locations.address') }}
		</th> -->
		<th class="text-left font-weight-bold">
			{{ $t('forms.content.launches.failureReasons') }}
		</th>
		<th class="text-left font-weight-bold">
			{{ $t('strings.rockets.diameterMajor') }}
		</th>
		<th class="text-left font-weight-bold">
			{{ $t('strings.rockets.length') }}
		</th>
		<th class="text-left font-weight-bold">
			{{ $t('strings.rockets.weight') }}
		</th>
		<th class="text-left font-weight-bold">
			{{ $t('strings.rockets.cg') }}
		</th>
		<th class="text-left font-weight-bold">
			{{ $t('strings.rockets.cp') }}
		</th>
		<th class="text-left font-weight-bold">
			{{ $t('strings.content.rockets.motors') }}
		</th>
		<th class="text-left font-weight-bold">
			{{ $t('forms.content.launches.weather.temperature') }}
		</th>
		<th class="text-left font-weight-bold">
			{{ $t('forms.content.launches.weather.windspeed') }}
		</th>
		<th class="text-left font-weight-bold">
			{{ $t('forms.content.launches.results.acceleration.max') }}
		</th>
		<th class="text-left font-weight-bold">
			{{ $t('forms.content.launches.results.velocity.max') }}
		</th>
		<th class="text-left font-weight-bold">
			{{ $t('forms.content.launches.results.altitude.max') }}
		</th>
		<th class="text-left font-weight-bold">
			{{ $t('forms.content.launches.results.altitude.main') }}
		</th>
		<th class="text-left font-weight-bold">
			{{ $t('forms.content.launches.results.altitude.drogue') }}
		</th>
	</tr>
	</template>
</template>

<script>
import { useLaunchViewComponent } from '@/components/content/launches/launch/launchViewComponent';
import { useLaunchViewComponentProps } from '@/components/content/launches/launch/launchViewComponentProps';

import LaunchMapping from '@/components/content/launches/launch/LaunchMap';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtTextArea from '@thzero/library_client_vue3_vuetify3/components/form/VtTextArea';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

export default {
	name: 'LaunchViewListingControl',
	components: {
		MeasurementUnitSelect2,
		VtMarkdown,
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
			buttonsForms,
			measurementUnitsIdOutput,
			displayItemMeasurement,
			displayItemMeasurementLength,
			motorUrl,
			measurementUnitsFromUnitId,
			failureReasons,
			successReasons,
			weatherOptions,
			displayItem,
			displayItemDate,
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
			displayItemRocketCg,
			displayItemRocketCoverUrl,
			displayItemRocketCp,
			displayItemRocketDiameter,
			displayItemRocketLength,
			displayItemRocketMotorNames,
			displayItemRocketMotors,
			displayItemRocketMame,
			displayItemRocketWeight,
			displayItemTemperature,
			displayItemWindSpeed,
			hasCoords,
			hasCoordsLaunch,
			hasCoordsRecovery,
			hasResults,
			hasRocketSpecs,
			hasWeather,
			isFailure,
			isSuccess,
			clickViewLocation
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
			buttonsForms,
			measurementUnitsIdOutput,
			displayItemMeasurement,
			displayItemMeasurementLength,
			measurementUnitsFromUnitId,
			motorUrl,
			failureReasons,
			successReasons,
			weatherOptions,
			displayItem,
			displayItemDate,
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
			displayItemRocketCg,
			displayItemRocketCoverUrl,
			displayItemRocketCp,
			displayItemRocketDiameter,
			displayItemRocketLength,
			displayItemRocketMotorNames,
			displayItemRocketMotors,
			displayItemRocketMame,
			displayItemRocketWeight,
			displayItemTemperature,
			displayItemWindSpeed,
			hasCoords,
			hasCoordsLaunch,
			hasCoordsRecovery,
			hasResults,
			hasRocketSpecs,
			hasWeather,
			isFailure,
			isSuccess,
			clickViewLocation
		};
	}
};
</script>

<style>
.v-expansion-panel--active > .v-expansion-panel-title {
	min-height: 0px !important;
}
</style>
