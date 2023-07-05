<template>
	<VFormDialog
		:label="$t('titles.copy') + ' ' + $t('checklists.name')"
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
import { useChecklistCopyDialogComponent } from '@/components/content/checklists/dialogs/checklistCopyDialogComponent';
import { useChecklistCopyDialogProps } from '@/components/content/checklists/dialogs/checklistCopyDialogProps';
import { useChecklistCopyDialogValidation } from '@/components/content/checklists/dialogs/checklistCopyDialogValidation';

import VFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VFormDialog';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'ChecklistCopyDialog',
	components: {
		VFormDialog,
		VTextFieldWithValidation
	},
	props: {
		...useChecklistCopyDialogProps
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
			buttonOkDisabledOverride,
			close,
			ok,
			preCompleteOk,
			resetDialog,
			scope,
			validation
		} = useChecklistCopyDialogComponent(props, context);

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
			buttonOkDisabledOverride,
			close,
			ok,
			preCompleteOk,
			resetDialog,
			scope,
			validation
		};
	},
	validations () {
		return useChecklistCopyDialogValidation;
	}
};
</script>

<style scoped>
</style>
