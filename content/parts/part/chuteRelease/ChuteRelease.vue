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
			<v-col cols="2">
				<VSwitchWithValidation
					v-if="!isEditable || hasAdmin"
					ref="isPublicRef"
					v-model="detailItemIsPublic"
					vid="detailItemIsPublic"
					:validation="validation"
					:readonly="!isEditable || !hasAdmin"
					:label="$t('forms.content.parts.public')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col>
				<VTextAreaWithValidation
					ref="descriptionRef"
					v-model="detailItemDescription"
					vid="detailItemDescription"
					:label="$t('forms.description')"
					:validation="validation"
					:readonly="!isEditable"
					:counter="30"
					:clearable="isEditable"
					:rows="detailItemTextRows"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tr>
						<td>
							<VNumberFieldWithValidation
								ref="detailItemWeightRef"
								v-model="detailItemWeight"
								vid="detailItemWeight"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.content.parts.weight')"
							/>
						</td>
						<!-- <td class="measurementUnitsMedium">
							<MeasurementUnitsSelect
								ref="detailItemWeightMeasurementUnitsIdRef"
								v-model="detailItemWeightMeasurementUnitsId"
								vid="detailItemWeightMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnitMedium">
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
						</td> -->
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
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailComponentProps } from '@/components/content/detailComponentProps';
import { useChuteReleasePartComponent } from '@/components/content/parts/part/chuteRelease/chuteReleasePartComponent';
import { useChuteReleaseartValidation } from '@/components/content/parts/part/chuteRelease/chuteReleasePartValidation';
import { usePartComponentProps } from '@/components/content/parts/part/partComponentProps';
import { usePartValidation } from '@/components/content/parts/part/partValidation';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'ChuteReleasePartControl',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitSelect2,
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
		...usePartComponentProps
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
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			detailItemDescription,
			detailItemIsPublic,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemWeight,
			detailItemWeightMeasurementUnitId,
			detailItemWeightMeasurementUnitsId,
			manufacturers,
			canAdd,
			hasAdmin,
			isPublic,
			handleAdd,
			requestManufacturers,
			scope,
			validation
		} = useChuteReleasePartComponent(props, context, options);

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
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			detailItemDescription,
			detailItemIsPublic,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemWeight,
			detailItemWeightMeasurementUnitId,
			detailItemWeightMeasurementUnitsId,
			manufacturers,
			canAdd,
			hasAdmin,
			isPublic,
			handleAdd,
			requestManufacturers,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(usePartValidation), 
		LibraryCommonUtility.cloneDeep(useChuteReleaseartValidation));
	}
};
</script>

<style scoped>
</style>
