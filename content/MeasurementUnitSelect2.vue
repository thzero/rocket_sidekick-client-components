<template>
    <VSelectWithValidation
		ref="measurementUnitIdRef"
		vid="innerValue"
		v-model="innerValue"
		:items="measurementUnits"
		:label="$attrs.label"
        :validation="validation"
		:readonly="readonly"
		:vidOverride="vid"
		@update:modelValue="innerValueUpdate"
    />
</template>

<script>
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';

import { useMeasurementUnitSelectBaseComponent } from '@/components/content/measurementUnitSelectBase2';
import { useMeasurementUnitSelectBaseProps } from '@/components/content/measurementUnitSelectBaseProps2';

export default {
	name: 'MeasurementUnitSelect',
	components: {
		VSelectWithValidation
	},
    props: {
		...useMeasurementUnitSelectBaseProps
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
			sortByOrder,
			target,
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
			initValue,
			measurementUnits,
			measurementUnitTrans
		} = useMeasurementUnitSelectBaseComponent(props, context);

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
			sortByOrder,
			target,
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
			initValue,
			measurementUnits,
			measurementUnitTrans
		};
	}
};
</script>

<style scoped>
</style>
