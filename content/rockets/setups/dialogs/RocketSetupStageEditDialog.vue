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
		max-width="70vh"
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
			<v-col cols="12" md="8">
				<VTextFieldWithValidation
					ref="nameRef"
					v-model="detailItemName"
					vid="detailItemName"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.name')"
					:counter="30"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col>
				<VTextAreaWithValidation
					ref="descriptionRef"
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
					ref="detailItemCgRef"
					v-model="detailItemCg"
					vid="detailItemCg"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.cg')"
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
import { useRocketSetupStageEditDialogComponent } from '@/components/content/rockets/setups/dialogs/rocketSetupStageEditDialogComponent';
import { useRocketSetupStageEditDialogValidation } from '@/components/content/rockets/setups/dialogs/rocketSetupStageEditDialogValidation';
import { useRocketSetupStageEditDialogComponentProps } from '@/components/content/rockets/setups/dialogs/rocketSetupStageEditDialogComponentProps';
import { useRocketSetupEditValidation } from '@/components/content/rockets/setups/setup/rocketSetupEditValidation';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RecoveryLookupDialog from '@/components/content/rockets/dialogs/recovery/RecoveryLookupDialog';
import VFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VFormDialog';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'RocketSetupStageEditDialog',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		RecoveryLookupDialog,
		VFormDialog,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
	},
	props: {
		...useDetailFormDialogProps,
		...useRocketSetupStageEditDialogComponentProps
	},
	emits: ['close', 'error', 'ok'],
	setup (props, context) {
		const {
			detailItem,
			detailItemTextRows,
			dialogError,
			dialogClose,
			dialogOk,
			isEditable,
			detailItemCg,
			detailItemCgFrom,
			detailItemCgMeasurementUnitId,
			detailItemCgMeasurementUnitsId,
			detailItemDescription,
			detailItemName,
			detailItemNotes,
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
			preCompleteOk,
			resetAdditional,
			setAdditional,
			scope,
			validation
		} = useRocketSetupStageEditDialogComponent(props, context);

		return {
			detailItem,
			detailItemTextRows,
			dialogError,
			dialogClose,
			dialogOk,
			isEditable,
			detailItemCg,
			detailItemCgFrom,
			detailItemCgMeasurementUnitId,
			detailItemCgMeasurementUnitsId,
			detailItemDescription,
			detailItemName,
			detailItemNotes,
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
			preCompleteOk,
			resetAdditional,
			setAdditional,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketSetupStageEditDialogValidation), LibraryCommonUtility.cloneDeep(useRocketSetupEditValidation(false)));
	}
};
</script>

<style scoped>
</style>
