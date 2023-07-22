<script>
import { computed, onMounted, ref} from 'vue';
import { firstBy, thenBy } from 'thenby';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants.js';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import RocketData from 'rocket_sidekick_common/data/rockets/index';

import { useMasterDetailComponent } from '@/components/content/masterDetailComponent';
import { useRocketsComponent } from '@/components/content/rockets/rocketsComponent';

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

	const {
		rocketTypes,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine
	} = useRocketsComponent(props, context, options);

	const debug = ref(false);
	const diameterMeasurementUnitId = ref(null);
	const diameterMeasurementUnitsId = ref(null);
	const dialogRocketsLookupRef = ref(null);
	const filterItemDiameter = ref(null);
	const filterItemManufacturers = ref(null);
	const filterItemManufacturerStockId = ref(null);
	const filterItemName = ref(null);
	const filterItemWeight = ref(null);
	const manufacturers = ref(null);
	const title = ref(LibraryClientUtility.$trans.t('titles.content.yours') + ' ' + LibraryClientUtility.$trans.t(`titles.content.rockets.title`));
	const weightMeasurementUnitId = ref(null);
	const weightMeasurementUnitsId = ref(null);
	const params = ref({});

	if (LibraryCommonUtility.isDev) {
		const serviceConfig = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_CONFIG);
		const config = serviceConfig.get('debug');
		if (config)
			debug.value = config['rockets'] ?? false;
	}

	const buttonSearchResetDisabled = computed(() => {
		return false;
	});
	const canCopyI = (correlationId, item) => {
		return isOwner(correlationId, item);
	};
	const canDeleteI = (correlationId, item) => {
		return isOwner(correlationId, item);
	};
	const canEditI = (correlationId, item) => {
		return isOwner(correlationId, item);
	};
	const canViewI = (correlationId, item) => {
		return isOwner(correlationId, item);
	};
	const clickSearch = async (correlationId) => {
		await fetch(correlationId);
	};
	const clickSearchClear = async (correlationId) => {
		await dialogRocketsLookupRef.value.reset(correlationId, true);
		await fetch(correlationId);
	};
	const fetchI = async (correlationId) => {
		await fetchManufacturers(correlationId);

		const params = fetchParams(correlationId, {});
		if (!params)
			return error('useRocketsBaseComponent', 'procfetchIess', 'Invalid params', null, null, null, correlationId);

		serviceStore.dispatcher.setRocketsSearchCriteria(correlationId, params);
			
		const response = await serviceStore.dispatcher.requestRockets(correlationId, params);
		if (hasFailed(response))
			return response;

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
	const fetchParams = (correlationId, params) => {
		params.name = filterItemName.value;
		params.diameter = filterItemDiameter.value;
		params.weight = filterItemWeight.value;
		params.manufacturers = filterItemManufacturers.value;
		params.manufacturerStockId = filterItemManufacturerStockId.value;
		// params.weightMeasurementUnitId = weightMeasurementUnitId.value;
		// params.weightMeasurementUnitsId = weightMeasurementUnitsId.value;
		return params;
	};
	const initI = async (correlationId) => {
		const params = await serviceStore.getters.getRocketsSearchCriteria(correlationId);
		if (params)
			resetAdditional(correlationId, params);
	};
	const initNewI = (correlationId, data) => {
		data = data ? data : new RocketData();
		return data;
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
		filterItemName.value = data ? data.name : null;
		filterItemDiameter.value = data ? data.diameter : null;
		filterItemManufacturers.value = data ? data.manufacturers : null;
		filterItemManufacturerStockId.value = data ? data.manufacturerStockId : null;
		filterItemWeight.value = data ? data.weight : null;
	};

	onMounted(async () => {
		if (manufacturers.value)
			return;

		const correlationIdI = correlationId();
		const response = await serviceStore.dispatcher.requestManufacturers(correlationIdI);
		if (hasFailed(response))
			return;
			
		let temp2 = response.results.filter(l => l.types.find(j => j === AppCommonConstants.Rocketry.ManufacturerTypes.rocket));
		temp2 = temp2.map((item) => { return { id: item.id, name: item.name }; });
		manufacturers.value = temp2.sort((a, b) => a.name.localeCompare(b.name));
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
		isOwner,
		display,
		debug,
		diameterMeasurementUnitId,
		diameterMeasurementUnitsId,
		dialogRocketsLookupRef,
		filterItemDiameter,
		filterItemManufacturers,
		filterItemManufacturerStockId,
		filterItemName,
		filterItemWeight,
		manufacturers,
		title,
		weightMeasurementUnitId,
		weightMeasurementUnitsId,
		buttonSearchResetDisabled,
		clickSearch,
		clickSearchClear,
		fetchManufacturers,
		manufacturer,
		measurementUnitTranslateWeight,
		resetAdditional
	};
};
</script>
