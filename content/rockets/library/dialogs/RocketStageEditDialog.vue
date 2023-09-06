<template>
	<VFormDialog
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
			<v-col>
				<VTextAreaWithValidation
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
		</v-row>
		<v-row dense>
			<v-col cols="6">
				<VSelectWithValidation
					ref="detailItemMotorDiameterRef"
					v-model="detailItemMotorDiameter"
					vid="detailItemMotorDiameter"
					:items="motorDiameters"
					:validation="validation"
					:label="$t('forms.external.motorSearch.diameter')"
				/>
			</v-col>
			<v-col cols="6">
				<VTextField
					ref="detailItemNumberRef"
					v-model="detailItemNumber"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.stage.name')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="6">
				<VSelectWithValidation
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
				<VTextFieldWithValidation
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
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemDiameterMajorRef"
					v-model="detailItemDiameterMajor"
					vid="detailItemDiameterMajorr"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.diameter.name')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="detailItemDiameterMajorMeasurementUnitsIdRef"
								v-model="detailItemDiameterMajorMeasurementUnitsId"
								vid="detailItemDiameterMajorMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="detailItemDiameterMajorMeasurementUnitIdRef"
								v-model="detailItemDiameterMajorMeasurementUnitId"
								vid="detailItemDiameterMajorMeasurementUnitId"
								:measurementUnitsId="detailItemDiameterMajorMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsLengthType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemLengthRef"
					v-model="detailItemLength"
					vid="detailItemLength"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.length')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="detailItemLengthMeasurementUnitsIdRef"
								v-model="detailItemLengthMeasurementUnitsId"
								vid="detailItemLengthMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="detailItemLengthMeasurementUnitIdRef"
								v-model="detailItemLengthMeasurementUnitId"
								vid="detailItemLengthMeasurementUnitId"
								:measurementUnitsId="detailItemLengthMeasurementUnitsId"
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
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemWeightRef"
					v-model="detailItemWeight"
					vid="detailItemWeight"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.weight')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="detailItemWeightMeasurementUnitsIdRef"
								v-model="detailItemWeightMeasurementUnitsId"
								vid="detailItemWeightMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="detailItemWeightMeasurementUnitIdRef"
								v-model="detailItemWeightMeasurementUnitId"
								vid="detailItemWeightMeasurementUnitId"
								:measurementUnitsId="detailItemWeightMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsWeightType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.weight')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemCpRef"
					v-model="detailItemCp"
					vid="detailItemCp"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.cp')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="detailItemCpMeasurementUnitsIdRef"
								v-model="detailItemCpMeasurementUnitsId"
								vid="detailItemCpMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="detailItemCpMeasurementUnitIdRef"
								v-model="detailItemCpMeasurementUnitId"
								vid="detailItemCpMeasurementUnitId"
								:measurementUnitsId="detailItemCpMeasurementUnitsId"
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
	</VFormDialog>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailFormDialogProps } from '@/components/content/detailFormDialogProps';
import { useRocketStageEditDialogComponent } from '@/components/content/rockets/library/dialogs/rocketStageEditDialogComponent';
import { useRocketStageEditDialogValidation } from '@/components/content/rockets/library/dialogs/rocketStageEditDialogValidation';
import { useRocketStageEditDialogComponentProps } from '@/components/content/rockets/library/dialogs/rocketStageEditDialogComponentProps';
import { useRocketEditValidation } from '@/components/content/rockets/library/rocket/rocketEditValidation';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VFormDialog';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'RocketStageEditDialog',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		VFormDialog,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
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
			detailItemMotorDiameter,
			detailItemNumber,
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
			stageNumber,
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
			detailItemMotorDiameter,
			detailItemNumber,
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
			stageNumber,
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
