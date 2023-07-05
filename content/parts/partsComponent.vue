<script>
import { ref} from 'vue';

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
	} = useMasterDetailComponent(props, context, {
			dialogDeleteMessage : 'checklists',
			canCopy: (item) => { return canCopyI(item); },
			canDelete: (item) => { return canDeleteI(item); },
			canEdit: (item) => { return canEditI(item); },
			canView: (item) => { return canViewI(item); },
			fetch: async (item) => { return await fetchI(); },
			fetchItem: (correlationId, id) => { return fetchItemI(correlationId, id); },
			initNew: (correlationId, data) => { return initNewI(correlationId, data); }
		}
	);

	const params = ref({
		type: null
	});
	const title = ref(
		 LibraryClientUtility.$trans.t('titles.content.yours') + ' ' + LibraryClientUtility.$trans.t(`titles.content.parts.${props.title}.title`)
	);
	const canCopyI = (correlationId, item) => {
		return item && isPublic(item);
	};
	const canDeleteI = (item) => {
		return item && !!isPublic(item);
	};
	const canEditI = (correlationId, item) => {
		return item && !isPublic(item);
	};
	const canViewI = (correlationId, item) => {
		return item && isPublic(item);
	};
	const fetchI = async (correlationId) => {
		params.value = props.type;
		return await serviceStore.dispatcher.requestParts(correlationId, params.value);
	};
	const fetchItemI = async (correlationId, id) => {
		return await serviceStore.dispatcher.requestPartById(correlationId, id);
	};
	const initNewI = (correlationId, data) => {
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
		title,
		params,
		isPublic
	};
};
</script>
