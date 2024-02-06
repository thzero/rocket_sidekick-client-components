<script>
import { computed, ref} from 'vue';
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

	const debug = ref(false);
	const locationsListing = ref(null);
	const filterItemName = ref(null);
	const filterItemOrganizations = ref([]);
	const filterItemRocketTypes = ref([]);
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
	const fetchI = async (correlationId) => {
		const params = fetchParams(correlationId, {});
		if (!params)
			return error('useLocationsBaseComponent', 'fetchI', 'Invalid params', null, null, null, correlationId);

		serviceStore.dispatcher.setLocationsSearchCriteria(correlationId, params);

		if (requestedItemId.value)
			params.locationId = requestedItemId.value;
			
		const response = await serviceStore.dispatcher.requestLocations(correlationId, params);
		if (hasFailed(response))
			return;
		
		return success(correlationId, { data: response.results, sorted: false });
	};
	const fetchItemI = async (correlationId, id, editable) => {
		return await serviceStore.dispatcher.requestLocationById(correlationId, id, editable);
	};
	const fetchParams = (correlationId, params) => {
		params.name = filterItemName.value;
		params.organizations = filterItemOrganizations.value;
		params.rocketTypes = filterItemRocketTypes.value;
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
		title,
		buttonSearchResetDisabled,
		addressDisplay,
		resetAdditional,
		scope: 'LocationsFilterControl',
		validation: useVuelidate({ $scope: 'LocationsilterControl' })
	};
};
</script>
