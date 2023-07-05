<template>
	[[ invalid {{ invalid }} ]]
	[[ dirty {{ dirty }} ]]
	[[ isEditable {{ isEditable }} ]]
	[[ isNew {{ isNew }} ]]
	[[ canAdd {{ canAdd }} ]]
	[[ isPublic {{ isPublic }} ]]
	 <!-- [[ modelValue {{ JSON.stringify(modelValue) }}]] -->
	<!-- [[ detailItem {{ JSON.stringify(detailItem) }}]]  -->
	<!-- [[ detailItemData {{ JSON.stringify(detailItemData) }}]]  -->
	[[ {{  manufacturers }}]]
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
		:reset-additional="resetForm"
		:pre-complete-ok="preCompleteOk"
		@cancel="handleCancel"
		@ok="handleOk"
	>
		<!-- :readonly="!isEditable" -->
		<v-row dense>
			<v-col>
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
			<v-col cols="3">
				<VSwitch
					ref="isPublicRef"
					v-if="!isEditable"
					v-model="detailItemIsPublic"
					:label="$t('forms.parts.public')"
					:readonly="true"
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
			<v-col cols="4" lg="6">
				<VNumberFieldWithValidation
					ref="diameterRef"
					vid="diameter"
					v-model="diameter"
					:validation="validation"
					:label="$t('forms.content.parts.parachute.diameter')"
				/>
			</v-col>
			<v-col cols="8" lg="6">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="diameterLengthMeasurementUnitsIdRef"
								vid="diameterLengthMeasurementUnitsId"
								v-model="diameterLengthMeasurementUnitsId"
								:validation="validation"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="diameterLengthMeasurementUnitIdRef"
								vid="diameterLengthMeasurementUnitId"
								v-model="diameterLengthMeasurementUnitId"
								:measurementUnitsId="diameterLengthMeasurementUnitsId"
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
			<v-col cols="12" lg="6">
				<VSelectWithValidation
					ref="manufacturerRef"
					v-model="manufacturer"
					vid="manufacturer"
					:items="manufacturers"
					:validation="validation"
					:label="$t('forms.external.motorSearch.manufacturer')"
					:hint="$t('forms.external.motorSearch.manufacturer_hint')"
				/>
			</v-col>
		</v-row>
		<template v-slot:buttons_pre>
			<template
				v-if="$vuetify.display.lgAndUp"
			>
				<v-btn
					v-if="canAdd"
					class="mr-2"
					color="primary"
					@click="handleAdd"
				>
					{{ $t('buttons.add') }} {{ $t('buttons.parts.step') }}
				</v-btn>
				<span
					v-if="canAdd"
					class="mr-2"
				>|</span>
			</template>
		</template>
		<template v-slot:buttons_post>
			<!-- <v-btn
				v-if="!isEditable"
				class="ml-2"
				color="primary"
				@click="handleClose"
			>
				{{ $t('buttons.close') }}
			</v-btn> -->
			<div 
				v-if="$vuetify.display.mdAndDown"
				class="mt-2"
			>
				<v-btn
					v-if="canAdd"
					color="primary"
					@click="handleAdd"
				>
					{{ $t('buttons.add') }} {{ $t('buttons.parts.step') }}
				</v-btn>
			</div>
		</template>
	</VFormControl>
</template>

<script>
import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

import { usePartParachuteComponent } from '@/components/content/parts/part/partParachuteComponent';
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
		...usePartComponentProps
	},
	emits: ['cancel', 'close', 'ok'],
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
			resetForm,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsLengthDefaultId,
			measurementUnitslengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			detailItemDescription,
			detailItemIsPublic,
			detailItemName,
			manufacturer,
			manufacturers,
			canAdd,
			isPublic,
			handleAdd,
			preCompleteOk,
			requestManufacturers,
			diameter,
			diameterLengthMeasurementUnitId,
			diameterLengthMeasurementUnitsId,
			scope,
			validation
		} = usePartParachuteComponent(props, context, options);

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
			resetForm,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsLengthDefaultId,
			measurementUnitslengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			detailItemDescription,
			detailItemIsPublic,
			detailItemName,
			manufacturer,
			manufacturers,
			canAdd,
			isPublic,
			handleAdd,
			preCompleteOk,
			requestManufacturers,
			diameter,
			diameterLengthMeasurementUnitId,
			diameterLengthMeasurementUnitsId,
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
			diameter: { required, $autoDirty: true },
			diameter: { required, decimal, between: between(0, 2004), $autoDirty: true },
			manufacturer: { required, $autoDirty: true }
		}
	}
};
</script>

<style scoped>
</style>
