<template>
	<v-radio-group
		v-model="innerValue"
		inline
		:hide-details="true"
		@update:modelValue="innerValueUpdate"
	>
		<v-radio
			:label="$t('forms.content.parts.all')"
			:value="1"
		></v-radio>
		<v-radio
			:label="$t('forms.content.parts.yours')"
			:value="2"
		></v-radio>
		<v-radio
			:label="$t('forms.content.parts.public')"
			:value="3"
		></v-radio>
	</v-radio-group>
</template>

<script>
import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';

export default {
	name: 'PartsPublicComponent',
	props: {
		...useBaseControlEditProps,
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
			successResponse,
			isSaving,
			serverErrors,
			setErrors,
			convertValue,
			errorI,
			errorsI,
			innerValue,
			initValue,
			innerValueUpdate
		} = useBaseControlEditComponent(props, context);

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
			convertValue,
			errorI,
			errorsI,
			innerValue,
			initValue,
			innerValueUpdate
		};
	}
};
</script>
