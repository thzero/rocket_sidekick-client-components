<script>
import { computed, onMounted, ref} from 'vue';
import { firstBy, thenBy } from 'thenby';
import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants.js';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import LaunchData from 'rocket_sidekick_common/data/launches/index';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useMasterDetailComponent } from '@/components/content/masterDetailComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useLaunchesBaseComponent(props, context, options) {
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
		display
	} = useMasterDetailComponent(props, context, {
			dialogDeleteMessage : 'launches',
			canCopy: (correlationId, item) => { return canCopyI(correlationId, item); },
			canDelete: (correlationId, item) => { return canDeleteI(correlationId, item); },
			canEdit: (correlationId, item) => { return canEditI(correlationId, item); },
			canView: (correlationId, item) => { return canViewI(correlationId, item); },
			deleteItem: async (correlationId, id) => { return await deleteItemI(correlationId, id); },
			fetch: async (correlationId) => { return await fetchI(correlationId); },
			fetchItem: async (correlationId, id) => { return await fetchItemI(correlationId, id); },
			init: async (correlationId) => { return await initI(correlationId); },
			initNew: async (correlationId, data) => { return await initNewI(correlationId, data); }
		}
	);

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		rocketTypes,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine
	} = useRocketsUtilityComponent(props, context, options);

	const debug = ref(false);
	const dialogRocketLookupManager = ref(new DialogSupport());
	const diameterMeasurementUnitId = ref(null);
	const diameterMeasurementUnitsId = ref(null);
	const LaunchesRef = ref(null);
	const filterItemDiameter = ref(null);
	const filterItemManufacturers = ref(null);
	const filterItemManufacturerStockId = ref(null);
	const filterItemName = ref(null);
	const filterItemRocketId = ref(null);
	const filterItemRocketName = ref(null);
	const filterItemRocketTypes = ref(null);
	const manufacturers = ref(null);
	const title = ref(LibraryClientUtility.$trans.t('titles.content.yours') + ' ' + LibraryClientUtility.$trans.t(`titles.content.launches.title`));

	if (LibraryCommonUtility.isDev) {
		const serviceConfig = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_CONFIG);
		const config = serviceConfig.get('debug');
		if (config)
			debug.value = config['Launches'] ?? false;
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
	const clickSearchRockets = async (correlationId) => {
		dialogRocketLookupManager.value.open();
	};
	const deleteItemI = async (correlationId, id) => {
		return await serviceStore.dispatcher.deleteLaunchById(correlationId, id);
	};
	const fetchI = async (correlationId) => {
		await fetchManufacturers(correlationId);

		const params = fetchParams(correlationId, {});
		if (!params)
			return error('useLaunchesBaseComponent', 'fetchI', 'Invalid params', null, null, null, correlationId);

		serviceStore.dispatcher.setLaunchesSearchCriteria(correlationId, params);
			
		const response = await serviceStore.dispatcher.requestLaunches(correlationId, params);
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
		return await serviceStore.dispatcher.requestLocationById(correlationId, id);
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
		params.manufacturers = filterItemManufacturers.value;
		params.manufacturerStockId = filterItemManufacturerStockId.value;
		params.rocketId = filterItemRocketId.value;
		params.rocketTypes = filterItemRocketTypes.value;
		return params;
	};
	const initI = async (correlationId) => {
		const params = await serviceStore.getters.getLaunchesSearchCriteria(correlationId);
		if (params)
			resetAdditional(correlationId, params);
		return success(correlationId);
	};
	const initNewI = async (correlationId, data) => {
		data = data ? data : new LaunchData();
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
	const resetAdditional = async (correlationId, data) => {
		filterItemName.value = data ? data.name : null;
		filterItemDiameter.value = data ? data.diameter : null;
		filterItemManufacturers.value = data ? data.manufacturers : null;
		filterItemManufacturerStockId.value = data ? data.manufacturerStockId : null;
		filterItemRocketId.value = data ? data.rocketId : null;
		filterItemRocketName.value = data ? data.rocketName : null;
		filterItemRocketTypes.value = data ? data.rocketTypes : null;
	};
	const selectRocket = async (item) => {
		try {
			if (!item)
				return error('useRocketSetupsBaseComponent', 'selectPart', 'Invalid item.', null, null, null, correlationId);
			
			filterItemRocketId.value = item.id;
			filterItemRocketName.value = item.name;
		}
		finally {
			dialogRocketLookupManager.value.ok();
		}
	};

	onMounted(async () => {
		const correlationIdI = correlationId();

		if (!manufacturers.value) {
			const response = await serviceStore.dispatcher.requestManufacturers(correlationIdI);
			if (hasFailed(response))
				return;
				
			let temp2 = response.results.filter(l => l.types.find(j => j === AppCommonConstants.Rocketry.ManufacturerTypes.rocket));
			temp2 = temp2.map((item) => { return { id: item.id, name: item.name, types: item.types}; });
			manufacturers.value = temp2.sort((a, b) => a.name.localeCompare(b.name));
		}		
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
		display,
		buttonsDialog,
		buttonsForms,
		rocketTypes,
		debug,
		diameterMeasurementUnitId,
		diameterMeasurementUnitsId,
		dialogRocketLookupManager,
		LaunchesRef,
		filterItemDiameter,
		filterItemManufacturers,
		filterItemManufacturerStockId,
		filterItemName,
		filterItemRocketId,
		filterItemRocketName,
		filterItemRocketTypes,
		manufacturers,
		title,
		buttonSearchResetDisabled,
		clickSearchRockets,
		fetchManufacturers,
		manufacturer,
		resetAdditional,
		selectRocket,
		scope: 'LaunchesFilterControl',
		validation: useVuelidate({ $scope: 'LaunchesilterControl' })
	};
};
</script>
