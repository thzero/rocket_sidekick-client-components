<script>
import { ref } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useContentMarkupComponent(props, context, options) {
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

	const markupHelpLink = '<a target=\"_blank\" href=\"https://gist.github.com/ChrisTollefson/a3af6d902a74a0afd1c2d79aadc9bb3f#file-1_markup-md\">Github Markdown</a>';
	const markupHint = ref(LibraryClientUtility.$trans.t('forms.content.launches.notes_hint', { link: markupHelpLink }));

	return {
		markupHint
	};
};
</script>
