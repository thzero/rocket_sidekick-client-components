<template>
	<VFormDialog
		:label="$t('titles.new') + ' ' + $t('characters.name')"
		:signal="signal"
		:pre-complete-ok="preCompleteOk"
		:resetDialog="resetDialog"
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
		/>
	</VFormDialog>
</template>

<script>
// import { helpers, minLength, requiredUnless } from '@vuelidate/validators';

// import GlobalUtility from '@thzero/library_client/utility/global';
// import LibraryUtility from '@thzero/library_common/utility';

import { useChecklistDialogComponent } from '@/components/checklists/checklistCopyDialogComponent';
import { useChecklistDialogProps } from '@/components/checklists/checklistCopyDialogProps';

import VFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VFormDialog';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'ChecklistNewDialog',
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
		} = useChecklistDialogComponent(props, context);

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
			validation
		};
	}
};
</script>

<style scoped>
</style>
