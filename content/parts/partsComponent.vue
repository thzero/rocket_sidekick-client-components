<script>
import { computed, onMounted, ref} from 'vue';
import { firstBy, thenBy } from 'thenby';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
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
			initNew: async (correlationId, data) => { return initNewI(correlationId, data); }
		}
	);

	const {
		isAdmin,
		isOwner,
		isPublic,
		isPublicDisplay,
		isUser
	} = useContentSecurityComponent(props, context);

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const partsRef = ref(null);
	const manufacturers = ref(null);
	const params = ref({
		type: null
	});
	const title = ref(
		 LibraryClientUtility.$trans.t('titles.content.yours') + ' ' + LibraryClientUtility.$trans.t(`titles.content.parts.${props.title}.title`)
	);

	const buttonSearchResetDisabled = computed(() => {
		return false;
	});

	const canCopyI = (correlationId, item) => {
		return isOwner(correlationId, item) || isPublic(correlationId, item); // TODO: SECURITY: Admin can copy a public
	};
	const canDeleteI = (correlationId, item) => {
		return isOwner(correlationId, item) || !isPublic(correlationId, item); // TODO: SECURITY: Admin can delete a public
	};
	const canEditI = (correlationId, item) => {
		return isOwner(correlationId, item); // TODO: SECURITY: Admin can edit a public
	};
	const canViewI = (correlationId, item) => {
		return isOwner(correlationId, item) || isPublic(correlationId, item); // TODO: SECURITY: Admin can edit a public
	};
	const deleteItemI = async (correlationId, id) => {
		return await serviceStore.dispatcher.deletePartById(correlationId, id);
	};
	const fetchI = async (correlationId) => {
		params.value = { typeId: props.type };
		if (props.fetchParams)
			params.value = await props.fetchParams(correlationId, params.value);
		if (!params)
			return error('usePartsBaseComponent', 'fetchI', 'Invalid params', null, null, null, correlationId);
			
		const response = await serviceStore.dispatcher.requestParts(correlationId, params.value);
		if (hasFailed(response))
			return response;

		serviceStore.dispatcher.setPartsSearchCriteria(correlationId, { params: params.value, type: props.type });

		await fetchManufacturers(correlationId);

		let results = response.results.filter(l => l.typeId === props.type);
		results.forEach((item) => {
			const temp = manufacturers.value.find(l => l.id === item.manufacturerId);
			if (temp)
				item.manufacturerName = temp.name;
		});
	 	results = results.sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return v1.name.localeCompare(v2.name); })
			.thenBy((v1, v2) => { return (v1.manufacturerName && v2.manufacturerName) && v1.manufacturerName.localeCompare(v2.manufacturerName); })
		);
		// results = results.sort(
		// 	firstBy((v1, v2) => { return (v1.manufacturerName && v2.manufacturerName) && v1.manufacturerName.localeCompare(v2.manufacturerName); })
		// );

		response.results = results;
		return response;
	};
	const fetchItemI = async (correlationId, id, editable) => {
		return await serviceStore.dispatcher.requestPartById(correlationId, id, editable);
	};
	const fetchManufacturers = async (correlationId) => {
		if (manufacturers.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId);
		if (hasFailed(response))
			return;

		manufacturers.value = response.results.sort((a, b) => a.name.localeCompare(b.name));
	};
	const initI = async (correlationId) => {
		const params = await serviceStore.getters.getPartsSearchCriteria(correlationId);
		if (params) 
			resetAdditional(correlationId, params[props.type]);
	};
	const initNewI = async (correlationId, data) => {
		data = data ? data : new PartData();
		return success(correlationId, data);
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
	const resetAdditional = async (correlationId, data) => {
		if (props.resetAdditionalFilter)
			await props.resetAdditionalFilter(correlationId, data);
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
		search,
		display,
		buttonsDialog,
		buttonsForms,
		partsRef,
		manufacturers,
		params,
		title,
		buttonSearchResetDisabled,
		manufacturer,
		measurementUnitTranslateWeight,
		resetAdditional
	};
};
</script>
