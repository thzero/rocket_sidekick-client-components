<template>
    <VtSelectWithValidation
        ref="innerValueRef"
        vid="innerValue"
		v-model="innerValue"
		:items="measurementUnitsOptions"
		:label="$attrs.label"
        :validation="validation"
		:readonly="readonly"
		:vidOverride="vid"
		@update:modelValue="innerValueUpdate"
    />
</template>

<script>
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';

import { useMeasurementUnitsSelectBaseComponent } from '@/components/content/measurementUnitsSelectBase';
import { useMeasurementUnitsSelectBaseProps } from '@/components/content/measurementUnitsSelectBaseProps';

export default {
	name: 'MeasurementUnitsSelect',
	components: {
		VtSelectWithValidation
	},
    props: {
		...useMeasurementUnitsSelectBaseProps
    },
	setup(props, context) {
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
			serviceStore,
			contentLoadStart,
			contentLoadStop,
			sortByOrder,
			target,
			successResponse,
			isSaving,
			serverErrors,
			setErrors,
			convertValue,
			errorI,
			errorsI,
			innerValue,
			innerValueUpdate,
			initValue,
			measurementUnitsOptions
		} = useMeasurementUnitsSelectBaseComponent(props, context);

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
			serviceStore,
			contentLoadStart,
			contentLoadStop,
			sortByOrder,
			target,
			successResponse,
			isSaving,
			serverErrors,
			setErrors,
			convertValue,
			errorI,
			errorsI,
			innerValue,
			innerValueUpdate,
			initValue,
			measurementUnitsOptions
		};
	}
};
</script>

<style scoped>
</style>
