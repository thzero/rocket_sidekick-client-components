<template>
	<VTextFieldWithValidation
		ref="nameRef"
		v-model="name"
		vid="name"
		:label="$t('forms.name')"
		:counter="30"
		:validation="validation"
	/>
</template>

<script>
import { maxLength, minLength, required } from '@vuelidate/validators';

import { useChecklistFieldsComponent } from '@/components/checklists/checklist/checklistFieldsComponent';
import { useChecklistFieldsProps } from '@/components/checklists/checklist/checklistFieldsProps';

import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'ChecklistFields',
	components: {
		VTextFieldWithValidation
	},
	props: {
		...useChecklistFieldsProps
	},
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
			nameRef,
			scope,
			validation
		} = useChecklistFieldsComponent(props, context);

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
			nameRef,
			scope,
			validation
		};
	},
	validations () {
		return {
			name: {
				required,
				minLength: minLength(3),
				maxLength: maxLength(50),
				$autoDirty: true
			}
		};
	}
};
</script>

<style scoped>
</style>
