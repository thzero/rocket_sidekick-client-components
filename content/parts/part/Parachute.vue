<template>
	[[ debug {{ debug }}]]
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
					:label="$t('forms.content.parts.public')"
					:readonly="!hasAdmin"
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
					:counter="30"
					:validation="validation"
					:readonly="!isEditable"
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
					v-model="detailItemDiameter"
					:validation="validation"
					:label="$t('forms.content.parts.parachute.diameter')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="diameterMeasurementUnitsIdRef"
								vid="diameterMeasurementUnitsId"
								v-model="diameterMeasurementUnitsId"
								:validation="validation"
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
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemWeightRef"
					vid="detailItemWeight"
					v-model="detailItemWeight"
					:validation="validation"
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
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="weightMeasurementUnitIdRef"
								vid="weightMeasurementUnitId"
								v-model="weightMeasurementUnitId"
								:measurementUnitsId="weightMeasurementUnitsId"
								:measurementUnitsType="measurementUnitslengthType"
								:validation="validation"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<VSelectWithValidation
					ref="manufacturerRef"
					v-model="detailItemManufacturer"
					vid="detailItemManufacturer"
					:items="manufacturers"
					:validation="validation"
					:label="$t('forms.external.motorSearch.manufacturer')"
					:hint="$t('forms.external.motorSearch.manufacturer_hint')"
				/>
			</v-col>
			<v-col cols="6" md="3">
				<VNumberFieldWithValidation
					ref="detailItemCdRef"
					vid="detailItemCd"
					v-model="detailItemCd"
					:validation="validation"
					:label="$t('forms.content.parts.parachute.cd')"
				/>
			</v-col>
			<v-col cols="6" md="3">
				<VSwitchWithValidation
					class="ml-2 mr-2"
					ref="detailItemThinMillRef"
					v-model="detailItemThinMill"
					vid="detailItemThinMill"
					:validation="validation"
					:label="$t('forms.content.parts.parachute.thinMill')"
				/>
			</v-col>
		</v-row>
	</VFormControl>
</template>

<script>
import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

import { useDetailComponentProps } from '@/components/content/detailComponentProps';
import { useParachutePartComponent } from '@/components/content/parts/part/parachutePartComponent';
import { usePartComponentProps } from '@/components/content/parts/part/partComponentProps';

import MeasurementUnitSelect from '@/components/content/tools/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/tools/MeasurementUnitsSelect';
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
			detailItemDescription,
			detailItemIsPublic,
			detailItemManufacturer,
			detailItemName,
			manufacturers,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			canAdd,
			hasAdmin,
			isPublic,
			handleAdd,
			requestManufacturers,
			detailItemCd,
			detailItemDiameter,
			detailItemThinMill,
			detailItemWeight,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
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
			detailItemDescription,
			detailItemIsPublic,
			detailItemManufacturer,
			detailItemName,
			manufacturers,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			canAdd,
			hasAdmin,
			isPublic,
			handleAdd,
			requestManufacturers,
			detailItemCd,
			detailItemDiameter,
			detailItemThinMill,
			detailItemWeight,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			scope,
			validation
		};
	},
	validations () {
		return {
			detailItemName: {
				required,
				minLength: minLength(3),
				maxLength: maxLength(50),
				$autoDirty: true
			},
			detailItemDescription: { $autoDirty: true },
			detailItemReorder: { $autoDirty: true },
			detailItemIsPublic: { $autoDirty: true },
			detailItemCd: { decimal, between: between(0, 9), $autoDirty: true },
			detailItemDiameter: { required, decimal, between: between(0, 2004), $autoDirty: true },
			detailItemManufacturer: { required, $autoDirty: true },
			detailItemThinMill: { $autoDirty: true },
			detailItemWeight: { required, decimal, between: between(0, 2004), $autoDirty: true },
		}
	}
};
</script>

<style scoped>
</style>
