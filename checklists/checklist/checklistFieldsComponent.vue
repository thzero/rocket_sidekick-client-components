<script>
import { ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useChecklistFieldsComponent(props, context, options) {
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

	const name = ref(null);
	const nameRef = ref(null);

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
		nameRef,
		scope: 'ChecklistCopyDialog',
		validation: useVuelidate({ $scope: 'ChecklistCopyDialog' })
	};
};
</script>
