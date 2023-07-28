<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useDetailFormDialogComponent } from '@/components/content/detailFormDialogComponent';
import { useRocketEditComponent } from '@/components/content/rockets/user/rocket/rocketEditComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRocketEditDialogComponent(props, context, options) {
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
		detailItem,
		detailItemTextRows,
		dialogError,
		dialogClose,
		dialogOk,
		isEditable
	} = useDetailFormDialogComponent(props, context, options);
	
	const {
		cgMeasurementUnitId,
		cgMeasurementUnitsId,
		cpMeasurementUnitId,
		cpMeasurementUnitsId,
		detailItemCg,
		detailItemCgFrom,
		detailItemCp,
		detailItemCpFrom,
		detailItemDescription,
		detailItemLength,
		detailItemName,
		detailItemWeight,
		lengthMeasurementUnitId,
		lengthMeasurementUnitsId,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		weightMeasurementUnitId,
		weightMeasurementUnitsId,
		resetEditData,
		setEditData
	} = useRocketEditComponent(props, context, options);

	const detailItemDiameter = ref(null);
	const diameterMeasurementUnitId = ref(null);
	const diameterMeasurementUnitsId = ref(null);
	
	const displayName = computed(() => {
		return LibraryClientUtility.$trans.t('forms.content.rockets.name') + ' ' + LibraryClientUtility.$trans.t('forms.content.rockets.stage.name') + ' ' + 
		(!String.isNullOrEmpty(detailItemName.value) ? `(${detailItemName.value})` : '');
	});

	const preCompleteOk = async (correlationId) => {
		await setAdditional(correlationId);

		if (!props.preCompleteOk)
			return failed(correlationId, 'invalid preCompletedOk property');

		// call the parent to tell them to save off the detail item
		return await props.preCompleteOk(correlationId, detailItem.value);
	};
	const resetAdditional = async (correlationId, previous) => {
		resetEditData(correlationId, detailItem.value);
		
		detailItemDiameter.value = detailItem.value ? detailItem.value.diameter : null;
		diameterMeasurementUnitId.value = detailItem.value ? detailItem.value.diameterMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		diameterMeasurementUnitsId.value = detailItem.value ? detailItem.value.diameterMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
	};
	const setAdditional = async (correlationId) => {
		setEditData(correlationId, detailItem.value);
		
		detailItem.value.diameter = AppUtility.convertNumber(detailItemDiameter.value);
		detailItem.value.diameterMeasurementUnitId = diameterMeasurementUnitId.value;
		detailItem.value.diameterMeasurementUnitsId = diameterMeasurementUnitsId.value;
	};

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
		detailItemTextRows,
		dialogError,
		dialogClose,
		dialogOk,
		isEditable,
		cgMeasurementUnitId,
		cgMeasurementUnitsId,
		cpMeasurementUnitId,
		cpMeasurementUnitsId,
		detailItemCg,
		detailItemCgFrom,
		detailItemCp,
		detailItemCpFrom,
		detailItemDescription,
		detailItemLength,
		detailItemName,
		detailItemWeight,
		lengthMeasurementUnitId,
		lengthMeasurementUnitsId,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		weightMeasurementUnitId,
		weightMeasurementUnitsId,
		resetEditData,
		setEditData,
		detailItemDiameter,
		diameterMeasurementUnitId,
		diameterMeasurementUnitsId,
		displayName,
		preCompleteOk,
		resetAdditional,
		setAdditional,
		scope: 'RocketEditDialog',
		validation: useVuelidate({ $scope: 'RocketEditDialog' })
	};
};
</script>
