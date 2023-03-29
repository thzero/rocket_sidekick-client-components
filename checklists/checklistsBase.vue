<script>
import { onMounted, ref} from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useChecklistBaseComponent } from '@/components/checklists/checklistBase';

export function useChecklistsBaseComponent(props, context, options) {
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
		sort,
		target,
		hasCoverUrl,
		checklistTypeIcon,
		checklistTypeIconDetermine
	} = useChecklistBaseComponent(props, context, options);

	const params = ref({});
	const checklists = ref([]);
	const title = ref(
		(props.type === AppCommonConstants.Checklists.DisplayTypes.User ? LibraryClientUtility.$trans.t('titles.checklists.yours') + ' ' : '') + LibraryClientUtility.$trans.t('titles.checklists.title')
	);

	const fetch = async () => {
		let response;
		if (props.type === AppCommonConstants.Checklists.DisplayTypes.Shared)
			response = await serviceStore.dispatcher.requestChecklists(correlationId(), params.value);
		else if (props.type === AppCommonConstants.Checklists.DisplayTypes.User)
			response = await serviceStore.dispatcher.requestChecklistsUser(correlationId(), params.value);

		if (hasFailed(response))
			return [];
		return response.results;
	}

	const checklistUrl = (item) => {
		if (!item)
			return null;
		if (props.type === AppCommonConstants.Checklists.DisplayTypes.Shared)
			return '/shared/checklist/' + item.id;
		if (props.type === AppCommonConstants.Checklists.DisplayTypes.User)
			return '/checklist/' + item.id;
		return null;
	};

	onMounted(async () => {
		checklists.value = await fetch();
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
		sort,
		target,
		hasCoverUrl,
		checklistTypeIcon,
		checklistTypeIconDetermine,
		checklists,
		title,
		checklistUrl
	};
};
</script>
