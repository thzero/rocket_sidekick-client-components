<script>
import { onMounted, ref} from 'vue';

import AppUtility from '@/utility/app';
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
		showDetailItem,
		showList,
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

	const manufacturers = ref(null);
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
		params.value.type = props.type;
		if (props.fetchParams)
			params.value = props.fetchParams(correlationId, params.value);
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
	const manufacturer = (item) => {
		const id = item ? item.manufacturerId ?? null : null;
		if (!id)
			return null;

		if (!manufacturers.value)
			return null;

		const temp = manufacturers.value.find(l => l.id === id);
		return temp ? temp.name : null;
	};
	const measurementUnitTranslateWeight = (measurementUnitsId, measurementUnitId) => {
		return AppUtility.measurementUnitTranslateWeight(correlationId(), measurementUnitsId, measurementUnitId);
	};

	onMounted(async () => {
		if (manufacturers.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId);
		if (hasFailed(response))
			return;

		manufacturers.value = response.results.sort((a, b) => a.name.localeCompare(b.name));
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
		manufacturers,
		params,
		title,
		isPublic,
		manufacturer,
		measurementUnitTranslateWeight
	};
};
</script>
