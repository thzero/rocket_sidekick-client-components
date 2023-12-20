<script>
import { ref} from 'vue';
import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants.js';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
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
		dialogDeleteParams,
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
		clickSearch,
		clickSearchClear,
		detailClose,
		detailDirty,
		detailDirtyCallback,
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
		search,
		display
	} = useMasterDetailComponent(props, context, {
			dialogDeleteMessage : 'checklists',
			canCopy: (correlationId, item) => { return canCopyI(correlationId, item); },
			canDelete: (correlationId, item) => { return canDeleteI(correlationId, item); },
			canEdit: (correlationId, item) => { return canEditI(correlationId, item); },
			canView: (correlationId, item) => { return canViewI(correlationId, item); },
			fetch: async (correlationId) => { return await fetchI(correlationId); },
			fetchItem: async (correlationId, id, editable) => { return await fetchItemI(correlationId, id, editable); },
			init: async (correlationId) => { return await initI(correlationId); },
			initNew: async (correlationId, data) => { return await initNewI(correlationId, data); }
		}
	);

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

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
		return isOwner(correlationId, item) || isDefault(item) || !isInProgress(item); // TODO: SECURITY: Admin can edit a default
	};
	const canDeleteI = (correlationId, item) => {
		return isOwner(correlationId, item) && !isDefault(item) && !isInProgress(item); // TODO: SECURITY: Admin can edit a default
	};
	const canEditI = (correlationId, item) => {
		return isOwner(correlationId, item) && !isDefault(item) && !isInProgress(item) && !isCompleted(item); // TODO: SECURITY: Admin can edit a default
	};
	const canStart = (item) => {
		return isOwner(correlationId, item) && !isDefault(item) && !!isInProgress(item) && !isCompleted(item);
	};
	const canViewI = (correlationId, item) => {
		return isOwner(correlationId, item) || isDefault(item);
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
			if (!dialogStartParams.value)
				return;

			// TODO
			// const correlationIdI = correlationId();
			// const response = await serviceStore.dispatcher.startChecklist(correlationIdI, dialogStartParams.value);
			// if (hasFailed(response)) {
			// 	setNotify(correlationIdI, 'errors.error');
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

		dialogStartParams.value = item.id;
		dialogStartManager.value.open();
	};
	const fetchI = async (correlationId) => {
		const params = fetchParams(correlationId, {});
		if (!params)
			return error('useRocketsBaseComponent', 'fetchI', 'Invalid params', null, null, null, correlationId);

		serviceStore.dispatcher.setChecklistsSearchCriteria(correlationId, params);
			
		return await serviceStore.dispatcher.requestChecklists(correlationId, params);
	};
	const fetchItemI = async (correlationId, id, editable) => {
		return await serviceStore.dispatcher.requestChecklistById(correlationId, id, editable);
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
		return success(correlationId);
	};
	const initNewI = async (correlationId, data) => {
		data = data ? data : new ChecklistData();
		data.typeId = AppCommonConstants.Checklists.ChecklistTypes.launch;
		return success(correlationId, data);
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
	const isStarting = (item) => {
		if (!dialogStartParams.value || !item)
			return false;

		return item.id === dialogStartParams.value;
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
		dialogDeleteParams,
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
		clickSearch,
		clickSearchClear,
		detailClose,
		detailDirty,
		detailDirtyCallback,
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
		search,
		display,
		buttonsDialog,
		buttonsForms,
		debug,
		dialogChecklistsLookupRef,
		dialogStartManager,
		dialogStartMessage,
		title,
		canStart,
		checklistTypeIcon,
		checklistTypeIconDetermine,
		dialogStartCancel,
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
		isStarting,
		resetAdditional,
		scope: 'RocketsFilterControl',
		validation: useVuelidate({ $scope: 'RocketsFilterControl' })
	};
};
</script>
