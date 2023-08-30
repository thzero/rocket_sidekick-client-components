<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useDetailFormDialogComponent } from '@/components/content/detailFormDialogComponent';
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRocketStageEditDialogComponent(props, context, options) {
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
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);
	
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
		detailItem,
		detailItemTextRows,
		dialogError,
		dialogClose,
		dialogOk,
		isEditable
	} = useDetailFormDialogComponent(props, context, options);

	const detailItemCp = ref(null);
	const detailItemCpFrom = ref(null);
	const detailItemCpMeasurementUnitId = ref(null);
	const detailItemCpMeasurementUnitsId = ref(null);
	const detailItemDescription = ref(null);
	const detailItemDiameterMajor = ref(null);
	const detailItemDiameterMajorMeasurementUnitId = ref(null);
	const detailItemDiameterMajorMeasurementUnitsId = ref(null);
	const detailItemDiameterMinor = ref(null);
	const detailItemDiameterMinorMeasurementUnitId = ref(null);
	const detailItemDiameterMinorMeasurementUnitsId = ref(null);
	const detailItemLength = ref(null);
	const detailItemLengthMeasurementUnitId = ref(null);
	const detailItemLengthMeasurementUnitsId = ref(null);
	const detailItemManufacturer = ref(null);
	const detailItemManufacturerStockId = ref(null);
	// const detailItemName = ref(null);
	const detailItemNumber = ref(null);
	const detailItemWeight = ref(null);
	const detailItemWeightMeasurementUnitId = ref(null);
	const detailItemWeightMeasurementUnitsId = ref(null);
	
	const displayName = computed(() => {
		return LibraryClientUtility.$trans.t('forms.content.rockets.name') + ' ' + LibraryClientUtility.$trans.t('forms.content.rockets.stage.name') + ' ' + 
		// (!String.isNullOrEmpty(detailItemName.value) ? `(${detailItemName.value})` : '');
		stageNumber.value;
	});
	const stageNumber = computed(() => {
		return detailItemNumber.value ? detailItemNumber.value + 1 : null;
	});

	const preCompleteOk = async (correlationId) => {
		await setAdditional(correlationId);

		if (!props.preCompleteOk)
			return error('useRocketStageEditDialogComponent', 'preCompleteOk', 'invalid preCompletedOk property', null, null, null, correlationId);

		// call the parent to tell them to save off the detail item
		return await props.preCompleteOk(correlationId, detailItem.value);
	};

	const resetEditData = (correlationId, value) => {
		detailItemDescription.value = value ? value.description : null;
		// detailItemName.value = value ? value.name : null;
		
		detailItemCp.value = value ? value.cp : null;
		detailItemCpFrom.value = value ? value.cpFrom : AppCommonConstants.Rocketry.Direction.Tip;
		detailItemCpMeasurementUnitId.value = value ? value.cpMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemCpMeasurementUnitsId.value = value ? value.cpMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemDiameterMajor.value = detailItem.value ? detailItem.value.diameterMajor : null;
		detailItemDiameterMajorMeasurementUnitId.value = detailItem.value ? detailItem.value.diameterMajorMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemDiameterMajorMeasurementUnitsId.value = detailItem.value ? detailItem.value.diameterMajorMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemDiameterMinor.value = detailItem.value ? detailItem.value.diameterMinor : null;
		detailItemDiameterMinorMeasurementUnitId.value = detailItem.value ? detailItem.value.diameterMinorMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemDiameterMinorMeasurementUnitsId.value = detailItem.value ? detailItem.value.diameterMinorMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		detailItemLength.value = value ? value.length : null;
		detailItemLengthMeasurementUnitId.value = value ? value.lengthMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemLengthMeasurementUnitsId.value = value ? value.lengthMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemManufacturer.value = value ? value.manufacturerId : null; // 'd37HEk5Wjm3mmV4InK90U';
		detailItemManufacturerStockId.value = value ? value.manufacturerStockId : null;

		detailItemNumber.value = value ? value.number : null;

		detailItemWeight.value = value ? value.weight : null;
		detailItemWeightMeasurementUnitId.value = value ? value.weightMeasurementUnitId ?? measurementUnitsWeightDefaultId.value : measurementUnitsWeightDefaultId.value;
		detailItemWeightMeasurementUnitsId.value = value ? value.weightMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
	};
	const setEditData = (correlationId, value) => {
		value.description = String.trim(detailItemDescription.value);
		// value.name = String.trim(detailItemName.value);

		value.cp = AppUtility.convertNumber(detailItemCp.value);
		value.cpFrom = detailItemCpFrom.value;
		value.cpMeasurementUnitId = detailItemCpMeasurementUnitId.value;
		value.cpMeasurementUnitsId = detailItemCpMeasurementUnitsId.value;
		
		value.diameterMajor = AppUtility.convertNumber(detailItemDiameterMajor.value);
		value.diameterMajorMeasurementUnitId = detailItemDiameterMajorMeasurementUnitId.value;
		value.diameterMajorMeasurementUnitsId = detailItemDiameterMajorMeasurementUnitsId.value;
		
		value.diameterMinor = AppUtility.convertNumber(detailItemDiameterMinor.value);
		value.diameterMinorMeasurementUnitId = detailItemDiameterMinorMeasurementUnitId.value;
		value.diameterMinorMeasurementUnitsId = detailItemDiameterMinorMeasurementUnitsId.value;

		value.length = AppUtility.convertNumber(detailItemLength.value);
		value.lengthMeasurementUnitId = detailItemLengthMeasurementUnitId.value;
		value.lengthMeasurementUnitsId = detailItemLengthMeasurementUnitsId.value;
		
		value.manufacturerId = detailItemManufacturer.value;
		value.manufacturerStockId = detailItemManufacturerStockId.value;
		
		value.weight = AppUtility.convertNumber(detailItemWeight.value);
		value.weightMeasurementUnitId = detailItemWeightMeasurementUnitId.value;
		value.weightMeasurementUnitsId = detailItemWeightMeasurementUnitsId.value;
	};
	const resetAdditional = async (correlationId, previous) => {
		resetEditData(correlationId, detailItem.value);
	};
	const setAdditional = async (correlationId) => {
		setEditData(correlationId, detailItem.value);
	};

	return {
		detailItem,
		detailItemTextRows,
		dialogError,
		dialogClose,
		dialogOk,
		isEditable,
		detailItemCp,
		detailItemCpFrom,
		detailItemCpMeasurementUnitId,
		detailItemCpMeasurementUnitsId,
		detailItemDescription,
		detailItemDiameterMajor,
		detailItemDiameterMajorMeasurementUnitId,
		detailItemDiameterMajorMeasurementUnitsId,
		detailItemDiameterMinor,
		detailItemDiameterMinorMeasurementUnitId,
		detailItemDiameterMinorMeasurementUnitsId,
		detailItemLength,
		detailItemLengthMeasurementUnitId,
		detailItemLengthMeasurementUnitsId,
		detailItemManufacturer,
		detailItemManufacturerStockId,
		// detailItemName,
		detailItemNumber,
		detailItemWeight,
		detailItemWeightMeasurementUnitId,
		detailItemWeightMeasurementUnitsId,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		resetEditData,
		setEditData,
		displayName,
		stageNumber,
		preCompleteOk,
		resetAdditional,
		setAdditional,
		scope: 'RocketEditDialog',
		validation: useVuelidate({ $scope: 'RocketEditDialog' })
	};
};
</script>
