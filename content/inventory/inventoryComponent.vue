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
import { useContentBaseComponent } from '@/components/content/contentBase';
import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
import { useNotify } from '@thzero/library_client_vue3/components/notify';
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
	// const filterItemRocketTypes = ref([]);
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
	
	const motorCases = computed(() => {
		if (!inventory.value || !inventory.value.types)
			return [];
		return inventory.value.types.find(l => l.typeId === AppCommonConstants.Rocketry.PartTypes.motorCase);
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
		// params.rocketTypes = filterItemRocketTypes.value;
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
		if (!(item && item.motorCaseId) && motorCases.value)
			return false;

		const motorCase = motorCases.value.items.find(l => l.itemId === item.motorCaseId);
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
		serviceStore.dispatcher.saveInventory(correlationId(), inventory.value);
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
		motorCases,
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
		search,
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
