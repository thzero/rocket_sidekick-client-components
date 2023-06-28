<template>
	[[ invalid {{ invalid }} ]]
	[[ dirty {{ dirty }} ]]
	[[ isEditable {{ isEditable }} ]]
	[[ isNew {{ isNew }} ]]
	[[ canAdd {{ canAdd }} ]]
	[[ isDefault {{ isDefault }} ]]
	[[ isInProgress {{ isInProgress }} ]]
	[[ isShared {{ isShared }} ]]
	 <!-- [[ modelValue {{ JSON.stringify(modelValue) }}]] -->
	<!-- [[ detailItem {{ JSON.stringify(detailItem) }}]]  -->
	<!-- [[ detailItemData {{ JSON.stringify(detailItemData) }}]]  -->
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
					ref="isDefaultRef"
					v-if="!isEditable"
					v-model="detailItemIsDefault"
					:label="$t('forms.checklists.default')"
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
					{{ $t('buttons.add') }} {{ $t('buttons.checklists.step') }}
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
					{{ $t('buttons.add') }} {{ $t('buttons.checklists.step') }}
				</v-btn>
			</div>
		</template>
		<template v-slot:after>	
		<v-row
			dense 
			class="mt-4"
		>
			<v-col>
				<ChecklistSteps
					:item="detailItemData"
					:readonly="!isEditable"
					:update="updateDataModel"
				>
				</ChecklistSteps>
			</v-col>
		</v-row>
	</template>
	</VFormControl>
</template>

<script>
import { maxLength, minLength, required } from '@vuelidate/validators';

import { useChecklistComponent } from '@/components/checklists/checklist/checklistComponent';
import { useChecklistComponentProps } from '@/components/checklists/checklist/checklistComponentProps';

import ChecklistSteps from '@/components/checklists/checklist/ChecklistSteps';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'ChecklistControl',
	components: {
		ChecklistSteps,
		VFormControl,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
	},
	props: {
		...useChecklistComponentProps
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
			detailItemDescription,
			detailItemIsDefault,
			detailItemName,
			canAdd,
			isDefault,
			isInProgress,
			isShared,
			steps,
			handleAdd,
			preCompleteOk,
			updateDataModel,
			scope,
			validation
		} = useChecklistComponent(props, context);

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
			detailItemDescription,
			detailItemIsDefault,
			detailItemName,
			canAdd,
			isDefault,
			isInProgress,
			isShared,
			steps,
			handleAdd,
			preCompleteOk,
			updateDataModel,
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
		}
	}
};
</script>

<style scoped>
</style>
