<template>
	<div
		v-if="debug"
	>
		[[ invalid {{ invalid }} ]]
		[[ dirty {{ dirty }} ]]
		[[ isEditable {{ isEditable }} ]]
		[[ isNew {{ isNew }} ]]
		[[ isPublicItem {{ isPublicItem }} ]]
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
		:reset-additional="resetAdditional"
		:pre-complete-ok="preCompleteOk"
		@cancel="handleCancel"
		@ok="handleOk"
		:debug="debug"
	>
		<!-- :readonly="!isEditable" -->
		<v-row dense>
			<v-col cols="9" sm="10">
				<VtTextFieldWithValidation
					ref="nameRef"
					v-model="detailItemName"
					vid="detailItemName"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.name')"
					:maxcount="30"
				/>
			</v-col>
			<v-col cols="3" sm="2">
				<VtSwitchWithValidation
					v-if="!isEditable || hasAdminEdit"
					ref="isPublicRef"
					v-model="detailItemIsPublic"
					vid="detailItemIsPublic"
					:validation="validation"
					:readonly="!isEditable || !hasAdminEdit"
					:label="$t('forms.content.parts.public')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<VtTextAreaWithValidation
					ref="descriptionRef"
					v-model="detailItemDescription"
					vid="detailItemDescription"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.description')"
					:clearable="isEditable"
					:maxcount="300"
					:rows="detailItemTextRows"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tbody>
						<tr>
							<td>
								<VtNumberFieldWithValidation
									ref="detailItemDimensionRef"
									v-model="detailItemDimension"
									vid="detailItemDimension"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.content.parts.chuteProtector.dimension')"
								/>
							</td>
							<!-- <td class="measurementUnitsMedium">
								<MeasurementUnitsSelect
									ref="detailItemDimensionMeasurementUnitsIdRef"
									v-model="detailItemDimensionMeasurementUnitsId"
									vid="detailItemDimensionMeasurementUnitsId"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.settings.measurementUnits.title')"
								/>
							</td>
							<td class="measurementUnitMedium">
								<MeasurementUnitSelect
									ref="detailItemDimensionMeasurementUnitIdRef"
									v-model="detailItemDimensionMeasurementUnitId"
									vid="detailItemDimensionMeasurementUnitId"
									:measurementUnitsId="detailItemDimensionMeasurementUnitsId"
									:measurementUnitsType="measurementUnitsLengthType"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.settings.measurementUnits.length')"
								/>
							</td> -->
							<td class="measurementUnitMedium">
								<MeasurementUnitSelect2
									ref="detailItemDimensionMeasurementUnitIdRef"
									v-model="detailItemDimensionMeasurementUnitId"
									vid="detailItemDimensionMeasurementUnitId"
									:measurementUnitsType="measurementUnitsLengthType"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.settings.measurementUnits.length')"
								/>
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
									ref="detailItemDiameterRef"
									v-model="detailItemDiameter"
									vid="detailItemDiameter"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.content.parts.chuteProtector.maxTubeSize')"
								/>
							</td>
						<!-- <td class="measurementUnitsMedium">
								<MeasurementUnitsSelect
									ref="detailItemDiameterMeasurementUnitsIdRef"
									v-model="detailItemDiameterMeasurementUnitsId"
									vid="detailItemDiameterMeasurementUnitsId"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.settings.measurementUnits.title')"
								/>
							</td>
							<td class="measurementUnitMedium">
								<MeasurementUnitSelect
									ref="detailItemDiameterMeasurementUnitIdRef"
									v-model="detailItemDiameterMeasurementUnitId"
									vid="detailItemDiameterMeasurementUnitId"
									:measurementUnitsId="detailItemDiameterMeasurementUnitsId"
									:measurementUnitsType="measurementUnitsLengthType"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.settings.measurementUnits.length')"
								/>
							</td> -->
							<td class="measurementUnitMedium">
								<MeasurementUnitSelect2
									ref="detailItemDiameterMeasurementUnitIdRef"
									v-model="detailItemDiameterMeasurementUnitId"
									vid="detailItemDiameterMeasurementUnitId"
									:measurementUnitsType="measurementUnitsLengthType"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.settings.measurementUnits.length')"
								/>
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
					</tbody>
				</table>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="8">
				<VtSelectWithValidation
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
				<VtTextFieldWithValidation
					ref="detailItemManufacturerStockIdRef"
					v-model="detailItemManufacturerStockId"
					vid="detailItemManufacturerStockId"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.manufacturerId')"
					:maxcount="30"
				/>
			</v-col>
		</v-row>
	</VtFormControl>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailComponentProps } from '@/components/content/detailComponentProps';
import { useChuteProtectorPartComponent } from '@/components/content/parts/part/chuteProtector/chuteProtectorPartComponent';
import { useChuteProtectorPartValidation } from '@/components/content/parts/part/chuteProtector/chuteProtectorPartValidation';
import { usePartComponentProps } from '@/components/content/parts/part/partComponentProps';
import { usePartValidation } from '@/components/content/parts/part/partValidation';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'ChuteProtectorPartControl',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitSelect2,
		MeasurementUnitsSelect,
		VtFormControl,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		...useDetailComponentProps,
		...usePartComponentProps
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
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			measurementUnitsFromUnitId,
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
			hasAdminDelete,
			hasAdminEdit,
			isPublicItem,
			handleAdd,
			requestManufacturers,
			detailItemCd,
			detailItemDiameter,
			detailItemDiameterMeasurementUnitId,
			detailItemDiameterMeasurementUnitsId,
			detailItemDimension,
			detailItemDimensionMeasurementUnitId,
			detailItemDimensionMeasurementUnitsId,
			scope,
			validation
		} = useChuteProtectorPartComponent(props, context, options);

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
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			measurementUnitsFromUnitId,
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
			hasAdminDelete,
			hasAdminEdit,
			isPublicItem,
			handleAdd,
			requestManufacturers,
			detailItemCd,
			detailItemDiameter,
			detailItemDiameterMeasurementUnitId,
			detailItemDiameterMeasurementUnitsId,
			detailItemDimension,
			detailItemDimensionMeasurementUnitId,
			detailItemDimensionMeasurementUnitsId,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(usePartValidation), 
		LibraryCommonUtility.cloneDeep(useChuteProtectorPartValidation));
	}
};
</script>

<style scoped>
</style>
