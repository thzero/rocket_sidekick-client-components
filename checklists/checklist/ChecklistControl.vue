<template>
	[[ invalid {{ invalid }} ]]
	[[ dirty {{ dirty }} ]]
	[[ isEditable {{ isEditable }} ]]
	[[ isNew {{ isNew }} ]]
	[[ canAdd {{ canAdd }} ]]
	[[ isDefault {{ isDefault }} ]]
	[[ isInProgress {{ isInProgress }} ]]
	[[ isShared {{ isShared }} ]]
	[[ detailItem {{ JSON.stringify(detailItem) }}]]
	<VFormControl
		ref="formControlRef"
		:validation="validation"
		:button-cancel="true"
		button-clear-name="buttons.reset"
		:button-delete="canDelete"
		:dirty-callback="dirtyCallback"
		:invalid-callback="invalidCallback"
		:reset-additional="resetForm"
		:pre-complete-ok="preCompleteOk"
		:readonly="!isEditable"
		@cancel="handleCancel"
		@ok="handleOk"
	>
		<!-- <ChecklistFields
			:validation="validation"
			:readonly="readonly"
		/> -->
		<v-row dense>
			<v-col>
				<VTextFieldWithValidation
					ref="nameRef"
					v-model="innerItemName"
					vid="innerItemName"
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
					v-model="innerItemIsDefault"
					:label="$t('forms.checklists.default')"
					:readonly="true"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col>
				<VTextAreaWithValidation
					ref="descriptionRef"
					v-model="innerItemDescription"
					vid="innerItemDescription"
					:label="$t('forms.description')"
					:counter="30"
					:validation="validation"
					:readonly="!isEditable"
					:clearable="isEditable"
					:rows="detailTextRows"
				/>
			</v-col>
		</v-row>

		<template v-slot:buttons_pre>
			<v-btn
				v-if="canAdd"
				class="mr-2"
				color="primary"
				@click="handleAdd"
			>
				{{ $t('buttons.add') }} {{ $t('checklists.step') }}
			</v-btn>
			<span
				v-if="canAdd"
				class="mr-2"
			>|</span>
		</template>
		<template v-slot:buttons_post>
			<v-btn
				v-if="!isEditable"
				class="ml-2"
				color="primary"
				@click="handleClose"
			>
				{{ $t('buttons.close') }}
			</v-btn>
		</template>
	</VFormControl>
</template>

<script>
import { useChecklistComponent } from '@/components/checklists/checklist/checklistComponent';
// import { useChecklistFieldsComponent } from '@/components/checklists/checklist/checklistFieldsComponents';
import { useChecklistFieldsValidation } from '@/components/checklists/checklist/checklistFieldsValidation';
import { useChecklistComponentProps } from '@/components/checklists/checklist/checklistComponentProps';

import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
// import ChecklistFields from './ChecklistFields';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'ChecklistControl',
	components: Object.assign({
			// ChecklistFields,
			VFormControl,
			VSwitchWithValidation,
			VTextAreaWithValidation,
			VTextFieldWithValidation
		},
		// useChecklistFieldsComponent
	),
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
			innerItem,
			innerItemOrig,
			invalid,
			canDelete,
			detailTextRows,
			isEditable,
			isNew,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			resetForm,
			innerItemDescription,
			innerItemIsDefault,
			innerItemName,
			canAdd,
			isDefault,
			isInProgress,
			isShared,
			handleAdd,
			preCompleteOk,
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
			innerItem,
			innerItemOrig,
			invalid,
			canDelete,
			detailTextRows,
			isEditable,
			isNew,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			resetForm,
			innerItemDescription,
			innerItemIsDefault,
			innerItemName,
			canAdd,
			isDefault,
			isInProgress,
			isShared,
			handleAdd,
			preCompleteOk,
			scope,
			validation
		};
	},
	validations () {
		return useChecklistFieldsValidation;
	}
};
</script>

<style scoped>
</style>
