<script>
import { onMounted, ref} from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useChecklistBaseComponent } from '@/components/checklists/checklistBase';
import { useNotify } from '@thzero/library_client_vue3/components/notify';

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

	const {
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify
	} = useNotify(props, context, options);

	const checklists = ref([]);
	const dialogCopyManager = ref(new DialogSupport());
	const dialogCopyParams = ref(null);
	const dialogCopyRef = ref(null);
	const dialogDeleteManager = ref(new DialogSupport());
	const dialogDeleteMessage = ref(LibraryClientUtility.$trans.t('messages.checklists.delete_confirm'));
	const dialogDeleteParams = ref(null);
	const dialogStartManager = ref(new DialogSupport());
	const dialogStartMessage = ref(LibraryClientUtility.$trans.t('messages.checklists.start_confirm'));
	const dialogStartParams = ref(null);
	const params = ref({});
	const title = ref(
		(props.type === AppCommonConstants.Checklists.DisplayTypes.User ? LibraryClientUtility.$trans.t('titles.checklists.yours') + ' ' : '') + LibraryClientUtility.$trans.t('titles.checklists.title')
	);

	const canCopy = (item) => {
		return item && isDefault(item) || isShared(item) || !isInProgress(item);
	};
	const canDelete = (item) => {
		return item && !isDefault(item) && !isShared(item) && !isInProgress(item);
	};
	const canEdit = (item) => {
		return item && !isDefault(item) && !isShared(item) && !isInProgress(item) && !isCompleted(item);
	};
	const canStart = (item) => {
		return item && !isDefault(item) && !isShared(item) && !isInProgress(item) && !isCompleted(item);
	};
	const canView = (item) => {
		return item && isDefault(item) || isShared(item);
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
		dialogCopyManager.value.cancel();
	};
	const dialogCopyOk = async (item) => {
		dialogCopyManager.value.ok();
	};
	const dialogCopyOpen = (item) => {
		if (!item)
			return;
		// if (!canCopy(item))
		// 	return;

		dialogCopyParams.value = { id: item.id, name: item.name };
		dialogCopyManager.value.open();
	};
	const dialogDeleteClose = async (item) => {
		dialogDeleteManager.value.cancel();
	};
	const dialogDeleteOk = async (item) => {
		dialogDeleteManager.value.ok();

		if (!dialogDeleteParams.value || !dialogDeleteParams.value.id)
			return;

		// const response = await serviceStore.dispatcher.deleteChecklist(correlationId(), dialogDeleteParams.value.id);
		alert('delete');
	};
	const dialogDeleteOpen = (item) => {
		if (!item)
			return;
		if (!canDelete(item))
			return;

		dialogDeleteParams.value = { id: item.id };
		dialogDeleteManager.value.open();
	};
	const dialogStartClose = async (item) => {
		dialogStartManager.value.cancel();
	};
	const dialogStartOk = async (item) => {
		dialogStartManager.value.ok();

		if (!dialogStartParams.value || !dialogStartParams.value.id)
			return;

		// const response = await serviceStore.dispatcher.startChecklist(correlationId(), dialogDeleteParams.value.id);
		// TODO
		alert('start');
	};
	const dialogStartOpen = (item) => {
		if (!item)
			return;
		if (!canStart(item))
			return;

		dialogStartParams.value = { id: item.id };
		dialogStartManager.value.open();
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
	const handleEdit = (item) => {
	};
	const handleView = (item) => {
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
	const isShared = (item) => {
		return item && item.isShared;
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
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify,
		checklists,
		dialogCopyManager,
		dialogCopyRef,
		dialogDeleteManager,
		dialogDeleteMessage,
		dialogStartManager,
		dialogStartMessage,
		title,
		canCopy,
		canDelete,
		canEdit,
		canStart,
		canView,
		checklistUrl,
		dialogCopyClose,
		dialogCopyParams,
		dialogCopyOk,
		dialogCopyOpen,
		dialogDeleteClose,
		dialogDeleteParams,
		dialogDeleteOk,
		dialogDeleteOpen,
		dialogStartClose,
		dialogStartParams,
		dialogStartOk,
		dialogStartOpen,
		handleEdit,
		handleView,
		isCompleted,
		isDefault,
		isInProgress,
		isShared
	};
};
</script>
