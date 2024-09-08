<template>
	<div
		v-if="debug"
	>
		[[ invalid {{ invalid }} ]]
		[[ dirty {{ dirty }} ]]
		[[ editable {{ editable }} ]]
		[[ isNew {{ isNew }} ]]
		[[ hasAdminDelete {{ hasAdminDelete }} ]]
		[[ hasAdminEdit {{ hasAdminEdit }} ]]
		[[ hasAdminRoles {{ hasAdminRoles }} ]]
		<!-- [[ modelValue {{ JSON.stringify(modelValue) }}]] -->
		<!-- [[ detailItem {{ JSON.stringify(detailItem) }}]]  -->
		<!-- <div>[[ detailItemData {{ JSON.stringify(detailItemData) }} ]] </div> -->
	</div>
	<VtFormDialog
		:label="$t('titles.edit')"
		:signal="signal"
		:pre-complete-ok="preCompleteOk"
		:reset-additional="resetAdditional"
		:set-additional="setAdditional"
		:validation="validation"
		button-clear-name="buttons.reset"
		:debug="debug"
		width="70vh"
		max-width="90vh"
		@close="dialogClose"
		@error="dialogError"
		@ok="dialogOk"
	>
		<!-- :readonly="!editable" -->
		<v-row dense>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tbody>
						<tr>
							<td>
								<VtNumberFieldWithValidation
									ref="detailItemApogeeDelayRef"
									v-model="detailItemApogeeDelay"
									vid="detailItemApogeeDelay"
									:validation="validation"
									:readonly="!editable"
									:label="$t('forms.content.parts.altimeter.delay.apogee')"
								/>
							</td>
							<td>
								{{ $t('measurements.time.secondsAbbrev')}}
							</td>
						</tr>
					</tbody>
				</table>
			</v-col>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tbody>
						<tr>
							<td>
								<VtNumberFieldWithValidation
									ref="detailItemMotorDelayRef"
									v-model="detailItemMotorDelay"
									vid="detailItemMotorDelay"
									:validation="validation"
									:readonly="!editable"
									:label="$t('forms.content.parts.altimeter.delay.motor')"
								/>
							</td>
							<td>
								{{ $t('measurements.time.secondsAbbrev')}}
							</td>
						</tr>
					</tbody>
				</table>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tbody>
						<tr>
							<td>
								<VtNumberFieldWithValidation
									ref="detailItemMainAltitudeRef"
									v-model="detailItemMainAltitude"
									vid="detailItdetailItemMainAltitudeemWeight"
									:validation="validation"
									:readonly="!editable"
									:label="$t('forms.content.parts.altimeter.altitude.main')"
								/>
							</td>
							<td class="measurementUnitMedium">
								<MeasurementUnitSelect2
									ref="detailItemMainAltitudeMeasurementUnitIdRef"
									v-model="detailItemMainAltitudeMeasurementUnitId"
									vid="detailItemWeightMeasdetailItemMainAltitudeMeasurementUnitIdrementUnitId"
									:measurementUnitsType="measurementUnitsLengthType"
									:validation="validation"
									:readonly="!editable"
									:label="$t('forms.settings.measurementUnits.altitude')"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</v-col>
		</v-row>
	</VtFormDialog>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useAltimeterRocketPartComponent } from '@/components/content/rockets/parts/dialogs/altimeter/altimeterRocketPartDialogComponent';
import { useAltimeterRocketPartValidation } from '@/components/content/rockets/parts/dialogs/altimeter/altimeterRocketPartDialogValidation';
import { useDetailComponentProps } from '@/components/content/detailComponentProps';
import { useRocketPartDialogComponentProps } from '@/components/content/rockets/parts/dialogs/rocketPartDialogComponentProps';
import { useRocketPartDialogValidation } from '@/components/content/rockets/parts/dialogs/rocketPartDialogValidation';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'AltimeterRocketPartDialog',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitSelect2,
		MeasurementUnitsSelect,
		VtFormControl,
		VtFormDialog,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		...useDetailComponentProps,
		...useRocketPartDialogComponentProps
	},
	emits: ['close', 'error', 'ok'],
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
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			measurementUnitsFromUnitId,
			hasAdminDelete,
			hasAdminEdit,
			hasAdminRoles,
			isLoggedIn,
			detailItem,
			detailItemTextRows,
			dialogClose,
			dialogError,
			dialogOk,
			preCompleteOk,
			resetAdditional,
			setAdditional,
			detailItemApogeeDelay,
			detailItemMainAltitude,
			detailItemMainAltitudeMeasurementUnitId,
			detailItemMainAltitudeMeasurementUnitsId,
			detailItemMotorDelay,
			scope,
			validation
		} = useAltimeterRocketPartComponent(props, context, options);

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
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			measurementUnitsFromUnitId,
			hasAdminDelete,
			hasAdminEdit,
			hasAdminRoles,
			isLoggedIn,
			detailItem,
			detailItemTextRows,
			dialogClose,
			dialogError,
			dialogOk,
			preCompleteOk,
			resetAdditional,
			setAdditional,
			detailItemApogeeDelay,
			detailItemMainAltitude,
			detailItemMainAltitudeMeasurementUnitId,
			detailItemMainAltitudeMeasurementUnitsId,
			detailItemMotorDelay,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useAltimeterRocketPartValidation), 
		LibraryCommonUtility.cloneDeep(useRocketPartDialogValidation));
	}
};
</script>

<style scoped>
</style>
