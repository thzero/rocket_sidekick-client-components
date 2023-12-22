<script>
import { computed, ref} from 'vue';
import { firstBy, thenBy } from 'thenby';
import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants.js';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import LaunchData from 'rocket_sidekick_common/data/launches/index';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
import { useMasterDetailComponent } from '@/components/content/masterDetailComponent';
import { useOrganizationsUtilityComponent } from '@/components/content/organizationsUtilityComponent';
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
			dialogDeleteMessage : 'launches',
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
		organizations
	} = useOrganizationsUtilityComponent(props, context);

	const {
		rocketTypes
	} = useRocketsUtilityComponent(props, context, options);

	const debug = ref(false);
	const dialogLocationLookupManager = ref(new DialogSupport());
	const dialogRocketLookupManager = ref(new DialogSupport());
	const diameterMeasurementUnitId = ref(null);
	const diameterMeasurementUnitsId = ref(null);
	const LaunchesRef = ref(null);
	const filterItemDiameter = ref(null);
	const filterItemLocationId = ref(null);
	const filterItemLocationName = ref(null);
	const filterItemName = ref(null);
	const filterItemOrganizations = ref(null);
	const filterItemRocketId = ref(null);
	const filterItemRocketName = ref(null);
	const filterItemRocketTypes = ref(null);
	const title = ref(LibraryClientUtility.$trans.t('titles.content.yours') + ' ' + LibraryClientUtility.$trans.t(`titles.content.launches.title`));
	
	if (LibraryCommonUtility.isDev) {
		const serviceConfig = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_CONFIG);
		const config = serviceConfig.get('debug');
		if (config)
			debug.value = config['launches'] ?? false;
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
	const clickSearchLocations = async (correlationId) => {
		dialogLocationLookupManager.value.open();
	};
	const clickSearchRockets = async (correlationId) => {
		dialogRocketLookupManager.value.open();
	};
	const deleteItemI = async (correlationId, id) => {
		return await serviceStore.dispatcher.deleteLaunchById(correlationId, id);
	};
	const fetchI = async (correlationId) => {
		const params = fetchParams(correlationId, {});
		if (!params)
			return error('useLaunchesBaseComponent', 'fetchI', 'Invalid params', null, null, null, correlationId);

		serviceStore.dispatcher.setLaunchesSearchCriteria(correlationId, params);
			
		const response = await serviceStore.dispatcher.requestLaunches(correlationId, params);
		if (hasFailed(response))
			return response;

		let results = response.results;
	 	results = results.sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.name && v2.name) && (v1.name.localeCompare(v2.name)); })
		);

		response.results = results;
		return response;
	};
	const fetchItemI = async (correlationId, id, editable) => {
		return await serviceStore.dispatcher.requestLaunchById(correlationId, id, editable);
	};
	const fetchParams = (correlationId, params) => {
		params.name = filterItemName.value;

		params.locationId = filterItemLocationId.value;
		params.organizations = filterItemOrganizations.value;
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
	const launchDate = (item) => {
		return LibraryCommonUtility.getDateHuman(item.date);
	};
	const launchStatusColor = (item) => {
		return item ? (item.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.success ? 'bg-success' : item.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.failed ? 'bg-red' : 'bg-primary') : 'bg-primary';
	};
	const launchStatusIcon = (item) => {
		return item ? (item.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.success ? 'mdi-thumb-up' : item.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.failed ? 'mdi-thumb-down' : null) : null;
	};
	const launchTitle = (item) => {
		let output = '';
		if (!String.isNullOrEmpty(item.name))
			output += item.name;
		else if (item.rocketSetup && item.rocketSetup.rocket && !String.isNullOrEmpty(item.rocketSetup.rocket.name))
			output += item.rocketSetup.rocket.name;

		// // let date = LibraryCommonUtility.getDateHuman(item.date);
		// let location = '';
		// if (item.location) {
		// 	location = item.location.name;
		// 	if (item.location.iteration) {
		// 		let iteration = '';
		// 		if (item.location.iteration.number)
		// 			iteration += '#' + item.location.iteration.number + ' ';
		// 		if (item.location.iteration.year)
		// 			iteration += '(' + item.location.iteration.year + ')';
		// 			location += ' ' + iteration;
		// 	}
		// }
		
		// return `${output} @ ${location.trim()}`;

		return `${output}`
	};
	const launchTitleLocation = (item) => {
		// let date = LibraryCommonUtility.getDateHuman(item.date);
		let location = '';
		if (item.location) {
			location = item.location.name;
			if (item.location.iteration) {
				let iteration = '';
				if (item.location.iteration.number)
					iteration += '#' + item.location.iteration.number + ' ';
				if (item.location.iteration.year)
					iteration += '(' + item.location.iteration.year + ')';
					location += ' ' + iteration;
			}
		}
		
		return location.trim();
	};
	const locationId = (item) => {
		if (item && item.location)
			return item.location.id;
		return null;
	}
	const resetAdditional = async (correlationId, data) => {
		filterItemName.value = data ? data.name : null;

		filterItemLocationId.value = data ? data.locationId : null;
		filterItemLocationName.value = data ? data.locationName : null;
		filterItemOrganizations.value = data ? data.organizations : null;
		filterItemRocketId.value = data ? data.rocketId : null;
		filterItemRocketName.value = data ? data.rocketName : null;
		filterItemRocketTypes.value = data ? data.rocketTypes : null;
	};
	const rocketId = (item) => {
		if (item && item.rocketSetup && item.rocketSetup.rocket)
			return item.rocketSetup.rocket.id;
		return null;
	};
	const selectLocation = async (item) => {
		try {
			if (!item)
				return error('useLaunchesBaseComponent', 'selectLocation', 'Invalid item.', null, null, null, correlationId);
			
			filterItemLocationId.value = item.id;
			filterItemLocationName.value = item.name;
		}
		finally {
			dialogLocationLookupManager.value.ok();
		}
	};
	const selectRocket = async (item) => {
		try {
			if (!item)
				return error('useLaunchesBaseComponent', 'selectRocket', 'Invalid item.', null, null, null, correlationId);
			
			filterItemRocketId.value = item.id;
			filterItemRocketName.value = item.name;
		}
		finally {
			dialogRocketLookupManager.value.ok();
		}
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
		organizations,
		rocketTypes,
		debug,
		diameterMeasurementUnitId,
		diameterMeasurementUnitsId,
		dialogLocationLookupManager,
		dialogRocketLookupManager,
		LaunchesRef,
		filterItemDiameter,
		filterItemLocationId,
		filterItemLocationName,
		filterItemName,
		filterItemOrganizations,
		filterItemRocketId,
		filterItemRocketName,
		filterItemRocketTypes,
		title,
		buttonSearchResetDisabled,
		clickSearchLocations,
		clickSearchRockets,
		launchDate,
		launchStatusColor,
		launchStatusIcon,
		launchTitle,
		launchTitleLocation,
		locationId,
		resetAdditional,
		rocketId,
		selectLocation,
		selectRocket,
		scope: 'LaunchesFilterControl',
		validation: useVuelidate({ $scope: 'LaunchesilterControl' })
	};
};
</script>
