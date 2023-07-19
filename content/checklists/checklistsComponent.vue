<script>
import { ref} from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants.js';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useMasterDetailComponent } from '@/components/content/masterDetailComponent';

import ChecklistData from 'rocket_sidekick_common/data/checklists/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';
import { filter } from 'mathjs';

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
		detailError,
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
		fetch,
		handleAdd,
		handleEdit,
		handleView,
		initEdit,
		initNew,
		initView,
		isCopying,
		isDeleting,
		isOwner,
		display
	} = useMasterDetailComponent(props, context, {
			dialogDeleteMessage : 'checklists',
			canCopy: (correlationId, item) => { return canCopyI(correlationId, item); },
			canDelete: (correlationId, item) => { return canDeleteI(correlationId, item); },
			canEdit: (correlationId, item) => { return canEditI(correlationId, item); },
			canView: (correlationId, item) => { return canViewI(correlationId, item); },
			fetch: async (correlationId) => { return await fetchI(correlationId); },
			fetchItem: (correlationId, id) => { return fetchItemI(correlationId, id); },
			init: (correlationId) => { return initI(correlationId); },
			initNew: (correlationId, data) => { return initNewI(correlationId, data); }
		}
	);

	const debug = ref(false);
	const dialogChecklistsLookupRef = ref(null);
	const dialogStartManager = ref(new DialogSupport());
	const dialogStartMessage = ref(LibraryClientUtility.$trans.t('messages.checklists.start_confirm'));
	const dialogStartParams = ref(null);
	const filterItemName = ref(null);
	const filterItemIsDefault = ref(true);
	const filterItemShared = ref(false);
	const filterItemYours  = ref(true);
	const title = ref(LibraryClientUtility.$trans.t('titles.content.yours') + ' ' + LibraryClientUtility.$trans.t('titles.content.checklists.title'));

	if (LibraryCommonUtility.isDev) {
		const serviceConfig = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_CONFIG);
		const config = serviceConfig.get('debug');
		if (config)
			debug.value = config['checklists'] ?? false;
	}

	const canCopyI = (correlationId, item) => {
		return isOwner(correlationId, item) && isDefault(item) || isShared(item) || !isInProgress(item); // TODO: SECURITY: Admin can edit a default
	};
	const canDeleteI = (correlationId, item) => {
		return isOwner(correlationId, item) && !isDefault(item) && !isShared(item) && !isInProgress(item); // TODO: SECURITY: Admin can edit a default
	};
	const canEditI = (correlationId, item) => {
		return isOwner(correlationId, item) && !isDefault(item) && !isShared(item) && !isInProgress(item) && !isCompleted(item); // TODO: SECURITY: Admin can edit a default
	};
	const canStart = (item) => {
		return isOwner(correlationId, item) && !isDefault(item) && !isShared(item) && !isInProgress(item) && !isCompleted(item);
	};
	const canViewI = (correlationId, item) => {
		return isOwner(correlationId, item) && isDefault(item) || isShared(item);
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
	const clickSearch = async (correlationId) => {
		await fetch(correlationId);
	};
	const clickSearchClear = async (correlationId) => {
		await dialogRocketsLookupRef.value.reset(correlationId, true);
		await fetch(correlationId);
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
		const params = fetchParams(correlationId, {});
		if (!params)
			return error('useRocketsBaseComponent', 'procfetchIess', 'Invalid params', null, null, null, correlationId);

		serviceStore.dispatcher.setChecklistsSearchCriteria(correlationId, params);
			
		return await serviceStore.dispatcher.requestChecklists(correlationId, params);
	};
	const fetchItemI = async (correlationId, id) => {
		return await serviceStore.dispatcher.requestChecklistById(correlationId, id);
	};
	const fetchParams = (correlationId, params) => {
		params.name = filterItemName.value;
		params.yours = filterItemYours.value;
		params.isDefault = filterItemIsDefault.value;
		params.shared = filterItemShared.value;
		return params;
	};
	const initI = async (correlationId) => {
		const params = await serviceStore.getters.getChecklistsSearchCriteria(correlationId);
		if (params)
			resetAdditional(correlationId, params);
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
	const resetAdditional = async (correlationId, data) => {
		filterItemName.value = data ? data.name : null;
		filterItemYours.value = data ? data.yours : null;
		filterItemIsDefault.value = data ? data.isDefault : null;
		filterItemShared.value = data ? data.shared : null;

		if (!filterItemYours.value && !filterItemIsDefault.value && !filterItemShared.value) {
			filterItemIsDefault.value = true;
			filterItemYours.value = true;
		}
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
		detailError,
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
		fetch,
		handleAdd,
		handleEdit,
		handleView,
		initEdit,
		initNew,
		initView,
		isCopying,
		isDeleting,
		isOwner,
		display,
		debug,
		dialogChecklistsLookupRef,
		dialogStartManager,
		dialogStartMessage,
		title,
		canStart,
		checklistTypeIcon,
		checklistTypeIconDetermine,
		dialogStartCancel,
		clickSearch,
		clickSearchClear,
		dialogStartParams,
		filterItemName,
		filterItemIsDefault,
		filterItemShared,
		filterItemYours,
		dialogStartOk,
		dialogStartOpen,
		isCompleted,
		isDefault,
		isInProgress,
		isShared,
		isStarting,
		resetAdditional
	};
};
</script>
