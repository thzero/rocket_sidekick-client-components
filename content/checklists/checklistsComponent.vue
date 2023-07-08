<script>
import { ref} from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useMasterDetailComponent } from '@/components/content/masterDetailComponent';

import ChecklistData from 'rocket_sidekick_common/data/checklists/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

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
		contentLoadSignal,
		serviceStore,
		sort,
		target,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify,
		dialogCopyManager,
		dialogCopyRef,
		dialogDeleteManager,
		dialogDeleteMessage,
		detailItem,
		items,
		colsEditPanel,
		colsSearchResults,
		displayEditPanel,
		displaySearchResults,
		showDetailItem,
		showList,
		canCopy,
		canDelete,
		canEdit,
		canView,
		detailClose,
		detailOk,
		dialogCopyCancel,
		dialogCopyError,
		dialogCopyOk,
		dialogCopyOpen,
		dialogCopyParams,
		dialogDeleteCancel,
		dialogDeleteError,
		dialogDeleteOk,
		dialogDeleteOpen,
		dialogDeleteParams,
		handleAdd,
		handleEdit,
		handleView,
		initEdit,
		initNew,
		initView,
		isCopying,
		isDeleting,
		display
	} = useMasterDetailComponent(props, context, Object.assign(options ? options : {}, {
			dialogDeleteMessage : 'checklists',
			canCopy: (correlationId, item) => { return canCopyI(correlationId, item); },
			canDelete: (correlationId, item) => { return canDeleteI(correlationId, item); },
			canEdit: (correlationId, item) => { return canEditI(correlationId, item); },
			canView: (correlationId, item) => { return canViewI(correlationId, item); },
			fetch: async (correlationId) => { return await fetchI(correlationId); },
			fetchItem: (correlationId, id) => { return fetchItemI(correlationId, id); },
			initNew: (correlationId, data) => { return initNewI(correlationId, data); }
		})
	);

	const dialogStartManager = ref(new DialogSupport());
	const dialogStartMessage = ref(LibraryClientUtility.$trans.t('messages.checklists.start_confirm'));
	const dialogStartParams = ref(null);
	const params = ref({});
	const title = ref(
		(props.type === AppCommonConstants.Checklists.DisplayTypes.User ? LibraryClientUtility.$trans.t('titles.content.yours') + ' ' : '') + LibraryClientUtility.$trans.t('titles.content.checklists.title')
	);

	const canCopyI = (correlationId, item) => {
		return item && isDefault(item) || isShared(item) || !isInProgress(item);
	};
	const canDeleteI = (correlationId, item) => {
		return item && !isDefault(item) && !isShared(item) && !isInProgress(item);
	};
	const canEditI = (correlationId, item) => {
		return item && !isDefault(item) && !isShared(item) && !isInProgress(item) && !isCompleted(item);
	};
	const canStart = (item) => {
		return item && !isDefault(item) && !isShared(item) && !isInProgress(item) && !isCompleted(item);
	};
	const canViewI = (correlationId, item) => {
		return item && isDefault(item) || isShared(item);
	};
	const checklistTypeIcon = (item) => {
		const icon = checklistTypeIconDetermine(item);
		if (!icon)
			return null;
		return '/icons/' + icon;
	};
	const checklistTypeIconDetermine = (item) => {
		if (!item)
			return null;
		if (item.launchTypeId === AppCommonConstants.Rocketry.RocketTypes.highone)
			return 'rocket_level1.png';
		if (item.launchTypeId === AppCommonConstants.Rocketry.RocketTypes.hightwo)
			return 'rocket_level2.png';
		if (item.launchTypeId === AppCommonConstants.Rocketry.RocketTypes.highthree)
			return 'rocket_level3.png';
		if (item.launchTypeId === AppCommonConstants.Rocketry.RocketTypes.low)
			return 'rocket_low.png';
		if (item.launchTypeId === AppCommonConstants.Rocketry.RocketTypes.mid)
			return 'rocket_mid.png';
		return null;
	};
	const dialogStartCancel = async (item) => {
		try {
			dialogStartManager.value.cancel();
		}
		finally {
			dialogStartParams.value = null;
		}
	};
	const dialogStartOk = async (item) => {
		try {
			if (!dialogStartParams.value || !dialogStartParams.value.id)
				return;

			// TODO
			// const response = await serviceStore.dispatcher.startChecklist(correlationId(), dialogDeleteParams.value.id);
			// if (hasFailed(response)) {
			// 	setNotify(correlationIdI, 'messages.error');
			// 	return;
			// }
			alert('start');
		}
		finally {
			dialogStartParams.value = null;
			dialogStartManager.value.ok();
		}
	};
	const dialogStartOpen = (item) => {
		if (!item)
			return;
		if (!canStart(item))
			return;

		dialogStartParams.value = { id: item.id };
		dialogStartManager.value.open();
	};
	const fetchI = async (correlationId) => {
		return await serviceStore.dispatcher.requestChecklists(correlationId, params.value);
	};
	const fetchItemI = async (correlationId, id) => {
		return await serviceStore.dispatcher.requestChecklistById(correlationId, id);
	};
	const initNewI = (correlationId, data) => {
		data = data ? data : new ChecklistData();
		data.typeId = AppCommonConstants.Checklists.ChecklistTypes.launch;
		return data;
	};
	const isCompleted = (item) => {
		return item ? item.completed  ?? false : false;
	};
	const isDefault = (item) => {
		return item ? item.isDefault ?? false : false;
	};
	const isInProgress = (item) => {
		return item ? item.type === AppCommonConstants.Checklists.ChecklistStatus.inProgress : false;
	};
	const isShared = (item) => {
		return item ? item.isShared ?? false : false;
	};
	const isStarting = (item) => {
		if (!dialogStartParams.value || !dialogStartParams.value.id || !item)
			return false;

		return item.id === dialogStartParams.value.id;
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
		serviceStore,
		sort,
		target,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify,
		dialogCopyManager,
		dialogCopyRef,
		dialogDeleteManager,
		dialogDeleteMessage,
		detailItem,
		items,
		colsEditPanel,
		colsSearchResults,
		displayEditPanel,
		displaySearchResults,
		showDetailItem,
		showList,
		canCopy,
		canDelete,
		canEdit,
		canView,
		detailClose,
		detailOk,
		dialogCopyCancel,
		dialogCopyError,
		dialogCopyOk,
		dialogCopyOpen,
		dialogCopyParams,
		dialogDeleteCancel,
		dialogDeleteError,
		dialogDeleteOk,
		dialogDeleteOpen,
		dialogDeleteParams,
		handleAdd,
		handleEdit,
		handleView,
		initEdit,
		initNew,
		initView,
		isCopying,
		isDeleting,
		display,
		dialogStartManager,
		dialogStartMessage,
		title,
		canStart,
		checklistTypeIcon,
		checklistTypeIconDetermine,
		dialogStartCancel,
		dialogStartParams,
		dialogStartOk,
		dialogStartOpen,
		params,
		isCompleted,
		isDefault,
		isInProgress,
		isShared,
		isStarting
	};
};
</script>
