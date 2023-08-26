<template>
	<VFormDialog
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

import { useRocketSetupDialogComponent } from '@/components/content/rockets/setups/dialogs/rocketSetupCopyDialogComponent';
import { useRocketSetupCopyDialogProps } from '@/components/content/rockets/setups/dialogs/rocketSetupCopyDialogProps';
import { useRocketSetupCopyDialogValidation } from '@/components/content/rockets/setups/dialogs/rocketSetupCopyDialogValidation';

import VFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VFormDialog';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'RocketSetupDialog',
	components: {
		VFormDialog,
		VTextFieldWithValidation
	},
	props: {
		...useRocketSetupCopyDialogProps
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
		} = useRocketSetupDialogComponent(props, context);

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
		return useRocketSetupCopyDialogValidation;
	}
};
</script>

<style scoped>
</style>
