<template>
	<VtFormDialog
		:label="$t('titles.edit') + ' ' + displayName"
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
		<div
			v-if="debug"
			class="text-center"
		>
			isEditable: {{ isEditable }} readonly: {{ readonly }}
		</div>
		<v-row dense>
			<v-col cols="9">
				<VtTextAreaWithValidation
					ref="detailItemDescriptionRef"
					v-model="detailItemDescription"
					vid="detailItemDescription"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.description')"
					:counter="30"
					:rows="detailItemTextRows"
				/>
			</v-col>
			<v-col cols="3">
				<VtTextField
					ref="detailItemIndexRef"
					v-model="detailItemIndex"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.stage.name')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="6">
				<VtSelectWithValidation
					ref="detailItemManufacturerRef"
					v-model="detailItemManufacturer"
					vid="detailItemManufacturer"
					:items="manufacturers"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.manufacturer.name')"
				/>
			</v-col>
			<v-col cols="6">
				<VtTextFieldWithValidation
					ref="detailItemManufacturerStockIdRef"
					v-model="detailItemManufacturerStockId"
					vid="detailItemManufacturerStockId"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.manufacturerId')"
					:counter="30"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tr>
						<td>
							<VtNumberFieldWithValidation
								ref="detailItemLengthRef"
								v-model="detailItemLength"
								vid="detailItemLength"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.content.rockets.length')"
							/>
						</td>
						<td class="measurementUnitMedium">
							<MeasurementUnitSelect2
								ref="detailItemLengthMeasurementUnitIdRef"
								v-model="detailItemLengthMeasurementUnitId"
								vid="detailItemLengthMeasurementUnitId"
								:measurementUnitsType="measurementUnitsLengthType"
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
								ref="detailItemDiameterMajorRef"
								v-model="detailItemDiameterMajor"
								vid="detailItemDiameterMajor"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.content.rockets.diameter.name')"
							/>
						</td>
						<td class="measurementUnitMedium">
							<MeasurementUnitSelect2
								ref="detailItemDiameterMajorMeasurementUnitIdRef"
								v-model="detailItemDiameterMajorMeasurementUnitId"
								vid="detailItemDiameterMajorMeasurementUnitId"
								:measurementUnitsType="measurementUnitsLengthType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
			<!-- <v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tr>
						<td>
							<VtNumberFieldWithValidation
								ref="detailItemDiameterMinorRef"
								v-model="detailItemDiameterMinor"
								vid="detailItemDiameterMinor"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.content.rockets.diameter.name')"
							/>
						</td>
						<td class="measurementUnitMedium">
							<MeasurementUnitSelect2
								ref="detailItemDiameterMinorMeasurementUnitIdRef"
								v-model="detailItemDiameterMinorMeasurementUnitId"
								vid="detailItemDiameterMinorMeasurementUnitId"
								:measurementUnitsType="measurementUnitsLengthType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col> -->
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tr>
						<td>
							<VtNumberFieldWithValidation
								ref="detailItemWeightRef"
								v-model="detailItemWeight"
								vid="detailItemWeight"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.content.parts.weight')"
							/>
						</td>
						<td class="measurementUnitMedium">
							<MeasurementUnitSelect2
								ref="detailItemWeightMeasurementUnitIdRef"
								v-model="detailItemWeightMeasurementUnitId"
								vid="detailItemWeightMeasurementUnitId"
								:measurementUnitsType="measurementUnitsWeightType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.weight')"
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
								ref="detailItemCpRef"
								v-model="detailItemCp"
								vid="detailItemCp"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.content.rockets.cp')"
							/>
						</td>
						<td class="measurementUnitMedium">
							<MeasurementUnitSelect2
								ref="detailItemCpMeasurementUnitIdRef"
								v-model="detailItemCpMeasurementUnitId"
								vid="detailItemCpMeasurementUnitId"
								:measurementUnitsType="measurementUnitsLengthType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="6" sm="3">
				<VtSelectWithValidation
					ref="detailItemMotorDiameter0Ref"
					v-model="detailItemMotorDiameter0"
					vid="detailItemMotorDiameter0"
					:items="motorDiameters0"
					:validation="validation"
					:label="$t('forms.content.rockets.motor.diameter') + ' #1'"
				/>
			</v-col>
			<v-col cols="6" sm="3">
				<VtTextFieldWithValidation
					ref="detailItemMotorCount0Ref"
					v-model="detailItemMotorCount0"
					vid="detailItemMotorCount0"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.motor.count') + ' #1'"
				/>
			</v-col>
			<v-col cols="6" sm="3">
				<VtSelectWithValidation
					ref="detailItemMotorDiameter1Ref"
					v-model="detailItemMotorDiameter1"
					vid="detailItemMotorDiameter1"
					:items="motorDiameters"
					:validation="validation"
					:label="$t('forms.content.rockets.motor.diameter') + ' #2'"
				/>
			</v-col>
			<v-col cols="6" sm="3">
				<VtTextFieldWithValidation
					ref="detailItemMotorCount1Ref"
					v-model="detailItemMotorCount1"
					vid="detailItemMotorCount1"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.motor.count') + ' #2'"
				/>
			</v-col>
			<v-col cols="6" sm="3">
				<VtSelectWithValidation
					ref="detailItemMotorDiameter2Ref"
					v-model="detailItemMotorDiameter2"
					vid="detailItemMotorDiameter2"
					:items="motorDiameters"
					:validation="validation"
					:label="$t('forms.content.rockets.motor.diameter') + ' #3'"
				/>
			</v-col>
			<v-col cols="6" sm="3">
				<VtTextFieldWithValidation
					ref="detailItemMotorCount2Ref"
					v-model="detailItemMotorCount2"
					vid="detailItemMotorCount2"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.motor.count') + ' #3'"
				/>
			</v-col>
		</v-row>
	</VtFormDialog>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailFormDialogProps } from '@/components/content/detailFormDialogProps';
import { useRocketStageEditDialogComponent } from '@/components/content/rockets/library/dialogs/rocketStageEditDialogComponent';
import { useRocketStageEditDialogValidation } from '@/components/content/rockets/library/dialogs/rocketStageEditDialogValidation';
import { useRocketStageEditDialogComponentProps } from '@/components/content/rockets/library/dialogs/rocketStageEditDialogComponentProps';
import { useRocketEditValidation } from '@/components/content/rockets/library/rocket/rocketEditValidation';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'RocketStageEditDialog',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitSelect2,
		MeasurementUnitsSelect,
		VtFormDialog,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextField,
		VtTextFieldWithValidation
	},
	props: {
		...useDetailFormDialogProps,
		...useRocketStageEditDialogComponentProps
	},
	emits: ['close', 'error', 'ok'],
	setup (props, context) {
		const {
			detailItem,
			detailItemTextRows,
			dialogError,
			dialogClose,
			dialogOk,
			motorDiameters,
			isEditable,
			detailItemCp,
			detailItemCpFrom,
			detailItemCpMeasurementUnitId,
			detailItemCpMeasurementUnitsId,
			detailItemDescription,
			detailItemDiameterMajor,
			detailItemDiameterMajorMeasurementUnitId,
			detailItemDiameterMajorMeasurementUnitsId,
			detailItemDiameterMinor,
			detailItemDiameterMinorMeasurementUnitId,
			detailItemDiameterMinorMeasurementUnitsId,
			detailItemLength,
			detailItemLengthMeasurementUnitId,
			detailItemLengthMeasurementUnitsId,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemMotorCount0,
			detailItemMotorCount1,
			detailItemMotorCount2,
			detailItemMotorDiameter0,
			detailItemMotorDiameter1,
			detailItemMotorDiameter2,
			detailItemIndex,
			detailItemWeight,
			detailItemWeightMeasurementUnitId,
			detailItemWeightMeasurementUnitsId,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			resetEditData,
			setEditData,
			displayName,
			motorDiameters0,
			stageIndex,
			motorCount,
			preCompleteOk,
			resetAdditional,
			setAdditional,
			scope,
			validation
		} = useRocketStageEditDialogComponent(props, context);

		return {
			detailItem,
			detailItemTextRows,
			dialogError,
			dialogClose,
			dialogOk,
			motorDiameters,
			isEditable,
			detailItemCp,
			detailItemCpFrom,
			detailItemCpMeasurementUnitId,
			detailItemCpMeasurementUnitsId,
			detailItemDescription,
			detailItemDiameterMajor,
			detailItemDiameterMajorMeasurementUnitId,
			detailItemDiameterMajorMeasurementUnitsId,
			detailItemDiameterMinor,
			detailItemDiameterMinorMeasurementUnitId,
			detailItemDiameterMinorMeasurementUnitsId,
			detailItemLength,
			detailItemLengthMeasurementUnitId,
			detailItemLengthMeasurementUnitsId,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemMotorCount0,
			detailItemMotorCount1,
			detailItemMotorCount2,
			detailItemMotorDiameter0,
			detailItemMotorDiameter1,
			detailItemMotorDiameter2,
			detailItemIndex,
			detailItemWeight,
			detailItemWeightMeasurementUnitId,
			detailItemWeightMeasurementUnitsId,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			resetEditData,
			setEditData,
			displayName,
			motorDiameters0,
			stageIndex,
			motorCount,
			preCompleteOk,
			resetAdditional,
			setAdditional,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketStageEditDialogValidation), LibraryCommonUtility.cloneDeep(useRocketEditValidation(false)));
	}
};
</script>

<style scoped>
</style>
