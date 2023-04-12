<script>
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';

import { useInfoBaseComponent } from '@/components/content/info/infoBase';

export function useInfoMarkupBaseComponent(props, context, options) {
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
		target,
		content,
		contentDesc,
		// contentMarkup,
		// contentTitle,
		handleAttribution
	} = useInfoBaseComponent(props, context, options);

	const contentId = computed(() => {
		return `info.${routes.params.id}`;
	});
	const contentMarkup = computed(() => {
		if (!content.value)
			return [];
		if (!content.value.markup)
			return [];
		if (Array.isArray(content.value.markup))
			return content.value.markup;

		return [ { title: null, markup: content.value.markup, author: author, license: license } ];
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
		const response = await serviceStore.dispatcher.requestContentMarkup(correlationId(), contentId.value);
		if (hasFailed(response))
			return;
		content.value = response.results;
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
		handleAttribution,
		contentId,
		contentMarkup,
		contentMarkupToc,
		contentTitle,
		hasContentMarkupToc
	};
};
</script>
