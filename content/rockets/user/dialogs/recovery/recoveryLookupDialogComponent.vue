<script>
import { onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRecoveryLookupDialogComponent(props, context, options) {
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
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const dialogRecoveryLookup = ref(null);
	const detaiLItemDiameter = ref(null);
	const detaiLItemDiameterMeasurementUnitId = ref(null);
	const detaiLItemDiameterMeasurementUnitsId = ref(null);
	const detailItemLength = ref(null);
	const detailItemLengthMeasurementUnitId = ref(null);
	const detailItemLengthMeasurementUnitsId = ref(null);
	const detailItemManufacturer = ref(null);
	const detailItemManufacturerStockId = ref(null);
	const detailItemName = ref(null);
	const manufacturers = ref(null);
	const results = ref([]);
	const detailItemThinNill = ref(false);

	const buttonOkDisabledOverride = (disabled, invalid, invalidOverride) => {
		return invalid;
	};
	const clickRecoverySearch = async () => {
		await dialogRecoveryLookup.value.submit(correlationId());
	};
	const clickRecoverySearchClear = async () => {
		await dialogRecoveryLookup.value.reset(correlationId(), null, true);
	};
	const clickRecoverySelect = async (item) => {
		context.emit('ok', item);
		return true;
	};
	const close = () => {
		context.emit('close');
	};
	const dialogResetOk = async () => {
		dialogResetManager.value.ok();
		const correlationIdI = correlationId();
		await serviceStore.dispatcher.requestRecoverySearchReset(correlationIdI);
		ttl.value = serviceStore.state.recoverySearchResults ? serviceStore.state.recoverySearchResults.ttl : 0;
		await preCompleteOk(correlationIdI);
	};
	const preCompleteOk = async (correlationId) => {
		results.value = null;

		const request = {
			diameter: diameter.value,
			manufacturer: manufacturer.value,
			recovery: recovery.value,
			singleUse: singleUse.value,
			sparky: sparky.value
		};

		const response = await serviceStore.dispatcher.requestRecoverySearchResults(correlationId, request);
		results.value = response || [];
		return success(correlationId);
	};
	// eslint-disable-next-line
	const resetAdditional = async (correlationId, ignoreSettings) => {
		diameter.value = null;
		length.value = null;
		detailItemManufacturer.value = null;
		detailItemManufacturerStockId.value = null;
		detailItemName.value = null;

		detailItemDiameterMeasurementUnitId.value = value ? value.diameterMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemDMeasurementUnitsId.value = value ? value.diameterMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		detailItemLengthhMeasurementUnitId.value = value ? value.lengthMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemLengthMeasurementUnitsId.value = value ? value.lengthMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		detailItemThinNill.value = false;

		await preCompleteOk(correlationId);
	};

	onMounted(async () => {
		if (manufacturers.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId());
		if (hasFailed(response))
			return;

		const temp2 = response.results.filter(l => l.types.find(j => 
			(j === AppCommonConstants.Rocketry.ManufacturerTypes.chuteProtector) ||
			(j === AppCommonConstants.Rocketry.ManufacturerTypes.deploymentBag) ||
			(j === AppCommonConstants.Rocketry.ManufacturerTypes.parachute) ||
			(j === AppCommonConstants.Rocketry.ManufacturerTypes.streamer)
		));
		temp2 = temp2.sort((a, b) => a.name.localeCompare(b.name));
		manufacturers.value = temp2.map((item) => { return { id: item.id, name: item.name }; });
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
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		serviceStore,
		dialogRecoveryLookup,
		dialogResetMessage,
		dialogResetManager,
		detaiLItemDiameter,
		detaiLItemDiameterMeasurementUnitId,
		detaiLItemDiameterMeasurementUnitsId,
		detailItemLength,
		detailItemLengthMeasurementUnitId,
		detailItemLengthMeasurementUnitsId,
		detailItemManufacturer,
		detailItemManufacturerStockId,
		detailItemName,
		detailItemThinNill,
		manufacturers,
		results,
		buttonOkDisabledOverride,
		clickRecoverySearch,
		clickRecoverySearchClear,
		clickRecoverySelect,
		close,
		dialogResetOk,
		preCompleteOk,
		resetAdditional,
		scope: 'RecoveryLookupDialog',
		validation: useVuelidate({ $scope: 'RecoveryLookupDialog' })
	};
};
</script>
