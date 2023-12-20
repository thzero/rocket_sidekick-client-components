<template>
	[[ invalid {{ invalid }} ]]
	[[ dirty {{ dirty }} ]]
	[[ isEditable {{ isEditable }} ]]
	[[ isNew {{ isNew }} ]]
	[[ canAdd {{ canAdd }} ]]
	[[ hasAdminDelete {{ hasAdminDelete }} ]]
	[[ hasAdminEdit {{ hasAdminEdit }} ]]
	[[ isDefault {{ isDefault }} ]]
	[[ isInProgress {{ isInProgress }} ]]
	[[ isShared {{ isShared }} ]]
	 <!-- [[ modelValue {{ JSON.stringify(modelValue) }}]] -->
	<!-- [[ detailItem {{ JSON.stringify(detailItem) }}]]  -->
	<!-- [[ detailItemData {{ JSON.stringify(detailItemData) }}]]  -->
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
	>
		<!-- :readonly="!isEditable" -->
		<v-row dense>
			<v-col>
				<VtTextFieldWithValidation
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
					v-if="!isEditable"
					ref="isDefaultRef"
					v-model="detailItemIsDefault"
					vid="detailItemIsDefault"
					:label="$t('forms.parts.default')"
					:readonly="true"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col>
				<VtTextAreaWithValidation
					ref="descriptionRef"
					v-model="detailItemDescription"
					vid="detailItemDescription"
					:label="$t('forms.description')"
					:counter="300"
					:validation="validation"
					:readonly="!isEditable"
					:clearable="isEditable"
					:rows="detailItemTextRows"
				/>
			</v-col>
		</v-row>
		<div
			v-show="false"
		>
			<VSwitch
				ref="reorderRef"
				v-model="detailItemReorder"
				vid="detailItemReorder"
				:validation="validation"
				:readonly="!isEditable"
			/>
		</div>
		<template v-slot:buttons_pre>
			<template
				v-if="$vuetify.display.lgAndUp"
			>
				<v-btn
					v-if="canAdd"
					:variant="buttonsForms.variant.add"
					:color="buttonsForms.color.add"
					class="mr-2"
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
				:variant="buttonsForms.variant.close"
				:color="buttonsForms.color.close"
				class="ml-2"
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
					:variant="buttonsForms.variant.add"
					:color="buttonsForms.color.add"
					@click="handleAdd"
				>
					{{ $t('buttons.add') }} {{ $t('buttons.parts.step') }}
				</v-btn>
			</div>
		</template>
	</VtFormControl>
</template>

<script>
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';

import { usePartComponent } from '@/components/content/parts/part/partComponent';
import { usePartComponentProps } from '@/components/content/parts/part/partComponentProps';

import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'PartControl',
	components: {
		VtFormControl,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		...usePartComponentProps
	},
	emits: ['cancel', 'close', 'ok'],
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
			isPublic,
			isPublicDisplay,
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
			scope,
			validation
		} = usePartComponent(props, context);

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
			isPublic,
			isPublicDisplay,
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
			scope,
			validation
		};
	},
	validations () {
		return {
			detailItemName: {
				required,
				characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
				minLength: minLength(3),
				maxLength: maxLength(50),
				$autoDirty: true
			},
			detailItemDescription: { 
				characters: helpers.withMessage('Invalid characters', helpers.regex(/^[!@#$%^&*()_\-\+=\[\]{}|\\:;"'<>,.?\/a-zA-Z0-9 (\r|\n)*$/)]*$/)),
				$autoDirty: true 
			},
			detailItemReorder: { $autoDirty: true }
		}
	}
};
</script>

<style scoped>
</style>
