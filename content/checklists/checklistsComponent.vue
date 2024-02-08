<script>
import { ref} from 'vue';
import useVuelidate from '@vuelidate/core';
import { firstBy, thenBy } from 'thenby';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants.js';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
import { useMasterDetailComponent } from '@/components/content/masterDetailComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

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
		requestedItemId,
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
		search,
		display
	} = useMasterDetailComponent(props, context, {
			dialogDeleteMessage : 'checklists',
			canCopy: (correlationId, item) => { return canCopyI(correlationId, item); },
			canDelete: (correlationId, item) => { return canDeleteI(correlationId, item); },
			canEdit: (correlationId, item) => { return canEditI(correlationId, item); },
			canView: (correlationId, item) => { return canViewI(correlationId, item); },
			deleteItem: async (correlationId, id) => { return await deleteItemI(correlationId, id); },
			fetch: async (correlationId) => { return await fetchI(correlationId); },
			fetchItem: async (correlationId, id, editable) => { return await fetchItemI(correlationId, id, editable); },
			init: async (correlationId) => { return await initI(correlationId); },
			initNew: async (correlationId, data) => { return await initNewI(correlationId, data); }
		}
	);

	const {
		isAdmin,
		isOwner,
		isPublic,
		isPublicDisplay,
		isUsery
	} = useContentSecurityComponent(props, context);

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		rocketTypes,
		hasCoverUrl,
		rocketCg,
		rocketCp,
		rocketDiameter,
		rocketLength,
		rocketManufacturer,
		rocketMotorMountName,
		rocketMotorMountNames,
		rocketMotors,
		rocketMotorNames,
		rocketMotorNamesByStage,
		rocketStagePrimary,
		rocketStages,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rocketTypeName,
		rocketTypeNames,
		rocketWeight
	} = useRocketsUtilityComponent(props, context, options);

	const debug = ref(false);
	const dialogChecklistsLookupRef = ref(null);
	const dialogStartManager = ref(new DialogSupport());
	const dialogStartMessage = ref(LibraryClientUtility.$trans.t('messages.checklists.start_confirm'));
	const dialogStartParams = ref(null);
	const filterItemName = ref(null);
	const filterItemIsCompleted = ref(false);
	const filterItemIsDefault = ref(true);
	const filterItemIsInProgress = ref(true);
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
		return (isOwner(correlationId, item) || isDefault(item)) && !isInProgress(item);
	};
	const canDeleteI = (correlationId, item) => {
		return isOwner(correlationId, item) && !isDefault(item);
	};
	const canEditI = (correlationId, item) => {
		return isOwner(correlationId, item) && !isDefault(item) && !isInProgress(item) && !isCompleted(item);
	};
	const canInProgress = (item) => {
		return isOwner(correlationId(), item) && isInProgress(item);
	};
	const canStart = (item) => {
		return isOwner(correlationId(), item) && !isDefault(item) && !isInProgress(item) && !isCompleted(item) && (item ? (item.date !== null) : false);
	};
	const canViewI = (correlationId, item) => {
		return (isOwner(correlationId, item) || isDefault(item)) && !isInProgress(item);
	};
	const checklistDate = (item) => {
		return item.date ? LibraryMomentUtility.getDateHuman(item.date) : null;
	};
	const checklistStatusColor = (item) => {
		if (!item)
			return 'bg-primary';

		if (item.statusId === AppCommonConstants.Checklists.ChecklistStatus.inProgress)
			return 'bg-purple';

		if (item.statusId === AppCommonConstants.Checklists.ChecklistStatus.completed)
			return 'bg-green';

		return 'bg-primary';
	};
	const checklistStatusIcon = (item) => {
		return item ? (item.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.success ? 'mdi-thumb-up' : item.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.failed ? 'mdi-thumb-down' : null) : null;
	};
	const deleteItemI = async (correlationId, id) => {
		return await serviceStore.dispatcher.deleteChecklistById(correlationId, id);
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

			const correlationIdI = correlationId();
			const response = await serviceStore.dispatcher.startChecklistById(correlationIdI, dialogStartParams.value);
			if (hasFailed(response)) {
				setNotify(correlationIdI, 'errors.error');
				return;
			}

			await fetch(correlationIdI);

			detailItem.value = null;
			const response2 = await fetchItemI(correlationIdI, dialogStartParams.value, false);
			if (hasFailed(response2)) {
				setNotify(correlationIdI, 'errors.error');
				return;
			}
			
			detailItem.value = initView(correlationIdI, response2.results);
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
			return error('useChecklistsBaseComponent', 'fetchI', 'Invalid params', null, null, null, correlationId);

		serviceStore.dispatcher.setChecklistsSearchCriteria(correlationId, params);

		if (requestedItemId.value)
			params.checklistId = requestedItemId.value;
			
		const response = await serviceStore.dispatcher.requestChecklists(correlationId, params);
		if (hasFailed(response))
			return;

		response.results = response.results.sort(
			firstBy('isDefault', { direction: 'desc' })
			.thenBy('sortName', { ignoreCase: true })
			.thenBy('name', { ignoreCase: true })
			// .thenBy('manufacturerName', { ignoreCase: true })
		);

		return success(correlationId, { data: response.results, sorted: true });
	};
	const fetchItemI = async (correlationId, id, editable) => {
		return await serviceStore.dispatcher.requestChecklistById(correlationId, id, editable);
	};
	const fetchParams = (correlationId, params) => {
		params.name = filterItemName.value;
		params.isCompleted = filterItemIsCompleted.value;
		params.isDefault = filterItemIsDefault.value;
		params.isInProgress = filterItemIsInProgress.value;
		params.shared = filterItemShared.value;
		params.yours = filterItemYours.value;
		return params;
	};
	const handleInProgress = async (item) => {
		const correlationIdI = correlationId();
		if (!canInProgress(item)) {
			setNotify(correlationIdI, 'errors.security');
			return;
		}

		detailItem.value = null;
		const response = await fetchItemI(correlationIdI, item.id, false);
		if (hasFailed(response)) {
			setNotify(correlationIdI, 'errors.error');
			return;
		}
		
		detailItem.value = initView(correlationIdI, response.results);
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
		return item ? item.statusId === AppCommonConstants.Checklists.ChecklistStatus.completed : false;
	};
	const isDefault = (item) => {
		return item ? item.isDefault ?? false : false;
	};
	const isLaunched = (item) => {
		return item ? item.launched : false;
	};
	const isInProgress = (item) => {
		return item ? item.statusId === AppCommonConstants.Checklists.ChecklistStatus.inProgress : false;
	};
	const isStarting = (item) => {
		if (!dialogStartParams.value || !item)
			return false;

		return item.id === dialogStartParams.value;
	};
	const resetAdditional = async (correlationId, data) => {
		filterItemName.value = data ? data.name : null;
		filterItemYours.value = data ? data.yours : null;
		filterItemIsInProgress.value = data ? data.isInProgress : null;
		filterItemIsCompleted.value = data ? data.isCompleted : false;
		filterItemIsDefault.value = data ? data.isDefault : null;

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
		requestedItemId,
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
		search,
		display,
		buttonsDialog,
		buttonsForms,
		rocketTypeIcon,
		debug,
		dialogChecklistsLookupRef,
		dialogStartManager,
		dialogStartMessage,
		title,
		canStart,
		checklistDate,
		checklistStatusColor,
		checklistStatusIcon,
		dialogStartCancel,
		dialogStartParams,
		filterItemName,
		filterItemIsCompleted,
		filterItemIsDefault,
		filterItemIsInProgress,
		filterItemShared,
		filterItemYours,
		dialogStartOk,
		dialogStartOpen,
		handleInProgress,
		isCompleted,
		isDefault,
		isLaunched,
		isInProgress,
		isStarting,
		resetAdditional,
		scope: 'Checklists',
		validation: useVuelidate({ $scope: 'Checklists' })
	};
};
</script>
