<script>
import { computed, onMounted } from 'vue';

import { useContentLoadSignalComponent } from '@/components/content/contentLoadSignal';
import { useInfoBaseComponent } from '@/components/content/info/infoBase';

export function useInfoMarkupBaseComponent(props, context, options) {

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
		content,
		contentDesc,
		// contentMarkup,
		// contentTitle,
		contentId,
		handleAttribution
	} = useInfoBaseComponent(props, context, options);
	
	const {
		contentLoadSignal,
		contentLoadStart,
		contentLoadStop,
	} = useContentLoadSignalComponent(props, context, options);

	const contentMarkup = computed(() => {
		if (!content.value)
			return [];
		if (!content.value.markup)
			return [];
		if (Array.isArray(content.value.markup))
			return content.value.markup;

		return [ { title: null, markup: content.value.markup, author: content.value.author, license: content.value.license } ];
	});
	const contentMarkupToc = computed(() => {
		if (!contentMarkup.value)
			return [];
		const results = [];
		for(const item of contentMarkup.value) {
			if (!String.isNullOrEmpty(item.title) && !String.isNullOrEmpty(item.tag))
				results.push({ title: item.title, tag: item.tag });
		}
		return results;
	});
	const contentTitle = computed(() => {
		if (!content.value)
			return '';
		return content.value.title;
	});
	const hasContentMarkupToc = computed(() => {
		if (!contentMarkupToc.value)
			return false;
		return contentMarkupToc.value.length > 1;
	});

	onMounted(async () => {
		try {
			contentLoadStart();

			const correlationIdI = correlationId();

			const response = await serviceStore.dispatcher.requestContentMarkup(correlationIdI, contentId.value);
			if (hasFailed(response))
				return;

			content.value = response.results;
		}
		finally {
			contentLoadStop();
		}
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
		contentId,
		handleAttribution,
		contentLoadSignal,
		contentMarkup,
		contentMarkupToc,
		contentTitle,
		hasContentMarkupToc
	};
};
</script>
