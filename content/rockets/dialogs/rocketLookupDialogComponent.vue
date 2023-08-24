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
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRocketRocketLookupDialogComponent(props, context, options) {
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
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsAreaDefaultId,
		measurementUnitsAreaType,
		measurementUnitsDensityDefaultId,
		measurementUnitsDensityType,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsFluidDefaultId,
		measurementUnitsFluidType,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		measurementUnitsVolumeDefaultId,
		measurementUnitsVolumeType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType
	} = useToolsMeasurementBaseComponent(props, context);

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		rocketTypes,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine
	} = useRocketsUtilityComponent(props, context, options);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

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
		return manufacturersI.value ? manufacturersI.value.map((item) => { return { id: item.id, name: item.name }; }) : [];
	});

	const buttonOkDisabledOverride = (disabled, invalid, invalidOverride) => {
		return invalid;
	};
	const clickRocketSearch = async () => {
		await dialogRocketLookup.value.submit(correlationId());
	};
	const clickRocketSearchClear = async () => {
		await dialogRocketLookup.value.reset(correlationId(), null, true);
	};
	const clickRocketSelect = async (item) => {
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
	const manufacturer = (item) => {
		const id = item ? item.manufacturerId ?? null : null;
		if (!id)
			return null;

		if (!manufacturersI.value)
			return null;

		const temp = manufacturersI.value.find(l => l.id === id);
		return temp ? temp.name : null;
	};
	const preCompleteOk = async (correlationId) => {
		results.value = null;

		const request = {
			diameterMax: filterItemDiameterMax.value,
			diameterMin: filterItemDiameterMin.value,
			diameterMeasurementUnitId: filterItemDiameterMeasurementUnitId.value,
			diameterMeasurementUnitsId: filterItemDiameterMeasurementUnitsId.value,
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
	const resetAdditional = async (correlationId, ignoreSettings) => {
		filterItemManufacturers.value = null;
		filterItemManufacturerStockId.value = null;
		filterItemName.value = null;

		filterItemDiameterMax.value = null;
		filterItemDiameterMin.value = null;
		filterItemDiameterMeasurementUnitId.value = measurementUnitsLengthDefaultId.value;
		filterItemDiameterMeasurementUnitsId.value =  measurementUnitsIdSettings.value;

		filterItemRocketTypes.value = null;

		await preCompleteOk(correlationId);
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
		buttonsDialog,
		buttonsForms,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		rocketTypes,
		serviceStore,
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
		manufacturersI,
		results,
		manufacturers,
		buttonOkDisabledOverride,
		clickRocketSearch,
		clickRocketSearchClear,
		clickRocketSelect,
		close,
		dialogResetOk,
		manufacturer,
		preCompleteOk,
		resetAdditional,
		scope: 'RecoveryLookupDialog',
		validation: useVuelidate({ $scope: 'RecoveryLookupDialog' })
	};
};
</script>
