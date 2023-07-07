<script>
import { ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { usePartComponent } from '@/components/content/parts/part/partComponent';

export function useParachutePartComponent(props, context, options) {
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
		detailItemManufacturer,
		detailItemName,
		manufacturers,
		canAdd,
		hasAdmin,
		isPublic,
		manufacturer,
		handleAdd,
		preCompleteOk,
		requestManufacturers
	} = usePartComponent(props, context, {
		completeOk: (correlationId, data) => {
			data.diameter
			return completeOkI(correlationId, data);
		},
		init: (correlationId, value) => {
			// detailItemDescription.value = value ? value.description : null;
			// detailItemIsPublic.value = value ? value.public : null;
			// detailItemManufacturer.value = value ? value.manufacturerId : null;
			// detailItemName.value = value ? value.name : null;

			// requestManufacturers(correlationId());

			detailItemName.value = value ? value.name : LibraryClientUtility.$trans.t('forms.content.parts.parachute.name');

			detailItemDiameter.value = value ? value.diameter : null;
			detailItemThinMill.value = value ? value.thinMill : false;
			
			diameterMeasurementUnitId.value = measurementUnitsLengthDefaultId.value;
			diameterMeasurementUnitsId.value = measurementUnitsIdSettings.value;
		},
		manufacturerType: AppCommonConstants.Rocketry.ManufacturerTypes.parachute,
		partsType: AppCommonConstants.Rocketry.PartTypes.parachute, 
		resetForm: (correlationId, orig) => {
			if (orig) {
				// detailItemDescription.value = orig.description;
				// detailItemName.value = orig.name;
				// detailItemManufacturer.value = orig.manufacturerId;
				// detailItemIsPublic.value = orig.public;

				detailItemDiameter.value = orig.diameter;
				detailItemThinMill.value = orig.thinMill;
			}
		}
	});
	
	const detailItemDiameter = ref(null);
	const detailItemThinMill = ref(false);
	const diameterMeasurementUnitId = ref(null);
	const diameterMeasurementUnitsId = ref(null);

	const completeOkI = (correlationId, data) => {
		data.diameter = detailItemDiameter.value;
		data.thinMill = detailItemThinMill.value;
		data.diameterMeasurementUnitId = diameterMeasurementUnitId.value;
		data.diameterMeasurementUnitsId = diameterMeasurementUnitsId.value;
		return data;
	};

	// onMounted(async () => {
	// 	diameterMeasurementUnitId.value = measurementUnitsLengthDefaultId.value;
	// 	diameterMeasurementUnitsId.value = measurementUnitsIdSettings.value;
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
		detailItemManufacturer,
		detailItemName,
		manufacturers,
		canAdd,
		hasAdmin,
		isPublic,
		manufacturer,
		handleAdd,
		preCompleteOk,
		requestManufacturers,
		detailItemDiameter,
		detailItemThinMill,
		diameterMeasurementUnitId,
		diameterMeasurementUnitsId,
		scope: 'ParchutePartControl',
		validation: useVuelidate({ $scope: 'ParchutePartControl' })
	};
};
</script>
