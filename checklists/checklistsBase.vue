<script>
import { onMounted, ref} from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

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
		checklistTypeIcon,
		checklistTypeIconDetermine
	} = useChecklistBaseComponent(props, context, options);

	const checklists = ref([]);
	const dialogCopy = ref(new DialogSupport());
	const dialogCopyParams = ref(null);
	const dialogCopyRef = ref(null);
	const params = ref({});
	const title = ref(
		(props.type === AppCommonConstants.Checklists.DisplayTypes.User ? LibraryClientUtility.$trans.t('titles.checklists.yours') + ' ' : '') + LibraryClientUtility.$trans.t('titles.checklists.title')
	);

	const canCopy = (item) => {
		return item && item.isDefault || !isInProgress(item);
	};
	const canDelete = (item) => {
		return item && !item.isDefault && !isInProgress(item);
	};
	const canStart = (item) => {
		return item && !item.isDefault && !isInProgress(item) && !isCompleted(item);
	};
	const checklistUrl = (item) => {
		if (!item)
			return null;
		if (props.type === AppCommonConstants.Checklists.DisplayTypes.Site)
			return '/checklist/' + item.id;
		if (props.type === AppCommonConstants.Checklists.DisplayTypes.Personal)
			return '/user/checklist/' + item.id;
		return null;
	};
	const dialogCopyClose = async (item) => {
		dialogCopy.value.cancel();
	};
	const dialogCopyOk = async (item) => {
		dialogCopy.value.ok();
	};
	const dialogCopyOpen = (item) => {
		if (!item)
			return;
		if (!canCopy(item))
			return;

		dialogCopyParams.value = { id: item.id, name: item.name };
		dialogCopy.value.open();
	};
	const fetch = async () => {
		let response;
		if (props.type === AppCommonConstants.Checklists.DisplayTypes.Site)
			response = await serviceStore.dispatcher.requestChecklists(correlationId(), params.value);
		else if (props.type === AppCommonConstants.Checklists.DisplayTypes.User)
			response = await serviceStore.dispatcher.requestChecklistsUser(correlationId(), params.value);

		if (hasFailed(response))
			return [];
		return response.results;
	};
	const isCompleted = (item) => {
		return item && item.completed;
	};
	const isDefault = (item) => {
		return item && item.isDefault;
	};
	const isInProgress = (item) => {
		return item && item.type === AppCommonConstants.Checklists.ChecklistStatus.inProgress;
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
		checklistTypeIcon,
		checklistTypeIconDetermine,
		checklists,
		dialogCopy,
		dialogCopyRef,
		title,
		canCopy,
		canDelete,
		canStart,
		checklistUrl,
		dialogCopyClose,
		dialogCopyParams,
		dialogCopyOk,
		dialogCopyOpen,
		isCompleted,
		isDefault,
		isInProgress
	};
};
</script>
