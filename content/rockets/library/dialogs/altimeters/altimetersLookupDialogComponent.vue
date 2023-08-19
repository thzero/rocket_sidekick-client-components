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

export function useAltimetersRocketLookupDialogComponent(props, context, options) {
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

	const detailItemManufacturer = ref(null);
	const detailItemManufacturerStockId = ref(null);
	const detailItemName = ref(null);
	const dialogAltimetersLookup = ref(null);
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
	const clickAltimetersSearch = async () => {
		await dialogAltimetersLookup.value.submit(correlationId());
	};
	const clickAltimetersSearchClear = async () => {
		await dialogAltimetersLookup.value.reset(correlationId(), null, true);
	};
	const clickAltimetersSelect = async (item) => {
		context.emit('ok', item);
	};
	const close = () => {
		context.emit('close');
	};
	const dialogResetOk = async () => {
		dialogResetManager.value.ok();
		const correlationIdI = correlationId();
		await serviceStore.dispatcher.requestPartsAltimetersSearchReset(correlationIdI);
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
			manufacturerId: detailItemManufacturer.value,
			manufacturerStockId: detailItemManufacturerStockId.value,
			name: detailItemName.value
		};

		const temp = await serviceStore.dispatcher.requestPartsAltimetersSearchResults(correlationId, request);
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

		await preCompleteOk(correlationId);
	};

	onMounted(async () => {
		if (manufacturersI.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId());
		if (hasFailed(response))
			return;

		let temp2 = response.results.filter(l => l.types.find(j => 
			(j === AppCommonConstants.Rocketry.ManufacturerTypes.altimeter) ||
			(j === AppCommonConstants.Rocketry.ManufacturerTypes.chuteRelease)
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
		detailItemManufacturer,
		detailItemManufacturerStockId,
		detailItemName,
		dialogAltimetersLookup,
		dialogResetManager,
		dialogResetMessage,
		manufacturersI,
		partTypes,
		results,
		manufacturers,
		buttonOkDisabledOverride,
		clickAltimetersSearch,
		clickAltimetersSearchClear,
		clickAltimetersSelect,
		close,
		dialogResetOk,
		isPartType,
		manufacturer,
		partTypeName,
		preCompleteOk,
		resetAdditional,
		scope: 'AltimetersLookupDialog',
		validation: useVuelidate({ $scope: 'AltimetersLookupDialog' })
	};
};
</script>
