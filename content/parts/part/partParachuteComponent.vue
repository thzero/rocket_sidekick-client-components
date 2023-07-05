<script>
import { onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import { usePartComponent } from '@/components/content/parts/part/partComponent';

export function usePartParachuteComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		successResponse,
		isSaving,
		serverErrors,
		setErrors,
		serviceStore,
		formControlRef,
		dirty,
		detailItem,
		invalid,
		canDelete,
		detailItemData,
		detailItemTextRows,
		isEditable,
		isNew,
		dirtyCallback,
		invalidCallback,
		handleCancel,
		handleClose,
		handleOk,
		resetForm,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsLengthDefaultId,
		measurementUnitslengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		detailItemDescription,
		detailItemIsPublic,
		detailItemName,
		manufacturer,
		manufacturers,
		canAdd,
		isPublic,
		handleAdd,
		preCompleteOk,
		requestManufacturers
	} = usePartComponent(props, context, {
		init: (value) => {
			detailItemDescription.value = value ? value.description : null;
			detailItemIsPublic.value = value ? value.public : null;
			detailItemName.value = value ? value.name : null;

			requestManufacturers(correlationId());
			
			diameterLengthMeasurementUnitId.value = measurementUnitsLengthDefaultId.value;
			diameterLengthMeasurementUnitsId.value = measurementUnitsIdSettings.value;
		},
		manufacturerType: AppCommonConstants.Rocketry.ManufacturerTypes.parachute,
		partsType: AppCommonConstants.Rocketry.PartTypes.parachute, 
		resetForm: (correlationId, orig) => {
			if (orig) {
				detailItemDescription.value = orig.description;
				detailItemName.value = orig.name;
				detailItemIsPublic.value = orig.public;
			}
		}
	});
	
	const diameter = ref(null);
	const diameterLengthMeasurementUnitId = ref(null);
	const diameterLengthMeasurementUnitsId = ref(null);

	// onMounted(async () => {
	// 	diameterLengthMeasurementUnitId.value = measurementUnitsLengthDefaultId.value;
	// 	diameterLengthMeasurementUnitsId.value = measurementUnitsIdSettings.value;
	// });
	
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
		successResponse,
		isSaving,
		serverErrors,
		setErrors,
		serviceStore,
		formControlRef,
		dirty,
		detailItem,
		invalid,
		canDelete,
		detailItemData,
		detailItemTextRows,
		isEditable,
		isNew,
		dirtyCallback,
		invalidCallback,
		handleCancel,
		handleClose,
		handleOk,
		resetForm,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsLengthDefaultId,
		measurementUnitslengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		detailItemDescription,
		detailItemIsPublic,
		detailItemName,
		manufacturer,
		manufacturers,
		canAdd,
		isPublic,
		handleAdd,
		preCompleteOk,
		requestManufacturers,
		diameter,
		diameterLengthMeasurementUnitId,
		diameterLengthMeasurementUnitsId,
		scope: 'ParchutePartControl',
		validation: useVuelidate({ $scope: 'ParchutePartControl' })
	};
};
</script>
