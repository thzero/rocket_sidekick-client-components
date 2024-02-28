<script>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { firstBy, thenBy } from 'thenby';
import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants.js';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import InventoryData from 'rocket_sidekick_common/data/inventory/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
import { useMasterDetailComponent } from '@/components/content/masterDetailComponent';
import { useOrganizationsUtilityComponent } from '@/components/content/organizationsUtilityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementUtilityComponent';

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
		target,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify,
		clickSearch,
		clickSearchClear,
		fetch
	} = useMasterDetailComponent(props, context, {
			fetch: async (correlationId) => { 
				return await fetchI(correlationId); 
			}
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
		organizations,
		organizationName,
		organizationNames
	} = useOrganizationsUtilityComponent(props, context);

	const {
		rocketTypes
	} = useRocketsUtilityComponent(props, context, options);

	const {
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		displayItemMeasurementLength,
		displayItemMeasurementWeight
	} = useToolsMeasurementUtilityComponent(props, context);

	const debug = ref(false);
	const dialogPartsSearchAltimetersManager = ref(new DialogSupport());
	const dialogPartsSearchChuteProtectorsManager = ref(new DialogSupport());
	const dialogPartsSearchChuteReleasesManager = ref(new DialogSupport());
	const dialogPartsSearchDeploymentBagsManager = ref(new DialogSupport());
	const dialogPartsSearchMotorsManager = ref(new DialogSupport());
	const dialogPartsSearchMotorCasesManager = ref(new DialogSupport());
	const dialogPartsSearchParachutesManager = ref(new DialogSupport());
	const dialogPartsSearchStreamersManager = ref(new DialogSupport());
	const dialogPartsSearchTrackersManager = ref(new DialogSupport());
	const dirty = ref(false);
	// const filterItemName = ref(null);
	// const filterItemOrganizations = ref([]);
	const filterItemPartTypes = ref([]);
	const inventory = ref(new InventoryData());
	const inventoryOrig = ref(new InventoryData());
	const inventoryListingRef = ref(null);
	const manufacturerTypeAltimeter = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.altimeter ]);
	const manufacturerTypeChuteProtector = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.chuteProtector ]);
	const manufacturerTypeChuteRelease = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.chuteRelease ]);
	const manufacturerTypeDeploymentBag = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.deploymentBag ]);
	const manufacturerTypeMotor = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.motor ]);
	const manufacturerTypeMotorCase = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.motorCase ]);
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
	
	const inventoryDisplay = computed(() => {
		const data = inventory.value ? inventory.value : {};
		if (data.types && data.types.length == 0)
			return data;

		const params = fetchParams(correlationId, {});
		if (!params)
			return data;

		let output = Object.assign({}, inventory.value);
		output.types = [];
		if (inventory.value && Array.isArray(inventory.value.types));
			output.types = [...inventory.value.types];
		if (params.partTypes && params.partTypes.length > 0) {
			output.types = output.types.filter(l => params.partTypes.find(j => j === l.typeId));
		}

		return output;
	});
	const inventoryMotorCases = computed(() => {
		if (!inventory.value || !!inventory.value.types)
			return [];
		return inventory.value.types.find(l => l.typeId === AppCommonConstants.Rocketry.PartTypes.motorCase);
	});
	const inventoryPartTypes = computed(() => {
		const temp2 = LibraryClientVueUtility.selectOptions(Object.getOwnPropertyNames(AppCommonConstants.Rocketry.PartTypes), LibraryClientUtility.$trans.t, 'forms.content.parts');
		return temp2;
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
	const clickMotorSearch = async () => {
		dialogPartsSearchMotorsManager.value.open();
	};
	const clickMotorCaseSearch = async () => {
		dialogPartsSearchMotorCasesManager.value.open();
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
		params.partTypes = filterItemPartTypes.value;
		return params;
	};
	const handleDelete = async (item) => {
		if (!item || !item.item || !inventory.value || !inventory.value.types)
			return;

		const temp = inventory.value.types.find(l => l.typeId === item.item.typeId);
		if (!temp)
			return;

		LibraryCommonUtility.deleteArrayById(temp.items, item.id);
		if (!temp.items || temp.items.length === 0)
			LibraryCommonUtility.deleteArray(inventory.value.types, temp.typeId, 'typeId');

		await update();
	};
	const hasMotorCase = (item) => {
		if (!(item && item.motorCaseId) || !inventoryMotorCases.value || !inventoryMotorCases.value.items)
			return false;

		const motorCase = inventoryMotorCases.value.items.find(l => l.itemId === item.motorCaseId);
		return motorCase !== null && motorCase !== undefined;
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
		filterItemPartTypes.value = data ? data.partTypes : null;
	};
	const fetchI = async (correlationId) => {
		const params = fetchParams(correlationId, {});
		if (!params)
			return error('useInventoryBaseComponent', 'fetchI', 'Invalid params', null, null, null, correlationId);
		
		serviceStore.dispatcher.setInventorySearchCriteria(correlationId, params);

		let inventoryI = inventory.value;
		if (!inventoryI || !inventoryI || (inventoryI && inventoryI.types && inventoryI.types.length == 0))
			await _search(correlationId, params);

		// let inventoryI = inventory.value;
		// if (!inventoryI || (inventoryI && inventoryI.types && inventoryI.types.length == 0)) {
		// 	await _search(correlationId, params);
		// 	inventoryI = inventory.value;
		// }

		// // const temp = (inventoryPartTypes.value ?? []).map(l => l.id);
		// // if (params.partTypes && params.partTypes.length > 0) {
		// // 	inventoryI.types = inventoryI.types.filter(l => params.partTypes.find(j => j === l.typeId));
		// // }

		return success(correlationId);
	};
	const _search = async (correlationId, params) => {
		const response = await serviceStore.dispatcher.requestInventory(correlationId, params);
		if (hasFailed(response))
			return;

		response.results = response.results ?? new InventoryData();
		response.results.types = sortListing(correlationId, response.results.types ?? []);

		for (const type of response.results.types) {
			type.title = LibraryClientUtility.$trans.t(`forms.content.parts.${type.typeId}.plural`);
			type.items = sortListingItems(correlationId, type.items);
		}
		
		inventory.value = response.results;
		inventoryOrig.value = LibraryCommonUtility.cloneDeep(response.results);
		return success(correlationId);
	};
	const selectParts = async(correlationId, items) => {
		if (!items)
			return;

		let find;
		let manufacturer;
		let temp;
		for (const item of items) {
			temp = inventory.value.types.find(l => l.typeId === item.typeId);
			if (!temp) {
				temp = { typeId: item.typeId, items: [], title: LibraryClientUtility.$trans.t(`forms.content.parts.${item.typeId}.plural`)};
				inventory.value.types.push(temp);
			}
			else {
				if (item.typeId !== AppCommonConstants.Rocketry.PartTypes.motor) {
					find = temp.items.find(l => l.itemId === item.id);
					if (find) {
						if (items.length === 1) {
							setNotify(correlationId, 'errors.content.inventory.exists');
							return;
						}
						continue;
					}
				}
			}

			manufacturer = manufacturers.value.find(l => l.id === item.manufacturerId);
			if (manufacturer)
				item.manufacturer = manufacturer.name;

			let id = item.id;
			if (item.typeId === AppCommonConstants.Rocketry.PartTypes.motor)
				id = LibraryCommonUtility.generateId();
			temp.items.push({ id: id, itemId: item.id, item: item, quantity: 1 });
			temp.items = sortListingItems(correlationId, temp.items);

			inventory.value.types = sortListing(correlationId, inventory.value.types);

			if (!panels.value.find(l => l === item.typeId))
				panels.value.push(item.typeId);
		}
	};
	const selectAltimeter = async (items) => {
		try {
			selectParts(
				correlationId(), 
				items
			);
		}
		finally {
			dialogPartsSearchAltimetersManager.value.ok();
		}
	};
	const selectChuteProtector = async (items) => {
		try {
			selectParts(
				correlationId(), 
				items
			);
		}
		finally {
			dialogPartsSearchChuteProtectorsManager.value.ok();
		}
	};
	const selectChuteRelease = async (items) => {
		try {
			selectParts(
				correlationId(), 
				items
			);
		}
		finally {
			dialogPartsSearchChuteReleasesManager.value.ok();
		}
	};
	const selectDeploymentBag = async (items) => {
		try {
			selectParts(
				correlationId(), 
				items
			);
		}
		finally {
			dialogPartsSearchDeploymentBagsManager.value.ok();
		}
	};
	const selectMotor = async (items) => {
		try {
			selectParts(
				correlationId(), 
				items
			);
		}
		finally {
			dialogPartsSearchMotorsManager.value.ok();
		}
	};
	const selectMotorCase = async (items) => {
		try {
			selectParts(
				correlationId(), 
				items
			);
		}
		finally {
			dialogPartsSearchMotorCasesManager.value.ok();
		}
	};
	const selectMotorDelay = async (item, delay) => {
		item.delay = delay;
	};
	const selectParachute = async (items) => {
		try {
			selectParts(
				correlationId(), 
				items
			);
		}
		finally {
			dialogPartsSearchParachutesManager.value.ok();
		}
	};
	const selectStreamer = async (items) => {
		try {
			selectParts(
				correlationId(), 
				items
			);
		}
		finally {
			dialogPartsSearchStreamersManager.value.ok();
		}
	};
	const selectTracker = async (items) => {
		try {
			selectParts(
				correlationId(), 
				items
			);
		}
		finally {
			dialogPartsSearchTrackersManager.value.ok();
		}
	};
	const sortListing = (correlationId, listing) => {
		return listing.sort(
			firstBy((v1, v2) => { return (v1.title && v2.title) && v1.title.localeCompare(v2.title); })
		);
	};
	const sortListingItems = (correlationId, listing) => {
		return listing.sort(
			firstBy((v1, v2) => { return (v1.item && v1.item.sortName && v2.item && v2.item.sortName) && v1.item.sortName.localeCompare(v2.item.sortName); })
			.thenBy((v1, v2) => { return (v1.item && v1.item.name && v2.item && v2.item.name) && v1.item.name.localeCompare(v2.item.name); })
			.thenBy('delay')
		);
	};
	const update = async () => {
		dirty.value = false;
		// serviceStore.dispatcher.saveInventory(correlationId(), inventory.value);
	};
	const weightDisplay = (item) => {
		if (!item)
			return null;
		return displayItemMeasurementWeight(correlationId(), item, (value) => { return value.weight; }, (value) => { return value.weightMeasurementUnitsId; }, (value) => { return value.weightMeasurementUnitId; });
	};
	const motorDelays = (item) => {
		if (!item || !item.delays)
			return null;
		return LibraryClientVueUtility.selectBlank(LibraryClientVueUtility.selectOptions(item.delays.split(',')));
	};

	onMounted(async () => {
		const correlationIdI = correlationId();
		dirty.value = false;

		let temp = await serviceStore.getters.getInventoryExpanded();
		if (!temp || (temp && temp.length === 0))
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

		// await fetchI(correlationIdI);

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
		target,
		buttonsDialog,
		buttonsForms,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		clickSearch,
		clickSearchClear,
		fetch,
		debug,
		inventory,
		inventoryDisplay,
		inventoryListingRef,
		// filterItemName,
		// filterItemOrganizations,
		filterItemPartTypes,
		panels,
		partTypes,
		title,
		dialogPartsSearchAltimetersManager,
		dialogPartsSearchChuteProtectorsManager,
		dialogPartsSearchChuteReleasesManager,
		dialogPartsSearchDeploymentBagsManager,
		dialogPartsSearchMotorsManager,
		dialogPartsSearchMotorCasesManager,
		dialogPartsSearchParachutesManager,
		dialogPartsSearchStreamersManager,
		dialogPartsSearchTrackersManager,
		manufacturerTypeAltimeter,
		manufacturerTypeChuteProtector,
		manufacturerTypeChuteRelease,
		manufacturerTypeDeploymentBag,
		manufacturerTypeMotor,
		manufacturerTypeMotorCase,
		manufacturerTypeParachute,
		manufacturerTypeStreamer,
		manufacturerTypeTracker,
		manufacturers,
		inventoryMotorCases,
		inventoryPartTypes,
		clickAltimetersSearch,
		clickChuteProtectorsSearch,
		clickChuteReleasesSearch,
		clickDeploymentBagsSearch,
		clickMotorSearch,
		clickMotorCaseSearch,
		clickParachutesSearch,
		clickStreamersSearch,
		clickTrackersSearch,
		handleDelete,
		hasMotorCase,
		isPartType,
		panelsUpdated,
		resetAdditional,
		selectAltimeter,
		selectChuteProtector,
		selectChuteRelease,
		selectDeploymentBag,
		selectMotor,
		selectMotorCase,
		selectMotorDelay,
		selectParachute,
		selectStreamer,
		selectTracker,
		weightDisplay,
		motorDelays,
		scope: 'InventoryFilterControl',
		validation: useVuelidate({ $scope: 'InventoryilterControl' })
	};
};
</script>
