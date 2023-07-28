<script>
import { computed } from 'vue';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useRocketStageComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success
	} = useBaseComponent(props, context, options);

	const displayItem = computed(() => {
		return props.item ? props.item : {};
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
		displayItem
	};
};
</script>
