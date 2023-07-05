<template>
	<VFormDialog
		:label="$t('titles.copy') + ' ' + $t('parts.name')"
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
// import { maxLength, minLength, required } from '@vuelidate/validators';

import { usePartCopyDialogComponent } from '@/components/content/parts/dialogs/partCopyDialogComponent';
import { usePartCopyDialogProps } from '@/components/content/parts/dialogs/partCopyDialogProps';
import { usePartCopyDialogValidation } from '@/components/content/parts/dialogs/partCopyDialogValidation';

import VFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VFormDialog';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'PartCopyDialog',
	components: {
		VFormDialog,
		VTextFieldWithValidation
	},
	props: {
		...usePartCopyDialogProps
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
		} = usePartCopyDialogComponent(props, context);

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
		return usePartCopyDialogValidation;
	}
};
</script>

<style scoped>
</style>
