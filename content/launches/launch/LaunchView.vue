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
			v-if="displayItemCoverUrl"
			dense
		>
			<v-col
				cols="7" lg="10" md="9"
			>
				<v-row dense>
					<v-col cols="12">
						<v-row dense>
							<v-col cols="12">
								<div 
									class="d-flex"
								>
									<VtTextField 
										v-if="displayItem && displayItem.rocketSetup && displayItem.rocketSetup.rocket"
										v-model="displayItemRocketMame"
										:label="$t('forms.content.rockets.name')"
										:readonly="true"
									/>
									<div
										v-if="displayItem && displayItem.rocketSetup && displayItem.rocketSetup.rocket"
										style="display: flex; justify-content: center; align-items: center;"
									>
										<router-link
											:to="'/user/rockets/' + (displayItem ? displayItem.rocketId: '')"
											class="text-contrast router-link headline"
										>
											<!-- <h2>{{ $t('buttons.link') }}</h2> -->
											<v-icon color="green darken-2">
												mdi-link
											</v-icon>
										</router-link>
									</div>
								</div>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12">
								<div 
									class="d-flex"
								>
									<VtTextField
										v-model="displayItemLocationName"
										:label="$t('forms.content.locations.name')"
										:readonly="true"
									/>
									<!-- <v-btn
										v-if="$vuetify.display.smAndUp"
										class="ml-4 text-right"
										:variant="buttonsForms.variant.default"
										:color="buttonsForms.color.default"
										@click="clickViewLocation(displayItem)"
									>
										{{ $t('buttons.link') }}
									</v-btn> -->
									<div
										v-if="displayItem && displayItem.locationId"
										style="display: flex; justify-content: center; align-items: center;"
									>
										<router-link
											:to="'/user/locations/' + (displayItem ? displayItem.locationId: '')"
											class="text-contrast router-link headline"
										>
											<!-- <h2>{{ $t('buttons.link') }}</h2> -->
											<v-icon color="green darken-2">
												mdi-link
											</v-icon>
										</router-link>
									</div>
								</div>
							</v-col>
							<v-col cols="12">
								<VtTextField
									v-model="displayItemLocationIterationAddress"
									:label="$t('forms.content.locations.address')"
									:readonly="true"
								/>
							</v-col>
						</v-row>
					</v-col>
					<v-col 
						v-if="$vuetify.display.xs"
						cols="12"
						class="text-right"
					>
						<!-- <v-btn
							:variant="buttonsForms.variant.default"
							:color="buttonsForms.color.default"
							@click="clickViewLocation(displayItem)"
						>
							{{ $t('buttons.link') }}
						</v-btn> -->
						<div
							v-if="displayItem && displayItem.locationId"
							style="display: flex; justify-content: center; align-items: center;"
						>
							<router-link
								:to="'/user/locations/' + (displayItem ? displayItem.locationId: '')"
								class="text-contrast router-link headline"
							>
								<!-- <h2>{{ $t('buttons.link') }}</h2> -->
							<v-icon color="green darken-2">
								mdi-link
							</v-icon>
							</router-link>
						</div>
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
				<v-row 
					v-if="hasRocketSpecs && $vuetify.display.smAndUp"
					dense
				>
					<v-col 
						cols="12"
					>
						<v-sheet
							class="pb-2"
						>
							<h3>{{ $t('titles.content.rockets.specifications') }}</h3>
							<v-divider class="border-opacity-100"></v-divider>
						</v-sheet>
					</v-col>
					<v-col
						v-if="displayItemRocketDiameter"
						cols="6" sm="3" md="2"
					>
						<VtTextField
							v-model="displayItemRocketDiameter"
							:label="$t('strings.rockets.diameterMajor')"
							:readonly="true"
						/>
					</v-col>
					<v-col 
						v-if="displayItemRocketLength"
						cols="6" sm="3" md="2"
					>
						<VtTextField
							v-model="displayItemRocketLength"
							:label="$t('strings.rockets.length')"
							:readonly="true"
						/>
					</v-col>
					<v-col 
						v-if="displayItemRocketWeight"
						cols="6" sm="3" md="2"
					>
						<VtTextField
							v-model="displayItemRocketWeight"
							:label="$t('strings.rockets.weight')"
							:readonly="true"
						/>
					</v-col>
					<v-col 
						v-if="displayItemRocketCg"
						cols="6" sm="4" md="2"
					>
						<VtTextField
							v-model="displayItemRocketCg"
							:label="$t('strings.rockets.cg')"
							:readonly="true"
						/>
					</v-col>
					<v-col 
						v-if="displayItemRocketCp"
						cols="6" sm="4" md="2"
					>
						<VtTextField
							v-model="displayItemRocketCp"
							:label="$t('strings.rockets.cp')"
							:readonly="true"
						/>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="5" lg="2" md="3">
				<router-link
					v-if="!displayItemCoverUrl"
					:to="'/user/rocket/' + (displayItem ? displayItem.rocketId: '')"
					class="text-contrast router-link headline"
					style="float: right;display: block;margin-left: auto; margin-right: auto;"
				>
					<img
						style="width: 150px;"
						:src="displayItemCoverUrl"
					/>
				</router-link>
				<a
					:href="displayItemCoverUrl"
					target="_blank"
					class="text-contrast router-link headline"
					style="float: right;display: block;margin-left: auto; margin-right: auto;"
				>
					<img
						style="width: 150px;"
						:src="displayItemCoverUrl"
					/>
				</a>
			</v-col>
		</v-row>
		<v-row
			v-if="!displayItemCoverUrl"
			dense
		>
			<v-col cols="12">
				<div
					v-if="displayItem && displayItem.rocketSetup && displayItem.rocketSetup.rocket"
					class="d-flex"
				>
					<VtTextField 
						v-model="displayItemRocketMame"
						:label="$t('forms.content.rockets.name')"
						:readonly="true"
					/>
					<div
						style="display: flex; justify-content: center; align-items: center;"
					>
						<router-link
							:to="'/user/rockets/' + (displayItem ? displayItem.rocketId: '')"
							class="text-contrast router-link headline"
						>
							<!-- <h2>{{ $t('buttons.link') }}</h2> -->
							<v-icon color="green darken-2">
								mdi-link
							</v-icon>
						</router-link>
					</div>
				</div>
			</v-col>
			<v-col cols="12">
				<VtMarkdown 
					v-if="displayItem.description"
					v-model="displayItem.description" :use-github=false 
				/>
			</v-col>
			<v-col
				cols="12" sm="6" lg="4"
			>
				<div 
					class="d-flex"
				>
					<VtTextField
						v-model="displayItemLocationName"
						:label="$t('forms.content.locations.name')"
						:readonly="true"
					/>
					<!-- <v-btn
						class="ml-4 text-right"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						@click="clickViewLocation(displayItem)"
					>
						{{ $t('buttons.link') }}
					</v-btn> -->
					<div
						v-if="displayItem && displayItem.locationId"
						style="display: flex; justify-content: center; align-items: center;"
					>
						<router-link
							:to="'/user/locations/' + (displayItem ? displayItem.locationId: '')"
							class="text-contrast router-link headline"
						>
							<!-- <h2>{{ $t('buttons.link') }}</h2> -->
							<v-icon color="green darken-2">
								mdi-link
							</v-icon>
						</router-link>
					</div>
				</div>
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
			v-if="(!displayItemCoverUrl || $vuetify.display.xs) && hasRocketSpecs"
			dense
		>
			<v-col 
				cols="12"
			>
				<v-sheet
					class="pb-2"
				>
					<h3>{{ $t('titles.content.rockets.specifications') }}</h3>
					<v-divider class="border-opacity-100"></v-divider>
				</v-sheet>
			</v-col>
			<v-col diameterMajor
				v-if="displayItemRocketDiameter"
				cols="3" md="2"
			>
				<VtTextField
					v-model="displayItemRocketDiameter"
					:label="$t('strings.rockets.diameterMajor')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="displayItemRocketLength"
				cols="3" md="2"
			>
				<VtTextField
					v-model="displayItemRocketLength"
					:label="$t('strings.rockets.length')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="displayItemRocketWeight"
				cols="3" md="2"
			>
				<VtTextField
					v-model="displayItemRocketWeight"
					:label="$t('strings.rockets.weight')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="displayItemRocketCg"
				cols="4" sm="3" md="2"
			>
				<VtTextField
					v-model="displayItemRocketCg"
					:label="$t('strings.rockets.cg')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="displayItemRocketCp"
				cols="4" sm="3" md="2"
			>
				<VtTextField
					v-model="displayItemRocketCp"
					:label="$t('strings.rockets.cp')"
					:readonly="true"
				/>
			</v-col>
		</v-row>
		<v-row
			dense
		>
			<v-col 
				cols="12"
			>
				<v-row
					v-if="String.isNullOrEmpty(displayItemRocketMotorNames)"
					dense
				>
					<v-col>
						<VtTextArea
							v-model="displayItemRocketMotorNames"
							:label="$t('forms.content.launches.rocketSetup.title')"
							:readonly="true"
							:clearable="false"
							:rows="1"
						/>
					</v-col>
				</v-row>
			</v-col>
			<v-col 
				cols="12"
			>
				<v-sheet
					v-if="displayItemRocketMotors.length > 0"
					class="pt-2 pb-2 mt-2"
				>
					<h3>{{ $t('strings.content.rockets.motors') }}</h3>
					<v-divider class="border-opacity-100"></v-divider>
				</v-sheet>
				<v-row 
					v-for="item in displayItemRocketMotors"
					:key="item"
					dense
				>
					<v-col 
						cols="12"
					>
						<v-sheet
							v-if="displayItemRocketMotors.length > 1"
							color="secondary"
							class="ml-4 mt-2 pl-4 pr-4 pt-2 pb-2"
							rounded
						>
							{{ $t('forms.content.rockets.stage.name') }}
							{{ item.index }}
						</v-sheet>
						<v-sheet 
							v-for="(item2, index) in item.motors"
							:key="item2"
							:color="index % 2 === 0 ? 'grey' : 'grey'"
							:class="`ml-${(displayItemRocketMotors.length > 1 ? '8' : '4')} mt-2 pl-4 pr-4 pt-2 pb-2`"
							style="width: 100%;"
							rounded
						>
							<!-- <v-row
								dense
								class="pl-8"
							>
								<v-col>
									{{ item2.name }}
								</v-col>
								<v-col>
									{{ item2.caseName }}
								</v-col>
							</v-row> -->
							{{ item2.diameter }} {{ $t('strings.content.rockets.with') }} <a style="color: white" :href="motorUrl(item2)" target="_blank">{{ item2.name }}</a> {{ $t('strings.content.rockets.in') }} {{ item2.caseName }}
						</v-sheet>
					</v-col>
				</v-row>
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
					<v-divider class="border-opacity-100"></v-divider>
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
					<v-divider class="border-opacity-100"></v-divider>
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
				<LaunchMap
					:id="displayItem.id"
					type="recovery"
					:coords="displayItemResultsCoords"
					:coordsLaunch="displayItemResultsCoordsLaunch"
					:coordsRecovery="displayItemResultsCoordsRecovery"
				></LaunchMap>
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
				<LaunchMap
					:id="displayItem.id"
					type="recovery"
					:coords="displayItemResultsCoords"
					:coordsLaunch="displayItemResultsCoordsLaunch"
					:coordsRecovery="displayItemResultsCoordsRecovery"
				></LaunchMap>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { useLaunchViewComponent } from '@/components/content/launches/launch/launchViewComponent';
import { useLaunchViewComponentProps } from '@/components/content/launches/launch/launchViewComponentProps';

import LaunchMap from '@/components/content/launches/launch/LaunchMap';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtTextArea from '@thzero/library_client_vue3_vuetify3/components/form/VtTextArea';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

export default {
	name: 'LaunchViewControl',
	components: {
		LaunchMap,
		MeasurementUnitSelect2,
		VtMarkdown,
		VtSelect,
		VtTextArea,
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
			displayItemAlbumUrl,
			displayItemCoverUrl,
			displayItemDate,
			displayItemLocationLink,
			displayItemLocationIteration,
			displayItemLocationIterationAddress,
			displayItemLocationIterationCoords,
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
			displayItemResultsCoords,
			displayItemResultsCoordsLaunch,
			displayItemResultsCoordsLocation,
			displayItemResultsCoordsRecovery,
			displayItemResultsVelocityMax,
			displayItemResultsVelocityRecovery,
			displayItemRocketCg,
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
			hasCoordsLocation,
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
			displayItemAlbumUrl,
			displayItemCoverUrl,
			displayItemDate,
			displayItemLocationLink,
			displayItemLocationIteration,
			displayItemLocationIterationAddress,
			displayItemLocationIterationCoords,
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
			displayItemResultsCoords,
			displayItemResultsCoordsLaunch,
			displayItemResultsCoordsLocation,
			displayItemResultsCoordsRecovery,
			displayItemResultsVelocityMax,
			displayItemResultsVelocityRecovery,
			displayItemRocketCg,
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
			hasCoordsLocation,
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
