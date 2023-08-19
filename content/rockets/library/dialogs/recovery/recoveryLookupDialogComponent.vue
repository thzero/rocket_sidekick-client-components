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
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRecoveryRocketLookupDialogComponent(props, context, options) {
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

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const detailItemDiameterMax = ref(null);
	const detailItemDiameterMin = ref(null);
	const detailItemDiameterMeasurementUnitId = ref(null);
	const detailItemDiameterMeasurementUnitsId = ref(null);
	const detailItemLengthMax = ref(null);
	const detailItemLengthMin = ref(null);
	const detailItemLengthMeasurementUnitId = ref(null);
	const detailItemLengthMeasurementUnitsId = ref(null);
	const detailItemManufacturer = ref(null);
	const detailItemManufacturerStockId = ref(null);
	const detailItemName = ref(null);
	const detailItemThinMill = ref(false);
	const dialogRecoveryLookup = ref(null);
	const dialogResetManager = ref(new DialogSupport());
	const dialogResetMessage = ref(null);
	const manufacturersI = ref(null);
	const partTypes = ref(AppCommonConstants.Rocketry.PartTypes);
	const results = ref([]);
	
	const manufacturers = computed(() => {
		return manufacturersI.value ? manufacturersI.value.map((item) => { return { id: item.id, name: item.name }; }) : [];
	});

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
	};
	const close = () => {
		context.emit('close');
	};
	const dialogResetOk = async () => {
		dialogResetManager.value.ok();
		const correlationIdI = correlationId();
		await serviceStore.dispatcher.requestPartsRecoverySearchReset(correlationIdI);
		await preCompleteOk(correlationIdI);
	};
	const isPartType = (item, typeId) => {
		return item && item.typeId === typeId;
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
	const partTypeName = (id) => {
		return LibraryClientUtility.$trans.t(`forms.content.parts['${id}'].name`);
	};
	const preCompleteOk = async (correlationId) => {
		results.value = null;

		const request = {
			diameterMax: detailItemDiameterMax.value,
			diameterMin: detailItemDiameterMin.value,
			diameterMeasurementUnitId: detailItemDiameterMeasurementUnitId.value,
			diameterMeasurementUnitsId: detailItemDiameterMeasurementUnitsId.value,
			lengthMax: detailItemLengthMax.value,
			lengthMin: detailItemLengthMin.value,
			lengthMeasurementUnitId: detailItemLengthMeasurementUnitId.value,
			lengthMeasurementUnitsId: detailItemLengthMeasurementUnitsId.value,
			manufacturerId: detailItemManufacturer.value,
			manufacturerStockId: detailItemManufacturerStockId.value,
			name: detailItemName.value,
			thinMill: detailItemThinMill.value
		};

		const temp = await serviceStore.dispatcher.requestPartsRecoverySearchResults(correlationId, request);
		results.value = temp.sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return v1.name.localeCompare(v2.name); })
		);
		return success(correlationId);
	};
	const resetAdditional = async (correlationId, ignoreSettings) => {
		detailItemManufacturer.value = null;
		detailItemManufacturerStockId.value = null;
		detailItemName.value = null;

		detailItemDiameterMax.value = null;
		detailItemDiameterMin.value = null;
		detailItemDiameterMeasurementUnitId.value = measurementUnitsLengthDefaultId.value;
		detailItemDiameterMeasurementUnitsId.value =  measurementUnitsIdSettings.value;

		detailItemLengthMax.value = null;
		detailItemLengthMin.value = null;
		detailItemLengthMeasurementUnitId.value = measurementUnitsLengthDefaultId.value;
		detailItemLengthMeasurementUnitsId.value = measurementUnitsIdSettings.value;

		detailItemThinMill.value = false;

		await preCompleteOk(correlationId);
	};

	onMounted(async () => {
		if (manufacturersI.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId());
		if (hasFailed(response))
			return;

		let temp2 = response.results.filter(l => l.types.find(j => 
			(j === AppCommonConstants.Rocketry.ManufacturerTypes.chuteProtector) ||
			(j === AppCommonConstants.Rocketry.ManufacturerTypes.deploymentBag) ||
			(j === AppCommonConstants.Rocketry.ManufacturerTypes.parachute) ||
			(j === AppCommonConstants.Rocketry.ManufacturerTypes.streamer)
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
		serviceStore,
		detailItemDiameterMax,
		detailItemDiameterMin,
		detailItemDiameterMeasurementUnitId,
		detailItemDiameterMeasurementUnitsId,
		detailItemLengthMax,
		detailItemLengthMin,
		detailItemLengthMeasurementUnitId,
		detailItemLengthMeasurementUnitsId,
		detailItemManufacturer,
		detailItemManufacturerStockId,
		detailItemName,
		detailItemThinMill,
		dialogRecoveryLookup,
		dialogResetManager,
		dialogResetMessage,
		manufacturersI,
		partTypes,
		results,
		manufacturers,
		buttonOkDisabledOverride,
		clickRecoverySearch,
		clickRecoverySearchClear,
		clickRecoverySelect,
		close,
		dialogResetOk,
		isPartType,
		manufacturer,
		partTypeName,
		preCompleteOk,
		resetAdditional,
		scope: 'RecoveryLookupDialog',
		validation: useVuelidate({ $scope: 'RecoveryLookupDialog' })
	};
};
</script>
