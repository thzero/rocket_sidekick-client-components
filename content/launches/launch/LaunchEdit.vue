<template>
	<div
		v-if="debug"
	>
		[[ invalid {{ invalid }} ]]
		[[ dirty {{ dirty }} ]]
		[[ isEditable {{ isEditable }} ]]
		[[ isNew {{ isNew }} ]]
		<!-- [[ modelValue {{ JSON.stringify(modelValue) }}]] -->
		<!-- [[ detailItem {{ JSON.stringify(detailItem) }}]]  -->
		<!-- <div>[[ detailItemData {{ JSON.stringify(detailItemData) }} ]] </div> -->
	</div>
	<VtFormControl
		ref="formControlRef"
		:validation="validation"
		:button-cancel="isEditable"
		:button-close="true"
		:button-clear="isEditable"
		button-clear-name="buttons.reset"
		:button-delete="false"
		:button-ok="isEditable"
		:dirty-callback="dirtyCallback"
		:invalid-callback="invalidCallback"
		:readonly="!isEditable "
		:reset-additional="resetAdditional"
		:pre-complete-ok="preCompleteOk"
		@cancel="handleCancel"
		@ok="handleOk"
		:debug="debug"
	>
		<v-row dense>
			<v-col cols="12" sm="8">
				<VtTextFieldWithValidation
					ref="detailItemNameRef"
					v-model="detailItemName"
					vid="detailItemName"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.name')"
					:counter="30"
				/>
			</v-col>
			<v-col cols="12" sm="4">
				<VtDateTimePickerFieldWithValidation
					ref="detailItemDateRef"
					v-model="detailItemDate"
					vid="detailItemDate"
					:default-date="false"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.date')"
				/>
			</v-col>
		</v-row>
		<!-- <v-row dense>
			<v-col>
				<VtTextAreaWithValidation
					ref="descriptionRef"
					v-model="detailItemDescription"
					vid="detailItemDescription"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.description')"
					:counter="300"
					:clearable="isEditable"
					:rows="detailItemTextRows"
				/>
			</v-col>
		</v-row> -->
		<v-row dense>
			<v-col cols="12" sm="6">
				<VtSelectWithValidation
					ref="detailItemSuccessRef"
					v-model="detailItemSuccess"
					vid="detailItemSuccess"
					:items="successReasons"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.launches.success')"
				/>
			</v-col>
			<v-col cols="12" sm="6">
				<VtSelectWithValidation
					v-if="!isSuccess"
					ref="detailItemFailureReasonsRef"
					v-model="detailItemFailureReasons"
					vid="detailItemFailureReasons"
					multiple
					:max-values="4"
					:items="failureReasons"
					:validation="validation"
					:readonly="(!isEditable || isSuccess)"
					:label="$t('forms.content.launches.failureReasons')"
				/>
			</v-col>
		</v-row>
		<v-row 
			dense
			class="mt-4"
		>
			<v-col cols="12">
				<div class="d-flex">
					<VtTextFieldWithValidation
						ref="detailItemRocketNameRef"
						v-model="detailItemRocketName"
						vid="detailItemRocketName"
						:validation="validation"
						:errorsReadonly="validation.detailItemRocketId.$silentErrors"
						:label="$t('forms.content.launches.rocket.title')"
						:readonly="true"
					/>
					<v-btn
						v-if="isEditable && detailItemRocketId"
						class="text-right"
						:variant="buttonsForms.variant.delete"
						:color="buttonsForms.color.delete"
						@click="clickRemoveRocket()"
					>
						{{ $t('buttons.remove') }}
					</v-btn>
					<v-btn
						v-if="isEditable"
						:class="detailItemRocketId ? 'ml-2' : '' + ' mr-2 text-right'"
						:variant="buttonsForms.variant.add"
						:color="buttonsForms.color.add"
						@click="clickSearchRockets()"
					>
						{{ $t('buttons.select') }}
					</v-btn>
					<!-- <v-btn
						v-if="!isEditable"
						class="ml-4 text-right"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						@click="clickViewRocket(detailItemData)"
					>
						{{ $t('buttons.link') }}
					</v-btn> -->
					<div
						v-if="detailItemRocketId"
						style="display: flex; justify-content: center; align-items: center;"
						:class="detailItemRocketId ? 'ml-2' : ''"
					>
						<router-link
							:to="'/user/rockets/' + (detailItemData ? detailItemData.rocketId: '')"
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
				v-if="detailItemRocketId"
				cols="12"
			>
				<div 
					class="d-flex"
				>
					<!-- <VtTextFieldWithValidation
						ref="detailItemRocketSetupNameRef"
						v-model="detailItemRocketSetupName"
						vid="detailItemRocketSetupName"
						:validation="validation"
						:errorsReadonly="validation.detailItemRocketSetupId.$silentErrors"
						:label="$t('forms.content.launches.rocketSetup.title')"
						:readonly="true"
					/> -->
					<VtTextAreaWithValidation
						ref="detailItemRocketSetupNameRef"
						v-model="detailItemRocketSetupName"
						vid="detailItemRocketSetupName"
						:validation="validation"
						:errorsReadonly="validation.detailItemRocketSetupId.$silentErrors"
						:readonly="true"
						:label="$t('forms.content.launches.rocketSetup.title')"
						:clearable="false"
						:rows="1"
					/>
					<v-btn
						v-if="isEditable && detailItemRocketSetupId"
						class="text-right"
						:variant="buttonsForms.variant.delete"
						:color="buttonsForms.color.delete"
						@click="clickRemoveLocation()"
					>
						{{ $t('buttons.remove') }}
					</v-btn>
					<v-btn
						v-if="isEditable"
						:class="detailItemRocketSetupId ? 'ml-2' : '' + ' mr-2 text-right'"
						:variant="buttonsForms.variant.add"
						:color="buttonsForms.color.add"
						@click="clickSearchRocketSetups()"
					>
						{{ $t('buttons.select') }}
					</v-btn>
					<!-- <v-btn
						v-if="!isEditable"
						class="ml-4 text-right"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						@click="clickViewRocketSetup(detailItemData)"
					>
						{{ $t('buttons.link') }}
					</v-btn> -->
					<div
						v-if="detailItemRocketSetupId"
						style="display: flex; justify-content: center; align-items: center;"
						:class="detailItemRocketSetupId ? 'ml-2' : ''"
					>
						<router-link
							:to="'/user/rocketsetups/' + (detailItemData ? detailItemData.rocketSetupId: '')"
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
			<v-col cols="12" sm="8">
				<div class="d-flex">
					<VtTextFieldWithValidation
						ref="detailItemLocationNameRef"
						v-model="detailItemLocationName"
						vid="detailItemLocationName"
						:validation="validation"
						:errorsReadonly="validation.detailItemLocationId.$silentErrors"
						:label="$t('forms.content.locations.name')"
						:readonly="true"
					/>
					<v-btn
						v-if="isEditable"
						class="ml-4 text-right"
						:variant="buttonsForms.variant.add"
						:color="buttonsForms.color.add"
						@click="clickSearchLocations(item)"
					>
						{{ $t('buttons.select') }}
					</v-btn>
					<!-- <v-btn
						v-if="!isEditable"
						class="ml-4 text-right"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						@click="clickViewLocation(detailItemData)"
					>
						{{ $t('buttons.link') }}
					</v-btn> -->
					<div
						v-if="detailItemLocationId"
						style="display: flex; justify-content: center; align-items: center;"
						:class="detailItemLocationId ? 'ml-2' : ''"
					>
						<router-link
							:to="'/user/locations/' + (detailItemData ? detailItemData.locationId: '')"
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
			<v-col cols="12" sm="4">
				<VtSelectWithValidation
					v-if="detailItemLocationId && locationIterations.length > 1"
					ref="detailItemLocationIterationIdRef"
					v-model="detailItemLocationIterationId"
					vid="detailItemLocationIterationId"
					:items="locationIterations"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.locations.iterations.name')"
				/>
			</v-col>
		</v-row>
		<v-row 
			dense
			class="mt-4"
		>
			<v-col cols="12">
				<VtTextFieldWithValidation
					ref="detailItemAlbumUrlRef"
					v-model="detailItemAlbumUrl"
					vid="detailItemAlbumUrl"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.launches.album')"
				/>
			</v-col>
			<v-col cols="12">
				<VtTextFieldWithValidation
					ref="detailItemVideoUrlRef"
					v-model="detailItemVideoUrl"
					vid="detailItemVideoUrl"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.launches.video')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<VtTextAreaWithValidation
					ref="detailItemNotesRef"
					v-model="detailItemNotes"
					vid="detailItemNotes"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.launches.notes')"
					:counter="1000"
					:clearable="isEditable"
					:rows="detailItemTextRows"
				/>
<div 
	v-if="isEditable"
	v-html="markupHint"
></div>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col 
				cols="12"
				class="mt-4"
			>
				<h3>{{ $t('forms.content.launches.weather.title') }}</h3>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tr>
						<td>
							<VtNumberFieldWithValidation
								ref="detailItemTemperatureRef"
								v-model="detailItemTemperature"
								vid="detailItemTemperature"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.content.launches.weather.temperature')"
							/>
						</td>
						<td class="measurementUnitExtraLong">
							<MeasurementUnitSelect2
								ref="detailItemTemperatureMeasurementUnitIdRef"
								v-model="detailItemTemperatureMeasurementUnitId"
								vid="detailItemTemperatureMeasurementUnitId"
								:measurementUnitsType="measurementUnitsTemperatureType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.temperature')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tr>
						<td>
							<VtNumberFieldWithValidation
								ref="detailItemWindSpeedRef"
								v-model="detailItemWindSpeed"
								vid="detailItemWindSpeed"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.content.launches.weather.windspeed')"
							/>
						</td>
						<td class="measurementUnitLong">
							<MeasurementUnitSelect2
								ref="detailItemWindSpeedMeasurementUnitIdRef"
								v-model="detailItemWindSpeedMeasurementUnitId"
								vid="detailItemWindSpeedMeasurementUnitId"
								:measurementUnitsType="measurementUnitsVelocityType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.velocity')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
			<v-col cols="12" sm="6">
				<VtSelectWithValidation
					ref="detailItemWeatherRef"
					v-model="detailItemWeather"
					vid="detailItemWeather"
					:items="weatherOptions"
					multiple
					:max-values="2"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.launches.weather.title')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col 
				cols="12"
				class="mt-4"
			>
				<h3>{{ $t('forms.content.launches.results.title') }}</h3>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tr>
						<td>
							<VtNumberFieldWithValidation
								ref="detailItemResultsAccelerationMaxRef"
								v-model="detailItemResultsAccelerationMax"
								vid="detailItemResultsAccelerationMax"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.content.launches.results.acceleration.max')"
							/>
						</td>
						<td class="measurementUnitExtraLong">
							<MeasurementUnitSelect2
								ref="detailItemResultsAccelerationMaxMeasurementUnitIdRef"
								v-model="detailItemResultsAccelerationMaxMeasurementUnitId"
								vid="detailItemResultsAccelerationMaxMeasurementUnitId"
								:measurementUnitsType="measurementUnitsAccelerationType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.acceleration')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tr>
						<td>
							<VtNumberFieldWithValidation
								ref="detailItemResultsVelocityMaxRef"
								v-model="detailItemResultsVelocityMax"
								vid="detailItemResultsVelocityMax"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.content.launches.results.velocity.max')"
							/>
						</td>
						<td class="measurementUnitLong">
							<MeasurementUnitSelect2
								ref="detailItemResultsVelocityMaxMeasurementUnitIdRef"
								v-model="detailItemResultsVelocityMaxMeasurementUnitId"
								vid="detailItemResultsVelocityMaxMeasurementUnitId"
								:measurementUnitsType="measurementUnitsVelocityType"
								:validation="validation"
								:readonly="!isEditable"
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
							<VtNumberFieldWithValidation
								ref="detailItemResultsVelocityRecoveryRef"
								v-model="detailItemResultsVelocityRecovery"
								vid="detailItemResultsVelocityRecovery"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.content.launches.results.velocity.recovery')"
							/>
						</td>
						<td class="measurementUnitLong">
							<MeasurementUnitSelect2
								ref="detailItemResultsVelocityRecoveryMeasurementUnitIdRef"
								v-model="detailItemResultsVelocityRecoveryMeasurementUnitId"
								vid="detailItemResultsVelocityRecoveryMeasurementUnitId"
								:measurementUnitsType="measurementUnitsVelocityType"
								:validation="validation"
								:readonly="!isEditable"
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
							<VtNumberFieldWithValidation
								ref="detailItemResultsAltitudeMaxRef"
								v-model="detailItemResultsAltitudeMax"
								vid="detailItemResultsAltitudeMax"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.content.launches.results.altitude.max')"
							/>
						</td>
						<td class="measurementUnitLong">
							<MeasurementUnitSelect2
								ref="detailItemResultsAltitudeMaxMeasurementUnitIdRef"
								v-model="detailItemResultsAltitudeMaxMeasurementUnitId"
								vid="detailItemResultsAltitudeMaxMeasurementUnitId"
								:measurementUnitsType="measurementUnitsAltitudeType"
								:validation="validation"
								:readonly="!isEditable"
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
							<VtNumberFieldWithValidation
								ref="detailItemResultsAltitudeDeployMainRef"
								v-model="detailItemResultsAltitudeDeployMain"
								vid="detailItemResultsAltitudeDeployMain"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.content.launches.results.altitude.main')"
							/>
						</td>
						<td class="measurementUnitLong">
							<MeasurementUnitSelect2
								ref="detailItemResultsAltitudeDeployMainMeasurementUnitIdRef"
								v-model="detailItemResultsAltitudeDeployMainMeasurementUnitId"
								vid="detailItemResultsAltitudeDeployMainMeasurementUnitId"
								:measurementUnitsType="measurementUnitsAltitudeType"
								:validation="validation"
								:readonly="!isEditable"
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
							<VtNumberFieldWithValidation
								ref="detailItemResultsAltitudeDeployDrogueRef"
								v-model="detailItemResultsAltitudeDeployDrogue"
								vid="detailItemResultsAltitudeDeployDrogue"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.content.launches.results.altitude.drogue')"
							/>
						</td>
						<td class="measurementUnitLong">
							<MeasurementUnitSelect2
								ref="detailItemResultsAltitudeDeployDrogueMeasurementUnitIdRef"
								v-model="detailItemResultsAltitudeDeployDrogueMeasurementUnitId"
								vid="detailItemResultsAltitudeDeployDrogueMeasurementUnitId"
								:measurementUnitsType="measurementUnitsAltitudeType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.altitude')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="6" sm="3">
				<VtNumberFieldWithValidation
					ref="detailItemResultsCoordsLatLaunchRef"
					v-model="detailItemResultsCoordsLatLaunch"
					vid="detailItemResultsCoordsLatLaunch"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.launches.results.coords.lat') + ' ' + $t('forms.content.launches.results.coords.launch')"
				/>
			</v-col>
			<v-col cols="6" sm="3">
				<VtNumberFieldWithValidation
					ref="detailItemResultsCoordsLongLaunchRef"
					v-model="detailItemResultsCoordsLongLaunch"
					vid="detailItemResultsCoordsLongLaunch"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.launches.results.coords.long') + ' ' + $t('forms.content.launches.results.coords.launch')"
				/>
			</v-col>
			<v-col cols="6" sm="3">
				<VtNumberFieldWithValidation
					ref="detailItemResultsCoordsLatRecoveryRef"
					v-model="detailItemResultsCoordsLatRecovery"
					vid="detailItemResultsCoordsLatRecovery"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.launches.results.coords.lat') + ' ' + $t('forms.content.launches.results.coords.recovery')"
				/>
			</v-col>
			<v-col cols="6" sm="3">
				<VtNumberFieldWithValidation
					ref="detailItemResultsCoordsLongRecoveryRef"
					v-model="detailItemResultsCoordsLongRecovery"
					vid="detailItemResultsCoordsLongRecovery"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.launches.results.coords.long') + ' ' + $t('forms.content.launches.results.coords.recovery')"
				/>
			</v-col>
		</v-row>
		<template v-slot:buttons_pre>
		</template>
		<template v-slot:buttons_post>
		</template>
		<template v-slot:after>	
		</template>
	</VtFormControl>
	<VtConfirmationDialog
		ref="dialogDeleteConfirmationRef"
		:message="dialogDeleteConfirmationMessage"
		:messageRaw=true
		:signal="dialogDeleteConfirmationManager.signal"
		@cancel="dialogDeleteConfirmationCancel"
		@ok="dialogDeleteConfirmationOk"
	/>
	<LocationLookupDialog
		ref="dialogLocationLookupManagerRef"
		:signal="dialogLocationLookupManager.signal"
		@close="dialogLocationLookupManager.cancel()"
		@select="selectLocation"
	/>
	<RocketLookupDialog
		ref="dialogRocketLookupManagerRef"
		message-replace="messages.launches.rocket.replace_confirm"
		:rocket-id="detailItemRocketId"
		:signal="dialogRocketLookupManager.signal"
		@close="dialogRocketLookupManager.cancel()"
		@select="selectRocket"
	/>
	<RocketSetupLookupDialog
		ref="dialogRocketSetupLookupManagerRef"
		message-replace="messages.launches.rocketSetup.replace_confirm"
		:rocket-id="detailItemRocketId"
		:rocket-setup-id="detailItemRocketSetupId"
		:signal="dialogRocketSetupLookupManager.signal"
		@close="dialogRocketSetupLookupManager.cancel()"
		@select="selectRocketSetup"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailComponentProps } from '@/components/content/detailComponentProps';
import { useLaunchEditValidation } from '@/components/content/launches/launch/launchEditValidation';
import { useLaunchEditComponent } from '@/components/content/launches/launch/launchEditComponent';
import { useLaunchEditComponentProps } from '@/components/content/launches/launch/launchEditComponentProps';

import DeploymentBagPanelTitle from '@/components/content/parts/deploymentBags/DeploymentBagPanelTitle';

import LocationLookupDialog from '@/components/content/locations/dialogs/LocationLookupDialog';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RocketLookupDialog from '@/components/content/rockets/dialogs/RocketLookupDialog';
import RocketSetupLookupDialog from '@/components/content/rockets/dialogs/RocketSetupLookupDialog';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtDateTimePickerFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtDateTimePickerFieldWithValidationTemp';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'LaunchControl',
	components: {
		DeploymentBagPanelTitle,
		LocationLookupDialog,
		MeasurementUnitSelect,
		MeasurementUnitSelect2,
		MeasurementUnitsSelect,
		RocketLookupDialog,
		RocketSetupLookupDialog,
		VtConfirmationDialog,
		VtDateTimePickerFieldWithValidation,
		VtFormControl,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		...useDetailComponentProps,
		...useLaunchEditComponentProps
	},
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
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			serviceStore,
			formControlRef,
			dirty,
			detailItem,
			dialogDeleteManager,
			dialogDeleteMessage,
			dialogDeleteParams,
			invalid,
			canDelete,
			detailItemData,
			detailItemTextRows,
			isDeleting,
			isEditable,
			isNew,
			dialogDeleteCancel,
			dialogDeleteError,
			dialogDeleteOk,
			dialogDeleteOpen,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			preCompleteOk,
			resetAdditional,
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsAccelerationType,
			measurementUnitsAltitudeType,
			measurementUnitsTemperatureType,
			measurementUnitsVelocityType,
			displayItemMeasurement,
			displayItemMeasurementLength,
			measurementUnitsFromUnitId,
			failureReasons,
			successReasons,
			markupHint,
			dialogDeleteConfirmationManager,
			dialogDeleteConfirmationMessage,
			dialogDeleteConfirmationParams,
			dialogLocationLookupManager,
			dialogRocketLookupManager,
			dialogRocketSetupLookupManager,
			detailItemAlbumUrl,
			detailItemDate,
			detailItemDescription,
			detailItemFailureReasons,
			detailItemName,
			detailItemNotes,
			detailItemLocationId,
			detailItemLocationIterationId,
			detailItemLocationName,
			detailItemResultsAccelerationMax,
			detailItemResultsAccelerationMaxMeasurementUnitId,
			detailItemResultsAccelerationMaxMeasurementUnitsId,
			detailItemResultsAltitudeMax,
			detailItemResultsAltitudeMaxMeasurementUnitId,
			detailItemResultsAltitudeMaxMeasurementUnitsId,
			detailItemResultsAltitudeDeployDrogue,
			detailItemResultsAltitudeDeployDrogueMeasurementUnitId,
			detailItemResultsAltitudeDeployDrogueMeasurementUnitsId,
			detailItemResultsAltitudeDeployMain,
			detailItemResultsAltitudeDeployMainMeasurementUnitId,
			detailItemResultsAltitudeDeployMainMeasurementUnitsId,
			detailItemResultsCoordsLatLaunch,
			detailItemResultsCoordsLongLaunch,
			detailItemResultsCoordsLatRecovery,
			detailItemResultsCoordsLongRecovery,
			detailItemResultsVelocityMax,
			detailItemResultsVelocityMaxMeasurementUnitId,
			detailItemResultsVelocityMaxMeasurementUnitsId,
			detailItemResultsVelocityRecovery,
			detailItemResultsVelocityRecoveryMeasurementUnitId,
			detailItemResultsVelocityRecoveryMeasurementUnitsId,
			detailItemRocketId,
			detailItemRocketName,
			detailItemRocketSetupId,
			detailItemRocketSetupName,
			detailItemSuccess,
			detailItemTemperature,
			detailItemTemperatureMeasurementUnitId,
			detailItemTemperatureMeasurementUnitsId,
			detailItemVideoUrl,
			detailItemWeather,
			detailItemWindSpeed,
			detailItemWindSpeedMeasurementUnitId,
			detailItemWindSpeedMeasurementUnitsId,
			weatherOptions,
			hasAdmin,
			isSuccess,
			locationIterations,
			clickRemoveLocation,
			clickRemoveRocket,
			clickRemoveRocketSetup,
			clickSearchLocations,
			clickSearchRockets,
			clickSearchRocketSetups,
			clickViewLocation,
			clickViewRocket,
			clickViewRocketSetup,
			dialogDeleteConfirmationCancel,
			dialogDeleteConfirmationError,
			dialogDeleteConfirmationOk,
			dialogDeleteConfirmationOpen,
			selectLocation,
			selectRocket,
			selectRocketSetup,
			scope,
			validation
		} = useLaunchEditComponent(props, context, options);

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
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			serviceStore,
			formControlRef,
			dirty,
			detailItem,
			dialogDeleteManager,
			dialogDeleteMessage,
			dialogDeleteParams,
			invalid,
			canDelete,
			detailItemData,
			detailItemTextRows,
			isDeleting,
			isEditable,
			isNew,
			dialogDeleteCancel,
			dialogDeleteError,
			dialogDeleteOk,
			dialogDeleteOpen,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			preCompleteOk,
			resetAdditional,
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsAccelerationType,
			measurementUnitsAltitudeType,
			measurementUnitsTemperatureType,
			measurementUnitsVelocityType,
			displayItemMeasurement,
			displayItemMeasurementLength,
			measurementUnitsFromUnitId,
			failureReasons,
			successReasons,
			markupHint,
			dialogDeleteConfirmationManager,
			dialogDeleteConfirmationMessage,
			dialogDeleteConfirmationParams,
			dialogLocationLookupManager,
			dialogRocketLookupManager,
			dialogRocketSetupLookupManager,
			detailItemAlbumUrl,
			detailItemDate,
			detailItemDescription,
			detailItemFailureReasons,
			detailItemName,
			detailItemNotes,
			detailItemLocationId,
			detailItemLocationIterationId,
			detailItemLocationName,
			detailItemResultsAccelerationMax,
			detailItemResultsAccelerationMaxMeasurementUnitId,
			detailItemResultsAccelerationMaxMeasurementUnitsId,
			detailItemResultsAltitudeMax,
			detailItemResultsAltitudeMaxMeasurementUnitId,
			detailItemResultsAltitudeMaxMeasurementUnitsId,
			detailItemResultsAltitudeDeployDrogue,
			detailItemResultsAltitudeDeployDrogueMeasurementUnitId,
			detailItemResultsAltitudeDeployDrogueMeasurementUnitsId,
			detailItemResultsAltitudeDeployMain,
			detailItemResultsAltitudeDeployMainMeasurementUnitId,
			detailItemResultsAltitudeDeployMainMeasurementUnitsId,
			detailItemResultsCoordsLatLaunch,
			detailItemResultsCoordsLongLaunch,
			detailItemResultsCoordsLatRecovery,
			detailItemResultsCoordsLongRecovery,
			detailItemResultsVelocityMax,
			detailItemResultsVelocityMaxMeasurementUnitId,
			detailItemResultsVelocityMaxMeasurementUnitsId,
			detailItemResultsVelocityRecovery,
			detailItemResultsVelocityRecoveryMeasurementUnitId,
			detailItemResultsVelocityRecoveryMeasurementUnitsId,
			detailItemRocketId,
			detailItemRocketName,
			detailItemRocketSetupId,
			detailItemRocketSetupName,
			detailItemSuccess,
			detailItemTemperature,
			detailItemTemperatureMeasurementUnitId,
			detailItemTemperatureMeasurementUnitsId,
			detailItemVideoUrl,
			detailItemWeather,
			detailItemWindSpeed,
			detailItemWindSpeedMeasurementUnitId,
			detailItemWindSpeedMeasurementUnitsId,
			weatherOptions,
			hasAdmin,
			isSuccess,
			locationIterations,
			clickRemoveLocation,
			clickRemoveRocket,
			clickRemoveRocketSetup,
			clickSearchLocations,
			clickSearchRockets,
			clickSearchRocketSetups,
			clickViewLocation,
			clickViewRocket,
			clickViewRocketSetup,
			dialogDeleteConfirmationCancel,
			dialogDeleteConfirmationError,
			dialogDeleteConfirmationOk,
			dialogDeleteConfirmationOpen,
			selectLocation,
			selectRocket,
			selectRocketSetup,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useLaunchEditValidation(this, false)), {});
	}
};
</script>

<style>
</style>