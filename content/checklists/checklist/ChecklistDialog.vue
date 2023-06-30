<template>
	<VFormDialog
		:label="$t('titles.new') + ' ' + $t('characters.name')"
		:signal="signal"
		:button-ok-disabled-override="buttonOkDisabledOverride"
		:pre-complete-ok="preCompleteOk"
		:reset-additional="resetDialog"
		:validation="validation"
		max-width="70vh"
		@close="close"
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
	</VFormDialog>
</template>

<script>
import { maxLength, minLength, required } from '@vuelidate/validators';

import { useChecklistComponent } from '@/components/content/checklists/checklist/checklistComponent';
import { useChecklistDialogProps } from '@/components/content/checklists/checklist/checklistDialogProps';

import VFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VFormDialog';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'ChecklistDialog',
	components: {
		VFormDialog,
		VTextFieldWithValidation
	},
	props: {
		...useChecklistDialogProps
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
			close,
			ok,
			preCompleteOk,
			resetDialog,
			scope,
			validation
		} = useChecklistComponent(props, context);

		const buttonOkDisabledOverride = (disabled, invalid, invalidOverride) => {
			return invalid;
		};

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
			close,
			ok,
			preCompleteOk,
			resetDialog,
			scope,
			validation,
			buttonOkDisabledOverride
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
