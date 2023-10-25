<template>
	<div
		v-if="debug"
	>
		[[ invalid {{ invalid }} ]]
		[[ dirty {{ dirty }} ]]
		[[ editable {{ editable }} ]]
		[[ isNew {{ isNew }} ]]
		[[ isPublic {{ isPublic }} ]]
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
		width="80vh"
		max-width="90vh"
		@close="dialogClose"
		@error="dialogError"
		@ok="dialogOk"
	>
		<!-- :readonly="!editable" -->
		<v-row dense>
			<v-col cols="6">
				<VtSwitchWithValidation
					class="ml-2"
					ref="detailItemReefedRef"
					v-model="detailItemReefed"
					vid="detailItemReefed"
					:validation="validation"
					:readonly="!editable"
					:label="$t('forms.content.parts.parachute.reefed.title')"
				/>
			</v-col>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tr>
						<td>
							<VtNumberFieldWithValidation
								ref="detailItemReefedLengthRef"
								v-model="detailItemReefedLength"
								vid="detailItemReefedLength"
								:validation="validation"
								:readonly="!editable"
								:label="$t('forms.content.parts.parachute.reefed.length')"
							/>
						</td>
						<td class="measurementUnitMedium">
							<MeasurementUnitSelect2
								ref="detailItemReefedLengthMeasurementUnitIdRef"
								v-model="detailItemReefedLengthMeasurementUnitId"
								vid="detailItemReefedLengthMeasurementUnitId"
								:measurementUnitsType="measurementUnitsLengthType"
								:validation="validation"
								:readonly="!editable"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
	</VtFormDialog>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useParachuteRocketPartComponent } from '@/components/content/rockets/parts/dialogs/parachute/parachuteRocketPartDialogComponent';
import { useParachuteRocketPartValidation } from '@/components/content/rockets/parts/dialogs/parachute/parachuteRocketPartDialogValidation';
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
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'ParachuteRocketPartDialog',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitSelect2,
		MeasurementUnitsSelect,
		VtFormControl,
		VtFormDialog,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
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
			detailItemReefed,
			detailItemReefedLength,
			detailItemReefedLengthMeasurementUnitId,
			detailItemReefedLengthMeasurementUnitsId,
			scope,
			validation
		} = useParachuteRocketPartComponent(props, context, options);

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
			detailItemReefed,
			detailItemReefedLength,
			detailItemReefedLengthMeasurementUnitId,
			detailItemReefedLengthMeasurementUnitsId,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useParachuteRocketPartValidation), 
		LibraryCommonUtility.cloneDeep(useRocketPartDialogValidation));
	}
};
</script>

<style scoped>
</style>
