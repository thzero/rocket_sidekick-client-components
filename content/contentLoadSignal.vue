<script>
import { ref } from 'vue';

import AppSharedConstants from '@/utility/constants';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useContentLoadSignalComponent(props, context, options) {
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

	const contentLoadSignal = ref(true);

	let timeout = null;

	const contentLoadStart = () => {
		contentLoadSignal.value = true;
		
		timeout = setTimeout(function () {
				contentLoadSignal.value = false;
				clearTimeout(timeout);
			}, AppSharedConstants.Overlay.Timeout);
	};
	
	const contentLoadStop = () => {
		contentLoadSignal.value = false;
		clearTimeout(timeout);
	};

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
		contentLoadSignal,
		contentLoadStart,
		contentLoadStop
	};
};
</script>
