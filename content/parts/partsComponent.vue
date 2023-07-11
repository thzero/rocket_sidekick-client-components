<script>
import { onMounted, ref} from 'vue';
import { firstBy, thenBy } from 'thenby';

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
			canCopy: (correlationId, item) => { return canCopyI(correlationId, item); },
			canDelete: (correlationId, item) => { return canDeleteI(correlationId, item); },
			canEdit: (correlationId, item) => { return canEditI(correlationId, item); },
			canView: (correlationId, item) => { return canViewI(correlationId, item); },
			fetch: async (correlationId) => { return await fetchI(correlationId); },
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
		return true;
	};
	const canDeleteI = (correlationId, item) => {
		return item && !isPublic(correlationId, item);
	};
	const canEditI = (correlationId, item) => {
		//return item && !isPublic(correlationId, item); // TODO: SECURITY: Admin can edit a public
		return true;
	};
	const canViewI = (correlationId, item) => {
		return true;
	};
	const fetchI = async (correlationId) => {
		params.value = { type: props.type };
		if (props.fetchParams)
			params.value = await props.fetchParams(correlationId, params.value);
			
		const response = await serviceStore.dispatcher.requestParts(correlationId, params.value);
		if (hasFailed(response))
			return response;

		await fetchManufacturers(correlationId);

		let results = response.results.filter(l => l.typeId === props.type);
		results.forEach((item) => {
			const temp = manufacturers.value.find(l => l.id === item.manufacturerId);
			if (temp)
				item.manufacturerName = temp.name;
		});
	 	// results = results.sort(
		// 	firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
		// 	.thenBy((v1, v2) => { return v1.name.localeCompare(v2.name); })
		// 	.thenBy((v1, v2) => { return (v1.manufacturerName && v2.manufacturerName) && v1.manufacturerName.localeCompare(v2.manufacturerName); })
		// );
		results = results.sort(
			firstBy((v1, v2) => { return (v1.manufacturerName && v2.manufacturerName) && v1.manufacturerName.localeCompare(v2.manufacturerName); })
		);

		response.results = results;
		return response;
	};
	const fetchItemI = async (correlationId, id) => {
		return await serviceStore.dispatcher.requestPartById(correlationId, id);
	};
	const initNewI = (correlationId, data) => {
		data = data ? data : new PartData();
		return data;
	};
	const isPublic = (correlationId, item) => {
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
	const fetchManufacturers = async (correlationId) => {
		if (manufacturers.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId);
		if (hasFailed(response))
			return;

		manufacturers.value = response.results.sort((a, b) => a.name.localeCompare(b.name));
	};

	onMounted(async () => {
		// fetchManufacturers(correlationId());
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
