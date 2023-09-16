<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useDetailFormDialogComponent } from '@/components/content/detailFormDialogComponent';
import { useMotorLookupComponent } from '@/components/external/motorLookupComponent';
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

	const {
		motorDiameters,
		motorImpulseClasses,
		motorCaseInfo,
		motorDiameter,
		motorUrl
	} = useMotorLookupComponent(props, context);

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
	const dialogPartsSearchMotorsDiameter = ref(null);
	const dialogPartsSearchMotorIndex = ref(null);
	const dialogPartsSearchMotorsManager = ref(new DialogSupport());
	const dialogPartsSearchMotorCasesManager = ref(new DialogSupport());
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
		dialogPartsSearchMotorsDiameter.value = diameter;
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
	const preCompleteOk = async (correlationId) => {
		await setAdditional(correlationId);

		if (!props.preCompleteOk)
			return error('useRocketSetupStageEditDialogComponent', 'preCompleteOk', 'invalid preCompletedOk property', null, null, null, correlationId);

		// call the parent to tell them to save off the detail item
		return await props.preCompleteOk(correlationId, detailItem.value);
	};

	const resetAdditional = async (correlationId, previous) => {
		resetEditData(correlationId, detailItem.value);
	};
	const resetEditData = (correlationId, value) => {
		detailItemNotes.value = value ? value.name : null;
		
		detailItemCg.value = value ? value.cg : null;
		detailItemCgFrom.value = value ? value.cgFrom : AppCommonConstants.Rocketry.Direction.Tip;
		detailItemCgMeasurementUnitId.value = value ? value.cgMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemCgMeasurementUnitsId.value = value ? value.cgMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemMotor0.value = null;
		detailItemMotor1.value = null;
		detailItemMotor2.value = null;
		detailItemMotorCase0.value = null;
		detailItemMotorCase1.value = null;
		detailItemMotorCase2.value = null;
		detailItemMotorCaseId0.value = null;
		detailItemMotorCaseId1.value = null;
		detailItemMotorCaseId2.value = null;
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
		const fromRocket = value && value.fromRocket ? value.fromRocket : null;
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

				temp = selectMotorByIndex(index);
				if (!temp)
					continue;

				temp2 = (value.motors ?? [])[index];
				if (!temp2)
					continue;

				diameter = item.diameter ? motorDiameter(item.diameter) : null;
				count = item.count ? item.count : null;
				temp.motorInfo.value = `${diameter}${diameter ? ' x ' : ''}${count}`;

				temp.motorCase.value = generateTitle(temp2.motorCaseManufacturerId, temp2.motorCaseName);
				temp.motorCaseId.value = temp2.motorCaseId;
				temp.motorDelay.value = temp2.delay;
				temp.motorDiameter.value = item.diameter;
				temp.motor.value = generateTitle(temp2.motorManufacturerId, temp2.motorName);
				temp.motorId.value = temp2.motorId;
			}
		}
		
		detailItemWeight.value = value ? value.weight : null;
		detailItemWeightMeasurementUnitId.value = value ? value.weightMeasurementUnitId ?? measurementUnitsWeightDefaultId.value : measurementUnitsWeightDefaultId.value;
		detailItemWeightMeasurementUnitsId.value = value ? value.weightMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
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
			motorDiameter: null,
			motorDelay: null,
			motorId: null,
			motorInfo: null
		}

		if (index === 0) {
			temp.motor = detailItemMotor0;
			temp.motorCase = detailItemMotorCase0;
			temp.motorCaseId = detailItemMotorCaseId0;
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
		setEditData(correlationId, detailItem.value);
	};
	const setEditData = (correlationId, value) => {
		value.notes = String.trim(detailItemNotes.value);

		value.cg = AppUtility.convertNumber(detailItemCg.value);
		value.cgFrom = detailItemCgFrom.value;
		value.cgMeasurementUnitId = detailItemCgMeasurementUnitId.value;
		value.cgMeasurementUnitsId = detailItemCgMeasurementUnitsId.value;

		value.motors = value.motors ?? [];

		let temp;
		let index = -1;
		for (const item of value.fromRocket.motors) {
			index++;
			temp = selectMotorByIndex(index);
			if (!temp)
				continue;

			value.motors[index] = value.motors[index] ?? {};
			value.motors[index].index = item.index;
			value.motors[index].motorCaseId = temp.motorCaseId.value;
			value.motors[index].motorDelay = temp.motorDelay.value;
			value.motors[index].motorId = temp.motorId.value;
		}

		value.weight = AppUtility.convertNumber(detailItemWeight.value);
		value.weightMeasurementUnitId = detailItemWeightMeasurementUnitId.value;
		value.weightMeasurementUnitsId = detailItemWeightMeasurementUnitsId.value;
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
		dialogPartsSearchMotorsManager,
		dialogPartsSearchMotorCasesManager,
		dialogPartsSearchMotorsDiameter,
		manufacturerTypeMotor,
		manufacturerTypeMotorCase,
		displayName,
		stageNumber,
		clickMotorsSearch,
		clickMotorCasesSearch,
		preCompleteOk,
		resetAdditional,
		selectMotor,
		selectMotorCase,
		setAdditional,
		resetEditData,
		setEditData,
		scope: 'RocketStageEditDialog',
		validation: useVuelidate({ $scope: 'RocketStageEditDialog' })
	};
};
</script>
