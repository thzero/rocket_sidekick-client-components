<script>
import { ref} from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useMasterDetailComponent } from '@/components/content/masterDetailComponent';

import PartData from 'rocket_sidekick_common/data/parts/index';

export function usePartsBaseComponent(props, context, options) {
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
		hasDetailItem,
		hasList,
		canCopy,
		canDelete,
		canEdit,
		canView,
		detailClose,
		detailOk,
		dialogCopyCancel,
		dialogCopyParams,
		dialogCopyOk,
		dialogCopyOpen,
		dialogDeleteCancel,
		dialogDeleteParams,
		dialogDeleteOk,
		dialogDeleteOpen,
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
			canCopy: (item) => { return canCopyI(item); },
			canDelete: (item) => { return canDeleteI(item); },
			canEdit: (item) => { return canEditI(item); },
			canView: (item) => { return canViewI(item); },
			fetch: async (item) => { return await fetchI(); },
			initNew: (item) => { return initNewI(data); }
		})
	);

	const params = ref({});
	const title = ref(
		(props.type === AppCommonConstants.Parts.DisplayTypes.User ? LibraryClientUtility.$trans.t('titles.parts.yours') + ' ' : '') + LibraryClientUtility.$trans.t('titles.parts.title')
	);
	const canCopyI = (item) => {
		return item && isPublic(item);
	};
	const canDeleteI = (item) => {
		return item && !!isPublic(item);
	};
	const canEditI = (item) => {
		return item && !isPublic(item);
	};
	const canViewI = (item) => {
		return item && isPublic(item);
	};
	const fetchI = async (correlationId) => {
		return await serviceStore.dispatcher.requestParts(correlationId, params.value);
	};
	const initNewI = (data) => {
		data = data ? data : new PartData();
		return data;
	};
	const isPublic = (item) => {
		return item ? item.public ?? false : false;
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
		hasDetailItem,
		hasList,
		canCopy,
		canDelete,
		canEdit,
		canView,
		detailClose,
		detailOk,
		dialogCopyCancel,
		dialogCopyParams,
		dialogCopyOk,
		dialogCopyOpen,
		dialogDeleteCancel,
		dialogDeleteParams,
		dialogDeleteOk,
		dialogDeleteOpen,
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
		params,
		isPublic
	};
};
</script>
