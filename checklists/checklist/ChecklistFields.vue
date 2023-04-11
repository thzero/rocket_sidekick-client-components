<template>
	<v-row dense>
		<v-col>
			<VTextFieldWithValidation
				ref="nameRef"
				v-model="name"
				vid="name"
				:label="$t('forms.name')"
				:counter="30"
				:validation="validation"
				:readonly="readonly"
			/>
		</v-col>
		<v-col cols="3">
			<VSwitchWithValidation
				ref="isDefaultRef"
				v-model="isDefault"
				vid="isDefault"
				:label="$t('forms.description')"
				:validation="validation"
				:readonly="readonly"
			/>
		</v-col>
	</v-row>
	<VTextAreaWithValidation
		ref="descriptionRef"
		v-model="description"
		vid="description"
		:label="$t('forms.description')"
		:counter="30"
		:validation="validation"
		:readonly="readonly"
		:rows="displayRows"
	/>
</template>

<script>
import { maxLength, minLength, required } from '@vuelidate/validators';

import { useChecklistFieldsComponent } from '@/components/checklists/checklist/checklistFieldsComponent';
import { useChecklistFieldsProps } from '@/components/checklists/checklist/checklistFieldsProps';

import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'ChecklistFields',
	components: {
		VSwitchWithValidation,
		VTextAreaWithValidation,
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
			displayRows,
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
			displayRows,
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
