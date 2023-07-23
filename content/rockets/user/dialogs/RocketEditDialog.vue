<template>
	<VFormDialog
		:label="$t('titles.edit') + ' ' + $t('forms.rocket')"
		:signal="signal"
		:button-ok-disabled-override="buttonOkDisabledOverride"
		:pre-complete-ok="preCompleteOk"
		:reset-additional="resetAdditional"
		:validation="validation"
		max-width="70vh"
		@close="dialogClose"
		@error="dialogError"
		@ok="dialogOk"
	>
		<!-- :readonly="!isEditable" -->
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
					ref="detailItemDiameterRef"
					v-model="detailItemDiameter"
					vid="detailItemDiameterr"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.diameter')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="diameterMeasurementUnitsIdRef"
								v-model="diameterMeasurementUnitsId"
								vid="diameterMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="diameterMeasurementUnitIdRef"
								v-model="diameterMeasurementUnitId"
								vid="diameterMeasurementUnitId"
								:measurementUnitsId="diameterMeasurementUnitsId"
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
								ref="lengthMeasurementUnitsIdRef"
								v-model="lengthMeasurementUnitsId"
								vid="lengthMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="lengthMeasurementUnitIdRef"
								v-model="lengthMeasurementUnitId"
								vid="lengthMeasurementUnitId"
								:measurementUnitsId="lengthMeasurementUnitsId"
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
								ref="weightMeasurementUnitsIdRef"
								v-model="weightMeasurementUnitsId"
								vid="weightMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="weightMeasurementUnitIdRef"
								v-model="weightMeasurementUnitId"
								vid="weightMeasurementUnitId"
								:measurementUnitsId="weightMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsWeightType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.weight')"
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

import { useRocketEditDialogComponent } from '@/components/content/rockets/user/dialogs/rocketEditDialogComponent';
import { useRocketEditDialogProps } from '@/components/content/rockets/user/dialogs/rocketEditDialogProps';
import { useRocketEditDialogValidation } from '@/components/content/rockets/user/dialogs/rocketEditDialogValidation';
import { useRocketEditValidation } from '@/components/content/rockets/user/rocket/rocketEditValidation';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VFormDialog';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'RocketEditDialog',
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
		...useRocketEditDialogProps
	},
	emits: ['close', 'error', 'ok'],
	setup (props, context) {
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
			cgMeasurementUnitId,
			cgMeasurementUnitsId,
			cpMeasurementUnitId,
			cpMeasurementUnitsId,
			detailItemCg,
			detailItemCgFrom,
			detailItemCp,
			detailItemCpFrom,
			detailItemDescription,
			detailItemLength,
			detailItemName,
			detailItemWeight,
			lengthMeasurementUnitId,
			lengthMeasurementUnitsId,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			resetEditData,
			setEditData,
			detailItemDiameter,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			buttonOkDisabledOverride,
			detailItemTextRows,
			dialogError,
			dialogClose,
			dialogOk,
			isEditable,
			preCompleteOk,
			resetAdditional,
			scope,
			validation
		} = useRocketEditDialogComponent(props, context);

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
			cgMeasurementUnitId,
			cgMeasurementUnitsId,
			cpMeasurementUnitId,
			cpMeasurementUnitsId,
			detailItemCg,
			detailItemCgFrom,
			detailItemCp,
			detailItemCpFrom,
			detailItemDescription,
			detailItemLength,
			detailItemName,
			detailItemWeight,
			lengthMeasurementUnitId,
			lengthMeasurementUnitsId,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			resetEditData,
			setEditData,
			detailItemDiameter,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			buttonOkDisabledOverride,
			detailItemTextRows,
			dialogError,
			dialogClose,
			dialogOk,
			isEditable,
			preCompleteOk,
			resetAdditional,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketEditDialogValidation), LibraryCommonUtility.cloneDeep(useRocketEditValidation));
	}
};
</script>

<style scoped>
</style>
