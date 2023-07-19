<template>
    <v-col cols="6" sm="6">
        <v-radio-group
            v-model="innerValue"
            inline
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
    </v-col>
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
			hideDetails,
			innerValue,
			innerValueUpdate,
			initValue
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
			hideDetails,
			innerValue,
			innerValueUpdate,
			initValue
		};
	}
};
</script>
