<template>
	<VFormControl
		ref="checklistRef"
		:validation="validation"
		:resetForm="resetForm"
		buttonClearName="buttons.reset"
		buttonOkName="buttons.calculate"
		notifyMessageSaved="messages.calculated"
		@ok="ok"
	>
		<VTextFieldWithValidation
			ref="nameRef"
			v-model="name"
			vid="name"
			:label="$t('forms.name')"
			:counter="30"
			:validation="validation"
		/>

		<div src="./checklistFieldsTemplate.html"></div>
	</VFormControl>
</template>

<script>
import { useChecklistControlComponent } from '@/components/checklists/checklist/checklistControlComponent';
import { useChecklistFieldsComponents } from '@/components/checklists/checklist/checklistFieldsComponents';
import { useChecklistFieldsValidation } from '@/components/checklists/checklist/checklistFieldsValidation';
import { useChecklistFieldsProps } from '@/components/checklists/checklist/checklistFieldsProps';

import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
// import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'ChecklistControl',
	// components: {
	// 	VFormControl,
	// 	VTextFieldWithValidation
	// },
	components: Object.assign({
			VFormControl
		},
		useChecklistFieldsComponents
	),
	props: {
		...useChecklistFieldsProps
	},
	emits: ['close', 'ok'],
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
			name,
			ok,
			preCompleteOk,
			resetForm,
			scope,
			validation
		} = useChecklistControlComponent(props, context);

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
			name,
			ok,
			preCompleteOk,
			resetForm,
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
