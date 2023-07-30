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
					:label="$t('forms.name')"
					:counter="30"
					:validation="validation"
					:readonly="!isEditable"
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
					v-model="detailItemDiameter"
					vid="detailItemDiameter"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.diameter')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="detailItemDiameterMeasurementUnitsIdRef"
								v-model="detailItemDiameterMeasurementUnitsId"
								vid="detailItemDiameterMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
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
						</td>
					</tr>
				</table>
			</v-col>
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
		</v-row>
		<v-row dense>
			<v-col cols="6">
				<VNumberFieldWithValidation
					ref="detailItemCdRef"
					v-model="detailItemCd"
					vid="detailItemCd"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.cd')"
				/>
			</v-col>
			<v-col cols="6">
				<VSwitchWithValidation
					class="ml-2 mr-2"
					ref="detailItemThinMillRef"
					v-model="detailItemThinMill"
					vid="detailItemThinMill"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.parachute.thinMill')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemLoadMaxRef"
					v-model="detailItemLoadMax"
					vid="detailItemLoadMax"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.parachute.loadMax')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="detailItemLoadMaxWeightMeasurementUnitsIdRef"
								v-model="detailItemLoadMaxWeightMeasurementUnitsId"
								vid="detailItemLoadMaxWeightMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="detailItemLoadMaxWeightMeasurementUnitIdRef"
								v-model="detailItemLoadMaxWeightMeasurementUnitId"
								vid="detailItemLoadMaxWeightMeasurementUnitId"
								:measurementUnitsId="detailItemLoadMaxWeightMeasurementUnitsId"
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
					ref="detailItemLoadMinRef"
					v-model="detailItemLoadMin"
					vid="detailItemLoadMin"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.parachute.loadMin')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="detailItemLoadMinWeightMeasurementUnitsIdRef"
								v-model="detailItemLoadMinWeightMeasurementUnitsId"
								vid="detailItemLoadMinWeightMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="detailItemLoadMinWeightMeasurementUnitIdRef"
								v-model="detailItemLoadMinWeightMeasurementUnitId"
								vid="detailItemLoadMinWeightMeasurementUnitId"
								:measurementUnitsId="detailItemLoadMinWeightMeasurementUnitsId"
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
import { useParachutePartComponent } from '@/components/content/parts/part/parachute/parachutePartComponent';
import { usePartComponentProps } from '@/components/content/parts/part/partComponentProps';
import { usePartValidation } from '@/components/content/parts/part/partValidation';
import { useParachutePartValidation } from '@/components/content/parts/part/parachute/parachutePartValidation';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'ParchutePartControl',
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
			detailItemCd,
			detailItemDiameter,
			detailItemDiameterMeasurementUnitId,
			detailItemDiameterMeasurementUnitsId,
			detailItemLoadMax,
			detailItemLoadMaxWeightMeasurementUnitId,
			detailItemLoadMaxWeightMeasurementUnitsId,
			detailItemLoadMin,
			detailItemLoadMinWeightMeasurementUnitId,
			detailItemLoadMinWeightMeasurementUnitsId,
			detailItemThinMill,
			scope,
			validation
		} = useParachutePartComponent(props, context, options);

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
			detailItemCd,
			detailItemDiameter,
			detailItemDiameterMeasurementUnitId,
			detailItemDiameterMeasurementUnitsId,
			detailItemLoadMax,
			detailItemLoadMaxWeightMeasurementUnitId,
			detailItemLoadMaxWeightMeasurementUnitsId,
			detailItemLoadMin,
			detailItemLoadMinWeightMeasurementUnitId,
			detailItemLoadMinWeightMeasurementUnitsId,
			detailItemThinMill,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(usePartValidation), 
		LibraryCommonUtility.cloneDeep(useParachutePartValidation));
	}
};
</script>

<style scoped>
</style>
