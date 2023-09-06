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
		motorUrl
	} = useMotorLookupComponent(props, context);

	const detailItemCg = ref(null);
	const detailItemCgFrom = ref(null);
	const detailItemCgMeasurementUnitId = ref(null);
	const detailItemCgMeasurementUnitsId = ref(null);
	const detailItemDescription = ref(null);
	const detailItemNotes = ref(null);
	const detailItemWeight = ref(null);
	const detailItemWeightMeasurementUnitId = ref(null);
	const detailItemWeightMeasurementUnitsId = ref(null);
	
	const displayName = computed(() => {
		return LibraryClientUtility.$trans.t('forms.content.rockets.name') + ' ' + LibraryClientUtility.$trans.t('forms.content.rockets.stage.name') + ' ' + 
		stageNumber.value;
	});
	const stageNumber = computed(() => {
		if (!detailItem.value)
			return null;

		return detailItem.value.number + 1;
	});

	const preCompleteOk = async (correlationId) => {
		await setAdditional(correlationId);

		if (!props.preCompleteOk)
			return error('useRocketSetupStageEditDialogComponent', 'preCompleteOk', 'invalid preCompletedOk property', null, null, null, correlationId);

		// call the parent to tell them to save off the detail item
		return await props.preCompleteOk(correlationId, detailItem.value);
	};

	const resetEditData = (correlationId, value) => {
		detailItemDescription.value = value ? value.description : null;
		detailItemNotes.value = value ? value.name : null;
		
		detailItemCg.value = value ? value.cg : null;
		detailItemCgFrom.value = value ? value.cgFrom : AppCommonConstants.Rocketry.Direction.Tip;
		detailItemCgMeasurementUnitId.value = value ? value.cgMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemCgMeasurementUnitsId.value = value ? value.cgMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemWeight.value = value ? value.weight : null;
		detailItemWeightMeasurementUnitId.value = value ? value.weightMeasurementUnitId ?? measurementUnitsWeightDefaultId.value : measurementUnitsWeightDefaultId.value;
		detailItemWeightMeasurementUnitsId.value = value ? value.weightMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
	};
	const setEditData = (correlationId, value) => {
		value.description = String.trim(detailItemDescription.value);
		value.notes = String.trim(detailItemNotes.value);

		value.cg = AppUtility.convertNumber(detailItemCg.value);
		value.cgFrom = detailItemCgFrom.value;
		value.cgMeasurementUnitId = detailItemCgMeasurementUnitId.value;
		value.cgMeasurementUnitsId = detailItemCgMeasurementUnitsId.value;

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
		motorDiameters,
		isEditable,
		detailItemCg,
		detailItemCgFrom,
		detailItemCgMeasurementUnitId,
		detailItemCgMeasurementUnitsId,
		detailItemDescription,
		detailItemNotes,
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
