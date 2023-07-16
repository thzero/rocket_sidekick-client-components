<script>
import { computed, onMounted, ref} from 'vue';
import { firstBy, thenBy } from 'thenby';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useMasterDetailComponent } from '@/components/content/masterDetailComponent';
import { useRocketsComponent } from '@/components/content/rockets/rocketsComponent';

import RocketData from 'rocket_sidekick_common/data/rockets/index';

export function useRocketsBaseComponent(props, context, options) {
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

	const {
		rocketTypes,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine
	} = useRocketsComponent(props, context, options);

	const dialogRocketsLookupRef = ref(null);
	const manufacturers = ref(null);
	const params = ref({});
	const title = ref(LibraryClientUtility.$trans.t('titles.content.yours') + ' ' + LibraryClientUtility.$trans.t(`titles.content.rockets.title`));

	const buttonSearchResetDisabled = computed(() => {
		return false;
	});

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
	const clickSearch = async (correlationId) => {
		await fetch(correlationId);
	};
	const clickSearchClear = async (correlationId) => {
		await dialogRocketsLookupRef.value.reset(correlationId, true);
		await fetch(correlationId);
	};
	const fetchI = async (correlationId) => {
		// TODO
			
		const response = await serviceStore.dispatcher.requestRockets(correlationId, params.value);
		if (hasFailed(response))
			return response;

		await fetchManufacturers(correlationId);

		let results = response.results;
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
	const fetchItemI = async (correlationId, id) => {
		return await serviceStore.dispatcher.requestRocketById(correlationId, id);
	};
	const fetchManufacturers = async (correlationId) => {
		if (manufacturers.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId);
		if (hasFailed(response))
			return;

		manufacturers.value = response.results.sort((a, b) => a.name.localeCompare(b.name));
	};
	const initNewI = (correlationId, data) => {
		data = data ? data : new RocketData();
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
	const resetAdditional = async (correlationId) => {
		// TODO
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
		fetch,
		handleAdd,
		handleEdit,
		handleView,
		initEdit,
		initNew,
		initView,
		isCopying,
		isDeleting,
		display,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		dialogRocketsLookupRef,
		manufacturers,
		params,
		title,
		buttonSearchResetDisabled,
		clickSearch,
		clickSearchClear,
		isPublic,
		manufacturer,
		measurementUnitTranslateWeight,
		resetAdditional
	};
};
</script>
