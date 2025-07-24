<script>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { firstBy, thenBy } from 'thenby';
import useVuelidate from '@vuelidate/core';

import { utils, writeFileXLSX } from 'xlsx';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants.js';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import InventoryData from 'rocket_sidekick_common/data/inventory/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useMasterDetailComponent } from '@/components/content/masterDetailComponent';
import { useMotorUtilityComponent } from '@/components/external/motorUtilityComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';
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
		dialogDeleteManager,
		dialogDeleteParams,
		fetch
	} = useMasterDetailComponent(props, context, {
			fetch: async (correlationId) => { 
				return await fetchI(correlationId); 
			},
			init: async (correlationId) => { return await initI(correlationId); }
		}
	);

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		motorImpulseClasses,
		motorImpulseClassesNonBlank,
		motorMountDiameters,
		motorMountDiametersNonBlank,
		motorCaseInfo,
		motorMountDiameter,
		motorMountName,
		motorUrl
	} = useMotorUtilityComponent(props, context);

	const {
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		displayItemMeasurementLength,
		displayItemMeasurementWeight,
		measurementUnitsFromUnitId
	} = useToolsMeasurementUtilityComponent(props, context);

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const debug = ref(false);
	const dialogCopyManager = ref(new DialogSupport());
	const dialogCopyMessage = ref(LibraryClientUtility.$trans.t(`messages.items.copy_confirm`));
	const dialogCopyParams = ref(null);
	const dialogPartsSearchAltimetersManager = ref(new DialogSupport());
	const dialogPartsSearchChuteProtectorsManager = ref(new DialogSupport());
	const dialogPartsSearchChuteReleasesManager = ref(new DialogSupport());
	const dialogPartsSearchDeploymentBagsManager = ref(new DialogSupport());
	const dialogPartsSearchMotorsManager = ref(new DialogSupport());
	const dialogPartsSearchMotorCasesManager = ref(new DialogSupport());
	const dialogPartsSearchParachutesManager = ref(new DialogSupport());
	const dialogPartsSearchStreamersManager = ref(new DialogSupport());
	const dialogPartsSearchTrackersManager = ref(new DialogSupport());
	const displayParams = ref({});
	const dirty = ref(false);
	const filterItemDiameterMax = ref(null);
	const filterItemDiameterMin = ref(null);
	const filterItemDiameterMeasurementUnitId = ref(null);
	const filterItemDiameterMeasurementUnitsId = ref(null);
	const filterItemDimensionMax = ref(null);
	const filterItemDimensionMin = ref(null);
	const filterItemDimensionMeasurementUnitId = ref(null);
	const filterItemDimensionMeasurementUnitsId = ref(null);
	const filterItemManufacturers = ref(null);
	const filterItemMotor = ref(null);
	const filterItemMotorCaseDiameter = ref(null);
	const filterItemMotorCases = ref(null);
	const filterItemMotorDiameter = ref(null);
	const filterItemMotorImpulseClass = ref(null);
	const filterItemMotorSingleUse = ref(false);
	const filterItemMotorSparky = ref(false);
	const filterItemPartTypes = ref([]);
	const inventory = ref(new InventoryData());
	const inventoryOrig = ref(new InventoryData());
	const inventoryListingRef = ref(null);
	const manufacturerTypeAltimeter = ref([ AppCommonConstants.Rocketry.PartTypes.altimeter ]);
	const manufacturerTypeChuteProtector = ref([ AppCommonConstants.Rocketry.PartTypes.chuteProtector ]);
	const manufacturerTypeChuteRelease = ref([ AppCommonConstants.Rocketry.PartTypes.chuteRelease ]);
	const manufacturerTypeDeploymentBag = ref([ AppCommonConstants.Rocketry.PartTypes.deploymentBag ]);
	const manufacturerTypeMotor = ref([ AppCommonConstants.Rocketry.PartTypes.motor ]);
	const manufacturerTypeMotorCase = ref([ AppCommonConstants.Rocketry.PartTypes.motorCase ]);
	const manufacturerTypeParachute = ref([ AppCommonConstants.Rocketry.PartTypes.parachute ]);
	const manufacturerTypeStreamer = ref([ AppCommonConstants.Rocketry.PartTypes.streamer ]);
	const manufacturerTypeTracker = ref([ AppCommonConstants.Rocketry.PartTypes.tracker ]);
	const manufacturers = ref(props.manufacturers);
	const mobileOnly = ref(LibraryClientUtility.$store.mobileOnly);
	const panels = ref([]);
	const partTypes = ref(AppCommonConstants.Rocketry.PartTypes);
	const settings = ref(null);
	const title = ref(LibraryClientUtility.$trans.t('titles.content.yours') + ' ' + LibraryClientUtility.$trans.t(`titles.content.inventory.title`));
	const viewType = ref('listing');
	const viewTypeListingRef = ref(null);

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

		const params = displayParams.value;
		if (!params)
			return data;

		let output = LibraryCommonUtility.cloneDeep(inventory.value);
		if (params.partTypes && params.partTypes.length > 0)
			output.types = output.types.filter(l => params.partTypes.find(j => j === l.typeId));

		if (params.diameterMin || params.diameterMax) {
			if (params.diameterMin) {
				for (const type of output.types) {
					// TODO: Need conversion for units...
					type.items = type.items.filter(l => {
						if (!l.item.diameter)
							return false;
						return LibraryClientUtility.convertNumber(l.item.diameter) >= LibraryClientUtility.convertNumber(params.diameterMin);
					});
				}
			}
			if (params.diameterMax) {
				for (const type of output.types) {
					// TODO: Need conversion for units...
					type.items = type.items.filter(l => {
						if (!l.item.diameter)
							return false;
						return LibraryClientUtility.convertNumber(l.item.diameter) <= LibraryClientUtility.convertNumber(params.diameterMax);
					});
				}
			}
		}

		if (params.dimensionNin || params.dimensionMax) {
			if (params.dimensionMin) {
				for (const type of output.types) {
					// TODO: Need conversion for units...
					type.items = type.items.filter(l => {
						if (!l.item.dimension)
							return false;
						return LibraryClientUtility.convertNumber(l.item.dimension) >= LibraryClientUtility.convertNumber(params.dimensionMin);
					});
				}
			}
			if (params.dimensionMax) {
				for (const type of output.types) {
					// TODO: Need conversion for units...
					type.items = type.items.filter(l => {
						if (!l.item.dimension)
							return false;
						return LibraryClientUtility.convertNumber(l.item.dimension) <= LibraryClientUtility.convertNumber(params.dimensionMax);
					});
				}
			}
		}

		if (params.manufacturers && params.manufacturers.length > 0) {
			for (const type of output.types) {
				type.items = type.items.filter(l => {
					return params.manufacturers.indexOf(l.item.manufacturerId) > -1;
				});
			}
		}

		if (params.motorCases || params.motorDiameter || params.motorImpulseClass || params.motorSingleUse || params.motorSparky) {
			const motors = output.types.find(l => l.typeId === AppCommonConstants.Rocketry.PartTypes.motor);
			if (motors && motors.items && motors.items.length > 0) {
				if (params.motorCases && params.motorCases.length > 0) {
					motors.items = motors.items.filter(l => {
						return params.motorCases.indexOf(l.item.motorCaseId) > -1;
					});
				}
				if (params.motorDiameter && params.motorDiameter.length > 0) {
					motors.items = motors.items.filter(l => {
						return params.motorDiameter.indexOf(l.item.diameter) > -1;
					});
				}
				if (params.motorImpulseClass && params.motorImpulseClass.length > 0) {
					motors.items = motors.items.filter(l => {
						return params.motorImpulseClass.indexOf(l.item.impulseClass) > -1;
					});
				}
				if (params.motorSingleUse) {
					motors.items = motors.items.filter(l => {
						return l.item.type !== 'reload';
					});
				}
				if (params.motorSparky) {
					motors.items = motors.items.filter(l => {
						return l.item.sparky === params.motorSparky;
					});
				}
			}
		}

		let typeO;
		for (const type of output.types) {
			typeO = inventory.value.types.find(l => l.typeId === type.typeId);
			for (const item of type.items) {
				item.itemO = typeO.items.find(l => l.id === item.id);
			}
		}

		return output;
	});
	const inventoryMotorCases = computed(() => {
		if (!inventory.value || !inventory.value.types)
			return [];
		let temp = inventory.value.types.find(l => l.typeId === AppCommonConstants.Rocketry.PartTypes.motorCase);
		if (!temp)
			return [];
		const items = LibraryCommonUtility.distinctArray(temp.items, 'itemId');
		return items;
	});
	const inventoryMotorCasesSelect = computed(() => {
		if (!inventoryMotorCases.value)
			return [];
		return LibraryClientVueUtility.selectOptions(inventoryMotorCases.value, null, null, (l) => {
			return l.itemId;
		}, (l) => {
			return l.item.name;
		}, (l) => {
			return l.item.name;
		});
	});
	const inventoryPartTypes = computed(() => {
		const temp2 = LibraryClientVueUtility.selectOptions(Object.getOwnPropertyNames(AppCommonConstants.Rocketry.PartTypes), LibraryClientUtility.$trans.t, 'forms.content.parts');
		return temp2;
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
	const dialogCopyCancel = async () => {
		try {
			dialogCopyManager.value.cancel();
		}
		finally {
			dialogCopyParams.item = null;
		}
	};
	const dialogCopyOk = async () => {
		try {
			if (!dialogCopyParams.item || !dialogCopyParams.item.item)
				return;

			const temp = inventory.value.types.find(l => l.typeId === dialogCopyParams.item.item.typeId);
			if (!temp)
				return;

			const temp2 = LibraryCommonUtility.cloneDeep(dialogCopyParams.item);
			temp2.id = LibraryCommonUtility.generateId();
			delete temp2.itemO;

			LibraryCommonUtility.updateArrayById(temp.items, temp2.id, temp2, false);

			await update();
		}
		finally {
			dialogCopyParams.item = null;
			dialogCopyManager.value.ok();
		}
	};
	const dialogCopyOpen = (item) => {
		if (!item)
			return;

		dialogCopyParams.item = item;
		dialogCopyManager.value.open();
	};
	const dialogDeleteCancel = async () => {
		try {
			dialogDeleteManager.value.cancel();
		}
		finally {
			dialogDeleteParams.item = null;
		}
	};
	const dialogDeleteOk = async () => {
		try {
			if (!dialogDeleteParams.item)
				return;

			const temp = inventory.value.types.find(l => l.typeId === dialogDeleteParams.item.item.typeId);
			if (!temp)
				return;

			LibraryCommonUtility.deleteArrayById(temp.items, dialogDeleteParams.item.id);
			if (!temp.items || temp.items.length === 0)
				LibraryCommonUtility.deleteArray(inventory.value.types, temp.typeId, 'typeId');

			await update();
		}
		finally {
			dialogDeleteParams.item = null;
			dialogDeleteManager.value.ok();
		}
	};
	const dialogDeleteOpen = (item) => {
		if (!item)
			return;

		dialogDeleteParams.item = item;
		dialogDeleteManager.value.open();
	};
	const fetchI = async (correlationId) => {
		fetchParams(correlationId, settings.value.params);
		serviceStore.dispatcher.setInventorySettings(correlationId, settings.value.params);
		if (!settings.value.params)
			return error('useInventoryBaseComponent', 'fetchI', 'Invalid params', null, null, null, correlationId);
		
		serviceStore.dispatcher.setInventorySettings(correlationId, settings.value.params);

		let inventoryI = inventory.value;
		if (!inventoryI || !inventoryI || (inventoryI && inventoryI.types && inventoryI.types.length == 0))
			await search(correlationId, settings.value.params);

		displayParams.value = settings.value.params;

		return success(correlationId);
	};
	const fetchParams = (correlationId, params) => {
		params.diameterMax = filterItemDiameterMax.value;
		params.diameterMin = filterItemDiameterMin.value;
		params.diameterMeasurementUnitId = filterItemDiameterMeasurementUnitId.value;
		params.diameterMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, filterItemDiameterMeasurementUnitId.value);

		params.dimensionMax = filterItemDimensionMax.value;
		params.dimensionMin = filterItemDimensionMin.value;
		params.dimensionMeasurementUnitId = filterItemDimensionMeasurementUnitId.value;
		params.dimensionMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, filterItemDimensionMeasurementUnitId.value);

		params.manufacturers = filterItemManufacturers.value;

		params.motor = filterItemMotor.value;
		params.motorCaseDiameter = filterItemMotorCaseDiameter.value;
		params.motorCases = filterItemMotorCases.value;
		params.motorDiameter = filterItemMotorDiameter.value;
		params.motorImpulseClass = filterItemMotorImpulseClass.value;
		params.motorSingleUse = filterItemMotorSingleUse.value;
		params.motorSparky = filterItemMotorSparky.value;

		params.partTypes = filterItemPartTypes.value;
		return params;
	};
	const handleCopy = async (item) => {
		if (!item || !item.item || !inventory.value || !inventory.value.types)
			return;

		dialogCopyOpen(item);
	};
	const handleDelete = async (item) => {
		if (!item || !item.item || !inventory.value || !inventory.value.types)
			return;

		dialogDeleteOpen(item);
	};
	const hasMotorCase = (item) => {
		if (!(item && item.motorCaseId) || !inventoryMotorCases.value)
			return false;

		const motorCase = inventoryMotorCases.value.find(l => l.itemId === item.motorCaseId);
		return motorCase !== null && motorCase !== undefined;
	};
	const handleViewType = () => {
		viewType.value = viewType.value === 'listing' ? 'table' : 'listing';
		settings.value.viewType = viewType.value;
		serviceStore.dispatcher.setInventorySettings(correlationId, settings.value);
	};
	const handleViewTypeListingDownload = async () => {
		if (!viewTypeListingRef.value) {
			alert('boo');
			return;
		}
		
		await handleViewTypeListingConversion();
	};
	const handleViewTypeListingConversion = async () => {
		const wb = utils.book_new();

		const el = viewTypeListingRef.value;
		let type = null;
		for (const child of el.children) {
			if (child.id) {
				type = child.id;
				continue;
			}

			const el2 = child.children[0].children[0];
			let htmlHeaders = el2.children[0].children[0];
			const headers = [];
			for (const header of htmlHeaders.children)
				headers.push(header.innerHTML);

			const ids = [];
			// ids.push('type');
			ids.push('item');
			if (type === 'motor') {
				ids.push('case');
				ids.push('diameter');
				ids.push('impulse');
				ids.push('type');
				ids.push('sparky');
				ids.push('reload');
			}
			if (type === 'motorCase') {
				ids.push('diameter');
			}
			ids.push('manufacturer');
			ids.push('quantity');

			let htmlBody = el2.children[1];
			const rows = [];
			let temp = {};
			let index = 0;
			for (const row of htmlBody.children) {
				index = 0;
				temp = {};
				if (row.cells.length > 0) {
					for (const id of ids) {
						let temp2 = row.cells[index];
						if (temp2.children && temp2.children.length > 0) {
							temp2 = temp2.children[0];
							if (temp2.children && temp2.children.length > 0)
								temp2 = temp2.children[0];
								if (temp2.children && temp2.children.length > 0)
									temp2 = temp2.children[0];
						}
						temp[id] = temp2.innerHTML;
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
			utils.book_append_sheet(wb, ws, LibraryClientUtility.$trans.t(`forms.content.parts.${type}.title`));
		}
		/* export to XLSX */
		const now = new Date();
		let launchFileName = `${LibraryClientUtility.$trans.t('forms.content.inventory.name')} ${now.getDate()}${now.getMonth()}${now.getFullYear()}`;
		launchFileName = launchFileName.toLocaleLowerCase();
		writeFileXLSX(wb, `${launchFileName}.xlsx`);
	};
	const initI = async (correlationId) => {
		settings.value = await serviceStore.getters.getInventorySettings(correlationId);
		settings.value = settings.value ?? { };
		settings.value.params = settings.value.params ?? { };
		settings.value.viewType = settings.value.viewType ?? 'table';

		resetAdditional(correlationId, settings.value.params);

		viewType.value = settings.value.viewType;

		return success(correlationId);
	};
	const isPartType = (item, typeId) => {
		return item && item.typeId === typeId;
	};
	const motorDelays = (item) => {
		if (!item || !item.delays)
			return null;
		return LibraryClientVueUtility.selectBlank(LibraryClientVueUtility.selectOptions(item.delays.split(',')));
	};
	const panelsUpdated = async (value) => {
		await serviceStore.dispatcher.setInventoryExpanded(correlationId(), value);
	};
	const resetAdditional = async (correlationId, data) => {
		filterItemDiameterMax.value = data ? data.diameterMax : null;
		filterItemDiameterMin.value = data ? data.diameterMin : null;
		filterItemDiameterMeasurementUnitId.value = data ? data.diameterMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		filterItemDiameterMeasurementUnitsId.value = data ? data.diameterMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		filterItemDimensionMax.value = data ? data.dimensionMax : null;
		filterItemDimensionMin.value = data ? data.dimensionMin : null;
		filterItemDimensionMeasurementUnitId.value = data ? data.dimensionMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		filterItemDimensionMeasurementUnitsId.value = data ? data.dimensionMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		filterItemManufacturers.value = data ? data.manufacturers : null;

		filterItemMotor.value = data ? data.motor : null;
		filterItemMotorCaseDiameter.value = data ? data.motorCaseDiameter : null;
		filterItemMotorCases.value = data ? data.motorCases : null;
		filterItemMotorDiameter.value = data ? data.motorDiameter : null;
		filterItemMotorImpulseClass.value = data ? data.motorImpulseClass : null;
		filterItemMotorSingleUse.value = data ? data.motorSingleUse : null;
		filterItemMotorSparky.value = data ? data.motorSparky : null;

		filterItemPartTypes.value = data ? data.partTypes : null;
	};
	const search = async (correlationId, params) => {
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

	onMounted(async () => {
		const correlationIdI = correlationId();
		dirty.value = false;

		AppUtility.usageMetricsMeasurementTag(correlationIdI, 'inventory');

		let temp = await serviceStore.getters.getInventoryExpanded();
		if (!temp || (temp && temp.length === 0))
			temp = [ 
				AppCommonConstants.Rocketry.PartTypes.altimeter,
				AppCommonConstants.Rocketry.PartTypes.chuteProtector,
				AppCommonConstants.Rocketry.PartTypes.chuteRelease,
				AppCommonConstants.Rocketry.PartTypes.deploymentBag,
				AppCommonConstants.Rocketry.PartTypes.motor,
				AppCommonConstants.Rocketry.PartTypes.motorCase,
				AppCommonConstants.Rocketry.PartTypes.parachute,
				AppCommonConstants.Rocketry.PartTypes.streamer,
				AppCommonConstants.Rocketry.PartTypes.tracker
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
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify,
		clickSearch,
		clickSearchClear,
		dialogDeleteManager,
		fetch,
		buttonsDialog,
		buttonsForms,
		motorImpulseClassesNonBlank,
		motorMountDiametersNonBlank,
		motorCaseInfo,
		motorMountDiameter,
		motorMountName,
		motorUrl,
		measurementUnitsLengthType,
		debug,
		inventory,
		inventoryDisplay,
		inventoryListingRef,
		filterItemDiameterMax,
		filterItemDiameterMin,
		filterItemDiameterMeasurementUnitId,
		filterItemDiameterMeasurementUnitsId,
		filterItemDimensionMax,
		filterItemDimensionMin,
		filterItemDimensionMeasurementUnitId,
		filterItemDimensionMeasurementUnitsId,
		filterItemManufacturers,
		filterItemMotor,
		filterItemMotorCaseDiameter,
		filterItemMotorCases,
		filterItemMotorDiameter,
		filterItemMotorImpulseClass,
		filterItemMotorSingleUse,
		filterItemMotorSparky,
		filterItemPartTypes,
		panels,
		mobileOnly,
		partTypes,
		title,
		viewType,
		viewTypeListingRef,
		dialogCopyManager,
		dialogCopyMessage,
		dialogCopyParams,
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
		inventoryMotorCasesSelect,
		inventoryPartTypes,
		viewTypeIcon,
		viewTypeListing,
		viewTypeTable,
		clickAltimetersSearch,
		clickChuteProtectorsSearch,
		clickChuteReleasesSearch,
		clickDeploymentBagsSearch,
		clickMotorSearch,
		clickMotorCaseSearch,
		clickParachutesSearch,
		clickStreamersSearch,
		clickTrackersSearch,
		dialogCopyCancel,
		dialogCopyOk,
		dialogCopyOpen,
		dialogDeleteCancel,
		dialogDeleteOk,
		handleCopy,
		handleDelete,
		hasMotorCase,
		handleViewType,
		handleViewTypeListingDownload,
		isPartType,
		motorDelays,
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
		scope: 'InventoryFilterControl',
		validation: useVuelidate({ $scope: 'InventoryilterControl' })
	};
};
</script>
