<script>
import { computed, onMounted, ref } from 'vue';
import { firstBy, thenBy } from 'thenby';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementUtilityComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRocketLookupDialogComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success
	} = useBaseComponent(props, context, options);

	const {
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsFromUnitId
	} = useToolsMeasurementUtilityComponent(props, context);

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		rocketTypes
	} = useRocketsUtilityComponent(props, context, options);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);
	
	const dialogSelectConfirmManager = ref(new DialogSupport());
	const dialogSelectConfirmMessage = ref(LibraryClientUtility.$trans.t(props.messageReplace ? props.messageReplace : 'none'));
	const dialogSelectConfirmParams = ref(null);
	const filterItemDiameterMax = ref(null);
	const filterItemDiameterMin = ref(null);
	const filterItemDiameterMeasurementUnitId = ref(null);
	const filterItemDiameterMeasurementUnitsId = ref(null);
	const filterItemManufacturers = ref(null);
	const filterItemManufacturerStockId = ref(null);
	const filterItemName = ref(null);
	const filterItemRocketTypes = ref(false);
	const dialogRocketLookup = ref(null);
	const dialogResetManager = ref(new DialogSupport());
	const dialogResetMessage = ref(null);
	const manufacturersI = ref(null);
	const results = ref([]);
	
	const manufacturers = computed(() => {
		return manufacturersI.value ? manufacturersI.value : [];
	});

	const buttonOkDisabledOverride = (disabled, invalid, invalidOverride) => {
		return invalid;
	};
	const clickSearch = async () => {
		await dialogRocketLookup.value.submit(correlationId());
	};
	const clickSearchClear = async () => {
		await dialogRocketLookup.value.reset(correlationId(), null, true);
		await dialogRocketLookup.value.submit(correlationId());
	};
	const clickSelect = async (item) => {
		if (props.rocketId) {
			dialogSelectConfirmParams.value = item;
			dialogSelectConfirmManager.value.open();
			return;
		}
		
		context.emit('select', item);
	};
	const close = () => {
		context.emit('close');
	};
	const dialogResetOk = async () => {
		dialogResetManager.value.ok();
		const correlationIdI = correlationId();
		await serviceStore.dispatcher.requestPartsRocketSearchReset(correlationIdI);
		await preCompleteOk(correlationIdI);
	};
	const dialogSelectConfirmCancel = async () => {
		try {
			dialogSelectConfirmManager.value.cancel();
		}
		finally {
			dialogSelectConfirmParams.value = null;
		}
	};
	const dialogSelectConfirmError = async () => {
		try {
			dialogSelectConfirmManager.value.cancel();
		}
		finally {
			dialogSelectConfirmParams.value = null;
		}
	};
	const dialogSelectConfirmOk = async () => {
		try {
			context.emit('select', dialogSelectConfirmParams.value);
			dialogSelectConfirmManager.value.ok();
			return success(correlationId());
		}
		finally {
			dialogSelectConfirmParams.value = null;
		}
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
	const preCompleteOk = async (correlationId) => {
		results.value = null;

		const diameterMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, filterItemDiameterMeasurementUnitsId.value);

		const request = {
			diameterMax: filterItemDiameterMax.value,
			diameterMin: filterItemDiameterMin.value,
			diameterMeasurementUnitId: filterItemDiameterMeasurementUnitId.value,
			diameterMeasurementUnitsId: diameterMeasurementUnitsId,
			manufacturers: filterItemManufacturers.value,
			manufacturerStockId: filterItemManufacturerStockId.value,
			name: filterItemName.value,
			rocketTypes: filterItemRocketTypes.value
		};

		const response = await serviceStore.dispatcher.requestRockets(correlationId, request);
		if (hasFailed(response))
			return response;

		results.value = response.results.sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return v1.name.localeCompare(v2.name); })
		);
		return success(correlationId);
	};
	const resetAdditional = async (correlationId, previous, loaded) => {
		filterItemManufacturers.value = null;
		filterItemManufacturerStockId.value = null;
		filterItemName.value = null;

		filterItemDiameterMax.value = null;
		filterItemDiameterMin.value = null;
		filterItemDiameterMeasurementUnitId.value = measurementUnitsLengthDefaultId.value;
		filterItemDiameterMeasurementUnitsId.value =  measurementUnitsIdSettings.value;

		filterItemRocketTypes.value = null;

		if (loaded)
			return await preCompleteOk(correlationId);

		results.value = [];
	};

	onMounted(async () => {
		if (manufacturersI.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId());
		if (hasFailed(response))
			return;

		let temp2 = response.results.filter(l => l.types.find(j => 
			(j === AppCommonConstants.Rocketry.ManufacturerTypes.rocket)
		));
		temp2 = temp2.sort((a, b) => a.name.localeCompare(b.name));
		manufacturersI.value = temp2.map((item) => { return { id: item.id, name: item.name }; });
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
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsFromUnitId,
		buttonsDialog,
		buttonsForms,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		rocketTypes,
		dialogSelectConfirmManager,
		dialogSelectConfirmMessage,
		dialogSelectConfirmParams,
		filterItemDiameterMax,
		filterItemDiameterMin,
		filterItemDiameterMeasurementUnitId,
		filterItemDiameterMeasurementUnitsId,
		filterItemManufacturers,
		filterItemManufacturerStockId,
		filterItemName,
		filterItemRocketTypes,
		dialogRocketLookup,
		dialogResetManager,
		dialogResetMessage,
		results,
		manufacturers,
		buttonOkDisabledOverride,
		clickSearch,
		clickSearchClear,
		clickSelect,
		close,
		dialogResetOk,
		dialogSelectConfirmCancel,
		dialogSelectConfirmError,
		dialogSelectConfirmOk,
		manufacturer,
		preCompleteOk,
		resetAdditional,
		scope: 'RocketLookupDialog',
		validation: useVuelidate({ $scope: 'RocketLookupDialog' })
	};
};
</script>
