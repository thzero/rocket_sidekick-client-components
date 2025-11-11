<script>
import { computed, onMounted, ref, watch } from 'vue';
import { firstBy, thenBy } from 'thenby';
import useVuelidate from '@vuelidate/core';

import { utils, writeFileXLSX } from 'xlsx';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants.js';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

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
		rocketTypeIcon,
		rocketTypes
	} = useRocketsUtilityComponent(props, context, options);

	const types = {
		date: 'date',
		launch: 'launch',
		location: 'location',
		rocket: 'rocket',
	};
	
	let sortColumnWatcher = null;
	let sortColumDirectionWatcher = null;

	const debug = ref(false);
	const dialogLocationLookupManager = ref(new DialogSupport());
	const dialogRocketLookupManager = ref(new DialogSupport());
	const diameterMeasurementUnitId = ref(null);
	const diameterMeasurementUnitsId = ref(null);
	const LaunchesRef = ref(null);
	const filterItemDateFrom = ref(null);
	const filterItemDateTo = ref(null);
	const filterItemDiameter = ref(null);
	const filterItemLocationId = ref(null);
	const filterItemLocationName = ref(null);
	const filterItemName = ref(null);
	const filterItemOrganizations = ref(null);
	const filterItemRocketId = ref(null);
	const filterItemRocketName = ref(null);
	const filterItemRocketTypes = ref(null);
	const mobileOnly = ref(LibraryClientUtility.$store.mobileOnly);
	const settings = ref(null);
	const sortColumn1 = ref(types.date);
	const sortColumn2 = ref(null);
	const sortColumn3 = ref(null);
	const sortColumnDirection1 = ref(true);
	const sortColumnDirection2 = ref(true);
	const sortColumnDirection3 = ref(true);
	const title = ref(LibraryClientUtility.$trans.t('titles.content.yours') + ' ' + LibraryClientUtility.$trans.t(`titles.content.launches.title`));
	const viewType = ref('listing');
	const viewTypeListingRef = ref(null);
	
	if (LibraryCommonUtility.isDev) {
		const serviceConfig = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_CONFIG);
		const config = serviceConfig.get('debug');
		if (config)
			debug.value = config['launches'] ?? false;
	}

	const buttonSearchResetDisabled = computed(() => {
		return false;
	});
	const sortColumns = computed(() => {
		return  [
			{ id: null, name: '' },
			{ id: types.date, name: LibraryClientUtility.$trans.t('forms.date') },
			{ id: types.location, name: LibraryClientUtility.$trans.t('forms.content.locations.name') },
			{ id: types.rocket, name: LibraryClientUtility.$trans.t('forms.content.rockets.name') }
		];
	});
	const sortColumnsNull = computed(() => {
		return  [
			{ id: types.date, name: LibraryClientUtility.$trans.t('forms.date') },
			{ id: types.location, name: LibraryClientUtility.$trans.t('forms.content.locations.name') },
			{ id: types.rocket, name: LibraryClientUtility.$trans.t('forms.content.rockets.name') }
		];
	});
	const viewTypeIcon = computed(() => {
		return `mdi-${viewType.value === 'listing' ? 'view-list' : 'table'}`;
	});
	const viewTypeListing = computed(() => {
		return viewType.value === 'listing';
	});
	const viewTypeTable = computed(() => {
		return viewType.value === 'table' || viewType.value === null;
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
	const fetchI = async (correlationIdI) => {
		const params = fetchParams(correlationIdI, settings.value.params);
		if (!params)
			return error('useLaunchesBaseComponent', 'fetchI', 'Invalid params', null, null, null, correlationIdI);

		serviceStore.dispatcher.setLaunchesSettings(correlationIdI, settings.value.params);

		if (requestedItemId.value)
			params.launchId = requestedItemId.value;
			
		const response = await serviceStore.dispatcher.requestLaunches(correlationIdI, settings.value.params);
		if (hasFailed(response))
			return;

		if (params.locationId)
			response.results = response.results.filter(l => (
				l.locationId && l.locationId === params.locationId
			));

		if (!String.isNullOrEmpty(params.name))
			response.results = response.results.filter(l => (
				l.name && l.name.toLowerCase().indexOf(params.name.toLowerCase()) > -1 ||
				l.searchName && l.searchName.toLowerCase().indexOf(params.name.toLowerCase()) > -1
			));

		if (params.organizations && params.organizations.length > 0)
			response.results = response.results.filter(l => (
				l.location && l.location.organizations && l.location.organizations.some(r => params.organizations.includes(r))
			));

		if (params.rocketId)
			response.results = response.results.filter(l => (
				l.rocketId && l.rocketId === params.rocketId
			));

		if (params.rocketTypes && params.rocketTypes.length > 0)
			response.results = response.results.filter(l => (
				l.rocketSetup && l.rocketSetup.rocket && l.rocketSetup.rocket.rocketTypes && l.rocketSetup.rocket.rocketTypes.some(r => params.rocketTypes.includes(r))
			));

		const columns = [ sortColumn1, sortColumn2, sortColumn3 ];
		const columnDirections = [ sortColumnDirection1, sortColumnDirection2, sortColumnDirection3 ];
		let sort = [];

		for (let i = 0; i < columns.length; i++) {
			let column = columns[i];
			let directions = columnDirections[i];
			if (column.value === types.date) {
				if (directions.value)
					sort[i] = (v1, v2) => { return (v1 && v1.date && v2 && v2.date) && new Date(v2.date) - new Date(v1.date); };
				else
					sort[i] = (v1, v2) => { return (v1 && v1.date && v2 && v2.date) && new Date(v1.date) - new Date(v2.date); };
			}
			
			if (column.value === types.launch) {
				if (directions.value)
					sort[i] = (v1, v2) => { return (v1 && v1.name && v2 && v2.sortName) && v1.sortName.localeCompare(v2.sortName); };
				else
					sort[i] = (v1, v2) => { return (v1 && v1.name && v2 && v2.sortName) && v2.sortName.localeCompare(v1.sortName); };
			}
			
			if (column.value === types.location) {
				if (directions.value)
					sort[i] = (v1, v2) => { return (v1 && v1.location && v1.location.sortName && v2 && v2.location && v2.location.sortName) && v1.location.sortName.localeCompare(v2.location.sortName); };
				else
					sort[i] = (v1, v2) => { return (v1 && v1.location && v1.location.sortName && v2 && v2.location && v2.location.sortName) && v2.location.sortName.localeCompare(v1.location.sortName); };
			}
			
			if (column.value === types.rocket) {
				if (directions.value)
					sort[i] = (v1, v2) => { return (v1 && v1.rocketSetup && v1.rocketSetup.rocket && v1.rocketSetup.rocket.sortName && v2 && v2.rocketSetup && v1.rocketSetup.rocket && v2.rocketSetup.rocket.sortName) && v1.rocketSetup.rocket.sortName.localeCompare(v2.rocketSetup.rocket.sortName); };
				else
					sort[i] = (v1, v2) => { return (v1 && v1.rocketSetup && v1.rocketSetup.rocket && v1.rocketSetup.rocket.sortName && v2 && v2.rocketSetup && v1.rocketSetup.rocket && v2.rocketSetup.rocket.sortName) && v2.rocketSetup.rocket.sortName.localeCompare(v1.rocketSetup.rocket.sortName); };
			}
		}

		let sorting = firstBy(sort[0]);
		sorting.thenBy(sort[1]);
		sorting.thenBy(sort[2]);
		sorting.thenBy(sort[3]);
		response.results = response.results.sort(
			sorting
		);

		if (!String.isNullOrEmpty(filterItemName.value)) {
			response.results = response.results.filter(l => l.location && l.location.name && l.location.name.toLowerCase().indexOf(filterItemName.value.toLowerCase()) > -1);
		}
	
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
		return await serviceStore.dispatcher.requestLaunchById(correlationId, id, editable);
	};
	const fetchParams = (correlationId, params) => {
		params = params ?? {};
		params.name = filterItemName.value;

		params.locationId = filterItemLocationId.value;
		params.organizations = filterItemOrganizations.value;
		params.rocketId = filterItemRocketId.value;
		params.rocketTypes = filterItemRocketTypes.value;
		
		params.sortColumn1 = sortColumn1.value ?? types.date;
		params.sortColumn2 = sortColumn2.value ?? null;
		params.sortColumn3 = sortColumn3.value ?? null;
		params.sortColumnDirection1 = sortColumnDirection1.value ?? true;
		params.sortColumnDirection2 = sortColumnDirection2.value ?? true;
		params.sortColumnDirection3 = sortColumnDirection3.value ?? true;

		return params;
	};
	const handleViewType = () => {
		viewType.value = viewType.value === 'listing' ? 'table' : 'listing';
		settings.value.viewType = viewType.value;
		serviceStore.dispatcher.setLaunchesSettings(correlationId, settings.value);
	};
	const handleViewTypeListingDownload = async () => {
		if (!viewTypeListingRef.value) {
			alert('boo');
			return;
		}
		
		await handleViewTypeListingConversion();
	};
	const handleViewTypeListingConversion = async () => {
		const el = viewTypeListingRef.value.$el.children[0].children[0];
		let htmlHeaders = el.children[0].children[0];
		const headers = [];
		for (const header of htmlHeaders.children)
			headers.push(header.innerHTML);

		const ids = [];
		ids.push('rocket');
		ids.push('location');
		ids.push('failureReasons');
		ids.push('diameter');
		ids.push('length');
		ids.push('weight');
		ids.push('cg');
		ids.push('cp');
		ids.push('motors');
		ids.push('temperature');
		ids.push('windSpeed');
		ids.push('accelerationMax');
		ids.push('velocityMax');
		ids.push('altitudeMax');
		ids.push('altitudeMain');
		ids.push('aAltitudeDrogue');

		let htmlBody = el.children[1];
		const rows = [];
		let temp = {};
		let index = 0;
		for (const row of htmlBody.children) {
			index = 0;
			temp = {};
			if (row.children.length > 2) {
				for (const id of ids) {
					temp[id] = row.children[index].innerHTML;
					index++;
				}
			}
			rows.push(temp);
		}
		
		const output = rows;

		/* generate worksheet from state */
		const ws = utils.json_to_sheet(output);
		utils.sheet_add_aoa(ws, [ headers ], { origin: 'A1' });

		const cols = [];
		index = 0;
		for (const id of ids) {
			const max_width_data = output.reduce((w, r) => Math.max(w, r[id].length), 12);
			const max_width_header = headers[index].length;
			const max_width = max_width_data > max_width_header ? max_width_data : max_width_header;
			cols.push( { wch: max_width });
			index++;
		}
		ws['!cols'] = cols;

		/* create workbook and append worksheet */
		const wb = utils.book_new();
		utils.book_append_sheet(wb, ws, "Data");
		/* export to XLSX */
		const now = new Date();
		let launchFileName = `${LibraryClientUtility.$trans.t('forms.content.launches.plural')} ${now.getDate()}${now.getMonth()}${now.getFullYear()}`;
		launchFileName = launchFileName.toLocaleLowerCase();
		writeFileXLSX(wb, `${launchFileName}.xlsx`);
	};
	const initI = async (correlationId) => {
		settings.value = await serviceStore.getters.getLaunchesSettings(correlationId);
		settings.value = settings.value ?? { };
		settings.value.params = settings.value.params ?? { };
		settings.value.viewType = settings.value.viewType ?? 'table';

		resetAdditional(correlationId, settings.value.params);

		viewType.value = settings.value.viewType;

		return success(correlationId);
	};
	const initNewI = async (correlationId, data) => {
		data = data ? data : new LaunchData();
		return success(correlationId, data);
	};
	const launchDate = (item) => {
		return LibraryMomentUtility.getDateHuman(item.date);
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

		// // let date = LibraryMomentUtility.getDateHuman(item.date);
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

		return output;
	};
	const launchTitleLocation = (item) => {
		// let date = LibraryMomentUtility.getDateHuman(item.date);
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

		sortColumn1.value = data ? data.sortColumn1 ?? types.date : types.date;
		sortColumn2.value = data ? data.sortColumn2 : null;
		sortColumn3.value = data ? data.sortColumn3 : null;
		sortColumnDirection1.value = data ? data.sortColumnDirection1 : true;
		sortColumnDirection2.value = data ? data.sortColumnDirection2 : true;
		sortColumnDirection3.value = data ? data.sortColumnDirection3 : true;
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

	onMounted(async () => {
		AppUtility.usageMetricsMeasurementTag(correlationId(), 'launches');
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
		organizations,
		rocketTypeIcon,
		rocketTypes,
		debug,
		diameterMeasurementUnitId,
		diameterMeasurementUnitsId,
		dialogLocationLookupManager,
		dialogRocketLookupManager,
		LaunchesRef,
		filterItemDateFrom,
		filterItemDateTo,
		filterItemDiameter,
		filterItemLocationId,
		filterItemLocationName,
		filterItemName,
		filterItemOrganizations,
		filterItemRocketId,
		filterItemRocketName,
		filterItemRocketTypes,
		mobileOnly,
		sortColumn1,
		sortColumn2,
		sortColumn3,
		sortColumnDirection1,
		sortColumnDirection2,
		sortColumnDirection3,
		title,
		viewType,
		viewTypeListingRef,
		buttonSearchResetDisabled,
		viewTypeIcon,
		viewTypeListing,
		viewTypeTable,
		sortColumns,
		sortColumnsNull,
		clickSearchLocations,
		clickSearchRockets,
		handleViewType,
		handleViewTypeListingDownload,
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
