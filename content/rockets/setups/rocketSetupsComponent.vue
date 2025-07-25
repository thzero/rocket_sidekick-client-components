<script>
import { computed, onMounted, ref} from 'vue';
import { firstBy, thenBy } from 'thenby';
import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants.js';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import RocketSetupData from 'rocket_sidekick_common/data/rockets/setups/index';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
import { useMasterDetailComponent } from '@/components/content/masterDetailComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useRocketSetupsBaseComponent(props, context, options) {
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
		isDetailOpen,
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
			dialogDeleteMessage : 'rocketSetups',
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
		isUser
	} = useContentSecurityComponent(props, context);

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		rocketTypes,
		hasCoverUrl,
		rocketCg,
		rocketCgHighest,
		rocketCp,
		rocketCpHighest,
		rocketDiameter,
		rocketDiameterHighest,
		rocketLength,
		rocketLengthHighest,
		rocketLengthOverall,
		rocketManufacturer,
		rocketMotorMountName,
		rocketMotorMountNames,
		rocketMotorNames,
		rocketMotorNamesByStage,
		rocketMotors,
		rocketStagePrimary,
		rocketStages,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rocketTypeName,
		rocketTypeNames,
		rocketWeight,
		rocketWeightHighest
	} = useRocketsUtilityComponent(props, context, options);

	const debug = ref(false);
	const rocketSetupsRef = ref(null);
	const diameterMeasurementUnitId = ref(null);
	const diameterMeasurementUnitsId = ref(null);
	const dialogRocketLookupManager = ref(new DialogSupport());
	const filterItemDiameter = ref(null);
	const filterItemManufacturers = ref(null);
	const filterItemManufacturerStockId = ref(null);
	const filterItemName = ref(null);
	const filterItemRocketId = ref(null);
	const filterItemRocketName = ref(null);
	const filterItemRocketTypes = ref(null);
	const manufacturers = ref(null);
	const title = ref(LibraryClientUtility.$trans.t('titles.content.yours') + ' ' + LibraryClientUtility.$trans.t(`titles.content.rocketSetups.title`));

	if (LibraryCommonUtility.isDev) {
		const serviceConfig = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_CONFIG);
		const config = serviceConfig.get('debug');
		if (config)
			debug.value = config['rocketSetups'] ?? false;
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
		return await serviceStore.dispatcher.deleteRocketSetupById(correlationId, id);
	};
	const fetchI = async (correlationId) => {
		await fetchManufacturers(correlationId);

		const params = fetchParams(correlationId, {});
		if (!params)
			return error('useRocketsBaseComponent', 'fetchI', 'Invalid params', null, null, null, correlationId);

		serviceStore.dispatcher.setRocketSetupsSearchCriteria(correlationId, params);

		if (requestedItemId.value)
			params.rocketSetupId = requestedItemId.value;
			
		const response = await serviceStore.dispatcher.requestRocketSetups(correlationId, params);
		if (hasFailed(response))
			return response;

		response.results.forEach((item) => {
			const temp = manufacturers.value.find(l => l.id === item.manufacturerId);
			if (temp)
				item.manufacturerName = temp.name;
		});

		return success(correlationId, { data: response.results, sorted: false });
	};
	const fetchItemI = async (correlationId, id, editable) => {
		return await serviceStore.dispatcher.requestRocketSetupById(correlationId, id, editable);
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
		params.manufacturers = filterItemManufacturers.value;
		params.manufacturerStockId = filterItemManufacturerStockId.value;
		params.rocketId = filterItemRocketId.value;
		params.rocketTypes = filterItemRocketTypes.value;
		return params;
	};
	const initI = async (correlationId) => {
		const params = await serviceStore.getters.getRocketSetupsSearchCriteria(correlationId);
		if (params)
			resetAdditional(correlationId, params);
		return success(correlationId);
	};
	const initNewI = async (correlationId, data) => {
		data = data ? data : new RocketSetupData();
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
				return error('useRocketSetupsBaseComponent', 'selectRocket', 'Invalid item.', null, null, null, correlationId);
			
			filterItemRocketId.value = item.id;
			filterItemRocketName.value = item.name;
		}
		finally {
			dialogRocketLookupManager.value.ok();
		}
	};

	onMounted(async () => {
		const correlationIdI = correlationId();

		AppUtility.usageMetricsMeasurementTag(correlationIdI, 'rockets.setups');
		
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
		isDetailOpen,
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
		rocketTypes,
		rocketDiameterHighest,
		rocketMotors,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		debug,
		rocketSetupsRef,
		diameterMeasurementUnitId,
		diameterMeasurementUnitsId,
		dialogRocketLookupManager,
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
		scope: 'RocketsFilterControl',
		validation: useVuelidate({ $scope: 'RocketsFilterControl' })
	};
};
</script>
