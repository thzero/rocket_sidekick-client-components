<script>
import { computed, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useDetailFormDialogComponent } from '@/components/content/detailFormDialogComponent';
import { useMotorUtilityComponent } from '@/components/external/motorUtilityComponent';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementBase';
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
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		measurementUnitsFromUnitId
	} = useToolsMeasurementUtilityComponent(props, context);

	const {
		detailItem,
		detailItemTextRows,
		dialogError,
		dialogClose,
		dialogOk,
		isEditable
	} = useDetailFormDialogComponent(props, context, options);

	const {
		motorImpulseClasses,
		motorMountDiameters,
		motorCaseInfo,
		motorMountDiameter,
		motorMountName,
		motorUrl
	} = useMotorUtilityComponent(props, context);

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
	const detailItemMotorCount0 = ref(null);
	const detailItemMotorCount1 = ref(null);
	const detailItemMotorCount2 = ref(null);
	const detailItemMotorDiameter0 = ref(null);
	const detailItemMotorDiameter1 = ref(null);
	const detailItemMotorDiameter2 = ref(null);
	const detailItemIndex = ref(null);
	const detailItemWeight = ref(null);
	const detailItemWeightMeasurementUnitId = ref(null);
	const detailItemWeightMeasurementUnitsId = ref(null);
	const motorCountI = ref(null);
	
	const displayName = computed(() => {
		return LibraryClientUtility.$trans.t('forms.content.rockets.name') + ' ' + LibraryClientUtility.$trans.t('forms.content.rockets.stage.name') + ' ' + 
		stageIndex.value;
	});
	const motorMountDiameters0 = computed(() => {
		return motorMountDiameters.value.filter(l => !(l.id === '' || l.id === null));
	});
	const stageIndex = computed(() => {
		return detailItemIndex.value ? detailItemIndex.value + 1 : null;
	});

	const motorCount = computed(() => {
		return props.detailItem && props.detailItem.motors ? props.detailItem.motors.length : 0;
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

		detailItemMotorCount0.value = value ? value.motors[0].count : null;
		detailItemMotorCount1.value = value ? value.motors[1].count : null;
		detailItemMotorCount2.value = value ? value.motors[2].count : null;
		detailItemMotorDiameter0.value = value ? value.motors[0].diameter : null;
		detailItemMotorDiameter1.value = value ? value.motors[1].diameter : null;
		detailItemMotorDiameter2.value = value ? value.motors[2].diameter : null;

		detailItemIndex.value = value ? value.index + 1 : null;

		detailItemWeight.value = value ? value.weight : null;
		detailItemWeightMeasurementUnitId.value = value ? value.weightMeasurementUnitId ?? measurementUnitsWeightDefaultId.value : measurementUnitsWeightDefaultId.value;
		detailItemWeightMeasurementUnitsId.value = value ? value.weightMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		motorCountI.value = value && value.motors ? value.motors.length : 0;
	};
	const setEditData = (correlationId, value) => {
		value.description = String.trim(detailItemDescription.value);

		value.cp = AppUtility.convertNumber(detailItemCp.value);
		value.cpFrom = detailItemCpFrom.value;
		value.cpMeasurementUnitId = detailItemCpMeasurementUnitId.value;
		// value.cpMeasurementUnitsId = detailItemCpMeasurementUnitsId.value;
		value.cpMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, detailItemCpMeasurementUnitId.value);
		
		value.diameterMajor = AppUtility.convertNumber(detailItemDiameterMajor.value);
		value.diameterMajorMeasurementUnitId = detailItemDiameterMajorMeasurementUnitId.value;
		// value.diameterMajorMeasurementUnitsId = detailItemDiameterMajorMeasurementUnitsId.value;
		value.diameterMajorMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, detailItemDiameterMajorMeasurementUnitId.value);
		
		value.diameterMinor = AppUtility.convertNumber(detailItemDiameterMinor.value);
		value.diameterMinorMeasurementUnitId = detailItemDiameterMinorMeasurementUnitId.value;
		// value.diameterMinorMeasurementUnitsId = detailItemDiameterMinorMeasurementUnitsId.value;
		value.diameterMinorMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, detailItemDiameterMinorMeasurementUnitId.value);

		value.length = AppUtility.convertNumber(detailItemLength.value);
		value.lengthMeasurementUnitId = detailItemLengthMeasurementUnitId.value;
		// value.lengthMeasurementUnitsId = detailItemLengthMeasurementUnitsId.value;
		value.lengthMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, detailItemLengthMeasurementUnitId.value);
		
		value.manufacturerId = detailItemManufacturer.value;
		value.manufacturerStockId = detailItemManufacturerStockId.value;

		value.motors[0].count = AppUtility.convertNumber(detailItemMotorCount0.value);
		value.motors[1].count = AppUtility.convertNumber(detailItemMotorCount1.value);
		value.motors[2].count = AppUtility.convertNumber(detailItemMotorCount2.value);

		value.motors[0].diameter = detailItemMotorDiameter0.value;
		value.motors[1].diameter = detailItemMotorDiameter1.value;
		value.motors[2].diameter = detailItemMotorDiameter2.value;
		
		value.weight = AppUtility.convertNumber(detailItemWeight.value);
		value.weightMeasurementUnitId = detailItemWeightMeasurementUnitId.value;
		// value.weightMeasurementUnitsId = detailItemWeightMeasurementUnitsId.value;
		value.weightMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.weight.id, detailItemWeightMeasurementUnitsId.value);
	};
	const resetAdditional = async (correlationId, previous) => {
		resetEditData(correlationId, detailItem.value);
	};
	const setAdditional = async (correlationId) => {
		setEditData(correlationId, detailItem.value);
	};

	watch(() => detailItemMotorDiameter0.value,
		(value) => {
			if (value)
				return;

			detailItemMotorCount0.value = null;
		}
	);
	watch(() => detailItemMotorDiameter1.value,
		(value) => {
			if (value)
				return;

			detailItemMotorCount1.value = null;
		}
	);
	watch(() => detailItemMotorDiameter2.value,
		(value) => {
			if (value)
				return;

			detailItemMotorCount2.value = null;
		}
	);

	return {
		detailItem,
		detailItemTextRows,
		dialogError,
		dialogClose,
		dialogOk,
		isEditable,
		motorMountDiameters,
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
		detailItemMotorCount0,
		detailItemMotorCount1,
		detailItemMotorCount2,
		detailItemMotorDiameter0,
		detailItemMotorDiameter1,
		detailItemMotorDiameter2,
		detailItemIndex,
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
		motorMountDiameters0,
		stageIndex,
		motorCount,
		preCompleteOk,
		resetAdditional,
		setAdditional,
		scope: 'RocketStageEditDialog',
		validation: useVuelidate({ $scope: 'RocketStageEditDialog' })
	};
};
</script>
