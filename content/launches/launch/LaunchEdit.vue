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
			<v-col cols="sm" sm="4">
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
		<v-row dense>
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
						{{ $t('buttons.select') + ' ' + $t('forms.content.locations.name') }}
					</v-btn>
				</div>
			</v-col>
			<v-col cols="12" sm="4">
				<VtSelectWithValidation
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
		<v-row dense>
			<v-col cols="12">
				<div class="d-flex">
					<VtTextFieldWithValidation
						ref="detailItemRocketNameRef"
						v-model="detailItemRocketName"
						vid="detailItemRocketName"
						:validation="validation"
						:errorsReadonly="validation.detailItemRocketId.$silentErrors"
						:label="$t('forms.content.rockets.name')"
						:readonly="true"
					/>
					<v-btn
						v-if="isEditable"
						class="ml-4 text-right"
						:variant="buttonsForms.variant.add"
						:color="buttonsForms.color.add"
						@click="clickSearchRockets(item)"
					>
						{{ $t('buttons.select') + ' ' + $t('forms.content.rockets.name') }}
					</v-btn>
				</div>
			</v-col>
		</v-row>
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
		<v-row dense>
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
				{{ $t('forms.content.launches.results.title') }}
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
						<td class="measurementUnitMedium">
							<MeasurementUnitSelect2
								ref="detailItemResultsAccelerationMaxMeasurementUnitIdRef"
								v-model="detailItemResultsAccelerationMaxMeasurementUnitId"
								vid="detailItemResultsAccelerationMaxMeasurementUnitId"
								:measurementUnitsType="measurementUnitsAccelerationType"
								:validation="validation"
								:readonly="!isEditable"
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
	<LocationLookupDialog
		ref="dialogLocationLookupManagerRef"
		:signal="dialogLocationLookupManager.signal"
		@close="dialogLocationLookupManager.cancel()"
		@select="selectLocation"
	/>
	<RocketLookupDialog
		ref="dialogRocketLookupManagerRef"
		:signal="dialogRocketLookupManager.signal"
		@close="dialogRocketLookupManager.cancel()"
		@select="selectRocket"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailComponentProps } from '@/components/content/detailComponentProps';
import { useLaunchEditValidation } from '@/components/content/launches/launch/launchEditValidation';
import { useLaunchEditComponent } from '@/components/content/launches/launch/launchEditComponent';
import { useLaunchEditComponentProps } from '@/components/content/launches/launch/launchEditComponentProps';

import DeploymentBagPanelTitle from '@/components/content/parts/deploymentBags/DeploymentBagPanelTitle';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import LocationLookupDialog from '@/components/content/locations/dialogs/LocationLookupDialog';
import RocketLookupDialog from '@/components/content/rockets/dialogs/RocketLookupDialog';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtDateTimePickerFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtDatetimePickerFieldWithValidationTemp';
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
			isOwner,
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
			locationIterationName,
			markupHint,
			dialogLocationLookupManager,
			dialogRocketLookupManager,
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
			detailItemVelocityRecoveryMeasurementUnitId,
			detailItemVelocityRecoveryMeasurementUnitsId,
			detailItemRocketId,
			detailItemRocketName,
			detailItemSuccess,
			detailItemVideoUrl,
			hasAdmin,
			isSuccess,
			locationIterations,
			clickSearchLocations,
			clickSearchRockets,
			selectLocation,
			selectRocket,
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
			isOwner,
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
			locationIterationName,
			markupHint,
			dialogLocationLookupManager,
			dialogRocketLookupManager,
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
			detailItemVelocityRecoveryMeasurementUnitId,
			detailItemVelocityRecoveryMeasurementUnitsId,
			detailItemRocketId,
			detailItemRocketName,
			detailItemSuccess,
			detailItemVideoUrl,
			hasAdmin,
			isSuccess,
			locationIterations,
			clickSearchLocations,
			clickSearchRockets,
			selectLocation,
			selectRocket,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useLaunchEditValidation(false)), {});
	}
};
</script>

<style>
</style>