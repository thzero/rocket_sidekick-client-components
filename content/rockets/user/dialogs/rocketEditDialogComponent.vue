<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useRocketEditComponent } from '@/components/content/rockets/user/rocket/rocketEditComponent';

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
	} =  useRocketEditComponent(props, context, options);

	const detailItemDiameter = ref(null);
	const diameterMeasurementUnitId = ref(null);
	const diameterMeasurementUnitsId = ref(null);

	const buttonOkDisabledOverride = (disabled, invalid, invalidOverride) => {
		return invalid;
	};
	const detailItemTextRows = computed(() => {
		return isEditable.value ? 5 : 1;
	});
	const dialogError = (err) => {
		context.emit('error', err);
	};
	const dialogClose = () => {
		context.emit('close');
	};
	const dialogOk = (response) => {
		context.emit('ok', response);
	};
	const isEditable = computed(() => {
		return props.readonly ? props.readonly ?? false : false;
	});
	const preCompleteOk = async (correlationId) => {
		return success(correlationId);
	};
	// eslint-disable-next-line
	const resetAdditional = async (correlationId, previous) => {
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
		buttonOkDisabledOverride,
		detailItemTextRows,
		dialogError,
		dialogClose,
		dialogOk,
		isEditable,
		preCompleteOk,
		resetAdditional,
		scope: 'RocketEditDialog',
		validation: useVuelidate({ $scope: 'RocketEditDialog' })
	};
};
</script>
