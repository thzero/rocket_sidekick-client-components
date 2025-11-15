<script>
import { computed, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useDetailFormDialogComponent } from '@/components/content/detailFormDialogComponent';
import { useMotorUtilityComponent } from '@/components/external/motorUtilityComponent';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementUtilityComponent';
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
	const detailItemEjectionDrogue = ref(null);
	const detailItemEjectionDrogueMeasurementUnitId = ref(null);
	const detailItemEjectionDrogueMeasurementUnitsId = ref(null);
	const detailItemEjectionDrogueBackup = ref(null);
	const detailItemEjectionDrogueBackupMeasurementUnitId = ref(null);
	const detailItemEjectionDrogueBackupMeasurementUnitsId = ref(null);
	const detailItemEjectionMain = ref(null);
	const detailItemEjectionMainMeasurementUnitId = ref(null);
	const detailItemEjectionMainMeasurementUnitsId = ref(null);
	const detailItemEjectionMainBackup = ref(null);
	const detailItemEjectionMainBackupMeasurementUnitId = ref(null);
	const detailItemEjectionMainBackupMeasurementUnitsId = ref(null);
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
		
		detailItemEjectionDrogue.value = (detailItem.value && detailItem.value.ejection) ? detailItem.value.ejection.drogue : null;
		detailItemEjectionDrogueMeasurementUnitId.value = detailItem.value && detailItem.value.ejection ? detailItem.value.ejection.drogueMeasurementUnitId ?? 'g' : 'g';
		detailItemEjectionDrogueMeasurementUnitsId.value = detailItem.value && detailItem.value.ejection ? detailItem.value.ejection.drogueMeasurementUnitsId ?? 'metrics' : 'metrics';
		
		detailItemEjectionDrogueBackup.value = (detailItem.value && detailItem.value.ejection) ? detailItem.value.ejection.drogueBackup : null;
		detailItemEjectionDrogueBackupMeasurementUnitId.value = detailItem.value && detailItem.value.ejection ? detailItem.value.ejection.drogueBackupMeasurementUnitId ?? 'g' : 'g';
		detailItemEjectionDrogueBackupMeasurementUnitsId.value = detailItem.value && detailItem.value.ejection ? detailItem.value.ejection.drogueBackupMeasurementUnitId ?? 'metrics' : 'metrics';
		
		detailItemEjectionMain.value = (detailItem.value && detailItem.value.ejection) ? detailItem.value.ejection.main : null;
		detailItemEjectionMainMeasurementUnitId.value = detailItem.value && detailItem.value.ejection ? detailItem.value.ejection.mainMeasurementUnitId ?? 'g' : 'g';
		detailItemEjectionMainMeasurementUnitsId.value = detailItem.value && detailItem.value.ejection ? detailItem.value.ejection.mainMeasurementUnitId ?? 'metrics' : 'metrics';
		
		detailItemEjectionMainBackup.value = (detailItem.value && detailItem.value.ejection) ? detailItem.value.ejection.mainBackup : null;
		detailItemEjectionMainBackupMeasurementUnitId.value = detailItem.value && detailItem.value.ejection ? detailItem.value.ejection.mainBackupMeasurementUnitId ?? 'g' : 'g';
		detailItemEjectionMainBackupMeasurementUnitsId.value = detailItem.value && detailItem.value.ejection ? detailItem.value.ejection.mainBackupMeasurementUnitId ?? 'metrics' : 'metrics';
		
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

		value.cp = LibraryClientUtility.convertNumber(detailItemCp.value);
		value.cpFrom = detailItemCpFrom.value;
		value.cpMeasurementUnitId = detailItemCpMeasurementUnitId.value;
		// value.cpMeasurementUnitsId = detailItemCpMeasurementUnitsId.value;
		value.cpMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, detailItemCpMeasurementUnitId.value);
		
		value.diameterMajor = LibraryClientUtility.convertNumber(detailItemDiameterMajor.value);
		value.diameterMajorMeasurementUnitId = detailItemDiameterMajorMeasurementUnitId.value;
		// value.diameterMajorMeasurementUnitsId = detailItemDiameterMajorMeasurementUnitsId.value;
		value.diameterMajorMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, detailItemDiameterMajorMeasurementUnitId.value);
		
		value.diameterMinor = LibraryClientUtility.convertNumber(detailItemDiameterMinor.value);
		value.diameterMinorMeasurementUnitId = detailItemDiameterMinorMeasurementUnitId.value;
		// value.diameterMinorMeasurementUnitsId = detailItemDiameterMinorMeasurementUnitsId.value;
		value.diameterMinorMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, detailItemDiameterMinorMeasurementUnitId.value);
		
		value.ejection = detailItem.value.ejection ? detailItem.value.ejection : {};
		value.ejection.drogue = LibraryClientUtility.convertNumber(detailItemEjectionDrogue.value);
		value.ejection.drogueMeasurementUnitId = detailItemEjectionDrogueMeasurementUnitId.value;
		value.ejection.drogueMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.weight.id, detailItemEjectionDrogueMeasurementUnitId.value);
	
		value.ejection.drogueBackup = LibraryClientUtility.convertNumber(detailItemEjectionDrogueBackup.value);
		value.ejection.drogueBackupMeasurementUnitId = detailItemEjectionDrogueBackupMeasurementUnitId.value;
		value.ejection.drogueBackupMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.weight.id, detailItemEjectionDrogueBackupMeasurementUnitId.value);

		value.ejection.main = LibraryClientUtility.convertNumber(detailItemEjectionMain.value);
		value.ejection.mainMeasurementUnitId = detailItemEjectionMainMeasurementUnitId.value;
		value.ejection.mainMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.weight.id, detailItemEjectionMainMeasurementUnitId.value);

		value.ejection.mainBackup = LibraryClientUtility.convertNumber(detailItemEjectionMainBackup.value);
		value.ejection.mainBackupMeasurementUnitId = detailItemEjectionMainBackupMeasurementUnitId.value;
		value.ejection.mainBackupMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.weight.id, detailItemEjectionMainBackupMeasurementUnitId.value);

		value.length = LibraryClientUtility.convertNumber(detailItemLength.value);
		value.lengthMeasurementUnitId = detailItemLengthMeasurementUnitId.value;
		// value.lengthMeasurementUnitsId = detailItemLengthMeasurementUnitsId.value;
		value.lengthMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, detailItemLengthMeasurementUnitId.value);
		
		value.manufacturerId = detailItemManufacturer.value;
		value.manufacturerStockId = detailItemManufacturerStockId.value;

		value.motors[0].count = LibraryClientUtility.convertNumber(detailItemMotorCount0.value);
		value.motors[1].count = LibraryClientUtility.convertNumber(detailItemMotorCount1.value);
		value.motors[2].count = LibraryClientUtility.convertNumber(detailItemMotorCount2.value);

		value.motors[0].diameter = detailItemMotorDiameter0.value;
		value.motors[1].diameter = detailItemMotorDiameter1.value;
		value.motors[2].diameter = detailItemMotorDiameter2.value;
		
		value.weight = LibraryClientUtility.convertNumber(detailItemWeight.value);
		value.weightMeasurementUnitId = detailItemWeightMeasurementUnitId.value;
		// value.weightMeasurementUnitsId = detailItemWeightMeasurementUnitsId.value;
		value.weightMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.weight.id, detailItemWeightMeasurementUnitId.value);
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
		detailItemEjectionDrogue,
		detailItemEjectionDrogueMeasurementUnitId,
		detailItemEjectionDrogueMeasurementUnitsId,
		detailItemEjectionDrogueBackup,
		detailItemEjectionDrogueBackupMeasurementUnitId,
		detailItemEjectionDrogueBackupMeasurementUnitsId,
		detailItemEjectionMain,
		detailItemEjectionMainMeasurementUnitId,
		detailItemEjectionMainMeasurementUnitsId,
		detailItemEjectionMainBackup,
		detailItemEjectionMainBackupMeasurementUnitId,
		detailItemEjectionMainBackupMeasurementUnitsId,
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
