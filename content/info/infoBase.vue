<script>
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';

import AppSharedConstants from '@/utility/constants';

import AppUtility from '@/utility/app';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useInfoBaseComponent(props, context, options) {
	const routes = useRoute();

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

	const contentId = computed(() => {
		if (routes.params.id) {
			return `info.${routes.params.id}`;
		}

		const splits = routes.path.split('/');
		if (splits.length > 3) {
			return `info.${splits[3]}`;
		}

		return null;
	});

	const handleAttribution = (e) => {
		hasAttribution.value = e;
	};
	const slideUrl = (url) => {
		return AppSharedConstants.External.images + url;
	};

	onMounted(async () => {
		AppUtility.usageMetricsMeasurementTag(correlationId(), contentId.value);
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
		serviceStore,
		sortByOrder,
		target,
		content,
		contentDesc,
		contentDefinition,
		contentMarkup,
		contentTitle,
		contentId,
		handleAttribution,
		hasAttribution,
		slideUrl
	};
};
</script>
