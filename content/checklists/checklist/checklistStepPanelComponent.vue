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
		const total = (props.total ?? 99) - 1;
		return (props.depth > 0) || (props.depth === 0 && props.index >= 0 && props.index < total);
	});

	const moveUp1 = computed(() => {	
		return (props.depth > 0) || (props.depth === 0 && props.index > 0);
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
