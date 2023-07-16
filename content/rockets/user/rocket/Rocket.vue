<template>
	<div
		v-if="debug"
	>
		[[ invalid {{ invalid }} ]]
		[[ dirty {{ dirty }} ]]
		[[ isEditable {{ isEditable }} ]]
		[[ isNew {{ isNew }} ]]
		[[ isPublic {{ isPublic }} ]]
		<!-- [[ modelValue {{ JSON.stringify(modelValue) }}]] -->
		<!-- [[ detailItem {{ JSON.stringify(detailItem) }}]]  -->
		<!-- <div>[[ detailItemData {{ JSON.stringify(detailItemData) }} ]] </div> -->
	</div>
	<VFormControl
		ref="formControlRef"
		:validation="validation"
		:button-cancel="true"
		button-cancel-name="buttons.close"
		:button-clear="isEditable"
		button-clear-name="buttons.reset"
		:button-delete="false"
		:button-ok="isEditable"
		:dirty-callback="dirtyCallback"
		:invalid-callback="invalidCallback"
		:reset-additional="resetAdditional"
		:pre-complete-ok="preCompleteOk"
		@cancel="handleCancel"
		@ok="handleOk"
		:debug="debug"
	>
		<!-- :readonly="!isEditable" -->
		<v-row dense>
			<v-col cols="10">
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
					:clearable="isEditable"
					:rows="detailItemTextRows"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemDiameterRef"
					vid="detailItemDiameter"
					:validation="validation"
					:readonly="!isEditable"
					v-model="detailItemDiameter"
					:label="$t('forms.content.parts.diameter')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="diameterMeasurementUnitsIdRef"
								vid="diameterMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								v-model="diameterMeasurementUnitsId"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="diameterMeasurementUnitIdRef"
								vid="diameterMeasurementUnitId"
								v-model="diameterMeasurementUnitId"
								:measurementUnitsId="diameterMeasurementUnitsId"
								:measurementUnitsType="measurementUnitslengthType"
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
					vid="detailItemLength"
					v-model="detailItemLength"
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
								vid="lengthMeasurementUnitsId"
								v-model="lengthMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="lengthMeasurementUnitIdRef"
								vid="lengthMeasurementUnitId"
								v-model="lengthMeasurementUnitId"
								:measurementUnitsId="lengthMeasurementUnitsId"
								:measurementUnitsType="measurementUnitslengthType"
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
					vid="detailItemWeight"
					v-model="detailItemWeight"
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
								vid="weightMeasurementUnitsId"
								v-model="weightMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="weightMeasurementUnitIdRef"
								vid="weightMeasurementUnitId"
								v-model="weightMeasurementUnitId"
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
			<v-col cols="6">
				<VSelectWithValidation
					ref="detailItemRocketTypeRef"
					v-model="detailItemRocketType"
					vid="detailItemRocketType"
					:items="rocketTypes"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.name')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="8">
				<VSelectWithValidation
					ref="manufacturerRef"
					v-model="detailItemManufacturer"
					vid="detailItemManufacturer"
					:items="manufacturers"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.manufacturer.name')"
				/>
			</v-col>
			<v-col cols="4">
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
	</VFormControl>
</template>

<script>
import { between, decimal, required } from '@vuelidate/validators';

import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailComponentProps } from '@/components/content/detailComponentProps';
import { useRocketValidation } from '@/components/content/rockets/user/rocket/rocketValidation';
import { useRocketComponent } from '@/components/content/rockets/user/rocket/rocketComponent';
import { useRocketComponentProps } from '@/components/content/rockets/user/rocket/rocketComponentProps';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'RocketPartControl',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		VFormControl,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
	},
	props: {
		...useDetailComponentProps,
		...useRocketComponentProps
	},
	emits: ['cancel', 'close', 'error', 'ok'],
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
			serviceStore,
			formControlRef,
			dirty,
			detailItem,
			invalid,
			canDelete,
			detailItemData,
			detailItemTextRows,
			isEditable,
			isNew,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			preCompleteOk,
			resetAdditional,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsLengthDefaultId,
			measurementUnitslengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			rocketTypes,
			detailItemDescription,
			detailItemDiameter,
			detailItemLength,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemRocketType,
			detailItemWeight,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			lengthMeasurementUnitId,
			lengthMeasurementUnitsId,
			manufacturers,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			canAdd,
			hasAdmin,
			handleAdd,
			requestManufacturers,
			scope,
			validation
		} = useRocketComponent(props, context, options);

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
			serviceStore,
			formControlRef,
			dirty,
			detailItem,
			invalid,
			canDelete,
			detailItemData,
			detailItemTextRows,
			isEditable,
			isNew,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			preCompleteOk,
			resetAdditional,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsLengthDefaultId,
			measurementUnitslengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			rocketTypes,
			detailItemDescription,
			detailItemDiameter,
			detailItemLength,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemRocketType,
			detailItemWeight,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			lengthMeasurementUnitId,
			lengthMeasurementUnitsId,
			manufacturers,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			canAdd,
			hasAdmin,
			handleAdd,
			requestManufacturers,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketValidation), {
			detailItemDiameter: { required, decimal, between: between(0, 2004), $autoDirty: true },
			detailItemLength: { required, decimal, between: between(0, 120), $autoDirty: true },
			detailItemPilotChuteCd: { decimal, between: between(0, 9), $autoDirty: true },
			diameterMeasurementUnitId: { $autoDirty: true },
			diameterMeasurementUnitsId: { $autoDirty: true },
			lengthMeasurementUnitId: { $autoDirty: true },
			lengthMeasurementUnitsId: { $autoDirty: true }
		});
	}
};
</script>

<style scoped>
</style>
