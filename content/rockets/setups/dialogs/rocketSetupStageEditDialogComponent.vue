<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useDetailFormDialogComponent } from '@/components/content/detailFormDialogComponent';
import { useMotorUtilityComponent } from '@/components/external/motorUtilityComponent';
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

export function useRocketSetupStageEditDialogComponent(props, context, options) {
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
		// measurementUnitsIdSettings,
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsAreaDefaultId,
		measurementUnitsAreaType,
		measurementUnitsAltitudeDefaultId,
		measurementUnitsAltitudeType,
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
		measurementUnitsWeightType,
		displayItemMeasurement,
		displayItemMeasurementLength,
		displayItemMeasurementWeight,
		measurementUnitsFromUnitId
	} = useToolsMeasurementBaseComponent(props, context);

	const {
		detailItem,
		detailItemTextRows,
		dialogError,
		dialogClose,
		dialogOk,
		isEditable
	} = useDetailFormDialogComponent(props, context, options);

	const {
		motorDiameters,
		motorImpulseClasses,
		motorCaseInfo,
		motorDiameter,
		motorUrl
	} = useMotorUtilityComponent(props, context);

	const detailItemCg = ref(null);
	const detailItemCgFrom = ref(null);
	const detailItemCgMeasurementUnitId = ref(null);
	const detailItemCgMeasurementUnitsId = ref(null);
	const detailItemMotor0 = ref(null);
	const detailItemMotor1 = ref(null);
	const detailItemMotor2 = ref(null);
	const detailItemMotorCase0 = ref(null);
	const detailItemMotorCase1 = ref(null);
	const detailItemMotorCase2 = ref(null);
	const detailItemMotorCaseId0 = ref(null);
	const detailItemMotorCaseId1 = ref(null);
	const detailItemMotorCaseId2 = ref(null);
	const detailItemMotorCaseInfo0 = ref(null);
	const detailItemMotorCaseInfo1 = ref(null);
	const detailItemMotorCaseInfo2 = ref(null);
	const detailItemMotorDelay0 = ref(null);
	const detailItemMotorDelay1 = ref(null);
	const detailItemMotorDelay2 = ref(null);
	const detailItemMotorDiameter0 = ref(null);
	const detailItemMotorDiameter1 = ref(null);
	const detailItemMotorDiameter2 = ref(null);
	const detailItemMotorId0 = ref(null);
	const detailItemMotorId1 = ref(null);
	const detailItemMotorId2 = ref(null);
	const detailItemMotorInfo0 = ref(null);
	const detailItemMotorInfo1 = ref(null);
	const detailItemMotorInfo2 = ref(null);
	const detailItemNotes = ref(null);
	const detailItemWeight = ref(null);
	const detailItemWeightMeasurementUnitId = ref(null);
	const detailItemWeightMeasurementUnitsId = ref(null);
	const detailItemWeightNose = ref(null);
	const detailItemWeightNoseMeasurementUnitId = ref(null);
	const detailItemWeightNoseMeasurementUnitsId = ref(null);
	const dialogPartsSearchMotorCasesDetail = ref(null);
	const dialogPartsSearchMotorCasesDiameter = ref(null);
	const dialogPartsSearchMotorCasesManager = ref(new DialogSupport());
	const dialogPartsSearchMotorsDiameter = ref(null);
	const dialogPartsSearchMotorIndex = ref(null);
	const dialogPartsSearchMotorsManager = ref(new DialogSupport());
	const hasMotorsI = ref([]);
	const manufacturerTypeMotor = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.motor ]);
	const manufacturerTypeMotorCase = ref([ AppCommonConstants.Rocketry.ManufacturerTypes.motorCase ]);
	
	const displayName = computed(() => {
		return LibraryClientUtility.$trans.t('forms.content.rockets.name') + ' ' + LibraryClientUtility.$trans.t('forms.content.rockets.stage.name') + ' ' + 
		stageNumber.value;
	});
	const stageNumber = computed(() => {
		if (!detailItem.value)
			return null;

		return detailItem.value.index + 1;
	});

	const clickMotorsSearch = async (index, diameter) => {
		dialogPartsSearchMotorsDiameter.value = diameter;
		dialogPartsSearchMotorIndex.value = index;
		dialogPartsSearchMotorsManager.value.open();
	};
	const clickMotorCasesSearch = async (index, diameter) => {
		const temp = selectMotorByIndex(index);
		dialogPartsSearchMotorCasesDiameter.value = diameter;
		dialogPartsSearchMotorCasesDetail.value = temp ? temp.motorCaseInfo.value : null;
		dialogPartsSearchMotorIndex.value = index;
		dialogPartsSearchMotorCasesManager.value.open();
	};
	const generateTitle = (id, name) => {
		if (String.isNullOrEmpty(name))
			return '';
		let manufacturer = null;
		if (props.manufacturers)
			manufacturer = props.manufacturers.find(l => l.id === id);

		return `${manufacturer ? manufacturer.abbrev : ''} ${name}`.trim();
	};
	const hasMotor = (index) => {
		return hasMotorsI.value ? hasMotorsI.value.includes(index) : false;
	};
	const preCompleteOk = async (correlationId) => {
		await setAdditional(correlationId);

		if (!props.preCompleteOk)
			return error('useRocketSetupStageEditDialogComponent', 'preCompleteOk', 'invalid preCompletedOk property', null, null, null, correlationId);

		// call the parent to tell them to save off the detail item
		return await props.preCompleteOk(correlationId, detailItem.value);
	};
	const resetAdditional = async (correlationId, previous) => {
		detailItemNotes.value = detailItem.value ? detailItem.value.name : null;
		
		detailItemCg.value = detailItem.value ? detailItem.value.cg : null;
		detailItemCgFrom.value = detailItem.value ? detailItem.value.cgFrom : AppCommonConstants.Rocketry.Direction.Tip;
		detailItemCgMeasurementUnitId.value = detailItem.value ? detailItem.value.cgMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemCgMeasurementUnitsId.value = detailItem.value ? detailItem.value.cgMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemMotor0.value = null;
		detailItemMotor1.value = null;
		detailItemMotor2.value = null;
		detailItemMotorCase0.value = null;
		detailItemMotorCase1.value = null;
		detailItemMotorCase2.value = null;
		detailItemMotorCaseId0.value = null;
		detailItemMotorCaseId1.value = null;
		detailItemMotorCaseId2.value = null;
		detailItemMotorCaseInfo0.value = null;
		detailItemMotorCaseInfo1.value = null;
		detailItemMotorCaseInfo2.value = null;
		detailItemMotorDelay0.value = null;
		detailItemMotorDelay1.value = null;
		detailItemMotorDelay2.value = null;
		detailItemMotorDiameter0.value = null;
		detailItemMotorDiameter1.value = null;
		detailItemMotorDiameter2.value = null;
		detailItemMotorId0.value = null;
		detailItemMotorId1.value = null;
		detailItemMotorId2.value = null;
		detailItemMotorInfo0.value = null;
		detailItemMotorInfo1.value = null;
		detailItemMotorInfo2.value = null;
		hasMotorsI.value = [];
		const fromRocket = detailItem.value && detailItem.value.fromRocket ? detailItem.value.fromRocket : null;
		if (fromRocket) {
			let temp;
			let temp2;
			let index = -1;
			let diameter;
			let count;
			for (const item of fromRocket.motors) {
				index++;
				if (!item.diameter || !item.count)
					continue;

				if (index > 2)
					break;
				
				hasMotorsI.value.push(index);

				temp = selectMotorByIndex(index);
				if (!temp)
					continue;

				diameter = item.diameter ? motorDiameter(item.diameter) : null;
				count = item.count ? item.count : null;
				temp.motorInfo.value = `${diameter}${diameter ? ' x ' : ''}${count}`;

				temp2 = (detailItem.value.motors ?? []).find(l => l.index === item.index);
				if (!temp2)
					continue;

				temp.motorCase.value = generateTitle(temp2.motorCaseManufacturerId, temp2.motorCaseName);
				temp.motorCaseId.value = temp2.motorCaseId;
				temp.motorCaseInfo.value = temp2.motorCaseInfo;
				temp.motorDelay.value = temp2.motorDelay;
				temp.motorDiameter.value = item.diameter;
				temp.motor.value = generateTitle(temp2.motorManufacturerId, temp2.motorName);
				temp.motorId.value = temp2.motorId;
			}
		}
		
		detailItemWeight.value = detailItem.value ? detailItem.value.weight : null;
		detailItemWeightMeasurementUnitId.value = detailItem.value ? detailItem.value.weightMeasurementUnitId ?? measurementUnitsWeightDefaultId.value : measurementUnitsWeightDefaultId.value;
		detailItemWeightMeasurementUnitsId.value = detailItem.value ? detailItem.value.weightMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemWeightNose.value = detailItem.value ? detailItem.value.weightNose : null;
		detailItemWeightNoseMeasurementUnitId.value = detailItem.value ? detailItem.value.weightMeasurementUnitId ?? measurementUnitsWeightDefaultId.value : measurementUnitsWeightDefaultId.value;
		detailItemWeightNoseMeasurementUnitsId.value = detailItem.value ? detailItem.value.weightMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
	};
	const selectMotor = async (item) => {
		try {
			if (!item)
				return;
			const temp = selectMotorByIndex(dialogPartsSearchMotorIndex.value);
			if (!temp)
				return;

			temp.motor.value = generateTitle(item.manufacturerId, item.name);
			temp.motorId.value = item.id;
		}
		finally {
			dialogPartsSearchMotorsManager.value.ok();
		}
	};
	const selectMotorByIndex = (index) => {
		const temp = {
			motor: null,
			motorCase: null,
			motorCaseId: null,
			motorCaseInfo: null,
			motorDiameter: null,
			motorDelay: null,
			motorId: null,
			motorInfo: null
		}

		if (index === 0) {
			temp.motor = detailItemMotor0;
			temp.motorCase = detailItemMotorCase0;
			temp.motorCaseId = detailItemMotorCaseId0;
			temp.motorCaseInfo = detailItemMotorCaseInfo0;
			temp.motorDelay = detailItemMotorDelay0;
			temp.motorDiameter = detailItemMotorDiameter0;
			temp.motorId = detailItemMotorId0;
			temp.motorInfo = detailItemMotorInfo0;
			return temp;
		}
		if (index === 1) {
			temp.motor = detailItemMotor1;
			temp.motorCase = detailItemMotorCase1;
			temp.motorCaseId = detailItemMotorCaseId1;
			temp.motorCaseInfo = detailItemMotorCaseInfo1;
			temp.motorDelay = detailItemMotorDelay1;
			temp.motorDiameter = detailItemMotorDiameter1;
			temp.motorId = detailItemMotorId1;
			temp.motorInfo = detailItemMotorInfo1;
			return temp;
		}
		if (index === 2) {
			temp.motor = detailItemMotor2;
			temp.motorCase = detailItemMotorCase2;
			temp.motorCaseId = detailItemMotorCaseId2;
			temp.motorCaseInfo = detailItemMotorCaseInfo2;
			temp.motorDelay = detailItemMotorDelay2;
			temp.motorDiameter = detailItemMotorDiameter2;
			temp.motorId = detailItemMotorId2;
			temp.motorInfo = detailItemMotorInfo2;
			return temp;
		}

		return null;
	};
	const selectMotorCase = async (item) => {
		try {
			if (!item)
				return;
			const temp = selectMotorByIndex(dialogPartsSearchMotorIndex.value);
			if (!temp)
				return;

			temp.motorCase.value = generateTitle(item.manufacturerId, item.name);
			temp.motorCaseId.value = item.id;
		}
		finally {
			dialogPartsSearchMotorCasesManager.value.ok();
		}
	};
	const setAdditional = async (correlationId) => {
		detailItem.value.notes = String.trim(detailItemNotes.value);

		detailItem.value.cg = AppUtility.convertNumber(detailItemCg.value);
		detailItem.value.cgFrom = detailItemCgFrom.value;
		detailItem.value.cgMeasurementUnitId = detailItemCgMeasurementUnitId.value;
		// detailItem.value.cgMeasurementUnitsId = detailItemCgMeasurementUnitsId.value;
		detailItem.value.cgMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, detailItemCgMeasurementUnitId.value);

		detailItem.value.motors = detailItem.value.motors ?? [];

		let temp;
		let index = -1;
		for (const item of detailItem.value.fromRocket.motors) {
			index++;
			temp = selectMotorByIndex(index);
			if (!temp)
				continue;

			detailItem.value.motors[index] = detailItem.value.motors[index] ?? {};
			detailItem.value.motors[index].index = item.index;
			detailItem.value.motors[index].motorCaseId = temp.motorCaseId.value;
			detailItem.value.motors[index].motorDelay = temp.motorDelay.value;
			detailItem.value.motors[index].motorId = temp.motorId.value;
		}

		detailItem.value.weight = AppUtility.convertNumber(detailItemWeight.value);
		detailItem.value.weightMeasurementUnitId = detailItemWeightMeasurementUnitId.value;
		// detailItem.value.weightMeasurementUnitsId = detailItemWeightMeasurementUnitsId.value;
		detailItem.value.weightMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.weight.id, detailItemWeightMeasurementUnitId.value);
	
		detailItem.value.weightNose = AppUtility.convertNumber(detailItemWeightNose.value);
		detailItem.value.weightNoseMeasurementUnitId = detailItemWeightNoseMeasurementUnitId.value;
		// detailItem.value.weightNoseMeasurementUnitsId = detailItemWeightNoseMeasurementUnitsId.value;
		detailItem.value.weightNoseMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.weight.id, detailItemWeightNoseMeasurementUnitId.value);
	};

	return {
		detailItem,
		detailItemTextRows,
		dialogError,
		dialogClose,
		dialogOk,
		motorDiameters,
		isEditable,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		detailItemCg,
		detailItemCgFrom,
		detailItemCgMeasurementUnitId,
		detailItemCgMeasurementUnitsId,
		detailItemMotor0,
		detailItemMotor1,
		detailItemMotor2,
		detailItemMotorCase0,
		detailItemMotorCase1,
		detailItemMotorCase2,
		detailItemMotorCaseId0,
		detailItemMotorCaseId1,
		detailItemMotorCaseId2,
		detailItemMotorCaseInfo0,
		detailItemMotorCaseInfo1,
		detailItemMotorCaseInfo2,
		detailItemMotorDelay0,
		detailItemMotorDelay1,
		detailItemMotorDelay2,
		detailItemMotorDiameter0,
		detailItemMotorDiameter1,
		detailItemMotorDiameter2,
		detailItemMotorInfo0,
		detailItemMotorInfo1,
		detailItemMotorInfo2,
		detailItemMotorId0,
		detailItemMotorId1,
		detailItemMotorId2,
		detailItemNotes,
		detailItemWeight,
		detailItemWeightMeasurementUnitId,
		detailItemWeightMeasurementUnitsId,
		detailItemWeightNose,
		detailItemWeightNoseMeasurementUnitId,
		detailItemWeightNoseMeasurementUnitsId,
		dialogPartsSearchMotorCasesDetail,
		dialogPartsSearchMotorCasesDiameter,
		dialogPartsSearchMotorCasesManager,
		dialogPartsSearchMotorsManager,
		dialogPartsSearchMotorsDiameter,
		manufacturerTypeMotor,
		manufacturerTypeMotorCase,
		displayName,
		stageNumber,
		clickMotorsSearch,
		clickMotorCasesSearch,
		hasMotor,
		preCompleteOk,
		resetAdditional,
		selectMotor,
		selectMotorCase,
		setAdditional,
		scope: 'RocketStageEditDialog',
		validation: useVuelidate({ $scope: 'RocketStageEditDialog' })
	};
};
</script>
