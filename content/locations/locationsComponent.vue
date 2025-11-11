<script>
import { computed, onMounted, ref, watch } from 'vue';
import { firstBy, thenBy } from 'thenby';
import useVuelidate from '@vuelidate/core';

import LibraryClientConstants from '@thzero/library_client/constants.js';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import LocationData from 'rocket_sidekick_common/data/locations/index';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useMasterDetailComponent } from '@/components/content/masterDetailComponent';
import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
import { useOrganizationsUtilityComponent } from '@/components/content/organizationsUtilityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useLocationsBaseComponent(props, context, options) {
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
			dialogDeleteMessage : 'locations',
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
		rocketTypes
	} = useRocketsUtilityComponent(props, context, options);

	const {
		organizations,
		organizationName,
		organizationNames
	} = useOrganizationsUtilityComponent(props, context);

	const types = {
		location: 'location',
		name: 'name',
		shared: 'shared',
	};
	
	let sortColumnWatcher = null;
	let sortColumDirectionWatcher = null;

	const debug = ref(false);
	const locationsListing = ref(null);
	const filterItemName = ref(null);
	const filterItemOrganizations = ref([]);
	const filterItemRocketTypes = ref([]);
	const filterItemShared = ref(true);
	const sortColumn1 = ref(types.name);
	const sortColumn2 = ref(null);
	const sortColumn3 = ref(null);
	const sortColumnDirection1 = ref(true);
	const sortColumnDirection2 = ref(true);
	const sortColumnDirection3 = ref(true);
	const title = ref(LibraryClientUtility.$trans.t('titles.content.yours') + ' ' + LibraryClientUtility.$trans.t(`titles.content.locations.title`));

	if (LibraryCommonUtility.isDev) {
		const serviceConfig = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_CONFIG);
		const config = serviceConfig.get('debug');
		if (config)
			debug.value = config['locations'] ?? false;
	}

	const buttonSearchResetDisabled = computed(() => {
		return false;
	});
	const sortColumns = computed(() => {
		return  [
			{ id: null, name: '' },
			{ id: types.location, name: LibraryClientUtility.$trans.t('forms.content.locations.address') },
			{ id: types.name, name: LibraryClientUtility.$trans.t('forms.content.locations.name') },
			{ id: types.shared, name: LibraryClientUtility.$trans.t('forms.content.public') }
		];
	});
	const sortColumnsNull = computed(() => {
		return  [
			{ id: types.location, name: LibraryClientUtility.$trans.t('forms.content.locations.address') },
			{ id: types.name, name: LibraryClientUtility.$trans.t('forms.content.locations.name') },
			{ id: types.shared, name: LibraryClientUtility.$trans.t('forms.content.public') }
		];
	});
	
	const addressDisplay = (item) => {
		if (!item || !item.address) 
			return '';

		// const temp2 = [];
		// if (!String.isNullOrEmpty(item.address.name))
		// 	temp2.push(item.address.name);
		// if (!String.isNullOrEmpty(item.address.city))
		// 	temp2.push(item.address.city);
		// if (!String.isNullOrEmpty(item.address.stateProvince))
		// 	temp2.push(item.address.stateProvince);
		// if (!String.isNullOrEmpty(item.address.country))
		// 	temp2.push(item.address.country);
		// return temp2.join(', ').trim();
		return AppUtility.address(item.address);
	};
	const canCopyI = (correlationId, item) => {
		// no copying
		return false;
	};
	const canDeleteI = (correlationId, item) => {
		return isOwner(correlationId, item); // TODO: SECURITY: Admin can delete a public
	};
	const canEditI = (correlationId, item) => {
		return isOwner(correlationId, item); // TODO: SECURITY: Admin can edit a public
	};
	const canViewI = (correlationId, item) => {
		return isOwner(correlationId, item) || isPublic(correlationId, item);
	};
	const deleteItemI = async (correlationId, id) => {
		return await serviceStore.dispatcher.deleteLocationById(correlationId, id);
	};
	const fetchI = async (correlationIdI) => {
		const params = fetchParams(correlationIdI, {});
		if (!params)
			return error('useLocationsBaseComponent', 'fetchI', 'Invalid params', null, null, null, correlationIdI);

		serviceStore.dispatcher.setLocationsSearchCriteria(correlationIdI, params);

		if (requestedItemId.value)
			params.locationId = requestedItemId.value;
			
		const response = await serviceStore.dispatcher.requestLocations(correlationIdI, params);
		if (hasFailed(response))
			return;

		if (!params.shared)
			response.results = response.results.filter(l => l.public !== true);

		if (!String.isNullOrEmpty(params.name))
			response.results = response.results.filter(l => (
				l.name && l.name.toLowerCase().indexOf(params.name.toLowerCase()) > -1 ||
				l.searchName && l.searchName.toLowerCase().indexOf(params.name.toLowerCase()) > -1
			));

		if (params.organizations && params.organizations.length > 0)
			response.results = response.results.filter(l => (
				l.organizations && l.organizations.some(r => params.organizations.includes(r))
			));

		if (params.rocketTypes && params.rocketTypes.length > 0)
			response.results = response.results.filter(l => (
				l.rocketTypes && l.rocketTypes.some(r => params.rocketTypes.includes(r))
			));

		const columns = [ sortColumn1, sortColumn2, sortColumn3 ];
		const columnDirections = [ sortColumnDirection1, sortColumnDirection2, sortColumnDirection3 ];
		let sort = [];

		response.results = response.results.sort(
			firstBy((v1, v2) => { 
				return (v1 && v1.name && v2 && v2.name) && v1.name.localeCompare(v2.name); 
			})
		);

		for (let i = 0; i < columns.length; i++) {
			let column = columns[i];
			let directions = columnDirections[i];
			if (column.value === types.name) {
				if (directions.value)
					sort[i] = (v1, v2) => { return (v1 && v1.sortName && v2 && v2.sortName) && v1.name.localeCompare(v2.sortName); };
				else
					sort[i] = (v1, v2) => { return (v1 && v1.sortName && v2 && v2.sortName) && v2.name.localeCompare(v1.sortName); };
			}
			
			if (column.value === types.location) {
				if (directions.value)
					sort[i] = (v1, v2) => { return (v1 && v2) && addressDisplay(v1).localeCompare(addressDisplay(v2)); };
				else
					sort[i] = (v1, v2) => { return (v1 && v2) && addressDisplay(v2).localeCompare(addressDisplay(v1)); };
			}
			
			if (column.value === types.shared) {
				if (directions.value)
					sort[i] = (v1, v2) => { return (v1 && v1.public && v2 && v2.public) && Number(v1.public) - Number(v2.public); };
				else
					sort[i] = (v1, v2) => { return (v1 && v1.public && v2 && v2.public) && Number(v2.public) - Number(v1.public); };
			}
		}

		let sorting = firstBy(sort[0]);
		sorting.thenBy(sort[1]);
		sorting.thenBy(sort[2]);
		sorting.thenBy(sort[3]);
		response.results = response.results.sort(
			sorting
		);
	
		if (!sortColumnWatcher)
			sortColumnWatcher = watch(() => [ sortColumn1.value, sortColumn2.value, sortColumn3.value ],
				async () => {
					await fetch(correlationId(), false);
				}
			);
		if (!sortColumDirectionWatcher)
			sortColumDirectionWatcher = watch(() => [ sortColumnDirection1.value, sortColumnDirection2.value, sortColumnDirection3.value ],
				async () => {
					await fetch(correlationId(), false);
				}
			);
		
		return success(correlationId, { data: response.results, sorted: true });
	};
	const fetchItemI = async (correlationId, id, editable) => {
		return await serviceStore.dispatcher.requestLocationById(correlationId, id, editable);
	};
	const fetchParams = (correlationId, params) => {
		params.name = filterItemName.value;
		params.organizations = filterItemOrganizations.value;
		params.rocketTypes = filterItemRocketTypes.value;
		params.shared = filterItemShared.value;
		
		params.sortColumn1 = sortColumn1.value ?? types.name;
		params.sortColumn2 = sortColumn2.value ?? null;
		params.sortColumn3 = sortColumn3.value ?? null;
		params.sortColumnDirection1 = sortColumnDirection1.value ?? true;
		params.sortColumnDirection2 = sortColumnDirection2.value ?? true;
		params.sortColumnDirection3 = sortColumnDirection3.value ?? true;

		return params;
	};
	const initI = async (correlationId) => {
		const params = await serviceStore.getters.getLocationsSearchCriteria(correlationId);
		if (params)
			resetAdditional(correlationId, params);
		return success(correlationId);
	};
	const initNewI = async (correlationId, data) => {
		data = data ? data : new LocationData();
		return success(correlationId, data);
	};
	const resetAdditional = async (correlationId, data) => {
		filterItemName.value = data ? data.name : null;
		filterItemOrganizations.value = data ? data.organizations : null;
		filterItemRocketTypes.value = data ? data.rocketTypes : null;
		filterItemShared.value = data ? data.shared : true;

		sortColumn1.value = data ? data.sortColumn1 ?? types.name : types.name;
		sortColumn2.value = data ? data.sortColumn2 : null;
		sortColumn3.value = data ? data.sortColumn3 : null;
		sortColumnDirection1.value = data ? data.sortColumnDirection1 : true;
		sortColumnDirection2.value = data ? data.sortColumnDirection2 : true;
		sortColumnDirection3.value = data ? data.sortColumnDirection3 : true;
	};

	onMounted(async () => {
		AppUtility.usageMetricsMeasurementTag(correlationId(), 'locations');
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
		organizations,
		debug,
		locationsListing,
		filterItemName,
		filterItemOrganizations,
		filterItemRocketTypes,
		filterItemShared,
		sortColumn1,
		sortColumn2,
		sortColumn3,
		sortColumnDirection1,
		sortColumnDirection2,
		sortColumnDirection3,
		title,
		buttonSearchResetDisabled,
		sortColumns,
		sortColumnsNull,
		addressDisplay,
		resetAdditional,
		scope: 'LocationsFilterControl',
		validation: useVuelidate({ $scope: 'LocationsilterControl' })
	};
};
</script>
