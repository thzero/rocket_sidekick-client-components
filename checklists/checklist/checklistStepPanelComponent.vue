<script>
import { computed } from 'vue';

import { useBaseEditComponent } from '@thzero/library_client_vue3/components/baseEdit';

export function useChecklistStepPanelComponent(props, context, options) {
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
		setErrors
	} = useBaseEditComponent(props, context, {
	});

	const moveDown1 = computed(() => {
		return (props.moveDown && props.parent !== null && props.parent.steps && props.parent.steps.length > 1);
	});

	const moveUp1 = computed(() => {	
		return props.moveUp;
	});
	
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
		moveDown1,
		moveUp1
	};
};
</script>
