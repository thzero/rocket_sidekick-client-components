<script>
import { computed } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useToolsFormattingComponent(props, context, options) {
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

	const dateFormat = computed(() => {
		return LibraryClientUtility.dateFormat();
	});
	const dateFormatMask = computed(() => {
		return LibraryClientUtility.dateFormat().replace(/[a-zA-Z0-9]/g, '#');
	});

	const formatNumber = (value) => {
		return value?.toLocaleString();
	};
	const toFixed = (value) => {
		if (!value)
			return '';

		if (LibraryCommonUtility.isString(value))
			return value.toFixed(2);
		
		return value;
	};

	return {
		dateFormat,
		dateFormatMask,
		formatNumber,
		toFixed
	};
};
</script>
