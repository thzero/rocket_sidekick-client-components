<script>
import { computed, onMounted, ref} from 'vue';
import { firstBy, thenBy } from 'thenby';
import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants.js';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import RocketData from 'rocket_sidekick_common/data/rockets/index';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useMasterDetailComponent } from '@/components/content/masterDetailComponent';
import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

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
			dialogDeleteMessage : 'rockets',
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
	const rocketsref = ref(null);
	const diameterMeasurementUnitId = ref(null);
	const diameterMeasurementUnitsId = ref(null);
	const filterItemDiameter = ref(null);
	const filterItemManufacturers = ref(null);
	const filterItemManufacturerStockId = ref(null);
	const filterItemName = ref(null);
	const filterItemRocketTypes = ref(null);
	const filterItemWeight = ref(null);
	const manufacturers = ref(null);
	const title = ref(LibraryClientUtility.$trans.t('titles.content.yours') + ' ' + LibraryClientUtility.$trans.t(`titles.content.rockets.title`));
	const weightMeasurementUnitId = ref(null);
	const weightMeasurementUnitsId = ref(null);

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
	const deleteItemI = async (correlationId, id) => {
		return await serviceStore.dispatcher.deleteRocketById(correlationId, id);
	};
	const fetchI = async (correlationId) => {
		await fetchManufacturers(correlationId);

		const params = fetchParams(correlationId, {});
		if (!params)
			return error('useRocketsBaseComponent', 'fetchI', 'Invalid params', null, null, null, correlationId);

		serviceStore.dispatcher.setRocketsSearchCriteria(correlationId, params);

		if (requestedItemId.value)
			params.rocketId = requestedItemId.value;
			
		const response = await serviceStore.dispatcher.requestRockets(correlationId, params);
		if (hasFailed(response))
			return response;

		response.results.forEach((item) => {
			const temp = manufacturers.value.find(l => l.id === item.manufacturerId);
			if (temp)
				item.manufacturerName = temp.name;
		});
		
		response.results = response.results.sort(
			firstBy('sortName', { ignoreCase: true })
			.thenBy('name', { ignoreCase: true })
			.thenBy('manufacturerName', { ignoreCase: true })
		);

		return success(correlationId, { data: response.results, sorted: true });
	};
	const fetchItemI = async (correlationId, id, editable) => {
		return await serviceStore.dispatcher.requestRocketById(correlationId, id, editable);
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
		params.rocketTypes = filterItemRocketTypes.value;
		params.weight = filterItemWeight.value;
		// params.weightMeasurementUnitId = weightMeasurementUnitId.value;
		// params.weightMeasurementUnitsId = weightMeasurementUnitsId.value;
		return params;
	};
	const initI = async (correlationId) => {
		const params = await serviceStore.getters.getRocketsSearchCriteria(correlationId);
		if (params)
			resetAdditional(correlationId, params);
		return success(correlationId);
	};
	const initNewI = async (correlationId, data) => {
		data = data ? data : new RocketData();
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
		filterItemName.value = data ? data.name : null;
		filterItemDiameter.value = data ? data.diameter : null;
		filterItemManufacturers.value = data ? data.manufacturers : null;
		filterItemManufacturerStockId.value = data ? data.manufacturerStockId : null;
		filterItemRocketTypes.values = data ? data.levels : null;
		filterItemWeight.value = data ? data.weight : null;
	};

	onMounted(async () => {
		const correlationIdI = correlationId();

		AppUtility.usageMetricsMeasurementTag(correlationIdI, 'rockets.library');

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
		rocketMotorMountNames,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		debug,
		rocketsref,
		diameterMeasurementUnitId,
		diameterMeasurementUnitsId,
		filterItemDiameter,
		filterItemManufacturers,
		filterItemManufacturerStockId,
		filterItemName,
		filterItemRocketTypes,
		filterItemWeight,
		manufacturers,
		title,
		weightMeasurementUnitId,
		weightMeasurementUnitsId,
		buttonSearchResetDisabled,
		fetchManufacturers,
		manufacturer,
		measurementUnitTranslateWeight,
		resetAdditional,
		scope: 'RocketsFilterControl',
		validation: useVuelidate({ $scope: 'RocketsFilterControl' })
	};
};
</script>
