<template>
	<VtFormDialog
		:label="$t('titles.copy') + ' ' + $t('forms.name')"
		:signal="signal"
		:button-ok-disabled-override="buttonOkDisabledOverride"
		:pre-complete-ok="preCompleteOk"
		:reset-additional="resetAdditional"
		:validation="validation"
		max-width="70vh"
		@close="dialogClose"
		@error="dialogError"
		@ok="dialogOk"
	>
		<VtTextFieldWithValidation
			ref="nameRef"
			v-model="name"
			vid="name"
			:label="$t('forms.name')"
			:maxcount="30"
			:validation="validation"
		/>
	</VtFormDialog>
</template>

<script>
// import { maxLength, minLength, required } from '@vuelidate/validators';

import { usePartCopyDialogComponent } from '@/components/content/parts/dialogs/partCopyDialogComponent';
import { usePartCopyDialogProps } from '@/components/content/parts/dialogs/partCopyDialogProps';
import { usePartCopyDialogValidation } from '@/components/content/parts/dialogs/partCopyDialogValidation';

import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'PartCopyDialog',
	components: {
		VtFormDialog,
		VtTextFieldWithValidation
	},
	props: {
		...usePartCopyDialogProps
	},
	emits: ['close', 'error', 'ok'],
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
			dialogClose,
			dialogError,
			dialogOk,
			preCompleteOk,
			resetAdditional,
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
			dialogClose,
			dialogError,
			dialogOk,
			preCompleteOk,
			resetAdditional,
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
