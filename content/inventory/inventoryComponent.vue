<script>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { firstBy, thenBy } from 'thenby';
import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants.js';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import InventoryData from 'rocket_sidekick_common/data/inventory/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentBaseComponent } from '@/components/content/contentBase';
import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
import { useNotify } from '@thzero/library_client_vue3/components/notify';
import { useOrganizationsUtilityComponent } from '@/components/content/organizationsUtilityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useInventoryBaseComponent(props, context, options) {
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
		sortByOrder,
		target
	} = useContentBaseComponent(props, context, options);

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
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify
	} = useNotify(props, context, options);

	const {
		organizations,
		organizationName,
		organizationNames
	} = useOrganizationsUtilityComponent(props, context);

	const {
		rocketTypes
	} = useRocketsUtilityComponent(props, context, options);

	const debug = ref(false);
	const dialogPartsSearchAltimetersManager = ref(new DialogSupport());
	const dialogPartsSearchChuteProtectorsManager = ref(new DialogSupport());
	const dialogPartsSearchChuteReleasesManager = ref(new DialogSupport());
	const dialogPartsSearchDeploymentBagsManager = ref(new DialogSupport());
	const dialogPartsSearchParachutesManager = ref(new DialogSupport());
	const dialogPartsSearchStreamersManager = ref(new DialogSupport());
	const dialogPartsSearchTrackersManager = ref(new DialogSupport());
	// const filterItemName = ref(null);
	// const filterItemOrganizations = ref([]);
	// const filterItemRocketTypes = ref([]);
	const inventory = ref(new InventoryData());
	const inventoryOrig = ref(new InventoryData());
	const inventoryListingRef = ref(null);
	const manufacturerTypeAltimeter = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.altimeter ]);
	const manufacturerTypeChuteProtector = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.chuteProtector ]);
	const manufacturerTypeChuteRelease = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.chuteRelease ]);
	const manufacturerTypeDeploymentBag = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.deploymentBag ]);
	const manufacturerTypeParachute = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.parachute ]);
	const manufacturerTypeStreamer = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.streamer ]);
	const manufacturerTypeTracker = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.tracker ]);
	const manufacturers = ref(props.manufacturers);
	const panels = ref([]);
	const partTypes = ref(AppCommonConstants.Rocketry.PartTypes);
	const title = ref(LibraryClientUtility.$trans.t('titles.content.yours') + ' ' + LibraryClientUtility.$trans.t(`titles.content.inventory.title`));

	if (LibraryCommonUtility.isDev) {
		const serviceConfig = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_CONFIG);
		const config = serviceConfig.get('debug');
		if (config)
			debug.value = config['inventory'] ?? false;
	}
	
	const altimeters = computed(() => {
		if (!inventory.value || !inventory.value.types)
			return [];
		return inventory.value.types.filter(l => (l.item ? l.item.typeId : null) === AppCommonConstants.Rocketry.PartTypes.altimeter);
	});
	const chuteProtectors = computed(() => {
		if (!inventory.value || !inventory.value.types)
			return [];
		return inventory.value.types.filter(l => (l.item ? l.item.typeId : null) === AppCommonConstants.Rocketry.PartTypes.chuteProtector);
	});
	const chuteReleases = computed(() => {
		if (!inventory.value || !inventory.value.types)
			return [];
		return inventory.value.types.filter(l => (l.item ? l.item.typeId : null) === AppCommonConstants.Rocketry.PartTypes.chuteRelease);
	});
	const deploymentBags = computed(() => {
		if (!inventory.value || !inventory.value.types)
			return [];
		return inventory.value.types.filter(l => (l.item ? l.item.typeId : null) === AppCommonConstants.Rocketry.PartTypes.deploymentBag);
	});
	const hasAltimeters = computed(() => {
		const temp = altimeters.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const hasChuteProtectors = computed(() => {
		const temp = chuteProtectors.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const hasChuteReleases = computed(() => {
		const temp = chuteReleases.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const hasDeploymentBags = computed(() => {
		const temp = deploymentBags.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const hasParachutes = computed(() => {
		const temp = parachutes.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const hasStreamers = computed(() => {
		const temp = streamers.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	const hasTrackers = computed(() => {
		const temp = trackers.value;
		return temp &&  Array.isArray(temp) && temp.length > 0;
	});
	// const motorCases = computed(() => {
	// 	const output = [];
	// 	if (hasMotorInfo(0))
	// 		output.push(motorCaseInfoByIndex(0));
	// 	if (hasMotorInfo(1))
	// 		output.push(motorCaseInfoByIndex(1));
	// 	if (hasMotorInfo(2))
	// 		output.push(motorCaseInfoByIndex(2));
	// 	if (hasMotorInfo(3))
	// 		output.push(motorCaseInfoByIndex(3));
	// 	return output;
	// });
	// const motors = computed(() => {
	// 	const output = [];
	// 	if (hasMotorInfo(0))
	// 		output.push(motorInfo(0));
	// 	if (hasMotorInfo(1))
	// 		output.push(motorInfo(3));
	// 	if (hasMotorInfo(2))
	// 		output.push(motorInfo(2));
	// 	if (hasMotorInfo(3))
	// 		output.push(motorInfo(3));
	// 	return output;
	// });
	const parachutes = computed(() => {
		if (!inventory.value || !inventory.value.types)
			return [];
		return inventory.value.types.filter(l => (l.item ? l.item.typeId : null) === AppCommonConstants.Rocketry.PartTypes.parachute);
	});
	const streamers = computed(() => {
		if (!inventory.value || !inventory.value.types)
			return [];
		return inventory.value.types.filter(l => (l.item ? l.item.typeId : null) === AppCommonConstants.Rocketry.PartTypes.streamer);
	});
	const trackers = computed(() => {
		if (!inventory.value || !inventory.value.types)
			return [];
		return inventory.value.types.filter(l => (l.item ? l.item.typeId : null) === AppCommonConstants.Rocketry.PartTypes.tracker);
	});
	
	const clickAltimetersSearch = async () => {
		dialogPartsSearchAltimetersManager.value.open();
	};
	const clickChuteProtectorsSearch = async () => {
		dialogPartsSearchChuteProtectorsManager.value.open();
	};
	const clickChuteReleasesSearch = async () => {
		dialogPartsSearchChuteReleasesManager.value.open();
	};
	const clickDeploymentBagsSearch = async () => {
		dialogPartsSearchDeploymentBagsManager.value.open();
	};
	const clickParachutesSearch = async () => {
		dialogPartsSearchParachutesManager.value.open();
	};
	const clickStreamersSearch = async () => {
		dialogPartsSearchStreamersManager.value.open();
	};
	const clickTrackersSearch = async () => {
		dialogPartsSearchTrackersManager.value.open();
	};
	const fetchParams = (correlationId, params) => {
		// params.name = filterItemName.value;
		// params.organizations = filterItemOrganizations.value;
		// params.rocketTypes = filterItemRocketTypes.value;
		return params;
	};
	const isPartType = (item, typeId) => {
		return item && item.typeId === typeId;
	};
	const panelsUpdated = async (value) => {
		await serviceStore.dispatcher.setInventoryExpanded(correlationId(), value);
	};
	const resetAdditional = async (correlationId, data) => {
		// filterItemName.value = data ? data.name : null;
		// filterItemOrganizations.value = data ? data.organizations : null;
		// filterItemRocketTypes.value = data ? data.rocketTypes : null;
	};
	const search = async (correlationId) => {
		const params = fetchParams(correlationId, {});
		if (!params)
			return error('useInventoryBaseComponent', 'fetchI', 'Invalid params', null, null, null, correlationId);

		serviceStore.dispatcher.setInventorySearchCriteria(correlationId, params);

		const response = await serviceStore.dispatcher.requestInventory(correlationId, params);
		if (hasFailed(response))
			return;

		response.results = response.results ?? new InventoryData();
		response.results.types = sortListing(correlationId, response.results.types ?? []);

		for (const type of response.results.types)
			type.title = LibraryClientUtility.$trans.t(`forms.content.parts.${type.typeId}.plural`);
		
		inventory.value = response.results;
		inventoryOrig.value = LibraryCommonUtility.cloneDeep(response.results);
		return success(correlationId);
	};
	const selectPart = async(correlationId, item) => {
		if (!item)
			return;

		let temp = inventory.value.types.find(l => l.typeId === item.typeId);
		if (!temp) {
			temp = { typeId: item.typeId, items: [], title: LibraryClientUtility.$trans.t(`forms.content.parts.${item.typeId}.plural`)};
			inventory.value.types.push(temp);
		}
		else {
			const find = temp.items.find(l => l.item.id === item.id);
			if (find) {
				setNotify(correlationId, 'errors.content.inventory.exists');
				return;
			}
		}
		temp.items.push({ itemId: item.id, item: item, quantity: 0 });
		temp.items = sortListingItems(correlationId, temp.items);
		inventory.value.types = sortListing(correlationId, inventory.value.types);

		if (!panels.value.find(l => l === item.typeId))
			panels.value.push(item.typeId);
	};
	const selectAltimeter = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item
			);
		}
		finally {
			dialogPartsSearchAltimetersManager.value.ok();
		}
	};
	const selectChuteProtector = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item
			);
		}
		finally {
			dialogPartsSearchChuteProtectorsManager.value.ok();
		}
	};
	const selectChuteRelease = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item
			);
		}
		finally {
			dialogPartsSearchChuteReleasesManager.value.ok();
		}
	};
	const selectDeploymentBag = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item
			);
		}
		finally {
			dialogPartsSearchDeploymentBagsManager.value.ok();
		}
	};
	const selectParachute = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item
			);
		}
		finally {
			dialogPartsSearchParachutesManager.value.ok();
		}
	};
	const selectStreamer = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item
			);
		}
		finally {
			dialogPartsSearchStreamersManager.value.ok();
		}
	};
	const selectTracker = async (item) => {
		try {
			return selectPart(
				correlationId(), 
				item
			);
		}
		finally {
			dialogPartsSearchTrackersManager.value.ok();
		}
	};
	const sortListing = (correlationId, listing) => {
		return listing.sort(
			firstBy((v1, v2) => { return (v1.title && v2.typeId) && v1.title.localeCompare(v2.title); })
		);
	};
	const sortListingItems = (correlationId, listing) => {
		return listing.sort(
			firstBy((v1, v2) => { return (v1.name && v2.typeId) && v1.title.localeCompare(v2.name); })
		);
	};
	const update = async () => {
		dirty.value = false;
		serviceStore.dispatcher.saveInventory(correlationId(), inventory.value);
	};

	onMounted(async () => {
		const correlationIdI = correlationId();
		dirty.value = false;

		let temp = await serviceStore.getters.getInventoryExpanded();
		if (temp || temp.length)
			temp = [ 
				AppCommonConstants.Rocketry.ManufacturerTypes.altimeter,
				AppCommonConstants.Rocketry.ManufacturerTypes.chuteProtector,
				AppCommonConstants.Rocketry.ManufacturerTypes.chuteRelease,
				AppCommonConstants.Rocketry.ManufacturerTypes.deploymentBag,
				AppCommonConstants.Rocketry.ManufacturerTypes.motor,
				AppCommonConstants.Rocketry.ManufacturerTypes.motorCase,
				AppCommonConstants.Rocketry.ManufacturerTypes.parachute,
				AppCommonConstants.Rocketry.ManufacturerTypes.streamer,
				AppCommonConstants.Rocketry.ManufacturerTypes.tracker
			];
		panels.value = temp;

		await search(correlationIdI);

		if (!manufacturers.value) {
			const response = await serviceStore.dispatcher.requestManufacturers(correlationIdI);
			if (hasFailed(response))
				return;
				
			let temp2 = response.results;
			temp2 = temp2.map((item) => { return { id: item.id, name: item.name, types: item.types}; });
			manufacturers.value = temp2.sort((a, b) => a.name.localeCompare(b.name));
		}
	});

	onBeforeUnmount(async () => {
		if (dirty.value)
			update();
	});

	const dirty = ref(false);
	let debounced = null;
	watch(() => inventory,
		(value) => {
			if (!debounced) {
				debounced = LibraryCommonUtility.debounce(update, 750);
				return;
			}

			dirty.value = !LibraryCommonUtility.isEqual(value, inventoryOrig.value);
			debounced();
		},
		{ deep: true }
	);

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
		sortByOrder,
		target,
		buttonsDialog,
		buttonsForms,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		debug,
		inventory,
		inventoryListingRef,
		// filterItemName,
		// filterItemOrganizations,
		// filterItemRocketTypes,
		panels,
		partTypes,
		title,
		dialogPartsSearchAltimetersManager,
		dialogPartsSearchChuteProtectorsManager,
		dialogPartsSearchChuteReleasesManager,
		dialogPartsSearchDeploymentBagsManager,
		dialogPartsSearchParachutesManager,
		dialogPartsSearchStreamersManager,
		dialogPartsSearchTrackersManager,
		manufacturerTypeAltimeter,
		manufacturerTypeChuteProtector,
		manufacturerTypeChuteRelease,
		manufacturerTypeDeploymentBag,
		manufacturerTypeParachute,
		manufacturerTypeStreamer,
		manufacturerTypeTracker,
		manufacturers,
		altimeters,
		chuteProtectors,
		chuteReleases,
		deploymentBags,
		hasAltimeters,
		hasChuteProtectors,
		hasChuteReleases,
		hasDeploymentBags,
		hasParachutes,
		hasStreamers,
		hasTrackers,
		parachutes,
		streamers,
		trackers,
		clickAltimetersSearch,
		clickChuteProtectorsSearch,
		clickChuteReleasesSearch,
		clickDeploymentBagsSearch,
		clickParachutesSearch,
		clickStreamersSearch,
		clickTrackersSearch,
		isPartType,
		panelsUpdated,
		resetAdditional,
		search,
		selectAltimeter,
		selectChuteProtector,
		selectChuteRelease,
		selectDeploymentBag,
		selectParachute,
		selectStreamer,
		selectTracker,
		dirty,
		scope: 'InventoryFilterControl',
		validation: useVuelidate({ $scope: 'InventoryilterControl' })
	};
};
</script>
