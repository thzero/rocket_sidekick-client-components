<script>
import { ref } from 'vue';

import AppSharedConstants from '@/utility/constants';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useInfoBaseComponent(props, context, options) {
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
		target
	} = useContentBaseComponent(props, context, options);

	const content = ref(null);
	const contentDesc = ref(null);
	const contentDefinition = ref(null);
	const contentMarkup = ref(null);
	const contentTitle = ref(null);
	const hasAttribution = ref(false);

	const handleAttribution = (e) => {
		hasAttribution.value = e;
	};
	const slideUrl = (url) => {
		return AppSharedConstants.External.images + url;
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
		serviceStore,
		sortByOrder,
		target,
		content,
		contentDesc,
		contentDefinition,
		contentMarkup,
		contentTitle,
		handleAttribution,
		hasAttribution,
		slideUrl
	};
};
</script>
